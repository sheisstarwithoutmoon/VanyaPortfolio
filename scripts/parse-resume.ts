import fs from 'node:fs/promises';
import path from 'node:path';
import pdfParse from 'pdf-parse';
import {
  resumePortfolioSchema,
  type ResumePortfolioData,
} from '../src/lib/portfolio-schema';

const workspaceRoot = path.resolve(__dirname, '..');
const resumePath = path.join(workspaceRoot, 'public', 'resume.pdf');
const outputPath = path.join(workspaceRoot, 'src', 'data', 'resume-data.json');
const tempOutputPath = `${outputPath}.tmp`;

const headingAliases = new Map<string, string>([
  ['summary', 'summary'],
  ['profile', 'summary'],
  ['about', 'summary'],
  ['education', 'education'],
  ['academics', 'education'],
  ['skills', 'skills'],
  ['technical skills', 'skills'],
  ['experience', 'experience'],
  ['work experience', 'experience'],
  ['internship experience', 'experience'],
  ['projects', 'ignored'],
  ['project experience', 'ignored'],
  ['research', 'ignored'],
  ['research work publications', 'ignored'],
  ['leadership', 'ignored'],
  ['leadership activities', 'ignored'],
  ['achievements publications', 'achievements'],
  ['achievements and publications', 'achievements'],
  ['achievements', 'achievements'],
  ['honors and awards', 'achievements'],
  ['honors awards', 'achievements'],
  ['awards', 'achievements'],
]);

const normalize = (value: string) => value.replace(/\s+/g, ' ').trim();

const normalizeKey = (value: string) => normalize(value).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const isHeading = (line: string) => {
  const key = normalizeKey(line);
  return headingAliases.has(key);
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'item';

const splitBlocks = (lines: string[]) => {
  const blocks: string[][] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (!line.trim()) {
      if (current.length > 0) {
        blocks.push(current);
        current = [];
      }
      continue;
    }

    current.push(line);
  }

  if (current.length > 0) {
    blocks.push(current);
  }

  return blocks;
};

const toBulletList = (lines: string[]) =>
  lines
    .flatMap((line) => line.split(/[•|]/g))
    .map((item) => item.replace(/^[-*]\s*/, '').trim())
    .filter(Boolean);

const extractEmail = (text: string) => text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];

const extractUrls = (text: string) => text.match(/https?:\/\/[^\s)\]]+/gi) ?? [];

const parseNameAndSummary = (lines: string[]) => {
  const nonEmpty = lines.map(normalize).filter(Boolean);
  const firstHeadingIndex = nonEmpty.findIndex(isHeading);
  const headerLines = firstHeadingIndex === -1 ? nonEmpty.slice(0, 4) : nonEmpty.slice(0, firstHeadingIndex);

  const name = headerLines[0] || 'Unknown';
  const headline = headerLines[1] || '';
  const summary = headerLines.slice(2).join(' ');
  const email = extractEmail(lines.join('\n'));
  const urls = extractUrls(lines.join('\n'));

  return {
    name,
    email,
  };
};

const normalizeSkillKey = (value: string) => normalize(value).replace(/[^a-z0-9]+/g, '');

const skillAliases = new Map<string, string>([
  ['cplusplus', 'C++'],
  ['c++', 'C++'],
  ['python', 'Python'],
  ['java', 'Java'],
  ['javascript', 'JavaScript'],
  ['typescript', 'TypeScript'],
  ['dart', 'Dart'],
  ['flutter', 'Flutter'],
  ['nextjs', 'Next.js'],
  ['reactjs', 'React.js'],
  ['tailwindcss', 'Tailwind CSS'],
  ['html', 'HTML5'],
  ['css', 'CSS3'],
  ['nodejs', 'Node.js'],
  ['expressjs', 'Express.js'],
  ['firebase', 'Firebase'],
  ['firebasefirestore', 'Firebase Firestore'],
  ['mongodb', 'MongoDB'],
  ['mysql', 'MySQL'],
  ['redis', 'Redis'],
  ['googlecloudplatform', 'Google Cloud'],
  ['googlecloud', 'Google Cloud'],
  ['aws', 'AWS Cloud'],
  ['awsec2', 'AWS Cloud'],
  ['git', 'Git'],
  ['github', 'GitHub'],
  ['datastructuresdsa', 'Data Structures (DSA)'],
  ['datastructures', 'Data Structures (DSA)'],
  ['systemdesign', 'System Design'],
  ['restapis', 'REST APIs'],
  ['graphql', 'GraphQL'],
  ['socketio', 'Socket.IO'],
  ['dbms', 'DBMS'],
  ['operatingsystems', 'Operating Systems'],
  ['androidstudio', 'Android Studio'],
]);

