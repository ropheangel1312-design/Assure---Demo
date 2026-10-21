import React from 'react';
import { useApp } from '../../context/AppContext';
import { ConditionFlagChip } from '../common/ConditionFlagChip';
import { StateBadge } from '../common/StateBadge';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileSearch,
  FolderKanban,
  GitBranch,
  Network,
  RefreshCw,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Zap,
} from 'lucide-react';

interface ProjectOverviewProps {
  onNavigate: (path: string) => void;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({ onNavigate }) => {
  const {
    project,
    commitments,
    gates,
    events,
    setSelectedCommitmentId,
    setWhyThisStateCommitmentId,
    addToast,
  } = useApp();

  const nextGate = gates.find((g) => g.id === project.nextGateId) || gates[1];

  // Threatening commitments (failing Gate 4 conditions)
  const threateningCommitments = commitments.filter(
    (c) =>
      c.applicableGateId === 'GATE-4' &&
      (c.currentState < c.requiredState || c.conditionFlags.length > 0)
  );

  const substantiatedCount = commitments.filter((c) => c.currentState >= 4).length;
  const documentedCount = commitments.filter((c) => c.currentState === 2 || c.currentState === 3).length;
  const claimedCount = commitments.filter((c) => c.currentState === 1).length;
  const contradictoryCount = commitments.filter((c) => c.conditionFlags.includes('CONTRADICTORY')).length;

  // Capital assurance percentage calculation (substantiated / total)
  const capitalAssurancePercent = Math.round((substantiatedCount / commitments.length) * 100);

  const handleExportLedger = () => {
    const dataStr = JSON.stringify(commitments, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CommitmentLedger-${project.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({
      title: 'Ledger Exported',
      message: 'Full Commitment Ledger JSON exported successfully.',
      type: 'success',
    });
  };

  const handleReevaluateAll = () => {
    addToast({
      title: 'Assurance Re-evaluated',
      message: 'All 47 commitments evaluated against governing policies. No new drift detected.',
      type: 'info',
    });
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-[#EDEDED]">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-semibold">
              Capital Assurance Cockpit
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs font-mono text-neutral-400">{project.id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-bold text-[#EDEDED] tracking-tight">
            {project.name}
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleReevaluateAll}
            className="px-3.5 py-2 bg-[#111111] hover:bg-[#1A1A1A] border border-[#262626] hover:border-[#333333] rounded-xl text-xs text-[#EDEDED] flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
            <span>Re-run Evaluation</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/ingest')}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Ingest Evidence</span>
          </button>
          <button
            type="button"
            onClick={handleExportLedger}
            className="px-3.5 py-2 bg-[#111111] hover:bg-[#1A1A1A] border border-[#262626] hover:border-[#333333] rounded-xl text-xs text-[#EDEDED] flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-neutral-400" />
            <span>Export Ledger</span>
          </button>
        </div>
      </div>

      {/* ================= BENTO GRID MASTER LAYOUT ================= */}
      <div className="grid grid-cols-12 gap-5">
        {/* Bento Cell 1: Hero Focus / Next Capital Gate (Span 5 on lg) */}
        <div className="col-span-12 lg:col-span-5 bg-indigo-600 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-indigo-900/20 text-white">
          <div className="z-10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-indigo-100 text-xs font-mono font-semibold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/15">
                Current Capital Gate
              </span>
              <span className="text-xs font-mono text-indigo-200">
                COD: {project.claimedCOD}
              </span>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
                {nextGate?.name}
              </div>
              <p className="text-xs text-indigo-100 opacity-90">
                Release Decision Date: {nextGate?.decisionDate} · Assigned: {nextGate?.assignedReviewerName}
              </p>
            </div>
          </div>

          <div className="z-10 pt-6 mt-4 border-t border-white/15 flex items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-indigo-200 uppercase tracking-wider block">
                Capital at Stake
              </span>
              <div className="text-3xl sm:text-4xl font-bold tracking-tight font-mono">
                {nextGate?.capitalAmount}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate(`/gates/${nextGate?.id}`)}
              className="bg-white text-indigo-600 hover:bg-neutral-100 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Inspect Gate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Ambient blur glow */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-400 rounded-full opacity-30 blur-3xl pointer-events-none"></div>
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-300 rounded-full opacity-20 blur-2xl pointer-events-none"></div>
        </div>

        {/* Bento Cell 2: Dual Metric & Index Gauges (Span 7 on lg) */}
        <div className="col-span-12 lg:col-span-7 bg-[#111111] border border-[#262626] rounded-3xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-[#EDEDED] tracking-tight">
                Assurance vs. Progress Dual Index
              </h2>
              <p className="text-xs text-neutral-400">
                Comparing physical site execution against formal evidentiary substantiation
              </p>
            </div>
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20 font-mono">
              Policy v1.0
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
            {/* Physical Site Works */}
            <div className="p-4 bg-[#1A1A1A] border border-[#333333] rounded-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-400">Physical Site Works</span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">On Track</span>
              </div>
              <div className="my-2">
                <div className="text-3xl font-bold tracking-tight text-[#EDEDED] font-mono">
                  {project.executionProgressPercent}%
                </div>
                <div className="w-full bg-[#262626] h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${project.executionProgressPercent}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-[11px] text-neutral-500">Civil & mechanical completion</div>
            </div>

            {/* Evidentiary Assurance */}
            <div className="p-4 bg-[#1A1A1A] border border-[#333333] rounded-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-400">Evidentiary Assurance</span>
                <span className="text-xs font-mono text-indigo-400 font-semibold">Deterministic</span>
              </div>
              <div className="my-2">
                <div className="text-3xl font-bold tracking-tight text-indigo-400 font-mono">
                  {capitalAssurancePercent}%
                </div>
                <div className="w-full bg-[#262626] h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${capitalAssurancePercent}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-[11px] text-neutral-500">Substantiated under policy standard</div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#262626] flex items-center justify-between text-xs text-neutral-400">
            <span className="italic">
              "Physical completion never excuses unproven dependencies before capital disbursement."
            </span>
          </div>
        </div>

        {/* Bento Cell 3: Four-Bucket State Metric Strip (Span 12) */}
        <div className="col-span-12 bg-[#111111] border border-[#262626] rounded-3xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-base font-semibold text-[#EDEDED] tracking-tight">
                {commitments.length} Critical Commitments Governed
              </h2>
              <p className="text-xs text-neutral-400">
                Distribution across canonical ladder states and material condition flags
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/commitments')}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>Explore All Commitments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => onNavigate('/commitments')}
              className="p-4 bg-[#1A1A1A] hover:bg-[#222222] border border-[#333333] hover:border-emerald-500/50 rounded-2xl cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  SUBSTANTIATED
                </span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></div>
              </div>
              <div className="my-2">
                <span className="text-3xl font-bold text-emerald-400 font-mono tracking-tight">
                  {substantiatedCount}
                </span>
              </div>
              <span className="text-[11px] text-neutral-400">Policy Standard Satisfied</span>
            </div>

            <div
              onClick={() => onNavigate('/commitments')}
              className="p-4 bg-[#1A1A1A] hover:bg-[#222222] border border-[#333333] hover:border-indigo-500/50 rounded-2xl cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  DOCUMENTED
                </span>
                <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform"></div>
              </div>
              <div className="my-2">
                <span className="text-3xl font-bold text-indigo-400 font-mono tracking-tight">
                  {documentedCount}
                </span>
              </div>
              <span className="text-[11px] text-neutral-400">Single Origin Class Only</span>
            </div>

            <div
              onClick={() => onNavigate('/commitments')}
              className="p-4 bg-[#1A1A1A] hover:bg-[#222222] border border-[#333333] hover:border-amber-500/50 rounded-2xl cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  CLAIMED
                </span>
                <div className="w-2 h-2 rounded-full bg-amber-500 group-hover:scale-125 transition-transform"></div>
              </div>
              <div className="my-2">
                <span className="text-3xl font-bold text-amber-400 font-mono tracking-tight">
                  {claimedCount}
                </span>
              </div>
              <span className="text-[11px] text-neutral-400">Vendor Assertion Only</span>
            </div>

            <div
              onClick={() => onNavigate('/commitments')}
              className="p-4 bg-[#1A1A1A] hover:bg-[#222222] border border-[#333333] hover:border-red-500/50 rounded-2xl cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  CONTRADICTORY
                </span>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              </div>
              <div className="my-2">
                <span className="text-3xl font-bold text-red-400 font-mono tracking-tight">
                  {contradictoryCount}
                </span>
              </div>
              <span className="text-[11px] text-red-400/80">Active Material Conflict</span>
            </div>
          </div>
        </div>

        {/* Bento Cell 4: Blockers Threatening Gate 4 (Span 7 on lg) */}
        <div className="col-span-12 lg:col-span-7 bg-[#111111] border border-[#262626] rounded-3xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#EDEDED] tracking-tight">
                  Threatening Capital Gate 4
                </h3>
                <p className="text-xs text-neutral-400">
                  {threateningCommitments.length} direct blockers holding back ₹50 crore drawdown
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20">
              High Priority
            </span>
          </div>

          <div className="space-y-3">
            {threateningCommitments.map((c) => (
              <div
                key={c.id}
                onClick={() => onNavigate(`/commitments/${c.id}`)}
                className="p-4 bg-[#1A1A1A] hover:bg-[#222222] border border-[#333333] hover:border-[#444444] rounded-2xl transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-10 bg-red-500 rounded-full shrink-0"></div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-xs font-bold text-indigo-400">{c.id}</span>
                      <StateBadge stateIndex={c.currentState} size="sm" />
                      {c.conditionFlags.map((flag) => (
                        <ConditionFlagChip key={flag} flag={flag} size="sm" />
                      ))}
                    </div>
                    <div className="text-xs font-medium text-[#EDEDED] group-hover:text-white line-clamp-1">
                      {c.title}
                    </div>
                    <div className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                      {c.impactSummary}
                    </div>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <div className="text-xs font-mono text-neutral-300 font-semibold">
                    {c.financialExposure}
                  </div>
                  <span className="text-[11px] text-indigo-400 group-hover:underline flex items-center sm:justify-end gap-1 mt-0.5">
                    Inspect <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Cell 5: Recent Audit Timeline (Span 5 on lg) */}
        <div className="col-span-12 lg:col-span-5 bg-[#111111] border border-[#262626] rounded-3xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-indigo-400" />
              </div>
              <h3 className="text-base font-semibold text-[#EDEDED] tracking-tight">
                Live Audit Activity
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/timeline')}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {events.slice(0, 3).map((evt) => (
              <div
                key={evt.id}
                className="p-3.5 bg-[#1A1A1A] border border-[#333333] rounded-2xl space-y-1"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-indigo-400 font-medium">{evt.displayDate}</span>
                  <span className="text-neutral-500 font-mono text-[10px]">{evt.actor}</span>
                </div>
                <div className="text-xs font-semibold text-[#EDEDED] line-clamp-1">{evt.summary}</div>
                <div className="text-[11px] text-neutral-400 line-clamp-1">{evt.detail}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between text-xs text-neutral-500">
            <span>Deterministic verification trail</span>
            <span className="font-mono text-emerald-400 text-[11px]">Verified Ledger ✓</span>
          </div>
        </div>

        {/* Bento Cell 6: Dependency Graph Structure (Span 12) */}
        <div className="col-span-12 bg-[#111111] border border-[#262626] rounded-3xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-semibold">
                Structural Topology
              </div>
              <h3 className="text-base font-semibold text-[#EDEDED] tracking-tight">
                Commitment Graph Hierarchy Under COD 30 Nov 2028
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/graph/impact')}
              className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#222222] border border-[#333333] text-indigo-400 text-xs font-medium rounded-2xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Network className="w-3.5 h-3.5" />
              <span>Explore Interactive Impact Graph</span>
            </button>
          </div>

          {/* Topology preview nodes */}
          <div className="p-4 bg-[#0D0D0D] rounded-2xl border border-[#262626] space-y-4 font-mono text-xs">
            {/* Root: COD */}
            <div className="flex items-center gap-3 p-3.5 bg-[#1A1A1A] rounded-xl border border-indigo-500/30">
              <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-md shadow-indigo-500/50" />
              <span className="font-bold text-[#EDEDED]">
                PROJECT COD: 30 Nov 2028 (100 MW Commercial Operation)
              </span>
              <span className="text-[10px] text-neutral-400 ml-auto">Capital: $1B</span>
            </div>

            {/* Branch 1: Power Chain (Weakest Path) */}
            <div className="ml-4 sm:ml-6 space-y-2 border-l-2 border-red-500/40 pl-4">
              <div className="text-xs font-semibold text-[#EDEDED] flex items-center gap-2">
                <span className="text-red-400">↳</span>
                <span>Power Readiness Chain (Weakest Path)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                <div
                  onClick={() => onNavigate('/commitments/COM-10492')}
                  className="bg-[#1A1A1A] hover:bg-[#222222] p-3 rounded-xl border border-emerald-500/30 cursor-pointer transition-all"
                >
                  <div className="text-emerald-400 font-bold">Grid Interconnection [4]</div>
                  <div className="text-neutral-400 text-[10px]">MSETCL 100MW Feeder</div>
                </div>
                <div
                  onClick={() => onNavigate('/commitments/COM-48291')}
                  className="bg-[#1A1A1A] hover:bg-[#222222] p-3 rounded-xl border border-red-500/50 cursor-pointer transition-all shadow-xs"
                >
                  <div className="text-red-400 font-bold">220kV Transformer [2 ⚠]</div>
                  <div className="text-neutral-400 text-[10px]">Logistics Conflict 02 Nov</div>
                </div>
                <div
                  onClick={() => onNavigate('/commitments/COM-48293')}
                  className="bg-[#1A1A1A] hover:bg-[#222222] p-3 rounded-xl border border-indigo-500/30 cursor-pointer transition-all"
                >
                  <div className="text-indigo-400 font-bold">Energisation Signoff [2]</div>
                  <div className="text-neutral-400 text-[10px]">CEIG Statutory</div>
                </div>
              </div>
            </div>

            {/* Branch 2: Cooling Chain */}
            <div className="ml-4 sm:ml-6 space-y-2 border-l-2 border-[#262626] pl-4">
              <div className="text-xs font-semibold text-[#EDEDED] flex items-center gap-2">
                <span className="text-neutral-500">↳</span>
                <span>Cooling & Mechanical Plant Chain</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                <div
                  onClick={() => onNavigate('/commitments/COM-33019')}
                  className="bg-[#1A1A1A] hover:bg-[#222222] p-3 rounded-xl border border-emerald-500/30 cursor-pointer transition-all"
                >
                  <div className="text-emerald-400 font-bold">Water Supply 4.5 MLD [4]</div>
                  <div className="text-neutral-400 text-[10px]">NMMC Agreement</div>
                </div>
                <div
                  onClick={() => onNavigate('/commitments/COM-33020')}
                  className="bg-[#1A1A1A] hover:bg-[#222222] p-3 rounded-xl border border-red-500/50 cursor-pointer transition-all"
                >
                  <div className="text-red-400 font-bold">Water Permit 2.8 MLD [3 ⚠]</div>
                  <div className="text-neutral-400 text-[10px]">MPCB Discharge Cap</div>
                </div>
                <div
                  onClick={() => onNavigate('/commitments/COM-55101')}
                  className="bg-[#1A1A1A] hover:bg-[#222222] p-3 rounded-xl border border-emerald-500/30 cursor-pointer transition-all"
                >
                  <div className="text-emerald-400 font-bold">Chillers 1-4 [4]</div>
                  <div className="text-neutral-400 text-[10px]">FAT Tested by BV</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
