import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Evidence } from '../../types';
import {
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileBox,
  FileCheck2,
  FileSearch,
  FileText,
  Filter,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  X,
} from 'lucide-react';

// ================= EVIDENCE LIBRARY VIEW =================
export const EvidenceLibrary: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const { evidence, setSelectedEvidenceId, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');

  const filtered = evidence.filter((e) => {
    if (search) {
      const q = search.toLowerCase();
      if (!e.title.toLowerCase().includes(q) && !e.sourceName.toLowerCase().includes(q) && !e.id.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (selectedOrigin !== 'all' && e.originClass !== selectedOrigin) return false;
    return true;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-[#E9EEF4]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#222933]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
              Documentary Provenance
            </span>
            <span className="text-[#667486]">·</span>
            <span className="text-xs font-mono text-[#9AA6B4]">{evidence.length} Records</span>
          </div>
          <h1 className="text-2xl font-serif text-[#E9EEF4]">Evidence Library</h1>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('/ingest')}
          className="px-3 py-2 bg-[#3A6FD8] hover:bg-[#4C82EC] text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Ingest New Package</span>
        </button>
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
              placeholder="Search evidence records, source names, sha256 hashes..."
              className="w-full bg-[#0D1116] border border-[#222933] pl-9 pr-3 py-1.5 rounded text-xs text-[#E9EEF4] outline-hidden focus:border-[#3A6FD8]"
            />
          </div>

          <select
            value={selectedOrigin}
            onChange={(e) => setSelectedOrigin(e.target.value)}
            className="bg-[#0D1116] border border-[#222933] px-3 py-1.5 rounded text-xs text-[#E9EEF4] outline-hidden cursor-pointer"
          >
            <option value="all">All Origin Classes</option>
            <option value="Regulator-origin">Regulator / Statutory</option>
            <option value="Third-party">Third-Party Independent</option>
            <option value="Counterparty-origin">Counterparty / Vendor</option>
            <option value="Same-origin">Same-Origin (EPC)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#12161B] border border-[#222933] rounded-lg overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1A1F26] text-[#9AA6B4] font-mono text-[11px] uppercase border-b border-[#222933]">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Title & Summary</th>
                <th className="p-3">Origin Class</th>
                <th className="p-3">Source Name</th>
                <th className="p-3">Observed Date</th>
                <th className="p-3">Freshness</th>
                <th className="p-3">Linked Commitments</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222933] bg-[#12161B]">
              {filtered.map((e) => (
                <tr
                  key={e.id}
                  onClick={() => setSelectedEvidenceId(e.id)}
                  className="hover:bg-[#161C23] transition-colors cursor-pointer"
                >
                  <td className="p-3 font-mono text-[11px] text-[#3A6FD8]">{e.id}</td>
                  <td className="p-3 max-w-sm">
                    <div className="font-semibold text-[#E9EEF4]">{e.title}</div>
                    <div className="text-[11px] text-[#9AA6B4] line-clamp-1">{e.whatItEstablishes}</div>
                  </td>
                  <td className="p-3">
                    <span className="text-[10px] font-mono bg-[#1A1F26] px-2 py-0.5 rounded text-[#9AA6B4] border border-[#222933]">
                      {e.originClass}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-[#E9EEF4]">{e.sourceName}</td>
                  <td className="p-3 font-mono text-[11px] text-[#9AA6B4]">{e.observedAt ? e.observedAt.slice(0, 10) : '2026-08-10'}</td>
                  <td className="p-3 font-mono text-[11px]">
                    <span className={e.freshnessDaysRemaining < 100 ? 'text-[#C8922F]' : 'text-[#2E9268]'}>
                      {e.freshnessDaysRemaining}d remaining
                    </span>
                  </td>
                  <td className="p-3 font-mono text-[11px] text-[#3A6FD8]">
                    {e.linkedCommitmentIds.join(', ')}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={(ev) => {
                        ev.stopPropagation();
                        setSelectedEvidenceId(e.id);
                      }}
                      className="px-2.5 py-1 bg-[#1A1F26] hover:bg-[#222933] border border-[#222933] rounded text-[11px] text-[#E9EEF4] cursor-pointer"
                    >
                      Inspect
                    </button>
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

// ================= INGEST PACKAGE VIEW =================
export const IngestPackageView: React.FC<{ onNavigate: (p: string) => void }> = ({
  onNavigate,
}) => {
  const { addToast } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);

  const samplePackages = [
    {
      name: 'Apex_EPC_Primavera_P6_Master_Schedule_Export_Oct2028.xer',
      type: 'Schedule (Primavera P6)',
      size: '14.2 MB',
      estimatedCommitments: 12,
    },
    {
      name: 'Voltrix_Power_Transformer_Supply_Contract_PO9941.pdf',
      type: 'Equipment PO & Vendor Letter',
      size: '3.8 MB',
      estimatedCommitments: 4,
    },
    {
      name: 'MSETCL_Substation_Grid_Feeder_Sanction_Order_v2.pdf',
      type: 'Statutory Utility Order',
      size: '1.9 MB',
      estimatedCommitments: 2,
    },
  ];

  const handleSimulateIngest = (pkgName: string) => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      addToast({
        title: 'Package Ingested & Parsed',
        message: `Extracted proposed commitments from ${pkgName}. Routed to Review Queue for human validation.`,
        type: 'success',
      });
      onNavigate('/review');
    }, 1800);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-fadeIn text-[#E9EEF4]">
      <div className="space-y-1 pb-4 border-b border-[#222933]">
        <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
          Ingestion & Extraction
        </span>
        <h1 className="text-2xl font-serif text-[#E9EEF4]">Ingest Project Package</h1>
        <p className="text-xs text-[#9AA6B4]">
          Upload unstructured engineering packages, P6 schedules, SAP purchase orders, or statutory letters.
        </p>
      </div>

      {/* Drag and Drop Zone */}
      <div className="p-12 border-2 border-dashed border-[#222933] hover:border-[#3A6FD8] bg-[#12161B] rounded-lg text-center space-y-4 transition-colors">
        <UploadCloud className="w-10 h-10 text-[#3A6FD8] mx-auto" />
        <div className="space-y-1">
          <div className="text-sm font-semibold text-[#E9EEF4]">
            Drag and drop project files here, or click to browse
          </div>
          <div className="text-xs text-[#667486] font-mono">
            Supports .XER, .XML, .PDF, .DOCX, .JSON (Up to 500MB)
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleSimulateIngest('Primavera_P6_Baseline_Update.xer')}
          disabled={isProcessing}
          className="px-5 py-2.5 bg-[#3A6FD8] hover:bg-[#4C82EC] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
        >
          {isProcessing ? 'Parsing Schedule & Extracting Promises...' : 'Upload & Process File'}
        </button>
      </div>

      {/* Pre-Loaded Demo Packages */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase text-[#9AA6B4] tracking-wider font-semibold">
          Or Process Sample Demonstration Packages
        </h3>

        <div className="space-y-2">
          {samplePackages.map((pkg, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#12161B] border border-[#222933] rounded-lg flex items-center justify-between gap-4 text-xs font-mono"
            >
              <div className="space-y-0.5">
                <div className="font-semibold text-[#E9EEF4]">{pkg.name}</div>
                <div className="text-[#667486] text-[11px]">
                  {pkg.type} · {pkg.size} · ~{pkg.estimatedCommitments} Extracted Commitments
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSimulateIngest(pkg.name)}
                disabled={isProcessing}
                className="px-3 py-1.5 bg-[#1A1F26] hover:bg-[#222933] border border-[#222933] rounded text-xs text-[#3A6FD8] hover:text-white transition-colors cursor-pointer shrink-0"
              >
                Ingest Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ================= REVIEW QUEUE VIEW =================
export const ReviewQueueView: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const { addToast } = useApp();

  const [queueItems, setQueueItems] = useState([
    {
      id: 'PROP-01',
      title: 'Auxiliary Diesel Generators (4x 2.5MW) Delivery',
      counterparty: 'Cummins India Ltd',
      deadline: '2028-11-05',
      wording: 'Delivery to site within 18 weeks of advance payment milestone verification.',
      qualifier: 'Subject to port customs clearance in JNPT.',
      confidence: 'High (0.94)',
    },
    {
      id: 'PROP-02',
      title: 'Fire Safety NOC Final Inspection & Signoff',
      counterparty: 'MIDC Fire Services',
      deadline: '2028-11-18',
      wording: 'Joint hydraulic pressure testing of riser network prior to issuing final occupancy NOC.',
      qualifier: 'Requires municipal water connection live.',
      confidence: 'Medium (0.81)',
    },
  ]);

  const handleApprove = (id: string, title: string) => {
    setQueueItems((prev) => prev.filter((i) => i.id !== id));
    addToast({
      title: 'Commitment Registered',
      message: `Approved "${title}" into official Commitment Registry.`,
      type: 'success',
    });
  };

  const handleDiscard = (id: string) => {
    setQueueItems((prev) => prev.filter((i) => i.id !== id));
    addToast({
      title: 'Proposal Discarded',
      message: 'Extracted commitment removed from review queue.',
      type: 'info',
    });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-fadeIn text-[#E9EEF4]">
      <div className="space-y-1 pb-4 border-b border-[#222933]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
            Human-in-the-Loop Governance
          </span>
          <span className="text-[#667486]">·</span>
          <span className="text-xs font-mono text-[#9AA6B4]">{queueItems.length} Pending</span>
        </div>
        <h1 className="text-2xl font-serif text-[#E9EEF4]">Extraction Review Queue</h1>
        <p className="text-xs text-[#9AA6B4]">
          Review and approve AI-extracted commitments before they enter the official project ledger.
        </p>
      </div>

      {queueItems.length === 0 ? (
        <div className="p-12 text-center bg-[#12161B] border border-[#222933] rounded-lg space-y-3">
          <CheckCircle2 className="w-8 h-8 text-[#2E9268] mx-auto" />
          <h2 className="text-base font-semibold text-[#E9EEF4]">Review Queue Clear</h2>
          <p className="text-xs text-[#9AA6B4]">
            All extracted promises have been verified and assigned to the registry.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/commitments')}
            className="px-4 py-2 bg-[#3A6FD8] text-white text-xs font-medium rounded mt-2 cursor-pointer"
          >
            View Commitment Registry
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {queueItems.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-[#12161B] border border-[#222933] rounded-lg space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-[#3A6FD8] font-bold">{item.id}</span>
                  <span className="text-[#667486]">·</span>
                  <span className="text-[#9AA6B4]">Confidence: {item.confidence}</span>
                </div>
                <span className="text-[10px] font-mono bg-[#1A1F26] px-2 py-0.5 rounded text-[#9AA6B4]">
                  PENDING APPROVAL
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#E9EEF4]">{item.title}</h3>
                <div className="text-xs text-[#9AA6B4] mt-0.5">
                  Counterparty: <span className="text-[#E9EEF4]">{item.counterparty}</span> · Deadline:{' '}
                  <span className="text-[#E9EEF4] font-mono">{item.deadline}</span>
                </div>
              </div>

              <div className="p-3 bg-[#0A0C0F] rounded border border-[#222933] space-y-1 font-mono text-xs">
                <span className="text-[10px] text-[#667486] block">EXTRACTED CONTRACT WORDING:</span>
                <p className="text-[#E9EEF4] italic">"{item.wording}"</p>
                <div className="text-[11px] text-[#C8922F] pt-1">
                  Preserved Caveat: {item.qualifier}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#222933]">
                <button
                  type="button"
                  onClick={() => handleDiscard(item.id)}
                  className="px-3 py-1.5 bg-[#1A1F26] hover:bg-[#222933] border border-[#222933] rounded text-xs text-[#9AA6B4] hover:text-white transition-colors cursor-pointer"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={() => handleApprove(item.id, item.title)}
                  className="px-4 py-1.5 bg-[#3A6FD8] hover:bg-[#4C82EC] text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                >
                  Approve into Registry
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
