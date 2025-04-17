export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type ExperienceLevel = "Entry" | "Mid-level" | "Senior" | "Lead";

export interface Job {
  id: number;
  title: string;
  companyId: number;
  company: string;
  logo?: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  postedAt: string;
  description: string;
  requirements: {
    id: number;
    title: string;
    description: string;
    required: boolean;
  }[];
  responsibilities: string[];
  requiredTestIds: number[];
  requiredCertificationIds: number[];
  skills: { name: string; level: number }[];
  benefits: string[];
  status: string;
  isHot?: boolean;
  isTrending?: boolean;
  isPremium?: boolean;
  youtubeVideoId?: string;
  positionType: string;
  createdAt: Date;
  updatedAt: Date;
  isSaved: boolean;
  isNew?: boolean;
  isVerifiedCompany?: boolean;
  hasTechnicalTest?: boolean;
  isActive?: boolean;
  isRemote?: boolean;
  isPartTime?: boolean;
  isFullTime?: boolean;
  isContract?: boolean;
  isInternship?: boolean;
  isEntryLevel?: boolean;
  isMidLevel?: boolean;
  isSeniorLevel?: boolean;
  isLeadLevel?: boolean;
  isManagement?: boolean;
  isTechnical?: boolean;
  isDesign?: boolean;
  isArt?: boolean;
  isAudio?: boolean;
  isProduction?: boolean;
  isMarketing?: boolean;
  isCommunity?: boolean;
  isSupport?: boolean;
  isOther?: boolean;
}

export interface Certification {
  id: number;
  title: string;
  description: string;
  validUntil: string;
  skills: string[];
  jobId: number;
}

export interface Company {
  id: number;
  name: string;
  logo: string;
  description: string;
  industry: string;
  website: string;
  location: string;
  size: string;
  founded: number;
  socialMedia: {
    twitter?: string;
    linkedin?: string;
  };
  benefits: string[];
  techStack: string[];
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

export interface Test {
  id: number;
  title: string;
  description: string;
  duration: number;
  difficulty: string;
  skills: string[];
  jobId: number;
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
  skills?: { name: string; level: number }[];
  experience?: string[];
  education?: string[];
  certifications?: number[];
  savedJobs?: number[];
  appliedJobs?: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Blog {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  tags: string[];
  topic: string;
  readTime: string;
  authorAvatar: string;
  likes: number;
  comments: {
    id: number;
    author: string;
    avatar: string;
    content: string;
    date: string;
    likes: number;
  }[];
}

// Add other type definitions as needed
