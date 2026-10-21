import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppHeader } from './components/common/AppHeader';
import { AppSidebar } from './components/common/AppSidebar';
import { WhyThisStateDrawer } from './components/common/WhyThisStateDrawer';
import { EvidenceDetailDrawer } from './components/common/EvidenceDetailDrawer';
import { AssuranceCertificateModal } from './components/common/AssuranceCertificateModal';
import { CommandPalette } from './components/common/CommandPalette';
import { ToastContainer } from './components/common/ToastContainer';

// Public pages
import { PublicNav, PublicFooter } from './components/public/PublicNav';
import { LandingPage } from './components/public/LandingPage';
import {
  AboutPage,
  ContactPage,
  DemoEntryPage,
  DisclaimerPage,
  HowItWorksPage,
  LoginPage,
  ProductPage,
  RoadmapPage,
  WhyAssurePage,
} from './components/public/OtherPublicPages';

// App views
import { ProjectSelector } from './components/app/ProjectSelector';
import { ProjectOverview } from './components/app/ProjectOverview';
import { CommitmentRegistry } from './components/app/CommitmentRegistry';
import { CommitmentDetail } from './components/app/CommitmentDetail';
import {
  EvidenceLibrary,
  IngestPackageView,
  ReviewQueueView,
} from './components/app/EvidenceViews';
import { EvidenceGraphView } from './components/app/EvidenceGraphView';
import { ImpactGraphView } from './components/app/ImpactGraphView';
import {
  AssurancePoliciesView,
  EvidenceTasksView,
} from './components/app/PolicyAndTasksViews';
import { CapitalGatesView } from './components/app/CapitalGatesView';
import {
  CounterpartiesView,
  DocsLexiconView,
  SettingsView,
  TimelineHistoryView,
} from './components/app/TimelineAndGovernanceViews';

const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const { setCommandPaletteOpen } = useApp();

  // Handle URL hash / path routing and browser history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      setCurrentPath(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial read
    if (window.location.hash) {
      setCurrentPath(window.location.hash.replace('#', ''));
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCommandPaletteOpen]);

  // Determine if public or in-app route
  const isPublicRoute =
    currentPath === '/' ||
    currentPath === '/how-it-works' ||
    currentPath === '/product' ||
    currentPath === '/why-assure' ||
    currentPath === '/roadmap' ||
    currentPath === '/about' ||
    currentPath === '/contact' ||
    currentPath === '/legal/disclaimer' ||
    currentPath === '/login' ||
    currentPath === '/demo';

  // Render public views
  if (isPublicRoute) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0A0C0F] text-[#E9EEF4]">
        <PublicNav currentPath={currentPath} onNavigate={navigate} />

        <main className="flex-1">
          {currentPath === '/' && <LandingPage onNavigate={navigate} />}
          {currentPath === '/how-it-works' && <HowItWorksPage onNavigate={navigate} />}
          {currentPath === '/product' && <ProductPage onNavigate={navigate} />}
          {currentPath === '/why-assure' && <WhyAssurePage onNavigate={navigate} />}
          {currentPath === '/roadmap' && <RoadmapPage onNavigate={navigate} />}
          {currentPath === '/about' && <AboutPage />}
          {currentPath === '/contact' && <ContactPage />}
          {currentPath === '/legal/disclaimer' && <DisclaimerPage />}
          {currentPath === '/login' && <LoginPage onNavigate={navigate} />}
          {currentPath === '/demo' && <DemoEntryPage onNavigate={navigate} />}
        </main>

        <PublicFooter onNavigate={navigate} />

        <CommandPalette onNavigate={navigate} />
        <ToastContainer />
      </div>
    );
  }

  // Helper to extract commitment ID from /commitments/COM-XXXXX
  const commitmentIdMatch = currentPath.match(/^\/commitments\/(COM-[0-9A-Z]+)$/);
  const gateIdMatch = currentPath.match(/^\/gates\/(GATE-[0-9]+)$/);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0C0F] text-[#E9EEF4]">
      {/* Sidebar */}
      <AppSidebar currentPath={currentPath} onNavigate={navigate} />

      {/* Main App Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AppHeader currentPath={currentPath} onNavigate={navigate} />

        <main className="flex-1 overflow-y-auto bg-[#0A0C0F]">
          {currentPath === '/app' && <ProjectSelector onNavigate={navigate} />}
          {(currentPath === '/overview' || currentPath.startsWith('/app/p/')) && (
            <ProjectOverview onNavigate={navigate} />
          )}
          {currentPath === '/commitments' && <CommitmentRegistry onNavigate={navigate} />}
          {commitmentIdMatch && (
            <CommitmentDetail
              commitmentId={commitmentIdMatch[1]}
              onNavigate={navigate}
            />
          )}
          {currentPath === '/evidence' && <EvidenceLibrary onNavigate={navigate} />}
          {currentPath === '/ingest' && <IngestPackageView onNavigate={navigate} />}
          {currentPath === '/review' && <ReviewQueueView onNavigate={navigate} />}
          {currentPath === '/graph/evidence' && <EvidenceGraphView onNavigate={navigate} />}
          {currentPath === '/graph/impact' && <ImpactGraphView onNavigate={navigate} />}
          {currentPath === '/policies' && <AssurancePoliciesView onNavigate={navigate} />}
          {currentPath === '/tasks' && <EvidenceTasksView onNavigate={navigate} />}
          {(currentPath === '/gates' || gateIdMatch) && (
            <CapitalGatesView
              gateId={gateIdMatch ? gateIdMatch[1] : undefined}
              onNavigate={navigate}
            />
          )}
          {currentPath === '/timeline' && <TimelineHistoryView onNavigate={navigate} />}
          {currentPath === '/counterparties' && <CounterpartiesView onNavigate={navigate} />}
          {currentPath.startsWith('/app/settings') && <SettingsView />}
          {currentPath === '/docs' && <DocsLexiconView />}
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <WhyThisStateDrawer />
      <EvidenceDetailDrawer />
      <AssuranceCertificateModal />
      <CommandPalette onNavigate={navigate} />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
