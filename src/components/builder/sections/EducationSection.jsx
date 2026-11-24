import React from 'react';
import { BookOpen, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';

export const EducationSection = () => {
  const { activeResume, updateActiveResume, showToast } = useResume();
  const education = activeResume?.education || [];

  const handleAddEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      fieldOfStudy: '',
      startDate: '',
      graduationDate: '',
      gpa: '',
      honors: '',
      description: ''
    };
    updateActiveResume(prev => ({
      ...prev,
      education: [...(prev.education || []), newEdu]
    }));
    showToast('Added education entry', 'info');
  };

  const handleUpdateEdu = (id, field, value) => {
    updateActiveResume(prev => ({
      ...prev,
      education: (prev.education || []).map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const handleDeleteEdu = (id) => {
    updateActiveResume(prev => ({
      ...prev,
      education: (prev.education || []).filter(edu => edu.id !== id)
    }));
    showToast('Education entry deleted', 'info');
  };

  return (
    <div className="section-editor-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={18} color="var(--primary)" />
            <span>Education & Degrees</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Degrees, academic institutions, certifications, GPA, and honors.
          </p>
        </div>

        <button onClick={handleAddEducation} className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
          <Plus size={15} />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--border-medium)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>
            No education entries added yet.
          </p>
          <button onClick={handleAddEducation} className="btn btn-secondary btn-sm">
            + Add First Education
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {education.map((edu, idx) => (
            <div
              key={edu.id}
              className="card"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-medium)',
                padding: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                  Degree #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleDeleteEdu(edu.id)}
                  className="btn btn-ghost btn-icon btn-sm"
                  style={{ color: 'var(--accent-rose)' }}
                  title="Delete Education"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Degree / Certificate *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Master of Science in Computer Science"
                    value={edu.degree || ''}
                    onChange={e => handleUpdateEdu(edu.id, 'degree', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Institution / University *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. UC Berkeley / MIT"
                    value={edu.institution || ''}
                    onChange={e => handleUpdateEdu(edu.id, 'institution', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid-3">
                <div className="form-group">
                  <label className="form-label">Field of Study / Major</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Software Systems"
                    value={edu.fieldOfStudy || ''}
                    onChange={e => handleUpdateEdu(edu.id, 'fieldOfStudy', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Graduation Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. May 2022"
                    value={edu.graduationDate || ''}
                    onChange={e => handleUpdateEdu(edu.id, 'graduationDate', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Grade / GPA (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 3.9 / 4.0"
                    value={edu.gpa || ''}
                    onChange={e => handleUpdateEdu(edu.id, 'gpa', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Honors / Activities / Description (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Dean’s Honor List; President of Computing Society"
                  value={edu.honors || ''}
                  onChange={e => handleUpdateEdu(edu.id, 'honors', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
