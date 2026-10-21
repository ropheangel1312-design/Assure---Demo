import {
  AssuranceEvaluation,
  AssuranceStateIndex,
  AssuranceStateName,
  Commitment,
  ConditionFlag,
  Evidence,
  Policy,
  RequirementResult,
} from '../types';

export const ASSURANCE_STATE_NAMES: Record<AssuranceStateIndex, AssuranceStateName> = {
  0: 'UNKNOWN',
  1: 'CLAIMED',
  2: 'DOCUMENTED',
  3: 'CORROBORATED',
  4: 'SUBSTANTIATED',
  5: 'EXECUTING',
  6: 'DELIVERED',
  7: 'ACCEPTED',
  8: 'OPERATIONAL',
};

export const ASSURANCE_STATE_COLORS: Record<AssuranceStateIndex, string> = {
  0: '#737373', // UNKNOWN (Neutral)
  1: '#f59e0b', // CLAIMED (Amber)
  2: '#6366f1', // DOCUMENTED (Indigo)
  3: '#818cf8', // CORROBORATED (Indigo-Light)
  4: '#10b981', // SUBSTANTIATED (Emerald)
  5: '#10b981', // EXECUTING (Emerald)
  6: '#059669', // DELIVERED (Emerald-Dark)
  7: '#14b8a6', // ACCEPTED (Teal)
  8: '#06b6d4', // OPERATIONAL (Cyan)
};

export const CONDITION_FLAG_COLORS: Record<ConditionFlag, string> = {
  STALE: '#f59e0b',
  CONTRADICTORY: '#ef4444',
  EXPIRED: '#dc2626',
  DISPUTED: '#a855f7',
  SUPERSEDED: '#737373',
};

/**
 * Calculates independent evidence paths by grouping by origin class / distinct issuer
 * avoiding double counting multiple documents that restate the same source.
 */
export function calculateIndependentPaths(evidenceList: Evidence[]): {
  independentPathCount: number;
  originClassesPresent: string[];
  uniqueIssuers: string[];
} {
  const activeEvidence = evidenceList.filter((e) => !e.isSuperseded);
  const distinctOrigins = new Set<string>();
  const distinctIssuers = new Set<string>();

  for (const ev of activeEvidence) {
    if (ev.independenceClass === 'Independent' || ev.originClass !== 'Same-origin') {
      distinctOrigins.add(ev.originClass);
      distinctIssuers.add(ev.issuerOrgName);
    } else {
      // Same-origin documents collapse into a single path per issuer
      distinctOrigins.add(`${ev.originClass}-${ev.issuerOrgName}`);
    }
  }

  return {
    independentPathCount: Math.max(0, distinctOrigins.size),
    originClassesPresent: Array.from(distinctOrigins),
    uniqueIssuers: Array.from(distinctIssuers),
  };
}

/**
 * Evaluates a commitment against its supporting/contradicting evidence and applicable policy.
 * Deterministic engine respecting all mathematical and assurance criteria.
 */
