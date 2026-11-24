import React from 'react';
import {
  LayoutDashboard, Edit3, FolderKanban, Palette, Sparkles,
  Settings, ChevronLeft, ChevronRight, Zap
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export const Sidebar = ({ currentView, setCurrentView, isCollapsed, setIsCollapsed, onOpenJobModal }) => {
  const { resumes } = useResume();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'builder', label: 'Resume Builder', icon: Edit3 },
    { id: 'my-resumes', label: 'My Resumes', icon: FolderKanban, badge: resumes.length },
    { id: 'templates', label: 'Templates Gallery', icon: Palette },
  ];

  return (
    <aside
      className={`app-sidebar no-print ${isCollapsed ? 'collapsed' : ''}`}
      style={{
        width: isCollapsed ? '64px' : '230px',
        backgroundColor: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width var(--transition-normal)',
        zIndex: 40,
        flexShrink: 0,
      }}
    >
      {/* Top Nav Items */}
      <div style={{ padding: '1rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`btn btn-ghost ${isActive ? 'active' : ''}`}
              style={{
                width: '100%',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                padding: '0.65rem 0.85rem',
                backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                border: '1px solid',
                borderColor: isActive ? 'rgba(59, 130, 246, 0.25)' : 'transparent',
                borderRadius: 'var(--radius-md)',
                position: 'relative',
              }}
              title={isCollapsed ? item.label : ''}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />
              {!isCollapsed && (
                <span style={{ fontSize: '0.86rem', flex: 1, textAlign: 'left', marginLeft: '6px' }}>
                  {item.label}
                </span>
              )}
              {!isCollapsed && item.badge !== undefined && (
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-muted)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* AI Optimizer Direct Trigger */}
        <button
          onClick={onOpenJobModal}
          className="btn btn-ghost"
          style={{
            width: '100%',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            padding: '0.65rem 0.85rem',
            color: 'var(--accent-purple)',
            fontWeight: 500,
            borderRadius: 'var(--radius-md)',
            marginTop: '4px'
          }}
          title={isCollapsed ? 'AI Job Matcher' : ''}
        >
          <Sparkles size={18} style={{ flexShrink: 0 }} />
          {!isCollapsed && (
            <span style={{ fontSize: '0.86rem', flex: 1, textAlign: 'left', marginLeft: '6px' }}>
              AI Job Matcher
            </span>
          )}
        </button>
      </div>

      {/* Bottom Pro Card & Collapse Toggle */}
      <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {!isCollapsed && (
          <div
            style={{
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>
              <Zap size={14} />
              <span>Pro Plan Active</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Unlimited AI generation, premium templates, & high-res PDF exports.
            </p>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="btn btn-ghost btn-sm"
          style={{
            width: '100%',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            color: 'var(--text-muted)',
            fontSize: '0.78rem'
          }}
        >
          {isCollapsed ? <ChevronRight size={16} /> : (
            <>
              <ChevronLeft size={16} />
              <span>Collapse Sidebar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
