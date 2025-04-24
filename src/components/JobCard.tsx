import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Bookmark } from "lucide-react";
import type { Job } from "@/types";

interface JobCardProps {
  job: Job;
  onApply: (jobId: number) => void;
  onSave: (jobId: number) => void;
}

const JOB_BADGES = {
  HOT: {
    label: "New",
    className: "bg-red-500/10 text-red-500 border-red-500/20",
    icon: "🔥",
  },
  TRENDING: {
    label: "Trending",
    className: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    icon: "📈",
  },
  PREMIUM: {
    label: "Premium",
    className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    icon: "⭐",
  },
} as const;

const getSkillColor = (skill: string) => {
  const color = {
    Unity: "bg-[#00FF9C]/10 text-[#00FF9C] border-[#00FF9C]/20",
    "Unreal Engine": "bg-[#FF4747]/10 text-[#FF4747] border-[#FF4747]/20",
    "C++": "bg-[#659AD2]/10 text-[#659AD2] border-[#659AD2]/20",
    "C#": "bg-[#953DAC]/10 text-[#953DAC] border-[#953DAC]/20",
    Python: "bg-[#FFD43B]/10 text-[#FFD43B] border-[#FFD43B]/20",
    JavaScript: "bg-[#F7DF1E]/10 text-[#F7DF1E] border-[#F7DF1E]/20",
    TypeScript: "bg-[#3178C6]/10 text-[#3178C6] border-[#3178C6]/20",
    "3D Modeling": "bg-[#FF9A00]/10 text-[#FF9A00] border-[#FF9A00]/20",
    Animation: "bg-[#FF61F6]/10 text-[#FF61F6] border-[#FF61F6]/20",
    "UI/UX": "bg-[#FF6B6B]/10 text-[#FF6B6B] border-[#FF6B6B]/20",
    default: "bg-gray-100/10 text-gray-400 border-gray-200/20",
  }[skill];
  return color || "bg-gray-500";
};

export function JobCard({ job, onApply, onSave }: JobCardProps) {
  return (
    <div className="group relative rounded-lg p-5 transition-all duration-300 hover:scale-[1.02]">
      {/* Base navy background */}
      <div className="absolute inset-0 rounded-lg bg-navy-900/90 backdrop-blur-sm border border-navy-700/50" />

      {/* Gradient overlay that becomes more visible on hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-navy-800/50 to-navy-900/50 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

      <Link
        href={`/jobs/${job.id}`}
        className="absolute inset-0 z-10"
        aria-label={`${job.title} pozisyonu, ${job.company} şirketinde`}
      />
      <div className="relative flex flex-col h-full">
        {/* Content wrapper with flex-1 to push buttons to bottom */}
        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-navy-800/50 backdrop-blur-sm border border-navy-700/50">
                <Image
                  src={job.logo || "/placeholder-logo.png"}
                  alt={job.company}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {job.title}
                </h3>
                <p className="text-sm text-navy-300">{job.company}</p>
              </div>
            </div>
          </div>

          {/* Özel Rozetler */}
          <div className="flex flex-wrap gap-2">
            {job.isHot && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium backdrop-blur-sm border border-navy-700/50 ${JOB_BADGES.HOT.className}`}
              >
                {JOB_BADGES.HOT.icon} {JOB_BADGES.HOT.label}
              </span>
            )}
            {job.isTrending && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium backdrop-blur-sm border border-navy-700/50 ${JOB_BADGES.TRENDING.className}`}
              >
                {JOB_BADGES.TRENDING.icon} {JOB_BADGES.TRENDING.label}
              </span>
            )}
            {job.isPremium && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium backdrop-blur-sm border border-navy-700/50 ${JOB_BADGES.PREMIUM.className}`}
              >
                {JOB_BADGES.PREMIUM.icon} {JOB_BADGES.PREMIUM.label}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-navy-300">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{job.type}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {(job.skills || []).map((skill, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm border border-navy-700/50 ${getSkillColor(
                    typeof skill === "string" ? skill : skill.name
                  )}`}
                >
                  {typeof skill === "string" ? skill : skill.name}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-4 text-sm text-navy-300 line-clamp-2">
            {job.description}
          </p>
        </div>

        {/* Buttons always at bottom */}
        <div className="flex gap-2 mt-6 relative z-20">
          <Button
            onClick={(e) => {
              e.preventDefault();
              onApply(job.id);
            }}
            className="flex-1 bg-navy-800/50 hover:bg-navy-700/50 text-white border border-navy-700/50 backdrop-blur-sm"
            variant="outline"
          >
            Hemen Başvur
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-navy-800/50 hover:bg-navy-700/50 text-white border border-navy-700/50 backdrop-blur-sm hover:text-yellow-400"
            onClick={() => onSave(job.id)}
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
