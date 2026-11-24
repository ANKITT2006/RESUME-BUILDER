import React from 'react';
import { Briefcase, Plus, Trash2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';

export const ExperienceSection = ({ onOpenAIBullet }) => {
  const { activeResume, updateActiveResume, showToast } = useResume();
  const experience = activeResume?.experience || [];

  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      employmentType: 'Full-time',
      location: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      bullets: ['']
    };
    updateActiveResume(prev => ({
      ...prev,
      experience: [newExp, ...(prev.experience || [])]
    }));
    showToast('Added new work experience role', 'info');
  };

  const handleUpdateExp = (id, field, value) => {
    updateActiveResume(prev => ({
      ...prev,
      experience: (prev.experience || []).map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const handleDeleteExp = (id) => {
    updateActiveResume(prev => ({
      ...prev,
      experience: (prev.experience || []).filter(exp => exp.id !== id)
    }));
    showToast('Experience entry removed', 'info');
  };

  const handleBulletChange = (expId, bulletIdx, text) => {
    updateActiveResume(prev => ({
      ...prev,
      experience: (prev.experience || []).map(exp => {
        if (exp.id !== expId) return exp;
        const newBullets = [...(exp.bullets || [])];
        newBullets[bulletIdx] = text;
        return { ...exp, bullets: newBullets };
      })
    }));
  };

  const handleAddBullet = (expId) => {
    updateActiveResume(prev => ({
      ...prev,
      experience: (prev.experience || []).map(exp => {
        if (exp.id !== expId) return exp;
        return { ...exp, bullets: [...(exp.bullets || []), ''] };
      })
    }));
  };

  const handleDeleteBullet = (expId, bulletIdx) => {
    updateActiveResume(prev => ({
      ...prev,
      experience: (prev.experience || []).map(exp => {
        if (exp.id !== expId) return exp;
        const newBullets = (exp.bullets || []).filter((_, idx) => idx !== bulletIdx);
        return { ...exp, bullets: newBullets.length ? newBullets : [''] };
      })
    }));
  };

  return (
    <div className="section-editor-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase size={18} color="var(--primary)" />
            <span>Work Experience</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Highlight achievements with measurable impact (STAR / Google XYZ framework).
          </p>
        </div>

        <button onClick={handleAddExperience} className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
          <Plus size={15} />
          <span>Add Position</span>
        </button>
      </div>

      {experience.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--border-medium)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>
            No work experience added yet. Add your current or previous roles.
          </p>
          <button onClick={handleAddExperience} className="btn btn-secondary btn-sm">
            + Add First Experience
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {experience.map((exp, expIdx) => (
            <div
              key={exp.id}
              className="card"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-medium)',
                padding: '1.25rem',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                  Position #{expIdx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleDeleteExp(exp.id)}
                  className="btn btn-ghost btn-icon btn-sm"
                  style={{ color: 'var(--accent-rose)' }}
                  title="Delete Position"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Job Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Senior Software Engineer"
                    value={exp.jobTitle || ''}
                    onChange={e => handleUpdateExp(exp.id, 'jobTitle', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Company / Organization *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Acme Corp / Stripe"
                    value={exp.company || ''}
                    onChange={e => handleUpdateExp(exp.id, 'company', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid-3">
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. New York, NY (Hybrid)"
                    value={exp.location || ''}
                    onChange={e => handleUpdateExp(exp.id, 'location', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 2021-03 or Mar 2021"
                    value={exp.startDate || ''}
                    onChange={e => handleUpdateExp(exp.id, 'startDate', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 2024-01 or Present"
                    value={exp.currentlyWorking ? 'Present' : exp.endDate || ''}
                    disabled={exp.currentlyWorking}
                    onChange={e => handleUpdateExp(exp.id, 'endDate', e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  checked={!!exp.currentlyWorking}
                  onChange={e => handleUpdateExp(exp.id, 'currentlyWorking', e.target.checked)}
                  style={{ accentColor: 'var(--primary)' }}
                />
                <label htmlFor={`current-${exp.id}`} style={{ cursor: 'pointer' }}>
                  I currently work in this role
                </label>
              </div>

              {/* Bullet Points with Inline AI Rephraser */}
              <div>
                <label className="form-label" style={{ marginBottom: '6px' }}>
                  Key Responsibilities & Measurable Achievements (Action + Result + Metrics)
                </label>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(exp.bullets || []).map((bullet, bIdx) => (
                    <div key={bIdx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <div style={{ marginTop: '10px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>•</div>
                      <textarea
                        className="form-textarea"
                        style={{ minHeight: '64px', flex: 1, fontSize: '0.85rem' }}
                        placeholder="e.g. Architected distributed payment settlement engine handling $450M+ in quarterly transactions..."
                        value={bullet}
                        onChange={e => handleBulletChange(exp.id, bIdx, e.target.value)}
                      />

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {/* AI Enhance Bullet Button */}
                        <button
                          type="button"
                          onClick={() => onOpenAIBullet(exp.id, bIdx, bullet, exp.jobTitle)}
                          className="btn btn-ai btn-sm btn-icon"
                          title="Enhance bullet with AI (STAR & Metric Format)"
                        >
                          <Sparkles size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteBullet(exp.id, bIdx)}
                          className="btn btn-ghost btn-sm btn-icon"
                          style={{ color: 'var(--accent-rose)' }}
                          title="Delete bullet"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleAddBullet(exp.id)}
                  className="btn btn-ghost btn-sm"
                  style={{ marginTop: '8px', fontSize: '0.78rem', color: 'var(--primary)', padding: '4px 8px' }}
                >
                  <Plus size={13} style={{ marginRight: '4px' }} />
                  Add Bullet Point
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
