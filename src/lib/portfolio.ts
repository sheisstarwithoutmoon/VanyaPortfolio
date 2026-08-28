import resumeDataRaw from '@/data/resume-data.json';
import portfolioDataRaw from '@/data/portfolio-data.json';
import {
  portfolioDataSchema,
  type PortfolioData,
  type ResumePortfolioData,
} from './portfolio-schema';

const resumeData = resumeDataRaw as ResumePortfolioData;
const portfolioData = portfolioDataSchema.parse(portfolioDataRaw) as PortfolioData;

const normalize = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');

const mergeSkills = () => {
  const resumeSkills = resumeData.skills;
  const manualRows = portfolioData.skillDisplay.rows;
  const remainingSkills = [...resumeSkills];
  const mergedRows = manualRows.map((row) => {
    return row.map((manualSkill) => {
      const matchIndex = remainingSkills.findIndex((skill) => normalize(skill.name) === normalize(manualSkill.name));
      if (matchIndex === -1) {
        return manualSkill;
      }

      const [match] = remainingSkills.splice(matchIndex, 1);
      return {
        ...manualSkill,
        name: match.name,
      };
    });
  });

  if (remainingSkills.length > 0) {
    if (mergedRows.length === 0) {
      mergedRows.push(remainingSkills.map((skill) => ({ name: skill.name })));
    } else {
      remainingSkills.forEach((skill, index) => {
        const targetRow = index % mergedRows.length;
        mergedRows[targetRow].push({ name: skill.name });
      });
    }
  }

  return mergedRows;
};

const mergeProjects = () => {
  return portfolioData.projects;
};

const mergeByIndex = <T extends Record<string, unknown>>(manualItems: T[], resumeItems: Partial<T>[]) => {
  if (resumeItems.length === 0) {
    return manualItems;
  }

  const mergedItems = manualItems.map((manualItem, index) => ({
    ...manualItem,
    ...(resumeItems[index] ?? {}),
  }));

  if (resumeItems.length > manualItems.length) {
    mergedItems.push(...resumeItems.slice(manualItems.length) as T[]);
  }

  return mergedItems;
};

const mergedExperience = resumeData.experience && resumeData.experience.length > 0 
  ? resumeData.experience 
  : portfolioData.fallback.experience;

const mergedAchievements = resumeData.achievements && resumeData.achievements.length > 0
  ? resumeData.achievements
  : portfolioData.fallback.achievements;

export const portfolio = {
  profile: portfolioData.fallback.profile,
  hero: portfolioData.hero,
  footer: portfolioData.footer,
  contact: portfolioData.contact,
  socialLinks: portfolioData.socialLinks,
  skills: {
    rows: portfolioData.skillDisplay.rows,
  },
  projects: portfolioData.projects,
  research: portfolioData.research,
  leadership: portfolioData.leadership,
  experience: mergedExperience,
  education: portfolioData.fallback.education,
  achievements: mergedAchievements,
};

export type AppPortfolio = typeof portfolio;