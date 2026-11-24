import React, { useState } from 'react';
import {
  Edit3, Copy, Trash2, Download, MoreVertical, ShieldCheck,
  Calendar, Check, FileEdit, ExternalLink
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { ConfirmationDialog } from '../common/ConfirmationDialog';
import { calculateATSScore } from '../../utils/atsScore';
import { exportResumeToPDF } from '../../utils/pdfExport';

export const ResumeCard = ({ resume, onEdit, isListView = false }) => {
  const { duplicateResume, deleteResume, renameResume, showToast } = useResume();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(resume.title);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const ats = calculateATSScore(resume);
  const score = ats.overallScore;

  const handleSaveRename = () => {
    if (newTitle.trim()) {
      renameResume(resume.id, newTitle.trim());
      setIsRenaming(false);
    }
  };

  const handleQuickDownload = async (e) => {
    e.stopPropagation();
    setIsExporting(true);
    showToast(`Generating PDF for ${resume.title}...`, 'info');
    try {
      // Let user open builder or trigger direct download
      onEdit(resume.id);
      showToast('Opened builder for instant PDF export', 'success');
    } catch (err) {
      showToast('Error exporting resume', 'danger');
    } finally {
      setIsExporting(false);
    }
  };

  const formattedDate = resume.metadata?.updatedAt
    ? new Date(resume.metadata.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recent';

  if (isListView) {
    return (
      <>
        <div
          className="card card-interactive"
          onClick={() => onEdit(resume.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.85rem 1.25rem',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
            <div
              style={{
                width: '38px',
                height: '48px',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
                flexShrink: 0,
                fontSize: '10px',
                fontWeight: 700
              }}
            >
              {resume.templateId?.toUpperCase()?.slice(0, 3) || 'CV'}
            </div>
            <div style={{ minWidth: 0 }}>
              {isRenaming ? (
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
                  <input
                    type="text"
                    className="form-input"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.85rem' }}
                    autoFocus
                  />
                  <button className="btn btn-primary btn-sm" onClick={handleSaveRename}>Save</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setIsRenaming(false)}>Cancel</button>
                </div>
              ) : (
                <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {resume.title}
                </h4>
              )}
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                <span>{resume.personalInfo?.professionalTitle || resume.targetRole || 'No role set'}</span>
                <span>•</span>
                <span>Updated {formattedDate}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span
              className="badge"
              style={{
                backgroundColor: score >= 80 ? 'var(--accent-emerald-light)' : 'var(--accent-amber-light)',
                color: score >= 80 ? 'var(--accent-emerald)' : 'var(--accent-amber)',
              }}
            >
              <ShieldCheck size={12} />
              {score}% ATS Score
            </span>

            <button
              className="btn btn-secondary btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(resume.id);
              }}
            >
              <Edit3 size={14} />
              <span>Edit</span>
            </button>

            <button
              className="btn btn-ghost btn-icon btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                duplicateResume(resume.id);
              }}
              title="Duplicate"
            >
              <Copy size={15} />
            </button>

            <button
              className="btn btn-ghost btn-icon btn-sm"
              style={{ color: 'var(--accent-rose)' }}
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(true);
              }}
              title="Delete"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>

        <ConfirmationDialog
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={() => deleteResume(resume.id)}
          title="Delete Resume"
          message={`Are you sure you want to permanently delete "${resume.title}"? This action cannot be undone.`}
        />
      </>
    );
  }

  return (
    <>
      <div
        className="card card-interactive"
        onClick={() => onEdit(resume.id)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          padding: '1.25rem',
          height: '270px',
        }}
      >
        {/* Top Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            {isRenaming ? (
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '4px' }} onClick={e => e.stopPropagation()}>
                <input
                  type="text"
                  className="form-input"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  style={{ padding: '0.2rem 0.5rem', fontSize: '0.82rem' }}
                  autoFocus
                />
                <button className="btn btn-primary btn-sm" onClick={handleSaveRename}><Check size={12} /></button>
              </div>
            ) : (
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {resume.title}
              </h3>
            )}
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {resume.personalInfo?.professionalTitle || resume.targetRole || 'Untitled Target Role'}
            </p>
          </div>

          {/* Context Dropdown Menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="btn btn-ghost btn-icon btn-sm"
            >
              <MoreVertical size={16} />
            </button>

            {isMenuOpen && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  width: '160px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  boxShadow: 'var(--shadow-xl)',
                  padding: '4px',
                  zIndex: 20,
                }}
                onClick={e => e.stopPropagation()}
              >
                <div
                  onClick={() => {
                    setIsRenaming(true);
                    setIsMenuOpen(false);
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', fontSize: '0.82rem', cursor: 'pointer', borderRadius: '4px', color: 'var(--text-primary)' }}
                >
                  <FileEdit size={14} />
                  <span>Rename</span>
                </div>

                <div
                  onClick={() => {
                    duplicateResume(resume.id);
                    setIsMenuOpen(false);
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', fontSize: '0.82rem', cursor: 'pointer', borderRadius: '4px', color: 'var(--text-primary)' }}
                >
                  <Copy size={14} />
                  <span>Duplicate</span>
                </div>

                <div
                  onClick={() => {
                    setShowDeleteConfirm(true);
                    setIsMenuOpen(false);
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', fontSize: '0.82rem', cursor: 'pointer', borderRadius: '4px', color: 'var(--accent-rose)' }}
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Preview Simulator */}
        <div
          style={{
            margin: '0.75rem 0',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            height: '95px',
            padding: '8px 10px',
            overflow: 'hidden',
            position: 'relative',
            opacity: 0.9,
          }}
        >
          <div style={{ height: '6px', width: '35%', background: resume.styling?.accentColor || '#2563eb', borderRadius: '2px', marginBottom: '6px' }}></div>
          <div style={{ height: '3px', width: '60%', background: '#cbd5e1', borderRadius: '1px', marginBottom: '4px' }}></div>
          <div style={{ height: '3px', width: '80%', background: '#e2e8f0', borderRadius: '1px', marginBottom: '8px' }}></div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            <div>
              <div style={{ height: '3px', width: '40%', background: '#94a3b8', marginBottom: '3px' }}></div>
              <div style={{ height: '2px', width: '90%', background: '#e2e8f0', marginBottom: '2px' }}></div>
              <div style={{ height: '2px', width: '75%', background: '#e2e8f0' }}></div>
            </div>
            <div>
              <div style={{ height: '3px', width: '40%', background: '#94a3b8', marginBottom: '3px' }}></div>
              <div style={{ height: '2px', width: '90%', background: '#e2e8f0', marginBottom: '2px' }}></div>
              <div style={{ height: '2px', width: '75%', background: '#e2e8f0' }}></div>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Quick Actions */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span
              className="badge"
              style={{
                backgroundColor: score >= 80 ? 'var(--accent-emerald-light)' : 'var(--accent-amber-light)',
                color: score >= 80 ? 'var(--accent-emerald)' : 'var(--accent-amber)',
              }}
            >
              <ShieldCheck size={12} />
              {score}% ATS Score
            </span>

            <span className="badge badge-primary" style={{ textTransform: 'capitalize' }}>
              {resume.templateId || 'Modern'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              <Calendar size={13} />
              <span>{formattedDate}</span>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(resume.id);
                }}
                style={{ padding: '0.3rem 0.65rem' }}
              >
                <Edit3 size={13} />
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => deleteResume(resume.id)}
        title="Delete Resume"
        message={`Are you sure you want to permanently delete "${resume.title}"? This action cannot be undone.`}
      />
    </>
  );
};
