import React, { useState } from 'react';
import { Code, Plus, X, Sparkles, Check } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';
import { suggestSkillsForRole } from '../../../utils/aiAssistant';

export const SkillsSection = () => {
  const { activeResume, updateActiveResume, showToast } = useResume();
  const skills = activeResume?.skills || [];
  const [newSkillName, setNewSkillName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Technical Skills');

  const suggestedSkills = suggestSkillsForRole(activeResume?.personalInfo?.professionalTitle || activeResume?.targetRole || '');

  const handleAddSkill = (name, cat = selectedCategory) => {
    if (!name?.trim()) return;
    const skillName = name.trim();
    if (skills.some(s => s.name.toLowerCase() === skillName.toLowerCase())) {
      showToast(`Skill "${skillName}" is already listed`, 'info');
      return;
    }

    const newSkill = {
      id: `sk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: skillName,
      category: cat,
      level: 90
    };

    updateActiveResume(prev => ({
      ...prev,
      skills: [...(prev.skills || []), newSkill]
    }));
    setNewSkillName('');
    showToast(`Added skill: ${skillName}`, 'success');
  };

  const handleRemoveSkill = (id) => {
    updateActiveResume(prev => ({
      ...prev,
      skills: (prev.skills || []).filter(s => s.id !== id)
    }));
  };

  return (
    <div className="section-editor-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Code size={18} color="var(--primary)" />
          <span>Skills & Proficiencies</span>
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          List high-impact technical proficiencies, frameworks, tools, and domain expertise.
        </p>
      </div>

      {/* Input row */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <input
          type="text"
          className="form-input"
          style={{ flex: 1, minWidth: '180px' }}
          placeholder="e.g. React.js, TypeScript, Distributed Systems..."
          value={newSkillName}
          onChange={e => setNewSkillName(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddSkill(newSkillName);
            }
          }}
        />

        <select
          className="form-select"
          style={{ width: 'auto' }}
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="Technical Skills">Technical Skills</option>
          <option value="Tools & Frameworks">Tools & Frameworks</option>
          <option value="Soft Skills">Soft Skills & Leadership</option>
          <option value="Methodologies">Methodologies & Standards</option>
        </select>

        <button
          type="button"
          onClick={() => handleAddSkill(newSkillName)}
          className="btn btn-primary"
          style={{ gap: '4px' }}
        >
          <Plus size={16} />
          <span>Add</span>
        </button>
      </div>

      {/* Current Active Skills Chips */}
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Active Skills ({skills.length} added)
        </div>

        {skills.length === 0 ? (
          <div style={{ padding: '1rem', textAlign: 'center', border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            No skills added yet. Type a skill above or click from suggestions below.
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map(s => (
              <span
                key={s.id}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: 500
                }}
              >
                <span>{s.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(s.id)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary)', display: 'flex' }}
                >
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Quick-Add Suggestions from Role Bank */}
      <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-purple)', marginBottom: '8px' }}>
          <Sparkles size={14} />
          <span>Recommended for your target role</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {suggestedSkills.map((sug, idx) => {
            const isAdded = skills.some(s => s.name.toLowerCase() === sug.toLowerCase());
            return (
              <button
                key={idx}
                type="button"
                onClick={() => !isAdded && handleAddSkill(sug)}
                disabled={isAdded}
                className="btn btn-ghost btn-sm"
                style={{
                  padding: '3px 8px',
                  fontSize: '0.76rem',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: isAdded ? 'var(--bg-secondary)' : 'transparent',
                  color: isAdded ? 'var(--text-muted)' : 'var(--text-secondary)',
                  borderRadius: 'var(--radius-full)',
                  cursor: isAdded ? 'default' : 'pointer'
                }}
              >
                {isAdded ? <Check size={11} style={{ marginRight: '3px' }} /> : <Plus size={11} style={{ marginRight: '3px' }} />}
                {sug}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
