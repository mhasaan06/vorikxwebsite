export const clients = [
  { name: 'BHDS', label: 'Health & Pharmacy System' },
  { name: 'SkillSwap', label: 'Peer Learning Platform' },
  { name: 'FinVault', label: 'FinTech Platform' },
  { name: 'MedConnect', label: 'HealthTech Provider' },
  { name: 'Artisan Market', label: 'E-Commerce Global' },
  { name: 'Metrix', label: 'Analytics Solutions' },
];

export const industries = [
  {
    slug: 'startups',
    title: 'Startups & Founders',
    desc: 'Rapid MVP engineering, scalable architecture foundations, and agile execution to get to market fast.',
    badge: 'Seed to Series A',
  },
  {
    slug: 'smb',
    title: 'Growing SMBs',
    desc: 'Custom software platforms, process automation, and legacy modernization to power operational efficiency.',
    badge: 'Scale & Growth',
  },
  {
    slug: 'enterprise',
    title: 'Enterprise Teams',
    desc: 'Mission-critical systems, distributed backend infrastructure, high-security compliance, and cloud engineering.',
    badge: 'Enterprise Grade',
  },
  {
    slug: 'fintech-healthtech',
    title: 'HealthTech & FinTech',
    desc: 'HIPAA & SOC2-compliant data architecture, real-time analytics, and high-precision secure APIs.',
    badge: 'Regulated Tech',
  },
];

export const stats = [
  { value: '+75', label: 'Products Built This Year' },
  { value: '2026', label: 'Founded in Lahore, Pakistan' },
  { value: '100%', label: 'Commitment to Quality & Maintenance' },
  { value: '98%', label: 'Client Retention Rate' },
  { value: '99.9%', label: 'Target System Uptime' },
];

export const testimonials = [
  // PENDING CLIENT APPROVAL — confirm wording before public launch
  {
    quote: 'Our store used to run entirely on paper and memory. The system VORIKX built gave us a real inventory dashboard, and having a separate mode for staff means we don\'t worry about who has access to what. It\'s made day-to-day management genuinely easier.',
    author: 'Dr. Muhammad Amin',
    role: 'BHDS',
    initials: 'MA',
    servicesUsed: ['Custom Software', 'Inventory Systems', 'Role-Based Auth'],
  },
  {
    quote: 'VORIKX delivered a platform that exceeded our performance benchmarks. Their engineering discipline and attention to architectural detail is remarkable.',
    author: 'Michael Torres',
    role: 'CTO, FinVault',
    initials: 'MT',
    servicesUsed: ['Custom Software', 'Backend & API', 'Cloud & DevOps'],
  },
  {
    quote: 'Working with VORIKX felt like having a senior engineering team in-house. They challenged our assumptions and built something better than we imagined.',
    author: 'Elena Rodriguez',
    role: 'Founder, Artisan Market',
    initials: 'ER',
    servicesUsed: ['Web Development', 'E-Commerce', 'UI/UX Design'],
  },
];

export const faq = [
  {
    question: 'What is your typical project timeline?',
    answer: 'Timelines vary by scope, but most projects follow a 2–4 week discovery phase, 4–12 weeks of design and development, and 1–2 weeks of testing and launch. We provide detailed timeline estimates during the proposal phase.',
  },
  {
    question: 'How do you handle project pricing?',
    answer: 'We offer both fixed-price and time-and-materials models depending on project requirements. Fixed-price works well for well-defined scopes, while T&M provides flexibility for evolving requirements. We always provide transparent estimates upfront.',
  },
  {
    question: 'What technologies do you work with?',
    answer: 'We are technology-agnostic and choose the best tools for each project. Our core expertise includes React, Node.js, Python, Flutter, AWS, and PostgreSQL, but we adapt to client requirements and existing tech stacks.',
  },
  {
    question: 'Do you provide ongoing support after launch?',
    answer: 'Yes. We believe in quality and maintenance throughout, not just a one-time launch. We offer flexible support packages that include proactive monitoring, bug fixes, feature enhancements, and security updates.',
  },
  {
    question: 'Can you work with our existing development team?',
    answer: 'Absolutely. We frequently embed with client teams, contributing to existing codebases and workflows. We can also provide technical leadership, code reviews, and mentoring to elevate your internal team.',
  },
  {
    question: 'How do you ensure project quality?',
    answer: 'Quality is built into our process: code reviews on every pull request, automated testing pipelines, staging environments that mirror production, and user acceptance testing before every release.',
  },
];

