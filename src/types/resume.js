/**
 * Core Section Keys and Metadata
 */
export const SECTION_TYPES = {
  PERSONAL_INFO: 'personalInfo',
  SUMMARY: 'summary',
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  CERTIFICATIONS: 'certifications',
  ACHIEVEMENTS: 'achievements',
  LANGUAGES: 'languages',
  CUSTOM: 'custom',
};

export const DEFAULT_SECTIONS = [
  { id: 'sec-personal', type: SECTION_TYPES.PERSONAL_INFO, title: 'Personal Information', visible: true, required: true },
  { id: 'sec-summary', type: SECTION_TYPES.SUMMARY, title: 'Professional Summary', visible: true },
  { id: 'sec-experience', type: SECTION_TYPES.EXPERIENCE, title: 'Work Experience', visible: true },
  { id: 'sec-education', type: SECTION_TYPES.EDUCATION, title: 'Education', visible: true },
  { id: 'sec-skills', type: SECTION_TYPES.SKILLS, title: 'Skills & Proficiencies', visible: true },
  { id: 'sec-projects', type: SECTION_TYPES.PROJECTS, title: 'Key Projects', visible: true },
  { id: 'sec-certifications', type: SECTION_TYPES.CERTIFICATIONS, title: 'Certifications & Licenses', visible: true },
  { id: 'sec-achievements', type: SECTION_TYPES.ACHIEVEMENTS, title: 'Key Achievements & Awards', visible: false },
  { id: 'sec-languages', type: SECTION_TYPES.LANGUAGES, title: 'Languages', visible: false },
  { id: 'sec-custom', type: SECTION_TYPES.CUSTOM, title: 'Additional Information', visible: false },
];

export const TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean dual-accent header, crisp badges, and modern typography. Perfect for tech, product, and business roles.',
    badge: 'Popular',
    category: 'Modern',
    previewColor: '#2563eb',
  },
  {
    id: 'minimal',
    name: 'Minimal ATS',
    description: 'Single-column, high-density layout designed for maximum ATS parse rate and recruiter scanning speed.',
    badge: 'ATS 100%',
    category: 'ATS-Friendly',
    previewColor: '#0f172a',
  },
  {
    id: 'corporate',
    name: 'Corporate Executive',
    description: 'Authoritative styling with refined serif headings and structured timeline milestones for leadership roles.',
    badge: 'Executive',
    category: 'Corporate',
    previewColor: '#0f766e',
  },
  {
    id: 'creative',
    name: 'Creative Tech',
    description: 'Contemporary design with tech stack highlights, portfolio badges, and elegant accent sidebars.',
    badge: 'Creative',
    category: 'Creative',
    previewColor: '#7c3aed',
  },
  {
    id: 'nordic',
    name: 'Nordic Elegance',
    description: 'Warm slate aesthetics with refined typography spacing, balanced margins, and an editorial feel.',
    badge: 'Clean',
    category: 'Minimal',
    previewColor: '#475569',
  },
];

export const COLOR_PALETTES = [
  { name: 'Sapphire Blue', value: '#2563eb', bgLight: '#eff6ff' },
  { name: 'Emerald Teal', value: '#0f766e', bgLight: '#f0fdf4' },
  { name: 'Royal Violet', value: '#7c3aed', bgLight: '#f5f3ff' },
  { name: 'Midnight Slate', value: '#0f172a', bgLight: '#f8fafc' },
  { name: 'Crimson Rose', value: '#be123c', bgLight: '#fff1f2' },
  { name: 'Warm Amber', value: '#b45309', bgLight: '#fffbeb' },
];

export const FONT_FAMILIES = [
  { name: 'Inter (Clean & Modern)', value: 'Inter, sans-serif' },
  { name: 'Outfit (Tech & Display)', value: 'Outfit, sans-serif' },
  { name: 'Plus Jakarta Sans (Contemporary)', value: 'Plus Jakarta Sans, sans-serif' },
  { name: 'Merriweather (Classic Serif)', value: 'Merriweather, Georgia, serif' },
  { name: 'JetBrains Mono (Developer)', value: 'JetBrains Mono, monospace' },
];

export const SPACING_PRESETS = {
  compact: { sectionGap: '0.85rem', itemGap: '0.5rem', lineHeight: '1.35', fontSizeScale: '0.92' },
  balanced: { sectionGap: '1.25rem', itemGap: '0.75rem', lineHeight: '1.5', fontSizeScale: '1.0' },
  spacious: { sectionGap: '1.65rem', itemGap: '1rem', lineHeight: '1.65', fontSizeScale: '1.08' },
};

export const MARGIN_PRESETS = {
  compact: '24px',
  balanced: '36px',
  spacious: '48px',
};
