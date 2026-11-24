import React from 'react';
import { Plus, Trash2, Edit3, Layers } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';

export const CustomSection = ({ sectionId, sectionTitle }) => {
  const { activeResume, updateActiveResume, showToast } = useResume();
  const customSections = activeResume?.customSections || [];
  const customSec = customSections.find(c => c.id === sectionId) || { id: sectionId, title: sectionTitle, items: [] };

  const handleAddItem = () => {
    const newItem = {
      id: `item-${Date.now()}`,
      title: '',
      subtitle: '',
      date: '',
      description: ''
    };
    const updatedCustoms = customSections.map(c => {
      if (c.id === sectionId) {
        return { ...c, items: [...(c.items || []), newItem] };
      }
      return c;
    });

    if (!customSections.some(c => c.id === sectionId)) {
      updatedCustoms.push({
        id: sectionId,
        title: sectionTitle,
        items: [newItem]
      });
    }

    updateActiveResume(prev => ({
      ...prev,
      customSections: updatedCustoms
    }));
    showToast('Added item to custom section', 'info');
  };

  const handleUpdateItem = (itemId, field, value) => {
    updateActiveResume(prev => ({
      ...prev,
      customSections: (prev.customSections || []).map(c => {
        if (c.id !== sectionId) return c;
        return {
          ...c,
          items: (c.items || []).map(item =>
            item.id === itemId ? { ...item, [field]: value } : item
          )
        };
      })
    }));
  };

  const handleDeleteItem = (itemId) => {
    updateActiveResume(prev => ({
      ...prev,
      customSections: (prev.customSections || []).map(c => {
        if (c.id !== sectionId) return c;
        return {
          ...c,
          items: (c.items || []).filter(item => item.id !== itemId)
        };
      })
    }));
  };

  return (
    <div className="section-editor-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="var(--primary)" />
            <span>{sectionTitle || 'Custom Section'}</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Add tailored entries for publications, volunteering, patents, or specific domain achievements.
          </p>
        </div>

        <button onClick={handleAddItem} className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
          <Plus size={15} />
          <span>Add Entry</span>
        </button>
      </div>

      {(!customSec.items || customSec.items.length === 0) ? (
        <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--border-medium)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>
            No entries in this section yet.
          </p>
          <button onClick={handleAddItem} className="btn btn-secondary btn-sm">
            + Add First Entry
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {customSec.items.map((item, idx) => (
            <div
              key={item.id}
              className="card"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-medium)',
                padding: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                  Entry #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id)}
                  className="btn btn-ghost btn-icon btn-sm"
                  style={{ color: 'var(--accent-rose)' }}
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Entry Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Volunteer Mentor / Keynote Speaker"
                    value={item.title || ''}
                    onChange={e => handleUpdateItem(item.id, 'title', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subtitle / Organization</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Women In Tech / IEEE"
                    value={item.subtitle || ''}
                    onChange={e => handleUpdateItem(item.id, 'subtitle', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Date or Period</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 2023 - Present"
                  value={item.date || ''}
                  onChange={e => handleUpdateItem(item.id, 'date', e.target.value)}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Description & Key Contributions</label>
                <textarea
                  className="form-textarea"
                  style={{ minHeight: '60px' }}
                  placeholder="Details and contributions..."
                  value={item.description || ''}
                  onChange={e => handleUpdateItem(item.id, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
