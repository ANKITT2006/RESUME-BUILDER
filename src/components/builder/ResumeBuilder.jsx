import React, { useState } from 'react';
import { LeftSectionNav } from './LeftSectionNav';
import { CenterEditor } from './CenterEditor';
import { RightPreview } from './RightPreview';
import { AIAssistantModal } from '../ai/AIAssistantModal';
import { ATSCheckerModal } from '../ai/ATSCheckerModal';
import { JobMatcherModal } from '../ai/JobMatcherModal';
import { useResume } from '../../context/ResumeContext';
import { LayoutList, Edit3, Eye, ShieldCheck, Sparkles } from 'lucide-react';

export const ResumeBuilder = () => {
  const { activeResume } = useResume();
  const [activeSectionId, setActiveSectionId] = useState(() => activeResume?.sections?.[0]?.id || 'sec-personal');
  const [mobileTab, setMobileTab] = useState('editor'); // 'sections' | 'editor' | 'preview'

  // AI Modal states
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiMode, setAiMode] = useState('summary'); // 'summary' | 'bullet'
  const [bulletContext, setBulletContext] = useState(null);

  // ATS Modal state
  const [isATSModalOpen, setIsATSModalOpen] = useState(false);

  // Job Matcher state
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const handleOpenAISummary = () => {
    setAiMode('summary');
    setBulletContext(null);
    setIsAIModalOpen(true);
  };

  const handleOpenAIBullet = (expId, bulletIdx, text, jobTitle) => {
    setAiMode('bullet');
    setBulletContext({ expId, bulletIdx, text, jobTitle });
    setIsAIModalOpen(true);
  };

  const handleNavigateSection = (secId) => {
    setActiveSectionId(secId);
    setMobileTab('editor');
  };

  return (
    <div className="builder-workspace" style={{ display: 'flex', width: '100%', height: 'calc(100vh - 60px)', overflow: 'hidden', position: 'relative' }}>
      {/* Desktop / Large Screens: 3-Panel Layout */}
      {/* Mobile Mode: Conditional Rendering based on active mobile tab */}
      
      {/* 1. Left Panel (Section Manager) */}
      <div className={`builder-panel-left ${mobileTab === 'sections' ? 'mobile-active' : 'hide-on-mobile-tab'}`}>
        <LeftSectionNav
          activeSectionId={activeSectionId}
          setActiveSectionId={(id) => {
            setActiveSectionId(id);
            setMobileTab('editor');
          }}
        />
      </div>

      {/* 2. Center Panel (Editor) */}
      <div className={`builder-panel-center ${mobileTab === 'editor' ? 'mobile-active' : 'hide-on-mobile-tab'}`} style={{ flex: 1, minWidth: 0 }}>
        <CenterEditor
          activeSectionId={activeSectionId}
          setActiveSectionId={setActiveSectionId}
          onOpenAISummary={handleOpenAISummary}
          onOpenAIBullet={handleOpenAIBullet}
        />
      </div>

      {/* 3. Right Panel (Live Preview) */}
      <div className={`builder-panel-right ${mobileTab === 'preview' ? 'mobile-active' : 'hide-on-mobile-tab'}`} style={{ flex: 1.1, minWidth: 0 }}>
        <RightPreview
          onOpenATSModal={() => setIsATSModalOpen(true)}
          onOpenJobModal={() => setIsJobModalOpen(true)}
        />
      </div>

      {/* Mobile Floating Bottom Bar */}
      <div
        className="mobile-bottom-tabs no-print"
        style={{
          display: 'none', // shown via media query in CSS
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '56px',
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-subtle)',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 100,
        }}
      >
        <button
          onClick={() => setMobileTab('sections')}
          style={{
            background: 'transparent',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            color: mobileTab === 'sections' ? 'var(--primary)' : 'var(--text-muted)',
            fontSize: '0.72rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <LayoutList size={18} />
          <span>Sections</span>
        </button>

        <button
          onClick={() => setMobileTab('editor')}
          style={{
            background: 'transparent',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            color: mobileTab === 'editor' ? 'var(--primary)' : 'var(--text-muted)',
            fontSize: '0.72rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Edit3 size={18} />
          <span>Editor</span>
        </button>

        <button
          onClick={() => setMobileTab('preview')}
          style={{
            background: 'transparent',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            color: mobileTab === 'preview' ? 'var(--primary)' : 'var(--text-muted)',
            fontSize: '0.72rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Eye size={18} />
          <span>Preview</span>
        </button>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        mode={aiMode}
        bulletContext={bulletContext}
      />

      {/* ATS Checker Modal */}
      <ATSCheckerModal
        isOpen={isATSModalOpen}
        onClose={() => setIsATSModalOpen(false)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Job Matcher Modal */}
      <JobMatcherModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
      />
    </div>
  );
};
