import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertOctagon,
  ArrowRight,
  Clock,
  ExternalLink,
  FileCheck2,
  GitFork,
  Hash,
  Info,
  Shield,
  X,
} from 'lucide-react';

export const EvidenceDetailDrawer: React.FC = () => {
  const {
    selectedEvidenceId,
    setSelectedEvidenceId,
    evidence,
    commitments,
    setSelectedCommitmentId,
  } = useApp();

  if (!selectedEvidenceId) return null;

  const ev = evidence.find((e) => e.id === selectedEvidenceId);
  if (!ev) return null;

  const linkedCommitmentObjects = commitments.filter((c) =>
    ev.linkedCommitmentIds.includes(c.id)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-[#12161B] border-l border-[#222933] h-full shadow-2xl flex flex-col overflow-y-auto text-[#E9EEF4]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="evidence-detail-title"
      >
        {/* Top bar */}
        <div className="p-6 border-b border-[#222933] flex items-start justify-between bg-[#1A1F26]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-xs text-[#9AA6B4] uppercase tracking-wider">
                {ev.id}
              </span>
              <span className="text-[#667486]">·</span>
              <span className="font-mono text-xs bg-[#222933] px-2 py-0.5 rounded text-[#9AA6B4]">
                {ev.fileType}
              </span>
              <span className="text-[#667486]">·</span>
              <span className="text-xs px-2 py-0.5 rounded font-medium bg-[#3A6FD8]/10 text-[#3A6FD8] border border-[#3A6FD8]/30">
                {ev.evidenceType}
              </span>
              {ev.isSimulated && (
                <span className="text-[10px] font-mono uppercase bg-[#C8922F]/20 text-[#C8922F] border border-[#C8922F]/40 px-1.5 py-0.5 rounded font-semibold">
                  SIMULATED
                </span>
              )}
            </div>
            <h2 id="evidence-detail-title" className="text-lg font-semibold text-[#E9EEF4]">
              {ev.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setSelectedEvidenceId(null)}
            className="p-1.5 rounded hover:bg-[#222933] text-[#9AA6B4] hover:text-white transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 12-Field Structured Body */}
        <div className="p-6 space-y-6 flex-1 text-xs">
          {/* 1. What is this evidence & verbatim snippet */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9AA6B4]">
              1. What this evidence establishes
            </h3>
            <p className="text-sm text-[#E9EEF4] font-medium leading-relaxed bg-[#1A1F26] p-3.5 rounded border border-[#222933]">
              "{ev.whatItEstablishes}"
            </p>

            <div className="bg-[#0A0C0F] p-3.5 rounded border border-[#222933] space-y-2">
              <div className="text-[11px] font-mono text-[#9AA6B4] flex items-center justify-between">
                <span>VERBATIM SOURCE SNIPPET</span>
                <span className="text-[10px] text-[#667486]">{ev.sourceName}</span>
              </div>
              <blockquote className="font-mono text-xs text-[#E9EEF4] italic border-l-2 border-[#3A6FD8] pl-3 leading-relaxed">
                "{ev.sourceSnippet}"
              </blockquote>
              {ev.qualifiersPreserved && (
                <div className="mt-2 text-[11px] bg-[#C8922F]/10 border border-[#C8922F]/30 p-2 rounded text-[#C8922F]">
                  <strong>Preserved Contractual Qualifier:</strong> "{ev.qualifiersPreserved}"
                </div>
              )}
            </div>
          </div>

          {/* 2 & 3. Producer & Origin */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1A1F26] p-3.5 rounded border border-[#222933] space-y-1.5">
              <div className="text-[11px] text-[#9AA6B4] font-semibold uppercase">
                2. Who Produced It
              </div>
              <div className="text-sm font-semibold text-[#E9EEF4]">{ev.issuerOrgName}</div>
              <div className="text-xs text-[#9AA6B4]">
                Role: <span className="text-[#E9EEF4]">{ev.issuerRole}</span> · Authority:{' '}
                <span className="text-[#E9EEF4]">{ev.authorityLevel}</span>
              </div>
            </div>

            <div className="bg-[#1A1F26] p-3.5 rounded border border-[#222933] space-y-1.5">
              <div className="text-[11px] text-[#9AA6B4] font-semibold uppercase">
                3. Origin & Lineage Class
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#222933] px-2 py-0.5 rounded text-[#E9EEF4] font-mono font-medium">
                  {ev.originClass}
                </span>
                <span className="bg-[#3A6FD8]/10 text-[#3A6FD8] px-2 py-0.5 rounded font-mono font-medium border border-[#3A6FD8]/30">
                  {ev.independenceClass}
                </span>
              </div>
              <div className="text-[11px] text-[#667486] font-mono flex items-center gap-1 truncate">
                <Hash className="w-3 h-3" /> {ev.contentHash}
              </div>
            </div>
          </div>

          {/* 4, 5, 6. Timestamps & Validity Countdown */}
          <div className="bg-[#1A1F26] p-4 rounded border border-[#222933]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9AA6B4] mb-3 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              4-6. Temporal Validity & Freshness Window
            </h3>
            <div className="grid grid-cols-3 gap-3 text-xs font-mono">
              <div className="bg-[#0D1116] p-2.5 rounded border border-[#222933]">
                <div className="text-[10px] text-[#9AA6B4] mb-1">CREATED AT</div>
                <div className="text-[#E9EEF4]">{new Date(ev.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="bg-[#0D1116] p-2.5 rounded border border-[#222933]">
                <div className="text-[10px] text-[#9AA6B4] mb-1">OBSERVED AT</div>
                <div className="text-[#E9EEF4]">{new Date(ev.observedAt).toLocaleDateString()}</div>
              </div>
              <div className="bg-[#0D1116] p-2.5 rounded border border-[#222933]">
                <div className="text-[10px] text-[#9AA6B4] mb-1">VALID UNTIL</div>
                <div className="text-[#E9EEF4]">{new Date(ev.validUntil).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-[#222933]">
              <span className="text-[#9AA6B4]">Freshness Status:</span>
              <span
                className={`font-semibold font-mono ${
                  ev.freshnessState === 'Current'
                    ? 'text-[#2E9268]'
                    : ev.freshnessState === 'Ageing'
                    ? 'text-[#C8922F]'
                    : 'text-[#C4483F]'
                }`}
              >
                {ev.freshnessState} ({ev.freshnessDaysRemaining} days remaining)
              </span>
            </div>
          </div>

          {/* 7. Linked Commitments */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9AA6B4] mb-2">
              7. Linked Critical Commitments ({linkedCommitmentObjects.length})
            </h3>
            <div className="space-y-2">
              {linkedCommitmentObjects.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedCommitmentId(c.id);
                    setSelectedEvidenceId(null);
                  }}
                  className="bg-[#1A1F26] hover:bg-[#222933] p-3 rounded border border-[#222933] flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div>
                    <span className="font-mono text-[11px] text-[#3A6FD8] mr-2">{c.id}</span>
                    <span className="font-medium text-[#E9EEF4]">{c.title}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#9AA6B4]" />
                </div>
              ))}
            </div>
          </div>

          {/* 9. Contradictions */}
          {ev.contradictionDetails && (
            <div className="bg-[#C4483F]/10 border border-[#C4483F]/40 p-4 rounded space-y-2">
              <div className="flex items-center gap-2 text-[#C4483F] font-semibold text-xs uppercase">
                <AlertOctagon className="w-4 h-4" />
                9. Active Proposition Contradiction
              </div>
              <p className="text-xs text-[#E9EEF4] leading-relaxed">
                {ev.contradictionDetails}
              </p>
            </div>
          )}

          {/* 10. Upstream Lineage Chain (4 documents · 1 assertion demonstration) */}
          {ev.lineagePath && ev.lineagePath.length > 0 && (
            <div className="bg-[#1A1F26] p-4 rounded border border-[#222933]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9AA6B4] flex items-center gap-2">
                  <GitFork className="w-3.5 h-3.5" />
                  10. Provenance Lineage Path
                </h3>
                <span className="text-[10px] font-mono text-[#C8922F] bg-[#C8922F]/10 px-2 py-0.5 rounded border border-[#C8922F]/30 font-medium">
                  {ev.lineagePath.length} documents · 1 assertion
                </span>
              </div>
              <p className="text-[11px] text-[#9AA6B4] mb-3">
                Multiple documents in the project package restate a single upstream claim from this source.
              </p>
              <div className="space-y-1.5 font-mono text-xs">
                {ev.lineagePath.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#E9EEF4]">
                    <span className="text-[#667486] font-bold">{idx + 1}.</span>
                    <span className="bg-[#0D1116] px-2.5 py-1 rounded border border-[#222933] flex-1">
                      {step}
                    </span>
                    {idx < ev.lineagePath!.length - 1 && (
                      <span className="text-[#667486]">↓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 11 & 12. Policy Satisfied */}
          <div className="bg-[#1A1F26] p-4 rounded border border-[#222933]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9AA6B4] mb-2 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              11-12. Policy Compliance & Classification
            </h3>
            <p className="text-xs text-[#9AA6B4] leading-relaxed">
              Classified as <strong className="text-[#E9EEF4]">{ev.originClass}</strong> with{' '}
              <strong className="text-[#E9EEF4]">{ev.independenceClass}</strong> provenance. Meets documentary qualification requirements under standard policy.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#222933] bg-[#1A1F26] flex items-center justify-between text-xs text-[#667486]">
          <span>ILLUSTRATIVE · SYNTHETIC DEMO EVIDENCE</span>
          <button
            type="button"
            onClick={() => setSelectedEvidenceId(null)}
            className="px-4 py-2 bg-[#222933] hover:bg-[#333C48] text-white text-xs font-medium rounded transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
