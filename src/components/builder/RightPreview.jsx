import React, { useState } from 'react';
import {
  ZoomIn, ZoomOut, Maximize2, Download, Printer, Palette,
  ShieldCheck, Layout, ChevronDown, Check, Sparkles, Target, FileDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { TEMPLATES } from '../../types/resume';
import { exportResumeToPDF, printResume } from '../../utils/pdfExport';
import { CustomizerDrawer } from './CustomizerDrawer';
import { Modal } from '../common/Modal';

export const RightPreview = ({ onOpenATSModal, onOpenJobModal }) => {
  const { activeResume, setResumeTemplate, showToast } = useResume();
  const { user, requireAuthForAction, isAuthenticated } = useAuth();
  const [zoom, setZoom] = useState(0.85);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isTemplateMenuOpen, setIsTemplateMenuOpen] = useState(false);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleZoomIn = () => setZoom(prev => Math.min(1.4, Math.round((prev + 0.1) * 10) / 10));
  const handleZoomOut = () => setZoom(prev => Math.max(0.5, Math.round((prev - 0.1) * 10) / 10));
  const handleResetZoom = () => setZoom(0.85);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b']
      });
    } catch (e) {
      // safe fallback
    }
  };

  const executePDFDownload = async () => {
    if (!activeResume) return;
    setIsExporting(true);
    showToast('Compiling high-resolution PDF document...', 'info');

    try {
      const filename = `${(activeResume.personalInfo?.fullName || 'Resume').replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`;
      await exportResumeToPDF('resume-print-document', filename, activeResume.styling?.paperSize || 'a4', activeResume, user);
      triggerConfetti();
      showToast('PDF downloaded successfully! Good luck with your application!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to export PDF. Please try the Print -> Save as PDF option.', 'danger');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = () => {
    // Requires email sign in / sign up before downloading
    requireAuthForAction(executePDFDownload, 'download');
  };

  const handlePrint = () => {
    // Print also checks auth for complete export protection
    requireAuthForAction(() => printResume(), 'download');
  };

  const currentTemplate = TEMPLATES.find(t => t.id === activeResume?.templateId) || TEMPLATES[0];

  return (
    <div
      className="builder-right-panel"
      style={{
        flex: 1.2,
        backgroundColor: '#1e293b',
        borderLeft: '1px solid var(--border-subtle)',
        height: 'calc(100vh - 60px)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Preview Toolbar */}
      <div
        className="preview-toolbar no-print"
        style={{
          padding: '0.65rem 1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          zIndex: 10,
        }}
      >
        {/* Left: Template Switcher Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsTemplateMenuOpen(!isTemplateMenuOpen)}
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px', fontSize: '0.8rem' }}
            >
              <Layout size={14} color="var(--primary)" />
              <span style={{ fontWeight: 600 }}>{currentTemplate.name}</span>
              <ChevronDown size={12} />
            </button>

            {isTemplateMenuOpen && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  top: '115%',
                  left: 0,
                  width: '210px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  boxShadow: 'var(--shadow-xl)',
                  padding: '6px',
                  zIndex: 100,
                }}
              >
                {TEMPLATES.map(tmpl => (
                  <div
                    key={tmpl.id}
                    onClick={() => {
                      setResumeTemplate(tmpl.id);
                      setIsTemplateMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '7px 10px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      color: tmpl.id === currentTemplate.id ? 'var(--primary)' : 'var(--text-primary)',
                      backgroundColor: tmpl.id === currentTemplate.id ? 'var(--primary-light)' : 'transparent',
                    }}
                  >
                    <span>{tmpl.name}</span>
                    {tmpl.id === currentTemplate.id && <Check size={14} />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Customizer Drawer Button */}
          <button
            onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
            className={`btn ${isCustomizerOpen ? 'btn-primary' : 'btn-secondary'} btn-sm btn-icon`}
            title="Customize Colors & Typography"
          >
            <Palette size={15} />
          </button>
        </div>

        {/* Center: Zoom Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '2px 4px' }}>
          <button onClick={handleZoomOut} className="btn btn-ghost btn-icon btn-sm" title="Zoom Out">
            <ZoomOut size={14} />
          </button>
          <span
            onClick={handleResetZoom}
            style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', padding: '0 6px', cursor: 'pointer', minWidth: '42px', textAlign: 'center' }}
            title="Click to reset zoom"
          >
            {Math.round(zoom * 100)}%
          </span>
          <button onClick={handleZoomIn} className="btn btn-ghost btn-icon btn-sm" title="Zoom In">
            <ZoomIn size={14} />
          </button>
          <button onClick={() => setIsFullscreenModalOpen(true)} className="btn btn-ghost btn-icon btn-sm" title="Full Screen Preview">
            <Maximize2 size={14} />
          </button>
        </div>

        {/* Right: Export PDF & Print */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={handlePrint}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px' }}
            title="Print Resume"
          >
            <Printer size={14} />
            <span className="hide-mobile">Print</span>
          </button>

          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="btn btn-primary btn-sm"
            style={{ gap: '6px' }}
          >
            <FileDown size={15} />
            <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Live Document Viewport */}
      <div
        className="preview-container"
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'auto',
          padding: '2rem 1rem',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          position: 'relative',
        }}
      >
        <TemplateRenderer resume={activeResume} zoom={zoom} customId="resume-print-document" />
      </div>

      {/* Slide-out Customizer Drawer */}
      <CustomizerDrawer isOpen={isCustomizerOpen} onClose={() => setIsCustomizerOpen(false)} />

      {/* Fullscreen Preview Modal */}
      <Modal
        isOpen={isFullscreenModalOpen}
        onClose={() => setIsFullscreenModalOpen(false)}
        title={`Full Document Preview — ${activeResume?.title}`}
        maxWidth="920px"
      >
        <div style={{ maxHeight: '78vh', overflowY: 'auto', padding: '1rem', backgroundColor: '#0f172a', display: 'flex', justifyContent: 'center' }}>
          <TemplateRenderer resume={activeResume} zoom={1} customId="resume-fullscreen-preview" />
        </div>
      </Modal>
    </div>
  );
};
