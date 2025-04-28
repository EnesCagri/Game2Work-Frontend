"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Game } from "../types";

interface HeroSectionProps {
  projects: Game[];
}

export const HeroSection = ({ projects }: HeroSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressInterval = 5000;

  const featuredGames = projects
    .filter((game) => game.rating >= 4.5)
    .slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((current) => (current + 1) % featuredGames.length);
          return 0;
        }
        return prev + 1;
      });
    }, progressInterval / 100);

    return () => clearInterval(timer);
  }, [featuredGames.length]);

  const activeGame = featuredGames[activeIndex];

  if (!activeGame) return null;

  return (
    <div className="relative h-[600px] mb-12">
      {/* Main Game Display */}
      <div className="relative h-full overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/30 z-10" />
          <Image
            src={activeGame.image}
            alt={activeGame.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Container */}
        <div className="container mx-auto h-full relative z-20 px-6">
          <div className="flex h-full items-center justify-between">
            {/* Game Info */}
            <div className="flex-1 max-w-2xl pt-12">
              {/* Status Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-block bg-blue-500/90 text-white text-sm font-medium px-3 py-1 rounded">
                  ŞİMDİ ÇIKTI
                </div>
                {activeGame.metacritic && (
                  <div className="inline-block bg-green-500/90 text-white text-sm font-medium px-3 py-1 rounded">
                    Metacritic: {activeGame.metacritic}
                  </div>
                )}
              </div>

              {/* Game Title */}
              <h1 className="text-6xl font-bold text-white mb-4 leading-tight">
                {activeGame.title}
              </h1>

              {/* Game Details */}
              <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{activeGame.rating}</span>
                </div>
                <span>•</span>
                <span>{activeGame.playerCount} Oyuncu</span>
                <span>•</span>
                <span>{activeGame.developer}</span>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-300 mb-8 line-clamp-3">
                {activeGame.description}
              </p>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-8">
                {activeGame.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 rounded-full text-sm bg-white/10 text-white"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Price and Buttons */}
              <div className="flex items-center gap-8">
                <div className="text-white">
                  <div className="text-sm font-medium mb-1">
                    Başlangıç Fiyatı
                  </div>
                  <div className="text-3xl font-bold">
                    {activeGame.price === "Free to Play"
                      ? "Ücretsiz"
                      : `₺${activeGame.price}`}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-white/90 text-black px-8 py-6 text-lg font-medium transition-transform hover:scale-105"
                  >
                    Hemen Satın Al
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg transition-transform hover:scale-105"
                  >
                    İstek Listesine Ekle
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Side Thumbnails */}
            <div className="w-80 space-y-3">
              {featuredGames.map((game, index) => (
                <button
                  key={game.id}
                  className={`relative w-full h-[84px] group transition-all rounded-lg overflow-hidden ${
                    index === activeIndex
                      ? "opacity-100"
                      : "opacity-50 hover:opacity-75"
                  }`}
                  onClick={() => {
                    setActiveIndex(index);
                    setProgress(0);
                  }}
                >
                  {/* Thumbnail Container */}
                  <div className="absolute inset-0 flex">
                    {/* Image */}
                    <div className="w-36 relative">
                      <Image
                        src={game.image}
                        alt={game.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Game Info */}
                    <div className="flex-1 bg-black/50 backdrop-blur-sm p-2 flex flex-col justify-between">
                      <div>
                        <div className="text-sm font-medium text-white line-clamp-1">
                          {game.title}
                        </div>
                        <div className="text-xs text-gray-300 line-clamp-1">
                          {game.developer}
                        </div>
                      </div>
                      <div className="text-xs text-gray-300">
                        {game.price === "Free to Play"
                          ? "Ücretsiz"
                          : `₺${game.price}`}
                      </div>
                    </div>
                  </div>

                  {/* Loading Progress Indicator */}
                  {index === activeIndex && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                      <div
                        className="h-full bg-white transition-all duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  {/* Active/Hover State */}
                  <div
                    className={`absolute inset-0 transition-all ${
                      index === activeIndex
                        ? "ring-2 ring-white"
                        : "group-hover:ring-1 group-hover:ring-white/50"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
