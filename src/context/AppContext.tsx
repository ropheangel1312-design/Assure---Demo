import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  SEED_COMMITMENTS,
  SEED_COUNTERPARTIES,
  SEED_EVENTS,
  SEED_EVIDENCE,
  SEED_GATES,
  SEED_POLICIES,
  SEED_PROJECT,
  SEED_TASKS,
} from '../data/seedData';
import {
  evaluateCommitment,
  ASSURANCE_STATE_NAMES,
} from '../engine/evaluation';
import {
  AssuranceEvaluation,
  CapitalGate,
  Commitment,
  Counterparty,
  EventRecord,
  Evidence,
  EvidenceTask,
  Policy,
  Project,
  UserRole,
} from '../types';

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  undoAction?: () => void;
}

interface AppContextType {
  project: Project;
  commitments: Commitment[];
  evidence: Evidence[];
  policies: Policy[];
  gates: CapitalGate[];
  tasks: EvidenceTask[];
  counterparties: Counterparty[];
  events: EventRecord[];
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  simulatedDaysForward: number;

  // Drawers & Modals
  selectedCommitmentId: string | null;
  setSelectedCommitmentId: (id: string | null) => void;
  selectedEvidenceId: string | null;
  setSelectedEvidenceId: (id: string | null) => void;
  whyThisStateCommitmentId: string | null;
  setWhyThisStateCommitmentId: (id: string | null) => void;
  certificateCommitmentId: string | null;
  setCertificateCommitmentId: (id: string | null) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  // Actions
  evaluateOneCommitment: (comId: string) => AssuranceEvaluation | null;
  submitDemoEvidence: (taskId: string, optionId: string) => void;
  simulateForward30Days: () => void;
  resetDemo: () => void;
  recordGateDecision: (
    gateId: string,
    decision: 'Proceed' | 'Do not proceed' | 'Defer',
    writtenRationale: string
  ) => void;
  confirmExtractedCommitment: (comId: string) => void;
  createEvidenceTask: (
    commitmentId: string,
    title: string,
    missingEvidence: string,
    dueDate: string,
    responsiblePartyName: string
  ) => void;

  // Notifications
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'assure_demo_data_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [project, setProject] = useState<Project>(SEED_PROJECT);
  const [commitments, setCommitments] = useState<Commitment[]>(SEED_COMMITMENTS);
  const [evidence, setEvidence] = useState<Evidence[]>(SEED_EVIDENCE);
  const [policies] = useState<Policy[]>(SEED_POLICIES);
  const [gates, setGates] = useState<CapitalGate[]>(SEED_GATES);
  const [tasks, setTasks] = useState<EvidenceTask[]>(SEED_TASKS);
  const [counterparties, setCounterparties] = useState<Counterparty[]>(SEED_COUNTERPARTIES);
  const [events, setEvents] = useState<EventRecord[]>(SEED_EVENTS);
  const [currentRole, setRole] = useState<UserRole>('Project Owner');
  const [simulatedDaysForward, setSimulatedDaysForward] = useState<number>(0);

