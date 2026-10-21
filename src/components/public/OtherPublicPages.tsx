import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Database,
  ExternalLink,
  FileCheck,
  FileSearch,
  FileText,
  GitBranch,
  GitFork,
  HelpCircle,
  Layers,
  Lock,
  Network,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from 'lucide-react';
import { UserRole } from '../../types';

// ================= HOW IT WORKS PAGE =================
export const HowItWorksPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="py-16 px-6 lg:px-12 max-w-5xl mx-auto space-y-16">
      <div className="space-y-4">
        <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
          Architecture & Methodology
        </span>
        <h1 className="text-4xl font-serif text-[#E9EEF4]">How ASSURE Works</h1>
        <p className="text-sm sm:text-base text-[#9AA6B4] leading-relaxed">
          From unstructured engineering packages to continuously auditable capital assurance.
        </p>
      </div>

      {/* 5 Stages Breakdown */}
      <div className="space-y-12">
        {[
          {
            num: '01',
            title: 'Project Evidence Ingestion & Parsing',
            body: 'Ingests schedule exports (Primavera P6, MS Project), contracts, SAP Ariba POs, vendor commitment letters, utility sanctions, statutory permits and logistics manifests.',
            sub: 'AI extracts proposed critical commitments while preserving contractual qualifiers verbatim (e.g. "subject to final factory acceptance testing").',
          },
          {
            num: '02',
            title: 'Human Review & Ledger Registration',
            body: 'A project engineer or assurance analyst confirms, edits, or rejects each extracted commitment. Nothing enters the official registry without explicit human review.',
            sub: 'Every commitment is stamped with responsible counterparty, deadline, financial exposure and governing assurance policy.',
          },
          {
            num: '03',
            title: 'Provenance & Independence Analysis',
            body: 'Detects true origin classes (Regulator, Counterparty, Same-origin, Third-party). If four reports all restate a single upstream schedule assertion, ASSURE collapses them into one single evidence path.',
            sub: 'Counts independent evidence paths, never bare document volumes.',
          },
          {
            num: '04',
            title: 'Deterministic Policy Evaluation',
            body: 'Applies the specific policy protecting the upcoming capital decision (e.g. Equipment Delivery Policy v1.4, Grid Interconnection Policy v2.1).',
            sub: 'Calculates the exact ladder state (0 to 8) and orthogonal condition flags (STALE, CONTRADICTORY, EXPIRED, DISPUTED).',
          },
          {
            num: '05',
            title: 'Evidence Gap Closing & Capital Gate Governance',
            body: 'Unmet conditions automatically generate owned, dated Evidence Tasks with assigned counterparties.',
            sub: 'When new evidence is submitted, assurance re-evaluates in real-time, updating capital gate readiness.',
          },
        ].map((s) => (
          <div
            key={s.num}
            className="p-8 bg-[#12161B] rounded-lg border border-[#222933] space-y-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
          >
            <div className="md:col-span-2 font-mono text-3xl font-bold text-[#3A6FD8]">
              {s.num}
            </div>
            <div className="md:col-span-10 space-y-2">
              <h2 className="text-xl font-semibold text-[#E9EEF4]">{s.title}</h2>
              <p className="text-sm text-[#9AA6B4] leading-relaxed">{s.body}</p>
              <p className="text-xs text-[#667486] italic">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 text-center">
        <button
          type="button"
          onClick={() => onNavigate('/demo')}
          className="bg-[#3A6FD8] hover:bg-[#4C82EC] text-white px-6 py-3 rounded text-sm font-medium transition-colors cursor-pointer"
        >
          Explore the Live Demo Project
        </button>
      </div>
    </div>
  );
};

// ================= PRODUCT ARCHITECTURE PAGE =================
export const ProductPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="py-16 px-6 lg:px-12 max-w-5xl mx-auto space-y-16">
      <div className="space-y-4">
        <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
          Enterprise Specification
        </span>
        <h1 className="text-4xl font-serif text-[#E9EEF4]">Product Architecture</h1>
        <p className="text-sm sm:text-base text-[#9AA6B4] leading-relaxed">
          Dense, typed client-side data model with deterministic evaluation engine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#12161B] p-6 rounded border border-[#222933] space-y-3">
          <div className="text-xs font-mono text-[#3A6FD8] uppercase font-bold">
            Commitment Registry
          </div>
          <p className="text-xs text-[#9AA6B4] leading-relaxed">
            The persistent, unified ledger of every external dependency the capital investment depends upon. Filterable by state, flag, gate, counterparty, and financial exposure.
          </p>
        </div>

        <div className="bg-[#12161B] p-6 rounded border border-[#222933] space-y-3">
          <div className="text-xs font-mono text-[#2E9268] uppercase font-bold">
            Evidence Graph
          </div>
          <p className="text-xs text-[#9AA6B4] leading-relaxed">
            Interactive node-link graph answering "Why is this only DOCUMENTED?" Displays source orgs, corroborations, contradictions, and ghosted missing evidence nodes.
          </p>
        </div>

        <div className="bg-[#12161B] p-6 rounded border border-[#222933] space-y-3">
          <div className="text-xs font-mono text-[#C8922F] uppercase font-bold">
            Impact Graph
          </div>
          <p className="text-xs text-[#9AA6B4] leading-relaxed">
            Left-to-right flow tracing a weak commitment through dependent milestones to project COD and capital exposure (e.g. ₹50 crore at Gate 4).
          </p>
        </div>

        <div className="bg-[#12161B] p-6 rounded border border-[#222933] space-y-3">
          <div className="text-xs font-mono text-[#C4483F] uppercase font-bold">
            Assurance Policy Engine
          </div>
          <p className="text-xs text-[#9AA6B4] leading-relaxed">
            Requirement-by-requirement evaluation matrix evaluating ladder states, dual-origin rules, freshness windows, and zero-contradiction constraints.
          </p>
        </div>
      </div>
    </div>
  );
};

