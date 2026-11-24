import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle } from 'lucide-react';

export const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title = 'Confirm Action', message = 'Are you sure you want to proceed?', confirmText = 'Delete', confirmVariant = 'danger' }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="440px"
      footer={
        <>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`btn btn-${confirmVariant} btn-sm`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </>
      }
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div style={{ padding: '8px', background: 'var(--accent-rose-light)', borderRadius: 'var(--radius-md)', color: 'var(--accent-rose)' }}>
          <AlertTriangle size={24} />
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
          {message}
        </p>
      </div>
    </Modal>
  );
};
