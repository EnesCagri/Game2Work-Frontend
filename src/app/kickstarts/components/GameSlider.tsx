"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Game, GameSliderProps } from "../types";

export const GameSlider = ({
  title,
  games,
  showPrice = true,
}: GameSliderProps) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          {title}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-gray-800 hover:bg-gray-800/50"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-gray-800 hover:bg-gray-800/50"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        {games.map((game) => (
          <Link key={game.id} href={`/games/${game.id}`}>
            <div className="w-[280px] bg-gray-900/30 rounded-lg overflow-hidden group hover:bg-gray-900/50 transition-all">
              <div className="relative h-[157px]">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-white mb-1 truncate">
                  {game.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1">{game.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{game.playerCount}</span>
                  </div>
                  {showPrice && (
                    <div className="text-white font-medium">
                      {game.price === "Free to Play" ? (
                        "Free"
                      ) : (
                        <span>${game.price}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
