import React from 'react';
import { User, Mail, Phone, MapPin, Globe, Image, Camera } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../common/BrandIcons';
import { useResume } from '../../../context/ResumeContext';

export const PersonalInfoSection = () => {
  const { activeResume, updateActiveResume } = useResume();
  const info = activeResume?.personalInfo || {};

  const handleChange = (field, value) => {
    updateActiveResume(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      handleChange('photoUrl', event.target?.result);
      handleChange('showPhoto', true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="section-editor-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={18} color="var(--primary)" />
          <span>Personal & Contact Information</span>
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Provide clear, accessible contact details for recruiters and hiring managers.
        </p>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Alex Rivera"
            value={info.fullName || ''}
            onChange={e => handleChange('fullName', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Professional Title / Headline *</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Staff Full-Stack Software Architect"
            value={info.professionalTitle || ''}
            onChange={e => handleChange('professionalTitle', e.target.value)}
          />
        </div>
      </div>

      <div className="grid-3">
        <div className="form-group">
          <label className="form-label">Email Address *</label>
          <div style={{ position: 'relative' }}>
            <input
              type="email"
              className="form-input"
              style={{ paddingLeft: '2.2rem' }}
              placeholder="alex@domain.io"
              value={info.email || ''}
              onChange={e => handleChange('email', e.target.value)}
            />
            <Mail size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <div style={{ position: 'relative' }}>
            <input
              type="tel"
              className="form-input"
              style={{ paddingLeft: '2.2rem' }}
              placeholder="+1 (555) 234-8901"
              value={info.phone || ''}
              onChange={e => handleChange('phone', e.target.value)}
            />
            <Phone size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Location (City, State/Country)</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.2rem' }}
              placeholder="San Francisco, CA"
              value={info.location || ''}
              onChange={e => handleChange('location', e.target.value)}
            />
            <MapPin size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>
      </div>

      <div className="grid-3">
        <div className="form-group">
          <label className="form-label">LinkedIn Profile URL</label>
          <div style={{ position: 'relative' }}>
            <input
              type="url"
              className="form-input"
              style={{ paddingLeft: '2.2rem' }}
              placeholder="https://linkedin.com/in/alex"
              value={info.linkedin || ''}
              onChange={e => handleChange('linkedin', e.target.value)}
            />
            <LinkedinIcon size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">GitHub URL</label>
          <div style={{ position: 'relative' }}>
            <input
              type="url"
              className="form-input"
              style={{ paddingLeft: '2.2rem' }}
              placeholder="https://github.com/alex"
              value={info.github || ''}
              onChange={e => handleChange('github', e.target.value)}
            />
            <GithubIcon size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Website / Portfolio</label>
          <div style={{ position: 'relative' }}>
            <input
              type="url"
              className="form-input"
              style={{ paddingLeft: '2.2rem' }}
              placeholder="https://alexrivera.dev"
              value={info.website || ''}
              onChange={e => handleChange('website', e.target.value)}
            />
            <Globe size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>
      </div>

      {/* Optional Photo Upload */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {info.photoUrl ? (
            <img
              src={info.photoUrl}
              alt="Profile"
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
            />
          ) : (
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <Camera size={20} />
            </div>
          )}

          <div>
            <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Profile Photo (Optional)
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Some templates or regions include avatar headshots.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {info.photoUrl && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <input
                type="checkbox"
                id="showPhotoToggle"
                checked={!!info.showPhoto}
                onChange={e => handleChange('showPhoto', e.target.checked)}
                style={{ accentColor: 'var(--primary)' }}
              />
              <label htmlFor="showPhotoToggle" style={{ cursor: 'pointer' }}>Show on Resume</label>
            </div>
          )}

          <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', gap: '6px' }}>
            <Camera size={14} />
            <span>{info.photoUrl ? 'Change Photo' : 'Upload Photo'}</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          </label>
        </div>
      </div>
    </div>
  );
};
