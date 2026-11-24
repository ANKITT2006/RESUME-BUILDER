import { COMMON_ACTION_VERBS } from '../data/skillSuggestions';

/**
 * Computes an objective ATS Quality Score (0 - 100) and provides actionable feedback.
 */
export const calculateATSScore = (resume) => {
  if (!resume) return { overallScore: 0, breakdown: {}, strengths: [], suggestions: [] };

  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume;

  let completenessScore = 0; // Max 25
  let impactScore = 0;       // Max 25
  let skillsScore = 0;       // Max 20
  let readabilityScore = 0;  // Max 15
  let structureScore = 0;    // Max 15

  const strengths = [];
  const suggestions = [];

  // 1. COMPLETENESS EVALUATION (Max 25 pts)
  let contactPoints = 0;
  if (personalInfo?.fullName?.trim()) contactPoints += 5;
  if (personalInfo?.email?.trim() && personalInfo.email.includes('@')) contactPoints += 5;
  if (personalInfo?.phone?.trim()) contactPoints += 4;
  if (personalInfo?.location?.trim()) contactPoints += 3;
  if (personalInfo?.linkedin?.trim() || personalInfo?.github?.trim() || personalInfo?.website?.trim()) contactPoints += 3;

  completenessScore += contactPoints;
  if (contactPoints >= 17) {
    strengths.push('Comprehensive and accessible contact information');
  } else {
    suggestions.push({
      text: 'Add complete contact details (Email, Phone, Location, and LinkedIn/Portfolio).',
      sectionId: 'sec-personal',
      priority: 'high'
    });
  }

  // Summary check
  if (summary && summary.trim().length > 80) {
    completenessScore += 5;
    strengths.push('Engaging professional summary present');
  } else {
    suggestions.push({
      text: 'Write a strong 3-4 sentence professional summary highlighting your core expertise.',
      sectionId: 'sec-summary',
      priority: 'high'
    });
  }

  // 2. WORK EXPERIENCE & IMPACT (Max 25 pts)
  const validExp = (experience || []).filter(e => e.jobTitle?.trim() && e.company?.trim());
  if (validExp.length > 0) {
    impactScore += 8;
    
    // Check bullets for metrics (numbers, %, $, x times)
    let totalBullets = 0;
    let metricBullets = 0;
    let actionVerbBullets = 0;

    validExp.forEach(exp => {
      (exp.bullets || []).forEach(b => {
        if (b && b.trim().length > 15) {
          totalBullets++;
          // Check metric pattern
          if (/(\d+%|\$\d+|\d+k|\d+M|\d+\+?|\b\d+\b)/i.test(b)) {
            metricBullets++;
          }
          // Check action verb
          const firstWord = b.trim().split(' ')[0].replace(/[^a-zA-Z]/g, '');
          if (COMMON_ACTION_VERBS.some(v => v.toLowerCase() === firstWord.toLowerCase()) || /ed\b/i.test(firstWord)) {
            actionVerbBullets++;
          }
        }
      });
    });

    if (totalBullets >= 4) impactScore += 5;

    if (metricBullets >= 2) {
      impactScore += 7;
      strengths.push(`Strong quantitative impact (${metricBullets} measurable metrics in experience)`);
    } else {
      suggestions.push({
        text: 'Quantify your accomplishments with measurable metrics (e.g. "increased revenue by 30%", "reduced latency by 45ms").',
        sectionId: 'sec-experience',
        priority: 'high'
      });
    }

    if (actionVerbBullets >= 3) {
      impactScore += 5;
      strengths.push('High usage of strong action verbs (e.g. Architected, Spearheaded, Optimized)');
    } else {
      suggestions.push({
        text: 'Begin experience bullet points with decisive action verbs.',
        sectionId: 'sec-experience',
        priority: 'medium'
      });
    }
  } else {
    suggestions.push({
      text: 'Add at least one work experience entry with clear role titles and company names.',
      sectionId: 'sec-experience',
      priority: 'high'
    });
  }

  // 3. SKILLS DEPTH (Max 20 pts)
  const skillCount = (skills || []).filter(s => s.name?.trim()).length;
  if (skillCount >= 8) {
    skillsScore = 20;
    strengths.push(`Rich skills profile (${skillCount} targeted skills listed)`);
  } else if (skillCount >= 4) {
    skillsScore = 14;
    suggestions.push({
      text: `Expand your skills list (currently ${skillCount}). Aim for 8-12 relevant technical & soft skills.`,
      sectionId: 'sec-skills',
      priority: 'medium'
    });
  } else {
    skillsScore = 6;
    suggestions.push({
      text: 'Add your primary technical skills, tools, and domain proficiencies.',
      sectionId: 'sec-skills',
      priority: 'high'
    });
  }

  // 4. READABILITY & BALANCE (Max 15 pts)
  let readability = 15;
  // Check for overly long summary
  if (summary && summary.length > 550) {
    readability -= 4;
    suggestions.push({
      text: 'Professional summary is slightly long; keep it concise (under 400 characters) for optimal recruiter scanning.',
      sectionId: 'sec-summary',
      priority: 'low'
    });
  }
  // Check education
  const validEdu = (education || []).filter(e => e.institution?.trim() && e.degree?.trim());
  if (validEdu.length > 0) {
    strengths.push('Formal education details clearly structured');
  } else {
    readability -= 4;
    suggestions.push({
      text: 'Include your educational background, degrees, or relevant coursework.',
      sectionId: 'sec-education',
      priority: 'medium'
    });
  }
  readabilityScore = Math.max(0, readability);

  // 5. ATS STRUCTURE & FORMATTING (Max 15 pts)
  let structure = 10;
  if ((projects || []).length > 0 || (certifications || []).length > 0) {
    structure += 5;
    strengths.push('Added high-value supporting sections (Projects / Certifications)');
  }
  structureScore = structure;

  // Final Overall Score Calculation (Clamped 0 - 100)
  const overallScore = Math.min(100, Math.max(0, Math.round(
    completenessScore + impactScore + skillsScore + readabilityScore + structureScore
  )));

  return {
    overallScore,
    breakdown: {
      completeness: Math.min(25, completenessScore),
      impact: Math.min(25, impactScore),
      skills: Math.min(20, skillsScore),
      readability: Math.min(15, readabilityScore),
      structure: Math.min(15, structureScore),
    },
    strengths,
    suggestions,
  };
};
