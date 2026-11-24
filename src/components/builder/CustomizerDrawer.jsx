import React from 'react';
import { Palette, Type, Sliders, FileText, Check, X } from 'lucide-react';
import { COLOR_PALETTES, FONT_FAMILIES } from '../../types/resume';
import { useResume } from '../../context/ResumeContext';

export const CustomizerDrawer = ({ isOpen, onClose }) => {
  const { activeResume, updateStyling, setResumeTemplate } = useResume();
  const styling = activeResume?.styling || {};

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '320px',
        backgroundColor: 'var(--bg-secondary)',
        borderLeft: '1px solid var(--border-medium)',
        boxShadow: 'var(--shadow-xl)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      {/* Header */}
      <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Palette size={18} color="var(--primary)" />
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Design & Styling
          </h3>
        </div>
        <button onClick={onClose} className="btn btn-ghost btn-icon btn-sm">
          <X size={16} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
        {/* Accent Color Palette */}
        <div>
          <label className="form-label" style={{ marginBottom: '8px' }}>
            Accent Color Palette
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {COLOR_PALETTES.map(pal => {
              const isSelected = styling.accentColor === pal.value;
              return (
                <div
                  key={pal.value}
                  onClick={() => updateStyling({ accentColor: pal.value })}
                  style={{
                    padding: '8px',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-tertiary)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: pal.value,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                    }}
                  >
                    {isSelected && <Check size={14} />}
                  </div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                    {pal.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Font Family */}
        <div className="form-group">
          <label className="form-label">Typography / Font Family</label>
          <select
            className="form-select"
            value={styling.fontFamily || 'Inter, sans-serif'}
            onChange={e => updateStyling({ fontFamily: e.target.value })}
          >
            {FONT_FAMILIES.map(f => (
              <option key={f.value} value={f.value}>{f.name}</option>
            ))}
          </select>
        </div>

        {/* Spacing Presets */}
        <div>
          <label className="form-label" style={{ marginBottom: '8px' }}>
            Section Spacing
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
            {['compact', 'balanced', 'spacious'].map(preset => {
              const isSelected = (styling.spacing || 'balanced') === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => updateStyling({ spacing: preset })}
                  className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                  style={{ textTransform: 'capitalize', fontSize: '0.78rem' }}
                >
                  {preset}
                </button>
              );
            })}
          </div>
        </div>

        {/* Margin Presets */}
        <div>
          <label className="form-label" style={{ marginBottom: '8px' }}>
            Page Margins
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
            {['compact', 'balanced', 'spacious'].map(preset => {
              const isSelected = (styling.margins || 'balanced') === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => updateStyling({ margins: preset })}
                  className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                  style={{ textTransform: 'capitalize', fontSize: '0.78rem' }}
                >
                  {preset}
                </button>
              );
            })}
          </div>
        </div>

        {/* Paper Size */}
        <div>
          <label className="form-label" style={{ marginBottom: '8px' }}>
            Paper Format
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {['a4', 'letter'].map(size => {
              const isSelected = (styling.paperSize || 'a4') === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => updateStyling({ paperSize: size })}
                  className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                  style={{ textTransform: 'uppercase', fontSize: '0.78rem' }}
                >
                  {size === 'a4' ? 'A4 Standard' : 'US Letter'}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
