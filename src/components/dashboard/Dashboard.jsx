import React, { useState } from 'react';
import { Plus, Sparkles, Layout, FileText, ArrowUpRight, Search, Zap, CheckCircle } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import { StatsRow } from './StatsRow';
import { ResumeCard } from './ResumeCard';
import { TEMPLATES } from '../../types/resume';

export const Dashboard = ({ onEditResume, onOpenCreateModal, onSelectTemplateView }) => {
  const { resumes, setActiveResumeId } = useResume();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResumes = resumes.filter(r =>
    (r.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.targetRole || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.personalInfo?.professionalTitle || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: '1300px', margin: '0 auto', width: '100%' }}>
      {/* Welcome Banner */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(139, 92, 246, 0.12) 50%, rgba(15, 23, 42, 0.6) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          padding: '2rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ zIndex: 1, maxWidth: '640px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--primary-light)', padding: '4px 10px', borderRadius: 'var(--radius-full)', color: 'var(--primary)', fontSize: '0.76rem', fontWeight: 700, marginBottom: '10px' }}>
            <Sparkles size={14} />
            <span>AI-POWERED RESUME SUITE</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Welcome back, {user?.name?.split(' ')[0] || 'Professional'} 👋
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.5' }}>
            Create recruiter-ready, ATS-optimized resumes in minutes. Customize typography, refine metrics with AI, and export high-resolution PDFs.
          </p>
        </div>

        <div style={{ zIndex: 1, display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={onOpenCreateModal}
            className="btn btn-primary btn-lg"
            style={{ gap: '8px', boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)' }}
          >
            <Plus size={18} />
            <span>+ Create New Resume</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <StatsRow />

      {/* Resume Management Header & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            My Active Resumes
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Manage and target versions for specific job opportunities
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ position: 'relative', width: '240px' }}>
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.1rem', fontSize: '0.82rem', height: '36px' }}
              placeholder="Search resumes..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <button
            onClick={onOpenCreateModal}
            className="btn btn-secondary btn-sm"
            style={{ height: '36px', gap: '6px' }}
          >
            <Plus size={14} />
            <span>New</span>
          </button>
        </div>
      </div>

      {/* Resumes Grid */}
      {filteredResumes.length > 0 ? (
        <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
          {filteredResumes.map(resume => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onEdit={(id) => {
                setActiveResumeId(id);
                onEditResume();
              }}
            />
          ))}
        </div>
      ) : (
        <div
          className="card"
          style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            marginBottom: '2.5rem',
            border: '2px dashed var(--border-medium)',
          }}
        >
          <FileText size={42} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            No resumes found
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0.5rem auto 1.5rem' }}>
            {searchQuery ? `No resume matched "${searchQuery}". Try a different keyword.` : 'Start building your first job-ready resume right now.'}
          </p>
          <button onClick={onOpenCreateModal} className="btn btn-primary" style={{ gap: '6px' }}>
            <Plus size={16} />
            <span>Create First Resume</span>
          </button>
        </div>
      )}

      {/* Professional Templates Showcase Strip */}
      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Explore Recruiter-Approved Templates
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Crafted with precision typography for modern ATS parsing and executive review
            </p>
          </div>
          <button
            onClick={onSelectTemplateView}
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--primary)', gap: '4px' }}
          >
            <span>View All Templates</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="grid-4">
          {TEMPLATES.slice(0, 4).map(tmpl => (
            <div
              key={tmpl.id}
              onClick={onSelectTemplateView}
              className="card card-interactive"
              style={{ padding: '1rem', cursor: 'pointer' }}
            >
              <div
                style={{
                  height: '110px',
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '10px',
                  padding: '10px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ height: '6px', width: '40%', background: tmpl.previewColor, borderRadius: '2px' }}></div>
                <div style={{ height: '3px', width: '80%', background: '#cbd5e1' }}></div>
                <div style={{ height: '3px', width: '65%', background: '#e2e8f0' }}></div>
                <div style={{ marginTop: 'auto', display: 'flex', gap: '4px' }}>
                  <div style={{ height: '3px', width: '30%', background: '#cbd5e1' }}></div>
                  <div style={{ height: '3px', width: '30%', background: '#cbd5e1' }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                  {tmpl.name}
                </span>
                <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
                  {tmpl.badge}
                </span>
              </div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
                {tmpl.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
