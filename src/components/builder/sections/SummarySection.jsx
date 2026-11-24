import React from 'react';
import { AlignLeft, Sparkles, Wand2, Check } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';

export const SummarySection = ({ onOpenAISummary }) => {
  const { activeResume, updateActiveResume } = useResume();
  const summary = activeResume?.summary || '';

  const handleChange = (e) => {
    updateActiveResume(prev => ({
      ...prev,
      summary: e.target.value
    }));
  };

  const charCount = summary.length;
  const wordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;

  return (
    <div className="section-editor-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlignLeft size={18} color="var(--primary)" />
            <span>Professional Summary</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            A high-impact 3–4 sentence overview of your career accomplishments and core competencies.
          </p>
        </div>

        {/* AI Assistant Generator Trigger */}
        <button
          type="button"
          onClick={onOpenAISummary}
          className="btn btn-ai btn-sm"
          style={{ gap: '6px' }}
        >
          <Sparkles size={14} />
          <span>AI Summary Assistant</span>
        </button>
      </div>

      <div className="form-group" style={{ margin: 0 }}>
        <textarea
          className="form-textarea"
          style={{ minHeight: '140px', fontSize: '0.9rem', lineHeight: '1.6' }}
          placeholder="e.g. Strategic and results-driven Software Architect with 8+ years of expertise in designing high-throughput distributed systems and cloud transformations..."
          value={summary}
          onChange={handleChange}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <div>
            <span>{wordCount} words</span> • <span style={{ color: charCount > 550 ? 'var(--accent-amber)' : 'inherit' }}>{charCount} / 450 characters (ideal)</span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              type="button"
              onClick={onOpenAISummary}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', padding: '2px 6px' }}
            >
              <Wand2 size={12} style={{ marginRight: '4px' }} />
              Rephrase with AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
