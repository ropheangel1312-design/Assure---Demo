import React from 'react';
import { useApp } from '../../context/AppContext';
import { ASSURANCE_STATE_NAMES } from '../../engine/evaluation';
import { StateBadge } from '../common/StateBadge';
import { ConditionFlagChip } from '../common/ConditionFlagChip';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileCheck2,
  FileCode,
  FileSearch,
  FileText,
  GitBranch,
  GitFork,
  Layers,
  Network,
  Plus,
  Scale,
  Share2,
  Shield,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

interface CommitmentDetailProps {
  commitmentId: string;
  onNavigate: (path: string) => void;
}

export const CommitmentDetail: React.FC<CommitmentDetailProps> = ({
  commitmentId,
  onNavigate,
}) => {
  const {
    commitments,
    evidence,
    tasks,
    policies,
    gates,
    counterparties,
    setSelectedEvidenceId,
    setWhyThisStateCommitmentId,
    setCertificateCommitmentId,
    evaluateOneCommitment,
    createTask,
    addToast,
  } = useApp();

  const commitment = commitments.find((c) => c.id === commitmentId) || commitments[0];
  const policy = policies.find((p) => p.id === commitment.policyId);
  const counterparty = counterparties.find((cp) => cp.id === commitment.counterpartyId);
  const linkedGate = gates.find((g) => g.id === commitment.applicableGateId);

  // Evidence linked to this commitment
  const linkedEvidence = evidence.filter((e) =>
    commitment.evidenceIds.includes(e.id)
  );

  // Tasks linked to this commitment
  const linkedTasks = tasks.filter((t) => t.commitmentId === commitment.id);

  // Evaluate single commitment logic trace
  const evaluation = evaluateOneCommitment(commitment.id);

  const handleCreateResolutionTask = (contradictionText: string) => {
    createTask({
      commitmentId: commitment.id,
      title: `Resolve Contradiction: ${contradictionText.slice(0, 50)}...`,
      description: `Investigate and obtain independent verification regarding: ${contradictionText}`,
      assigneeName: 'S. Jenkins (Lead Assurance Engineer)',
      assigneeRole: 'Assurance Analyst',
      dueDate: '2028-10-25',
      requiredEvidenceType: 'Independent Third-Party Verification / Surveyor Report',
    });
    addToast({
      title: 'Resolution Task Created',
      message: 'New evidence collection task added to the project queue.',
      type: 'success',
    });
    onNavigate('/tasks');
  };

  const handleGenerateMissingTask = (missingReq: string) => {
    createTask({
      commitmentId: commitment.id,
      title: `Procure ${missingReq}`,
      description: `Satisfy policy ${policy?.name} requirement: ${missingReq}`,
      assigneeName: 'P. Nair (EPC Coordinator)',
      assigneeRole: 'Project Owner',
      dueDate: '2028-10-20',
      requiredEvidenceType: missingReq,
    });
    addToast({
      title: 'Evidence Task Created',
      message: `Task generated to procure ${missingReq}.`,
      type: 'success',
    });
    onNavigate('/tasks');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn text-[#E9EEF4]">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#222933]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/commitments')}
            className="p-1.5 rounded bg-[#1A1F26] hover:bg-[#222933] text-[#9AA6B4] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[#3A6FD8]">{commitment.id}</span>
              <span className="text-[#667486]">·</span>
              <span className="text-[#9AA6B4]">{commitment.type}</span>
              <span className="text-[#667486]">·</span>
              <span className="text-[#C8922F] uppercase font-semibold">
                {commitment.criticality} CRITICALITY
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif text-[#E9EEF4] font-normal">
              {commitment.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setWhyThisStateCommitmentId(commitment.id)}
            className="px-3 py-2 bg-[#1A1F26] hover:bg-[#222933] border border-[#222933] rounded text-xs text-[#E9EEF4] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileSearch className="w-3.5 h-3.5 text-[#3A6FD8]" />
            <span>Why This State?</span>
          </button>
          <button
            type="button"
            onClick={() => setCertificateCommitmentId(commitment.id)}
            className="px-3 py-2 bg-[#3A6FD8] hover:bg-[#4C82EC] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Export Certificate</span>
          </button>
        </div>
      </div>

      {/* Header Status Band */}
      <div className="bg-[#12161B] border border-[#222933] rounded-lg p-5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs shadow-xl">
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <span className="text-[10px] text-[#667486] uppercase block mb-1">
              CURRENT ASSURANCE STATE
            </span>
            <StateBadge
              stateIndex={commitment.currentState}
              size="md"
              onClick={() => setWhyThisStateCommitmentId(commitment.id)}
            />
          </div>

          <div className="border-l border-[#222933] pl-4">
            <span className="text-[10px] text-[#667486] uppercase block mb-1">
              REQUIRED FOR GATE
            </span>
            <span className="font-semibold text-[#9AA6B4]">
              [{commitment.requiredState}] {ASSURANCE_STATE_NAMES[commitment.requiredState]}
            </span>
          </div>

          <div className="border-l border-[#222933] pl-4">
            <span className="text-[10px] text-[#667486] uppercase block mb-1">
              CONDITION FLAGS
            </span>
            <div className="flex items-center gap-1">
              {commitment.conditionFlags.length > 0 ? (
                commitment.conditionFlags.map((f) => (
                  <ConditionFlagChip key={f} flag={f} size="md" />
                ))
              ) : (
                <span className="text-[#2E9268] font-bold text-xs">NONE (CLEAN)</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-[#9AA6B4]">
          <div>
            <span className="text-[10px] text-[#667486] block">DEADLINE</span>
            <span className="text-[#E9EEF4] font-semibold">{commitment.deadline}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#667486] block">GOVERNING POLICY</span>
            <span className="text-[#E9EEF4]">{policy?.name} {policy?.version}</span>
          </div>
        </div>
      </div>

      {/* 3-Column Layout: Left/Center 8 cols, Right 4 cols */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Block 1: What is promised */}
          <div className="bg-[#12161B] border border-[#222933] rounded-lg p-6 space-y-4">
            <h2 className="text-xs font-mono uppercase text-[#3A6FD8] tracking-wider font-semibold">
              01 · What is Promised (Verbatim Terms)
            </h2>

            <div className="p-4 bg-[#0A0C0F] rounded border border-[#222933] space-y-3 font-mono text-xs">
              <div>
                <span className="text-[10px] text-[#667486] block">CONTRACTUAL Wording</span>
                <p className="text-[#E9EEF4] leading-relaxed italic">
                  "{commitment.rawContractualWording}"
                </p>
              </div>

              {commitment.contractualQualifiers.length > 0 && (
                <div className="pt-2 border-t border-[#222933]">
                  <span className="text-[10px] text-[#C8922F] block font-semibold mb-1">
                    PRESERVED QUALIFIERS & CAVEATS:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-[#C8922F]">
                    {commitment.contractualQualifiers.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-[10px] text-[#667486] block">RESPONSIBLE COUNTERPARTY</span>
                <span className="text-[#E9EEF4] font-semibold">{counterparty?.name}</span>
                <span className="text-[#667486] block text-[10px]">{counterparty?.type}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#667486] block">REQUIRED PHYSICAL OUTCOME</span>
                <span className="text-[#E9EEF4]">{commitment.requiredOutcome}</span>
              </div>
            </div>
          </div>

          {/* Block 2: Why we believe it (or don't) */}
          <div className="bg-[#12161B] border border-[#222933] rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase text-[#2E9268] tracking-wider font-semibold">
                02 · Evidence Records & Provenance
              </h2>
              <span className="text-xs font-mono text-[#9AA6B4]">
                {commitment.independentEvidencePathCount} independent paths from {linkedEvidence.length} records
              </span>
            </div>

            <div className="space-y-3">
              {linkedEvidence.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => setSelectedEvidenceId(ev.id)}
                  className="p-4 bg-[#0A0C0F] hover:bg-[#161C23] border border-[#222933] rounded-lg space-y-2 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#3A6FD8]" />
                      <span className="font-mono text-xs font-semibold text-[#E9EEF4] group-hover:text-[#3A6FD8]">
                        {ev.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono bg-[#1A1F26] px-2 py-0.5 rounded text-[#9AA6B4] border border-[#222933]">
                      {ev.originClass}
                    </span>
                  </div>

                  <p className="text-xs text-[#9AA6B4] leading-relaxed line-clamp-2">
                    {ev.claimExtracted}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#667486] pt-1">
                    <span>Source: {ev.sourceName}</span>
                    <span>Observed: {ev.observedDate} ({ev.freshnessDays}d ago)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Block 3: Inline Mini Evidence Graph */}
          <div className="bg-[#12161B] border border-[#222933] rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase text-[#3A6FD8] tracking-wider font-semibold flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5" /> 03 · Evidence Graph Topology
              </h2>
              <button
                type="button"
                onClick={() => onNavigate('/graph/evidence')}
                className="text-xs text-[#3A6FD8] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <span>Open Full Interactive Graph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Visual Node-Link Preview */}
            <div className="p-5 bg-[#0A0C0F] rounded border border-[#222933] space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E9EEF4]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3A6FD8]" />
                <span>ROOT: {commitment.id}</span>
              </div>

              <div className="ml-5 border-l-2 border-[#222933] pl-4 space-y-2 text-[11px]">
                <div className="text-[#9AA6B4] flex items-center gap-2">
                  <span className="text-[#667486]">├── Path 1 (Same-origin):</span>
                  <span className="text-[#E9EEF4]">Apex EPC Schedule → Weekly Report</span>
                </div>
                <div className="text-[#9AA6B4] flex items-center gap-2">
                  <span className="text-[#667486]">├── Path 2 (Counterparty):</span>
                  <span className="text-[#E9EEF4]">Voltrix PO #PO-9941 → Factory Acceptance Letter</span>
                </div>
                {commitment.conditionFlags.includes('CONTRADICTORY') && (
                  <div className="text-[#C4483F] flex items-center gap-2 font-semibold">
                    <span className="text-[#C4483F]">├── Path 3 (Conflict):</span>
                    <span>Maersk Ocean Booking #MSK-7710 (02 Nov Departure)</span>
                  </div>
                )}
                <div className="text-[#C8922F] flex items-center gap-2 italic">
                  <span className="text-[#C8922F]">└── Missing Node:</span>
                  <span>Independent Third-Party Factory Inspection (Bureau Veritas)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Block 4: Contradictions & Conflicts */}
          {commitment.contradictions.length > 0 && (
            <div className="bg-[#12161B] border border-[#C4483F]/40 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#C4483F]">
                <AlertOctagon className="w-5 h-5" />
                <h2 className="text-xs font-mono uppercase tracking-wider font-bold">
                  04 · Active Contradictions Detected ({commitment.contradictions.length})
                </h2>
              </div>

              <div className="space-y-3">
                {commitment.contradictions.map((ct) => (
                  <div
                    key={ct.id}
                    className="p-4 bg-[#C4483F]/10 border border-[#C4483F]/30 rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#C4483F] font-bold">
                        Conflict: {ct.conflictingField}
                      </span>
                      <span className="text-[10px] bg-[#C4483F]/20 text-[#C4483F] px-2 py-0.5 rounded uppercase">
                        {ct.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-[#0D1116] p-3 rounded border border-[#222933]">
                      <div>
                        <span className="text-[10px] text-[#667486] block">EVALUATED EVIDENCE</span>
                        <span className="text-[#E9EEF4] font-semibold">{ct.evaluatedValue}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#C4483F] block">CONFLICTING RECORD</span>
                        <span className="text-[#C4483F] font-bold">{ct.conflictingValue}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#E9EEF4] leading-relaxed">{ct.description}</p>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleCreateResolutionTask(ct.description)}
                        className="px-3 py-1.5 bg-[#C4483F] hover:bg-[#D9554B] text-white rounded text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Create Resolution Task</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Block 6: What is Missing to Advance State */}
          <div className="bg-[#12161B] border border-[#222933] rounded-lg p-6 space-y-4">
            <h2 className="text-xs font-mono uppercase text-[#C8922F] tracking-wider font-semibold">
              05 · Required Evidence Gaps to Reach [{commitment.requiredState}]{' '}
              {ASSURANCE_STATE_NAMES[commitment.requiredState]}
            </h2>

            <div className="space-y-2">
              {evaluation.missingForNext.length > 0 ? (
                evaluation.missingForNext.map((gap, i) => (
                  <div
                    key={i}
                    className="p-3 bg-[#0A0C0F] rounded border border-[#222933] flex items-center justify-between text-xs font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C8922F]" />
                      <span className="text-[#E9EEF4]">{gap}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleGenerateMissingTask(gap)}
                      className="text-xs text-[#3A6FD8] hover:underline cursor-pointer"
                    >
                      Generate Task
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-[#2E9268]/10 text-[#2E9268] rounded border border-[#2E9268]/30 text-xs font-mono">
                  All policy evidentiary thresholds currently satisfied.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Rail: Impact & Governance (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Impact Card */}
          <div className="bg-[#12161B] border border-[#222933] rounded-lg p-6 space-y-4">
            <h3 className="text-xs font-mono uppercase text-[#9AA6B4] tracking-wider font-semibold flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-[#3A6FD8]" /> Project Impact Tracing
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-[#0D1116] rounded border border-[#222933]">
                <span className="text-[10px] text-[#667486] block">DIRECT DEPENDENT MILESTONE</span>
                <span className="text-[#E9EEF4] font-semibold">{commitment.impactMilestone}</span>
              </div>

              <div className="p-3 bg-[#0D1116] rounded border border-[#222933]">
                <span className="text-[10px] text-[#667486] block">PROJECT COD IMPACT</span>
                <span className="text-[#C4483F] font-bold">{commitment.impactSummary}</span>
              </div>

              <div className="p-3 bg-[#0D1116] rounded border border-[#222933]">
                <span className="text-[10px] text-[#667486] block">FINANCIAL EXPOSURE</span>
                <span className="text-lg font-serif text-[#E9EEF4] font-bold">
                  {commitment.financialExposure}
                </span>
              </div>

              <div className="p-3 bg-[#0D1116] rounded border border-[#222933]">
                <span className="text-[10px] text-[#667486] block">LINKED CAPITAL GATE</span>
                <button
                  type="button"
                  onClick={() => onNavigate(`/gates/${commitment.applicableGateId}`)}
                  className="text-xs text-[#3A6FD8] hover:underline font-semibold text-left block mt-0.5"
                >
                  {linkedGate?.name} ({commitment.applicableGateId})
                </button>
              </div>
            </div>
          </div>

          {/* Open Tasks Card */}
          <div className="bg-[#12161B] border border-[#222933] rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase text-[#9AA6B4] tracking-wider font-semibold">
                Open Evidence Tasks ({linkedTasks.length})
              </h3>
              <button
                type="button"
                onClick={() => onNavigate('/tasks')}
                className="text-xs text-[#3A6FD8] hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-2">
              {linkedTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => onNavigate('/tasks')}
                  className="p-3 bg-[#0D1116] hover:bg-[#161C23] rounded border border-[#222933] space-y-1 cursor-pointer transition-colors text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#3A6FD8]">{t.id}</span>
                    <span className="text-[10px] font-mono text-[#667486]">{t.dueDate}</span>
                  </div>
                  <div className="font-medium text-[#E9EEF4] line-clamp-1">{t.title}</div>
                  <div className="text-[10px] text-[#9AA6B4]">Assignee: {t.assigneeName}</div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => handleGenerateMissingTask('Evidence Submission')}
                className="w-full py-2 bg-[#1A1F26] hover:bg-[#222933] border border-[#222933] rounded text-xs text-[#E9EEF4] font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-[#3A6FD8]" />
                <span>Add Evidence Task</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
