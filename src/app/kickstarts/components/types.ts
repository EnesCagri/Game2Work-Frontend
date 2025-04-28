export interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  status:
    | "Live"
    | "Funded"
    | "Released"
    | "Coming Soon"
    | "FREE NOW"
    | "COMING SOON";
  category: string;
  fundingGoal: number;
  currentFunding: number;
  backers: number;
  daysLeft: number;
  progress: number;
  genres: string[];
  rating: number;
  tags: string[];
  platforms: string[];
  developer: string;
  publisher: string;
  releaseDate: string;
  price: string;
  metacritic: number;
  playerCount: string;
  languages?: string[];
  startDate?: Date;
  endDate?: Date;
  discountPercent?: number;
  originalPrice?: number;
}

export interface GameSliderProps {
  title: string;
  games: Game[];
  showPrice?: boolean;
}
