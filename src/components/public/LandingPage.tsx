import React, { useState } from 'react';
import { AssureLogo } from '../common/AssureLogo';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Database,
  ExternalLink,
  Eye,
  FileCheck2,
  FileSearch,
  FileText,
  GitBranch,
  GitFork,
  Layers,
  Network,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { ConditionFlagChip } from '../common/ConditionFlagChip';
import { StateBadge } from '../common/StateBadge';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  // Interactive widget active tab state
  const [selectedRecordTab, setSelectedRecordTab] = useState<'all' | 'contradiction' | 'lineage'>('all');

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] selection:bg-indigo-500/30">
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-20 px-6 lg:px-12 border-b border-[#262626] overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="flex justify-center mb-2">
            <AssureLogo size="lg" subtitleText="COMMITMENT ASSURANCE COCKPIT" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-[#262626] text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            ENTERPRISE GOVERNANCE & PROVENANCE INFRASTRUCTURE
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-[#EDEDED] max-w-4xl mx-auto leading-[1.15]">
            Prove the promise before the capital follows.
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Physical projects depend on hundreds of outside promises — grid connections, transformers, permits, water, fibre. ASSURE links each promise to the actual evidence behind it and shows what has really been proven before the next capital decision.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/demo')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/25 cursor-pointer"
            >
              <span>Open the Demo Cockpit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/how-it-works')}
              className="bg-[#111111] hover:bg-[#1A1A1A] border border-[#262626] text-[#EDEDED] font-medium px-6 py-3.5 rounded-xl text-sm transition-all cursor-pointer"
            >
              See How It Works
            </button>
          </div>

          {/* Live muted component */}
          <div className="pt-8 max-w-3xl mx-auto">
            <div className="bg-[#12161B] border border-[#222933] rounded p-4 font-mono text-xs text-[#9AA6B4] flex flex-wrap items-center justify-between gap-3 shadow-xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[#E9EEF4] font-bold">47 CRITICAL COMMITMENTS</span>
                <span className="text-[#667486]">·</span>
                <span className="text-[#2E9268] font-medium">32 SUBSTANTIATED</span>
                <span className="text-[#667486]">·</span>
                <span className="text-[#4E6C93] font-medium">8 DOCUMENTED</span>
                <span className="text-[#667486]">·</span>
                <span className="text-[#C8922F] font-medium">5 CLAIMED</span>
                <span className="text-[#667486]">·</span>
                <span className="text-[#C4483F] font-medium">2 CONTRADICTORY</span>
              </div>
              <span className="text-[10px] bg-[#222933] px-2 py-0.5 rounded text-[#667486] tracking-wider uppercase font-semibold">
                DEMO DATA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SECTION */}
      <section className="py-24 px-6 lg:px-12 border-b border-[#222933] bg-[#0D1116]/50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
              The Epistemological Gap
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#E9EEF4]">
              "The project says it's on track. What actually proves it?"
            </h2>
            <p className="text-sm sm:text-base text-[#9AA6B4] leading-relaxed">
              Consider a $1B data centre with a Commercial Operation Date of 30 November 2028. The schedule says the transformer arrives in October. The purchase order says October. The vendor commitment letter says October. The investor model assumes it. None of those assertions is the same as the transformer being physically ready and verified when the capital is deployed.
            </p>
          </div>

          {/* 4-column strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#12161B] p-5 rounded border border-[#222933] space-y-2">
              <div className="text-[10px] font-mono text-[#667486] uppercase tracking-wider">
                Schedule
              </div>
              <div className="text-sm font-semibold text-[#E9EEF4]">Project Intent</div>
              <p className="text-xs text-[#9AA6B4] leading-relaxed">
                Knows what internal plans hope to achieve across activities.
              </p>
            </div>

            <div className="bg-[#12161B] p-5 rounded border border-[#222933] space-y-2">
              <div className="text-[10px] font-mono text-[#667486] uppercase tracking-wider">
                Procurement
              </div>
              <div className="text-sm font-semibold text-[#E9EEF4]">Transaction</div>
              <p className="text-xs text-[#9AA6B4] leading-relaxed">
                Knows what commercial purchase order was issued and signed.
              </p>
            </div>

            <div className="bg-[#12161B] p-5 rounded border border-[#222933] space-y-2">
              <div className="text-[10px] font-mono text-[#667486] uppercase tracking-wider">
                Supplier
              </div>
              <div className="text-sm font-semibold text-[#E9EEF4]">Vendor Claim</div>
              <p className="text-xs text-[#9AA6B4] leading-relaxed">
                Knows what delivery date it promised (with caveats preserved).
              </p>
            </div>

            <div className="bg-[#12161B] p-5 rounded border border-[#222933] space-y-2">
              <div className="text-[10px] font-mono text-[#667486] uppercase tracking-wider">
                Site
              </div>
              <div className="text-sm font-semibold text-[#E9EEF4]">Physical Reality</div>
              <p className="text-xs text-[#9AA6B4] leading-relaxed">
                Knows what foundation, transformer, or permit actually exists.
              </p>
            </div>
          </div>

          <div className="text-center font-serif text-xl text-[#E9EEF4] pt-4">
            "No common evidence state connects them."
          </div>
        </div>
      </section>

      {/* 3. PLAN ≠ PROMISE ≠ PROOF LADDER */}
      <section className="py-20 px-6 lg:px-12 border-b border-[#222933]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-[#9AA6B4] uppercase tracking-wider">
              Epistemic Precision
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#E9EEF4]">
              Plan ≠ Promise ≠ Proof
            </h2>
            <p className="text-xs text-[#667486] font-mono">
              Ordinary project reporting compresses all of these into one green dot.
            </p>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex items-center justify-between min-w-[760px] bg-[#12161B] p-6 rounded border border-[#222933]">
              {[
                { stage: 'CLAIM', desc: 'Party asserts date' },
                { stage: 'PLAN', desc: 'Activity in P6' },
                { stage: 'CONTRACT', desc: 'PO executed' },
                { stage: 'COMMITMENT', desc: 'External promise' },
                { stage: 'SUBSTANTIATED', desc: 'Evidence meets policy' },
                { stage: 'DELIVERED', desc: 'On-site physical' },
                { stage: 'OPERATIONAL', desc: 'Energized & tested' },
              ].map((item, idx) => (
                <div key={item.stage} className="flex items-center gap-4">
                  <div className="text-center space-y-1">
                    <span className="text-xs font-mono font-bold text-[#E9EEF4] block">
                      {item.stage}
                    </span>
                    <span className="text-[10px] text-[#667486] block">{item.desc}</span>
                  </div>
                  {idx < 6 && (
                    <span className="text-[#333C48] font-mono font-bold text-sm">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (5 STEPS) */}
      <section className="py-24 px-6 lg:px-12 border-b border-[#222933] bg-[#0D1116]/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
              Methodology
            </span>
            <h2 className="text-3xl font-serif text-[#E9EEF4]">How ASSURE Works</h2>
            <p className="text-sm text-[#9AA6B4]">
              Five structured stages transforming unstructured project documentation into continuous capital assurance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Extract',
                desc: 'Extract critical promises from contracts, letters, schedules, preserving qualifiers verbatim.',
              },
              {
                step: '02',
                title: 'Link',
                desc: 'Connect raw evidence records, statutory filings, and logistics manifests to each commitment.',
              },
              {
                step: '03',
                title: 'Trace',
                desc: 'Analyze provenance and collapse restated documents into true independent origin paths.',
              },
              {
                step: '04',
                title: 'Apply',
                desc: 'Evaluate evidence deterministically against the specific policy protecting the decision.',
              },
              {
                step: '05',
                title: 'Expose',
                desc: 'Surface exact missing records as actionable tasks before capital release.',
              },
            ].map((s) => (
              <div
                key={s.step}
                className="bg-[#12161B] p-5 rounded border border-[#222933] space-y-3 flex flex-col justify-between"
              >
                <div className="font-mono text-xs text-[#3A6FD8] font-bold">{s.step}</div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-[#E9EEF4]">{s.title}</div>
                  <p className="text-xs text-[#9AA6B4] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMMITMENT / EVIDENCE / ASSURANCE STORY */}
      <section className="py-24 px-6 lg:px-12 border-b border-[#222933]">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-serif text-[#E9EEF4]">
              The Core Object Model
            </h2>
            <p className="text-sm text-[#9AA6B4]">
              Three distinct entities governing physical capital decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#12161B] p-6 rounded border border-[#222933] space-y-3">
              <div className="text-xs font-mono text-[#3A6FD8] uppercase font-semibold">
                Commitment
              </div>
              <p className="text-xs text-[#9AA6B4] leading-relaxed">
                A future external condition your project depends upon. Owned by someone outside your organisation.
              </p>
            </div>

            <div className="bg-[#12161B] p-6 rounded border border-[#222933] space-y-3">
              <div className="text-xs font-mono text-[#2E9268] uppercase font-semibold">
                Evidence
              </div>
              <p className="text-xs text-[#9AA6B4] leading-relaxed">
                What supports or contradicts it, where it came from, how independent it is, and how recently it was observed.
              </p>
            </div>

            <div className="bg-[#12161B] p-6 rounded border border-[#222933] space-y-3">
              <div className="text-xs font-mono text-[#C8922F] uppercase font-semibold">
                Assurance
              </div>
              <p className="text-xs text-[#9AA6B4] leading-relaxed">
                Whether the available evidence meets the standard required for a specific capital decision. Not whether it is true.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. KILLER DEMO SECTION (INTERACTIVE TRANSFORMER WIDGET) */}
      <section className="py-24 px-6 lg:px-12 border-b border-[#222933] bg-[#0D1116]">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C8922F]">
              <AlertTriangle className="w-4 h-4" />
              INTERACTIVE CASE DEMONSTRATION
            </div>
            <h2 className="text-3xl font-serif text-[#E9EEF4]">
              The 220kV Transformer Dilemma
            </h2>
            <p className="text-sm text-[#9AA6B4]">
              How four documents produce a single assertion — and why one logistics record halts capital release.
            </p>
          </div>

          {/* Interactive Widget Box */}
          <div className="bg-[#12161B] border border-[#222933] rounded-lg p-6 space-y-6 shadow-2xl">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#222933]">
              <div>
                <span className="font-mono text-xs text-[#9AA6B4]">COM-48291</span>
                <h3 className="text-base font-semibold text-[#E9EEF4]">
                  220kV Step-Down Transformer — Available for Energisation by 15 Oct 2028
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <StateBadge stateIndex={2} />
                <ConditionFlagChip flag="CONTRADICTORY" />
              </div>
            </div>

            {/* Evidence items strip */}
            <div className="space-y-3 font-mono text-xs">
              <div className="text-[11px] text-[#667486] uppercase tracking-wider">
                Current Evidence Records Considered (4 items · 2 independent paths)
              </div>

              <div className="space-y-2">
                <div className="p-3 bg-[#0A0C0F] rounded border border-[#222933] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#4E6C93]" />
                    <span className="text-[#E9EEF4]">EPC Master Schedule: 12 Oct 2028</span>
                  </div>
                  <span className="text-[#667486] text-[10px]">Same-origin (Apex EPC)</span>
                </div>

                <div className="p-3 bg-[#0A0C0F] rounded border border-[#222933] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-3.5 h-3.5 text-[#4E6C93]" />
                    <span className="text-[#E9EEF4]">Purchase Order #PO-9941: 12 Oct 2028</span>
                  </div>
                  <span className="text-[#667486] text-[10px]">Counterparty-origin (OEM)</span>
                </div>

                <div className="p-3 bg-[#0A0C0F] rounded border border-[#222933] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#C8922F]" />
                    <span className="text-[#E9EEF4]">
                      Vendor Letter: 15 Oct 2028{' '}
                      <span className="text-[#C8922F] text-[11px] italic">
                        ("subject to final factory acceptance")
                      </span>
                    </span>
                  </div>
                  <span className="text-[#667486] text-[10px]">Counterparty-origin (OEM)</span>
                </div>

                <div className="p-3 bg-[#C4483F]/10 rounded border border-[#C4483F]/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#C4483F]">
                    <AlertOctagon className="w-3.5 h-3.5" />
                    <span className="font-bold">
                      Maersk Ocean Booking #MSK-7710: Vessel departure 02 Nov 2028
                    </span>
                  </div>
                  <span className="text-[#C4483F] text-[10px] font-bold">
                    Third-party Logistics Contradiction
                  </span>
                </div>

                <div className="p-3 bg-[#0A0C0F] rounded border border-dashed border-[#667486]/40 flex items-center justify-between text-xs opacity-75">
                  <div className="flex items-center gap-2 text-[#9AA6B4]">
                    <span className="w-3.5 h-3.5 rounded border border-dashed border-[#9AA6B4] flex items-center justify-center text-[9px]">
                      ?
                    </span>
                    <span>Independent Factory Witness / Production Allocation: MISSING</span>
                  </div>
                  <span className="text-[#C8922F] text-[10px]">Required for Gate 4</span>
                </div>
              </div>
            </div>

            {/* Conclusion banner */}
            <div className="p-4 bg-[#1A1F26] rounded border border-[#222933] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-[#E9EEF4]">
                  ASSURE Policy Evaluation Outcome
                </div>
                <div className="font-serif text-lg text-[#E9EEF4]">
                  "The commitment isn't failed. It isn't proven."
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/commitments/COM-48291')}
                className="px-4 py-2 bg-[#3A6FD8] hover:bg-[#4C82EC] text-white text-xs font-medium rounded transition-colors flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span>Inspect Commitment in Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FIVE RECORDS ARE NOT FIVE SOURCES */}
      <section className="py-24 px-6 lg:px-12 border-b border-[#222933]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
              Provenance Rigour
            </span>
            <h2 className="text-3xl font-serif text-[#E9EEF4]">
              Five records are not five sources.
            </h2>
          </div>

          <div className="bg-[#12161B] p-6 rounded border border-[#222933] max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#E9EEF4]">
              <span className="bg-[#0A0C0F] p-2 rounded border border-[#222933]">EPC Schedule</span>
              <span>→</span>
              <span className="bg-[#0A0C0F] p-2 rounded border border-[#222933]">Weekly Report</span>
              <span>→</span>
              <span className="bg-[#0A0C0F] p-2 rounded border border-[#222933]">Investor Deck</span>
              <span>→</span>
              <span className="bg-[#0A0C0F] p-2 rounded border border-[#222933]">Lender Report</span>
            </div>

            <div className="pt-2 text-sm font-serif text-[#E9EEF4]">
              "Four documents. One assertion."
            </div>
            <p className="text-xs text-[#9AA6B4] max-w-md mx-auto">
              ASSURE counts independent evidence paths with distinct observation processes — never bare document volumes.
            </p>
          </div>
        </div>
      </section>

      {/* 8. CAPITAL GATE SECTION */}
      <section className="py-24 px-6 lg:px-12 border-b border-[#222933] bg-[#0D1116]/50">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
              Capital Governance
            </span>
            <h2 className="text-3xl font-serif text-[#E9EEF4]">
              Evidence conditions, checked before the money moves.
            </h2>
            <p className="text-sm text-[#9AA6B4]">
              ASSURE never approves or rejects capital. It states which evidence conditions are met and which are not. The decision stays with the accountable people.
            </p>
          </div>

          {/* Gate 4 Preview Card */}
          <div className="bg-[#12161B] border border-[#222933] rounded-lg p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#222933]">
              <div>
                <span className="text-xs font-mono text-[#667486]">CAPITAL GATE 4</span>
                <h3 className="text-base font-semibold text-[#E9EEF4]">
                  Grid Energisation Readiness · ₹50 crore
                </h3>
              </div>
              <span className="text-xs font-mono font-bold bg-[#C4483F]/15 text-[#C4483F] border border-[#C4483F]/30 px-3 py-1 rounded">
                EVIDENCE CONDITIONS NOT MET — HUMAN REVIEW REQUIRED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-[#0A0C0F] p-3 rounded border border-[#222933]">
                <div className="text-[10px] text-[#667486] mb-1">GRID INTERCONNECTION</div>
                <div className="text-[#2E9268] font-bold">≥ SUBSTANTIATED ✓</div>
              </div>
              <div className="bg-[#0A0C0F] p-3 rounded border border-[#C4483F]/30">
                <div className="text-[10px] text-[#667486] mb-1">220kV TRANSFORMER</div>
                <div className="text-[#C4483F] font-bold">≥ CORROBORATED ✗</div>
              </div>
              <div className="bg-[#0A0C0F] p-3 rounded border border-[#222933]">
                <div className="text-[10px] text-[#667486] mb-1">WATER SUPPLY</div>
                <div className="text-[#2E9268] font-bold">≥ SUBSTANTIATED ✓</div>
              </div>
              <div className="bg-[#0A0C0F] p-3 rounded border border-[#C4483F]/30">
                <div className="text-[10px] text-[#667486] mb-1">WATER DISCHARGE PERMIT</div>
                <div className="text-[#C4483F] font-bold">≥ SUBSTANTIATED ✗</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. COMPETITIVE DIFFERENTIATION */}
      <section className="py-24 px-6 lg:px-12 border-b border-[#222933]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
              Categorical Differentiation
            </span>
            <h2 className="text-3xl font-serif text-[#E9EEF4]">A Different Primary Object</h2>
            <p className="text-sm text-[#9AA6B4]">
              Enterprise infrastructure systems govern different dimensions of physical execution.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#222933] rounded overflow-hidden">
              <thead className="bg-[#12161B] text-[#9AA6B4] font-mono uppercase text-[11px] border-b border-[#222933]">
                <tr>
                  <th className="p-4">Platform Archetype</th>
                  <th className="p-4">Primary Object</th>
                  <th className="p-4">What It Governs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222933] bg-[#0D1116] text-[#E9EEF4]">
                <tr>
                  <td className="p-4 font-semibold text-[#9AA6B4]">Scheduling Platforms</td>
                  <td className="p-4 font-mono text-[#9AA6B4]">The Project Plan</td>
                  <td className="p-4 text-[#9AA6B4]">Sequence of internal project tasks and critical paths.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#9AA6B4]">Procurement & ERP</td>
                  <td className="p-4 font-mono text-[#9AA6B4]">The Transaction</td>
                  <td className="p-4 text-[#9AA6B4]">Purchase orders, invoicing, payments, and cost ledgers.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#9AA6B4]">Reality Capture</td>
                  <td className="p-4 font-mono text-[#9AA6B4]">The Physical Observation</td>
                  <td className="p-4 text-[#9AA6B4]">Point clouds, drone surveys, and 360° photographic capture.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#9AA6B4]">Readiness Platforms</td>
                  <td className="p-4 font-mono text-[#9AA6B4]">Site Assessment</td>
                  <td className="p-4 text-[#9AA6B4]">Operational readiness checklists and handover protocols.</td>
                </tr>
                <tr className="bg-[#3A6FD8]/10 font-medium">
                  <td className="p-4 font-bold text-[#E9EEF4] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3A6FD8]" />
                    ASSURE
                  </td>
                  <td className="p-4 font-mono text-[#3A6FD8] font-bold">The Critical Commitment</td>
                  <td className="p-4 text-[#E9EEF4]">The auditable evidence state of the external promise itself.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[#667486] leading-relaxed max-w-3xl">
            These systems are useful and largely complementary. Their primary object is different. ASSURE consumes their outputs and governs the evidence state of the commitment itself.
          </p>
        </div>
      </section>

      {/* 10. TRUST & CREDIBILITY */}
      <section className="py-24 px-6 lg:px-12 border-b border-[#222933] bg-[#0D1116]/40">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
              Governance & Integrity
            </span>
            <h2 className="text-3xl font-serif text-[#E9EEF4]">What ASSURE Never Claims</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#9AA6B4] pt-2">
              <li className="p-4 bg-[#12161B] rounded border border-[#222933] space-y-1">
                <span className="text-[#E9EEF4] font-semibold block">We do not claim to verify physical reality.</span>
                <span>We evaluate whether available documentary and operational records meet an explicit policy standard.</span>
              </li>
              <li className="p-4 bg-[#12161B] rounded border border-[#222933] space-y-1">
                <span className="text-[#E9EEF4] font-semibold block">We do not manufacture certainty.</span>
                <span>UNKNOWN and INSUFFICIENT EVIDENCE are valid, legitimate system outcomes.</span>
              </li>
              <li className="p-4 bg-[#12161B] rounded border border-[#222933] space-y-1">
                <span className="text-[#E9EEF4] font-semibold block">"Not substantiated" is not "false".</span>
                <span>It simply means the accessible evidence does not yet satisfy the policy required for that decision.</span>
              </li>
              <li className="p-4 bg-[#12161B] rounded border border-[#222933] space-y-1">
                <span className="text-[#E9EEF4] font-semibold block">Every state keeps its full audit trail.</span>
                <span>Evidence, provenance paths, policy clauses, freshness windows, and evaluation timestamps are permanently auditable.</span>
              </li>
            </ul>
          </div>

          {/* Sub-panel: Where the AI is, and isn't */}
          <div className="p-6 bg-[#12161B] rounded border border-[#222933] space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#E9EEF4]">
              Where the AI is, and isn't.
            </h3>
            <p className="text-xs text-[#9AA6B4] leading-relaxed">
              AI reads unstructured project documents to propose commitments, dates, links and potential contradictions. Deterministic rules evaluate state transitions, independent origin counts, freshness windows, policy compliance and gate conditions. Accountable human reviewers decide anything consequential.
            </p>
          </div>
        </div>
      </section>

      {/* 11 & 12. MVP POSITIONING & FUTURE VISION */}
      <section className="py-24 px-6 lg:px-12 border-b border-[#222933]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
              Wedge Scope & Roadmap
            </span>
            <h2 className="text-3xl font-serif text-[#E9EEF4]">What's Live Today & Where This Goes</h2>
            <p className="text-sm text-[#9AA6B4] leading-relaxed max-w-3xl">
              ASSURE today is a working commitment assurance workspace for a single data-centre project, focused on grid and power-chain dependencies. The demo runs on synthetic project data.
            </p>
          </div>

          {/* Roadmap rail */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Continuous Assurance', req: 'Requires external source connectors' },
              { title: 'Capital Assurance Drawdowns', req: 'Requires customer capital workflows' },
              { title: 'Transferable Assurance Record', req: 'Requires multi-party policy governance' },
              { title: 'Counterparty Intelligence', req: 'Requires accumulated outcome history' },
              { title: 'Evidence-Path Reliability', req: 'Requires historical outcome learning' },
              { title: 'Evidence Provider Network', req: 'Requires inspection partner network' },
            ].map((r, idx) => (
              <div key={idx} className="p-4 bg-[#12161B] rounded border border-[#222933] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#E9EEF4]">{r.title}</span>
                  <span className="text-[9px] font-mono bg-[#222933] px-1.5 py-0.2 rounded text-[#9AA6B4]">
                    FUTURE
                  </span>
                </div>
                <p className="text-[11px] text-[#667486] italic">{r.req}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. CLOSING CTA */}
      <section className="py-24 px-6 lg:px-12 text-center bg-[#0D1116]">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif text-[#E9EEF4] leading-snug">
            "A project can be 90% complete and still depend on one promise that has never been proven."
          </h2>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/demo')}
              className="bg-[#3A6FD8] hover:bg-[#4C82EC] text-white font-medium px-8 py-3.5 rounded text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Open the Demo Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="bg-[#12161B] hover:bg-[#1A1F26] border border-[#222933] text-[#E9EEF4] font-medium px-6 py-3.5 rounded text-sm transition-colors cursor-pointer"
            >
              Request a Briefing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
