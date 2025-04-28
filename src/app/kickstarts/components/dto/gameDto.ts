import { Game } from "../types";

interface RawGame {
  id: string;
  title: string;
  description: string;
  image: string;
  genres: string[];
  platforms: string[];
  price: string;
  rating: number;
  playerCount: string;
  developer?: string;
  publisher?: string;
  releaseDate?: string;
  metacritic?: number;
  languages?: string[];
}

interface RawKickstart {
  id: number;
  title: string;
  description: string;
  image: string;
  status: string;
  category: string;
  currentFunding: number;
  goal: number;
  backers: number;
  endDate: string;
}

export function convertGameToGameType(rawGame: RawGame): Game {
  return {
    id: rawGame.id,
    title: rawGame.title,
    description: rawGame.description,
    image: rawGame.image,
    status: rawGame.price === "Free to Play" ? "FREE NOW" : "COMING SOON",
    category: rawGame.genres[0] || "Game",
    fundingGoal: 0, // Not applicable for regular games
    currentFunding: 0, // Not applicable for regular games
    backers: 0, // Not applicable for regular games
    daysLeft: 0, // Not applicable for regular games
    progress: 100, // Regular games are considered complete
    genres: rawGame.genres,
    rating: rawGame.rating,
    tags: rawGame.genres, // Using genres as tags for regular games
    platforms: rawGame.platforms,
    developer: rawGame.developer || "Unknown",
    publisher: rawGame.publisher || "Unknown",
    releaseDate: rawGame.releaseDate || new Date().toISOString(),
    price: rawGame.price,
    metacritic: rawGame.metacritic || 0,
    playerCount: rawGame.playerCount,
    languages: rawGame.languages || ["English"],
  };
}

export function convertKickstartToGameType(rawKickstart: RawKickstart): Game {
  const now = new Date();
  const endDate = new Date(rawKickstart.endDate);
  const daysLeft = Math.ceil(
    (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  const progress = (rawKickstart.currentFunding / rawKickstart.goal) * 100;

  return {
    id: rawKickstart.id.toString(),
    title: rawKickstart.title,
    description: rawKickstart.description,
    image: rawKickstart.image,
    status:
      rawKickstart.status === "Active"
        ? "Live"
        : rawKickstart.status === "Completed"
        ? "Funded"
        : "Coming Soon",
    category: rawKickstart.category,
    fundingGoal: rawKickstart.goal,
    currentFunding: rawKickstart.currentFunding,
    backers: rawKickstart.backers,
    daysLeft: daysLeft,
    progress: progress,
    genres: [rawKickstart.category],
    rating: 0, // New projects don't have ratings yet
    tags: [rawKickstart.category],
    platforms: ["PC"], // Default platform for kickstarter projects
    developer: "Independent Developer",
    publisher: "Kickstarter",
    releaseDate: rawKickstart.endDate,
    price: "Funding",
    metacritic: 0,
    playerCount: `${rawKickstart.backers} Backers`,
    endDate: new Date(rawKickstart.endDate),
  };
}

export function combineAndConvertData(
  games: RawGame[],
  kickstarts: RawKickstart[]
): Game[] {
  const convertedGames = games.map(convertGameToGameType);
  const convertedKickstarts = kickstarts.map(convertKickstartToGameType);

  return [...convertedGames, ...convertedKickstarts];
}
