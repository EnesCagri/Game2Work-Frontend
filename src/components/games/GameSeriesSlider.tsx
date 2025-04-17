"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Siren, Sword, Gamepad2, Crosshair } from "lucide-react";

interface GameSeries {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  games: string[];
}

const GAME_SERIES: GameSeries[] = [
  {
    id: "crime",
    title: "Suç Oyunları",
    icon: Siren,
    games: ["1", "3"], // Red Dead Redemption 2, Mafia: Definitive Edition
  },
  {
    id: "combat",
    title: "Dövüş & Aksiyon",
    icon: Sword,
    games: ["8", "4"], // Batman: Arkham Knight, Shadow of the Tomb Raider
  },
  {
    id: "fighting",
    title: "2D Dövüş",
    icon: Gamepad2,
    games: ["5", "10"], // MultiVersus, Brawlhalla
  },
  {
    id: "fps",
    title: "FPS Oyunları",
    icon: Crosshair,
    games: ["2", "9", "6", "7", "11"], // CS2, L4D2, PUBG, Metro Exodus, MW3
  },
];

interface GameSeriesSliderProps {
  onSeriesSelect: (gameIds: string[]) => void;
  selectedSeries: string | null;
}

export function GameSeriesSlider({
  onSeriesSelect,
  selectedSeries,
}: GameSeriesSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative">
      <div
        ref={sliderRef}
        className={cn(
          "flex gap-4 overflow-x-auto pb-4",
          "scrollbar-hide",
          "[-ms-overflow-style:none]",
          "[scrollbar-width:none]",
          "[&::-webkit-scrollbar]:hidden",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {GAME_SERIES.map((series) => {
          const Icon = series.icon;
          return (
            <motion.div
              key={series.id}
              className={cn(
                "relative flex-shrink-0 w-64 h-40 rounded-lg overflow-hidden cursor-pointer",
                "transition-transform duration-200 hover:scale-105",
                "bg-gradient-to-br from-gray-900 to-gray-800",
                selectedSeries === series.id && "ring-2 ring-red-500"
              )}
              onClick={() => onSeriesSelect(series.games)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon className="w-16 h-16 text-gray-600" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-semibold text-lg">
                  {series.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {series.games.length} oyun
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
