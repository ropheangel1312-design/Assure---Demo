import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Commitment, ConditionFlag } from '../../types';
import { ASSURANCE_STATE_NAMES } from '../../engine/evaluation';
import { StateBadge } from '../common/StateBadge';
import { ConditionFlagChip } from '../common/ConditionFlagChip';
import {
  ArrowUpDown,
  CheckSquare,
  ChevronDown,
  Download,
  FileCode,
  FileSpreadsheet,
  Filter,
  Layers,
  Plus,
  Search,
  Shield,
  SlidersHorizontal,
  X,
} from 'lucide-react';

interface CommitmentRegistryProps {
  onNavigate: (path: string) => void;
}

export const CommitmentRegistry: React.FC<CommitmentRegistryProps> = ({ onNavigate }) => {
  const {
    commitments,
    setSelectedCommitmentId,
    setWhyThisStateCommitmentId,
    setCertificateCommitmentId,
    addToast,
  } = useApp();

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateBucket, setSelectedStateBucket] = useState<'all' | 'substantiated' | 'documented' | 'claimed' | 'contradictory'>('all');
  const [selectedGateFilter, setSelectedGateFilter] = useState<string>('all');
  const [selectedCounterpartyFilter, setSelectedCounterpartyFilter] = useState<string>('all');
  const [selectedFlagFilter, setSelectedFlagFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'id' | 'deadline' | 'state' | 'exposure'>('state');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Multi-selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filtered and sorted data
  const filteredCommitments = useMemo(() => {
    return commitments
      .filter((c) => {
        // Text search
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const match =
            c.id.toLowerCase().includes(q) ||
            c.title.toLowerCase().includes(q) ||
            c.counterpartyName.toLowerCase().includes(q) ||
            c.type.toLowerCase().includes(q);
          if (!match) return false;
        }

        // State bucket filter
        if (selectedStateBucket === 'substantiated' && c.currentState < 4) return false;
        if (selectedStateBucket === 'documented' && (c.currentState !== 2 && c.currentState !== 3)) return false;
        if (selectedStateBucket === 'claimed' && c.currentState !== 1) return false;
        if (selectedStateBucket === 'contradictory' && !c.conditionFlags.includes('CONTRADICTORY')) return false;

        // Gate filter
        if (selectedGateFilter !== 'all' && c.applicableGateId !== selectedGateFilter) return false;

        // Counterparty filter
        if (selectedCounterpartyFilter !== 'all' && c.counterpartyId !== selectedCounterpartyFilter) return false;

        // Flag filter
        if (selectedFlagFilter !== 'all' && !c.conditionFlags.includes(selectedFlagFilter as ConditionFlag)) return false;

        return true;
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortField === 'id') cmp = a.id.localeCompare(b.id);
        if (sortField === 'deadline') cmp = a.deadline.localeCompare(b.deadline);
        if (sortField === 'state') cmp = a.currentState - b.currentState;
        if (sortField === 'exposure') {
          const numA = parseInt(a.financialExposure.replace(/[^0-9]/g, '')) || 0;
          const numB = parseInt(b.financialExposure.replace(/[^0-9]/g, '')) || 0;
          cmp = numA - numB;
        }
        return sortDirection === 'asc' ? cmp : -cmp;
      });
  }, [
    commitments,
    searchQuery,
    selectedStateBucket,
    selectedGateFilter,
    selectedCounterpartyFilter,
    selectedFlagFilter,
    sortField,
    sortDirection,
  ]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredCommitments.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkExportJSON = () => {
    const selectedData = commitments.filter((c) => selectedIds.includes(c.id));
    const dataStr = JSON.stringify(selectedData.length > 0 ? selectedData : filteredCommitments, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CommitmentRegistry-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({
      title: 'Registry Exported',
      message: `Exported ${selectedData.length > 0 ? selectedData.length : filteredCommitments.length} commitments as JSON.`,
      type: 'success',
    });
  };

  const handleBulkExportCSV = () => {
    const data = selectedIds.length > 0
      ? commitments.filter((c) => selectedIds.includes(c.id))
      : filteredCommitments;

    const headers = ['ID', 'Title', 'Type', 'Counterparty', 'CurrentState', 'RequiredState', 'Flags', 'Deadline', 'Exposure', 'Gate'];
    const rows = data.map((c) => [
      c.id,
      `"${c.title.replace(/"/g, '""')}"`,
      c.type,
      `"${c.counterpartyName.replace(/"/g, '""')}"`,
      c.currentStateName,
      ASSURANCE_STATE_NAMES[c.requiredState],
      c.conditionFlags.join(';'),
      c.deadline,
      c.financialExposure,
      c.applicableGateId,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CommitmentRegistry-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({
      title: 'CSV Exported',
      message: `Exported ${data.length} commitments as CSV.`,
      type: 'success',
    });
  };

  const handleBulkCreateTasks = () => {
    addToast({
      title: 'Bulk Evidence Tasks Created',
      message: `Generated missing evidence collection tasks for ${selectedIds.length} selected commitments.`,
      type: 'info',
    });
    setSelectedIds([]);
    onNavigate('/tasks');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-[#E9EEF4]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#222933]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
              Assurance Registry
            </span>
            <span className="text-[#667486]">·</span>
            <span className="text-xs font-mono text-[#9AA6B4]">{commitments.length} Total</span>
          </div>
          <h1 className="text-2xl font-serif text-[#E9EEF4]">Commitment Registry</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleBulkExportCSV}
            className="px-3 py-1.5 bg-[#1A1F26] hover:bg-[#222933] border border-[#222933] rounded text-xs text-[#E9EEF4] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={handleBulkExportJSON}
            className="px-3 py-1.5 bg-[#1A1F26] hover:bg-[#222933] border border-[#222933] rounded text-xs text-[#E9EEF4] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* State Summary Filter Bar (Interactive Buttons) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
        <button
          type="button"
          onClick={() => setSelectedStateBucket('all')}
          className={`p-3 rounded border text-left transition-colors cursor-pointer ${
            selectedStateBucket === 'all'
              ? 'bg-[#1A1F26] border-[#3A6FD8] text-[#E9EEF4]'
              : 'bg-[#12161B] border-[#222933] text-[#9AA6B4] hover:bg-[#151A21]'
          }`}
        >
          <span className="text-[10px] text-[#667486] block uppercase">ALL COMMITMENTS</span>
          <span className="text-lg font-bold">{commitments.length}</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStateBucket('substantiated')}
          className={`p-3 rounded border text-left transition-colors cursor-pointer ${
            selectedStateBucket === 'substantiated'
              ? 'bg-[#1A1F26] border-[#2E9268] text-[#2E9268]'
              : 'bg-[#12161B] border-[#222933] text-[#9AA6B4] hover:bg-[#151A21]'
          }`}
        >
          <span className="text-[10px] text-[#667486] block uppercase">SUBSTANTIATED (≥4)</span>
          <span className="text-lg font-bold text-[#2E9268]">
            {commitments.filter((c) => c.currentState >= 4).length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStateBucket('documented')}
          className={`p-3 rounded border text-left transition-colors cursor-pointer ${
            selectedStateBucket === 'documented'
              ? 'bg-[#1A1F26] border-[#4E6C93] text-[#4E6C93]'
              : 'bg-[#12161B] border-[#222933] text-[#9AA6B4] hover:bg-[#151A21]'
          }`}
        >
          <span className="text-[10px] text-[#667486] block uppercase">DOCUMENTED (2-3)</span>
          <span className="text-lg font-bold text-[#4E6C93]">
            {commitments.filter((c) => c.currentState === 2 || c.currentState === 3).length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStateBucket('claimed')}
          className={`p-3 rounded border text-left transition-colors cursor-pointer ${
            selectedStateBucket === 'claimed'
              ? 'bg-[#1A1F26] border-[#C8922F] text-[#C8922F]'
              : 'bg-[#12161B] border-[#222933] text-[#9AA6B4] hover:bg-[#151A21]'
          }`}
        >
          <span className="text-[10px] text-[#667486] block uppercase">CLAIMED (1)</span>
          <span className="text-lg font-bold text-[#C8922F]">
            {commitments.filter((c) => c.currentState === 1).length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedStateBucket('contradictory')}
          className={`p-3 rounded border text-left transition-colors cursor-pointer ${
            selectedStateBucket === 'contradictory'
              ? 'bg-[#1A1F26] border-[#C4483F] text-[#C4483F]'
              : 'bg-[#12161B] border-[#222933] text-[#9AA6B4] hover:bg-[#151A21]'
          }`}
        >
          <span className="text-[10px] text-[#667486] block uppercase">CONTRADICTORY</span>
          <span className="text-lg font-bold text-[#C4483F]">
            {commitments.filter((c) => c.conditionFlags.includes('CONTRADICTORY')).length}
          </span>
        </button>
      </div>

      {/* Filter Controls & Search */}
      <div className="bg-[#12161B] border border-[#222933] p-4 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 flex-1 min-w-[260px]">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-[#667486] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, title, counterparty, equipment type..."
              className="w-full bg-[#0D1116] border border-[#222933] pl-9 pr-3 py-1.5 rounded text-xs text-[#E9EEF4] placeholder-[#667486] outline-hidden focus:border-[#3A6FD8]"
            />
          </div>

          {/* Gate filter dropdown */}
          <select
            value={selectedGateFilter}
            onChange={(e) => setSelectedGateFilter(e.target.value)}
            className="bg-[#0D1116] border border-[#222933] px-2.5 py-1.5 rounded text-xs text-[#E9EEF4] outline-hidden cursor-pointer"
          >
            <option value="all">All Capital Gates</option>
            <option value="GATE-3">Gate 3 (Civils)</option>
            <option value="GATE-4">Gate 4 (Energisation)</option>
            <option value="GATE-5">Gate 5 (Handover)</option>
          </select>

          {/* Condition flag filter */}
          <select
            value={selectedFlagFilter}
            onChange={(e) => setSelectedFlagFilter(e.target.value)}
            className="bg-[#0D1116] border border-[#222933] px-2.5 py-1.5 rounded text-xs text-[#E9EEF4] outline-hidden cursor-pointer"
          >
            <option value="all">All Flags</option>
            <option value="CONTRADICTORY">CONTRADICTORY</option>
            <option value="STALE">STALE</option>
            <option value="EXPIRED">EXPIRED</option>
            <option value="DISPUTED">DISPUTED</option>
          </select>
        </div>

        {/* Bulk Action Bar (when selected) */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 bg-[#3A6FD8]/15 border border-[#3A6FD8]/30 px-3 py-1 rounded">
            <span className="text-[11px] font-mono font-semibold text-[#E9EEF4]">
              {selectedIds.length} Selected
            </span>
            <button
              type="button"
              onClick={handleBulkCreateTasks}
              className="px-2 py-0.5 bg-[#3A6FD8] hover:bg-[#4C82EC] text-white rounded text-[11px] font-medium transition-colors cursor-pointer"
            >
              Create Evidence Tasks
            </button>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="text-[#9AA6B4] hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Dense Table */}
      <div className="bg-[#12161B] border border-[#222933] rounded-lg overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1A1F26] text-[#9AA6B4] font-mono text-[11px] uppercase border-b border-[#222933]">
              <tr>
                <th className="p-3 w-8">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length > 0 &&
                      selectedIds.length === filteredCommitments.length
                    }
                    onChange={handleSelectAll}
                    className="rounded bg-[#0A0C0F] border-[#222933] text-[#3A6FD8] cursor-pointer"
                  />
                </th>
                <th
                  onClick={() => {
                    setSortField('id');
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                  }}
                  className="p-3 cursor-pointer hover:text-[#E9EEF4]"
                >
                  <div className="flex items-center gap-1">
                    <span>ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="p-3">Commitment Title & Required Outcome</th>
                <th className="p-3">Counterparty</th>
                <th
                  onClick={() => {
                    setSortField('state');
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                  }}
                  className="p-3 cursor-pointer hover:text-[#E9EEF4]"
                >
                  <div className="flex items-center gap-1">
                    <span>Assurance State</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="p-3">Required</th>
                <th className="p-3">Flags</th>
                <th className="p-3">Evidence Paths</th>
                <th
                  onClick={() => {
                    setSortField('exposure');
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                  }}
                  className="p-3 cursor-pointer hover:text-[#E9EEF4]"
                >
                  <div className="flex items-center gap-1">
                    <span>Exposure</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="p-3">Gate</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222933] bg-[#12161B]">
              {filteredCommitments.map((c) => {
                const isSelected = selectedIds.includes(c.id);

                return (
                  <tr
                    key={c.id}
                    className={`hover:bg-[#161C23] transition-colors ${
                      isSelected ? 'bg-[#3A6FD8]/5' : ''
                    }`}
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(c.id)}
                        className="rounded bg-[#0A0C0F] border-[#222933] text-[#3A6FD8] cursor-pointer"
                      />
                    </td>
                    <td className="p-3 font-mono text-[11px] text-[#3A6FD8] font-medium whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onNavigate(`/commitments/${c.id}`)}
                        className="hover:underline cursor-pointer"
                      >
                        {c.id}
                      </button>
                    </td>
                    <td className="p-3 max-w-xs sm:max-w-sm">
                      <div
                        onClick={() => onNavigate(`/commitments/${c.id}`)}
                        className="font-medium text-[#E9EEF4] hover:text-white cursor-pointer line-clamp-1"
                      >
                        {c.title}
                      </div>
                      <div className="text-[11px] text-[#667486] line-clamp-1 font-mono">
                        {c.requiredOutcome}
                      </div>
                    </td>
                    <td className="p-3 text-[#9AA6B4] whitespace-nowrap">
                      <div className="font-medium text-[#E9EEF4] text-xs">{c.counterpartyName}</div>
                      <div className="text-[10px] text-[#667486]">{c.counterpartyType}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <StateBadge
                        stateIndex={c.currentState}
                        size="sm"
                        onClick={() => setWhyThisStateCommitmentId(c.id)}
                      />
                    </td>
                    <td className="p-3 font-mono text-[11px] text-[#667486] whitespace-nowrap">
                      [{c.requiredState}] {ASSURANCE_STATE_NAMES[c.requiredState]}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 flex-wrap">
                        {c.conditionFlags.length > 0 ? (
                          c.conditionFlags.map((flag) => (
                            <ConditionFlagChip key={flag} flag={flag} size="sm" />
                          ))
                        ) : (
                          <span className="text-[10px] text-[#667486] font-mono">Clean</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-[#9AA6B4] whitespace-nowrap">
                      <span className="text-[#E9EEF4] font-semibold">{c.independentEvidencePathCount}</span> / {c.evidenceCount} records
                    </td>
                    <td className="p-3 font-mono text-[11px] text-[#E9EEF4] whitespace-nowrap">
                      {c.financialExposure}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-[#9AA6B4] whitespace-nowrap">
                      {c.applicableGateId}
                    </td>
                    <td className="p-3 text-right whitespace-nowrap space-x-1">
                      <button
                        type="button"
                        onClick={() => onNavigate(`/commitments/${c.id}`)}
                        className="px-2 py-1 bg-[#1A1F26] hover:bg-[#222933] border border-[#222933] rounded text-[11px] text-[#E9EEF4] cursor-pointer"
                      >
                        Inspect
                      </button>
                      <button
                        type="button"
                        onClick={() => setCertificateCommitmentId(c.id)}
                        className="px-2 py-1 bg-[#1A1F26] hover:bg-[#222933] border border-[#222933] rounded text-[11px] text-[#3A6FD8] cursor-pointer"
                      >
                        Cert
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-[#222933] bg-[#0D1116] flex items-center justify-between text-[11px] font-mono text-[#667486]">
          <span>
            Showing {filteredCommitments.length} of {commitments.length} commitments
          </span>
          <span>Deterministic evaluation active</span>
        </div>
      </div>
    </div>
  );
};
