"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import Link from "next/link";
import { db } from "@/lib/db";
import { useEffect, useState } from "react";
import type { Job } from "@/types";
import { JobCard } from "@/components/JobCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

export default function JobsForYouCarousel() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobsData = await db.getJobs();

        // Filter and sort jobs:
        // 1. First, get jobs that are hot, trending, or premium
        // 2. Sort by newest first
        // 3. Take the first 8 jobs
        const featuredJobs = jobsData
          .filter((job) => job.isHot || job.isTrending || job.isPremium)
          .sort(
            (a, b) =>
              new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
          )
          .slice(0, 8)
          .map((job) => ({
            ...job,
            company: `Company ${job.companyId}`, // Use companyId to create company name
            positionType: job.type,
            createdAt: new Date(job.postedAt),
            updatedAt: new Date(job.postedAt),
            isSaved: false,
          }));

        setJobs(featuredJobs);
      } catch (error) {
        console.error("Failed to load jobs:", error);
      }
    };

    loadJobs();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Sana özel fırsatlar</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Öne çıkan ve yeni iş fırsatlarını keşfet
        </p>
      </div>

      <div className="relative -mx-4 px-4 overflow-hidden">
        {/* Animated background gradients */}
        <div className="absolute inset-0 flex justify-around -z-10">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-56 h-56 bg-primary/30 rounded-full filter blur-3xl opacity-20"
              animate={{
                y: ["0%", "100%", "0%"],
                x: ["0%", "50%", "0%"],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <Swiper
          modules={[FreeMode]}
          spaceBetween={16}
          slidesPerView={1.2}
          freeMode={true}
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
            1280: { slidesPerView: 4.2 },
          }}
          className="!pb-8 !-mx-2"
        >
          {jobs.map((job) => (
            <SwiperSlide key={job.id} className="!px-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <JobCard
                  job={job}
                  variant="compact"
                  className="relative backdrop-blur-sm bg-card/80"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-between items-center mt-6 border-t pt-6">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{jobs.length}</span> öne
          çıkan ilan
        </p>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
              Tüm öne çıkan ilanları gör →
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Öne Çıkan İlanlar</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {jobs.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <JobCard job={job} variant="compact" />
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
