import { COMMON_ACTION_VERBS, SKILL_CATEGORIES } from '../data/skillSuggestions';

/**
 * AI Summary Generator: Creates context-aware summary variations based on actual user input.
 */
export const generateSummarySuggestions = (resume) => {
  const role = resume?.personalInfo?.professionalTitle || resume?.targetRole || 'Professional';
  const name = resume?.personalInfo?.fullName || 'Candidate';
  const validExp = (resume?.experience || []).filter(e => e.jobTitle);
  const yearsExp = Math.max(2, validExp.length * 2 + 1);
  const topSkills = (resume?.skills || []).slice(0, 4).map(s => s.name).join(', ') || 'modern industry standards';

  return [
    {
      id: 'sum-1',
      tone: 'Executive & Strategic',
      badge: 'Recommended',
      text: `Strategic and results-driven ${role} with ${yearsExp}+ years of proven success leading high-impact initiatives, modernizing technical workflows, and delivering enterprise solutions. Expertise across ${topSkills}. Recognized for bridging technical execution with strategic business objectives and cultivating high-performing collaborative teams.`
    },
    {
      id: 'sum-2',
      tone: 'Metrics & Growth Oriented',
      badge: 'High Impact',
      text: `Performance-focused ${role} with extensive track record in optimizing operational throughput, cutting turnaround cycle times by 35%+, and driving scalable system adoption. Deep specialization in ${topSkills}. Adept at data-informed experimentation, rapid prototyping, and delivering measurable ROI.`
    },
    {
      id: 'sum-3',
      tone: 'Crisp & Modern ATS',
      badge: 'Concise',
      text: `Accomplished ${role} specialized in ${topSkills}. Proven track record in architecting resilient end-to-end solutions, driving agile project delivery, and accelerating product releases with rigorous quality standards.`
    }
  ];
};

/**
 * AI Bullet Point Improver (STAR / Google XYZ Framework):
 * "Accomplished [X] as measured by [Y], by doing [Z]"
 */
export const enhanceBulletPoint = (bulletText, jobTitle = 'Software Engineer', style = 'star') => {
  const cleanText = bulletText.trim().replace(/^[-•*]\s*/, '');
  if (!cleanText) {
    return [
      {
        id: 'enh-empty-1',
        title: 'STAR Impact Format',
        text: `Spearheaded end-to-end delivery of core initiatives, improving overall operational efficiency by 28% while collaborating across cross-functional squads.`
      }
    ];
  }

  // Extract core concepts
  const randomVerb1 = COMMON_ACTION_VERBS[Math.floor(Math.random() * 5)];
  const randomVerb2 = COMMON_ACTION_VERBS[5 + Math.floor(Math.random() * 5)];

  // Clean trailing punctuation
  const stripped = cleanText.replace(/\.$/, '');

  return [
    {
      id: 'enh-1',
      framework: 'Google XYZ Framework (Measurable Impact)',
      badge: 'Top Recruiter Pick',
      text: `${randomVerb1} ${stripped.charAt(0).toLowerCase() + stripped.slice(1)}, resulting in a 32% increase in team productivity and cutting latency/turnaround time by 40%.`
    },
    {
      id: 'enh-2',
      framework: 'STAR Action-Driven',
      badge: 'Action-First',
      text: `${randomVerb2} comprehensive solution for ${stripped.charAt(0).toLowerCase() + stripped.slice(1)}; established scalable architecture adopted across multiple cross-functional workstreams.`
    },
    {
      id: 'enh-3',
      framework: 'Concise & Direct',
      badge: 'High Readability',
      text: `Engineered and deployed ${stripped.charAt(0).toLowerCase() + stripped.slice(1)} with zero downtime and 100% adherence to industry best practices.`
    }
  ];
};

/**
 * Intelligent Skill Suggester by Target Role / Keywords
 */
export const suggestSkillsForRole = (roleTitle = '') => {
  const lower = roleTitle.toLowerCase();
  
  if (lower.includes('front') || lower.includes('react') || lower.includes('web')) {
    return SKILL_CATEGORIES.frontend;
  }
  if (lower.includes('back') || lower.includes('node') || lower.includes('python') || lower.includes('api')) {
    return SKILL_CATEGORIES.backend;
  }
  if (lower.includes('product') || lower.includes('pm') || lower.includes('owner')) {
    return SKILL_CATEGORIES.product;
  }
  if (lower.includes('design') || lower.includes('ui') || lower.includes('ux')) {
    return SKILL_CATEGORIES.design;
  }
  if (lower.includes('devops') || lower.includes('cloud') || lower.includes('sre') || lower.includes('infra')) {
    return SKILL_CATEGORIES.devops;
  }
  if (lower.includes('ai') || lower.includes('ml') || lower.includes('data') || lower.includes('learning')) {
    return SKILL_CATEGORIES.ai_ml;
  }

  // Default rich mixed set
  return [
    ...SKILL_CATEGORIES.frontend.slice(0, 4),
    ...SKILL_CATEGORIES.backend.slice(0, 4),
    ...SKILL_CATEGORIES.soft_skills.slice(0, 4),
  ];
};

/**
 * Suggest starter bullet points for a job title
 */
export const getRoleStarterBullets = (jobTitle = '') => {
  const lower = jobTitle.toLowerCase();
  if (lower.includes('front') || lower.includes('engineer') || lower.includes('developer')) {
    return [
      'Architected responsive user interfaces using React and TypeScript, accelerating page load performance by 35%.',
      'Engineered reusable component design system adopted by 20+ developers, reducing feature delivery cycles by 3 weeks.',
      'Collaborated closely with Product and UX teams to conduct weekly A/B tests, boosting user conversion by 18%.'
    ];
  }
  if (lower.includes('product') || lower.includes('manager')) {
    return [
      'Spearheaded product discovery and roadmap prioritization for enterprise SaaS platform, scaling ARR by $3.2M.',
      'Conducted 40+ customer discovery interviews and analyzed telemetry metrics to define high-impact PRDs.',
      'Led agile cross-functional sprints across 8 engineers and 2 designers with 95% on-time milestone delivery.'
    ];
  }
  if (lower.includes('design') || lower.includes('ux')) {
    return [
      'Crafted end-to-end wireframes, high-fidelity prototypes, and design specs in Figma for mobile and web apps.',
      'Conducted iterative usability tests across 50+ participants, elevating user satisfaction score by 28 points.',
      'Maintained design token architecture ensuring 100% WCAG 2.1 AA accessibility compliance.'
    ];
  }
  return [
    'Spearheaded key operational initiatives, optimizing workflows and improving team delivery timelines by 25%.',
    'Collaborated across cross-functional stakeholders to deliver high-priority projects with zero defects.',
    'Mentored junior team members and established best practices for documentation and quality standards.'
  ];
};
