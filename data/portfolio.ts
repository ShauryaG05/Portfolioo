export type Project = {
  name: string;
  href: string;
  index: string;
  visual: "packport" | "mvf" | "strome";
};

export type Experience = {
  role: string;
  organization?: string;
  description?: string;
};

export type TechnologyGroup = {
  name: string;
  entries: readonly string[];
};

export const portfolio = {
  name: "Shaurya Gupta",
  roles: ["Full Stack Developer", "Backend Engineer", "Ai engineer"],
  heroImage: {
    src: "/images/shaurya-halftone-portrait.webp",
    alt: "Gold halftone editorial portrait of Shaurya Gupta, based on his photograph",
    width: 1190,
    height: 1322,
  },
  cartoonImage: {
    src: "/images/shaurya-halftone-cartoon.webp",
    alt: "Separate illustrated character portrait of Shaurya Gupta",
    width: 1179,
    height: 1334,
  },
  projects: [
    { name: "Packport", href: "https://pack-port-nine.vercel.app/", index: "01", visual: "packport" },
    { name: "MVF", href: "https://www.movieforecasts.com/", index: "02", visual: "mvf" },
    { name: "Strome Sense", href: "https://strome-sense.vercel.app/", index: "03", visual: "strome" },
  ] satisfies Project[],
  technologyGroups: [
    { name: "Frontend", entries: ["React", "TypeScript", "tailwind css", "ejs"] },
    { name: "Backend", entries: ["Node.js", "Express", "Python", "REST API", "GraphQl API", "FastAPI", "Socket.io"] },
    { name: "Databases", entries: ["MongoDB", "MySQL", "Redis"] },
    { name: "Authentication", entries: ["JWT", "bcrypt"] },
    { name: "AI & Machine Learning", entries: ["LangChain", "Scikit-learn"] },
    { name: "Tools & Deployment", entries: ["Docker", "Vercel", "Render", "Git", "GitHub"] },
    { name: "Security / Cryptography", entries: ["MD5"] },
    { name: "Unclassified", entries: ["stack"] },
  ] satisfies TechnologyGroup[],
  experience: [
    { role: "Full Stack Developer intern", organization: "inovamax technologies pvt lmt" },
    { role: "Blogger", description: "Bloged about movies and webseries" },
  ] satisfies Experience[],
  contact: {
    email: "shauryag.builds@gmail.com",
    profiles: [
      { label: "GitHub", href: "https://github.com/ShauryaG05" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/shaurya-gupta-5581393a2/" },
    ],
  },
} as const;


