import { DEFAULT_SECTIONS } from '../types/resume';

export const createEmptyResume = (title = 'Untitled Resume', targetRole = '') => {
  const timestamp = new Date().toISOString();
  return {
    id: `resume-${Date.now()}`,
    title,
    targetRole,
    targetJobDescription: '',
    templateId: 'modern',
    styling: {
      accentColor: '#2563eb',
      fontFamily: 'Inter, sans-serif',
      fontSize: 'balanced',
      spacing: 'balanced',
      margins: 'balanced',
      paperSize: 'a4',
    },
    sections: JSON.parse(JSON.stringify(DEFAULT_SECTIONS)),
    personalInfo: {
      fullName: '',
      professionalTitle: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      portfolio: '',
      photoUrl: '',
      showPhoto: false,
    },
    summary: '',
    experience: [
      {
        id: `exp-${Date.now()}`,
        jobTitle: '',
        company: '',
        employmentType: 'Full-time',
        location: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        bullets: ['']
      }
    ],
    education: [
      {
        id: `edu-${Date.now()}`,
        degree: '',
        institution: '',
        location: '',
        fieldOfStudy: '',
        startDate: '',
        graduationDate: '',
        gpa: '',
        honors: '',
        description: ''
      }
    ],
    skills: [],
    projects: [],
    certifications: [],
    achievements: [],
    languages: [],
    customSections: [],
    metadata: {
      createdAt: timestamp,
      updatedAt: timestamp,
      version: 1,
      downloadCount: 0,
      completionScore: 10,
    }
  };
};
