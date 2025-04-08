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
  };
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
