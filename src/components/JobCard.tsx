import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import type { Job } from "@/types";

interface JobCardProps {
  job: Job;
  variant?: "default" | "compact";
  className?: string;
}

export function JobCard({
  job,
  variant = "default",
  className = "",
}: JobCardProps) {
  return (
    <div
      className={`bg-card shadow-sm rounded-xl p-4 border flex flex-col h-full justify-between ${className}`}
    >
      <div>
        <div
          className={`${
            variant === "default" ? "h-12 w-12" : "h-8 w-8"
          } mb-2 relative`}
        >
          <Image
            src={job.logo || "/placeholder-logo.png"}
            alt={`${job.company} company logo for ${job.title} position`}
            fill
            className="object-contain"
            priority={variant === "default"}
            sizes={variant === "default" ? "48px" : "32px"}
          />
        </div>
        <h3
          className={`${
            variant === "default" ? "text-lg" : "text-base"
          } font-medium`}
        >
          {job.title}
        </h3>
        <p className="text-sm text-muted-foreground">{job.company}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-muted rounded-md">
            <MapPin className="h-3 w-3" />
            {job.location}
          </span>
          {job.hasTechnicalTest && (
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md">
              Teknik Test
            </span>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {new Date(job.postedAt).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
          })}
        </span>
        <Link href={`/jobs/${job.id}`}>
          <Button size="sm" variant="secondary">
            İncele
          </Button>
        </Link>
      </div>
    </div>
  );
}
