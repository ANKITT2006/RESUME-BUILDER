import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Sparkles, Check, Copy, Wand2, ArrowRight, RefreshCw } from 'lucide-react';
import { generateSummarySuggestions, enhanceBulletPoint } from '../../utils/aiAssistant';
import { useResume } from '../../context/ResumeContext';

export const AIAssistantModal = ({ isOpen, onClose, mode = 'summary', bulletContext = null }) => {
  const { activeResume, updateActiveResume, showToast } = useResume();
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'summary') {
        const sums = generateSummarySuggestions(activeResume);
        setSuggestions(sums);
        setSelectedIdx(0);
      } else if (mode === 'bullet' && bulletContext) {
        const bullets = enhanceBulletPoint(bulletContext.text, bulletContext.jobTitle);
        setSuggestions(bullets);
        setSelectedIdx(0);
      }
    }
  }, [isOpen, mode, bulletContext, activeResume]);

  const handleAccept = () => {
    const selected = suggestions[selectedIdx];
    if (!selected) return;

    if (mode === 'summary') {
      updateActiveResume(prev => ({
        ...prev,
        summary: selected.text
      }));
      showToast('Summary updated with AI suggestion!', 'success');
    } else if (mode === 'bullet' && bulletContext) {
      updateActiveResume(prev => ({
        ...prev,
        experience: (prev.experience || []).map(exp => {
          if (exp.id !== bulletContext.expId) return exp;
          const newBullets = [...(exp.bullets || [])];
          newBullets[bulletContext.bulletIdx] = selected.text;
          return { ...exp, bullets: newBullets };
        })
      }));
      showToast('Bullet point enhanced with STAR format!', 'success');
    }
    onClose();
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showToast('Copied text to clipboard', 'info');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'summary' ? 'AI Professional Summary Generator' : 'AI Achievement & STAR Bullet Enhancer'}
      maxWidth="680px"
      footer={
        <>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleAccept} style={{ gap: '6px' }}>
            <Check size={15} />
            <span>Accept & Replace</span>
          </button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', color: 'var(--primary)', fontSize: '0.82rem' }}>
          <Sparkles size={16} />
          <span>
            {mode === 'summary'
              ? 'Select the tone that best reflects your career trajectory and target position.'
              : 'Transformed into quantifiable STAR (Situation, Task, Action, Result) format.'}
          </span>
        </div>

        {/* Current original text if bullet */}
        {mode === 'bullet' && bulletContext?.text && (
          <div style={{ padding: '10px 12px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
              Original Bullet
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              {bulletContext.text}
            </div>
          </div>
        )}

        {/* AI Alternatives Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {suggestions.map((sug, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <div
                key={sug.id || idx}
                onClick={() => setSelectedIdx(idx)}
                className={`card ${isSelected ? 'active-border' : 'card-interactive'}`}
                style={{
                  padding: '1rem',
                  border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                  backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.08)' : 'var(--bg-secondary)',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: isSelected ? '5px solid var(--primary)' : '2px solid var(--border-medium)',
                        backgroundColor: '#ffffff',
                      }}
                    ></div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {sug.tone || sug.framework || `Variation ${idx + 1}`}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {sug.badge && <span className="badge badge-ai" style={{ fontSize: '0.65rem' }}>{sug.badge}</span>}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(sug.text);
                      }}
                      className="btn btn-ghost btn-icon btn-sm"
                      title="Copy text"
                    >
                      <Copy size={13} />
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-primary)', lineHeight: '1.6', paddingLeft: '26px' }}>
                  {sug.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
