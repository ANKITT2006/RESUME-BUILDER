import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/BrandIcons';

export const CreativeTemplate = ({ resume, styling }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, achievements, languages, customSections, sections } = resume;
  const accent = styling?.accentColor || '#7c3aed';

  return (
    <div className="creative-template-root" style={{ width: '100%', height: '100%', display: 'flex', minHeight: '100%' }}>
      {/* Left Sidebar */}
      <aside style={{ width: '32%', background: '#f8fafc', borderRight: '1px solid #e2e8f0', padding: '1.5rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {personalInfo?.showPhoto && personalInfo?.photoUrl && (
          <div style={{ textAlign: 'center' }}>
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${accent}` }}
            />
          </div>
        )}

        {/* Contact Info */}
        <div>
          <h3 style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: accent, letterSpacing: '0.05em', marginBottom: '8px' }}>
            Contact
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', color: '#475569' }}>
            {personalInfo?.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', wordBreak: 'break-all' }}>
                <Mail size={12} color={accent} style={{ flexShrink: 0 }} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo?.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={12} color={accent} style={{ flexShrink: 0 }} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo?.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={12} color={accent} style={{ flexShrink: 0 }} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo?.linkedin && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', wordBreak: 'break-all' }}>
                <LinkedinIcon size={12} color={accent} style={{ flexShrink: 0 }} />
                <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
              </div>
            )}
            {personalInfo?.github && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', wordBreak: 'break-all' }}>
                <GithubIcon size={12} color={accent} style={{ flexShrink: 0 }} />
                <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
              </div>
            )}
            {personalInfo?.website && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', wordBreak: 'break-all' }}>
                <Globe size={12} color={accent} style={{ flexShrink: 0 }} />
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: accent, letterSpacing: '0.05em', marginBottom: '8px' }}>
              Education
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {education.map(edu => (
                <div key={edu.id} style={{ fontSize: '0.78rem' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{edu.degree}</div>
                  <div style={{ color: accent, fontWeight: 600 }}>{edu.institution}</div>
                  <div style={{ color: '#64748b' }}>{edu.graduationDate || `${edu.startDate || ''} - ${edu.graduationDate || ''}`}</div>
                  {edu.gpa && <div style={{ color: '#64748b' }}>GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: accent, letterSpacing: '0.05em', marginBottom: '8px' }}>
              Skills & Tools
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {skills.map(s => (
                <span
                  key={s.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    padding: '2px 6px',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: '#334155'
                  }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: accent, letterSpacing: '0.05em', marginBottom: '8px' }}>
              Certifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.76rem' }}>
              {certifications.map(c => (
                <div key={c.id}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{c.name}</div>
                  <div style={{ color: '#64748b' }}>{c.organization}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: accent, letterSpacing: '0.05em', marginBottom: '6px' }}>
              Languages
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.76rem', color: '#334155' }}>
              {languages.map(l => (
                <div key={l.id}>{l.language} ({l.proficiency})</div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Right Main Content */}
      <main style={{ flex: 1, padding: '1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {/* Name Header */}
        <header>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
            {personalInfo?.fullName || 'Full Name'}
          </h1>
          <p style={{ fontSize: '1.05rem', fontWeight: 600, color: accent, marginTop: '2px' }}>
            {personalInfo?.professionalTitle || 'Creative Title'}
          </p>
        </header>

        {/* Summary */}
        {summary && (
          <section>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: accent, borderBottom: `2px solid ${accent}20`, paddingBottom: '3px', marginBottom: '6px' }}>
              Profile
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: '1.6' }}>
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: accent, borderBottom: `2px solid ${accent}20`, paddingBottom: '3px', marginBottom: '10px' }}>
              Work Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {experience.map(exp => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>
                      {exp.jobTitle}
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                      {exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 600, color: accent, marginBottom: '4px' }}>
                    {exp.company} {exp.location ? `• ${exp.location}` : ''}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul style={{ paddingLeft: '1.1rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {exp.bullets.map((b, idx) => b?.trim() ? (
                        <li key={idx} style={{ fontSize: '0.82rem', color: '#334155', lineHeight: '1.45' }}>
                          {b}
                        </li>
                      ) : null)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: accent, borderBottom: `2px solid ${accent}20`, paddingBottom: '3px', marginBottom: '8px' }}>
              Selected Projects
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {projects.map(proj => (
                <div key={proj.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>{proj.name}</span>
                    {proj.technologies && <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{proj.technologies.join(' • ')}</span>}
                  </div>
                  {proj.description && <p style={{ fontSize: '0.81rem', color: '#475569', margin: '2px 0' }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
