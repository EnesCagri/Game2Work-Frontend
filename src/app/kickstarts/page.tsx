"use client";

import { useState } from "react";
import gamesData from "@/data/games.json";
import { Game } from "./types";
import { HeroSection } from "./components/HeroSection";
import { NewGamesSlider } from "./components/NewGamesSlider";
import { CommunityRecommendationsCarousel } from "./components/CommunityRecommendationsCarousel";
import { GameSlider } from "./components/GameSlider";
import { DealsOfWeekSection } from "./components/DealsOfWeekSection";
import { FreeGamesSection } from "./components/FreeGamesSection";
import { FilteredGamesSection } from "./components/FilteredGamesSection";

const ProjectGallery = () => {
  const [projects] = useState<Game[]>(gamesData.games as Game[]);

  return (
    <main className="min-h-screen bg-black/50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <HeroSection projects={projects} />

        {/* New Games Section */}
        <NewGamesSlider projects={projects} />

        {/* Community Recommendations */}
        <CommunityRecommendationsCarousel projects={projects} />

        {/* Hot Games Section */}
        <GameSlider
          title="What's Hot"
          games={projects
            .filter((game) => game.rating >= 4.5)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 10)}
        />

        {/* Most Played Section */}
        <GameSlider
          title="Most Played"
          games={projects
            .filter((game) => game.playerCount)
            .sort((a, b) => {
              const getPlayerCount = (count: string) => {
                if (!count) return 0;
                const number = parseFloat(count.replace(/[^0-9.]/g, ""));
                if (count.toLowerCase().includes("m")) return number * 1000000;
                if (count.toLowerCase().includes("k")) return number * 1000;
                return number;
              };
              return (
                getPlayerCount(b.playerCount) - getPlayerCount(a.playerCount)
              );
            })
            .slice(0, 10)}
        />

        {/* Deals of the Week */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Deals of the Week
          </h2>
          <DealsOfWeekSection projects={projects} />
        </div>

        {/* Free Games Section */}
        <FreeGamesSection projects={projects} />

        {/* Filtered Games Section */}
        <FilteredGamesSection projects={projects} />
      </div>
    </main>
  );
};

export default ProjectGallery;