export function evaluateCommitment(
  commitment: Commitment,
  allEvidence: Evidence[],
  policy?: Policy,
  simulatedDaysForward: number = 0
): AssuranceEvaluation {
  // Filter evidence linked to this commitment
  const linkedEvidence = allEvidence.filter((e) =>
    e.linkedCommitmentIds.includes(commitment.id)
  );

  const activeEvidence = linkedEvidence.filter((e) => !e.isSuperseded);
  const totalEvidenceCount = activeEvidence.length;

  const { independentPathCount, originClassesPresent } =
    calculateIndependentPaths(activeEvidence);

  // Check for contradiction conditions
  const contradictionAlerts: string[] = [];
  let hasContradictions = false;
  for (const ev of activeEvidence) {
    if (ev.contradictsEvidenceId || ev.contradictionDetails) {
      hasContradictions = true;
      contradictionAlerts.push(
        `Contradiction in [${ev.id}] (${ev.title}): ${ev.contradictionDetails || 'Conflicting proposition recorded'}`
      );
    }
  }

  // Check for stale evidence
  let hasStaleEvidence = false;
  for (const ev of activeEvidence) {
    const adjustedRemaining = ev.freshnessDaysRemaining - simulatedDaysForward;
    if (adjustedRemaining <= 0 || ev.freshnessState === 'Stale') {
      hasStaleEvidence = true;
    }
  }

  // Check condition flags
  const flags: ConditionFlag[] = [];
  if (hasContradictions) flags.push('CONTRADICTORY');
  if (hasStaleEvidence) flags.push('STALE');
  if (commitment.conditionFlags.includes('DISPUTED')) flags.push('DISPUTED');

  // Ladder evaluation logic
  let evaluatedStateIndex: AssuranceStateIndex = 0; // default UNKNOWN

  if (totalEvidenceCount === 0) {
    evaluatedStateIndex = 0; // UNKNOWN
  } else {
    const hasAssertion = activeEvidence.some(
      (e) => e.evidenceType === 'Documentary' || e.evidenceType === 'Transactional'
    );
    const hasContractualOrFormal = activeEvidence.some(
      (e) =>
        e.originClass === 'Counterparty-origin' ||
        e.originClass === 'Regulator-origin' ||
        e.originClass === 'Third-party' ||
        e.authorityLevel === 'Contractual' ||
        e.authorityLevel === 'Regulatory'
    );

    const hasOperationalProof = activeEvidence.some(
      (e) => e.evidenceType === 'Operational' || e.authorityLevel === 'Operational'
    );
    const hasPhysicalProof = activeEvidence.some(
      (e) => e.evidenceType === 'Physical' || e.originClass === 'Physical-origin'
    );
    const hasFormalAcceptance = activeEvidence.some(
      (e) =>
        e.authorityLevel === 'Regulatory' ||
        (e.originClass === 'Regulator-origin' && e.whatItEstablishes.toLowerCase().includes('accepted'))
    );

    if (hasOperationalProof && hasFormalAcceptance && independentPathCount >= 2) {
      evaluatedStateIndex = 8; // OPERATIONAL
    } else if (hasFormalAcceptance && independentPathCount >= 2) {
      evaluatedStateIndex = 7; // ACCEPTED
    } else if (hasPhysicalProof && independentPathCount >= 2) {
      evaluatedStateIndex = 6; // DELIVERED
    } else if (hasPhysicalProof) {
      evaluatedStateIndex = 5; // EXECUTING
    } else if (independentPathCount >= 2 && !hasContradictions && !hasStaleEvidence) {
      evaluatedStateIndex = 4; // SUBSTANTIATED
    } else if (independentPathCount >= 2) {
      evaluatedStateIndex = 3; // CORROBORATED
    } else if (hasContractualOrFormal || totalEvidenceCount >= 1) {
      evaluatedStateIndex = 2; // DOCUMENTED
    } else if (hasAssertion) {
      evaluatedStateIndex = 1; // CLAIMED
    }
  }

  // Policy requirement validation
  const requirementResults: RequirementResult[] = [];
  const missingEvidenceDescriptions: string[] = [];
  const plainLanguageTrace: string[] = [];

  if (policy && policy.requirements.length > 0) {
    for (const req of policy.requirements) {
      let passed = true;
      let detail = '';

      // Check ladder state requirement
      if (evaluatedStateIndex < req.requiredState) {
        passed = false;
        detail = `Current state (${ASSURANCE_STATE_NAMES[evaluatedStateIndex]}) does not reach required state (${ASSURANCE_STATE_NAMES[req.requiredState]}).`;
      }

      // Check independence requirement
      if (req.sourceIndependenceRule.includes('2') && independentPathCount < 2) {
        passed = false;
        detail = detail
          ? `${detail} Insufficient independent paths (${independentPathCount}/2 required).`
          : `Requires at least two independent origin classes — currently ${independentPathCount} (${originClassesPresent.join(', ') || 'none'}).`;
        missingEvidenceDescriptions.push(
          'Independent third-party inspection or regulator-origin verification'
        );
      }

      // Check contradiction rule
      if (hasContradictions) {
        passed = false;
        detail = detail
          ? `${detail} Active contradiction exists.`
          : 'Contradictory evidence exists between vendor commitment and shipping logistics.';
      }

      // Check freshness rule
      if (hasStaleEvidence) {
        passed = false;
        detail = detail
          ? `${detail} Evidence outside validity window.`
          : 'Supporting evidence is aged beyond maximum allowed validity threshold.';
      }

      requirementResults.push({
        requirementId: req.id,
        clauseNumber: req.clauseNumber,
        description: req.description,
        passed,
        detail: passed ? 'Requirement fully met by currently accessible evidence.' : detail,
      });
    }
  }

  // Build plain-language explanation trace
  plainLanguageTrace.push(
    `1. Evaluated against ${policy?.name || 'Standard Assurance Policy'} ${policy?.version || 'v1.0'}`
  );
  plainLanguageTrace.push(
    `2. Analyzed ${totalEvidenceCount} active evidence records (${independentPathCount} independent provenance paths).`
  );
  if (hasContradictions) {
    plainLanguageTrace.push(
      `3. Detected ${contradictionAlerts.length} material contradiction(s) between propositions.`
    );
  }
  if (hasStaleEvidence) {
    plainLanguageTrace.push(
      `4. Evidence validity check: Supporting records have aged beyond policy freshness window.`
    );
  }
  plainLanguageTrace.push(
    `5. Resulting ladder state: [${evaluatedStateIndex}] ${ASSURANCE_STATE_NAMES[evaluatedStateIndex]}`
  );

  let stateChangeRecommendations = '';
  if (evaluatedStateIndex < commitment.requiredState) {
    stateChangeRecommendations = `To reach required [${commitment.requiredState}] ${ASSURANCE_STATE_NAMES[commitment.requiredState]}, submit: ${
      missingEvidenceDescriptions.length > 0
        ? missingEvidenceDescriptions.join(' or ')
        : 'independent corroborating record with non-overlapping provenance.'
    }`;
  } else {
    stateChangeRecommendations =
      'Evidence conditions meet the assurance standard for the current decision gate.';
  }

  return {
    commitmentId: commitment.id,
    policyId: policy?.id || 'POL-DEFAULT',
    policyVersion: policy?.version || 'v1.0',
    evaluatedAt: new Date().toISOString(),
    calculatedState: evaluatedStateIndex,
    calculatedStateName: ASSURANCE_STATE_NAMES[evaluatedStateIndex],
    conditionFlags: flags,
    independentPathCount,
    totalEvidenceCount,
    requirementResults,
    missingEvidenceDescriptions,
    contradictionAlerts,
    stateChangeRecommendations,
    plainLanguageTrace,
  };
}
