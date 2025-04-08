"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { FilterDrawer } from "@/components/ui/FilterDrawer";
import { JobCard } from "@/components/jobs/JobCard";
import { db } from "@/lib/db";
import type { Job, JobType, ExperienceLevel } from "@/types";

const ITEMS_PER_PAGE = 15;

const JobsList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    types: [] as JobType[],
    experience: [] as ExperienceLevel[],
    remote: false,
  });

  // Reset page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters]);

  // Load jobs from mock database
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const jobsData = await db.getJobs();
        const companies = await db.getCompanies();

        // Set jobs with company data
        setJobs(
          jobsData.map((job) => {
            const company = companies.find((c) => c.id === job.companyId);
            return {
              ...job,
              type: job.type as JobType,
              experience: job.experience as ExperienceLevel,
              company: company?.name || "Unknown Company",
              logo: company?.logo || "",
            };
          })
        );

        setError(null);
      } catch (err) {
        console.error("Failed to load jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const filterGroups = [
    {
      title: "Job Type",
      options: ["Full-time", "Part-time", "Contract", "Internship"].map(
        (type) => ({
          id: type,
          label: type,
        })
      ),
      selected: filters.types,
      onChange: (types: string[]) =>
        setFilters((prev) => ({ ...prev, types: types as JobType[] })),
    },
    {
      title: "Experience Level",
      options: ["Entry", "Mid-level", "Senior", "Lead"].map((level) => ({
        id: level,
        label: level,
      })),
      selected: filters.experience,
      onChange: (experience: string[]) =>
        setFilters((prev) => ({
          ...prev,
          experience: experience as ExperienceLevel[],
        })),
    },
  ];

  const additionalFilters = [
    {
      id: "remote",
      label: "Remote Only",
      checked: filters.remote,
      onChange: (checked: boolean) =>
        setFilters((prev) => ({ ...prev, remote: checked })),
    },
  ];

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const searchLower = search.toLowerCase();
    const searchMatch =
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower);

    const typeMatch =
      filters.types.length === 0 || filters.types.includes(job.type);
    const experienceMatch =
      filters.experience.length === 0 ||
      filters.experience.includes(job.experience);
    const remoteMatch =
      !filters.remote || job.benefits?.includes("Remote work");

    return searchMatch && typeMatch && experienceMatch && remoteMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-black/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">Loading jobs...</div>
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
        <div className="flex items-center gap-4 mb-8">
          <SearchBar
            value={search}
            onChange={(value) => setSearch(value)}
            placeholder="Search jobs..."
          />
          <FilterDrawer
            groups={filterGroups}
            additionalFilters={additionalFilters}
          />
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
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
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No jobs found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default JobsList;

// TODO: Add pagination to the jobs list
