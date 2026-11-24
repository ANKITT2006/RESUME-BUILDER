import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { PersonalInfoSection } from './sections/PersonalInfoSection';
import { SummarySection } from './sections/SummarySection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { AchievementsSection } from './sections/AchievementsSection';
import { LanguagesSection } from './sections/LanguagesSection';
import { CustomSection } from './sections/CustomSection';

export const CenterEditor = ({ activeSectionId, setActiveSectionId, onOpenAISummary, onOpenAIBullet }) => {
  const { activeResume } = useResume();
  const sections = activeResume?.sections || [];

  const currentSectionIndex = sections.findIndex(s => s.id === activeSectionId);
  const activeSection = sections[currentSectionIndex] || sections[0];

  const handleNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setActiveSectionId(sections[currentSectionIndex + 1].id);
    }
  };

  const handlePrevSection = () => {
    if (currentSectionIndex > 0) {
      setActiveSectionId(sections[currentSectionIndex - 1].id);
    }
  };

  const renderActiveSectionEditor = () => {
    if (!activeSection) return null;

    switch (activeSection.type) {
      case 'personalInfo':
        return <PersonalInfoSection />;
      case 'summary':
        return <SummarySection onOpenAISummary={onOpenAISummary} />;
      case 'experience':
        return <ExperienceSection onOpenAIBullet={onOpenAIBullet} />;
      case 'education':
        return <EducationSection />;
      case 'skills':
        return <SkillsSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'certifications':
        return <CertificationsSection />;
      case 'achievements':
        return <AchievementsSection />;
      case 'languages':
        return <LanguagesSection />;
      case 'custom':
        return <CustomSection sectionId={activeSection.id} sectionTitle={activeSection.title} />;
      default:
        return <div>Select a section to edit.</div>;
    }
  };

  return (
    <div
      className="builder-center-panel"
      style={{
        flex: 1,
        backgroundColor: 'var(--bg-primary)',
        height: 'calc(100vh - 60px)',
        overflowY: 'auto',
        padding: '1.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ maxWidth: '780px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
        {/* Editor Active Header */}
        <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)' }}>
          {renderActiveSectionEditor()}
        </div>

        {/* Step Navigation Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={handlePrevSection}
            disabled={currentSectionIndex <= 0}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px' }}
          >
            <ArrowLeft size={14} />
            <span>Previous: {sections[currentSectionIndex - 1]?.title || 'Start'}</span>
          </button>

          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Section {currentSectionIndex + 1} of {sections.length}
          </span>

          <button
            onClick={handleNextSection}
            disabled={currentSectionIndex >= sections.length - 1}
            className="btn btn-primary btn-sm"
            style={{ gap: '6px' }}
          >
            <span>Next: {sections[currentSectionIndex + 1]?.title || 'Preview'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
