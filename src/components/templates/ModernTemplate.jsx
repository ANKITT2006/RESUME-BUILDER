import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Award, BookOpen, Briefcase, Code, User, Sparkles } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/BrandIcons';

export const ModernTemplate = ({ resume, styling }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, achievements, languages, customSections, sections } = resume;
  const accent = styling?.accentColor || '#2563eb';

  // Helper to render sections in dynamic ordered sequence
  const renderSection = (sec) => {
    if (!sec.visible) return null;

    switch (sec.type) {
      case 'summary':
        if (!summary?.trim()) return null;
        return (
          <div key={sec.id} className="template-section" style={{ marginBottom: 'var(--item-gap, 1.25rem)' }}>
            <h2 className="section-heading" style={{ color: accent, borderBottom: `2px solid ${accent}25`, paddingBottom: '4px', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <User size={16} />
              {sec.title || 'Professional Summary'}
            </h2>
            <p style={{ color: '#334155', fontSize: '0.88rem', lineHeight: '1.6', textAlign: 'justify' }}>
              {summary}
            </p>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key={sec.id} className="template-section" style={{ marginBottom: 'var(--item-gap, 1.25rem)' }}>
            <h2 className="section-heading" style={{ color: accent, borderBottom: `2px solid ${accent}25`, paddingBottom: '4px', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Briefcase size={16} />
              {sec.title || 'Work Experience'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {experience.map(exp => (
                <div key={exp.id} className="exp-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                      {exp.jobTitle || 'Job Title'}
                    </h3>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>
                      {exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate || 'Date'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.86rem', fontWeight: 600, color: accent }}>
                      {exp.company || 'Company Name'}
                    </span>
                    {exp.location && (
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{exp.location}</span>
                    )}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
          <div key={sec.id} className="template-section" style={{ marginBottom: 'var(--item-gap, 1.25rem)' }}>
            <h2 className="section-heading" style={{ color: accent, borderBottom: `2px solid ${accent}25`, paddingBottom: '4px', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Code size={16} />
              {sec.title || 'Skills & Proficiencies'}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map(s => (
                <span
                  key={s.id}
                  style={{
                    background: `${accent}12`,
                    color: '#0f172a',
                    border: `1px solid ${accent}35`,
                    borderRadius: '4px',
                    padding: '3px 8px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                  }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key={sec.id} className="template-section" style={{ marginBottom: 'var(--item-gap, 1.25rem)' }}>
            <h2 className="section-heading" style={{ color: accent, borderBottom: `2px solid ${accent}25`, paddingBottom: '4px', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Sparkles size={16} />
              {sec.title || 'Key Projects'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {projects.map(proj => (
                <div key={proj.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {proj.name}
                      {proj.projectUrl && (
                        <a href={proj.projectUrl} target="_blank" rel="noreferrer" style={{ color: accent, textDecoration: 'none' }}>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </h3>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
                        {proj.technologies.join(' • ')}
                      </span>
                    )}
                  </div>
                  {proj.description && (
                    <p style={{ fontSize: '0.83rem', color: '#334155', margin: '3px 0 4px', lineHeight: '1.45' }}>
                      {proj.description}
                    </p>
                  )}
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                      {proj.bullets.map((b, idx) => b?.trim() ? (
                        <li key={idx} style={{ fontSize: '0.82rem', color: '#334155', lineHeight: '1.45' }}>
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

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key={sec.id} className="template-section" style={{ marginBottom: 'var(--item-gap, 1.25rem)' }}>
            <h2 className="section-heading" style={{ color: accent, borderBottom: `2px solid ${accent}25`, paddingBottom: '4px', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <BookOpen size={16} />
              {sec.title || 'Education'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {education.map(edu => (
                <div key={edu.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>
                      {edu.degree || 'Degree'}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                      {edu.graduationDate || `${edu.startDate || ''} - ${edu.graduationDate || ''}`}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: '#475569' }}>
                    <span style={{ fontWeight: 600, color: accent }}>{edu.institution}</span>
                    {edu.location && <span>{edu.location}</span>}
                  </div>
                  {edu.gpa && <div style={{ fontSize: '0.8rem', color: '#64748b' }}>GPA: {edu.gpa}</div>}
                  {edu.honors && <div style={{ fontSize: '0.8rem', color: '#334155', fontStyle: 'italic' }}>{edu.honors}</div>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key={sec.id} className="template-section" style={{ marginBottom: 'var(--item-gap, 1.25rem)' }}>
            <h2 className="section-heading" style={{ color: accent, borderBottom: `2px solid ${accent}25`, paddingBottom: '4px', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Award size={16} />
              {sec.title || 'Certifications'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {certifications.map(cert => (
                <div key={cert.id} style={{ fontSize: '0.83rem' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{cert.name}</div>
                  <div style={{ color: '#64748b', fontSize: '0.78rem' }}>
                    {cert.organization} {cert.issueDate ? `• ${cert.issueDate}` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'achievements':
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key={sec.id} className="template-section" style={{ marginBottom: 'var(--item-gap, 1.25rem)' }}>
            <h2 className="section-heading" style={{ color: accent, borderBottom: `2px solid ${accent}25`, paddingBottom: '4px', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Award size={16} />
              {sec.title || 'Key Achievements'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {achievements.map(ach => (
                <div key={ach.id} style={{ fontSize: '0.84rem' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{ach.title}</span> — <span style={{ color: '#475569' }}>{ach.description}</span>
                  {ach.date && <span style={{ color: '#64748b', fontSize: '0.78rem' }}> ({ach.date})</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key={sec.id} className="template-section" style={{ marginBottom: 'var(--item-gap, 1.25rem)' }}>
            <h2 className="section-heading" style={{ color: accent, borderBottom: `2px solid ${accent}25`, paddingBottom: '4px', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.02em', marginBottom: '6px' }}>
              {sec.title || 'Languages'}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.83rem' }}>
              {languages.map(l => (
                <div key={l.id}>
                  <strong style={{ color: '#0f172a' }}>{l.language}</strong>: <span style={{ color: '#64748b' }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'custom':
        const customEntry = (customSections || []).find(c => c.id === sec.id);
        if (!customEntry || !customEntry.items || customEntry.items.length === 0) return null;
        return (
          <div key={sec.id} className="template-section" style={{ marginBottom: 'var(--item-gap, 1.25rem)' }}>
            <h2 className="section-heading" style={{ color: accent, borderBottom: `2px solid ${accent}25`, paddingBottom: '4px', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.02em', marginBottom: '8px' }}>
              {sec.title}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {customEntry.items.map(item => (
                <div key={item.id} style={{ fontSize: '0.84rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#0f172a' }}>
                    <span>{item.title}</span>
                    <span style={{ color: '#64748b', fontSize: '0.78rem' }}>{item.date}</span>
                  </div>
                  {item.subtitle && <div style={{ color: accent, fontWeight: 600, fontSize: '0.8rem' }}>{item.subtitle}</div>}
                  {item.description && <p style={{ color: '#334155', marginTop: '2px', lineHeight: '1.45' }}>{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modern-template-root" style={{ width: '100%', height: '100%' }}>
      {/* Header Banner */}
      <header style={{ borderBottom: `3px solid ${accent}`, paddingBottom: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {personalInfo?.fullName || 'Your Full Name'}
            </h1>
            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: accent, marginTop: '4px' }}>
              {personalInfo?.professionalTitle || 'Your Professional Title'}
            </p>
          </div>
          {personalInfo?.showPhoto && personalInfo?.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accent}` }}
            />
          )}
        </div>

        {/* Contact Strip */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 18px', marginTop: '10px', fontSize: '0.8rem', color: '#475569' }}>
          {personalInfo?.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Mail size={13} color={accent} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Phone size={13} color={accent} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} color={accent} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo?.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <LinkedinIcon size={13} color={accent} />
              <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
            </div>
          )}
          {personalInfo?.github && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <GithubIcon size={13} color={accent} />
              <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
            </div>
          )}
          {personalInfo?.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Globe size={13} color={accent} />
              <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
        </div>
      </header>

      {/* Ordered Sections */}
      <main>
        {(sections || []).map(sec => sec.type !== 'personalInfo' && renderSection(sec))}
      </main>
    </div>
  );
};
