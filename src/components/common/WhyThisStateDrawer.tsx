import React from 'react';
import { useApp } from '../../context/AppContext';
import { ASSURANCE_STATE_NAMES } from '../../engine/evaluation';
import { ConditionFlagChip } from './ConditionFlagChip';
import { StateBadge } from './StateBadge';
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Layers,
  ShieldCheck,
  X,
  XCircle,
} from 'lucide-react';

export const WhyThisStateDrawer: React.FC = () => {
  const {
    whyThisStateCommitmentId,
    setWhyThisStateCommitmentId,
    commitments,
    policies,
    evaluateOneCommitment,
    setSelectedEvidenceId,
  } = useApp();

  if (!whyThisStateCommitmentId) return null;

  const commitment = commitments.find((c) => c.id === whyThisStateCommitmentId);
  if (!commitment) return null;

  const policy = policies.find((p) => p.id === commitment.policyId);
  const evalResult = evaluateOneCommitment(commitment.id);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div
        className="w-full max-w-xl bg-[#12161B] border-l border-[#222933] h-full shadow-2xl flex flex-col overflow-y-auto text-[#E9EEF4]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="why-state-title"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#222933] flex items-start justify-between bg-[#1A1F26]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-[#9AA6B4] uppercase tracking-wider">
                {commitment.id}
              </span>
              <span className="text-[#667486]">·</span>
              <span className="text-xs text-[#9AA6B4] font-medium">State Explanation Trace</span>
            </div>
            <h2 id="why-state-title" className="text-lg font-semibold text-[#E9EEF4]">
              {commitment.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setWhyThisStateCommitmentId(null)}
            className="p-1.5 rounded hover:bg-[#222933] text-[#9AA6B4] hover:text-white transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current State Summary */}
        <div className="p-6 border-b border-[#222933] bg-[#0D1116]/50">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs text-[#9AA6B4] mb-1">Current Assurance State</div>
              <div className="flex items-center gap-2">
                <StateBadge stateIndex={commitment.currentState} size="lg" />
                {commitment.conditionFlags.map((flag) => (
                  <ConditionFlagChip key={flag} flag={flag} />
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs text-[#9AA6B4] mb-1">Required for Next Gate</div>
              <StateBadge stateIndex={commitment.requiredState} size="lg" />
            </div>
          </div>

          <p className="mt-4 text-xs text-[#9AA6B4] leading-relaxed border-t border-[#222933] pt-3">
            {commitment.currentState >= 4 ? (
              <span className="text-[#2E9268] font-medium">
                ✓ Available evidence satisfies all requirements of {policy?.name || 'Assurance Policy'}{' '}
                {policy?.version}.
              </span>
            ) : (
              <span className="text-[#C8922F]">
                ⚠ Evidence does not yet reach the standard required for the upcoming capital release.
              </span>
            )}
          </p>
        </div>

        <div className="p-6 space-y-6 flex-1">
          {/* Section 1: Applicable Policy & Version */}
          <div className="bg-[#1A1F26] p-4 rounded border border-[#222933]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#3A6FD8]" />
                <span className="text-xs font-semibold text-[#E9EEF4]">
                  Governing Policy: {policy?.name}
                </span>
              </div>
              <span className="font-mono text-xs bg-[#222933] px-2 py-0.5 rounded text-[#9AA6B4]">
                {policy?.version}
              </span>
            </div>
            <div className="text-xs text-[#9AA6B4] space-y-1">
              <p>
                <strong className="text-[#E9EEF4]">Decision Protected:</strong>{' '}
                {policy?.decisionProtected}
              </p>
              <p className="text-[11px] text-[#667486] italic">{policy?.notes}</p>
            </div>
          </div>

          {/* Section 2: Policy Requirement-by-Requirement Evaluation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9AA6B4] mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              Policy Requirements Evaluation
            </h3>
            <div className="space-y-3">
              {evalResult?.requirementResults.map((req) => (
                <div
                  key={req.requirementId}
                  className={`p-3.5 rounded border text-xs ${
                    req.passed
                      ? 'bg-[#1A1F26] border-[#222933]'
                      : 'bg-[#C4483F]/10 border-[#C4483F]/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-semibold text-[#E9EEF4]">
                      {req.clauseNumber}: {req.description}
                    </span>
                    {req.passed ? (
                      <span className="flex items-center gap-1 text-[#2E9268] font-mono text-[11px] shrink-0 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> MET
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[#C4483F] font-mono text-[11px] shrink-0 font-medium">
                        <XCircle className="w-3.5 h-3.5" /> UNMET
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-[11px] leading-relaxed ${
                      req.passed ? 'text-[#9AA6B4]' : 'text-[#E9EEF4]'
                    }`}
                  >
                    {req.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Evidence Considered & Provenance */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9AA6B4] flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                Evidence Analyzed ({evalResult?.totalEvidenceCount || 0})
              </h3>
              <span className="font-mono text-xs text-[#3A6FD8] bg-[#3A6FD8]/10 px-2 py-0.5 rounded border border-[#3A6FD8]/30">
                Independent Paths: {evalResult?.independentPathCount || 0}
              </span>
            </div>

            <div className="bg-[#0D1116] rounded border border-[#222933] divide-y divide-[#222933] text-xs">
              {commitment.notes && commitment.notes.length > 0 && (
                <div className="p-3 bg-[#1A1F26]/50">
                  <div className="text-[11px] font-semibold text-[#9AA6B4] mb-1">
                    Provenance Notes:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-[#E9EEF4] text-[11px]">
                    {commitment.notes.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Section 4: What is missing / Next actions */}
          {evalResult && evalResult.missingEvidenceDescriptions.length > 0 && (
            <div className="bg-[#C8922F]/10 border border-[#C8922F]/30 p-4 rounded">
              <div className="flex items-center gap-2 text-[#C8922F] text-xs font-semibold mb-2">
                <AlertTriangle className="w-4 h-4" />
                Minimum Evidence Needed to Advance:
              </div>
              <ul className="space-y-1 text-xs text-[#E9EEF4]">
                {evalResult.missingEvidenceDescriptions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#C8922F]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section 5: Step-by-Step Deterministic Trace */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9AA6B4] mb-2">
              Deterministic Evaluation Engine Trace
            </h3>
            <div className="bg-[#0A0C0F] p-3.5 rounded border border-[#222933] font-mono text-[11px] text-[#9AA6B4] space-y-1 leading-relaxed">
              {evalResult?.plainLanguageTrace.map((line, i) => (
                <div key={i} className="text-[#E9EEF4]">
                  {line}
                </div>
              ))}
              <div className="pt-2 text-[10px] text-[#667486] border-t border-[#222933]">
                Evaluated: {new Date(evalResult?.evaluatedAt || Date.now()).toUTCString()} ·
                Rule Engine v2.4 (Deterministic)
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#222933] bg-[#1A1F26] flex justify-end">
          <button
            type="button"
            onClick={() => setWhyThisStateCommitmentId(null)}
            className="px-4 py-2 bg-[#222933] hover:bg-[#333C48] text-white text-xs font-medium rounded transition-colors cursor-pointer"
          >
            Close Trace
          </button>
        </div>
      </div>
    </div>
  );
};