  // Modals / Drawers
  const [selectedCommitmentId, setSelectedCommitmentId] = useState<string | null>(null);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(null);
  const [whyThisStateCommitmentId, setWhyThisStateCommitmentId] = useState<string | null>(null);
  const [certificateCommitmentId, setCertificateCommitmentId] = useState<string | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 6000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Keyboard shortcut for command palette (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setWhyThisStateCommitmentId(null);
        setSelectedEvidenceId(null);
        setCertificateCommitmentId(null);
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const evaluateOneCommitment = (comId: string): AssuranceEvaluation | null => {
    const com = commitments.find((c) => c.id === comId);
    if (!com) return null;
    const policy = policies.find((p) => p.id === com.policyId);
    return evaluateCommitment(com, evidence, policy, simulatedDaysForward);
  };

  // Submit Demo Evidence and close the real loop
  const submitDemoEvidence = (taskId: string, optionId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    let newEvidenceItem: Evidence;
    let toastMsg = '';

    if (task.commitmentId === 'COM-48291') {
      // Transformer production / factory inspection resolution
      newEvidenceItem = {
        id: `EVD-NEW-${Date.now().toString().slice(-4)}`,
        title: 'Bureau Veritas Factory Witness & Production Slot Certificate #BV-EXP-48291',
        evidenceType: 'Third-party',
        sourceName: 'Bureau Veritas Quality Portal Sealed Report',
        issuerOrgId: 'CP-INSPECTOR-BV',
        issuerOrgName: 'Bureau Veritas Industrial Inspection Labs',
        issuerRole: 'Inspector',
        originClass: 'Third-party',
        independenceClass: 'Independent',
        authorityLevel: 'Third-Party Inspector',
        createdAt: new Date().toISOString(),
        observedAt: new Date().toISOString(),
        validUntil: '2027-10-15T00:00:00Z',
        lastChecked: new Date().toISOString(),
        freshnessState: 'Current',
        freshnessDaysRemaining: 420,
        contentHash: 'sha256:8819abef9034ecb99112',
        fileType: 'PDF',
        whatItEstablishes:
          'Independent witness certifies 220kV Transformer core winding completed; factory dispatch rescheduled to dedicated air-cushion road transporter arriving 10 Oct 2028 (superseding ocean transit delay).',
        sourceSnippet:
          'BV Inspector confirms core assembly passed dielectric tests. Freight converted to Overland Air-Suspension Multi-Axle Convoy with guaranteed site arrival on or before 10-Oct-2028.',
        linkedCommitmentIds: ['COM-48291'],
        relationships: [],
        isSimulated: true,
      };
      toastMsg = 'Transformer: DOCUMENTED → CORROBORATED. Capital Gate 4 condition updated.';
    } else if (task.commitmentId === 'COM-33020') {
      // Water permit amended CTE
      newEvidenceItem = {
        id: `EVD-NEW-${Date.now().toString().slice(-4)}`,
        title: 'State Pollution Control Board Amended CTE Clearance #CTE-AMD-2026-440',
        evidenceType: 'Regulatory',
        sourceName: 'MPCB Gazetted Revision Order',
        issuerOrgId: 'CP-REG-POLLUTION',
        issuerOrgName: 'State Pollution Control Board (MPCB)',
        issuerRole: 'Regulator',
        originClass: 'Regulator-origin',
        independenceClass: 'Independent',
        authorityLevel: 'Regulatory',
        createdAt: new Date().toISOString(),
        observedAt: new Date().toISOString(),
        validUntil: '2028-10-01T00:00:00Z',
        lastChecked: new Date().toISOString(),
        freshnessState: 'Current',
        freshnessDaysRemaining: 770,
        contentHash: 'sha256:44810abfe77084931aab',
        fileType: 'PDF',
        whatItEstablishes:
          'MPCB officially amends industrial cooling effluent discharge threshold from 2.8 MLD to 4.2 MLD, resolving the contradiction with municipal intake.',
        sourceSnippet:
          'MPCB Amendment: Permissible daily cooling blowdown discharge enhanced to 4,200 m3/day following installation of tertiary filtration skids.',
        linkedCommitmentIds: ['COM-33020'],
        relationships: [],
        isSimulated: true,
      };
      toastMsg = 'Water Permit: Contradiction resolved. State updated to SUBSTANTIATED.';
    } else {
      newEvidenceItem = {
        id: `EVD-NEW-${Date.now().toString().slice(-4)}`,
        title: `Independent Verification Record for ${task.commitmentTitle}`,
        evidenceType: 'Operational',
        sourceName: 'Signed Engineering Quality Log',
        issuerOrgId: 'CP-INSPECTOR-BV',
        issuerOrgName: 'Bureau Veritas Industrial Inspection Labs',
        issuerRole: 'Inspector',
        originClass: 'Third-party',
        independenceClass: 'Independent',
        authorityLevel: 'Third-Party Inspector',
        createdAt: new Date().toISOString(),
        observedAt: new Date().toISOString(),
        validUntil: '2027-12-31T00:00:00Z',
        lastChecked: new Date().toISOString(),
        freshnessState: 'Current',
        freshnessDaysRemaining: 500,
        contentHash: 'sha256:11984aef001928374abb',
        fileType: 'PDF',
        whatItEstablishes: task.missingEvidenceRequired,
        sourceSnippet: `Verification test executed successfully by independent inspector. Requirement [${task.title}] satisfied.`,
        linkedCommitmentIds: [task.commitmentId],
        relationships: [],
        isSimulated: true,
      };
      toastMsg = `Evidence submitted for ${task.commitmentTitle}. Assurance re-evaluated.`;
    }

    const updatedEvidence = [newEvidenceItem, ...evidence];
    setEvidence(updatedEvidence);

    // Update the task to Resolved
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, status: 'Resolved' as const, updatedAt: new Date().toISOString() } : t
    );
    setTasks(updatedTasks);

