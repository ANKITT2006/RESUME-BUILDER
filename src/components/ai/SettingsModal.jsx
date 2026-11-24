import React from 'react';
import { Modal } from '../common/Modal';
import { Settings, User, Download, RefreshCw, Trash2, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useResume } from '../../context/ResumeContext';
import { exportResumeToJSON } from '../../utils/pdfExport';
import { SAMPLE_RESUMES } from '../../data/sampleResumes';

export const SettingsModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { activeResume, resumes, showToast } = useResume();

  const handleExportAllJSON = () => {
    exportResumeToJSON(activeResume);
    showToast('Exported active resume as JSON backup', 'success');
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset all resumes to default demo profiles? This will overwrite local changes.')) {
      localStorage.setItem('resumeflow_resumes', JSON.stringify(SAMPLE_RESUMES));
      window.location.reload();
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all local application data?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Application & Account Settings"
      maxWidth="540px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Profile Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt="Avatar"
            style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
              {user?.name || 'Professional User'}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {user?.email || 'user@careerflow.io'}
            </div>
            <span className="badge badge-primary" style={{ marginTop: '4px', fontSize: '0.68rem' }}>
              {user?.plan || 'Pro Lifetime Plan'}
            </span>
          </div>
        </div>

        {/* Backup & Data Controls */}
        <div>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            Data Management & Backups
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Backup Current Resume (JSON)
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Download a JSON file containing all sections and styling.
                </div>
              </div>
              <button onClick={handleExportAllJSON} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
                <Download size={14} />
                <span>Export JSON</span>
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Restore Sample Profiles
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Reload Software Architect, PM, and Designer demo resumes.
                </div>
              </div>
              <button onClick={handleResetDemoData} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
                <RefreshCw size={14} />
                <span>Reset Demo</span>
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: 'var(--accent-rose-light)', border: '1px solid rgba(244, 63, 94, 0.2)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--accent-rose)' }}>
                  Clear Local Storage
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Wipe all browser cache and stored resumes.
                </div>
              </div>
              <button onClick={handleClearData} className="btn btn-danger btn-sm" style={{ gap: '6px' }}>
                <Trash2 size={14} />
                <span>Clear All</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
