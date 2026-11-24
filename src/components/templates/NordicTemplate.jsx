import React from 'react';

export const NordicTemplate = ({ resume, styling }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, achievements, languages, customSections, sections } = resume;
  const accent = styling?.accentColor || '#475569';

  return (
    <div className="nordic-template-root" style={{ width: '100%', height: '100%', color: '#1e293b' }}>
      <header style={{ paddingBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 300, letterSpacing: '0.08em', color: '#0f172a', textTransform: 'uppercase', margin: 0 }}>
          {personalInfo?.fullName || 'FULL NAME'}
        </h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '6px', flexWrap: 'wrap' }}>
          <p style={{ fontSize: '0.95rem', fontWeight: 600, color: accent, letterSpacing: '0.04em' }}>
            {personalInfo?.professionalTitle || 'Designation'}
          </p>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
            {[personalInfo?.email, personalInfo?.phone, personalInfo?.location].filter(Boolean).join(' / ')}
          </div>
        </div>
      </header>

      {summary && (
        <section style={{ marginBottom: '1.2rem' }}>
          <h2 style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: accent, marginBottom: '6px' }}>
            About
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: '1.6' }}>
            {summary}
          </p>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section style={{ marginBottom: '1.2rem' }}>
          <h2 style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: accent, marginBottom: '8px' }}>
            Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {experience.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{exp.jobTitle}</span>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{exp.startDate} — {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: accent, fontWeight: 600, marginBottom: '4px' }}>
                  {exp.company} {exp.location ? `· ${exp.location}` : ''}
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul style={{ paddingLeft: '1rem', margin: 0 }}>
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

      {skills && skills.length > 0 && (
        <section style={{ marginBottom: '1.2rem' }}>
          <h2 style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: accent, marginBottom: '6px' }}>
            Expertise
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#334155', lineHeight: '1.5' }}>
            {skills.map(s => s.name).join('  /  ')}
          </p>
        </section>
      )}

      {education && education.length > 0 && (
        <section style={{ marginBottom: '1.2rem' }}>
          <h2 style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: accent, marginBottom: '6px' }}>
            Education
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {education.map(edu => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span><strong>{edu.degree}</strong>, {edu.institution}</span>
                <span style={{ color: '#64748b' }}>{edu.graduationDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
