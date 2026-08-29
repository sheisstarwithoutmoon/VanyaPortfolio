import { z } from 'zod';

export const skillSchema = z.object({
  name: z.string().min(1),
  category: z.string().optional(),
});

export const experienceSchema = z.object({
  slug: z.string().min(1),
  role: z.string().min(1),
  company: z.string().min(1),
  location: z.string().optional(),
  duration: z.string().min(1),
  tech: z.array(z.string().min(1)).default([]),
  bullets: z.array(z.string().min(1)).default([]),
});

export const educationSchema = z.object({
  slug: z.string().min(1),
  institution: z.string().min(1),
  degree: z.string().min(1),
  period: z.string().min(1),
  gpa: z.string().optional(),
  url: z.string().url().optional(),
});

export const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  tech: z.string().optional(),
  bullets: z.array(z.string().min(1)).optional(),
});

export const certificationSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().optional(),
  year: z.string().optional(),
  credentialUrl: z.string().url().optional(),
});

export const achievementSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const profileSchema = z.object({
  name: z.string().min(1),
  headline: z.string().optional(),
  summary: z.string().optional(),
  location: z.string().optional(),
  email: z.string().email().optional(),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
});

export const resumePortfolioSchema = z.object({
  profile: profileSchema,
  skills: z.array(skillSchema).default([]),
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  achievements: z.array(achievementSchema).default([]),
});

export const socialLinkSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  href: z.string().min(1),
  external: z.boolean().optional(),
});

export const skillDisplaySchema = z.object({
  name: z.string().min(1),
  logo: z.string().optional(),
});

export const projectDisplaySchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  tech: z.string().min(1),
  github: z.string().min(1),
  live: z.string().optional(),
});

export const researchSchema = z.object({
  title: z.string().min(1),
  conference: z.string().min(1),
  badge: z.string().min(1),
  description: z.string().min(1),
  tech: z.string().min(1),
  link: z.string().min(1),
});

export const leadershipSchema = z.object({
  title: z.string().min(1),
  organization: z.string().min(1),
  duration: z.string().min(1),
  images: z.array(z.string().min(1)).optional(),
  bullets: z.array(z.string().min(1)).default([]),
});

export const portfolioDataSchema = z.object({
  hero: z.object({
    greeting: z.string().min(1),
    name: z.string().min(1),
    headline: z.string().min(1),
    portrait: z.string().min(1),
    backgroundImage: z.string().min(1),
    resumeHref: z.string().min(1),
    resumeDownloadName: z.string().min(1),
  }),
  footer: z.object({
    line1: z.string().min(1),
    line2: z.string().min(1),
  }),
  contact: z.object({
    title: z.string().min(1),
    headline: z.string().min(1),
    description: z.string().min(1),
    bullets: z.array(z.string().min(1)).default([]),
    emailLabel: z.string().min(1),
    resumeLabel: z.string().min(1),
    emailSubject: z.string().min(1),
    email: z.string().email(),
  }),
  socialLinks: z.array(socialLinkSchema).default([]),
  skillDisplay: z.object({
    rows: z.array(z.array(skillDisplaySchema)).default([]),
  }),
  projects: z.array(projectDisplaySchema).default([]),
  research: z.array(researchSchema).default([]),
  leadership: z.array(leadershipSchema).default([]),
  fallback: resumePortfolioSchema,
});

export type ResumePortfolioData = z.infer<typeof resumePortfolioSchema>;
export type PortfolioData = z.infer<typeof portfolioDataSchema>;