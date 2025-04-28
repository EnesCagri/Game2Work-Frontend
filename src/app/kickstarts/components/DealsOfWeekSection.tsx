"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Game } from "../types";

interface DealsOfWeekSectionProps {
  projects: Game[];
}

export const DealsOfWeekSection = ({ projects }: DealsOfWeekSectionProps) => {
  // Get deals of the week
  const dealsOfWeek = useMemo(() => {
    return projects
      .filter((game) => game.price !== "Free to Play")
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((game) => ({
        ...game,
        discountPercent: Math.floor(Math.random() * 50 + 30), // 30-80% discount
        originalPrice: parseFloat(game.price),
      }));
  }, [projects]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {dealsOfWeek.map((game) => (
        <Link key={game.id} href={`/games/${game.id}`} className="group">
          <div className="relative aspect-[16/9] rounded-t-lg overflow-hidden">
            <Image
              src={game.image}
              alt={game.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-semibold text-white mb-2">
                {game.title}
              </h3>
              <div className="flex items-center gap-3">
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                  -{game.discountPercent}%
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 line-through">
                    ₺{game.originalPrice}
                  </span>
                  <span className="text-white font-medium">
                    ₺
                    {(
                      game.originalPrice *
                      (1 - game.discountPercent / 100)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
