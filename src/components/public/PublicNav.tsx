import React from 'react';
import { AssureLogo } from '../common/AssureLogo';
import { ArrowRight } from 'lucide-react';

interface PublicNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const PublicNav: React.FC<PublicNavProps> = ({ currentPath, onNavigate }) => {
  const links = [
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Product', path: '/product' },
    { label: 'Why ASSURE', path: '/why-assure' },
    { label: 'Roadmap', path: '/roadmap' },
    { label: 'About', path: '/about' },
    { label: 'Docs', path: '/docs' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-[#262626] px-6 lg:px-12 h-16 flex items-center justify-between">
      {/* Brand logo with connecting-line visual signature */}
      <div
        onClick={() => onNavigate('/')}
        className="cursor-pointer group"
      >
        <AssureLogo size="sm" subtitleText="INFRASTRUCTURE ASSURANCE" />
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-400">
        {links.map((link) => {
          const isActive = currentPath === link.path;
          return (
            <button
              key={link.path}
              type="button"
              onClick={() => onNavigate(link.path)}
              className={`hover:text-[#EDEDED] transition-colors cursor-pointer ${
                isActive ? 'text-[#EDEDED] font-semibold' : ''
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </nav>

      {/* CTA Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onNavigate('/login')}
          className="text-xs text-neutral-400 hover:text-[#EDEDED] px-3 py-1.5 transition-colors cursor-pointer"
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => onNavigate('/demo')}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/30 cursor-pointer"
        >
          <span>Open Demo Cockpit</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};

export const PublicFooter: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#050505] border-t border-[#262626] py-16 px-6 lg:px-12 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-3">
          <div
            onClick={() => onNavigate('/')}
            className="cursor-pointer group inline-block"
          >
            <AssureLogo size="md" subtitleText="COMMITMENT ASSURANCE SYSTEM" />
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Commitment Assurance Infrastructure for capital-intensive physical assets.
          </p>
          <div className="text-[11px] font-mono text-neutral-500">
            "Prove the promise before the capital follows."
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase text-[#E9EEF4] tracking-wider mb-2">
            Product
          </div>
          <ul className="space-y-1.5">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/demo')}
                className="hover:text-[#E9EEF4] transition-colors cursor-pointer"
              >
                Interactive Demo
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/how-it-works')}
                className="hover:text-[#E9EEF4] transition-colors cursor-pointer"
              >
                How It Works
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/product')}
                className="hover:text-[#E9EEF4] transition-colors cursor-pointer"
              >
                Specification & Architecture
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/roadmap')}
                className="hover:text-[#E9EEF4] transition-colors cursor-pointer"
              >
                Roadmap (Future)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/docs')}
                className="hover:text-[#E9EEF4] transition-colors cursor-pointer"
              >
                Assurance Lexicon
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase text-[#E9EEF4] tracking-wider mb-2">
            Company & Governance
          </div>
          <ul className="space-y-1.5">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/why-assure')}
                className="hover:text-[#E9EEF4] transition-colors cursor-pointer"
              >
                Why ASSURE (Differentiation)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/about')}
                className="hover:text-[#E9EEF4] transition-colors cursor-pointer"
              >
                About the Platform
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="hover:text-[#E9EEF4] transition-colors cursor-pointer"
              >
                Request a Briefing
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase text-[#E9EEF4] tracking-wider mb-2">
            Institutional Notices
          </div>
          <ul className="space-y-1.5">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('/legal/disclaimer')}
                className="hover:text-[#E9EEF4] transition-colors cursor-pointer"
              >
                Legal & Audit Disclaimer
              </button>
            </li>
            <li>
              <span className="text-[#667486]">Privacy & Data Policy</span>
            </li>
            <li>
              <span className="text-[#667486]">Terms of Governance</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#222933] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#667486]">
        <p>
          ASSURE is not a lender, auditor, regulator or legal adjudicator. Demo data is synthetic and illustrative.
        </p>
        <p className="font-mono">© {new Date().getFullYear()} ASSURE Infrastructure Technologies.</p>
      </div>
    </footer>
  );
};
