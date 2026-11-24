import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { FileText, Sparkles, Copy, Layout, ArrowRight, Check } from 'lucide-react';
import { TEMPLATES } from '../../types/resume';
import { SAMPLE_RESUMES } from '../../data/sampleResumes';
import { useResume } from '../../context/ResumeContext';

export const CreateResumeModal = ({ isOpen, onClose, onCreated }) => {
  const { createResume, resumes } = useResume();
  const [creationMode, setCreationMode] = useState('scratch'); // 'scratch' | 'sample' | 'duplicate'
  const [title, setTitle] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedSampleId, setSelectedSampleId] = useState(SAMPLE_RESUMES[0].id);
  const [selectedDuplicateId, setSelectedDuplicateId] = useState(resumes[0]?.id || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    const created = createResume({
      title: title.trim() || (creationMode === 'sample' ? SAMPLE_RESUMES.find(s => s.id === selectedSampleId)?.title : 'My New Resume'),
      targetRole: targetRole.trim(),
      templateId: selectedTemplate,
      source: creationMode,
      sampleId: selectedSampleId,
    });

    onClose();
    if (onCreated) onCreated(created.id);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Resume"
      maxWidth="620px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Step 1: Mode Selector */}
        <div>
          <label className="form-label" style={{ marginBottom: '8px' }}>
            Choose Starting Point
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            <div
              onClick={() => setCreationMode('scratch')}
              className={`card ${creationMode === 'scratch' ? 'card-interactive' : ''}`}
              style={{
                padding: '10px',
                textAlign: 'center',
                cursor: 'pointer',
                border: creationMode === 'scratch' ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                backgroundColor: creationMode === 'scratch' ? 'var(--primary-light)' : 'transparent',
              }}
            >
              <FileText size={20} color={creationMode === 'scratch' ? 'var(--primary)' : 'var(--text-muted)'} style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>Start Fresh</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Blank canvas</div>
            </div>

            <div
              onClick={() => setCreationMode('sample')}
              className={`card ${creationMode === 'sample' ? 'card-interactive' : ''}`}
              style={{
                padding: '10px',
                textAlign: 'center',
                cursor: 'pointer',
                border: creationMode === 'sample' ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                backgroundColor: creationMode === 'sample' ? 'var(--primary-light)' : 'transparent',
              }}
            >
              <Sparkles size={20} color={creationMode === 'sample' ? 'var(--accent-purple)' : 'var(--text-muted)'} style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>Sample Profile</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Pre-filled ATS data</div>
            </div>

            <div
              onClick={() => setCreationMode('duplicate')}
              className={`card ${creationMode === 'duplicate' ? 'card-interactive' : ''}`}
              style={{
                padding: '10px',
                textAlign: 'center',
                cursor: 'pointer',
                border: creationMode === 'duplicate' ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                backgroundColor: creationMode === 'duplicate' ? 'var(--primary-light)' : 'transparent',
              }}
            >
              <Copy size={20} color={creationMode === 'duplicate' ? 'var(--primary)' : 'var(--text-muted)'} style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>Duplicate Saved</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Clone version</div>
            </div>
          </div>
        </div>

        {/* Sample Profile Selector */}
        {creationMode === 'sample' && (
          <div className="form-group">
            <label className="form-label">Select Industry Role Blueprint</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {SAMPLE_RESUMES.map(sample => (
                <div
                  key={sample.id}
                  onClick={() => setSelectedSampleId(sample.id)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: selectedSampleId === sample.id ? '1.5px solid var(--primary)' : '1px solid var(--border-subtle)',
                    backgroundColor: selectedSampleId === sample.id ? 'var(--primary-light)' : 'var(--bg-tertiary)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                      {sample.title}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {sample.personalInfo?.fullName} • {sample.skills?.length || 0} skills • {sample.experience?.length || 0} roles
                    </div>
                  </div>
                  {selectedSampleId === sample.id && <Check size={16} color="var(--primary)" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Duplicate Selector */}
        {creationMode === 'duplicate' && (
          <div className="form-group">
            <label className="form-label">Select Existing Resume to Clone</label>
            <select
              className="form-select"
              value={selectedDuplicateId}
              onChange={e => setSelectedDuplicateId(e.target.value)}
            >
              {resumes.map(r => (
                <option key={r.id} value={r.id}>
                  {r.title} ({r.targetRole || 'General'})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Step 2: Information */}
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Resume Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Senior Frontend Architect 2026"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Target Role / Job Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Staff Software Engineer"
              value={targetRole}
              onChange={e => setTargetRole(e.target.value)}
            />
          </div>
        </div>

        {/* Step 3: Template Selector */}
        <div>
          <label className="form-label" style={{ marginBottom: '8px' }}>
            Choose Starting Template
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
            {TEMPLATES.map(t => (
              <div
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                style={{
                  padding: '8px',
                  borderRadius: 'var(--radius-md)',
                  border: selectedTemplate === t.id ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                  backgroundColor: selectedTemplate === t.id ? 'var(--primary-light)' : 'var(--bg-tertiary)',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    height: '40px',
                    backgroundColor: '#ffffff',
                    borderRadius: '3px',
                    marginBottom: '4px',
                    border: '1px solid #cbd5e1',
                    padding: '3px',
                  }}
                >
                  <div style={{ height: '4px', width: '40%', background: t.previewColor, marginBottom: '2px' }}></div>
                  <div style={{ height: '2px', width: '70%', background: '#cbd5e1', marginBottom: '2px' }}></div>
                  <div style={{ height: '2px', width: '90%', background: '#e2e8f0' }}></div>
                </div>
                <div style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {t.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '0.5rem', width: '100%', gap: '8px' }}>
          <span>Create & Open in Builder</span>
          <ArrowRight size={16} />
        </button>
      </form>
    </Modal>
  );
};
