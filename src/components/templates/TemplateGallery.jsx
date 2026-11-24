import React, { useState } from 'react';
import { TEMPLATES } from '../../types/resume';
import { useResume } from '../../context/ResumeContext';
import { TemplateRenderer } from './TemplateRenderer';
import { Check, ArrowRight, Sparkles, ShieldCheck, Eye } from 'lucide-react';

export const TemplateGallery = ({ onOpenBuilder }) => {
  const { activeResume, setResumeTemplate, showToast } = useResume();
  const [selectedTemplateId, setSelectedTemplateId] = useState(activeResume?.templateId || 'modern');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', 'Modern', 'ATS-Friendly', 'Corporate', 'Creative', 'Minimal'];

  const filteredTemplates = TEMPLATES.filter(t => filterCategory === 'all' || t.category === filterCategory);

  const previewResume = {
    ...activeResume,
    templateId: selectedTemplateId,
  };

  const handleApplyTemplate = (templateId) => {
    setResumeTemplate(templateId);
    showToast(`Applied ${TEMPLATES.find(t => t.id === templateId)?.name} template!`, 'success');
    if (onOpenBuilder) onOpenBuilder();
  };

  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--primary-light)', padding: '4px 12px', borderRadius: 'var(--radius-full)', color: 'var(--primary)', fontSize: '0.76rem', fontWeight: 700, marginBottom: '10px' }}>
          <Sparkles size={14} />
          <span>RECRUITER-VERIFIED TYPOGRAPHY</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Professional Template Gallery
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
          Select from meticulously crafted layouts engineered for high ATS pass rates, clean document hierarchy, and aesthetic distinction.
        </p>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`btn ${filterCategory === cat ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            style={{ textTransform: 'capitalize', padding: '0.4rem 1rem' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Split View: Gallery Cards + Live Full-Sized Preview Box */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 460px) 1fr', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Left: Template Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredTemplates.map(tmpl => {
            const isSelected = selectedTemplateId === tmpl.id;
            const isCurrentActive = activeResume?.templateId === tmpl.id;

            return (
              <div
                key={tmpl.id}
                onClick={() => setSelectedTemplateId(tmpl.id)}
                className={`card ${isSelected ? 'active-border' : 'card-interactive'}`}
                style={{
                  padding: '1.25rem',
                  border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                  backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.06)' : 'var(--bg-secondary)',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: tmpl.previewColor }}></div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {tmpl.name}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {isCurrentActive && (
                      <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Active</span>
                    )}
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{tmpl.badge}</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '12px' }}>
                  {tmpl.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Category: <strong>{tmpl.category}</strong>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyTemplate(tmpl.id);
                    }}
                    className="btn btn-primary btn-sm"
                    style={{ gap: '6px' }}
                  >
                    <span>Use Template</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Live Data Preview Container */}
        <div
          className="card"
          style={{
            padding: '1.5rem',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-medium)',
            position: 'sticky',
            top: '80px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={16} color="var(--primary)" />
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                Live Document Preview ({activeResume?.title})
              </span>
            </div>

            <button
              onClick={() => handleApplyTemplate(selectedTemplateId)}
              className="btn btn-primary btn-sm"
              style={{ gap: '6px' }}
            >
              <span>Apply & Open in Builder</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div
            style={{
              maxHeight: '680px',
              overflowY: 'auto',
              backgroundColor: '#334155',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <TemplateRenderer resume={previewResume} zoom={0.78} />
          </div>
        </div>
      </div>
    </div>
  );
};
