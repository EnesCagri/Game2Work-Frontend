"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { FilterDrawer } from "@/components/ui/FilterDrawer";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";

const ITEMS_PER_PAGE = 6;

type KickstartStatus = "Active" | "Completed" | "Upcoming";
type KickstartCategory = "Game" | "Software" | "Hardware" | "Other";

const KickstartsList = () => {
  const [kickstarts, setKickstarts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: [] as KickstartStatus[],
    categories: [] as KickstartCategory[],
    minFunding: 0,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters]);

  useEffect(() => {
    const loadKickstarts = async () => {
      try {
        setLoading(true);
        const kickstartsData = await db.getKickstarts();
        setKickstarts(kickstartsData);
        setError(null);
      } catch (err) {
        console.error("Failed to load kickstarts:", err);
        setError("Failed to load kickstarts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadKickstarts();
  }, []);

  const filterGroups = [
    {
      title: "Status",
      options: ["Active", "Completed", "Upcoming"].map((status) => ({
        id: status,
        label: status,
      })),
      selected: filters.status,
      onChange: (statuses: string[]) =>
        setFilters((prev) => ({
          ...prev,
          status: statuses as KickstartStatus[],
        })),
    },
    {
      title: "Category",
      options: ["Game", "Software", "Hardware", "Other"].map((category) => ({
        id: category,
        label: category,
      })),
      selected: filters.categories,
      onChange: (categories: string[]) =>
        setFilters((prev) => ({
          ...prev,
          categories: categories as KickstartCategory[],
        })),
    },
  ];

  const filteredKickstarts = kickstarts.filter((kickstart) => {
    const searchLower = search.toLowerCase();
    const searchMatch =
      kickstart.title.toLowerCase().includes(searchLower) ||
      kickstart.description.toLowerCase().includes(searchLower);

    const statusMatch =
      filters.status.length === 0 ||
      filters.status.includes(kickstart.status as KickstartStatus);
    const categoryMatch =
      filters.categories.length === 0 ||
      filters.categories.includes(kickstart.category as KickstartCategory);
    const fundingMatch = kickstart.currentFunding >= filters.minFunding;

    return searchMatch && statusMatch && categoryMatch && fundingMatch;
  });

  const totalPages = Math.ceil(filteredKickstarts.length / ITEMS_PER_PAGE);
  const paginatedKickstarts = filteredKickstarts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-black/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">Loading kickstarts...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black/50 py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Kickstarts</h1>
          <p className="text-gray-400">
            Discover exciting projects and support innovative ideas
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-8">
          <SearchBar
            value={search}
            onChange={(value) => setSearch(value)}
            placeholder="Search kickstarts..."
          />
          <FilterDrawer groups={filterGroups} />
        </div>

        {/* Kickstarts List */}
        <div className="space-y-8">
          {paginatedKickstarts.map((kickstart) => (
            <Link
              key={kickstart.id}
              href={`/kickstarts/${kickstart.id}`}
              className="block group"
            >
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-colors">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-1/3 h-64 md:h-auto">
                    <Image
                      src={kickstart.image}
                      alt={kickstart.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400">
                        {kickstart.status}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-400">
                        {kickstart.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {kickstart.title}
                    </h2>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {kickstart.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-400">
                          Current Funding
                        </div>
                        <div className="text-xl font-bold text-white">
                          ${kickstart.currentFunding.toLocaleString()}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-400">Goal</div>
                        <div className="text-xl font-bold text-white">
                          ${kickstart.goal.toLocaleString()}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-400">Backers</div>
                        <div className="text-xl font-bold text-white">
                          {kickstart.backers.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <Button
                    key={pageNumber}
                    variant={pageNumber === currentPage ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8"
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
              {totalPages > 5 && (
                <>
                  <span className="mx-2">...</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-8 h-8"
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* No Results Message */}
        {filteredKickstarts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No kickstarts found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default KickstartsList;
