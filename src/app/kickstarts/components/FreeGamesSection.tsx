"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Game } from "../types";

interface FreeGamesSectionProps {
  projects: Game[];
}

type FreeGameNow = Game & {
  status: "FREE NOW";
  endDate: Date;
};

type FreeGameComing = Game & {
  status: "COMING SOON";
  startDate: Date;
  endDate: Date;
};

export const FreeGamesSection = ({ projects }: FreeGamesSectionProps) => {
  // Get free games (current and upcoming)
  const freeGames: (FreeGameNow | FreeGameComing)[] = [
    {
      ...projects[0],
      status: "FREE NOW",
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    },
    {
      ...projects[1],
      status: "FREE NOW",
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      ...projects[2],
      status: "COMING SOON",
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-white">Free Games</h2>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
        <Button
          variant="outline"
          className="border-gray-800 hover:bg-gray-800/50"
        >
          View More
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freeGames.map((game) => (
          <Link key={game.id} href={`/games/${game.id}`} className="group">
            <div className="bg-gray-900/30 rounded-lg overflow-hidden group-hover:bg-gray-900/50 transition-all">
              <div className="relative aspect-[16/9]">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      game.status === "FREE NOW"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {game.status}
                  </span>
                </div>
                <h3 className="font-medium text-white mb-2">{game.title}</h3>
                <p className="text-sm text-gray-400">
                  {game.status === "FREE NOW"
                    ? `Free until ${game.endDate.toLocaleDateString()}`
                    : `Free ${game.startDate?.toLocaleDateString()} - ${game.endDate?.toLocaleDateString()}`}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
