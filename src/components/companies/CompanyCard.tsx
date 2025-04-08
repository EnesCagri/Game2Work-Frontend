"use client";

import { Building2, MapPin, Users, Globe, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Company } from "@/types";
import Image from 'next/image';

const industryColors = {
  Gaming: "from-purple-500 to-pink-500",
  Technology: "from-blue-500 to-indigo-500",
  "AI & ML": "from-green-500 to-teal-500",
  Finance: "from-yellow-500 to-orange-500",
  Healthcare: "from-red-500 to-rose-500",
} as const;

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const glowColor =
    industryColors[company.industry as keyof typeof industryColors] ||
    "from-purple-500 to-pink-500";

  return (
    <Link
      href={`/companies/${company.id}`}
      className="group block bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:bg-gray-900/80 transition-all duration-300 relative overflow-hidden"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${glowColor} blur-xl`}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-6 mb-6">
          <div className="w-24 h-24 bg-gray-800 rounded-xl flex-shrink-0 overflow-hidden">
            {company.logo ? (
              <Image
                src={company.logo}
                alt={company.name}
                width={64}
                height={64}
                className="rounded-lg"
              />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-br ${glowColor} opacity-20`}
              />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors mb-2">
              {company.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-300">
              <Globe className="w-4 h-4" />
              <a
                href={company.website}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-colors"
              >
                {company.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="w-4 h-4" />
            {company.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Users className="w-4 h-4" />
            {company.size}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Briefcase className="w-4 h-4" />
            {company.industry}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Building2 className="w-4 h-4" />
            Founded {company.founded}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 mb-6 line-clamp-3">{company.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {company.openPositions > 0 && (
              <span className="text-sm font-medium text-purple-400">
                {company.openPositions} Open Positions
              </span>
            )}
          </div>
          <Button
            variant="outline"
            className="relative group/btn overflow-hidden"
          >
            <span className="relative z-10 group-hover/btn:text-white transition-colors">
              View Profile
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
        </div>
      </div>
    </Link>
  );
}
