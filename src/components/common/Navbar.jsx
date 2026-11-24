import React, { useState } from 'react';
import {
  FileText, Sparkles, CheckCircle, Clock, Plus, ChevronDown,
  User, Settings, LogOut, ShieldCheck, Moon, Sun, Target
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { useAuth } from '../../context/AuthContext';
import { calculateATSScore } from '../../utils/atsScore';

export const Navbar = ({ currentView, setCurrentView, onOpenCreateModal, onOpenATSModal, onOpenJobModal, onOpenSettingsModal }) => {
  const { activeResume, resumes, setActiveResumeId, autosaveStatus, lastSavedTime } = useResume();
  const { user, isAuthenticated, signOut, openAuthModal } = useAuth();
  const [isResumeMenuOpen, setIsResumeMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const atsScore = activeResume ? calculateATSScore(activeResume).overallScore : 0;

  const toggleTheme = () => {
    const nextTheme = isDarkMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header
      className="app-navbar no-print"
      style={{
        height: '60px',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.25rem',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Left: Brand + Active Resume Picker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div
          onClick={() => setCurrentView('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)'
            }}
          >
            <FileText size={18} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Resume<span style={{ color: 'var(--primary)' }}>Flow</span>
          </span>
        </div>

        {/* Resume Dropdown (Builder View) */}
        {currentView === 'builder' && activeResume && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsResumeMenuOpen(!isResumeMenuOpen)}
              className="btn btn-ghost btn-sm"
              style={{
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-tertiary)',
                padding: '0.35rem 0.75rem',
                gap: '6px'
              }}
            >
              <span style={{ fontWeight: 600, maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {activeResume.title}
              </span>
              <ChevronDown size={14} color="var(--text-muted)" />
            </button>

            {isResumeMenuOpen && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  top: '110%',
                  left: 0,
                  width: '240px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  boxShadow: 'var(--shadow-xl)',
                  padding: '6px',
                  zIndex: 100,
                }}
              >
                <div style={{ padding: '6px 8px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Switch Resume
                </div>
                {resumes.map(r => (
                  <div
                    key={r.id}
                    onClick={() => {
                      setActiveResumeId(r.id);
                      setIsResumeMenuOpen(false);
                    }}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: '0.84rem',
                      fontWeight: r.id === activeResume.id ? 600 : 400,
                      backgroundColor: r.id === activeResume.id ? 'var(--primary-light)' : 'transparent',
                      color: r.id === activeResume.id ? 'var(--primary)' : 'var(--text-primary)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.title}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {r.metadata?.completionScore || 0}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Center: Autosave Status & ATS Score Shortcut */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {currentView === 'builder' && (
          <>
            {/* Autosave Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {autosaveStatus === 'saving' ? (
                <>
                  <Clock size={14} className="animate-spin" color="var(--accent-amber)" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={14} color="var(--accent-emerald)" />
                  <span className="hide-mobile">Saved at {lastSavedTime}</span>
                </>
              )}
            </div>

            {/* ATS Score Button */}
            <button
              onClick={onOpenATSModal}
              className="btn btn-outline btn-sm"
              style={{
                gap: '6px',
                borderColor: atsScore >= 80 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)',
                backgroundColor: atsScore >= 80 ? 'var(--accent-emerald-light)' : 'var(--accent-amber-light)',
                color: atsScore >= 80 ? 'var(--accent-emerald)' : 'var(--accent-amber)'
              }}
              title="Click to view ATS Score breakdown and suggestions"
            >
              <ShieldCheck size={15} />
              <span>ATS Score: <strong>{atsScore}/100</strong></span>
            </button>

            {/* Job Matcher Button */}
            <button
              onClick={onOpenJobModal}
              className="btn btn-secondary btn-sm hide-mobile"
              style={{ gap: '6px' }}
              title="Match against a Job Description"
            >
              <Target size={14} color="var(--primary)" />
              <span>Job Matcher</span>
            </button>
          </>
        )}
      </div>

      {/* Right: Actions, Theme, & User Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={onOpenCreateModal}
          className="btn btn-primary btn-sm"
          style={{ gap: '6px' }}
        >
          <Plus size={15} />
          <span className="hide-mobile">New Resume</span>
        </button>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-icon btn-sm"
          title="Toggle Light / Dark Mode"
        >
          {isDarkMode ? <Sun size={17} color="var(--accent-amber)" /> : <Moon size={17} />}
        </button>

        {/* User Profile */}
        <div style={{ position: 'relative' }}>
          {isAuthenticated ? (
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '2px',
              }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--border-medium)' }}
              />
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('signin')}
              className="btn btn-outline btn-sm"
            >
              Sign In
            </button>
          )}

          {isUserMenuOpen && isAuthenticated && (
            <div
              className="card"
              style={{
                position: 'absolute',
                top: '115%',
                right: 0,
                width: '210px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-medium)',
                boxShadow: 'var(--shadow-xl)',
                padding: '8px',
                zIndex: 100,
              }}
            >
              <div style={{ padding: '8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '6px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  {user.name}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  {user.email}
                </div>
                <span className="badge badge-primary" style={{ marginTop: '6px', fontSize: '0.65rem' }}>
                  {user.plan}
                </span>
              </div>

              <div
                onClick={() => {
                  onOpenSettingsModal();
                  setIsUserMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 10px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontSize: '0.83rem',
                  color: 'var(--text-primary)',
                }}
              >
                <Settings size={15} color="var(--text-muted)" />
                <span>Account Settings</span>
              </div>

              <div
                onClick={() => {
                  signOut();
                  setIsUserMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 10px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontSize: '0.83rem',
                  color: 'var(--accent-rose)',
                }}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
