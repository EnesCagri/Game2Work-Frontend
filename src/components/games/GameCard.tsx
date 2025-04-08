"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface GameCardProps {
  game: {
    id: string;
    title: string;
    coverImage: string;
    lastPlayed?: string;
    totalPlaytime?: string;
    genres: string[];
  };
}

export function GameCard({ game }: GameCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative group cursor-pointer"
    >
      <Link href={`/games/${game.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
          {/* Game Cover */}
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-semibold text-lg mb-1">
                {game.title}
              </h3>
              {game.lastPlayed && (
                <p className="text-gray-300 text-sm">
                  Last played: {game.lastPlayed}
                </p>
              )}
              {game.totalPlaytime && (
                <p className="text-gray-300 text-sm">
                  Total: {game.totalPlaytime}
                </p>
              )}
            </div>
          </div>

          {/* Shine Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
