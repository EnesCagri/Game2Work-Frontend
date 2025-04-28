"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Game } from "../types";

interface NewGamesSliderProps {
  projects: Game[];
}

export const NewGamesSlider = ({ projects }: NewGamesSliderProps) => {
  const [sliderRef, setSliderRef] = useState<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [dragStartX, setDragStartX] = useState(0);

  // Helper function to generate consistent discount based on game ID
  const getGameDiscount = (gameId: string) => {
    const hash = gameId.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return Math.abs(hash % 40) + 10;
  };

  // Helper function to check if game should show discount
  const shouldShowDiscount = (gameId: string) => {
    const hash = gameId.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return hash % 3 === 0;
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setDragStartX(e.clientX);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const dragEndX = e.clientX;
    const dragDistance = dragEndX - dragStartX;

    if (Math.abs(dragDistance) > 100) {
      if (dragDistance > 0 && canScrollPrev) {
        handlePrevClick();
      } else if (dragDistance < 0 && canScrollNext) {
        handleNextClick();
      }
    }
  };

  const handleScroll = () => {
    if (!sliderRef) return;

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef;
    setCanScrollPrev(scrollLeft > 0);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const handlePrevClick = () => {
    if (!sliderRef) return;
    sliderRef.scrollBy({ left: -sliderRef.clientWidth, behavior: "smooth" });
  };

  const handleNextClick = () => {
    if (!sliderRef) return;
    sliderRef.scrollBy({ left: sliderRef.clientWidth, behavior: "smooth" });
  };

  // Add useEffect to initialize scroll state
  useEffect(() => {
    if (sliderRef) {
      handleScroll();
    }
  }, [sliderRef]);

  return (
    <div className="mb-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-white">
              Yeni Şeyler Keşfet
            </h2>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className={`border-gray-800 ${
                !canScrollPrev
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-800/50"
              }`}
              onClick={handlePrevClick}
              disabled={!canScrollPrev}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`border-gray-800 ${
                !canScrollNext
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-800/50"
              }`}
              onClick={handleNextClick}
              disabled={!canScrollNext}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Games Grid Container with Hidden Overflow */}
        <div className="overflow-hidden">
          {/* Games Grid */}
          <div
            ref={setSliderRef}
            className="grid grid-flow-col auto-cols-max gap-4 overflow-hidden cursor-grab active:cursor-grabbing select-none"
            onScroll={handleScroll}
            draggable="true"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {projects.map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.id}`}
                className="select-none"
              >
                <div className="w-[280px] bg-gray-900/30 rounded-lg overflow-hidden group hover:bg-gray-900/50 transition-all">
                  <div className="relative h-[157px]">
                    <Image
                      src={game.image}
                      alt={game.title}
                      fill
                      className="object-cover select-none"
                      draggable="false"
                    />
                    {game.price !== "Free to Play" &&
                      shouldShowDiscount(game.id) && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 rounded text-xs font-medium text-white">
                          -%{getGameDiscount(game.id)}
                        </div>
                      )}
                    {game.metacritic && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-blue-500/90 rounded text-xs font-medium text-white">
                        {game.metacritic}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                        {game.status === "Coming Soon" ? "Yakında" : "Ana Oyun"}
                      </span>
                      {game.status === "Coming Soon" && (
                        <span className="text-xs text-gray-400">
                          {new Date(game.releaseDate).toLocaleDateString(
                            "tr-TR",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-white mb-2 line-clamp-1">
                      {game.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="ml-1">{game.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{game.developer}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-right">
                      <div className="text-white font-medium">
                        {game.price === "Free to Play" ? (
                          "Ücretsiz"
                        ) : (
                          <span>₺{game.price}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
