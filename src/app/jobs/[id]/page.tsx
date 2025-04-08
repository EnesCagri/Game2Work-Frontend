"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  // Remove unused icons
  // Building2,
  // MapPin,
  // Clock,
  // Briefcase,
  GraduationCap,
  Trophy,
  CheckCircle2,
  ArrowLeft,
  // Search,
  // SlidersHorizontal,
  // Users,
  // Monitor,
  // HardDrive,
  // Cpu,
} from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import type { DetailedJob, JobType, ExperienceLevel } from "@/types";
import Image from "next/image";

/*
interface Requirement {
  id: number;
  title: string;
  description: string;
  required: boolean;
}

interface Test {
  id: number;
  title: string;
  description: string;
  duration: string;
  passScore: number;
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  level: "Basic" | "Intermediate" | "Advanced";
  required: boolean;
}
*/
/*
const jobDetails: Record<number, DetailedJob> = {
  1: {
    id: 1,
    companyId: 1,
    title: "Senior Game Developer",
    company: "Peak Games",
    location: "İstanbul, Turkey",
    type: "Full-time",
    experience: "Senior",
    salary: "$80k - $120k",
    postedAt: "2 days ago",
    logo: "/companies/peak.png",
    description:
      "We are looking for a Senior Game Developer to join our team and help create the next generation of mobile games. The ideal candidate will have a strong background in game development and a passion for creating engaging player experiences.",
    requirements: [
      {
        id: 1,
        title: "Unity Experience",
        description: "5+ years of experience with Unity game development",
        required: true,
      },
      {
        id: 2,
        title: "Mobile Development",
        description: "Experience with mobile game development and optimization",
        required: true,
      },
      {
        id: 3,
        title: "Team Leadership",
        description: "Experience leading development teams",
        required: false,
      },
    ],
    responsibilities: [
      "Design and implement game features",
      "Optimize game performance",
      "Mentor junior developers",
      "Collaborate with game designers and artists",
      "Participate in code reviews",
    ],
    tests: [
      {
        id: 1,
        title: "Unity Technical Assessment",
        description:
          "A practical test to evaluate your Unity development skills",
        duration: "2 hours",
        passScore: 80,
      },
      {
        id: 2,
        title: "Algorithm Challenge",
        description: "Problem-solving and optimization challenges",
        duration: "1 hour",
        passScore: 75,
      },
    ],
    certifications: [
      {
        id: 1,
        name: "Unity Certified Professional",
        issuer: "Unity",
        level: "Advanced",
        required: true,
      },
      {
        id: 2,
        name: "Mobile Game Development",
        issuer: "Google",
        level: "Intermediate",
        required: false,
      },
    ],
    applicationProcess: [
      "Initial application review",
      "Technical assessment",
      "First interview with team lead",
      "Technical interview",
      "Final interview with CTO",
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Annual bonus",
      "Remote work options",
      "Professional development budget",
      "Game industry events participation",
    ],
    skills: [
      { name: "Unity", level: 90 },
      { name: "C#", level: 85 },
      { name: "Mobile Optimization", level: 80 },
      { name: "Game Architecture", level: 85 },
      { name: "Team Leadership", level: 75 },
    ],
  },
  // Add more job details as needed
};
*/

export default function JobDetails() {
  const params = useParams();
  const [job, setJob] = useState<DetailedJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJobDetails = async () => {
      try {
        const jobId = Number(params.id);
        const jobData = await db.getJobById(jobId);

        if (!jobData) {
          setError("Job not found");
          return;
        }

        // Fetch related data
        const company = await db.getCompanyById(jobData.companyId);
        const tests = await db.getTestsByJob(jobId);
        const certifications = await db.getCertificationById(jobId);

        setJob({
          ...jobData,
          company: company?.name || "Unknown Company",
          companyLogo: company?.logo || "",
          type: jobData.type as JobType,
          experience: jobData.experience as ExperienceLevel,
          logo: company?.logo || "",
          applicationProcess: [],
          tests: tests || [],
          certifications: certifications
            ? [
                {
                  id: certifications.id,
                  name: certifications.name,
                  issuer: certifications.issuer,
                  level: certifications.level as
                    | "Basic"
                    | "Intermediate"
                    | "Advanced",
                  required: true,
                },
              ]
            : [],
        });
      } catch (err) {
        setError("Failed to load job details");
        console.error("Error loading job details:", err);
      } finally {
        setLoading(false);
      }
    };

    loadJobDetails();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading job details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-black/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500">
              {error || "Job not found"}
            </h1>
            <Link href="/jobs">
              <Button className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black/50 py-24">
      <div className="container mx-auto px-4">
        <Link href="/jobs">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
        </Link>

        {/* Header Section */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gray-800 rounded-xl flex-shrink-0 overflow-hidden">
              {job.companyLogo ? (
                <Image
                  src={job.companyLogo}
                  alt={`${job.company} logo`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-4">
                {job.title}
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-400">
                  {/* Remove unused icons */}
                  {/* <Building2 className="w-4 h-4" /> */}
                  {job.company}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  {/* Remove unused icons */}
                  {/* <MapPin className="w-4 h-4" /> */}
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  {/* Remove unused icons */}
                  {/* <Briefcase className="w-4 h-4" /> */}
                  {job.type}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  {/* Remove unused icons */}
                  {/* <Clock className="w-4 h-4" /> */}
                  {new Date(job.postedAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-purple-400">
                  {job.salary}
                </span>
                <Button className="relative group overflow-hidden">
                  <span className="relative z-10">Apply Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Description
              </h2>
              <p className="text-gray-400">{job.description}</p>
            </section>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <section className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Responsibilities
                </h2>
                <ul className="space-y-2">
                  {job.responsibilities.map((responsibility, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-400"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Required Skills */}
            {job.skills && job.skills.length > 0 && (
              <section className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Required Skills
                </h2>
                <div className="space-y-4">
                  {job.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tests */}
            {job.tests && job.tests.length > 0 && (
              <section className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  <Trophy className="w-5 h-5 inline-block mr-2 text-yellow-500" />
                  Required Tests
                </h2>
                <div className="space-y-4">
                  {job.tests.map((test) => (
                    <div
                      key={test.id}
                      className="border border-gray-800 rounded-lg p-4"
                    >
                      <h3 className="font-medium text-white mb-2">
                        {test.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">
                        {test.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                          Duration: {test.duration}
                        </span>
                        <span className="text-gray-400">
                          Pass Score: {test.passScore}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {job.certifications && job.certifications.length > 0 && (
              <section className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  <GraduationCap className="w-5 h-5 inline-block mr-2 text-blue-500" />
                  Certifications
                </h2>
                <div className="space-y-4">
                  {job.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="border border-gray-800 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-white">{cert.name}</h3>
                        <Badge
                          variant={cert.required ? "destructive" : "secondary"}
                        >
                          {cert.required ? "Required" : "Optional"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">
                        Issuer: {cert.issuer}
                      </p>
                      <p className="text-sm text-gray-400">
                        Level: {cert.level}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <section className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Benefits
                </h2>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-400"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
