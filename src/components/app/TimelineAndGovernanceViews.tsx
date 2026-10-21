import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ASSURANCE_STATE_NAMES } from '../../engine/evaluation';
import {
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  FastForward,
  FileCheck2,
  FileCode,
  FileText,
  Filter,
  History,
  Layers,
  Lock,
  RotateCcw,
  Scale,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  User,
  Users,
} from 'lucide-react';

// ================= TIMELINE & HISTORY VIEW =================
export const TimelineHistoryView: React.FC<{ onNavigate: (p: string) => void }> = ({
  onNavigate,
}) => {
  const { events, simulateForward30Days, simulatedDaysForward, resetDemo, addToast } = useApp();

  const handleSimulate30Days = () => {
    simulateForward30Days();
    addToast({
      title: 'Time Simulated +30 Days Forward',
      message: 'Evidence aging applied. Older site surveys marked STALE. Gate 4 conditions updated.',
      type: 'warning',
    });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6 animate-fadeIn text-[#E9EEF4]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#222933]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
              Immutable Audit Ledger
            </span>
            <span className="text-[#667486]">·</span>
            <span className="text-xs font-mono text-[#9AA6B4]">
              {events.length} Historical Events
            </span>
          </div>
          <h1 className="text-2xl font-serif text-[#E9EEF4]">Timeline & History</h1>
        </div>

        {/* Simulation Controls */}
        <div className="flex items-center gap-2">
          {simulatedDaysForward > 0 && (
            <button
              type="button"
              onClick={resetDemo}
              className="px-3 py-2 bg-[#1A1F26] hover:bg-[#222933] border border-[#222933] rounded text-xs text-[#9AA6B4] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Time</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSimulate30Days}
            className="px-4 py-2 bg-[#3A6FD8] hover:bg-[#4C82EC] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Simulate +30 Days Forward</span>
          </button>
        </div>
      </div>

      {simulatedDaysForward > 0 && (
        <div className="p-4 bg-[#3A6FD8]/10 border border-[#3A6FD8]/30 rounded-lg flex items-center justify-between text-xs font-mono text-[#3A6FD8]">
          <span>
            Active Simulation: +{simulatedDaysForward} days forward applied to evidence freshness limits.
          </span>
          <span className="text-white font-bold">FRESHNESS DEGRADATION ACTIVE</span>
        </div>
      )}

      {/* Events Timeline */}
      <div className="bg-[#12161B] border border-[#222933] rounded-lg p-6 space-y-6">
        <div className="relative border-l-2 border-[#222933] ml-4 space-y-6">
          {events.map((evt) => (
            <div key={evt.id} className="relative pl-6 space-y-1">
              <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#1A1F26] border-2 border-[#3A6FD8]" />

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-[#3A6FD8] font-bold">{evt.displayDate}</span>
                <span className="text-[#667486]">·</span>
                <span className="text-[#9AA6B4] uppercase text-[10px] bg-[#0A0C0F] px-2 py-0.5 rounded border border-[#222933]">
                  {evt.eventType}
                </span>
                <span className="text-[#667486] ml-auto text-[11px]">{evt.actor}</span>
              </div>

              <h4 className="text-sm font-semibold text-[#E9EEF4]">{evt.summary}</h4>
              <p className="text-xs text-[#9AA6B4] leading-relaxed">{evt.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ================= COUNTERPARTIES VIEW =================
export const CounterpartiesView: React.FC<{ onNavigate: (p: string) => void }> = ({
  onNavigate,
}) => {
  const { counterparties, commitments } = useApp();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-[#E9EEF4]">
      <div className="space-y-1 pb-4 border-b border-[#222933]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
            Counterparty Intelligence
          </span>
          <span className="text-[#667486]">·</span>
          <span className="text-xs font-mono text-[#9AA6B4]">
            {counterparties.length} External Entities
          </span>
        </div>
        <h1 className="text-2xl font-serif text-[#E9EEF4]">Project Counterparties</h1>
        <p className="text-xs text-[#9AA6B4]">
          External entities whose physical performance governs project critical commitments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {counterparties.map((cp) => {
          const ownedCommitments = commitments.filter((c) => c.counterpartyId === cp.id);
          const hasConflicts = ownedCommitments.some((c) =>
            c.conditionFlags.includes('CONTRADICTORY')
          );

          return (
            <div
              key={cp.id}
              className="bg-[#12161B] border border-[#222933] rounded-lg p-6 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#3A6FD8] font-bold">{cp.id}</span>
                  <span className="text-[10px] bg-[#1A1F26] px-2 py-0.5 rounded text-[#9AA6B4]">
                    {cp.type}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[#E9EEF4]">{cp.name}</h3>
                <p className="text-xs text-[#9AA6B4]">{cp.contactEmail}</p>
              </div>

              <div className="p-3 bg-[#0D1116] rounded border border-[#222933] space-y-1 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[#667486]">GOVERNED COMMITMENTS:</span>
                  <span className="text-[#E9EEF4] font-bold">{ownedCommitments.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#667486]">CONFLICTS PRESENT:</span>
                  <span className={hasConflicts ? 'text-[#C4483F] font-bold' : 'text-[#2E9268]'}>
                    {hasConflicts ? 'Yes (Conflicts Flagged)' : 'None'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('/commitments')}
                className="w-full py-2 bg-[#1A1F26] hover:bg-[#222933] border border-[#222933] rounded text-xs text-[#E9EEF4] transition-colors cursor-pointer"
              >
                Filter Registry by Counterparty
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ================= SETTINGS & GOVERNANCE VIEW =================
export const SettingsView: React.FC = () => {
  const { project } = useApp();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-fadeIn text-[#E9EEF4]">
      <div className="space-y-1 pb-4 border-b border-[#222933]">
        <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
          Enterprise Administration
        </span>
        <h1 className="text-2xl font-serif text-[#E9EEF4]">Organisation & Governance Settings</h1>
      </div>

      <div className="space-y-6 text-xs">
        {/* Project Details */}
        <div className="bg-[#12161B] border border-[#222933] rounded-lg p-6 space-y-4">
          <h3 className="text-sm font-semibold text-[#E9EEF4]">Project Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
            <div>
              <span className="text-[10px] text-[#667486] block">PROJECT NAME</span>
              <span className="text-[#E9EEF4]">{project.name}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#667486] block">CAPITAL ASSET VALUE</span>
              <span className="text-[#E9EEF4]">{project.capitalValue}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#667486] block">CLAIMED COD</span>
              <span className="text-[#E9EEF4]">{project.claimedCOD}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#667486] block">ASSET TYPE</span>
              <span className="text-[#E9EEF4]">{project.assetType}</span>
            </div>
          </div>
        </div>

        {/* Roles & Permissions */}
        <div className="bg-[#12161B] border border-[#222933] rounded-lg p-6 space-y-4">
          <h3 className="text-sm font-semibold text-[#E9EEF4]">Governance Personas & Authority</h3>
          <ul className="space-y-3 font-mono text-[11px] text-[#9AA6B4]">
            <li className="p-3 bg-[#0D1116] rounded border border-[#222933]">
              <strong className="text-[#E9EEF4] block">Project Owner:</strong> Ingestion, Review Queue, Task Management.
            </li>
            <li className="p-3 bg-[#0D1116] rounded border border-[#222933]">
              <strong className="text-[#E9EEF4] block">Investment / Capital Reviewer:</strong> Gate Drawdown Decisions, Exception Signoff.
            </li>
            <li className="p-3 bg-[#0D1116] rounded border border-[#222933]">
              <strong className="text-[#E9EEF4] block">Assurance Analyst:</strong> Provenance Analysis, Contradiction Triaging.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// ================= DOCS & LEXICON VIEW =================
export const DocsLexiconView: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 animate-fadeIn text-[#E9EEF4]">
      <div className="space-y-2 pb-4 border-b border-[#222933]">
        <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
          Epistemic Reference
        </span>
        <h1 className="text-3xl font-serif text-[#E9EEF4]">Assurance Lexicon & Documentation</h1>
        <p className="text-xs text-[#9AA6B4]">
          Formal specification of assurance states, provenance rules, condition flags and capital boundaries.
        </p>
      </div>

      {/* Ladder States 0 to 8 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[#E9EEF4] font-serif">
          The 9 Canonical Assurance Ladder States (0 to 8)
        </h2>

        <div className="space-y-3">
          {[
            { num: 0, name: 'UNKNOWN', desc: 'No verifiable documentary record or formal assertion recorded in the workspace.' },
            { num: 1, name: 'CLAIMED', desc: 'Party asserts date or delivery without accessible documentary artifact.' },
            { num: 2, name: 'DOCUMENTED', desc: 'Single written record exists (e.g. EPC schedule, PO, vendor letter).' },
            { num: 3, name: 'CORROBORATED', desc: 'Multiple records exist but share common provenance or restate one underlying schedule.' },
            { num: 4, name: 'SUBSTANTIATED', desc: 'Satisfies policy for decision: distinct independent provenance paths verified.' },
            { num: 5, name: 'EXECUTING', desc: 'Accredited third-party surveyor / test lab physical observation recorded.' },
            { num: 6, name: 'DELIVERED', desc: 'Component confirmed on project site with bill of lading and receiving report.' },
            { num: 7, name: 'ACCEPTED', desc: 'Component integrated, energized, pressure tested or statutory signoff achieved.' },
            { num: 8, name: 'OPERATIONAL', desc: 'Final financial and commercial closeout completed with zero outstanding disputes.' },
          ].map((s) => (
            <div
              key={s.num}
              className="p-4 bg-[#12161B] border border-[#222933] rounded-lg flex items-start gap-4 text-xs font-mono"
            >
              <span className="text-base font-bold text-[#3A6FD8] w-6 shrink-0">[{s.num}]</span>
              <div className="space-y-1">
                <span className="font-bold text-[#E9EEF4]">{s.name}</span>
                <p className="text-[#9AA6B4]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Condition Flags */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[#E9EEF4] font-serif">
          Orthogonal Condition Flags
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-[#12161B] border border-[#C4483F]/30 rounded-lg space-y-1">
            <span className="text-[#C4483F] font-bold uppercase">CONTRADICTORY</span>
            <p className="text-[#9AA6B4]">
              Active conflicting evidence records (e.g. Ocean booking departing after promised site arrival).
            </p>
          </div>
          <div className="p-4 bg-[#12161B] border border-[#C8922F]/30 rounded-lg space-y-1">
            <span className="text-[#C8922F] font-bold uppercase">STALE</span>
            <p className="text-[#9AA6B4]">
              Evidence observed age exceeds policy freshness window without re-observation.
            </p>
          </div>
          <div className="p-4 bg-[#12161B] border border-[#C8922F]/30 rounded-lg space-y-1">
            <span className="text-[#C8922F] font-bold uppercase">EXPIRED</span>
            <p className="text-[#9AA6B4]">
              Statutory permit or vendor quotation validity period has lapsed.
            </p>
          </div>
          <div className="p-4 bg-[#12161B] border border-[#C4483F]/30 rounded-lg space-y-1">
            <span className="text-[#C4483F] font-bold uppercase">DISPUTED</span>
            <p className="text-[#9AA6B4]">
              Counterparty has formally contested responsibility, specification, or scope.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
