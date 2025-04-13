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
  description: string;
  image: string;
  genres: string[];
  platforms: string[];
  price: string;
  rating: number;
  playerCount: string;
  lastPlayed?: string;
  totalPlaytime?: string;
  releaseDate?: string;
  developer?: string;
  publisher?: string;
  screenshots?: string[];
  youtubeId?: string;
  metacritic?: number;
  esrbRating?: string;
  features?: string[];
  systemRequirements?: {
    minimum: {
      os: string;
      processor: string;
      memory: string;
      storage: string;
    };
    recommended: {
      os: string;
      processor: string;
      memory: string;
      storage: string;
    };
  };
  awards?: string[];
  languages?: string[];
  size?: string;
  relatedGames?: {
    id: string;
    title: string;
    image: string;
  }[];
  dlc?: {
    title: string;
    description: string;
    price: string | number;
  }[];
  achievements?: number;
}

// Add other type definitions as needed
