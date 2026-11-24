import React from 'react';
import { Modal } from '../common/Modal';
import { ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';
import { calculateATSScore } from '../../utils/atsScore';
import { useResume } from '../../context/ResumeContext';

export const ATSCheckerModal = ({ isOpen, onClose, onNavigateSection }) => {
  const { activeResume } = useResume();
  const ats = calculateATSScore(activeResume);
  const score = ats.overallScore;

  const getScoreBadge = () => {
    if (score >= 85) return { label: 'Top 5% Candidate Score (Exceptional)', color: 'var(--accent-emerald)', bg: 'var(--accent-emerald-light)' };
    if (score >= 70) return { label: 'Strong Recruiter Match (Good)', color: 'var(--primary)', bg: 'var(--primary-light)' };
    return { label: 'Needs Improvement for ATS Pass', color: 'var(--accent-amber)', bg: 'var(--accent-amber-light)' };
  };

  const badge = getScoreBadge();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ATS Resume Quality & Recruiter Readiness Audit"
      maxWidth="680px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Score Overview Card */}
        <div
          className="card"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.9) 100%)',
            border: '1px solid var(--border-medium)',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: badge.color, backgroundColor: badge.bg, padding: '3px 8px', borderRadius: 'var(--radius-full)', textTransform: 'uppercase' }}>
              {badge.label}
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
              Overall Score: {score} / 100
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Evaluated against modern Applicant Tracking System (ATS) parsers and recruiter heuristics.
            </p>
          </div>

          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: `6px solid ${score >= 80 ? 'var(--accent-emerald)' : 'var(--accent-amber)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              boxShadow: `0 0 20px ${score >= 80 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
            }}
          >
            {score}%
          </div>
        </div>

        {/* 5-Category Progress Breakdown */}
        <div>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Score Breakdown by Category
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Completeness & Contact Info', value: ats.breakdown.completeness, max: 25 },
              { label: 'Measurable Impact & Action Verbs', value: ats.breakdown.impact, max: 25 },
              { label: 'Skills Coverage & Depth', value: ats.breakdown.skills, max: 20 },
              { label: 'Readability & Conciseness', value: ats.breakdown.readability, max: 15 },
              { label: 'ATS Formatting & Structure', value: ats.breakdown.structure, max: 15 },
            ].map((cat, idx) => {
              const pct = Math.round((cat.value / cat.max) * 100);
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{cat.label}</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{cat.value} / {cat.max} pts ({pct}%)</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, backgroundColor: pct >= 80 ? 'var(--accent-emerald)' : pct >= 50 ? 'var(--primary)' : 'var(--accent-amber)', borderRadius: '3px' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Strengths */}
        {ats.strengths.length > 0 && (
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} />
              <span>Identified Strengths ({ats.strengths.length})</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {ats.strengths.map((str, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--accent-emerald)' }}>✓</span>
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actionable Improvement Recommendations */}
        {ats.suggestions.length > 0 && (
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-amber)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={16} />
              <span>Recommended Improvements ({ats.suggestions.length})</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ats.suggestions.map((sug, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    gap: '1rem',
                  }}
                >
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                    {sug.text}
                  </span>

                  {sug.sectionId && (
                    <button
                      onClick={() => {
                        onClose();
                        if (onNavigateSection) onNavigateSection(sug.sectionId);
                      }}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.74rem', padding: '3px 8px', flexShrink: 0, gap: '4px' }}
                    >
                      <span>Fix Now</span>
                      <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
