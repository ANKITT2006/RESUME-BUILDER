import { DEFAULT_SECTIONS } from '../types/resume';

export const SAMPLE_RESUMES = [
  {
    id: 'resume-sample-swe',
    title: 'Staff Full-Stack Architect',
    targetRole: 'Staff Software Engineer / Solutions Architect',
    targetJobDescription: 'Seeking an experienced Staff Software Engineer with deep expertise in React, TypeScript, Node.js, Distributed Systems, Microservices, AWS, Docker, CI/CD, and high-concurrency architecture. Strong leadership, mentorship, and system design experience required.',
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
      fullName: 'Alex Rivera',
      professionalTitle: 'Staff Full-Stack Software Architect',
      email: 'alex.rivera@techdomain.io',
      phone: '+1 (555) 234-8901',
      location: 'San Francisco, CA',
      website: 'https://alexrivera.dev',
      linkedin: 'https://linkedin.com/in/alex-rivera-architect',
      github: 'https://github.com/alexrivera-eng',
      portfolio: 'https://alexrivera.dev/case-studies',
      photoUrl: '',
      showPhoto: false,
    },
    summary: 'Results-driven Staff Software Architect with 8+ years of expertise in designing high-throughput distributed systems, modern web platforms, and event-driven microservices. Spearheaded cloud transformations reducing infrastructure costs by $1.2M annually while scaling core API performance to 45,000+ RPS at 99.99% availability. Passionate mentor and agile engineering leader.',
    experience: [
      {
        id: 'exp-1',
        jobTitle: 'Staff Full-Stack Architect',
        company: 'StripeStream Systems',
        employmentType: 'Full-time',
        location: 'San Francisco, CA (Hybrid)',
        startDate: '2021-03',
        endDate: '',
        currentlyWorking: true,
        bullets: [
          'Architected a distributed payment settlement engine handling $450M+ in quarterly transactions with sub-80ms p99 latency.',
          'Spearheaded the migration of legacy monolithic micro-frontend to Next.js & React 19, accelerating Core Web Vitals and cutting TTI by 42%.',
          'Introduced automated CI/CD canary deployment pipelines using GitHub Actions and Kubernetes, reducing deployment rollbacks by 65%.',
          'Mentored 14 senior and mid-level engineers across 3 cross-functional squads, establishing engineering standards for code reviews and RFCs.'
        ]
      },
      {
        id: 'exp-2',
        jobTitle: 'Senior Backend Engineer',
        company: 'CloudScale Technologies',
        employmentType: 'Full-time',
        location: 'Seattle, WA',
        startDate: '2018-06',
        endDate: '2021-02',
        currentlyWorking: false,
        bullets: [
          'Engineered real-time telemetry streaming pipelines leveraging Apache Kafka and Redis cluster, ingesting 8.5M telemetry events/sec.',
          'Optimized PostgreSQL query schemas and multi-region replication topologies, cutting database query latency by 58%.',
          'Collaborated with Infosec leaders to achieve SOC2 Type II and GDPR compliance across all tier-1 authentication microservices.'
        ]
      },
      {
        id: 'exp-3',
        jobTitle: 'Full-Stack Software Engineer',
        company: 'Veloce Data Labs',
        employmentType: 'Full-time',
        location: 'Austin, TX',
        startDate: '2016-08',
        endDate: '2018-05',
        currentlyWorking: false,
        bullets: [
          'Developed reactive customer analytics dashboards using React, D3.js, Node.js, and GraphQL, utilized by 120,000+ enterprise users.',
          'Implemented zero-downtime database migrations and automated unit/integration test suites achieving 94% test coverage.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Master of Science (M.S.) in Computer Science',
        institution: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        fieldOfStudy: 'Distributed Systems & Machine Learning',
        startDate: '2014-09',
        graduationDate: '2016-05',
        gpa: '3.92 / 4.00',
        honors: 'Graduate Honors Fellowship & Research Assistant',
        description: 'Published paper on High-Performance Distributed Consensus in Large Scale Networks.'
      },
      {
        id: 'edu-2',
        degree: 'Bachelor of Science (B.S.) in Software Engineering',
        institution: 'University of Texas at Austin',
        location: 'Austin, TX',
        fieldOfStudy: 'Computer Science',
        startDate: '2010-09',
        graduationDate: '2014-05',
        gpa: '3.88 / 4.00',
        honors: 'Dean’s Honor List (All Semesters)',
        description: 'President of Association for Computing Machinery (ACM) Student Chapter.'
      }
    ],
    skills: [
      { id: 'sk-1', category: 'Technical Skills', name: 'TypeScript & JavaScript', level: 95 },
      { id: 'sk-2', category: 'Technical Skills', name: 'React.js & Next.js', level: 95 },
      { id: 'sk-3', category: 'Technical Skills', name: 'Node.js & Express', level: 90 },
      { id: 'sk-4', category: 'Technical Skills', name: 'Go (Golang)', level: 85 },
      { id: 'sk-5', category: 'Technical Skills', name: 'Distributed Systems & Microservices', level: 92 },
      { id: 'sk-6', category: 'Tools & Frameworks', name: 'PostgreSQL & Redis', level: 90 },
      { id: 'sk-7', category: 'Tools & Frameworks', name: 'Docker & Kubernetes', level: 88 },
      { id: 'sk-8', category: 'Tools & Frameworks', name: 'AWS (EKS, Lambda, S3, RDS)', level: 88 },
      { id: 'sk-9', category: 'Tools & Frameworks', name: 'Kafka & RabbitMQ', level: 82 },
      { id: 'sk-10', category: 'Soft Skills', name: 'System Architecture Design', level: 95 },
      { id: 'sk-11', category: 'Soft Skills', name: 'Technical Leadership & Mentorship', level: 92 }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'OmniMesh: Open Source Distributed Cache',
        description: 'Ultra-low latency distributed caching engine written in Go with RAFT consensus and automated shard rebalancing.',
        technologies: ['Go', 'gRPC', 'Protobuf', 'Docker', 'Prometheus'],
        projectUrl: 'https://omnimesh.dev',
        githubUrl: 'https://github.com/alexrivera-eng/omnimesh',
        bullets: [
          'Achieved 120,000 requests/sec with under 2ms latency on 3-node commodity cluster benchmarks.',
          'Attracted 1,800+ GitHub stars and adopted by 15+ engineering teams worldwide.'
        ]
      },
      {
        id: 'proj-2',
        name: 'NexusPulse: Realtime Data Pipeline',
        description: 'Serverless streaming pipeline framework processing real-time websocket metrics with automated anomaly alerts.',
        technologies: ['TypeScript', 'Node.js', 'AWS Lambda', 'DynamoDB', 'React'],
        projectUrl: 'https://nexuspulse.io',
        githubUrl: 'https://github.com/alexrivera-eng/nexuspulse',
        bullets: [
          'Streamlined cloud event triggers with sub-second dashboard rendering.'
        ]
      }
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'AWS Certified Solutions Architect – Professional',
        organization: 'Amazon Web Services',
        issueDate: '2023-04',
        expirationDate: '2026-04',
        credentialId: 'AWS-PSA-990812',
        credentialUrl: 'https://aws.amazon.com/verification'
      },
      {
        id: 'cert-2',
        name: 'Certified Kubernetes Administrator (CKA)',
        organization: 'Cloud Native Computing Foundation (CNCF)',
        issueDate: '2022-09',
        expirationDate: '2025-09',
        credentialId: 'CKA-884102',
        credentialUrl: 'https://cncf.io/verify'
      }
    ],
    achievements: [
      {
        id: 'ach-1',
        title: 'Global Hackathon Grand Champion',
        organization: 'TechCrunch Disrupt Hackathon',
        date: '2020-10',
        description: 'Awarded 1st place out of 450 global teams for building an AI-assisted cloud disaster recovery engine.'
      }
    ],
    languages: [
      { id: 'lang-1', language: 'English', proficiency: 'Native / Bilingual' },
      { id: 'lang-2', language: 'Spanish', proficiency: 'Professional Working' }
    ],
    customSections: [],
    metadata: {
      createdAt: '2026-08-10T10:00:00.000Z',
      updatedAt: '2026-08-20T14:30:00.000Z',
      version: 3,
      downloadCount: 8,
      completionScore: 98,
    }
  },
  {
    id: 'resume-sample-pm',
    title: 'Lead Product Manager',
    targetRole: 'Principal / Lead Product Manager – Growth & Core Platform',
    targetJobDescription: 'Looking for a Lead Product Manager to drive product strategy, user acquisition, retention, and monetization. Requires proven track record in B2B SaaS, data-informed experimentation, roadmap execution, and executive stakeholder management.',
    templateId: 'corporate',
    styling: {
      accentColor: '#0f766e',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontSize: 'balanced',
      spacing: 'balanced',
      margins: 'balanced',
      paperSize: 'a4',
    },
    sections: JSON.parse(JSON.stringify(DEFAULT_SECTIONS)),
    personalInfo: {
      fullName: 'Sophia Chen',
      professionalTitle: 'Lead Product Manager | Growth & Monetization',
      email: 'sophia.chen@productleader.co',
      phone: '+1 (415) 890-3412',
      location: 'New York, NY',
      website: 'https://sophiachen.pm',
      linkedin: 'https://linkedin.com/in/sophia-chen-pm',
      github: '',
      portfolio: 'https://sophiachen.pm/case-studies',
      photoUrl: '',
      showPhoto: false,
    },
    summary: 'Strategic Lead Product Manager with 7+ years of experience accelerating revenue, product-led growth (PLG), and enterprise platform adoption. Successfully scaled SaaS ARR from $4M to $28M by optimizing onboarding funnels, self-serve tier expansions, and pricing packaging. Adept at synthesizing user insights, data telemetry, and executive vision into high-velocity execution.',
    experience: [
      {
        id: 'exp-pm-1',
        jobTitle: 'Lead Product Manager – Growth & Platform',
        company: 'HyperFlow SaaS',
        employmentType: 'Full-time',
        location: 'New York, NY',
        startDate: '2022-01',
        endDate: '',
        currentlyWorking: true,
        bullets: [
          'Spearheaded the Product-Led Growth (PLG) transition, redesigning self-serve activation funnel and driving a 38% increase in free-to-paid conversion.',
          'Pioneered interactive onboarding checklists and personalized product walkthroughs, reducing 30-day user churn by 24%.',
          'Managed cross-functional team of 11 engineers, 2 product designers, and 1 data scientist, consistently delivering 94% on-time roadmap milestones.',
          'Presented quarterly strategic roadmap reviews to C-Suite and Board of Directors, securing $3.5M dedicated initiative budget.'
        ]
      },
      {
        id: 'exp-pm-2',
        jobTitle: 'Senior Product Manager',
        company: 'Apex Analytics Corp',
        employmentType: 'Full-time',
        location: 'Boston, MA',
        startDate: '2019-03',
        endDate: '2021-12',
        currentlyWorking: false,
        bullets: [
          'Launched automated customer sentiment intelligence module that captured $6.2M in net-new enterprise annual contract value (ACV).',
          'Ran 65+ rigorous A/B experiments across pricing pages, checkout funnels, and feature discovery modals with statistically significant win rates.',
          'Authored 40+ comprehensive PRDs, user journey maps, and technical release notes in close partnership with Engineering and Customer Success.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-pm-1',
        degree: 'Master of Business Administration (MBA)',
        institution: 'Columbia Business School',
        location: 'New York, NY',
        fieldOfStudy: 'Strategy, Innovation & Product Management',
        startDate: '2017-09',
        graduationDate: '2019-05',
        gpa: '3.90 / 4.00',
        honors: 'Columbia Innovation Fellow',
        description: 'Led CBS Technology & Venture Club; organized Silicon Valley Product Treks.'
      },
      {
        id: 'edu-pm-2',
        degree: 'Bachelor of Science (B.S.) in Economics & Statistics',
        institution: 'University of Michigan',
        location: 'Ann Arbor, MI',
        fieldOfStudy: 'Econometrics & Quantitative Modeling',
        startDate: '2013-09',
        graduationDate: '2017-05',
        gpa: '3.85 / 4.00',
        honors: 'Summa Cum Laude',
        description: 'President of Michigan Undergraduate Data Science Guild.'
      }
    ],
    skills: [
      { id: 'sk-pm-1', category: 'Product Management', name: 'Product Strategy & Vision', level: 95 },
      { id: 'sk-pm-2', category: 'Product Management', name: 'PLG & Onboarding Optimization', level: 95 },
      { id: 'sk-pm-3', category: 'Product Management', name: 'A/B Testing & Experimentation', level: 90 },
      { id: 'sk-pm-4', category: 'Analytics & Tools', name: 'Amplitude, Mixpanel, SQL', level: 90 },
      { id: 'sk-pm-5', category: 'Analytics & Tools', name: 'Jira, Figma, Linear, Notion', level: 95 },
      { id: 'sk-pm-6', category: 'Leadership', name: 'Executive Stakeholder Management', level: 92 },
      { id: 'sk-pm-7', category: 'Leadership', name: 'Go-To-Market (GTM) Strategy', level: 88 }
    ],
    projects: [
      {
        id: 'proj-pm-1',
        name: 'PLG Freemium Conversion Overhaul',
        description: 'Complete redesign of enterprise trial to paid self-serve checkout funnel with customized team workspaces.',
        technologies: ['Mixpanel', 'Figma', 'Stripe Billing', 'Segment', 'SQL'],
        projectUrl: 'https://sophiachen.pm/plg-case-study',
        githubUrl: '',
        bullets: [
          'Generated $4.1M incremental ARR in the first 9 months post-rollout.',
          'Selected as benchmark case study at SaaS Growth Summit 2023.'
        ]
      }
    ],
    certifications: [
      {
        id: 'cert-pm-1',
        name: 'Reforge Product Leadership Certification',
        organization: 'Reforge',
        issueDate: '2022-06',
        expirationDate: '',
        credentialId: 'REF-PL-7719',
        credentialUrl: 'https://reforge.com'
      },
      {
        id: 'cert-pm-2',
        name: 'Certified Scrum Product Owner (CSPO)',
        organization: 'Scrum Alliance',
        issueDate: '2020-03',
        expirationDate: '2024-03',
        credentialId: 'CSPO-334190',
        credentialUrl: 'https://scrumalliance.org'
      }
    ],
    achievements: [
      {
        id: 'ach-pm-1',
        title: 'Product Leader of the Year',
        organization: 'HyperFlow SaaS Annual Excellence Awards',
        date: '2023-12',
        description: 'Recognized for delivering highest business impact product initiatives of FY23.'
      }
    ],
    languages: [
      { id: 'lang-pm-1', language: 'English', proficiency: 'Native' },
      { id: 'lang-pm-2', language: 'Mandarin Chinese', proficiency: 'Native / Fluent' }
    ],
    customSections: [],
    metadata: {
      createdAt: '2026-08-05T12:00:00.000Z',
      updatedAt: '2026-08-18T16:20:00.000Z',
      version: 2,
      downloadCount: 14,
      completionScore: 96,
    }
  },
  {
    id: 'resume-sample-design',
    title: 'Senior UI/UX Product Designer',
    targetRole: 'Senior Product Designer / UX Lead',
    targetJobDescription: 'Seeking a Senior Product Designer to craft intuitive, world-class user experiences across web and mobile platforms. Must possess deep mastery in Figma, Design Systems, User Research, Prototyping, and Micro-interactions.',
    templateId: 'creative',
    styling: {
      accentColor: '#7c3aed',
      fontFamily: 'Outfit, sans-serif',
      fontSize: 'balanced',
      spacing: 'balanced',
      margins: 'balanced',
      paperSize: 'a4',
    },
    sections: JSON.parse(JSON.stringify(DEFAULT_SECTIONS)),
    personalInfo: {
      fullName: 'Marcus Vance',
      professionalTitle: 'Senior UI/UX Product Designer & Design Systems Lead',
      email: 'marcus.vance@designcraft.studio',
      phone: '+1 (312) 555-7281',
      location: 'Chicago, IL (Remote)',
      website: 'https://marcusvance.design',
      linkedin: 'https://linkedin.com/in/marcus-vance-design',
      github: 'https://github.com/marcusvance-ui',
      portfolio: 'https://marcusvance.design/portfolio',
      photoUrl: '',
      showPhoto: false,
    },
    summary: 'Innovative Senior Product Designer with 6+ years creating human-centered design systems, responsive web applications, and mobile products. Champion of accessibility (WCAG 2.1 AAA) and atomic design principles. Designed unified design system adopted by 80+ engineers and 15 product squads, cutting design-to-code cycle times by 40%.',
    experience: [
      {
        id: 'exp-des-1',
        jobTitle: 'Senior UI/UX Product Designer',
        company: 'Luminary Interactive',
        employmentType: 'Full-time',
        location: 'Chicago, IL',
        startDate: '2021-08',
        endDate: '',
        currentlyWorking: true,
        bullets: [
          'Led end-to-end UX research and interface redesign for B2B financial suite, boosting System Usability Scale (SUS) score from 68 to 89.',
          'Built and maintained multi-brand Figma Design System with 400+ accessible components, tokens, and comprehensive interactive documentation.',
          'Conducted 70+ moderated usability test sessions and customer interviews to identify usability friction points.',
          'Partnered with Frontend Engineering to establish React component library parity with automated design token sync.'
        ]
      },
      {
        id: 'exp-des-2',
        jobTitle: 'UX Designer',
        company: 'PixelCraft Digital',
        employmentType: 'Full-time',
        location: 'Minneapolis, MN',
        startDate: '2018-06',
        endDate: '2021-07',
        currentlyWorking: false,
        bullets: [
          'Designed iOS and Android mobile banking applications utilized by 850,000+ active customers with a 4.8-star App Store rating.',
          'Created interactive micro-interactions and motion prototypes using Principle and ProtoPie, enhancing emotional engagement.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-des-1',
        degree: 'Bachelor of Fine Arts (B.F.A.) in Graphic & Interaction Design',
        institution: 'Rhode Island School of Design (RISD)',
        location: 'Providence, RI',
        fieldOfStudy: 'Human-Computer Interaction & Visual Communications',
        startDate: '2014-09',
        graduationDate: '2018-05',
        gpa: '3.91 / 4.00',
        honors: 'Presidential Scholar & Honors Exhibition',
        description: 'Senior Thesis: Adaptive Accessibility Patterns in Next-Generation Digital Interfaces.'
      }
    ],
    skills: [
      { id: 'sk-des-1', category: 'Design Skills', name: 'UI/UX Design & Wireframing', level: 98 },
      { id: 'sk-des-2', category: 'Design Skills', name: 'Figma & Design Systems', level: 98 },
      { id: 'sk-des-3', category: 'Design Skills', name: 'User Research & Usability Testing', level: 90 },
      { id: 'sk-des-4', category: 'Design Skills', name: 'Interactive Prototyping & Motion', level: 88 },
      { id: 'sk-des-5', category: 'Technical & Tools', name: 'Design Tokens, HTML/CSS, Storybook', level: 85 },
      { id: 'sk-des-6', category: 'Technical & Tools', name: 'Accessibility (WCAG 2.1 AAA)', level: 92 }
    ],
    projects: [
      {
        id: 'proj-des-1',
        name: 'Aura Design System (Open Token Spec)',
        description: 'Multi-platform design system token engine bridging Figma variables with CSS and iOS/Android styles.',
        technologies: ['Figma', 'Design Tokens', 'Storybook', 'TypeScript', 'Tailwind'],
        projectUrl: 'https://marcusvance.design/aura',
        githubUrl: 'https://github.com/marcusvance-ui/aura-tokens',
        bullets: [
          'Featured on Figma Community with 12,000+ duplicate downloads and community ratings of 4.9/5.'
        ]
      }
    ],
    certifications: [
      {
        id: 'cert-des-1',
        name: 'NN/g UX Master Certified (Interaction Design & Research)',
        organization: 'Nielsen Norman Group',
        issueDate: '2022-04',
        expirationDate: '',
        credentialId: 'NNG-UX-49021',
        credentialUrl: 'https://nngroup.com'
      }
    ],
    achievements: [
      {
        id: 'ach-des-1',
        title: 'Red Dot Design Award Winner (Interface Category)',
        organization: 'Red Dot International Design Competition',
        date: '2023-07',
        description: 'Honored for excellence in digital financial application UX and visual hierarchy.'
      }
    ],
    languages: [
      { id: 'lang-des-1', language: 'English', proficiency: 'Native' },
      { id: 'lang-des-2', language: 'French', proficiency: 'Conversational' }
    ],
    customSections: [],
    metadata: {
      createdAt: '2026-08-01T09:00:00.000Z',
      updatedAt: '2026-08-19T11:45:00.000Z',
      version: 1,
      downloadCount: 6,
      completionScore: 95,
    }
  }
];
