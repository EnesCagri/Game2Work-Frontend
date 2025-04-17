"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GameCard } from "@/components/games/GameCard";
import { GameSeriesSlider } from "@/components/games/GameSeriesSlider";
import { SearchIcon, X, FilterX } from "lucide-react";
import { db } from "@/lib/db";

const ITEMS_PER_PAGE = 20;

interface Game {
  id: string;
  title: string;
  image: string;
  description: string;
  releaseDate?: string;
  developer?: string;
  publisher?: string;
  genres: string[];
  platforms: string[];
  price: string;
  rating: number;
  lastPlayed?: string;
  totalPlaytime?: string;
  playerCount: string;
}

export default function GamesLibrary() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("recent");
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [seriesGames, setSeriesGames] = useState<string[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await db.getGames();
        setGames(gamesData);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Get unique genres from all games
  const uniqueGenres = Array.from(
    new Set(games.flatMap((game) => game.genres))
  ).sort();

  // Toggle keyword selection
  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
    setCurrentPage(1);
  };

  // Handle series selection
  const handleSeriesSelect = (gameIds: string[]) => {
    setSeriesGames(gameIds);
    setSelectedSeries(gameIds.length > 0 ? "series" : null);
    setCurrentPage(1);
    // Clear other filters when selecting a series
    setSelectedKeywords([]);
    setSearch("");
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSeriesGames([]);
    setSelectedSeries(null);
    setSelectedKeywords([]);
    setSearch("");
    setCurrentPage(1);
    setSortBy("recent");
  };

  // Filter and sort games
  const filteredGames = games
    .filter((game) => {
      const matchesSearch = game.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesKeywords =
        selectedKeywords.length === 0 ||
        selectedKeywords.some((keyword) =>
          game.genres
            .map((g) => g.toLowerCase())
            .includes(keyword.toLowerCase())
        );
      const matchesSeries =
        seriesGames.length === 0 || seriesGames.includes(game.id);
      return matchesSearch && matchesKeywords && matchesSeries;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.lastPlayed || 0).getTime() -
            new Date(a.lastPlayed || 0).getTime()
          );
        case "name":
          return a.title.localeCompare(b.title);
        case "release":
          return (
            new Date(b.releaseDate || 0).getTime() -
            new Date(a.releaseDate || 0).getTime()
          );
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const hasActiveFilters =
    search || selectedKeywords.length > 0 || seriesGames.length > 0;

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-700 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
            Oyun Kütüphanesi
          </h1>

          {/* Game Series Slider */}
          <div className="mb-6">
            <GameSeriesSlider
              onSeriesSelect={handleSeriesSelect}
              selectedSeries={selectedSeries}
            />
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Oyun ara..."
                  className="pl-10 bg-gray-900/50 border-gray-800 focus:border-red-500/50"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-gray-900/50 border-gray-800 focus:border-red-500/50">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800">
                  <SelectItem value="recent">Son Oynananlar</SelectItem>
                  <SelectItem value="name">İsim</SelectItem>
                  <SelectItem value="release">Çıkış Tarihi</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearAllFilters}
                  className="bg-gray-900/50 hover:bg-red-500/10 hover:text-red-500"
                  title="Tüm Filtreleri Temizle"
                >
                  <FilterX className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Genre Keywords */}
            {!selectedSeries && (
              <div className="flex flex-wrap gap-2">
                {uniqueGenres.map((genre) => (
                  <Badge
                    key={genre}
                    variant={
                      selectedKeywords.includes(genre) ? "default" : "secondary"
                    }
                    className={`cursor-pointer hover:bg-red-500/10 ${
                      selectedKeywords.includes(genre)
                        ? "bg-gradient-to-r from-red-700 via-pink-500 to-red-500"
                        : ""
                    }`}
                    onClick={() => toggleKeyword(genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            )}

            {/* Selected Keywords */}
            {selectedKeywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedKeywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    variant="secondary"
                    className="flex items-center gap-1 cursor-pointer hover:bg-destructive/10"
                  >
                    {keyword}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => toggleKeyword(keyword)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Games Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          layout
        >
          {paginatedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border-gray-800 hover:bg-gray-900/50"
            >
              Önceki
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page
                    ? "bg-gradient-to-r from-red-700 via-pink-500 to-red-500 text-white"
                    : "border-gray-800 hover:bg-gray-900/50"
                }
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="border-gray-800 hover:bg-gray-900/50"
            >
              Sonraki
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Arama kriterlerinize uygun oyun bulunamadı.
            </p>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-pulse text-gray-400">Yükleniyor...</div>
          </div>
        )}
      </div>
    </div>
  );
}