    // Re-evaluate the affected commitment
    const targetCom = commitments.find((c) => c.id === task.commitmentId);
    if (targetCom) {
      const policy = policies.find((p) => p.id === targetCom.policyId);
      const evalResult = evaluateCommitment(targetCom, updatedEvidence, policy, simulatedDaysForward);

      const oldState = targetCom.currentState;
      const newState = evalResult.calculatedState;

      const updatedCommitments = commitments.map((c) => {
        if (c.id === task.commitmentId) {
          return {
            ...c,
            currentState: evalResult.calculatedState,
            currentStateName: evalResult.calculatedStateName,
            conditionFlags: evalResult.conditionFlags,
            evidenceCount: evalResult.totalEvidenceCount,
            independentEvidencePathCount: evalResult.independentPathCount,
            lastEvaluated: evalResult.evaluatedAt,
          };
        }
        return c;
      });
      setCommitments(updatedCommitments);

      // Update Capital Gate conditions
      const updatedGates = gates.map((gate) => {
        const updatedConditions = gate.conditions.map((cond) => {
          if (cond.commitmentId === task.commitmentId) {
            const isMet = evalResult.calculatedState >= cond.requiredState && evalResult.conditionFlags.length === 0;
            return {
              ...cond,
              currentState: evalResult.calculatedState,
              conditionFlags: evalResult.conditionFlags,
              isMet,
              shortfallReason: isMet ? undefined : 'Evidence requirements partially outstanding.',
            };
          }
          return cond;
        });

        const unmetCount = updatedConditions.filter((c) => !c.isMet).length;
        let newGateStatus = gate.status;
        if (unmetCount === 0) {
          newGateStatus = 'EVIDENCE CONDITIONS MET';
        } else {
          newGateStatus = 'EVIDENCE CONDITIONS NOT MET';
        }

        return {
          ...gate,
          conditions: updatedConditions,
          status: newGateStatus,
        };
      });
      setGates(updatedGates);

      // Append Timeline Event
      const newEvent: EventRecord = {
        id: `EVT-REC-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toISOString(),
        displayDate: 'Today (Simulated)',
        eventType: 'TASK_COMPLETED',
        commitmentId: task.commitmentId,
        commitmentTitle: targetCom.title,
        evidenceId: newEvidenceItem.id,
        taskId: task.id,
        previousState: oldState,
        newState: newState,
        summary: `Evidence submitted for ${targetCom.title}`,
        detail: `Ingested [${newEvidenceItem.id}] (${newEvidenceItem.title}). State shifted from [${oldState}] ${ASSURANCE_STATE_NAMES[oldState]} to [${newState}] ${ASSURANCE_STATE_NAMES[newState]}.`,
        actor: 'Project / Assurance Analyst (Demo Action)',
      };
      setEvents([newEvent, ...events]);

      addToast({
        title: 'Evidence Processed & Evaluated',
        message: toastMsg,
        type: 'success',
      });
    }
  };

  // Simulate 30 days forward
  const simulateForward30Days = () => {
    const newDays = simulatedDaysForward + 30;
    setSimulatedDaysForward(newDays);

    // Degrade evidence freshness
    const updatedEvidence = evidence.map((ev) => {
      const daysLeft = ev.freshnessDaysRemaining - 30;
      let newFreshness = ev.freshnessState;
      if (daysLeft <= 0) {
        newFreshness = 'Stale' as const;
      } else if (daysLeft <= 30) {
        newFreshness = 'Ageing' as const;
      }
      return {
        ...ev,
        freshnessDaysRemaining: daysLeft,
        freshnessState: newFreshness,
      };
    });
    setEvidence(updatedEvidence);

    // Re-evaluate commitments
    const updatedCommitments = commitments.map((com) => {
      const policy = policies.find((p) => p.id === com.policyId);
      const evalRes = evaluateCommitment(com, updatedEvidence, policy, newDays);
      return {
        ...com,
        currentState: evalRes.calculatedState,
        currentStateName: evalRes.calculatedStateName,
        conditionFlags: evalRes.conditionFlags,
        lastEvaluated: new Date().toISOString(),
      };
    });
    setCommitments(updatedCommitments);

    // Log timeline event
    const newEvent: EventRecord = {
      id: `EVT-SIM-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      displayDate: `+${newDays} Days Simulated`,
      eventType: 'EVIDENCE_STALE',
      summary: 'Simulated 30 days forward in project timeline',
      detail:
        'Supporting documentary evidence validity windows recalculated. 1 commitment became STALE. Capital Gate conditions updated.',
      actor: 'Timeline Engine',
    };
    setEvents([newEvent, ...events]);

    addToast({
      title: 'Timeline Advanced 30 Days',
      message: 'Simulated 30 days forward. Supporting evidence aged; affected gate conditions recalculated.',
      type: 'warning',
    });
  };

