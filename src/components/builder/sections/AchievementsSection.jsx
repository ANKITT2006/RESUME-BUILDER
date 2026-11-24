import React from 'react';
import { Award, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';

export const AchievementsSection = () => {
  const { activeResume, updateActiveResume, showToast } = useResume();
  const achievements = activeResume?.achievements || [];

  const handleAddAch = () => {
    const newAch = {
      id: `ach-${Date.now()}`,
      title: '',
      organization: '',
      date: '',
      description: ''
    };
    updateActiveResume(prev => ({
      ...prev,
      achievements: [...(prev.achievements || []), newAch]
    }));
    showToast('Added achievement entry', 'info');
  };

  const handleUpdateAch = (id, field, value) => {
    updateActiveResume(prev => ({
      ...prev,
      achievements: (prev.achievements || []).map(a =>
        a.id === id ? { ...a, [field]: value } : a
      )
    }));
  };

  const handleDeleteAch = (id) => {
    updateActiveResume(prev => ({
      ...prev,
      achievements: (prev.achievements || []).filter(a => a.id !== id)
    }));
  };

  return (
    <div className="section-editor-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} color="var(--accent-amber)" />
            <span>Honors & Key Achievements</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Awards, scholarships, hackathon victories, and industry recognitions.
          </p>
        </div>

        <button onClick={handleAddAch} className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
          <Plus size={15} />
          <span>Add Achievement</span>
        </button>
      </div>

      {achievements.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--border-medium)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>
            No awards or achievements listed.
          </p>
          <button onClick={handleAddAch} className="btn btn-secondary btn-sm">
            + Add First Award
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {achievements.map((ach, idx) => (
            <div
              key={ach.id}
              className="card"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-medium)',
                padding: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-warning" style={{ fontSize: '0.72rem' }}>
                  Award #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleDeleteAch(ach.id)}
                  className="btn btn-ghost btn-icon btn-sm"
                  style={{ color: 'var(--accent-rose)' }}
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Award / Honor Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Global Hackathon Grand Champion"
                    value={ach.title || ''}
                    onChange={e => handleUpdateAch(ach.id, 'title', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Organization / Issuer</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. TechCrunch / Forbes 30 under 30"
                    value={ach.organization || ''}
                    onChange={e => handleUpdateAch(ach.id, 'organization', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Description & Significance</label>
                <textarea
                  className="form-textarea"
                  style={{ minHeight: '60px' }}
                  placeholder="e.g. Awarded 1st place out of 450 global teams for AI-assisted cloud disaster recovery engine..."
                  value={ach.description || ''}
                  onChange={e => handleUpdateAch(ach.id, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
