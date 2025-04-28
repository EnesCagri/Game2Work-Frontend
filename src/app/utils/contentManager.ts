import {
  PlatformContent,
  GameContent,
  KickstartContent,
  isGameContent,
  isKickstartContent,
} from "../types/content";
import contentsData from "../data/contents.json";

// Get all contents
export const getAllContents = (): PlatformContent[] => {
  return contentsData.contents;
};

// Get all games
export const getAllGames = (): GameContent[] => {
  return contentsData.contents.filter(isGameContent);
};

// Get all kickstarts
export const getAllKickstarts = (): KickstartContent[] => {
  return contentsData.contents.filter(isKickstartContent);
};

// Get active kickstarts
export const getActiveKickstarts = (): KickstartContent[] => {
  return getAllKickstarts().filter(
    (kickstart) => kickstart.status === "Active"
  );
};

// Get completed kickstarts
export const getCompletedKickstarts = (): KickstartContent[] => {
  return getAllKickstarts().filter(
    (kickstart) => kickstart.status === "Completed"
  );
};

// Get upcoming kickstarts
export const getUpcomingKickstarts = (): KickstartContent[] => {
  return getAllKickstarts().filter(
    (kickstart) => kickstart.status === "Upcoming"
  );
};

// Get content by ID
export const getContentById = (id: string): PlatformContent | undefined => {
  return contentsData.contents.find((content) => content.id === id);
};

// Get content by type
export const getContentByType = (
  type: "game" | "kickstart" | "other"
): PlatformContent[] => {
  return contentsData.contents.filter((content) => content.type === type);
};

// Get content by category (for kickstarts)
export const getKickstartsByCategory = (
  category: string
): KickstartContent[] => {
  return getAllKickstarts().filter(
    (kickstart) => kickstart.category === category
  );
};

// Get games by genre
export const getGamesByGenre = (genre: string): GameContent[] => {
  return getAllGames().filter((game) => game.genres.includes(genre));
};

// Get games by platform
export const getGamesByPlatform = (platform: string): GameContent[] => {
  return getAllGames().filter((game) => game.platforms.includes(platform));
};

// Get related content (linked games/kickstarts)
export const getRelatedContent = (
  content: PlatformContent
): PlatformContent | undefined => {
  if (isGameContent(content) && content.linkedKickstartId) {
    return getContentById(content.linkedKickstartId);
  }
  if (isKickstartContent(content) && content.linkedGameId) {
    return getContentById(content.linkedGameId);
  }
  return undefined;
};

// Search contents by title or description
export const searchContents = (query: string): PlatformContent[] => {
  const lowerQuery = query.toLowerCase();
  return contentsData.contents.filter(
    (content) =>
      content.title.toLowerCase().includes(lowerQuery) ||
      content.description.toLowerCase().includes(lowerQuery)
  );
};

// Get trending games (by rating)
export const getTrendingGames = (limit: number = 5): GameContent[] => {
  return getAllGames()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

// Get successful kickstarts (by funding percentage)
export const getSuccessfulKickstarts = (
  limit: number = 5
): KickstartContent[] => {
  return getAllKickstarts()
    .filter((kickstart) => kickstart.currentFunding > 0)
    .sort((a, b) => b.currentFunding / b.goal - a.currentFunding / a.goal)
    .slice(0, limit);
};
