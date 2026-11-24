import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export const CorporateTemplate = ({ resume, styling }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, achievements, languages, customSections, sections } = resume;
  const accent = styling?.accentColor || '#0f766e';

  const renderSection = (sec) => {
    if (!sec.visible) return null;

    switch (sec.type) {
      case 'summary':
        if (!summary?.trim()) return null;
        return (
          <div key={sec.id} style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif, Merriweather, Georgia, serif)', fontSize: '1.05rem', fontWeight: 700, color: accent, borderBottom: `1.5px solid ${accent}`, paddingBottom: '3px', marginBottom: '8px' }}>
              {sec.title || 'Executive Summary'}
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: '1.65', fontStyle: 'normal' }}>
              {summary}
            </p>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key={sec.id} style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif, Merriweather, Georgia, serif)', fontSize: '1.05rem', fontWeight: 700, color: accent, borderBottom: `1.5px solid ${accent}`, paddingBottom: '3px', marginBottom: '10px' }}>
              {sec.title || 'Professional Leadership & Experience'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {experience.map(exp => (
                <div key={exp.id} style={{ borderLeft: `2px solid ${accent}30`, paddingLeft: '12px', marginLeft: '2px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                      {exp.jobTitle}
                    </h3>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>
                      {exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 600, color: accent, marginBottom: '4px' }}>
                    {exp.company} {exp.location ? `• ${exp.location}` : ''}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul style={{ paddingLeft: '1rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {exp.bullets.map((b, idx) => b?.trim() ? (
                        <li key={idx} style={{ fontSize: '0.84rem', color: '#334155', lineHeight: '1.5' }}>
                          {b}
                        </li>
                      ) : null)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key={sec.id} style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif, Merriweather, Georgia, serif)', fontSize: '1.05rem', fontWeight: 700, color: accent, borderBottom: `1.5px solid ${accent}`, paddingBottom: '3px', marginBottom: '8px' }}>
              {sec.title || 'Core Competencies & Expertise'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', fontSize: '0.83rem', color: '#1e293b' }}>
              {skills.map(s => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '5px', height: '5px', background: accent, borderRadius: '50%' }}></span>
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key={sec.id} style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif, Merriweather, Georgia, serif)', fontSize: '1.05rem', fontWeight: 700, color: accent, borderBottom: `1.5px solid ${accent}`, paddingBottom: '3px', marginBottom: '8px' }}>
              {sec.title || 'Strategic Initiatives & Projects'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {projects.map(proj => (
                <div key={proj.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
                    <span>{proj.name}</span>
                    {proj.technologies && <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>{proj.technologies.join(', ')}</span>}
                  </div>
                  {proj.description && <p style={{ fontSize: '0.83rem', color: '#334155', margin: '2px 0' }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key={sec.id} style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif, Merriweather, Georgia, serif)', fontSize: '1.05rem', fontWeight: 700, color: accent, borderBottom: `1.5px solid ${accent}`, paddingBottom: '3px', marginBottom: '8px' }}>
              {sec.title || 'Academic Credentials'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {education.map(edu => (
                <div key={edu.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>
                      {edu.degree} — {edu.institution}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {edu.graduationDate || `${edu.startDate || ''} - ${edu.graduationDate || ''}`}
                    </span>
                  </div>
                  {edu.honors && <div style={{ fontSize: '0.8rem', color: '#475569', fontStyle: 'italic' }}>{edu.honors}</div>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key={sec.id} style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif, Merriweather, Georgia, serif)', fontSize: '1.05rem', fontWeight: 700, color: accent, borderBottom: `1.5px solid ${accent}`, paddingBottom: '3px', marginBottom: '6px' }}>
              {sec.title || 'Certifications & Governance'}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '0.83rem' }}>
              {certifications.map(cert => (
                <span key={cert.id} style={{ color: '#1e293b' }}>
                  <strong>{cert.name}</strong> ({cert.organization})
                </span>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="corporate-template-root" style={{ width: '100%', height: '100%' }}>
      {/* Executive Header Box */}
      <header style={{ background: '#0f172a', color: '#ffffff', padding: '1.25rem 1.5rem', borderRadius: '4px', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif, Merriweather, Georgia, serif)', fontSize: '1.85rem', fontWeight: 700, margin: 0, letterSpacing: '0.01em' }}>
              {personalInfo?.fullName || 'Full Name'}
            </h1>
            <p style={{ fontSize: '1rem', color: '#93c5fd', marginTop: '3px', fontWeight: 500 }}>
              {personalInfo?.professionalTitle || 'Executive Title'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '12px', fontSize: '0.8rem', color: '#cbd5e1', borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '8px' }}>
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
          {personalInfo?.linkedin && <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/')}</span>}
          {personalInfo?.website && <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </header>

      <main>
        {(sections || []).map(sec => sec.type !== 'personalInfo' && renderSection(sec))}
      </main>
    </div>
  );
};
