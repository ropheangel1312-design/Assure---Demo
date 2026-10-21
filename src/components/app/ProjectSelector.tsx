import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  FolderKanban,
  Layers,
  Plus,
  Shield,
} from 'lucide-react';

interface ProjectSelectorProps {
  onNavigate: (path: string) => void;
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({ onNavigate }) => {
  const { project, commitments, gates } = useApp();

  const nextGate = gates.find((g) => g.id === project.nextGateId) || gates[1];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222933]">
        <div>
          <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
            Portfolio Management
          </span>
          <h1 className="text-2xl font-serif text-[#E9EEF4] font-normal">Project Workspaces</h1>
        </div>

        <button
          type="button"
          onClick={() => {
            alert('Project Creation: In enterprise deployment, new projects ingest master schedules and equipment purchase ledgers.');
          }}
          className="bg-[#1A1F26] hover:bg-[#222933] border border-[#222933] text-[#E9EEF4] text-xs font-medium px-4 py-2 rounded flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#3A6FD8]" />
          <span>New Project Workspace</span>
        </button>
      </div>

      {/* Project Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Demo Project */}
        <div
          onClick={() => onNavigate('/overview')}
          className="bg-[#12161B] hover:bg-[#151A21] border border-[#3A6FD8]/40 hover:border-[#3A6FD8] rounded-lg p-6 space-y-6 cursor-pointer transition-all shadow-xl group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#3A6FD8]/5 rounded-bl-full pointer-events-none" />

          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#3A6FD8] uppercase tracking-wider bg-[#3A6FD8]/10 px-2 py-0.5 rounded border border-[#3A6FD8]/30">
                ACTIVE DEMO PROJECT
              </span>
              <h2 className="text-lg font-semibold text-[#E9EEF4] mt-2 group-hover:text-white transition-colors">
                {project.name}
              </h2>
              <div className="text-xs text-[#9AA6B4] mt-0.5">{project.assetType} · {project.location}</div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#9AA6B4] group-hover:text-[#3A6FD8] group-hover:translate-x-1 transition-all" />
          </div>

          <div className="grid grid-cols-3 gap-3 bg-[#0D1116] p-3 rounded border border-[#222933] text-xs font-mono">
            <div>
              <span className="text-[10px] text-[#667486] block">CAPITAL VALUE</span>
              <span className="text-[#E9EEF4] font-bold">{project.capitalValue}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#667486] block">CLAIMED COD</span>
              <span className="text-[#E9EEF4] font-semibold">{project.claimedCOD}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#667486] block">COMMITMENTS</span>
              <span className="text-[#3A6FD8] font-bold">{commitments.length} Total</span>
            </div>
          </div>

          {/* Next Gate Strip */}
          <div className="pt-2 border-t border-[#222933] flex items-center justify-between text-xs">
            <span className="text-[#9AA6B4] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#C8922F]" />
              <span>Next Gate: {nextGate?.name}</span>
            </span>
            <span className="font-mono font-semibold text-[#C4483F] text-[11px]">
              {nextGate?.status === 'EVIDENCE CONDITIONS NOT MET' ? '2 of 4 UNMET' : 'REVIEW REQUIRED'}
            </span>
          </div>
        </div>

        {/* Empty / Future Project Staging */}
        <div className="bg-[#12161B]/40 border border-dashed border-[#222933] rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-3 opacity-60">
          <Building2 className="w-8 h-8 text-[#667486]" />
          <div>
            <h3 className="text-sm font-semibold text-[#E9EEF4]">Additional Project Ingestion</h3>
            <p className="text-xs text-[#9AA6B4] max-w-xs mt-1">
              Multi-project portfolio views are marked FUTURE on the product roadmap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
