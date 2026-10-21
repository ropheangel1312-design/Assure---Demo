import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CapitalGate } from '../../types';
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
  FileCheck2,
  Lock,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  User,
} from 'lucide-react';

export const CapitalGatesView: React.FC<{
  gateId?: string;
  onNavigate: (p: string) => void;
}> = ({ gateId, onNavigate }) => {
  const { gates, commitments, recordGateDecision, currentRole, addToast } = useApp();

  const [selectedGateId, setSelectedGateId] = useState<string>(gateId || 'GATE-4');
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [decisionType, setDecisionType] = useState<'Proceed' | 'Do not proceed' | 'Defer'>('Defer');
  const [decisionRationale, setDecisionRationale] = useState('');

  const activeGate = gates.find((g) => g.id === selectedGateId) || gates[1] || gates[0];
  const gateCommitments = commitments.filter((c) =>
    activeGate.conditions.some((cond) => cond.commitmentId === c.id)
  );

  const handleRecordDecision = () => {
    if (!decisionRationale.trim()) {
      addToast({
        title: 'Rationale Required',
        message: 'Formal gate decisions require written reasoning for the audit trail.',
        type: 'error',
      });
      return;
    }

    recordGateDecision(activeGate.id, decisionType, decisionRationale);
    setDecisionModalOpen(false);
    setDecisionRationale('');
    addToast({
      title: 'Gate Decision Recorded',
      message: `Capital milestone ${activeGate.id} recorded as ${decisionType}.`,
      type: 'success',
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-[#EDEDED]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#262626]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
              Capital Governance
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs font-mono text-neutral-400">5 Milestone Gates</span>
          </div>
          <h1 className="text-2xl font-bold text-[#EDEDED]">Capital Decision Gates</h1>
        </div>

        {/* Milestone Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto p-1 bg-[#111111] rounded-2xl border border-[#262626]">
          {gates.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setSelectedGateId(g.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                g.id === selectedGateId
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                  : 'hover:bg-[#1A1A1A] text-neutral-400'
              }`}
            >
              {g.id} · {g.capitalAmount}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Gate Banner in Bento Container */}
      <div className="bg-[#111111] border border-[#262626] rounded-3xl p-6 space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#262626]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
              <span className="text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">{activeGate.id}</span>
              <span>·</span>
              <span>Target Date: {activeGate.decisionDate}</span>
              <span>·</span>
              <span>Reviewer: {activeGate.assignedReviewerName}</span>
            </div>
            <h2 className="text-xl font-bold text-[#EDEDED] mt-1">{activeGate.name}</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#1A1A1A] p-3 rounded-2xl border border-[#333333] text-right font-mono text-xs">
              <span className="text-[10px] text-neutral-400 block font-semibold">CAPITAL AT RISK</span>
              <span className="text-base font-bold text-[#EDEDED]">{activeGate.capitalAmount}</span>
            </div>

            <button
              type="button"
              onClick={() => setDecisionModalOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Record Capital Decision</span>
            </button>
          </div>
        </div>

        {/* Status indicator */}
        <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-[#333333] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div>
            <span className="text-[10px] text-neutral-400 block font-semibold">GATE EVALUATION STATUS</span>
            <span
              className={`text-sm font-bold ${
                activeGate.status === 'EVIDENCE CONDITIONS MET'
                  ? 'text-emerald-400'
                  : activeGate.status === 'EVIDENCE CONDITIONS NOT MET'
                  ? 'text-rose-400'
                  : 'text-amber-400'
              }`}
            >
              {activeGate.status}
            </span>
          </div>

          <div className="text-[11px] text-neutral-400 max-w-md italic">
            "ASSURE never approves or halts capital. We calculate condition readiness; decision authority remains with accountable human reviewers."
          </div>
        </div>

        {/* Gate Prerequisites Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase text-neutral-400 tracking-wider font-semibold">
            Evidentiary Prerequisites for {activeGate.id}
          </h3>

          <div className="bg-[#161616] border border-[#262626] rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1A1A1A] text-neutral-400 font-mono text-[11px] uppercase border-b border-[#262626]">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Commitment Description</th>
                  <th className="p-3">Counterparty</th>
                  <th className="p-3">Required State</th>
                  <th className="p-3">Current State</th>
                  <th className="p-3">Flags</th>
                  <th className="p-3 text-right">Condition Met?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262626]">
                {gateCommitments.map((c) => {
                  const isMet = c.currentState >= c.requiredState && c.conditionFlags.length === 0;

                  return (
                    <tr
                      key={c.id}
                      onClick={() => onNavigate(`/commitments/${c.id}`)}
                      className="hover:bg-[#1A1A1A] transition-colors cursor-pointer"
                    >
                      <td className="p-3 font-mono text-indigo-400 font-semibold">{c.id}</td>
                      <td className="p-3 text-[#EDEDED] font-medium max-w-xs">{c.title}</td>
                      <td className="p-3 text-neutral-400">{c.counterpartyName}</td>
                      <td className="p-3 font-mono text-neutral-400">
                        [{c.requiredState}] {ASSURANCE_STATE_NAMES[c.requiredState]}
                      </td>
                      <td className="p-3">
                        <StateBadge stateIndex={c.currentState} size="sm" />
                      </td>
                      <td className="p-3">
                        {c.conditionFlags.length > 0 ? (
                          c.conditionFlags.map((f) => (
                            <ConditionFlagChip key={f} flag={f} size="sm" />
                          ))
                        ) : (
                          <span className="text-neutral-500 font-mono text-[10px]">Clean</span>
                        )}
                      </td>
                      <td className="p-3 text-right font-mono font-bold">
                        {isMet ? (
                          <span className="text-emerald-400">SATISFIED ✓</span>
                        ) : (
                          <span className="text-rose-400">UNMET ✗</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Formal Decision Modal */}
      {decisionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#111111] border border-[#262626] rounded-3xl shadow-2xl p-6 space-y-6 text-xs text-[#EDEDED]">
            <div className="space-y-1 pb-3 border-b border-[#262626]">
              <div className="text-[10px] font-mono uppercase text-indigo-400 font-semibold">
                ACCOUNTABLE HUMAN GOVERNANCE
              </div>
              <h3 className="text-base font-bold">
                Record Formal Decision on {activeGate.name} ({activeGate.capitalAmount})
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-neutral-400 font-mono block font-semibold">Decision Verdict:</label>
                <select
                  value={decisionType}
                  onChange={(e) => setDecisionType(e.target.value as any)}
                  className="w-full bg-[#1A1A1A] border border-[#333333] p-2.5 rounded-xl text-xs text-[#EDEDED] outline-hidden cursor-pointer"
                >
                  <option value="Proceed">Proceed with Capital Release</option>
                  <option value="Defer">Defer / Hold Pending Missing Verification</option>
                  <option value="Do not proceed">Do Not Proceed (Conditions Failed)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400 font-mono block font-semibold">
                  Mandatory Written Rationale (Recorded on Project Audit Ledger):
                </label>
                <textarea
                  rows={4}
                  value={decisionRationale}
                  onChange={(e) => setDecisionRationale(e.target.value)}
                  placeholder="State the committee reasoning, risk mitigations or indemnities accepted..."
                  className="w-full bg-[#1A1A1A] border border-[#333333] p-3 rounded-xl text-xs text-[#EDEDED] outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="p-3 bg-[#1A1A1A] rounded-2xl border border-[#333333] text-[11px] text-neutral-400 italic">
                Notice: You are recording this action as active persona "{currentRole}". This record will be stamped into the permanent project history.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#262626]">
              <button
                type="button"
                onClick={() => setDecisionModalOpen(false)}
                className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#262626] rounded-xl text-xs text-neutral-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRecordDecision}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-md shadow-indigo-600/30"
              >
                Confirm & Record Decision
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
