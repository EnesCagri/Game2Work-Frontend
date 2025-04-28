export interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  genres: string[];
  platforms: string[];
  price: string;
  rating: number;
  tags?: string[];
  playerCount?: string;
}

export interface Kickstart {
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

export type ProjectType = "game" | "kickstart";

export interface Project {
  type: ProjectType;
  data: Game | Kickstart;
}

export interface GameSliderProps {
  title: string;
  games: Game[];
  showPrice?: boolean;
}
