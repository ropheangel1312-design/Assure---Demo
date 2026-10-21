import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ASSURANCE_STATE_NAMES } from '../../engine/evaluation';
import { StateBadge } from '../common/StateBadge';
import { ConditionFlagChip } from '../common/ConditionFlagChip';
import {
  AlertOctagon,
  ArrowRight,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  GitBranch,
  Layers,
  Network,
  RefreshCw,
  Search,
  Shield,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

export const EvidenceGraphView: React.FC<{ onNavigate: (p: string) => void }> = ({
  onNavigate,
}) => {
  const {
    commitments,
    evidence,
    selectedCommitmentId,
    setSelectedCommitmentId,
    setSelectedEvidenceId,
  } = useApp();

  const [activeCommitmentId, setActiveCommitmentId] = useState<string>(
    selectedCommitmentId || 'COM-48291'
  );
  const [showMissing, setShowMissing] = useState(true);
  const [showConflicts, setShowConflicts] = useState(true);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<any | null>(null);

  const commitment = commitments.find((c) => c.id === activeCommitmentId) || commitments[0];
  const linkedEv = evidence.filter((e) => e.linkedCommitmentIds.includes(commitment.id));

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-[#E9EEF4]">
      {/* Header & Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#222933]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
              Epistemic Topology
            </span>
            <span className="text-[#667486]">·</span>
            <span className="text-xs font-mono text-[#9AA6B4]">Independent Origin Analysis</span>
          </div>
          <h1 className="text-2xl font-serif text-[#E9EEF4]">Evidence Graph</h1>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs text-[#9AA6B4] font-mono">Focus Commitment:</label>
          <select
            value={activeCommitmentId}
            onChange={(e) => {
              setActiveCommitmentId(e.target.value);
              setSelectedCommitmentId(e.target.value);
              setSelectedNodeInfo(null);
            }}
            className="bg-[#12161B] border border-[#222933] px-3 py-1.5 rounded text-xs text-[#E9EEF4] outline-hidden cursor-pointer"
          >
            {commitments.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} — {c.title.slice(0, 45)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Graph Toolbar */}
      <div className="bg-[#12161B] border border-[#222933] p-3 rounded-lg flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1.5 cursor-pointer text-[#9AA6B4] hover:text-white">
            <input
              type="checkbox"
              checked={showMissing}
              onChange={(e) => setShowMissing(e.target.checked)}
              className="rounded bg-[#0D1116] border-[#222933] text-[#3A6FD8]"
            />
            <span>Ghost Missing Nodes</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer text-[#9AA6B4] hover:text-white">
            <input
              type="checkbox"
              checked={showConflicts}
              onChange={(e) => setShowConflicts(e.target.checked)}
              className="rounded bg-[#0D1116] border-[#222933] text-[#C4483F]"
            />
            <span>Highlight Conflict Vectors</span>
          </label>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#667486]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#3A6FD8]" /> Commitment
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#2E9268]" /> Independent / Third-Party
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#4E6C93]" /> Same-Origin
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#C4483F]" /> Contradiction
          </span>
        </div>
      </div>

      {/* Interactive Visual Graph Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Canvas Area */}
        <div className="lg:col-span-8 bg-[#0D1116] border border-[#222933] rounded-lg p-6 min-h-[500px] flex flex-col justify-between relative overflow-hidden shadow-2xl">
          {/* Subtle grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#2229330f_1px,transparent_1px),linear-gradient(to_bottom,#2229330f_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

          {/* Root Node: Commitment */}
          <div className="relative z-10 space-y-8">
            <div className="flex justify-center">
              <div
                onClick={() =>
                  setSelectedNodeInfo({
                    type: 'Commitment',
                    id: commitment.id,
                    title: commitment.title,
                    state: commitment.currentStateName,
                    counterparty: commitment.counterpartyName,
                    exposure: commitment.financialExposure,
                    deadline: commitment.deadline,
                  })
                }
                className="bg-[#12161B] hover:bg-[#1A1F26] border-2 border-[#3A6FD8] p-4 rounded-lg shadow-xl text-center space-y-2 cursor-pointer transition-all max-w-md w-full"
              >
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#3A6FD8] font-bold">{commitment.id}</span>
                  <StateBadge stateIndex={commitment.currentState} size="sm" />
                </div>
                <div className="text-xs font-semibold text-[#E9EEF4]">{commitment.title}</div>
                <div className="text-[10px] text-[#667486] font-mono">
                  {commitment.independentEvidencePathCount} Independent Origin Paths
                </div>
              </div>
            </div>

            {/* Connecting Links & Evidence Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              {linkedEv.map((ev) => {
                const isConflict = Boolean(ev.contradictsEvidenceId);

                return (
                  <div
                    key={ev.id}
                    onClick={() => {
                      setSelectedEvidenceId(ev.id);
                      setSelectedNodeInfo({
                        type: 'Evidence Record',
                        id: ev.id,
                        title: ev.title,
                        origin: ev.originClass,
                        source: ev.sourceName,
                        observed: ev.observedAt,
                        claim: ev.whatItEstablishes,
                        conflict: ev.contradictionDetails || null,
                      });
                    }}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all space-y-2 text-xs font-mono shadow-md ${
                      isConflict && showConflicts
                        ? 'bg-[#C4483F]/10 border-[#C4483F] hover:bg-[#C4483F]/20'
                        : 'bg-[#12161B] hover:bg-[#1A1F26] border-[#222933]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#9AA6B4] font-bold">{ev.id}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] uppercase ${
                          isConflict
                            ? 'bg-[#C4483F] text-white font-bold'
                            : 'bg-[#1A1F26] text-[#9AA6B4]'
                        }`}
                      >
                        {ev.originClass}
                      </span>
                    </div>

                    <div className="font-semibold text-[#E9EEF4] line-clamp-2 text-[11px]">
                      {ev.title}
                    </div>

                    <div className="text-[10px] text-[#667486] truncate">Source: {ev.sourceName}</div>

                    {isConflict && (
                      <div className="text-[10px] text-[#C4483F] font-bold flex items-center gap-1">
                        <AlertOctagon className="w-3 h-3" />
                        <span>Conflict Detected</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Ghosted Missing Node */}
              {showMissing && (
                <div
                  onClick={() =>
                    setSelectedNodeInfo({
                      type: 'Missing Requirement',
                      id: 'MISSING-EVID-01',
                      title: 'Independent Third-Party Factory Inspection',
                      origin: 'Third-party / Accredited Agency',
                      policyReq: 'Equipment Delivery Policy v1.4 clause 3.2',
                    })
                  }
                  className="p-3.5 rounded-lg border-2 border-dashed border-[#C8922F]/40 bg-[#0D1116] hover:bg-[#12161B] cursor-pointer transition-all space-y-2 text-xs font-mono opacity-80"
                >
                  <div className="flex items-center justify-between text-[10px] text-[#C8922F]">
                    <span>MISSING RECORD</span>
                    <span className="border border-[#C8922F]/40 px-1 rounded text-[9px]">GHOST</span>
                  </div>
                  <div className="font-semibold text-[#E9EEF4] text-[11px]">
                    Accredited Factory Witness / Surveyor Report
                  </div>
                  <div className="text-[10px] text-[#9AA6B4]">
                    Required for State 4 (Substantiated)
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 text-center text-[10px] font-mono text-[#667486]">
            Click any node to inspect provenance metadata in the side panel.
          </div>
        </div>

        {/* Node Detail Side Inspector */}
        <div className="lg:col-span-4 bg-[#12161B] border border-[#222933] rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#222933]">
            <h3 className="text-xs font-mono uppercase text-[#3A6FD8] tracking-wider font-semibold">
              Node Inspector
            </h3>
            {selectedNodeInfo && (
              <span className="text-[10px] font-mono bg-[#222933] px-2 py-0.5 rounded text-[#9AA6B4]">
                {selectedNodeInfo.type}
              </span>
            )}
          </div>

          {selectedNodeInfo ? (
            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-[10px] text-[#667486] block">IDENTIFIER</span>
                <span className="text-[#3A6FD8] font-bold text-sm">{selectedNodeInfo.id}</span>
                <div className="text-[#E9EEF4] font-semibold text-xs mt-1">
                  {selectedNodeInfo.title}
                </div>
              </div>

              {selectedNodeInfo.origin && (
                <div className="p-3 bg-[#0D1116] rounded border border-[#222933] space-y-1">
                  <span className="text-[10px] text-[#667486] block">ORIGIN CLASSIFICATION</span>
                  <span className="text-[#E9EEF4] font-bold">{selectedNodeInfo.origin}</span>
                </div>
              )}

              {selectedNodeInfo.claim && (
                <div className="p-3 bg-[#0D1116] rounded border border-[#222933] space-y-1">
                  <span className="text-[10px] text-[#667486] block">EXTRACTED PROMISE CLAIM</span>
                  <p className="text-[#9AA6B4] text-[11px] leading-relaxed">
                    "{selectedNodeInfo.claim}"
                  </p>
                </div>
              )}

              {selectedNodeInfo.conflict && (
                <div className="p-3 bg-[#C4483F]/10 rounded border border-[#C4483F]/30 space-y-1 text-[#C4483F]">
                  <span className="text-[10px] font-bold block uppercase">CONFLICTING ASSERTION</span>
                  <p className="text-[11px] leading-relaxed">{selectedNodeInfo.conflict}</p>
                </div>
              )}

              {selectedNodeInfo.type === 'Commitment' && (
                <button
                  type="button"
                  onClick={() => onNavigate(`/commitments/${selectedNodeInfo.id}`)}
                  className="w-full py-2 bg-[#3A6FD8] hover:bg-[#4C82EC] text-white text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Open Full Commitment Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-[#667486] space-y-2">
              <Network className="w-8 h-8 mx-auto text-[#222933]" />
              <p>Select any node in the graph to view provenance path and metadata.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
