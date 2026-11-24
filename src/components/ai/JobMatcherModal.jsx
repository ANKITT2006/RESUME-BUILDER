import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Target, CheckCircle2, AlertCircle, Plus, Sparkles, Check } from 'lucide-react';
import { matchResumeWithJob } from '../../utils/keywordMatcher';
import { useResume } from '../../context/ResumeContext';

export const JobMatcherModal = ({ isOpen, onClose }) => {
  const { activeResume, updateActiveResume, showToast } = useResume();
  const [jobDescription, setJobDescription] = useState(activeResume?.targetJobDescription || '');
  const [matchResult, setMatchResult] = useState(() => matchResumeWithJob(activeResume, activeResume?.targetJobDescription || ''));

  const handleAnalyze = () => {
    updateActiveResume(prev => ({ ...prev, targetJobDescription: jobDescription }));
    const res = matchResumeWithJob(activeResume, jobDescription);
    setMatchResult(res);
    showToast('Job Description keywords analyzed!', 'success');
  };

  const handleAddMissingSkill = (skill) => {
    const existing = activeResume?.skills || [];
    if (existing.some(s => s.name.toLowerCase() === skill.toLowerCase())) {
      showToast(`${skill} is already listed`, 'info');
      return;
    }

    const newSkill = {
      id: `sk-jd-${Date.now()}`,
      name: skill,
      category: 'Target Job Skills',
      level: 90
    };

    updateActiveResume(prev => ({
      ...prev,
      skills: [...(prev.skills || []), newSkill]
    }));

    // Re-run match
    setTimeout(() => {
      const updated = {
        ...activeResume,
        skills: [...existing, newSkill]
      };
      setMatchResult(matchResumeWithJob(updated, jobDescription));
    }, 100);

    showToast(`Added "${skill}" to your resume skills!`, 'success');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Target Job Description Matcher & Keyword Optimizer"
      maxWidth="720px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
          Paste the job posting description below. We'll analyze key technical skills, responsibilities, and ATS keywords to measure your match score.
        </p>

        {/* Textarea for Job Description */}
        <div className="form-group" style={{ margin: 0 }}>
          <textarea
            className="form-textarea"
            style={{ minHeight: '110px', fontSize: '0.85rem' }}
            placeholder="Paste full Job Description (e.g. 'We are looking for a Senior Full-Stack Engineer with React, TypeScript, Node.js, AWS, Kubernetes, and GraphQL...')"
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
            <button
              type="button"
              onClick={handleAnalyze}
              className="btn btn-primary btn-sm"
              style={{ gap: '6px' }}
            >
              <Target size={14} />
              <span>Analyze & Match Keywords</span>
            </button>
          </div>
        </div>

        {/* Results section */}
        {matchResult && matchResult.totalKeywordsCount > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
            {/* Match Rate Card */}
            <div
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.25rem',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-medium)',
              }}
            >
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Keyword Match Rating
                </div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: matchResult.matchScore >= 75 ? 'var(--accent-emerald)' : 'var(--accent-amber)', marginTop: '2px' }}>
                  {matchResult.matchScore}% Keyword Overlap
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {matchResult.summary}
                </p>
              </div>

              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: matchResult.matchScore >= 75 ? 'var(--accent-emerald-light)' : 'var(--accent-amber-light)',
                  color: matchResult.matchScore >= 75 ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  border: `2px solid ${matchResult.matchScore >= 75 ? 'var(--accent-emerald)' : 'var(--accent-amber)'}`,
                }}
              >
                {matchResult.matchScore}%
              </div>
            </div>

            {/* Matched Keywords */}
            {matchResult.matchedKeywords.length > 0 && (
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <CheckCircle2 size={16} />
                  <span>Strong Keyword Coverage ({matchResult.matchedKeywords.length} found)</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {matchResult.matchedKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'var(--accent-emerald-light)',
                        color: 'var(--accent-emerald)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: 'var(--radius-full)',
                        padding: '3px 9px',
                        fontSize: '0.78rem',
                        fontWeight: 600
                      }}
                    >
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Keywords with 1-click Add */}
            {matchResult.missingKeywords.length > 0 && (
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <AlertCircle size={16} />
                  <span>Missing Keywords from JD ({matchResult.missingKeywords.length} missing — click to add)</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {matchResult.missingKeywords.map((kw, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddMissingSkill(kw)}
                      className="btn btn-secondary btn-sm"
                      style={{
                        fontSize: '0.78rem',
                        padding: '3px 9px',
                        borderRadius: 'var(--radius-full)',
                        gap: '4px'
                      }}
                      title="Add to Resume Skills"
                    >
                      <Plus size={12} color="var(--primary)" />
                      <span>{kw}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
