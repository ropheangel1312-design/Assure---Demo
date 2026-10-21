import React from 'react';
import { AssureLogo } from './AssureLogo';
import {
  BookOpen,
  Building2,
  CheckSquare,
  Clock,
  FileBox,
  FileSearch,
  FolderKanban,
  GitGraph,
  Layers,
  Network,
  Scale,
  Settings,
  Shield,
  UploadCloud,
} from 'lucide-react';

interface AppSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ currentPath, onNavigate }) => {
  const navItems = [
    { label: 'Project Overview', path: '/overview', icon: FolderKanban },
    { label: 'Ingest Package', path: '/ingest', icon: UploadCloud },
    { label: 'Review Queue', path: '/review', icon: FileSearch },
    { label: 'Commitment Registry', path: '/commitments', icon: Layers },
    { label: 'Evidence Library', path: '/evidence', icon: FileBox },
    { label: 'Evidence Graph', path: '/graph/evidence', icon: GitGraph },
    { label: 'Impact Graph', path: '/graph/impact', icon: Network },
    { label: 'Assurance Policies', path: '/policies', icon: Scale },
    { label: 'Evidence Tasks', path: '/tasks', icon: CheckSquare },
    { label: 'Capital Gates', path: '/gates', icon: Shield },
    { label: 'Timeline & History', path: '/timeline', icon: Clock },
    { label: 'Counterparties', path: '/counterparties', icon: Building2 },
  ];

  const futureItems = [
    { label: 'Portfolio Assurance', desc: 'Cross-asset fund monitoring' },
    { label: 'Evidence Network', desc: 'Third-party testing marketplace' },
    { label: 'Transferable Record', desc: 'Multi-party syndication passport' },
  ];

  return (
    <aside className="w-64 bg-[#050505] border-r border-[#262626] flex flex-col justify-between h-screen shrink-0 select-none">
      {/* Brand & Project Switcher */}
      <div>
        <div className="h-16 border-b border-[#262626] px-5 flex items-center justify-between">
          <div
            onClick={() => onNavigate('/')}
            className="cursor-pointer group"
          >
            <AssureLogo size="sm" subtitleText="COMMITMENT ASSURANCE" />
          </div>
          <span className="text-[10px] font-mono bg-[#111111] px-2 py-0.5 rounded-full border border-[#262626] text-neutral-400">
            v1.0
          </span>
        </div>

        {/* Project Selector pill */}
        <div className="p-3 border-b border-[#262626]">
          <button
            type="button"
            onClick={() => onNavigate('/app')}
            className="w-full bg-[#111111] hover:bg-[#1A1A1A] border border-[#262626] hover:border-[#333333] p-3 rounded-2xl text-left flex items-center justify-between transition-all cursor-pointer shadow-xs"
          >
            <div className="truncate">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                Active Project
              </span>
              <span className="text-xs font-semibold text-[#EDEDED] truncate block">
                Meridian DC — Phase 1
              </span>
            </div>
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              100MW
            </span>
          </button>
        </div>

        {/* Primary Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-360px)]">
          <div className="px-2 py-1 text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-semibold">
            Assurance System
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentPath === item.path ||
              (item.path !== '/' && currentPath.startsWith(item.path));

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                    : 'text-neutral-400 hover:text-[#EDEDED] hover:bg-[#111111]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}

          {/* Visually Separated FUTURE Group */}
          <div className="pt-4 mt-3 border-t border-[#262626]">
            <div className="px-2 py-1 text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center justify-between font-semibold">
              <span>Roadmap</span>
              <span className="bg-[#111111] border border-[#262626] text-[9px] px-2 py-0.5 rounded-full text-neutral-400">
                FUTURE
              </span>
            </div>
            <div className="space-y-0.5 mt-1">
              {futureItems.map((f, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 rounded-xl text-xs text-neutral-500 flex items-center justify-between opacity-50 cursor-not-allowed select-none"
                  title="Roadmap feature — see /roadmap"
                >
                  <span className="text-[11px]">{f.label}</span>
                  <span className="font-mono text-[9px] border border-[#333333] px-1.5 py-0.2 rounded-full">
                    FUTURE
                  </span>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Footer Navigation: Docs & Settings */}
      <div className="p-3 border-t border-[#262626] space-y-1 bg-[#0D0D0D] text-xs">
        <button
          type="button"
          onClick={() => onNavigate('/docs')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
            currentPath === '/docs'
              ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
              : 'text-neutral-400 hover:text-[#EDEDED] hover:bg-[#111111]'
          }`}
        >
          <BookOpen className="w-4 h-4 text-neutral-400" />
          <span>Assurance Docs & Lexicon</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('/app/settings/organisation')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
            currentPath.startsWith('/app/settings')
              ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
              : 'text-neutral-400 hover:text-[#EDEDED] hover:bg-[#111111]'
          }`}
        >
          <Settings className="w-4 h-4 text-neutral-400" />
          <span>Settings & Governance</span>
        </button>

        <div className="px-3 pt-2 text-[10px] font-mono text-neutral-500 flex items-center justify-between">
          <span>ILLUSTRATIVE DEMO</span>
          <span>BENTO GRID</span>
        </div>
      </div>
    </aside>
  );
};
