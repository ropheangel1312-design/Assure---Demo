import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Search,
  Shield,
  Layers,
  CheckSquare,
  Building2,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface CommandPaletteProps {
  onNavigate: (route: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onNavigate }) => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    commitments,
    evidence,
    tasks,
    gates,
    counterparties,
    policies,
    setSelectedCommitmentId,
    setSelectedEvidenceId,
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [commandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  // Filter items
  const cleanQ = query.trim().toLowerCase();

  const matchedCommitments = commitments
    .filter(
      (c) =>
        c.id.toLowerCase().includes(cleanQ) ||
        c.title.toLowerCase().includes(cleanQ) ||
        c.type.toLowerCase().includes(cleanQ)
    )
    .slice(0, 4);

  const matchedEvidence = evidence
    .filter(
      (e) =>
        e.id.toLowerCase().includes(cleanQ) ||
        e.title.toLowerCase().includes(cleanQ) ||
        e.sourceName.toLowerCase().includes(cleanQ)
    )
    .slice(0, 3);

  const matchedGates = gates
    .filter((g) => g.id.toLowerCase().includes(cleanQ) || g.name.toLowerCase().includes(cleanQ))
    .slice(0, 2);

  const matchedTasks = tasks
    .filter((t) => t.id.toLowerCase().includes(cleanQ) || t.title.toLowerCase().includes(cleanQ))
    .slice(0, 3);

  const matchedPolicies = policies
    .filter((p) => p.name.toLowerCase().includes(cleanQ) || p.version.toLowerCase().includes(cleanQ))
    .slice(0, 2);

  const matchedCounterparties = counterparties
    .filter((cp) => cp.name.toLowerCase().includes(cleanQ) || cp.type.toLowerCase().includes(cleanQ))
    .slice(0, 2);

  const handleSelectCommitment = (comId: string) => {
    setCommandPaletteOpen(false);
    onNavigate(`/commitments/${comId}`);
  };

  const handleSelectEvidence = (evId: string) => {
    setCommandPaletteOpen(false);
    setSelectedEvidenceId(evId);
  };

  const handleSelectGate = (gateId: string) => {
    setCommandPaletteOpen(false);
    onNavigate(`/gates/${gateId}`);
  };

  const handleSelectTask = () => {
    setCommandPaletteOpen(false);
    onNavigate('/tasks');
  };

  const handleSelectDocs = () => {
    setCommandPaletteOpen(false);
    onNavigate('/docs');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-[#12161B] border border-[#222933] rounded-lg shadow-2xl overflow-hidden flex flex-col text-[#E9EEF4]"
        role="dialog"
        aria-modal="true"
      >
        {/* Input */}
        <div className="p-4 border-b border-[#222933] flex items-center gap-3 bg-[#1A1F26]">
          <Search className="w-5 h-5 text-[#9AA6B4]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commitments, evidence, gates, policies, tasks, docs... (Esc to close)"
            className="w-full bg-transparent border-none outline-hidden text-sm text-[#E9EEF4] placeholder-[#667486]"
            autoFocus
          />
          <kbd className="hidden sm:inline-block font-mono text-[10px] bg-[#0A0C0F] text-[#9AA6B4] px-2 py-0.5 rounded border border-[#222933]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Commitments */}
          {matchedCommitments.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase text-[#667486] px-2 mb-1">
                Commitments
              </div>
              <div className="space-y-1">
                {matchedCommitments.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectCommitment(c.id)}
                    className="w-full text-left p-2 rounded hover:bg-[#1A1F26] flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-[#3A6FD8]">{c.id}</span>
                      <span className="text-[#E9EEF4] font-medium">{c.title}</span>
                    </div>
                    <span className="text-[10px] text-[#667486] group-hover:text-[#9AA6B4]">
                      {c.currentStateName}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Evidence */}
          {matchedEvidence.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase text-[#667486] px-2 mb-1">
                Evidence Records
              </div>
              <div className="space-y-1">
                {matchedEvidence.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => handleSelectEvidence(e.id)}
                    className="w-full text-left p-2 rounded hover:bg-[#1A1F26] flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#9AA6B4]" />
                      <span className="font-mono text-[11px] text-[#9AA6B4]">{e.id}</span>
                      <span className="text-[#E9EEF4]">{e.title}</span>
                    </div>
                    <span className="text-[10px] text-[#667486]">{e.originClass}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Capital Gates */}
          {matchedGates.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase text-[#667486] px-2 mb-1">
                Capital Gates
              </div>
              <div className="space-y-1">
                {matchedGates.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => handleSelectGate(g.id)}
                    className="w-full text-left p-2 rounded hover:bg-[#1A1F26] flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-[#C8922F]" />
                      <span className="font-mono text-[11px] text-[#E9EEF4]">{g.id}</span>
                      <span className="text-[#E9EEF4]">{g.name}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#9AA6B4]">{g.capitalAmount}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Evidence Tasks */}
          {matchedTasks.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase text-[#667486] px-2 mb-1">
                Evidence Tasks
              </div>
              <div className="space-y-1">
                {matchedTasks.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={handleSelectTask}
                    className="w-full text-left p-2 rounded hover:bg-[#1A1F26] flex items-center justify-between transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-3.5 h-3.5 text-[#2E9268]" />
                      <span className="font-mono text-[11px] text-[#9AA6B4]">{t.id}</span>
                      <span className="text-[#E9EEF4]">{t.title}</span>
                    </div>
                    <span className="text-[10px] text-[#667486]">{t.status}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Docs Shortcut */}
          <div className="pt-2 border-t border-[#222933]">
            <button
              type="button"
              onClick={handleSelectDocs}
              className="w-full text-left p-2 rounded hover:bg-[#1A1F26] flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 text-[#9AA6B4]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Open Documentation & Assurance Lexicon</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#667486]" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#222933] bg-[#0D1116] flex items-center justify-between text-[11px] text-[#667486] font-mono">
          <span>Navigate with ↑ ↓ or click</span>
          <span>ASSURE Global Index</span>
        </div>
      </div>
    </div>
  );
};
