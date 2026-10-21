import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Policy, EvidenceTask } from '../../types';
import { ASSURANCE_STATE_NAMES } from '../../engine/evaluation';
import {
  CheckCircle2,
  Clock,
  Download,
  FileCheck2,
  FileCode,
  FileText,
  Filter,
  Plus,
  Scale,
  Search,
  Shield,
  Upload,
  X,
} from 'lucide-react';

// ================= ASSURANCE POLICIES VIEW =================
export const AssurancePoliciesView: React.FC<{ onNavigate: (p: string) => void }> = ({
  onNavigate,
}) => {
  const { policies, commitments, addToast } = useApp();
  const [selectedPolicyId, setSelectedPolicyId] = useState(policies[0]?.id || 'POL-EQ-01');

  const policy = policies.find((p) => p.id === selectedPolicyId) || policies[0];
  const governedCommitments = commitments.filter((c) => c.policyId === policy.id);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-[#E9EEF4]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#222933]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
              Governance Standard
            </span>
            <span className="text-[#667486]">·</span>
            <span className="text-xs font-mono text-[#9AA6B4]">Deterministic Rulesets</span>
          </div>
          <h1 className="text-2xl font-serif text-[#E9EEF4]">Assurance Policies</h1>
        </div>

        <button
          type="button"
          onClick={() => {
            addToast({
              title: 'Policy Builder',
              message: 'Policy editing requires Investment Committee Chairperson role.',
              type: 'info',
            });
          }}
          className="px-3 py-2 bg-[#1A1F26] hover:bg-[#222933] border border-[#222933] rounded text-xs text-[#E9EEF4] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-[#3A6FD8]" />
          <span>New Policy Version</span>
        </button>
      </div>

      {/* Policy Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {policies.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedPolicyId(p.id)}
            className={`p-4 rounded-lg border cursor-pointer transition-all space-y-2 ${
              p.id === selectedPolicyId
                ? 'bg-[#1A1F26] border-[#3A6FD8] shadow-md ring-1 ring-[#3A6FD8]'
                : 'bg-[#12161B] border-[#222933] hover:bg-[#161C23]'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#3A6FD8] font-bold">{p.id}</span>
              <span className="text-[#9AA6B4] font-semibold">{p.version}</span>
            </div>
            <div className="text-xs font-semibold text-[#E9EEF4]">{p.name}</div>
            <div className="text-[11px] text-[#667486] line-clamp-1">{p.decisionProtected}</div>
          </div>
        ))}
      </div>

      {/* Selected Policy Detail Matrix */}
      {policy && (
        <div className="bg-[#12161B] border border-[#222933] rounded-lg p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222933]">
            <div>
              <div className="text-xs font-mono text-[#3A6FD8] uppercase">
                {policy.id} · {policy.version}
              </div>
              <h2 className="text-lg font-semibold text-[#E9EEF4]">{policy.name}</h2>
              <p className="text-xs text-[#9AA6B4] mt-0.5">
                Protects: <span className="text-[#E9EEF4]">{policy.decisionProtected}</span>
              </p>
            </div>

            <div className="bg-[#0D1116] p-3 rounded border border-[#222933] text-xs font-mono">
              <span className="text-[10px] text-[#667486] block">GOVERNS</span>
              <span className="text-[#3A6FD8] font-bold">{governedCommitments.length} Commitments</span>
            </div>
          </div>

          {/* Requirements Matrix */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase text-[#9AA6B4] tracking-wider font-semibold">
              Deterministic Evaluation Requirements
            </h3>

            <div className="space-y-3">
              {policy.requirements.map((req) => (
                <div
                  key={req.id}
                  className="p-4 bg-[#0A0C0F] rounded-lg border border-[#222933] space-y-2 text-xs font-mono"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#3A6FD8] font-bold">{req.clauseNumber}</span>
                    <span className="text-[10px] bg-[#1A1F26] px-2 py-0.5 rounded text-[#2E9268] border border-[#2E9268]/30">
                      Mandatory Threshold
                    </span>
                  </div>
                  <p className="text-xs text-[#E9EEF4] leading-relaxed">{req.description}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#222933] text-[10px] text-[#667486]">
                    <div>
                      <span className="block">MIN REQUIRED STATE</span>
                      <span className="text-[#E9EEF4] font-semibold">
                        [{req.requiredState}] {ASSURANCE_STATE_NAMES[req.requiredState]}
                      </span>
                    </div>
                    <div>
                      <span className="block">SOURCE INDEPENDENCE</span>
                      <span className="text-[#E9EEF4] font-semibold">{req.sourceIndependenceRule}</span>
                    </div>
                    <div>
                      <span className="block">FRESHNESS WINDOW</span>
                      <span className="text-[#E9EEF4] font-semibold">{req.freshnessMaxDays} days</span>
                    </div>
                    <div>
                      <span className="block">CONTRADICTIONS</span>
                      <span className="text-[#2E9268] font-semibold">{req.contradictionRule}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ================= EVIDENCE TASKS VIEW =================
export const EvidenceTasksView: React.FC<{ onNavigate: (p: string) => void }> = ({
  onNavigate,
}) => {
  const { tasks, submitDemoEvidence, addToast } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filtered = tasks.filter((t) => {
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!t.title.toLowerCase().includes(q) && !t.id.toLowerCase().includes(q) && !t.responsiblePartyName.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const handleSimulateSubmit = (taskId: string, title: string) => {
    submitDemoEvidence(taskId, 'factory_inspection');
    addToast({
      title: 'Evidence Submitted & Evaluated',
      message: `Submitted evidence for "${title}". Commitment state deterministically updated.`,
      type: 'success',
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-[#E9EEF4]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#222933]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
              Gap Closing Queue
            </span>
            <span className="text-[#667486]">·</span>
            <span className="text-xs font-mono text-[#9AA6B4]">{tasks.length} Total Tasks</span>
          </div>
          <h1 className="text-2xl font-serif text-[#E9EEF4]">Evidence Tasks</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSimulateSubmit('TASK-01', 'Bureau Veritas Inspection')}
            className="px-3 py-2 bg-[#2E9268] hover:bg-[#34A476] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Simulate Provider Submission (TASK-01)</span>
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-[#12161B] border border-[#222933] p-4 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 flex-1 min-w-[260px]">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-[#667486] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks, assignees, commitment IDs..."
              className="w-full bg-[#0D1116] border border-[#222933] pl-9 pr-3 py-1.5 rounded text-xs text-[#E9EEF4] outline-hidden focus:border-[#3A6FD8]"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#0D1116] border border-[#222933] px-3 py-1.5 rounded text-xs text-[#E9EEF4] outline-hidden cursor-pointer"
          >
            <option value="all">All Task Statuses</option>
            <option value="Open">Open</option>
            <option value="Requested">Requested</option>
            <option value="Submitted">Submitted</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-[#12161B] border border-[#222933] rounded-lg overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1A1F26] text-[#9AA6B4] font-mono text-[11px] uppercase border-b border-[#222933]">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Task Title & Required Evidence</th>
                <th className="p-3">Target Commitment</th>
                <th className="p-3">Responsible Party</th>
                <th className="p-3">Due Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222933] bg-[#12161B]">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-[#161C23] transition-colors">
                  <td className="p-3 font-mono text-[11px] text-[#3A6FD8]">{t.id}</td>
                  <td className="p-3 max-w-sm">
                    <div className="font-semibold text-[#E9EEF4]">{t.title}</div>
                    <div className="text-[11px] text-[#9AA6B4] line-clamp-1">
                      Required: {t.missingEvidenceRequired}
                    </div>
                  </td>
                  <td className="p-3 font-mono text-[11px]">
                    <button
                      type="button"
                      onClick={() => onNavigate(`/commitments/${t.commitmentId}`)}
                      className="text-[#3A6FD8] hover:underline"
                    >
                      {t.commitmentId}
                    </button>
                  </td>
                  <td className="p-3 text-[#E9EEF4]">
                    <div>{t.responsiblePartyName}</div>
                    <div className="text-[10px] text-[#667486]">Exposure: {t.financialExposure}</div>
                  </td>
                  <td className="p-3 font-mono text-[11px] text-[#9AA6B4]">{t.dueDate}</td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                        t.status === 'Resolved'
                          ? 'bg-[#2E9268]/20 text-[#2E9268] border border-[#2E9268]/30'
                          : t.status === 'Submitted'
                          ? 'bg-[#C8922F]/20 text-[#C8922F] border border-[#C8922F]/30'
                          : 'bg-[#1A1F26] text-[#9AA6B4] border border-[#222933]'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {t.status !== 'Resolved' ? (
                      <button
                        type="button"
                        onClick={() => handleSimulateSubmit(t.id, t.title)}
                        className="px-2.5 py-1 bg-[#3A6FD8] hover:bg-[#4C82EC] text-white rounded text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        Submit Evidence
                      </button>
                    ) : (
                      <span className="text-[#2E9268] text-[11px] font-mono">Satisfied ✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
