export type AssuranceStateIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type AssuranceStateName =
  | 'UNKNOWN'
  | 'CLAIMED'
  | 'DOCUMENTED'
  | 'CORROBORATED'
  | 'SUBSTANTIATED'
  | 'EXECUTING'
  | 'DELIVERED'
  | 'ACCEPTED'
  | 'OPERATIONAL';

export interface AssuranceStateInfo {
  index: AssuranceStateIndex;
  name: AssuranceStateName;
  description: string;
  color: string;
  tooltipText: string;
}

export type ConditionFlag = 'STALE' | 'CONTRADICTORY' | 'EXPIRED' | 'DISPUTED' | 'SUPERSEDED';

export type OriginClass =
  | 'Same-origin'
  | 'Counterparty-origin'
  | 'Regulator-origin'
  | 'Third-party'
  | 'Physical-origin'
  | 'Unknown';

export type IndependenceClass =
  | 'Independent'
  | 'Partially independent'
  | 'Dependent'
  | 'Unknown';

export type EvidenceType =
  | 'Documentary'
  | 'Transactional'
  | 'Regulatory'
  | 'Operational'
  | 'Physical'
  | 'Third-party';

export type FreshnessState = 'Current' | 'Ageing' | 'Stale';

export type EvidenceRelationshipType =
  | 'supports'
  | 'contradicts'
  | 'derived_from'
  | 'copied_from'
  | 'same_source'
  | 'corroborates'
  | 'supersedes';

export type GateStatus =
  | 'EVIDENCE CONDITIONS MET'
  | 'EVIDENCE CONDITIONS NOT MET'
  | 'HUMAN REVIEW REQUIRED';

export type TaskStatus =
  | 'Open'
  | 'Requested'
  | 'Submitted'
  | 'Under review'
  | 'Resolved'
  | 'Rejected';

export type UserRole =
  | 'Project Owner'
  | 'Investment / Capital Reviewer'
  | 'Project / Assurance Analyst'
  | 'Evidence Provider';

export interface Project {
  id: string;
  name: string;
  assetType: string;
  location: string;
  capitalValue: string; // "$1B"
  capitalValueNum: number;
  claimedCOD: string; // "30 Nov 2028"
  ownerOrganisation: string;
  projectPhase: string;
  executionProgressPercent: number; // e.g. 87%
  lastEvaluationTimestamp: string;
  totalCommitmentsCount: number;
  substantiatedCount: number;
  documentedCount: number;
  claimedCount: number;
  contradictoryCount: number;
  nextGateId: string;
}

export interface Commitment {
  id: string; // e.g. "COM-48291"
  projectId: string;
  type: string; // "220kV transformer", "Grid interconnection", etc.
  title: string;
  description: string;
  requiredOutcome: string;
  contractualWording?: string;
  qualifiers?: string;
  deadline: string;
  counterpartyId: string;
  counterpartyName: string;
  criticality: 'Critical' | 'High' | 'Medium';
  currentState: AssuranceStateIndex;
  currentStateName: AssuranceStateName;
  requiredState: AssuranceStateIndex;
  requiredStateName: AssuranceStateName;
  conditionFlags: ConditionFlag[];
  evidenceCount: number;
  independentEvidencePathCount: number;
  freshnessDays: number;
  contradictionCount: number;
  impactSummary: string;
  financialExposure: string; // e.g. "₹50 crore"
  financialExposureNum: number;
  lastEvaluated: string;
  extractionSource?: string;
  extractionConfidence?: number; // 0.94
  reviewStatus: 'AI-extracted' | 'human-confirmed' | 'rejected';
  policyId: string;
  applicableGateId: string;
  parentCommitmentId?: string;
  dependentMilestones: string[];
  downstreamMilestones: string[];
  affectsCOD: boolean;
  notes?: string[];
}

export interface Evidence {
  id: string; // e.g. "EVD-8841"
  title: string;
  evidenceType: EvidenceType;
  sourceName: string;
  issuerOrgId: string;
  issuerOrgName: string;
  issuerRole: string; // "EPC", "OEM", "Utility", "Regulator", "Carrier", "Logistics", "Inspector"
  originClass: OriginClass;
  independenceClass: IndependenceClass;
  authorityLevel: string; // "Contractual", "Regulatory", "Operational", "Third-Party Inspector"
  createdAt: string;
  observedAt: string;
  validUntil: string;
  lastChecked: string;
  freshnessState: FreshnessState;
  freshnessDaysRemaining: number;
  contentHash: string; // "sha256:4f8e..."
  fileType: string; // "PDF", "XLSX", "EDI", "Telemetry", "Scan"
  whatItEstablishes: string; // Specific proposition
  sourceSnippet: string; // Verbatim text
  qualifiersPreserved?: string; // "subject to final factory acceptance"
  linkedCommitmentIds: string[];
  relationships: EvidenceRelationship[];
  isSimulated?: boolean;
  isSuperseded?: boolean;
  contradictsEvidenceId?: string;
  contradictionDetails?: string;
  lineagePath?: string[]; // ["EPC schedule", "EPC weekly report", "Investor summary"]
}

export interface EvidenceRelationship {
  id: string;
  sourceEvidenceId: string;
  targetEvidenceId: string;
  relationshipType: EvidenceRelationshipType;
  description: string;
}

