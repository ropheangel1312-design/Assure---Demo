import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ASSURANCE_STATE_NAMES } from '../../engine/evaluation';
import { AssureLogo } from './AssureLogo';
import { Check, Copy, Download, FileCode, Shield, X } from 'lucide-react';

export const AssuranceCertificateModal: React.FC = () => {
  const {
    certificateCommitmentId,
    setCertificateCommitmentId,
    commitments,
    policies,
    evaluateOneCommitment,
    addToast,
  } = useApp();

  const [copied, setCopied] = useState(false);

  if (!certificateCommitmentId) return null;

  const commitment = commitments.find((c) => c.id === certificateCommitmentId);
  if (!commitment) return null;

  const policy = policies.find((p) => p.id === commitment.policyId);
  const evalResult = evaluateOneCommitment(commitment.id);

  const certData = {
    assuranceCertificateId: `ASR-9042-${commitment.id.replace('COM-', '')}`,
    issuedAt: new Date().toISOString(),
    validUntil: '2028-11-30T00:00:00Z',
    validityStatus: commitment.currentState >= 4 ? 'Active' : 'Draft / Sub-threshold',
    project: {
      id: commitment.projectId,
      name: 'Meridian Data Centre — Phase 1',
    },
    commitment: {
      id: commitment.id,
      title: commitment.title,
      type: commitment.type,
      requiredOutcome: commitment.requiredOutcome,
      deadline: commitment.deadline,
      counterparty: commitment.counterpartyName,
      criticality: commitment.criticality,
    },
    assuranceEvaluation: {
      evaluatedStateIndex: commitment.currentState,
      evaluatedStateName: ASSURANCE_STATE_NAMES[commitment.currentState],
      requiredStateIndex: commitment.requiredState,
      requiredStateName: ASSURANCE_STATE_NAMES[commitment.requiredState],
      conditionFlags: commitment.conditionFlags,
      totalEvidenceRecords: commitment.evidenceCount,
      independentEvidencePaths: commitment.independentEvidencePathCount,
      activeContradictions: commitment.contradictionCount,
      evidenceFreshnessDays: commitment.freshnessDays,
    },
    governingPolicy: {
      id: policy?.id,
      name: policy?.name,
      version: policy?.version,
      decisionProtected: policy?.decisionProtected,
    },
    auditProof: {
      sha256Proof: 'sha256:8f9a012bb45e1903ca998124faee014a902341ba0928e4',
      evaluationEngineVersion: 'ASSURE-Deterministic-v2.4.0',
    },
    disclaimer:
      'This is not a legal guarantee, warranty or regulatory certification. It is a record of what was assessed, which evidence supported it, under which policy, and when.',
  };

  const jsonString = JSON.stringify(certData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    addToast({
      title: 'Certificate Copied',
      message: 'Machine-readable JSON copied to clipboard.',
      type: 'info',
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AssuranceCertificate-${certData.assuranceCertificateId}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({
      title: 'Certificate Downloaded',
      message: 'Assurance Certificate JSON saved.',
      type: 'success',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="w-full max-w-3xl bg-[#111111] border border-[#262626] rounded-3xl shadow-2xl overflow-hidden flex flex-col text-[#EDEDED] max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#262626] bg-[#161616] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AssureLogo size="sm" variant="mark" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                STRUCTURED ASSURANCE RECORD
              </div>
              <h2 id="cert-modal-title" className="text-base font-bold text-[#EDEDED]">
                Certificate {certData.assuranceCertificateId}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCertificateCommitmentId(null)}
            className="p-2 rounded-xl hover:bg-[#262626] text-neutral-400 hover:text-white transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Key metadata grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-[#1A1A1A] p-4 rounded-2xl border border-[#333333] font-mono">
            <div>
              <span className="text-[10px] text-neutral-400 block mb-0.5">ASSURANCE STATE</span>
              <span className="font-semibold text-indigo-400">
                [{commitment.currentState}] {ASSURANCE_STATE_NAMES[commitment.currentState]}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block mb-0.5">INDEPENDENT PATHS</span>
              <span className="font-semibold text-[#EDEDED]">
                {commitment.independentEvidencePathCount} of {commitment.evidenceCount} records
              </span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block mb-0.5">GOVERNING POLICY</span>
              <span className="font-semibold text-[#EDEDED]">
                {policy?.name} {policy?.version}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block mb-0.5">STATUS</span>
              <span
                className={`font-semibold ${
                  commitment.currentState >= 4 ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {certData.validityStatus}
              </span>
            </div>
          </div>

          {/* Machine Readable JSON Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                Machine-Readable Assurance Payload (JSON)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#262626] border border-[#333333] rounded-xl text-xs text-[#EDEDED] flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-indigo-600/30"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            <pre className="bg-[#0A0A0A] border border-[#262626] p-4 rounded-2xl text-[11px] font-mono text-neutral-300 overflow-x-auto max-h-72 leading-relaxed">
              <code>{jsonString}</code>
            </pre>
          </div>

          {/* Mandatory Institutional Disclaimer */}
          <div className="p-4 bg-[#1A1A1A] rounded-2xl border border-[#333333] text-xs text-neutral-400 space-y-1 leading-relaxed">
            <div className="font-semibold text-[#EDEDED] uppercase text-[10px] tracking-wider">
              Legal & Institutional Notice
            </div>
            <p>"{certData.disclaimer}"</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[#262626] bg-[#161616] flex justify-end">
          <button
            type="button"
            onClick={() => setCertificateCommitmentId(null)}
            className="px-5 py-2.5 bg-[#262626] hover:bg-[#333333] text-white text-xs font-medium rounded-xl transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