  // Record a human gate decision
  const recordGateDecision = (
    gateId: string,
    decision: 'Proceed' | 'Do not proceed' | 'Defer',
    writtenRationale: string
  ) => {
    const targetGate = gates.find((g) => g.id === gateId);
    if (!targetGate) return;

    const metCount = targetGate.conditions.filter((c) => c.isMet).length;
    const totalCount = targetGate.conditions.length;

    const newDecisionEntry = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      gateId,
      decision,
      recordedBy: `${currentRole} (User)`,
      reviewerRole: currentRole,
      recordedAt: new Date().toISOString(),
      writtenRationale,
      conditionsSnapshot: {
        totalConditions: totalCount,
        metConditions: metCount,
        unmetConditions: totalCount - metCount,
      },
      policyVersion: targetGate.policyVersion,
    };

    const updatedGates = gates.map((g) => {
      if (g.id === gateId) {
        return {
          ...g,
          decisionLog: [newDecisionEntry, ...(g.decisionLog || [])],
        };
      }
      return g;
    });
    setGates(updatedGates);

    // Add to timeline
    const newEvent: EventRecord = {
      id: `EVT-GATE-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      displayDate: 'Today (Simulated)',
      eventType: 'GATE_DECISION',
      gateId,
      gateName: targetGate.name,
      summary: `${targetGate.name}: Recorded decision "${decision}"`,
      detail: `Decision recorded by ${currentRole}. Rationale: "${writtenRationale}"`,
      actor: `${currentRole} (User)`,
    };
    setEvents([newEvent, ...events]);

    addToast({
      title: 'Gate Decision Recorded',
      message: `Human decision [${decision}] recorded for ${targetGate.name} with rationale audit trail.`,
      type: 'info',
    });
  };

  const confirmExtractedCommitment = (comId: string) => {
    setCommitments((prev) =>
      prev.map((c) => (c.id === comId ? { ...c, reviewStatus: 'human-confirmed' as const } : c))
    );
    addToast({
      title: 'Commitment Confirmed',
      message: `Commitment ${comId} confirmed by human reviewer and committed to ledger.`,
      type: 'success',
    });
  };

  const createEvidenceTask = (
    commitmentId: string,
    title: string,
    missingEvidence: string,
    dueDate: string,
    responsiblePartyName: string
  ) => {
    const com = commitments.find((c) => c.id === commitmentId);
    const newTask: EvidenceTask = {
      id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
      commitmentId,
      commitmentTitle: com?.title || commitmentId,
      currentState: com?.currentState || 2,
      requiredState: com?.requiredState || 3,
      title,
      missingEvidenceRequired: missingEvidence,
      acceptableEvidenceTypes: ['Documentary', 'Operational', 'Third-party'],
      responsiblePartyId: 'CP-EPC-GLOBAL',
      responsiblePartyName,
      requesterName: `${currentRole} (User)`,
      dueDate,
      reason: `Required to close evidence gap for ${com?.title || commitmentId}.`,
      affectedCapitalGateId: com?.applicableGateId || 'GATE-4',
      affectedCapitalGateName: 'Gate 4 — Grid Energisation Readiness',
      affectedMilestone: com?.dependentMilestones[0] || 'Milestone',
      financialExposure: com?.financialExposure || '₹50 crore',
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks([newTask, ...tasks]);
    addToast({
      title: 'Evidence Task Created',
      message: `Task ${newTask.id} assigned to ${responsiblePartyName}.`,
      type: 'info',
    });
  };

  const resetDemo = () => {
    setProject(SEED_PROJECT);
    setCommitments(SEED_COMMITMENTS);
    setEvidence(SEED_EVIDENCE);
    setGates(SEED_GATES);
    setTasks(SEED_TASKS);
    setCounterparties(SEED_COUNTERPARTIES);
    setEvents(SEED_EVENTS);
    setSimulatedDaysForward(0);
    setRole('Project Owner');
    addToast({
      title: 'Demo State Reset',
      message: 'All commitments, evidence items, tasks and gates restored to initial baseline.',
      type: 'info',
    });
  };

  return (
    <AppContext.Provider
      value={{
        project,
        commitments,
        evidence,
        policies,
        gates,
        tasks,
        counterparties,
        events,
        currentRole,
        setRole,
        simulatedDaysForward,
        selectedCommitmentId,
        setSelectedCommitmentId,
        selectedEvidenceId,
        setSelectedEvidenceId,
        whyThisStateCommitmentId,
        setWhyThisStateCommitmentId,
        certificateCommitmentId,
        setCertificateCommitmentId,
        commandPaletteOpen,
        setCommandPaletteOpen,
        evaluateOneCommitment,
        submitDemoEvidence,
        simulateForward30Days,
        resetDemo,
        recordGateDecision,
        confirmExtractedCommitment,
        createEvidenceTask,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
