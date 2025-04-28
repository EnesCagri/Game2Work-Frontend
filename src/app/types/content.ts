// Base content interface that all content types will extend
export interface ContentBase {
  id: string;
  title: string;
  description: string;
  image: string;
  type: "game" | "kickstart" | "other";
  createdAt: string;
  updatedAt: string;
}

// Game specific content interface
export interface GameContent extends ContentBase {
  type: "game";
  genres: string[];
  platforms: string[];
  price: string;
  rating: number;
  tags: string[];
  systemRequirements?: {
    minimum: string;
    recommended: string;
  };
  linkedKickstartId?: string; // Optional reference to related kickstart project
  kickstart?: {
    isOngoing: boolean;
    collectedFund: number;
    goal: number;
    followers: number;
    donations: Array<{
      amount: number;
      date: string;
      donor?: string;
    }>;
    startDate: string | null;
    endDate: string | null;
    status: "Active" | "Upcoming" | "Completed" | "Failed";
  };
}

// Kickstart specific content interface
export interface KickstartContent extends ContentBase {
  type: "kickstart";
  status: "Active" | "Upcoming" | "Completed" | "Failed";
  category: "Software" | "Game" | "Platform" | "Hardware";
  currentFunding: number;
  goal: number;
  backers: number;
  endDate: string;
  linkedGameId?: string; // Optional reference to related game
}

// Other content interface for future content types
export interface OtherContent extends ContentBase {
  type: "other";
  category: string;
  metadata: Record<string, any>;
}

// Union type for all content types
export type PlatformContent = GameContent | KickstartContent | OtherContent;

// Type guard functions
export function isGameContent(
  content: PlatformContent
): content is GameContent {
  return content.type === "game";
}

export function isKickstartContent(
  content: PlatformContent
): content is KickstartContent {
  return content.type === "kickstart";
}

export function isOtherContent(
  content: PlatformContent
): content is OtherContent {
  return content.type === "other";
}
