export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type ExperienceLevel = "Entry" | "Mid-level" | "Senior" | "Lead";

export interface Job {
  id: number;
  title: string;
  companyId: number;
  company: string;
  location: string;
  type: JobType;
  experience: ExperienceLevel;
  salary: string;
  postedAt: string;
  logo: string;
  description?: string;
  requirements?: {
    id: number;
    title: string;
    description: string;
    required: boolean;
  }[];
  responsibilities?: string[];
  requiredTestIds?: number[];
  requiredCertificationIds?: number[];
  benefits?: string[];
  skills?: {
    name: string;
    level: number;
  }[];
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  level: "Basic" | "Intermediate" | "Advanced";
  required: boolean;
}

export interface DetailedJob extends Job {
  description: string;
  requirements: {
    id: number;
    title: string;
    description: string;
    required: boolean;
  }[];
  responsibilities: string[];
  tests: {
    id: number;
    title: string;
    description: string;
    duration: string;
    passScore: number;
  }[];
  certifications: Certification[];
  applicationProcess: string[];
  benefits: string[];
  skills: {
    name: string;
    level: number;
  }[];
  companyLogo?: string;
}

export interface Company {
  id: number;
  name: string;
  logo: string;
  description: string;
  longDescription?: string;
  industry: string;
  website: string;
  location: string;
  size: string;
  founded: number;
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  benefits?: string[];
  techStack?: string[];
  openPositions: number;
}

export interface Game {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  releaseDate: string;
  developer: string;
  publisher: string;
  genres: string[];
  platforms: string[];
  price: string;
  rating: number;
  features: string[];
  systemRequirements: {
    minimum: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      storage: string;
    };
  };
  lastPlayed: string;
  totalPlaytime: string;
  playerCount: string;
}

// Add other type definitions as needed
