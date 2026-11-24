import React from 'react';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { CorporateTemplate } from './CorporateTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { NordicTemplate } from './NordicTemplate';
import { SPACING_PRESETS, MARGIN_PRESETS } from '../../types/resume';

export const TemplateRenderer = ({ resume, zoom = 1, previewOnly = false, customId = 'resume-print-document' }) => {
  if (!resume) return null;

  const styling = resume.styling || {};
  const templateId = resume.templateId || 'modern';
  const paperSize = (styling.paperSize || 'a4').toLowerCase();

  // Spacing & font configurations
  const spacingConfig = SPACING_PRESETS[styling.spacing] || SPACING_PRESETS.balanced;
  const paddingValue = MARGIN_PRESETS[styling.margins] || MARGIN_PRESETS.balanced;
  const fontFamily = styling.fontFamily || 'Inter, sans-serif';

  const renderTemplateComponent = () => {
    switch (templateId) {
      case 'minimal':
        return <MinimalTemplate resume={resume} styling={styling} />;
      case 'corporate':
        return <CorporateTemplate resume={resume} styling={styling} />;
      case 'creative':
        return <CreativeTemplate resume={resume} styling={styling} />;
      case 'nordic':
        return <NordicTemplate resume={resume} styling={styling} />;
      case 'modern':
      default:
        return <ModernTemplate resume={resume} styling={styling} />;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${zoom})`,
        transformOrigin: 'top center',
        transition: 'transform 0.15s ease-out',
        width: '100%',
        paddingBottom: '2rem'
      }}
    >
      <div
        id={customId}
        className={`resume-paper size-${paperSize}`}
        style={{
          fontFamily,
          lineHeight: spacingConfig.lineHeight,
          padding: paddingValue,
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {renderTemplateComponent()}
      </div>
    </div>
  );
};
