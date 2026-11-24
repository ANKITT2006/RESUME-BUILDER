import { SKILL_CATEGORIES } from '../data/skillSuggestions';

/**
 * Extracts normalized keywords from text.
 */
const ALL_VOCABULARY = [
  ...SKILL_CATEGORIES.frontend,
  ...SKILL_CATEGORIES.backend,
  ...SKILL_CATEGORIES.devops,
  ...SKILL_CATEGORIES.product,
  ...SKILL_CATEGORIES.design,
  ...SKILL_CATEGORIES.ai_ml,
  ...SKILL_CATEGORIES.soft_skills,
  'Agile', 'Scrum', 'Leadership', 'Architecture', 'Testing', 'CI/CD',
  'Microservices', 'REST', 'GraphQL', 'Security', 'Performance', 'Cross-functional',
  'Mentorship', 'Roadmap', 'Optimization', 'Analytics', 'Experimentation'
];

export const matchResumeWithJob = (resume, jobDescription = '', targetRole = '') => {
  if (!jobDescription || jobDescription.trim().length < 20) {
    return {
      matchScore: 0,
      matchedKeywords: [],
      missingKeywords: [],
      analysisText: 'Please paste a job description (at least a few sentences) to run the ATS keyword match.'
    };
  }

  // Compile all text from resume
  const resumeCorpus = [
    resume?.targetRole || '',
    resume?.personalInfo?.professionalTitle || '',
    resume?.summary || '',
    ...(resume?.skills || []).map(s => s.name),
    ...(resume?.experience || []).flatMap(e => [e.jobTitle, ...(e.bullets || [])]),
    ...(resume?.projects || []).flatMap(p => [p.name, p.description, ...(p.technologies || []), ...(p.bullets || [])]),
    ...(resume?.education || []).map(e => `${e.degree} ${e.fieldOfStudy}`)
  ].join(' ').toLowerCase();

  const jdLower = jobDescription.toLowerCase();

  // Find relevant keywords in JD
  const foundInJD = new Set();
  ALL_VOCABULARY.forEach(term => {
    const termLower = term.toLowerCase();
    // match word boundary or substring for tech terms
    if (jdLower.includes(termLower)) {
      foundInJD.add(term);
    }
  });

  // If no known vocabulary matched, extract capitalized words or frequent terms from JD
  if (foundInJD.size < 4) {
    const words = jobDescription.match(/\b[A-Za-z]{3,}\b/g) || [];
    const freq = {};
    const stopWords = new Set(['and', 'the', 'for', 'with', 'you', 'our', 'will', 'that', 'this', 'have', 'from', 'are', 'your', 'about']);
    words.forEach(w => {
      const low = w.toLowerCase();
      if (!stopWords.has(low)) {
        freq[w] = (freq[w] || 0) + 1;
      }
    });
    Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([w]) => foundInJD.add(w));
  }

  const jdKeywords = Array.from(foundInJD);
  const matched = [];
  const missing = [];

  jdKeywords.forEach(kw => {
    if (resumeCorpus.includes(kw.toLowerCase())) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });

  const total = matched.length + missing.length;
  const matchScore = total > 0 ? Math.round((matched.length / total) * 100) : 50;

  return {
    matchScore,
    matchedKeywords: matched,
    missingKeywords: missing,
    totalKeywordsCount: total,
    summary: matchScore >= 75
      ? 'Strong alignment! Your resume covers the majority of critical keywords for this role.'
      : matchScore >= 50
      ? 'Moderate match. Consider adding the missing keywords into your Skills or Experience bullets.'
      : 'Low keyword coverage. Tailor your resume summary and experience to better reflect this job description.'
  };
};