export interface PolicyRequirement {
  id: string;
  clauseNumber: string;
  description: string;
  requiredState: AssuranceStateIndex;
  acceptableEvidenceTypes: EvidenceType[];
  minimumEvidenceStrength: string;
  sourceIndependenceRule: string; // "At least 2 independent origin classes"
  freshnessMaxDays: number;
  contradictionRule: string; // "Zero active contradictions"
  escalationCondition: string;
}

export interface Policy {
  id: string;
  name: string;
  version: string;
  decisionProtected: string; // "Capital Release", "Energisation Readiness", "Commissioning"
  commitmentType: string;
  requiredAssuranceState: AssuranceStateIndex;
  requirements: PolicyRequirement[];
  effectiveDate: string;
  author: string;
  notes: string;
}

export interface RequirementResult {
  requirementId: string;
  clauseNumber: string;
  description: string;
  passed: boolean;
  detail: string; // Plain language shortfall or satisfaction
}

export interface AssuranceEvaluation {
  commitmentId: string;
  policyId: string;
  policyVersion: string;
  evaluatedAt: string;
  calculatedState: AssuranceStateIndex;
  calculatedStateName: AssuranceStateName;
  conditionFlags: ConditionFlag[];
  independentPathCount: number;
  totalEvidenceCount: number;
  requirementResults: RequirementResult[];
  missingEvidenceDescriptions: string[];
  contradictionAlerts: string[];
  stateChangeRecommendations: string;
  plainLanguageTrace: string[];
}

export interface AssuranceCertificate {
  certificateId: string; // "ASR-9042-48291"
  commitmentId: string;
  commitmentTitle: string;
  issuedAt: string;
  validUntil: string;
  validityStatus: 'Issued' | 'Active' | 'Ageing' | 'Expired' | 'Revalidated';
  assuranceState: AssuranceStateIndex;
  assuranceStateName: AssuranceStateName;
  policyId: string;
  policyName: string;
  policyVersion: string;
  evidenceSourceCount: number;
  independentEvidencePathCount: number;
  activeContradictions: number;
  evidenceFreshnessDays: number;
  sha256Proof: string;
  disclaimer: string;
}

export interface EvidenceTask {
  id: string; // e.g. "EVT-1043"
  commitmentId: string;
  commitmentTitle: string;
  currentState: AssuranceStateIndex;
  requiredState: AssuranceStateIndex;
  title: string;
  missingEvidenceRequired: string;
  acceptableEvidenceTypes: EvidenceType[];
  responsiblePartyId: string;
  responsiblePartyName: string;
  requesterName: string;
  dueDate: string;
  reason: string;
  affectedCapitalGateId: string;
  affectedCapitalGateName: string;
  affectedMilestone: string;
  financialExposure: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface GateCondition {
  commitmentId: string;
  commitmentTitle: string;
  requiredState: AssuranceStateIndex;
  currentState: AssuranceStateIndex;
  conditionFlags: ConditionFlag[];
  isMet: boolean;
  shortfallReason?: string;
}

export interface GateException {
  id: string;
  commitmentId: string;
  raisedBy: string;
  raisedAt: string;
  rationale: string;
}

export interface GateDecisionLog {
  id: string;
  gateId: string;
  decision: 'Proceed' | 'Do not proceed' | 'Defer';
  recordedBy: string;
  reviewerRole: string;
  recordedAt: string;
  writtenRationale: string;
  conditionsSnapshot: {
    totalConditions: number;
    metConditions: number;
    unmetConditions: number;
  };
  policyVersion: string;
}

export interface CapitalGate {
  id: string; // "GATE-4"
  gateNumber: number;
  name: string; // "Grid Energisation Readiness"
  capitalAmount: string; // "₹50 crore"
  capitalAmountNum: number;
  decisionDate: string; // "15 Oct 2026"
  policyId: string;
  policyName: string;
  policyVersion: string;
  status: GateStatus;
  conditions: GateCondition[];
  exceptions: GateException[];
  assignedReviewerName: string;
  assignedReviewerRole: string;
  decisionLog?: GateDecisionLog[];
}

export interface Counterparty {
  id: string;
  name: string;
  type: string; // "State Utility", "OEM Manufacturer", "EPC Contractor", "Permitting Authority", "Fibre Carrier", "Logistics Provider", "Testing Lab"
  role: string;
  commitmentsOwnedCount: number;
  commitmentIds: string[];
  stateDistribution: { [key in AssuranceStateName]?: number };
  evidenceItemsProducedCount: number;
  averageFreshnessDays: number;
  openEvidenceTasksCount: number;
  contradictionsInvolvedCount: number;
  contactEmail: string;
}

export interface EventRecord {
  id: string;
  timestamp: string;
  displayDate: string;
  eventType:
    | 'STATE_CHANGE'
    | 'NEW_EVIDENCE'
    | 'CONTRADICTION_RAISED'
    | 'CONTRADICTION_RESOLVED'
    | 'EVIDENCE_STALE'
    | 'ASSURANCE_EXPIRED'
    | 'TASK_COMPLETED'
    | 'GATE_DECISION';
  commitmentId?: string;
  commitmentTitle?: string;
  gateId?: string;
  gateName?: string;
  evidenceId?: string;
  taskId?: string;
  previousState?: AssuranceStateIndex;
  newState?: AssuranceStateIndex;
  summary: string;
  detail: string;
  actor: string;
}
