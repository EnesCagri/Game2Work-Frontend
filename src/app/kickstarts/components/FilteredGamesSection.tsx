"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronUp,
  FilterX,
  SearchIcon,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Game, Kickstart, Project } from "../types";
import gamesData from "@/app/data/games.json";
import kickstartsData from "@/app/data/kickstarts.json";

// Convert raw data to Project type
const projects: Project[] = [
  ...gamesData.games.map((game: Game) => ({
    type: "game" as const,
    data: game,
  })),
  ...kickstartsData.kickstarts.map((kickstart: Kickstart) => ({
    type: "kickstart" as const,
    data: kickstart,
  })),
];

interface FilteredGamesSectionProps {}

export const FilteredGamesSection = ({}: FilteredGamesSectionProps) => {
  const [activeFilters, setActiveFilters] = useState({
    genres: [] as string[],
    features: [] as string[],
    status: "all", // "all" | "active" | "upcoming" | "completed"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.data.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    if (project.type === "game") {
      const game = project.data as Game;
      const matchesGenres =
        activeFilters.genres.length === 0 ||
        activeFilters.genres.some((genre) => game.genres.includes(genre));

      const matchesFeatures =
        activeFilters.features.length === 0 ||
        activeFilters.features.some((feature) => game.tags?.includes(feature));

      return matchesSearch && matchesGenres && matchesFeatures;
    } else {
      const kickstart = project.data as Kickstart;
      const matchesStatus =
        activeFilters.status === "all" ||
        activeFilters.status === kickstart.status.toLowerCase();

      return matchesSearch && matchesStatus;
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters, searchQuery]);

  const allGenres = Array.from(
    new Set(
      projects
        .filter((p): p is Project & { type: "game" } => p.type === "game")
        .flatMap((p) => (p.data as Game).genres)
    )
  );

  const allFeatures = Array.from(
    new Set(
      projects
        .filter((p): p is Project & { type: "game" } => p.type === "game")
        .flatMap((p) => (p.data as Game).tags || [])
    )
  );

  return (
    <div className="mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">TÜM PROJELER</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Projelerde ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Filters Sidebar */}
        <div className="col-span-12 md:col-span-3 bg-[#1b2838] rounded-lg p-4 space-y-6">
          {/* Genres Filter */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-medium">TÜRLER</h3>
              <ChevronUp className="w-4 h-4 text-gray-400" />
            </div>
            <div className="space-y-2">
              {allGenres.map((genre) => (
                <label
                  key={genre}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.genres.includes(genre)}
                    onChange={() =>
                      setActiveFilters((prev) => ({
                        ...prev,
                        genres: prev.genres.includes(genre)
                          ? prev.genres.filter((g) => g !== genre)
                          : [...prev.genres, genre],
                      }))
                    }
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-300 group-hover:text-white text-sm">
                    {genre}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Features Filter */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-medium">ÖZELLİKLER</h3>
              <ChevronUp className="w-4 h-4 text-gray-400" />
            </div>
            <div className="space-y-2">
              {allFeatures.map((feature) => (
                <label
                  key={feature}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.features.includes(feature)}
                    onChange={() =>
                      setActiveFilters((prev) => ({
                        ...prev,
                        features: prev.features.includes(feature)
                          ? prev.features.filter((f) => f !== feature)
                          : [...prev.features, feature],
                      }))
                    }
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-300 group-hover:text-white text-sm">
                    {feature}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h3 className="text-white font-medium mb-4">DURUM</h3>
            <div className="space-y-2">
              {[
                { id: "all", label: "Tümü" },
                { id: "active", label: "Aktif" },
                { id: "upcoming", label: "Yakında" },
                { id: "completed", label: "Tamamlandı" },
              ].map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <input
                    type="radio"
                    name="status"
                    checked={activeFilters.status === option.id}
                    onChange={() =>
                      setActiveFilters((prev) => ({
                        ...prev,
                        status: option.id,
                      }))
                    }
                    className="w-4 h-4 rounded-full border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-300 group-hover:text-white text-sm">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={() => {
              setActiveFilters({ genres: [], features: [], status: "all" });
              setSearchQuery("");
            }}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm"
          >
            <FilterX className="w-4 h-4" />
            Filtreleri Temizle
          </button>
        </div>

        {/* Projects Grid with Pagination */}
        <div className="col-span-12 md:col-span-9 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProjects.map((project) => (
              <Link
                key={`${project.type}-${project.data.id}`}
                href={`/${project.type}s/${project.data.id}`}
                className="group"
              >
                <div className="bg-gray-900/30 rounded-lg overflow-hidden hover:bg-gray-900/50 transition">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={project.data.image}
                      alt={project.data.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-white mb-2">
                      {project.data.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      {project.type === "game" ? (
                        // Game specific display
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-gray-300 text-sm">
                            {(project.data as Game).rating}
                          </span>
                        </div>
                      ) : (
                        // Kickstart specific display
                        <div className="text-green-500 text-xs font-medium">
                          {Math.round(
                            ((project.data as Kickstart).currentFunding /
                              (project.data as Kickstart).goal) *
                              100
                          )}
                          % Funded
                        </div>
                      )}
                      <div className="text-white text-sm font-semibold">
                        {project.type === "game"
                          ? (project.data as Game).price === "Free to Play"
                            ? "Ücretsiz"
                            : `₺${(project.data as Game).price}`
                          : `${Math.ceil(
                              (new Date(
                                (project.data as Kickstart).endDate
                              ).getTime() -
                                new Date().getTime()) /
                                (1000 * 60 * 60 * 24)
                            )} Gün Kaldı`}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="text-center text-gray-400 text-sm">
            Showing {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, filteredProjects.length)} of{" "}
            {filteredProjects.length} results
          </div>
        </div>
      </div>
    </div>
  );
};
