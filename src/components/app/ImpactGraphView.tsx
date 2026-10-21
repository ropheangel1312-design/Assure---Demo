import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StateBadge } from '../common/StateBadge';
import { ConditionFlagChip } from '../common/ConditionFlagChip';
import {
  AlertOctagon,
  ArrowRight,
  ChevronRight,
  GitBranch,
  Layers,
  Network,
  Shield,
  ShieldAlert,
} from 'lucide-react';

export const ImpactGraphView: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const { commitments, gates, project } = useApp();
  const [selectedCommitmentId, setSelectedCommitmentId] = useState<string>('COM-48291');

  const selectedCommitment = commitments.find((c) => c.id === selectedCommitmentId) || commitments[0];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-[#E9EEF4]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#222933]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
              Causal Propagation
            </span>
            <span className="text-[#667486]">·</span>
            <span className="text-xs font-mono text-[#9AA6B4]">Downstream Capital Exposure</span>
          </div>
          <h1 className="text-2xl font-serif text-[#E9EEF4]">Impact Graph</h1>
        </div>

        <div className="text-xs font-mono text-[#9AA6B4]">
          Focus: <span className="text-[#3A6FD8] font-bold">{selectedCommitment.id}</span> (
          {selectedCommitment.financialExposure} Exposure)
        </div>
      </div>

      {/* Explanatory banner */}
      <div className="p-4 bg-[#12161B] rounded-lg border border-[#222933] text-xs text-[#9AA6B4] flex items-center justify-between">
        <span>
          Trace how an evidentiary deficit in a single external promise propagates across physical milestones, halts capital gates, and risks project COD.
        </span>
        <span className="text-[10px] font-mono text-[#667486]">LEFT-TO-RIGHT CAUSAL CASCADE</span>
      </div>

      {/* 4-Column Causal Cascade Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        {/* Column 1: Critical Commitments */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase text-[#3A6FD8] tracking-wider font-semibold px-1">
            1. Critical Commitments
          </div>
          <div className="space-y-2">
            {commitments.slice(0, 7).map((c) => {
              const isSelected = c.id === selectedCommitmentId;
              const hasConflict = c.conditionFlags.includes('CONTRADICTORY');

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCommitmentId(c.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all space-y-1.5 text-xs font-mono ${
                    isSelected
                      ? 'bg-[#1A1F26] border-[#3A6FD8] shadow-lg ring-1 ring-[#3A6FD8]'
                      : hasConflict
                      ? 'bg-[#12161B] border-[#C4483F]/40 hover:bg-[#161C23]'
                      : 'bg-[#12161B] border-[#222933] hover:bg-[#161C23]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#3A6FD8] font-bold text-[11px]">{c.id}</span>
                    <StateBadge stateIndex={c.currentState} size="sm" />
                  </div>
                  <div className="text-[#E9EEF4] font-medium line-clamp-1">{c.title}</div>
                  <div className="flex items-center justify-between text-[10px] text-[#667486]">
                    <span>{c.counterpartyName}</span>
                    <span className="text-[#E9EEF4] font-semibold">{c.financialExposure}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Intermediate Milestones */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase text-[#2E9268] tracking-wider font-semibold px-1">
            2. Dependent Milestones
          </div>
          <div className="space-y-2">
            <div
              className={`p-4 rounded-lg border space-y-2 text-xs font-mono transition-all ${
                selectedCommitment.dependentMilestones?.some((m) => m.includes('Transformer') || m.includes('Substation') || m.includes('Energisation'))
                  ? 'bg-[#1A1F26] border-[#2E9268] text-[#E9EEF4] shadow-md'
                  : 'bg-[#12161B] border-[#222933] text-[#9AA6B4] opacity-50'
              }`}
            >
              <div className="text-[10px] text-[#667486] uppercase">ELECTRICAL MILESTONE</div>
              <div className="font-bold text-[#E9EEF4] text-xs">
                220kV Substation Energisation Readiness
              </div>
              <div className="text-[10px] text-[#C4483F]">
                Target: 15 Oct 2028 (At risk: +18d delay)
              </div>
            </div>

            <div
              className={`p-4 rounded-lg border space-y-2 text-xs font-mono transition-all ${
                selectedCommitment.dependentMilestones?.some((m) => m.includes('Water') || m.includes('Cooling'))
                  ? 'bg-[#1A1F26] border-[#2E9268] text-[#E9EEF4] shadow-md'
                  : 'bg-[#12161B] border-[#222933] text-[#9AA6B4] opacity-50'
              }`}
            >
              <div className="text-[10px] text-[#667486] uppercase">MECHANICAL MILESTONE</div>
              <div className="font-bold text-[#E9EEF4] text-xs">
                Chilled Water Closed-Loop Wet Testing
              </div>
              <div className="text-[10px] text-[#2E9268]">Target: 01 Nov 2028</div>
            </div>

            <div className="p-4 rounded-lg border bg-[#12161B] border-[#222933] text-[#9AA6B4] opacity-50 space-y-2 text-xs font-mono">
              <div className="text-[10px] text-[#667486] uppercase">FIBRE / NETWORK</div>
              <div className="font-bold text-[#E9EEF4] text-xs">Dual Diverse Meet-Me-Rooms</div>
              <div className="text-[10px] text-[#2E9268]">Target: 10 Nov 2028</div>
            </div>
          </div>
        </div>

        {/* Column 3: Capital Gates */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase text-[#C8922F] tracking-wider font-semibold px-1">
            3. Capital Gates
          </div>
          <div className="space-y-2">
            {gates.map((g) => {
              const isTargetGate = g.id === selectedCommitment.applicableGateId;

              return (
                <div
                  key={g.id}
                  onClick={() => onNavigate(`/gates/${g.id}`)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all space-y-2 text-xs font-mono ${
                    isTargetGate
                      ? 'bg-[#1A1F26] border-[#C8922F] shadow-lg ring-1 ring-[#C8922F]'
                      : 'bg-[#12161B] border-[#222933] opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#C8922F] font-bold">{g.id}</span>
                    <span className="text-[#E9EEF4] font-bold">{g.capitalAmount}</span>
                  </div>
                  <div className="font-semibold text-[#E9EEF4] line-clamp-1">{g.name}</div>
                  <div className="text-[10px] text-[#C4483F] font-semibold">{g.status}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 4: Ultimate Project COD */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase text-[#3A6FD8] tracking-wider font-semibold px-1">
            4. Project COD & Value
          </div>
          <div className="bg-[#12161B] border-2 border-[#3A6FD8] rounded-lg p-5 space-y-4 font-mono text-xs shadow-xl">
            <div className="space-y-1">
              <span className="text-[10px] text-[#667486] uppercase block">
                COMMERCIAL OPERATION DATE
              </span>
              <div className="text-lg font-serif text-[#E9EEF4] font-bold">
                {project.claimedCOD}
              </div>
              <div className="text-xs text-[#9AA6B4]">{project.name}</div>
            </div>

            <div className="p-3 bg-[#0D1116] rounded border border-[#222933] space-y-1">
              <span className="text-[10px] text-[#667486] block">TOTAL CAPITAL ASSET VALUE</span>
              <span className="text-lg font-bold text-[#3A6FD8]">{project.capitalValue}</span>
            </div>

            <div className="p-3 bg-[#C4483F]/10 rounded border border-[#C4483F]/30 space-y-1 text-[#C4483F] text-[11px]">
              <div className="font-bold flex items-center gap-1">
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>CASCADE DELAY EXPOSURE</span>
              </div>
              <p>{selectedCommitment.impactSummary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
