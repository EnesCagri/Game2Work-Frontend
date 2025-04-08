"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Game } from "@/types";
import {
  TrophyIcon,
  ClockIcon,
  UsersIcon,
  MonitorIcon,
  HardDriveIcon,
  CpuIcon,
  CircleIcon,
} from "lucide-react";

export default function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const data = await db.getGameById(id as string);
        setGame(data || null);
      } catch (error) {
        console.error("Failed to fetch game:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Game not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-lg overflow-hidden mb-8"
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <h1 className="text-4xl font-bold text-white mb-2">{game.title}</h1>
            <div className="flex gap-4 text-gray-300 mb-4">
              <span>{game.developer}</span>
              <span>•</span>
              <span>{game.releaseDate}</span>
              <span>•</span>
              <span>{game.price}</span>
            </div>
            <div className="flex gap-2">
              {game.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 flex items-center gap-4"
          >
            <TrophyIcon className="w-8 h-8 text-yellow-500" />
            <div>
              <div className="text-gray-400">Rating</div>
              <div className="text-2xl font-bold text-white">
                {game.rating}/5.0
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 flex items-center gap-4"
          >
            <ClockIcon className="w-8 h-8 text-blue-500" />
            <div>
              <div className="text-gray-400">Total Playtime</div>
              <div className="text-2xl font-bold text-white">
                {game.totalPlaytime}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 flex items-center gap-4"
          >
            <UsersIcon className="w-8 h-8 text-green-500" />
            <div>
              <div className="text-gray-400">Active Players</div>
              <div className="text-2xl font-bold text-white">
                {game.playerCount}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">About</h2>
          <p className="text-gray-300 leading-relaxed">{game.description}</p>
        </motion.div>

        {/* System Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            System Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <MonitorIcon className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-gray-400">OS</div>
                <div className="text-white">
                  {game.systemRequirements.minimum.os}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CpuIcon className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-gray-400">Processor</div>
                <div className="text-white">
                  {game.systemRequirements.minimum.processor}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CircleIcon className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-gray-400">Memory</div>
                <div className="text-white">
                  {game.systemRequirements.minimum.memory}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <HardDriveIcon className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-gray-400">Storage</div>
                <div className="text-white">
                  {game.systemRequirements.minimum.storage}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button size="lg" className="flex-1">
            Play Now
          </Button>
          <Button size="lg" variant="outline" className="flex-1">
            Add to Library
          </Button>
        </div>
      </div>
    </div>
  );
}
