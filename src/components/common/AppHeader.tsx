import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Bell,
  ChevronDown,
  RotateCcw,
  Search,
  Shield,
  SlidersHorizontal,
  User,
} from 'lucide-react';

interface AppHeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ currentPath, onNavigate }) => {
  const {
    project,
    currentRole,
    setRole,
    setCommandPaletteOpen,
    resetDemo,
    simulatedDaysForward,
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const rolesList: { role: UserRole; desc: string; isFuture?: boolean }[] = [
    {
      role: 'Project Owner',
      desc: 'Can ingest, review commitments, create tasks, and manage project dependencies.',
    },
    {
      role: 'Investment / Capital Reviewer',
      desc: 'Can record formal gate decisions with written rationale, raise exceptions, and request evidence.',
    },
    {
      role: 'Project / Assurance Analyst',
      desc: 'Can link evidence, classify provenance, and trigger deterministic re-evaluations.',
    },
    {
      role: 'Evidence Provider',
      desc: 'External third-party inspector / laboratory portal.',
      isFuture: true,
    },
  ];

  return (
    <header className="h-16 bg-[#050505]/90 backdrop-blur-md border-b border-[#262626] px-6 flex items-center justify-between text-xs sticky top-0 z-30 select-none">
      {/* Left: Project metadata summary */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 font-mono">
          <span className="font-semibold text-[#EDEDED] text-sm tracking-tight">{project.name}</span>
          <span className="text-neutral-600">·</span>
          <span className="text-neutral-400 font-medium">{project.capitalValue}</span>
          <span className="text-neutral-600">·</span>
          <span className="text-neutral-400">COD {project.claimedCOD}</span>
        </div>

        {/* DEMO DATA Pill */}
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
          DEMO DATA
        </span>

        {simulatedDaysForward > 0 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            +{simulatedDaysForward}d SIMULATED
          </span>
        )}
      </div>

      {/* Right: Search, Role Switcher, Quick Actions */}
      <div className="flex items-center gap-3">
        {/* Global Search / Command Palette Trigger */}
        <button
          type="button"
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 bg-[#111111] hover:bg-[#1A1A1A] border border-[#262626] hover:border-[#333333] px-3.5 py-1.5 rounded-xl text-neutral-400 hover:text-[#EDEDED] transition-all cursor-pointer shadow-xs"
        >
          <Search className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-xs hidden md:inline">Quick search...</span>
          <kbd className="font-mono text-[10px] bg-[#1A1A1A] px-1.5 py-0.5 rounded-md text-neutral-400 border border-[#333333]">
            ⌘K
          </kbd>
        </button>

        {/* Role Switcher */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-2 bg-[#111111] hover:bg-[#1A1A1A] border border-[#262626] hover:border-[#333333] px-3.5 py-1.5 rounded-xl text-[#EDEDED] transition-all cursor-pointer shadow-xs"
          >
            <div className="w-5 h-5 rounded-md bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <User className="w-3 h-3 text-indigo-400" />
            </div>
            <span className="text-[11px] text-neutral-400 hidden lg:inline">Viewing as:</span>
            <span className="font-semibold text-xs">{currentRole}</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#111111] border border-[#262626] rounded-2xl shadow-2xl p-2 z-50 text-xs animate-fadeIn">
              <div className="px-3 py-2 text-[10px] font-mono text-neutral-400 uppercase tracking-wider border-b border-[#262626] mb-1">
                Select Active Governance Persona
              </div>
              <div className="space-y-1">
                {rolesList.map((item) => (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => {
                      if (!item.isFuture) {
                        setRole(item.role);
                        setRoleDropdownOpen(false);
                      }
                    }}
                    disabled={item.isFuture}
                    className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-0.5 ${
                      currentRole === item.role
                        ? 'bg-indigo-600/15 border border-indigo-500/30 text-white'
                        : item.isFuture
                        ? 'opacity-40 cursor-not-allowed bg-transparent'
                        : 'hover:bg-[#1A1A1A] text-[#EDEDED] cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs">{item.role}</span>
                      {item.isFuture && (
                        <span className="text-[9px] font-mono bg-[#1A1A1A] border border-[#333333] px-1.5 py-0.5 rounded-full text-neutral-400">
                          FUTURE
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-neutral-400 leading-relaxed">
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reset Demo button */}
        <button
          type="button"
          onClick={resetDemo}
          title="Reset all commitments, evidence and gates to baseline demo data"
          className="p-2 rounded-xl bg-[#111111] hover:bg-[#1A1A1A] border border-[#262626] hover:border-[#333333] text-neutral-400 hover:text-[#EDEDED] transition-all cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Public Site Link */}
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="text-xs text-neutral-400 hover:text-indigo-400 px-2.5 py-1.5 rounded-xl hover:bg-[#111111] transition-all cursor-pointer"
        >
          Public Site
        </button>
      </div>
    </header>
  );
};