// ================= WHY ASSURE (DIFFERENTIATION) PAGE =================
export const WhyAssurePage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="py-16 px-6 lg:px-12 max-w-5xl mx-auto space-y-16">
      <div className="space-y-4">
        <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
          Categorical Framing
        </span>
        <h1 className="text-4xl font-serif text-[#E9EEF4]">Why ASSURE</h1>
        <p className="text-sm sm:text-base text-[#9AA6B4] leading-relaxed">
          How ASSURE differs from schedulers, ERPs, reality-capture tools, and generic risk dashboards.
        </p>
      </div>

      <div className="bg-[#12161B] border border-[#222933] rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#E9EEF4]">The Difference in Primary Object</h2>
        <p className="text-xs text-[#9AA6B4] leading-relaxed">
          Scheduling platforms are centred on the project plan. ERP and procurement systems are centred on the transaction. Reality-capture systems are centred on the physical observation. Readiness platforms are centred on the project or site assessment. Event standards are centred on the physical event.
        </p>
        <p className="text-xs font-semibold text-[#E9EEF4]">
          ASSURE is centred on the critical commitment — and governs the auditable evidence state of that commitment itself.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[#E9EEF4]">What ASSURE is NOT</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#9AA6B4]">
          <li className="p-4 bg-[#0D1116] rounded border border-[#222933]">
            <strong className="text-[#E9EEF4] block mb-1">Not a scheduler or P6 replacement</strong>
            ASSURE consumes schedule outputs; it does not sequence activities.
          </li>
          <li className="p-4 bg-[#0D1116] rounded border border-[#222933]">
            <strong className="text-[#E9EEF4] block mb-1">Not an ERP or procurement tool</strong>
            ASSURE checks whether vendor commitments are backed by evidence; it does not issue purchase orders.
          </li>
          <li className="p-4 bg-[#0D1116] rounded border border-[#222933]">
            <strong className="text-[#E9EEF4] block mb-1">Not a generic AI document reader</strong>
            Deterministic rules govern states, independence, freshness, and gate conditions.
          </li>
          <li className="p-4 bg-[#0D1116] rounded border border-[#222933]">
            <strong className="text-[#E9EEF4] block mb-1">Not an autonomous capital approval system</strong>
            ASSURE evaluates evidence conditions; humans record capital release decisions.
          </li>
        </ul>
      </div>
    </div>
  );
};

