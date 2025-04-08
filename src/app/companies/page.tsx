"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { FilterDrawer } from "@/components/ui/FilterDrawer";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { db } from "@/lib/db";
import type { Company } from "@/types";

const ITEMS_PER_PAGE = 10; // Reduced for bigger cards

type IndustryType =
  | "Gaming"
  | "Technology"
  | "AI & ML"
  | "Finance"
  | "Healthcare";
type CompanySize = "1-50" | "51-200" | "201-1000" | "1000+";

const CompaniesList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    industries: [] as IndustryType[],
    sizes: [] as CompanySize[],
    hasOpenPositions: false,
  });

  // Reset page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters]);

  // Load companies from mock database
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true);
        const companiesData = await db.getCompanies();
        const companiesWithPositions = companiesData.map((company) => ({
          ...company,
          openPositions: 0, // Initialize with 0, we'll update this later if needed
        }));
        setCompanies(companiesWithPositions);
        setError(null);
      } catch (err) {
        console.error("Failed to load companies:", err);
        setError("Failed to load companies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  const filterGroups = [
    {
      title: "Industry",
      options: ["Gaming", "Technology", "AI & ML", "Finance", "Healthcare"].map(
        (industry) => ({
          id: industry,
          label: industry,
        })
      ),
      selected: filters.industries,
      onChange: (industries: string[]) =>
        setFilters((prev) => ({
          ...prev,
          industries: industries as IndustryType[],
        })),
    },
    {
      title: "Company Size",
      options: ["1-50", "51-200", "201-1000", "1000+"].map((size) => ({
        id: size,
        label: size,
      })),
      selected: filters.sizes,
      onChange: (sizes: string[]) =>
        setFilters((prev) => ({ ...prev, sizes: sizes as CompanySize[] })),
    },
  ];

  const additionalFilters = [
    {
      id: "hasOpenPositions",
      label: "Has Open Positions",
      checked: filters.hasOpenPositions,
      onChange: (checked: boolean) =>
        setFilters((prev) => ({ ...prev, hasOpenPositions: checked })),
    },
  ];

  // Filter companies based on search and filters
  const filteredCompanies = companies.filter((company) => {
    const searchLower = search.toLowerCase();
    const searchMatch =
      company.name.toLowerCase().includes(searchLower) ||
      company.location.toLowerCase().includes(searchLower) ||
      company.industry.toLowerCase().includes(searchLower);

    const industryMatch =
      filters.industries.length === 0 ||
      filters.industries.includes(company.industry as IndustryType);
    const sizeMatch =
      filters.sizes.length === 0 ||
      filters.sizes.includes(company.size as CompanySize);
    const openPositionsMatch =
      !filters.hasOpenPositions || company.openPositions > 0;

    return searchMatch && industryMatch && sizeMatch && openPositionsMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-black/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">Loading companies...</div>
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
          <h1 className="text-4xl font-bold text-white mb-4">Companies</h1>
          <p className="text-gray-400">
            Discover innovative companies and explore exciting career
            opportunities
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-8">
          <SearchBar
            value={search}
            onChange={(value) => setSearch(value)}
            placeholder="Search companies..."
          />
          <FilterDrawer
            groups={filterGroups}
            additionalFilters={additionalFilters}
          />
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {paginatedCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
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
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No companies found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CompaniesList;
