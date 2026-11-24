import React from 'react';
import { Award, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';

export const CertificationsSection = () => {
  const { activeResume, updateActiveResume, showToast } = useResume();
  const certifications = activeResume?.certifications || [];

  const handleAddCert = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: '',
      organization: '',
      issueDate: '',
      expirationDate: '',
      credentialId: '',
      credentialUrl: ''
    };
    updateActiveResume(prev => ({
      ...prev,
      certifications: [...(prev.certifications || []), newCert]
    }));
    showToast('Added certification entry', 'info');
  };

  const handleUpdateCert = (id, field, value) => {
    updateActiveResume(prev => ({
      ...prev,
      certifications: (prev.certifications || []).map(c =>
        c.id === id ? { ...c, [field]: value } : c
      )
    }));
  };

  const handleDeleteCert = (id) => {
    updateActiveResume(prev => ({
      ...prev,
      certifications: (prev.certifications || []).filter(c => c.id !== id)
    }));
    showToast('Certification deleted', 'info');
  };

  return (
    <div className="section-editor-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} color="var(--primary)" />
            <span>Certifications & Licenses</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Professional credentials, vendor certificates (AWS, GCP, CKA), and licenses.
          </p>
        </div>

        <button onClick={handleAddCert} className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
          <Plus size={15} />
          <span>Add Certification</span>
        </button>
      </div>

      {certifications.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--border-medium)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>
            No certifications added yet.
          </p>
          <button onClick={handleAddCert} className="btn btn-secondary btn-sm">
            + Add First Certification
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {certifications.map((cert, idx) => (
            <div
              key={cert.id}
              className="card"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-medium)',
                padding: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                  Certificate #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleDeleteCert(cert.id)}
                  className="btn btn-ghost btn-icon btn-sm"
                  style={{ color: 'var(--accent-rose)' }}
                  title="Delete Certification"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Certification Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. AWS Certified Solutions Architect"
                    value={cert.name || ''}
                    onChange={e => handleUpdateCert(cert.id, 'name', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Issuing Organization *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Amazon Web Services (AWS)"
                    value={cert.organization || ''}
                    onChange={e => handleUpdateCert(cert.id, 'organization', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid-3">
                <div className="form-group">
                  <label className="form-label">Issue Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 2023-04"
                    value={cert.issueDate || ''}
                    onChange={e => handleUpdateCert(cert.id, 'issueDate', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Credential ID</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. AWS-990812"
                    value={cert.credentialId || ''}
                    onChange={e => handleUpdateCert(cert.id, 'credentialId', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Verification URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://verify.link"
                    value={cert.credentialUrl || ''}
                    onChange={e => handleUpdateCert(cert.id, 'credentialUrl', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
