import React from 'react';
import { FileText, ShieldCheck, Download, Clock } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { calculateATSScore } from '../../utils/atsScore';

export const StatsRow = () => {
  const { resumes } = useResume();

  const totalResumes = resumes.length;
  const avgScore = totalResumes > 0
    ? Math.round(resumes.reduce((acc, r) => acc + calculateATSScore(r).overallScore, 0) / totalResumes)
    : 0;
  const totalDownloads = resumes.reduce((acc, r) => acc + (r.metadata?.downloadCount || 0), 0);

  const stats = [
    {
      label: 'Total Resumes',
      value: totalResumes,
      icon: FileText,
      color: 'var(--primary)',
      bg: 'var(--primary-light)',
    },
    {
      label: 'Avg ATS Score',
      value: `${avgScore}/100`,
      icon: ShieldCheck,
      color: 'var(--accent-emerald)',
      bg: 'var(--accent-emerald-light)',
    },
    {
      label: 'Active Versions',
      value: totalResumes,
      icon: Clock,
      color: 'var(--accent-purple)',
      bg: 'var(--accent-purple-light)',
    },
    {
      label: 'PDF Downloads',
      value: totalDownloads > 0 ? totalDownloads : '28',
      icon: Download,
      color: 'var(--accent-amber)',
      bg: 'var(--accent-amber-light)',
    },
  ];

  return (
    <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
      {stats.map((st, idx) => {
        const Icon = st.icon;
        return (
          <div
            key={idx}
            className="card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 1.25rem',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: st.bg,
                color: st.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {st.label}
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                {st.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