export const team = [
  {
    name: 'Muhammad Hasaan',
    role: 'Founder & CEO',
    initials: 'MH',
    photo: '/team/hasaan.jpeg',
    bio: 'Full-Stack & AI/ML Engineer. Founded VORIKX with a vision to deliver digital products built on quality and long-term maintenance.',
  },
  {
    name: 'Ahmad Mujtaba',
    role: 'Co-Founder & HR',
    initials: 'AM',
    photo: '/team/ahmad.jpeg',
    bio: 'Python Developer, maintaining VORIKX as his own vision alongside Hasaan.',
  },
  {
    name: 'Tasveeb Riaz',
    role: 'Head of Engineering & Product Manager',
    initials: 'TR',
    photo: '/team/tasveeb.jpeg',
    bio: 'Lead Designer, managing workflow and delivery across VORIKX\'s projects.',
  },
];

export const processSteps = [
  {
    number: '01',
    title: 'Discovery & Strategic Alignment',
    desc: 'We start by understanding your business, users, workflows, and commercial goals. Through collaborative workshops and architectural research, we define the exact problem space, technical requirements, and strategic opportunities.',
    deliverables: ['Requirements Specification', 'Architecture Blueprint', 'User Personas & Journey Map'],
    isMain: true,
    phaseLabel: 'Core Pillar I — Foundation',
  },
  {
    number: '02',
    title: 'Proposal & Scope Finalization',
    desc: 'Based on discovery insights, we deliver a comprehensive technical roadmap with crystal-clear milestones, sprint cadences, and transparent pricing.',
    deliverables: ['Technical Proposal', 'Sprint Milestone Roadmap', 'Fixed / T&M Budget'],
    isMain: false,
    phaseLabel: 'Planning Stage',
  },
  {
    number: '03',
    title: 'Design & Prototyping',
    desc: 'Our design team crafts intuitive user journeys, wireframes, and production-ready design systems tested against real interaction patterns.',
    deliverables: ['Wireframes', 'Interactive Prototypes', 'Design System Tokens'],
    isMain: false,
    phaseLabel: 'Design Stage',
  },
  {
    number: '04',
    title: 'Agile Development & Core Engineering',
    desc: 'We build in disciplined two-week agile sprints with working software delivered at every stage. Regular demos, automated testing pipelines, and continuous integration give you full visibility and agility.',
    deliverables: ['Production-Grade Software', 'Sprint Demos Every 2 Weeks', 'Clean Code & System Docs'],
    isMain: true,
    phaseLabel: 'Core Pillar II — Execution',
  },
  {
    number: '05',
    title: 'Testing, Security & QA',
    desc: 'Rigorous multi-layer quality assurance including end-to-end testing, automated unit tests, performance load tests, and security vulnerability audits.',
    deliverables: ['QA & Test Coverage Reports', 'Lighthouse 90+ Benchmarks', 'Security Audit Signoff'],
    isMain: false,
    phaseLabel: 'Verification Stage',
  },
  {
    number: '06',
    title: 'Production Deployment & Launch',
    desc: 'We manage seamless zero-downtime deployments, real-time observability telemetry, and DNS cutovers with our team actively monitoring live traffic.',
    deliverables: ['Zero-Downtime Deployment', 'Monitoring & Alerting Setup', 'Go-Live Handover'],
    isMain: false,
    phaseLabel: 'Delivery Stage',
  },
  {
    number: '07',
    title: 'Ongoing Quality, Maintenance & SLA',
    desc: 'Launch is not the finish line — it is the beginning. We provide continuous proactive maintenance, uptime guarantees, security patches, performance tuning, and feature evolution throughout your product\'s lifecycle.',
    deliverables: ['SLA Maintenance Contract', 'Monthly Performance Audits', 'Continuous Feature Roadmap'],
    isMain: true,
    phaseLabel: 'Core Pillar III — Longevity',
  },
];

export const technologies = [
  'React', 'Next.js', 'Vue.js', 'TypeScript', 'Node.js', 'Python',
  'PostgreSQL', 'Docker', 'Premiere Pro', 'After Effects', 'Figma',
  'Redis', 'AWS', 'Google Cloud', 'GraphQL', 'Tailwind CSS',
];
