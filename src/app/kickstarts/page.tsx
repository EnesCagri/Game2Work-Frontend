"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  Flame,
  Clock,
  Trophy,
  Star,
  ChevronLeft,
  ChevronRight,
  SearchIcon,
  X,
  FilterX,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gamesData from "@/data/games.json";

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  status: "Live" | "Funded" | "Released" | "Coming Soon";
  category: string;
  fundingGoal: number;
  currentFunding: number;
  backers: number;
  daysLeft: number;
  progress: number;
  genres: string[];
  rating: number;
  tags: string[];
  platforms: string[];
  developer: string;
  publisher: string;
  releaseDate: string;
}

const ProjectGallery = () => {
  const [projects, setProjects] = useState<Game[]>(gamesData.games as Game[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("trending");
  const [activeSection, setActiveSection] = useState<"projects" | "games">(
    "projects"
  );
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique genres from all projects
  const uniqueGenres = Array.from(
    new Set(projects.flatMap((project) => project.genres))
  ).sort();

  // Toggle genre selection
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
    setCurrentPage(1);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedGenres([]);
    setSearch("");
    setCurrentPage(1);
    setSortBy("trending");
    setSelectedCategory("All");
  };

  const renderCategoryNav = () => (
    <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
      {gamesData.categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "ghost"}
          onClick={() => setSelectedCategory(category)}
          className={`whitespace-nowrap ${
            selectedCategory === category
              ? "bg-gradient-to-r from-red-700 via-pink-500 to-red-500"
              : "hover:bg-gray-800/50"
          }`}
        >
          {category}
        </Button>
      ))}
    </div>
  );

  const renderSliderSection = (
    title: string,
    projects: Game[],
    theme: "purple" | "blue" | "green" = "purple"
  ) => (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-gray-800 hover:bg-gray-900/50"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-gray-800 hover:bg-gray-900/50"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <Link key={project.id} href={`/kickstarts/${project.id}`}>
            {renderProjectCard(project, theme)}
          </Link>
        ))}
      </div>
    </div>
  );

  const renderFeaturedProject = (project: Game) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-[500px] rounded-2xl overflow-hidden group"
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400">
              {project.status}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400">
              {project.category}
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">
            {project.title}
          </h2>
          <p className="text-gray-300 text-lg mb-6 line-clamp-2">
            {project.description}
          </p>
          <div className="flex items-center gap-8">
            <div>
              <div className="text-sm text-gray-400 mb-1">Funding Goal</div>
              <div className="text-2xl font-bold text-white">
                ${project.fundingGoal.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Backers</div>
              <div className="text-2xl font-bold text-white">
                {project.backers.toLocaleString()}
              </div>
            </div>
            <Button
              className="ml-auto bg-gradient-to-r from-red-700 via-pink-500 to-red-500"
              size="lg"
            >
              View Project
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderProjectCard = (
    project: Game,
    theme: "purple" | "blue" | "green" = "purple"
  ) => {
    const themeColors = {
      purple: "bg-purple-500/20 text-purple-400",
      blue: "bg-blue-500/20 text-blue-400",
      green: "bg-green-500/20 text-green-400",
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/50 rounded-xl overflow-hidden group hover:bg-gray-900/70 transition-colors"
      >
        <div className="relative h-48">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {project.status === "Live" && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-green-500/90 rounded text-sm font-medium text-white">
              Live
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">Progress</div>
              <div className="text-lg font-bold text-white">
                {project.progress}%
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Time Left</div>
              <div className="text-lg font-bold text-white">
                {project.daysLeft} days
              </div>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-3 h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${themeColors[theme].replace(
                "text-",
                "bg-"
              )} transition-all`}
              style={{ width: `${Math.min(100, project.progress)}%` }}
            />
          </div>
          {/* Genres */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.genres.map((genre) => (
              <Badge
                key={genre}
                variant="secondary"
                className="bg-gray-800/50 hover:bg-gray-700/50"
              >
                {genre}
              </Badge>
            ))}
          </div>
          {/* Platforms */}
          <div className="mt-2 flex flex-wrap gap-2">
            {project.platforms.map((platform) => (
              <Badge
                key={platform}
                variant="outline"
                className="border-gray-700"
              >
                {platform}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderGameCard = (project: Game) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 rounded-xl overflow-hidden group hover:bg-gray-900/70 transition-colors"
    >
      <div className="relative h-48">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 px-2 py-1 bg-blue-500/90 rounded text-sm font-medium text-white">
          Released
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4">{project.description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-white font-medium">{project.rating}</span>
          </div>
          <Button
            size="sm"
            className="bg-gradient-to-r from-red-700 via-pink-500 to-red-500"
          >
            Play Now
          </Button>
        </div>
        {/* Developer & Publisher */}
        <div className="text-sm text-gray-400">
          <div>Developer: {project.developer}</div>
          <div>Publisher: {project.publisher}</div>
        </div>
        {/* Platforms */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.platforms.map((platform) => (
            <Badge key={platform} variant="outline" className="border-gray-700">
              {platform}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Filter and sort projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesGenres =
      selectedGenres.length === 0 ||
      selectedGenres.some((genre) =>
        project.genres.map((g) => g.toLowerCase()).includes(genre.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" ||
      project.category === selectedCategory ||
      project.genres.includes(selectedCategory);
    return matchesSearch && matchesGenres && matchesCategory;
  });

  const liveProjects = filteredProjects.filter((p) => p.status === "Live");
  const fundedProjects = filteredProjects.filter((p) => p.status === "Funded");
  const upcomingProjects = filteredProjects.filter(
    (p) => p.status === "Coming Soon"
  );
  const releasedGames = filteredProjects.filter((p) => p.status === "Released");

  const hasActiveFilters =
    search || selectedGenres.length > 0 || selectedCategory !== "All";

  return (
    <main className="min-h-screen bg-black/50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-700 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
            Game Projects & Library
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Discover, support, and play the next generation of gaming
          </p>

          {/* Category Navigation */}
          {renderCategoryNav()}
        </div>

        {/* Section Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeSection === "projects" ? "default" : "outline"}
            onClick={() => setActiveSection("projects")}
            className={
              activeSection === "projects"
                ? "bg-gradient-to-r from-red-700 via-pink-500 to-red-500"
                : "border-gray-800"
            }
          >
            Projects
          </Button>
          <Button
            variant={activeSection === "games" ? "default" : "outline"}
            onClick={() => setActiveSection("games")}
            className={
              activeSection === "games"
                ? "bg-gradient-to-r from-red-700 via-pink-500 to-red-500"
                : "border-gray-800"
            }
          >
            Games
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search projects..."
                className="pl-10 bg-gray-900/50 border-gray-800 focus:border-red-500/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-gray-900/50 border-gray-800 focus:border-red-500/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800">
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="funded">Most Funded</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearAllFilters}
                className="bg-gray-900/50 hover:bg-red-500/10 hover:text-red-500"
                title="Clear All Filters"
              >
                <FilterX className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Genre Filters */}
          <div className="flex flex-wrap gap-2">
            {uniqueGenres.map((genre) => (
              <Badge
                key={genre}
                variant={
                  selectedGenres.includes(genre) ? "default" : "secondary"
                }
                className={`cursor-pointer hover:bg-red-500/10 ${
                  selectedGenres.includes(genre)
                    ? "bg-gradient-to-r from-red-700 via-pink-500 to-red-500"
                    : "bg-gray-900/50"
                }`}
                onClick={() => toggleGenre(genre)}
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        {activeSection === "projects" ? (
          <>
            {/* Featured Project */}
            {filteredProjects.length > 0 &&
              renderFeaturedProject(filteredProjects[0])}

            {/* Live Projects */}
            {renderSliderSection("Live Projects", liveProjects, "green")}

            {/* Funded Projects */}
            {renderSliderSection("Successfully Funded", fundedProjects, "blue")}

            {/* Upcoming Projects */}
            {renderSliderSection("Coming Soon", upcomingProjects, "purple")}
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {releasedGames.map((game) => (
              <Link key={game.id} href={`/games/${game.id}`}>
                {renderGameCard(game)}
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No projects found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProjectGallery;
