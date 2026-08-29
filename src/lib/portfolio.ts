import portfolioDataRaw from '@/data/portfolio-data.json';
import {
  portfolioDataSchema,
  type PortfolioData,
} from './portfolio-schema';

const portfolioData = portfolioDataSchema.parse(portfolioDataRaw) as PortfolioData;

export const portfolio = {
  profile: portfolioData.fallback.profile,
  hero: portfolioData.hero,
  footer: portfolioData.footer,
  contact: portfolioData.contact,
  socialLinks: portfolioData.socialLinks,
  skills: {
    rows: portfolioData.skillDisplay.rows,
  },
  skillCategories: portfolioData.skillCategories ?? [],
  projects: portfolioData.projects,
  research: portfolioData.research,
  leadership: portfolioData.leadership,
  experience: portfolioData.fallback.experience,
  education: portfolioData.fallback.education,
  achievements: portfolioData.fallback.achievements,
};

export type AppPortfolio = typeof portfolio;