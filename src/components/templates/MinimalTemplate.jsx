import React from 'react';

export const MinimalTemplate = ({ resume, styling }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, achievements, languages, customSections, sections } = resume;
  const accent = styling?.accentColor || '#0f172a';

  const renderSection = (sec) => {
    if (!sec.visible) return null;

    switch (sec.type) {
      case 'summary':
        if (!summary?.trim()) return null;
        return (
          <div key={sec.id} style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '6px', color: accent }}>
              {sec.title || 'SUMMARY'}
            </h2>
            <p style={{ fontSize: '0.86rem', color: '#1e293b', lineHeight: '1.55' }}>
              {summary}
            </p>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key={sec.id} style={{ marginBottom: '1.1rem' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '8px', color: accent }}>
              {sec.title || 'EXPERIENCE'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {experience.map(exp => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>
                      {exp.jobTitle} — <span style={{ fontWeight: 600, color: '#334155' }}>{exp.company}</span>
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '4px' }}>
                      {exp.location}
                    </div>
                  )}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul style={{ paddingLeft: '1.1rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {exp.bullets.map((b, idx) => b?.trim() ? (
                        <li key={idx} style={{ fontSize: '0.83rem', color: '#1e293b', lineHeight: '1.45' }}>
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
          <div key={sec.id} style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '6px', color: accent }}>
              {sec.title || 'SKILLS'}
            </h2>
            <p style={{ fontSize: '0.84rem', color: '#1e293b', lineHeight: '1.5' }}>
              {skills.map(s => s.name).join(' • ')}
            </p>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key={sec.id} style={{ marginBottom: '1.1rem' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '8px', color: accent }}>
              {sec.title || 'PROJECTS'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {projects.map(proj => (
                <div key={proj.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                      {proj.name} {proj.technologies && proj.technologies.length > 0 ? `| ${proj.technologies.join(', ')}` : ''}
                    </span>
                    {proj.projectUrl && (
                      <span style={{ fontSize: '0.78rem', color: '#475569' }}>{proj.projectUrl.replace(/^https?:\/\//, '')}</span>
                    )}
                  </div>
                  {proj.description && (
                    <p style={{ fontSize: '0.83rem', color: '#334155', margin: '2px 0', lineHeight: '1.4' }}>
                      {proj.description}
                    </p>
                  )}
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul style={{ paddingLeft: '1.1rem', margin: 0 }}>
                      {proj.bullets.map((b, idx) => b?.trim() ? (
                        <li key={idx} style={{ fontSize: '0.82rem', color: '#1e293b', lineHeight: '1.4' }}>
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
          <div key={sec.id} style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '6px', color: accent }}>
              {sec.title || 'EDUCATION'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {education.map(edu => (
                <div key={edu.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                      {edu.institution}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {edu.graduationDate || `${edu.startDate || ''} - ${edu.graduationDate || ''}`}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.83rem', color: '#334155' }}>
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''} {edu.gpa ? `(GPA: ${edu.gpa})` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key={sec.id} style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '6px', color: accent }}>
              {sec.title || 'CERTIFICATIONS'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {certifications.map(cert => (
                <div key={cert.id} style={{ fontSize: '0.83rem', color: '#1e293b' }}>
                  <strong>{cert.name}</strong> — {cert.organization} {cert.issueDate ? `(${cert.issueDate})` : ''}
                </div>
              ))}
            </div>
          </div>
        );

      case 'achievements':
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key={sec.id} style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '6px', color: accent }}>
              {sec.title || 'HONORS & AWARDS'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {achievements.map(ach => (
                <div key={ach.id} style={{ fontSize: '0.83rem', color: '#1e293b' }}>
                  <strong>{ach.title}</strong>: {ach.description} {ach.date ? `(${ach.date})` : ''}
                </div>
              ))}
            </div>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key={sec.id} style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '6px', color: accent }}>
              {sec.title || 'LANGUAGES'}
            </h2>
            <p style={{ fontSize: '0.83rem', color: '#1e293b' }}>
              {languages.map(l => `${l.language} (${l.proficiency})`).join(', ')}
            </p>
          </div>
        );

      case 'custom':
        const customEntry = (customSections || []).find(c => c.id === sec.id);
        if (!customEntry || !customEntry.items || customEntry.items.length === 0) return null;
        return (
          <div key={sec.id} style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '6px', color: accent }}>
              {sec.title.toUpperCase()}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {customEntry.items.map(item => (
                <div key={item.id} style={{ fontSize: '0.83rem' }}>
                  <strong>{item.title}</strong> {item.subtitle ? `— ${item.subtitle}` : ''} {item.date ? `(${item.date})` : ''}
                  {item.description && <p style={{ margin: '2px 0' }}>{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const contacts = [
    personalInfo?.email,
    personalInfo?.phone,
    personalInfo?.location,
    personalInfo?.linkedin?.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'linkedin.com/in/'),
    personalInfo?.github?.replace(/^https?:\/\/(www\.)?github\.com\//, 'github.com/'),
    personalInfo?.website?.replace(/^https?:\/\//, ''),
  ].filter(Boolean);

  return (
    <div className="minimal-template-root" style={{ width: '100%', height: '100%' }}>
      <header style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <h1 style={{ fontSize: '1.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#0f172a', margin: 0 }}>
          {personalInfo?.fullName || 'YOUR NAME'}
        </h1>
        {personalInfo?.professionalTitle && (
          <p style={{ fontSize: '1rem', fontWeight: 600, color: accent, marginTop: '2px', letterSpacing: '0.02em' }}>
            {personalInfo.professionalTitle}
          </p>
        )}
        <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '6px', lineHeight: '1.4' }}>
          {contacts.join('  •  ')}
        </div>
      </header>

      <main>
        {(sections || []).map(sec => sec.type !== 'personalInfo' && renderSection(sec))}
      </main>
    </div>
  );
};
