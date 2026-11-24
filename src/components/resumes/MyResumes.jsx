import React, { useState } from 'react';
import {
  LayoutGrid, List, Search, Plus, Filter, ArrowUpDown,
  Upload, Download, FileText
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { ResumeCard } from '../dashboard/ResumeCard';
import { calculateATSScore } from '../../utils/atsScore';

export const MyResumes = ({ onEditResume, onOpenCreateModal }) => {
  const { resumes, setActiveResumeId, importResumeJSON, showToast } = useResume();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('updated'); // 'updated' | 'title' | 'score'
  const [roleFilter, setRoleFilter] = useState('all');

  // Extract unique roles for filtering
  const allRoles = Array.from(new Set(resumes.map(r => r.personalInfo?.professionalTitle || r.targetRole).filter(Boolean)));

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result);
        importResumeJSON(json);
      } catch (err) {
        showToast('Invalid JSON file format', 'danger');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const filteredAndSortedResumes = resumes
    .filter(r => {
      const matchSearch =
        (r.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.targetRole || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.personalInfo?.fullName || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const role = r.personalInfo?.professionalTitle || r.targetRole;
      const matchRole = roleFilter === 'all' || role === roleFilter;

      return matchSearch && matchRole;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'score') return calculateATSScore(b).overallScore - calculateATSScore(a).overallScore;
      // Default 'updated'
      const dateA = new Date(a.metadata?.updatedAt || 0).getTime();
      const dateB = new Date(b.metadata?.updatedAt || 0).getTime();
      return dateB - dateA;
    });

  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: '1300px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Resume Manager
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Organize, duplicate, and tailor specific resume variations for your job applications ({resumes.length} saved)
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {/* JSON Import button */}
          <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', gap: '6px' }}>
            <Upload size={14} />
            <span>Import JSON</span>
            <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>

          <button onClick={onOpenCreateModal} className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
            <Plus size={15} />
            <span>Create New</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Search, Filters, View Modes */}
      <div
        className="card"
        style={{
          padding: '0.75rem 1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '240px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.1rem', fontSize: '0.82rem', height: '36px' }}
              placeholder="Search resumes by title or role..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          {/* Filter by Role */}
          {allRoles.length > 1 && (
            <select
              className="form-select"
              style={{ width: 'auto', fontSize: '0.82rem', height: '36px' }}
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles ({resumes.length})</option>
              {allRoles.map((role, idx) => (
                <option key={idx} value={role}>{role}</option>
              ))}
            </select>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Sort By */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowUpDown size={14} color="var(--text-muted)" />
            <select
              className="form-select"
              style={{ width: 'auto', fontSize: '0.82rem', height: '36px' }}
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="updated">Recently Edited</option>
              <option value="score">Highest ATS Score</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div style={{ display: 'flex', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '2px' }}>
            <button
              className={`btn btn-ghost btn-icon btn-sm ${viewMode === 'grid' ? 'active' : ''}`}
              style={{ backgroundColor: viewMode === 'grid' ? 'var(--bg-secondary)' : 'transparent', color: viewMode === 'grid' ? 'var(--primary)' : 'var(--text-muted)' }}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              className={`btn btn-ghost btn-icon btn-sm ${viewMode === 'list' ? 'active' : ''}`}
              style={{ backgroundColor: viewMode === 'list' ? 'var(--bg-secondary)' : 'transparent', color: viewMode === 'list' ? 'var(--primary)' : 'var(--text-muted)' }}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Resumes Content List / Grid */}
      {filteredAndSortedResumes.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid-3">
            {filteredAndSortedResumes.map(resume => (
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredAndSortedResumes.map(resume => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                isListView={true}
                onEdit={(id) => {
                  setActiveResumeId(id);
                  onEditResume();
                }}
              />
            ))}
          </div>
        )
      ) : (
        <div
          className="card"
          style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            border: '2px dashed var(--border-medium)',
          }}
        >
          <FileText size={44} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            No matching resumes
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.5rem auto 1.5rem', maxWidth: '380px' }}>
            Try clearing your search query or create a fresh targeted resume version.
          </p>
          <button onClick={onOpenCreateModal} className="btn btn-primary" style={{ gap: '6px' }}>
            <Plus size={15} />
            <span>Create New Resume</span>
          </button>
        </div>
      )}
    </div>
  );
};
