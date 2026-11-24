import React from 'react';
import { Sparkles, Plus, Trash2, ExternalLink } from 'lucide-react';
import { useResume } from '../../../context/ResumeContext';

export const ProjectsSection = () => {
  const { activeResume, updateActiveResume, showToast } = useResume();
  const projects = activeResume?.projects || [];

  const handleAddProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      technologies: [],
      projectUrl: '',
      githubUrl: '',
      bullets: ['']
    };
    updateActiveResume(prev => ({
      ...prev,
      projects: [...(prev.projects || []), newProj]
    }));
    showToast('Added project entry', 'info');
  };

  const handleUpdateProj = (id, field, value) => {
    updateActiveResume(prev => ({
      ...prev,
      projects: (prev.projects || []).map(p =>
        p.id === id ? { ...p, [field]: value } : p
      )
    }));
  };

  const handleDeleteProj = (id) => {
    updateActiveResume(prev => ({
      ...prev,
      projects: (prev.projects || []).filter(p => p.id !== id)
    }));
    showToast('Project deleted', 'info');
  };

  const handleTechChange = (id, techString) => {
    const arr = techString.split(',').map(t => t.trim()).filter(Boolean);
    handleUpdateProj(id, 'technologies', arr);
  };

  return (
    <div className="section-editor-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--primary)" />
            <span>Key Projects & Portfolio Work</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Highlight software, case studies, open source repos, or notable client deliveries.
          </p>
        </div>

        <button onClick={handleAddProject} className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
          <Plus size={15} />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--border-medium)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>
            No projects added yet. Showcase your top technical or product builds.
          </p>
          <button onClick={handleAddProject} className="btn btn-secondary btn-sm">
            + Add First Project
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="card"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-medium)',
                padding: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                  Project #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleDeleteProj(proj.id)}
                  className="btn btn-ghost btn-icon btn-sm"
                  style={{ color: 'var(--accent-rose)' }}
                  title="Delete Project"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Project Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. OmniMesh Distributed Cache"
                    value={proj.name || ''}
                    onChange={e => handleUpdateProj(proj.id, 'name', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Technologies Used (Comma Separated)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Go, gRPC, Docker, Kubernetes"
                    value={(proj.technologies || []).join(', ')}
                    onChange={e => handleTechChange(proj.id, e.target.value)}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Live URL / Demo Link</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://myproject.dev"
                    value={proj.projectUrl || ''}
                    onChange={e => handleUpdateProj(proj.id, 'projectUrl', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">GitHub / Repository URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://github.com/username/project"
                    value={proj.githubUrl || ''}
                    onChange={e => handleUpdateProj(proj.id, 'githubUrl', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Project Summary & Impact</label>
                <textarea
                  className="form-textarea"
                  style={{ minHeight: '70px' }}
                  placeholder="e.g. Ultra-low latency distributed caching engine written in Go with RAFT consensus, achieving 120k req/sec..."
                  value={proj.description || ''}
                  onChange={e => handleUpdateProj(proj.id, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
