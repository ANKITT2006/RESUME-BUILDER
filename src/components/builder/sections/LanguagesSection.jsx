import React from 'react';
import { Globe, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';

export const LanguagesSection = () => {
  const { activeResume, updateActiveResume } = useResume();
  const languages = activeResume?.languages || [];

  const handleAddLang = () => {
    const newLang = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Professional Working'
    };
    updateActiveResume(prev => ({
      ...prev,
      languages: [...(prev.languages || []), newLang]
    }));
  };

  const handleUpdateLang = (id, field, value) => {
    updateActiveResume(prev => ({
      ...prev,
      languages: (prev.languages || []).map(l =>
        l.id === id ? { ...l, [field]: value } : l
      )
    }));
  };

  const handleDeleteLang = (id) => {
    updateActiveResume(prev => ({
      ...prev,
      languages: (prev.languages || []).filter(l => l.id !== id)
    }));
  };

  return (
    <div className="section-editor-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={18} color="var(--primary)" />
            <span>Languages</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Language fluencies and professional proficiencies.
          </p>
        </div>

        <button onClick={handleAddLang} className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
          <Plus size={15} />
          <span>Add Language</span>
        </button>
      </div>

      {languages.length === 0 ? (
        <div style={{ padding: '1.5rem', textAlign: 'center', border: '1px dashed var(--border-medium)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            No languages added.
          </p>
          <button onClick={handleAddLang} className="btn btn-secondary btn-sm">
            + Add Language
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {languages.map((l) => (
            <div
              key={l.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <input
                type="text"
                className="form-input"
                style={{ flex: 1 }}
                placeholder="e.g. English, Spanish, German"
                value={l.language || ''}
                onChange={e => handleUpdateLang(l.id, 'language', e.target.value)}
              />

              <select
                className="form-select"
                style={{ width: '200px' }}
                value={l.proficiency || 'Professional Working'}
                onChange={e => handleUpdateLang(l.id, 'proficiency', e.target.value)}
              >
                <option value="Native / Bilingual">Native / Bilingual</option>
                <option value="Full Professional">Full Professional</option>
                <option value="Professional Working">Professional Working</option>
                <option value="Limited Working">Limited Working</option>
                <option value="Elementary">Elementary</option>
              </select>

              <button
                type="button"
                onClick={() => handleDeleteLang(l.id)}
                className="btn btn-ghost btn-icon btn-sm"
                style={{ color: 'var(--accent-rose)' }}
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