const canonicalizeSkillName = (value: string) => {
  const compact = value.replace(/\s+/g, ' ').trim();
  const key = normalizeSkillKey(compact);

  if (key === 's3' || key === 'lambda' || key === 'ec2') {
    return null;
  }

  if (/^google cloud platform$/i.test(compact)) {
    return 'Google Cloud';
  }

  if (/^aws\s*\(ec2$/i.test(compact) || /^aws$/i.test(compact)) {
    return 'AWS Cloud';
  }

  if (/^data structures algorithms \(dsa\)$/i.test(compact) || /^data structures algorithms$/i.test(compact)) {
    return 'Data Structures (DSA)';
  }

  return skillAliases.get(key) ?? compact;
};

const parseSkills = (sectionLines: string[]) =>
  sectionLines
    .flatMap((line) => {
      const withoutLabel = line.replace(/^[^:]+:\s*/u, '');
      return withoutLabel.split(/[•,|]/g);
    })
    .map((item) => normalize(item.replace(/^[-*]\s*/, '')))
    .filter(Boolean)
    .map((item) => canonicalizeSkillName(item))
    .filter((item): item is string => Boolean(item))
    .map((name) => ({ name }));

const parseEducation = (sectionLines: string[]) => {
  const blocks = splitBlocks(sectionLines);

  return blocks.map((block, index) => {
    const [firstLine = '', secondLine = '', thirdLine = ''] = block.map(normalize);
    const periodMatch = block.join(' ').match(/(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[^\n]*?\b\d{4}\s*[-–—]\s*[^\n]*?\b\d{4}\b)|((?:\b\d{4}\b).{0,18}(?:-|–|—).{0,18}(?:\b\d{4}\b))/i);

    return {
      slug: slugify(`${firstLine || 'education'}-${index}`),
      institution: firstLine
        .replace(/,\s*Andhra Pradesh$/i, '')
        .replace(/Information TechnologySri City/i, 'Information Technology, Sri City')
        .replace(/Sri City$/i, 'Sri City'),
      degree: (secondLine || thirdLine || firstLine).replace(/-\s*CGPA\s*-\s*.+$/i, '').trim(),
      period: periodMatch?.[0]?.replace(/[–—]/g, '-') || thirdLine || '',
      gpa: block.find((line) => /gpa|cgpa/i.test(line))?.match(/\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?/)?.[0],
      url: extractUrls(block.join(' ')).find(Boolean),
    };
  }).filter((entry) => entry.institution || entry.degree);
};

const parseExperience = (sectionLines: string[]) => {
  const lines = sectionLines.map((line) => normalize(line)).filter(Boolean);
  const firstLine = lines[0] || '';
  const secondLine = lines[1] || '';
  const bulletLines = lines.slice(2);

  const durationMatch = firstLine.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s*\d{4}\s*[–-]\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s*\d{4}/i);
  const duration = durationMatch?.[0]?.replace(/[–—]/g, '-') || '';
  const companyPrefix = duration
    ? firstLine.slice(0, firstLine.indexOf(durationMatch?.[0] || ''))
    : firstLine;
  const locationMatch = companyPrefix.match(/,\s*([^()]+?)(?:\s*\(([^)]+)\))?\s*$/);
  const company = companyPrefix
    .replace(/,\s*[^,()]+?\s*(?:\(([^)]+)\))?\s*$/, '')
    .replace(/\s+/g, ' ')
    .replace(/[,\s]+$/, '')
    .trim();
  const locationParts = [locationMatch?.[1]?.trim(), locationMatch?.[2]?.trim()].filter(Boolean);
  const location = locationParts.length > 0 ? locationParts.join(' ').trim() : undefined;

  const knownTechMarkers = [
    'NodeJs',
    'Node.js',
    'Flutter',
    'Firebase',
    'GCP',
    'ReactJs',
    'React.js',
    'NextJs',
    'Next.js',
    'JavaScript',
    'TypeScript',
    'MongoDB',
    'Redis',
    'GraphQl',
    'GraphQL',
    'ExpressJs',
    'Express.js',
    'Groq',
    'Travily',
    'Docker',
    'Jest',
  ];

  const markerIndex = knownTechMarkers
    .map((marker) => ({ marker, index: secondLine.indexOf(marker) }))
    .filter((entry) => entry.index >= 0)
    .sort((left, right) => left.index - right.index)[0]?.index;

  const role = markerIndex === undefined ? secondLine : secondLine.slice(0, markerIndex).trim();
  const techLine = markerIndex === undefined ? '' : secondLine.slice(markerIndex).trim();
  const tech = techLine
    .split(/[•,|]/g)
    .map((item) => normalize(item))
    .filter(Boolean)
    .map((item) => skillAliases.get(normalizeSkillKey(item)) ?? item);

  return [
    {
      slug: slugify(`${role || company || 'experience'}-0`),
      role: role || 'Experience',
      company: company || firstLine || role || 'Experience',
      location,
      duration: duration || '',
      tech,
      bullets: toBulletList(bulletLines),
    },
  ].filter((entry) => entry.role || entry.company);
};

