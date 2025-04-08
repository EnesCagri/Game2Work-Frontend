"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  Users,
  Globe,
  ArrowLeft,
  Briefcase,
  LinkedinIcon,
  TwitterIcon,
  GithubIcon,
  TrendingUp,
  Award,
} from "lucide-react";
import { db } from "@/lib/db";
import type { Company, Job, JobType, ExperienceLevel } from "@/types";
import { JobCard } from "@/components/jobs/JobCard";

const industryColors = {
  Gaming: "from-purple-500 to-pink-500",
  Technology: "from-blue-500 to-indigo-500",
  "AI & ML": "from-green-500 to-teal-500",
  Finance: "from-yellow-500 to-orange-500",
  Healthcare: "from-red-500 to-rose-500",
} as const;

export default function CompanyProfile() {
  const params = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [openJobs, setOpenJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanyData = async () => {
      try {
        setLoading(true);
        const companyData = await db.getCompanyById(Number(params.id));

        if (!companyData) {
          setError("Company not found");
          return;
        }

        // Load company's open positions first
        const jobs = await db.getJobsByCompany(companyData.id);

        // Add openPositions to companyData
        const companyWithPositions = {
          ...companyData,
          openPositions: jobs.length,
        };
        setCompany(companyWithPositions);

        // Add company info to each job before setting state
        const jobsWithCompany = jobs.map((job) => ({
          ...job,
          type: job.type as JobType,
          experience: job.experience as ExperienceLevel,
          company: companyData.name,
          logo: companyData.logo,
        }));
        setOpenJobs(jobsWithCompany);
      } catch (err) {
        console.error("Error loading company data:", err);
        setError("Failed to load company data");
      } finally {
        setLoading(false);
      }
    };

    loadCompanyData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">
            Loading company profile...
          </div>
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-black/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500">
              {error || "Company not found"}
            </h1>
            <Link href="/companies">
              <Button className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Companies
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const glowColor =
    industryColors[company.industry as keyof typeof industryColors] ||
    "from-purple-500 to-pink-500";

  return (
    <main className="min-h-screen bg-black/50 py-24">
      <div className="container mx-auto px-4">
        <Link href="/companies">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Companies
          </Button>
        </Link>

        {/* Company Header */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 mb-8">
          <div className="flex items-start gap-8">
            <div className="w-32 h-32 bg-gray-800 rounded-xl flex-shrink-0 overflow-hidden">
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${glowColor} opacity-20`}
                />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {company.name}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {company.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {company.size}
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      Founded {company.founded}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {company.socialMedia?.linkedin && (
                    <a
                      href={company.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
                    >
                      <LinkedinIcon className="w-5 h-5" />
                    </a>
                  )}
                  {company.socialMedia?.twitter && (
                    <a
                      href={company.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
                    >
                      <TwitterIcon className="w-5 h-5" />
                    </a>
                  )}
                  {company.socialMedia?.github && (
                    <a
                      href={company.socialMedia.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
                    >
                      <GithubIcon className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Badge variant="secondary" className="text-sm">
                  {company.industry}
                </Badge>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  {company.website.replace(/^https?:\/\//, "")}
                </a>
              </div>

              <p className="text-gray-400 leading-relaxed">
                {company.description}
              </p>
            </div>
          </div>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">
                Open Positions
              </h3>
            </div>
            <p className="text-3xl font-bold text-purple-400">
              {openJobs.length}
            </p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Growth Rate</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">+25%</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">
                Employee Rating
              </h3>
            </div>
            <p className="text-3xl font-bold text-yellow-400">4.8/5</p>
          </div>
        </div>

        {/* Company Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                About {company.name}
              </h2>
              <div className="prose prose-invert max-w-none">
                {company.longDescription || company.description}
              </div>
            </section>

            {/* Benefits */}
            {company.benefits && (
              <section className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Benefits & Perks
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {company.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-gray-400"
                    >
                      <Award className="w-5 h-5 text-purple-400 mt-0.5" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Company Info Sidebar */}
          <div className="space-y-6">
            <section className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Company Info
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    Industry
                  </h3>
                  <p className="text-white">{company.industry}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    Company Size
                  </h3>
                  <p className="text-white">{company.size} employees</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    Founded
                  </h3>
                  <p className="text-white">{company.founded}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">
                    Location
                  </h3>
                  <p className="text-white">{company.location}</p>
                </div>
              </div>
            </section>

            {company.techStack && (
              <section className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {company.techStack.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Open Positions */}
        {openJobs.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">
                Open Positions
              </h2>
              <Badge variant="secondary" className="text-sm">
                {openJobs.length} positions
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
