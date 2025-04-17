"use client";

import { Building2, MapPin, Clock, Briefcase, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import type { Job } from "@/types";

const levelColors = {
  Entry: "from-green-500 to-emerald-500",
  "Mid-level": "from-blue-500 to-indigo-500",
  Senior: "from-red-500 to-pink-500",
  Lead: "from-purple-500 to-fuchsia-500",
} as const;

type ExperienceLevel = keyof typeof levelColors;

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const glowColor =
    levelColors[job.experience as ExperienceLevel] ||
    "from-purple-500 to-pink-500";

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group block bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:bg-gray-900/80 transition-all duration-300 relative overflow-hidden"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${glowColor} blur-xl`}
        />
      </div>

      <div className="relative z-10 flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden">
          {job.logo ? (
            <Image
              src={job.logo}
              alt={job.company}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${glowColor} opacity-20`}
            />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1 text-white group-hover:text-white/90 transition-colors">
            {job.title}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-300">
              <Building2 className="w-4 h-4" />
              {job.company}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-300">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-300">
              <Briefcase className="w-4 h-4" />
              {job.type} • {job.experience}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-300">
              <Clock className="w-4 h-4" />
              {new Date(job.postedAt).toLocaleDateString()}
            </div>
            {job.youtubeVideoId && (
              <div className="flex items-center gap-2 text-sm text-red-400 group-hover:text-red-300">
                <Youtube className="w-4 h-4" />
                Video Available
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-purple-400">
              {job.salary || "Salary not specified"}
            </span>
            <Link href={`/jobs/${job.id}`}>
              <Button
                variant="outline"
                className="relative group/btn overflow-hidden"
              >
                <span className="relative z-10 group-hover/btn:text-white transition-colors">
                  View Details
                </span>
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${glowColor} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`}
                />
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${glowColor} blur-xl`}
                  />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}