const parseAchievements = (sectionLines: string[]) => {
  const lines = sectionLines.map(normalize).filter(Boolean);
  const bulletItems: string[] = [];

  for (const line of lines) {
    if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
      bulletItems.push(line.replace(/^[-•*]\s*/, '').trim());
    } else {
      if (bulletItems.length > 0) {
        bulletItems[bulletItems.length - 1] += ' ' + line;
      } else {
        bulletItems.push(line);
      }
    }
  }

  return bulletItems.map((item) => {
    const colonIndex = item.indexOf(':');
    if (colonIndex === -1) {
      return {
        title: item,
        description: '',
      };
    }
    const title = item.slice(0, colonIndex).trim();
    const description = item.slice(colonIndex + 1).trim();
    return {
      title,
      description,
    };
  }).filter((item) => item.title);
};

const buildResumeData = async () => {
  const file = await fs.readFile(resumePath);
  const pdf = await pdfParse(file);
  const text = normalize(pdf.text.replace(/\u0000/g, ' '));

  if (text.length < 200) {
    throw new Error('Extracted resume text is too short to parse safely.');
  }

  const rawLines = pdf.text
    .split(/\r?\n/)
    .map((line: string) => normalize(line.replace(/\u0000/g, ' ')));

  const sections: Record<string, string[]> = {
    skills: [],
    education: [],
    experience: [],
    achievements: [],
  };
  const collectableSections = new Set(['skills', 'education', 'experience', 'achievements']);

  let currentSection: keyof typeof sections | null = null;
  const headerLines: string[] = [];

  for (const line of rawLines) {
    if (!line) {
      if (currentSection) {
        sections[currentSection].push('');
      }
      continue;
    }

    const sectionKey = headingAliases.get(normalizeKey(line));
    if (sectionKey) {
      currentSection = collectableSections.has(sectionKey) ? sectionKey as keyof typeof sections : null;
      continue;
    }

    if (!currentSection && headerLines.length < 8) {
      headerLines.push(line);
      continue;
    }

    if (currentSection) {
      sections[currentSection].push(line);
    }
  }

  const profile = parseNameAndSummary(headerLines.length > 0 ? headerLines : rawLines);

  const deterministic: ResumePortfolioData = {
    profile: {
      name: profile.name,
      email: profile.email,
    },
    skills: parseSkills(sections.skills),
    experience: parseExperience(sections.experience),
    education: parseEducation(sections.education),
    achievements: parseAchievements(sections.achievements),
  };

  if (deterministic.profile.name && deterministic.skills.length > 0 && deterministic.experience.length > 0) {
    return deterministic;
  }

  return deterministic;
};

const main = async () => {
  try {
    const resumeData = await buildResumeData();
    const validated = resumePortfolioSchema.parse(resumeData);
    const serialized = `${JSON.stringify(validated, null, 2)}\n`;

    await fs.writeFile(tempOutputPath, serialized, 'utf8');
    await fs.rename(tempOutputPath, outputPath);

    console.log(`Resume parsed successfully: ${outputPath}`);
    console.log(`Sections: skills=${validated.skills.length}, experience=${validated.experience.length}, education=${validated.education.length}`);
  } catch (error) {
    await fs.rm(tempOutputPath, { force: true }).catch(() => undefined);
    const message = error instanceof Error ? error.message : String(error);
    console.error('Failed to parse resume safely. Existing portfolio data was not modified.');
    console.error(message);
    process.exitCode = 1;
  }
};

void main();