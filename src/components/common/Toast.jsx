import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export const ToastContainer = () => {
  const { toast } = useResume();
  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'danger':
        return <AlertCircle size={18} color="var(--accent-rose)" />;
      case 'info':
        return <Info size={18} color="var(--primary)" />;
      case 'success':
      default:
        return <CheckCircle2 size={18} color="var(--accent-emerald)" />;
    }
  };

  return (
    <div
      className="toast-container"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <div
        className="card"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '0.75rem 1.1rem',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-xl)',
          borderRadius: 'var(--radius-md)',
          minWidth: '280px',
          maxWidth: '420px',
        }}
      >
        {getIcon()}
        <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', flex: 1, fontWeight: 500 }}>
          {toast.message}
        </span>
      </div>
    </div>
  );
};