// ================= ROADMAP (FUTURE) PAGE =================
export const RoadmapPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const items = [
    {
      title: 'Continuous Assurance',
      desc: 'Automated revalidation as evidence ages and external utility / regulatory records update in real time.',
      req: 'Requires direct external source connectors and utility APIs.',
      status: 'FUTURE',
    },
    {
      title: 'Capital Assurance Across Gate Sequences',
      desc: 'Evidence conditions embedded across multi-stage drawdown schedules and milestone tranches.',
      req: 'Requires customer treasury / capital workflows integration.',
      status: 'FUTURE',
    },
    {
      title: 'Transferable Assurance Record',
      desc: 'The portable form of an assurance result consumed by downstream syndication lenders, rating agencies, or acquirers.',
      req: 'Requires multi-party policy governance standards.',
      status: 'FUTURE',
    },
    {
      title: 'Counterparty Assurance Intelligence',
      desc: 'Benchmarking which counterparties have historically materialised commitments on time.',
      req: 'Requires accumulated outcome history across multi-year asset lifecycles.',
      status: 'FUTURE',
    },
    {
      title: 'Evidence-Path Reliability Learning',
      desc: 'Empirical discovery of which combinations of evidence historically preceded successful physical fulfilment.',
      req: 'Requires deep historical project outcome datasets.',
      status: 'FUTURE',
    },
    {
      title: 'Evidence Provider Network',
      desc: 'Marketplace for independent testing laboratories, factory witness inspectors, and surveyor firms to resolve evidence gaps on request.',
      req: 'Requires provider commercial partnerships and digital signing protocol.',
      status: 'FUTURE',
    },
  ];

  return (
    <div className="py-16 px-6 lg:px-12 max-w-5xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
          Strategic Evolution
        </span>
        <h1 className="text-4xl font-serif text-[#E9EEF4]">Product Roadmap</h1>
        <p className="text-sm sm:text-base text-[#9AA6B4] leading-relaxed">
          Every future extension listed with its honest, explicit architectural precondition.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-6 bg-[#12161B] rounded-lg border border-[#222933] space-y-2 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-[#E9EEF4]">{item.title}</h2>
                <span className="text-[10px] font-mono bg-[#222933] text-[#9AA6B4] px-2 py-0.5 rounded font-semibold">
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-[#9AA6B4]">{item.desc}</p>
              <p className="text-[11px] text-[#667486] font-mono italic">
                Precondition: {item.req}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ================= ABOUT & CONTACT PAGES =================
export const AboutPage: React.FC = () => {
  return (
    <div className="py-16 px-6 lg:px-12 max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
          Company Identity
        </span>
        <h1 className="text-4xl font-serif text-[#E9EEF4]">About ASSURE</h1>
        <p className="text-sm sm:text-base text-[#9AA6B4] leading-relaxed">
          ASSURE builds commitment assurance infrastructure for capital-intensive physical developments.
        </p>
      </div>

      <div className="bg-[#12161B] p-6 rounded border border-[#222933] space-y-4 text-xs text-[#9AA6B4] leading-relaxed">
        <p>
          Physical infrastructure projects — hyperscale data centres, power plants, manufacturing complexes — are among the largest financial undertakings in the world. Yet multi-billion dollar capital releases routinely move on the strength of unverified promises.
        </p>
        <p>
          ASSURE provides the missing governance layer: connecting each physical promise to auditable evidence, tracing its provenance, evaluating its freshness, and verifying policy compliance before capital follows.
        </p>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="py-16 px-6 lg:px-12 max-w-3xl mx-auto space-y-8">
      <div className="space-y-4 text-center">
        <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
          Enterprise Inquiries
        </span>
        <h1 className="text-4xl font-serif text-[#E9EEF4]">Request a Briefing</h1>
        <p className="text-sm text-[#9AA6B4]">
          For project developers, capital review committees, infrastructure funds and lenders.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 bg-[#12161B] border border-[#2E9268]/40 rounded-lg text-center space-y-3">
          <CheckCircle2 className="w-8 h-8 text-[#2E9268] mx-auto" />
          <h2 className="text-base font-semibold text-[#E9EEF4]">Briefing Request Received</h2>
          <p className="text-xs text-[#9AA6B4]">
            An ASSURE enterprise governance specialist will contact your organisation within 1 business day.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="bg-[#12161B] border border-[#222933] p-8 rounded-lg space-y-4 text-xs"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[#9AA6B4] font-medium">Your Name</label>
              <input
                required
                type="text"
                placeholder="Sarah Jenkins"
                className="w-full bg-[#0A0C0F] border border-[#222933] p-2.5 rounded text-[#E9EEF4] outline-hidden focus:border-[#3A6FD8]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[#9AA6B4] font-medium">Work Email</label>
              <input
                required
                type="email"
                placeholder="s.jenkins@fund.com"
                className="w-full bg-[#0A0C0F] border border-[#222933] p-2.5 rounded text-[#E9EEF4] outline-hidden focus:border-[#3A6FD8]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[#9AA6B4] font-medium">Organisation & Asset Type</label>
            <input
              required
              type="text"
              placeholder="e.g. Hyperscale Data Centre Developer ($1B+ Portfolio)"
              className="w-full bg-[#0A0C0F] border border-[#222933] p-2.5 rounded text-[#E9EEF4] outline-hidden focus:border-[#3A6FD8]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[#9AA6B4] font-medium">Inquiry Scope</label>
            <textarea
              rows={3}
              placeholder="Describe your upcoming capital gate or commitment assurance requirements..."
              className="w-full bg-[#0A0C0F] border border-[#222933] p-2.5 rounded text-[#E9EEF4] outline-hidden focus:border-[#3A6FD8]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3A6FD8] hover:bg-[#4C82EC] text-white p-3 rounded font-medium transition-colors cursor-pointer"
          >
            Submit Request
          </button>
        </form>
      )}
    </div>
  );
};

// ================= LEGAL & AUDIT DISCLAIMER PAGE =================
export const DisclaimerPage: React.FC = () => {
  return (
    <div className="py-16 px-6 lg:px-12 max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <span className="text-xs font-mono text-[#3A6FD8] uppercase tracking-wider">
          Statutory & Governance Notices
        </span>
        <h1 className="text-4xl font-serif text-[#E9EEF4]">Legal & Audit Disclaimer</h1>
      </div>

      <div className="bg-[#12161B] p-8 rounded-lg border border-[#222933] space-y-6 text-xs text-[#9AA6B4] leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-[#E9EEF4] uppercase">1. Not a Regulatory Certification</h2>
          <p>
            ASSURE is not a government regulator, licensed testing agency, certified public accountant, or court of law. Assurance evaluations reflect whether available documentary and operational records meet the conditions set forth in user-defined or benchmark assurance policies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-[#E9EEF4] uppercase">2. No Guarantee of Physical Reality</h2>
          <p>
            An assurance state of SUBSTANTIATED indicates that documentary, transactional, or third-party records satisfy the policy standard. It does not constitute a warranty or legal guarantee that external physical conditions will not change.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-[#E9EEF4] uppercase">3. Human Capital Decision Authority</h2>
          <p>
            ASSURE software never approves, releases, or halts capital funds. The platform only computes evidence condition readiness. All funding and milestone decisions remain the exclusive legal responsibility of human decision-makers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-[#E9EEF4] uppercase">4. Synthetic Demo Data Notice</h2>
          <p>
            All figures, counterparties, certificates, and dates inside the public demonstration environment are synthetic and illustrative. No real utility or OEM systems are connected.
          </p>
        </section>
      </div>
    </div>
  );
};

// ================= LOGIN PAGE =================
export const LoginPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('Project Owner');

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-6 bg-[#0A0C0F]">
      <div className="w-full max-w-md bg-[#12161B] border border-[#222933] rounded-lg p-8 space-y-6 shadow-2xl">
        <div className="space-y-2 text-center">
          <div className="w-8 h-8 bg-[#3A6FD8] rounded-xs mx-auto flex items-center justify-center font-mono font-bold text-white text-sm">
            A
          </div>
          <h1 className="text-2xl font-serif text-[#E9EEF4]">Sign In to ASSURE</h1>
          <p className="text-xs text-[#9AA6B4]">
            Commitment Assurance Infrastructure Portal
          </p>
        </div>

        {/* Quick Demo Access Button */}
        <div className="p-4 bg-[#3A6FD8]/10 border border-[#3A6FD8]/30 rounded space-y-3">
          <div className="text-xs font-semibold text-[#E9EEF4]">
            Interactive Demo Access (No password needed)
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-[#9AA6B4] block">Select Governance Persona:</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full bg-[#0A0C0F] border border-[#222933] p-2 rounded text-xs text-[#E9EEF4]"
            >
              <option value="Project Owner">Project Owner (Full Ingest & Edit)</option>
              <option value="Investment / Capital Reviewer">Investment / Capital Reviewer (Gate Authority)</option>
              <option value="Project / Assurance Analyst">Project / Assurance Analyst (Evidence Trace)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/overview')}
            className="w-full bg-[#3A6FD8] hover:bg-[#4C82EC] text-white py-2.5 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Continue to Demo Environment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Enterprise SSO Placeholder */}
        <div className="pt-2 border-t border-[#222933] space-y-3 opacity-60">
          <div className="text-[11px] font-mono text-[#667486] text-center uppercase tracking-wider">
            Corporate Single Sign-On (SSO)
          </div>
          <input
            disabled
            type="email"
            placeholder="name@enterprise.com"
            className="w-full bg-[#0A0C0F] border border-[#222933] p-2.5 rounded text-xs text-[#9AA6B4] cursor-not-allowed"
          />
          <button
            disabled
            type="button"
            className="w-full bg-[#1A1F26] border border-[#222933] text-[#9AA6B4] py-2 rounded text-xs cursor-not-allowed"
          >
            Sign In with Enterprise ID
          </button>
        </div>
      </div>
    </div>
  );
};

// ================= DEMO ENTRY PAGE =================
export const DemoEntryPage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-6 bg-[#0A0C0F]">
      <div className="w-full max-w-2xl bg-[#12161B] border border-[#222933] rounded-lg p-8 space-y-6 shadow-2xl">
        <div className="space-y-2">
          <span className="text-xs font-mono text-[#C8922F] uppercase tracking-wider font-semibold">
            Demonstration Environment Expectations
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#E9EEF4]">
            Entering the Meridian DC Phase 1 Workspace
          </h1>
          <p className="text-xs sm:text-sm text-[#9AA6B4] leading-relaxed">
            This workspace is pre-populated with synthetic capital data for a $1B 100MW data centre project in India with claimed COD 30 Nov 2028.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-[#0D1116] rounded border border-[#222933] space-y-1.5">
            <div className="font-semibold text-[#2E9268] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Working Capabilities
            </div>
            <ul className="text-[#9AA6B4] space-y-1 list-disc list-inside text-[11px]">
              <li>47 critical commitments ledger</li>
              <li>Deterministic policy evaluations</li>
              <li>Interactive Evidence & Impact graphs</li>
              <li>Evidence Tasks & gate updating</li>
              <li>Timeline +30 days forward simulation</li>
            </ul>
          </div>

          <div className="p-4 bg-[#0D1116] rounded border border-[#222933] space-y-1.5">
            <div className="font-semibold text-[#C8922F] flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" /> Synthetic Baseline
            </div>
            <ul className="text-[#9AA6B4] space-y-1 list-disc list-inside text-[11px]">
              <li>No live utility or OEM integrations</li>
              <li>All external records labelled SIMULATED</li>
              <li>Reset Demo available at any time</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#222933]">
          <div className="text-xs text-[#667486]">
            Ready to explore commitment assurance.
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/overview')}
            className="w-full sm:w-auto bg-[#3A6FD8] hover:bg-[#4C82EC] text-white px-6 py-3 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>Enter Demo Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
