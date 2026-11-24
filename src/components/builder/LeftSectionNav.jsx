import React, { useState } from 'react';
import {
  User, AlignLeft, Briefcase, BookOpen, Code, Sparkles,
  Award, Globe, Layers, Eye, EyeOff, ChevronUp, ChevronDown,
  Plus, CheckCircle2, AlertCircle, GripVertical
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { Modal } from '../common/Modal';

export const LeftSectionNav = ({ activeSectionId, setActiveSectionId }) => {
  const { activeResume, reorderSections, toggleSectionVisibility, addCustomSection } = useResume();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');

  const sections = activeResume?.sections || [];

  const getSectionIcon = (type) => {
    switch (type) {
      case 'personalInfo': return User;
      case 'summary': return AlignLeft;
      case 'experience': return Briefcase;
      case 'education': return BookOpen;
      case 'skills': return Code;
      case 'projects': return Sparkles;
      case 'certifications':
      case 'achievements': return Award;
      case 'languages': return Globe;
      case 'custom':
      default: return Layers;
    }
  };

  const getSectionCompletion = (type) => {
    if (!activeResume) return { label: 'Empty', color: 'var(--text-muted)' };

    switch (type) {
      case 'personalInfo':
        const p = activeResume.personalInfo || {};
        if (p.fullName && p.email && p.phone) return { label: '100%', color: 'var(--accent-emerald)' };
        if (p.fullName || p.email) return { label: '60%', color: 'var(--accent-amber)' };
        return { label: 'Empty', color: 'var(--text-muted)' };

      case 'summary':
        return activeResume.summary?.trim() ? { label: '100%', color: 'var(--accent-emerald)' } : { label: 'Empty', color: 'var(--text-muted)' };

      case 'experience':
        const expCount = (activeResume.experience || []).filter(e => e.jobTitle?.trim()).length;
        if (expCount >= 2) return { label: '100%', color: 'var(--accent-emerald)' };
        if (expCount === 1) return { label: '60%', color: 'var(--accent-amber)' };
        return { label: 'Empty', color: 'var(--text-muted)' };

      case 'education':
        return (activeResume.education || []).some(e => e.institution?.trim()) ? { label: '100%', color: 'var(--accent-emerald)' } : { label: 'Empty', color: 'var(--text-muted)' };

      case 'skills':
        const skCount = (activeResume.skills || []).length;
        if (skCount >= 6) return { label: '100%', color: 'var(--accent-emerald)' };
        if (skCount >= 1) return { label: '50%', color: 'var(--accent-amber)' };
        return { label: 'Empty', color: 'var(--text-muted)' };

      case 'projects':
        return (activeResume.projects || []).length > 0 ? { label: '100%', color: 'var(--accent-emerald)' } : { label: 'Empty', color: 'var(--text-muted)' };

      default:
        return { label: 'Optional', color: 'var(--text-muted)' };
    }
  };

  const handleMoveUp = (index, e) => {
    e.stopPropagation();
    if (index === 0) return;
    const newSecs = [...sections];
    const temp = newSecs[index - 1];
    newSecs[index - 1] = newSecs[index];
    newSecs[index] = temp;
    reorderSections(newSecs);
  };

  const handleMoveDown = (index, e) => {
    e.stopPropagation();
    if (index === sections.length - 1) return;
    const newSecs = [...sections];
    const temp = newSecs[index + 1];
    newSecs[index + 1] = newSecs[index];
    newSecs[index] = temp;
    reorderSections(newSecs);
  };

  const handleCreateCustomSection = (e) => {
    e.preventDefault();
    if (newSectionTitle.trim()) {
      addCustomSection(newSectionTitle.trim());
      setNewSectionTitle('');
      setIsAddModalOpen(false);
    }
  };

  return (
    <div
      className="builder-left-panel"
      style={{
        width: '260px',
        backgroundColor: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 60px)',
        overflowY: 'auto',
        flexShrink: 0,
      }}
    >
      {/* Panel Header */}
      <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Sections & Order
          </h3>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Click to edit • Reorder for ATS
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary btn-sm btn-icon"
          title="Add Section"
        >
          <Plus size={15} />
        </button>
      </div>

      {/* Sections List */}
      <div style={{ padding: '0.75rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {sections.map((sec, idx) => {
          const Icon = getSectionIcon(sec.type);
          const completion = getSectionCompletion(sec.type);
          const isSelected = activeSectionId === sec.id;

          return (
            <div
              key={sec.id}
              onClick={() => setActiveSectionId(sec.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.55rem 0.65rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isSelected ? 'var(--primary-light)' : 'transparent',
                border: isSelected ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                cursor: 'pointer',
                opacity: sec.visible ? 1 : 0.45,
                transition: 'all var(--transition-fast)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <Icon size={16} color={isSelected ? 'var(--primary)' : 'var(--text-secondary)'} style={{ flexShrink: 0 }} />
                <span
                  style={{
                    fontSize: '0.83rem',
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? 'var(--primary)' : 'var(--text-primary)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {sec.title}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {/* Completion status pill */}
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: completion.color,
                    padding: '1px 5px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--bg-tertiary)'
                  }}
                >
                  {completion.label}
                </span>

                {/* Reorder Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <button
                    onClick={(e) => handleMoveUp(idx, e)}
                    disabled={idx === 0}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0, lineHeight: 1 }}
                    title="Move Up"
                  >
                    <ChevronUp size={12} />
                  </button>
                  <button
                    onClick={(e) => handleMoveDown(idx, e)}
                    disabled={idx === sections.length - 1}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0, lineHeight: 1 }}
                    title="Move Down"
                  >
                    <ChevronDown size={12} />
                  </button>
                </div>

                {/* Visibility Toggle */}
                {!sec.required && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSectionVisibility(sec.id);
                    }}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: sec.visible ? 'var(--text-muted)' : 'var(--accent-rose)', padding: '2px' }}
                    title={sec.visible ? 'Hide Section' : 'Show Section'}
                  >
                    {sec.visible ? <Eye size={13} /> : <EyeOff size={13} />}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Section Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Resume Section"
        maxWidth="420px"
      >
        <form onSubmit={handleCreateCustomSection} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Section Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Publications, Volunteer Work, Patents"
              value={newSectionTitle}
              onChange={e => setNewSectionTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {['Publications', 'Volunteering', 'Patents', 'Conferences & Speaking', 'References'].map(tag => (
              <button
                key={tag}
                type="button"
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.75rem', border: '1px solid var(--border-subtle)' }}
                onClick={() => setNewSectionTitle(tag)}
              >
                + {tag}
              </button>
            ))}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            Add to Resume
          </button>
        </form>
      </Modal>
    </div>
  );
};
