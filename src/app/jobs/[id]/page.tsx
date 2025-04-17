"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Bookmark,
  ChevronDown,
  Youtube,
  Building2,
  MapPin,
  Clock,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import type { Job } from "@/types";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { YouTubeEmbed } from "@/components/jobs/YouTubeEmbed";
import { JobDescriptionModal } from "@/components/jobs/JobDescriptionModal";
import { JobCard } from "@/components/JobCard";
import { companies } from "@/data/db";

// Maximum description length before showing "Read more"
const MAX_DESCRIPTION_LENGTH = 300;

export default function JobDetails() {
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const loadJobDetails = async () => {
      try {
        const jobData = await db.getJobById(Number(params.id));
        if (!jobData) {
          setError("Job not found");
          return;
        }

        // Get company details
        const company = companies.companies.find(
          (c) => c.id === jobData.companyId
        );
        if (!company) {
          setError("Company not found");
          return;
        }

        // Format job data to match Job type
        const formattedJob: Job = {
          id: jobData.id,
          title: jobData.title,
          companyId: jobData.companyId,
          company: company.name,
          logo: company.logo,
          location: jobData.location,
          type: jobData.type,
          experience: jobData.experience,
          salary: jobData.salary,
          postedAt: jobData.postedAt,
          description: jobData.description,
          requirements: jobData.requirements,
          responsibilities: jobData.responsibilities,
          requiredTestIds: jobData.requiredTestIds,
          requiredCertificationIds: jobData.requiredCertificationIds,
          skills: jobData.skills,
          benefits: jobData.benefits,
          status: jobData.status,
          youtubeVideoId: jobData.youtubeVideoId,
          positionType: jobData.type,
          createdAt: new Date(jobData.postedAt),
          updatedAt: new Date(jobData.postedAt),
          isSaved: false,
        };
        setJob(formattedJob);

        // For now, just get some random jobs for recommendations
        const allJobs = await db.getJobs();
        const randomJobs = allJobs
          .filter((j) => j.id.toString() !== params.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((job) => {
            const company = companies.companies.find(
              (c) => c.id === job.companyId
            );
            const formattedJob: Job = {
              id: job.id,
              title: job.title,
              companyId: job.companyId,
              company: company?.name || "Unknown Company",
              logo: company?.logo,
              location: job.location,
              type: job.type,
              experience: job.experience,
              salary: job.salary,
              postedAt: job.postedAt,
              description: job.description,
              requirements: job.requirements,
              responsibilities: job.responsibilities,
              requiredTestIds: job.requiredTestIds,
              requiredCertificationIds: job.requiredCertificationIds,
              skills: job.skills,
              benefits: job.benefits,
              status: job.status,
              youtubeVideoId: job.youtubeVideoId,
              positionType: job.type,
              createdAt: new Date(job.postedAt),
              updatedAt: new Date(job.postedAt),
              isSaved: false,
            };
            return formattedJob;
          });
        setRecommendedJobs(randomJobs);

        // For now, just get some random blogs for recommendations
        const allBlogs = await db.getBlogs();
        const randomBlogs = allBlogs
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        setRelatedBlogs(randomBlogs);

        // Get similar jobs
        const similarJobsData = await db.getSimilarJobs(Number(params.id));
        const formattedSimilarJobs = similarJobsData.map((job) => {
          const company = companies.companies.find(
            (c) => c.id === job.companyId
          );
          const formattedJob: Job = {
            id: job.id,
            title: job.title,
            companyId: job.companyId,
            company: company?.name || "Unknown Company",
            logo: company?.logo,
            location: job.location,
            type: job.type,
            experience: job.experience,
            salary: job.salary,
            postedAt: job.postedAt,
            description: job.description,
            requirements: job.requirements,
            responsibilities: job.responsibilities,
            requiredTestIds: job.requiredTestIds,
            requiredCertificationIds: job.requiredCertificationIds,
            skills: job.skills,
            benefits: job.benefits,
            status: job.status,
            youtubeVideoId: job.youtubeVideoId,
            positionType: job.type,
            createdAt: new Date(job.postedAt),
            updatedAt: new Date(job.postedAt),
            isSaved: false,
          };
          return formattedJob;
        });
        setSimilarJobs(formattedSimilarJobs);

        // For now, just get some random jobs for recommendations
        const allRelatedJobs = await db.getJobs();
        const randomRelatedJobs = allRelatedJobs
          .filter((j) => j.id.toString() !== params.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((job) => {
            const company = companies.companies.find(
              (c) => c.id === job.companyId
            );
            const formattedJob: Job = {
              id: job.id,
              title: job.title,
              companyId: job.companyId,
              company: company?.name || "Unknown Company",
              logo: company?.logo,
              location: job.location,
              type: job.type,
              experience: job.experience,
              salary: job.salary,
              postedAt: job.postedAt,
              description: job.description,
              requirements: job.requirements,
              responsibilities: job.responsibilities,
              requiredTestIds: job.requiredTestIds,
              requiredCertificationIds: job.requiredCertificationIds,
              skills: job.skills,
              benefits: job.benefits,
              status: job.status,
              youtubeVideoId: job.youtubeVideoId,
              positionType: job.type,
              createdAt: new Date(job.postedAt),
              updatedAt: new Date(job.postedAt),
              isSaved: false,
            };
            return formattedJob;
          });
        setRelatedJobs(randomRelatedJobs);
      } catch (err) {
        setError("Failed to load job details");
        console.error("Error loading job details:", err);
      } finally {
        setLoading(false);
      }
    };

    loadJobDetails();
  }, [params.id]);

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(
      isSaved ? "Job removed from saved items" : "Job saved successfully"
    );
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: job?.title,
        text: `Check out this job: ${job?.title} at ${job?.company}`,
        url: window.location.href,
      });
    } catch (error) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">İlan detayları yükleniyor...</div>
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
              {error || "İlan bulunamadı"}
            </h1>
            <Link href="/jobs">
              <Button className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                İlanlara Dön
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const truncatedDescription = job.description
    ? job.description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
    : "";

  return (
    <main className="min-h-screen bg-black/50 py-24">
      <div className="container mx-auto px-4">
        <Link href="/jobs">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            İlanlara Dön
          </Button>
        </Link>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Ana İçerik */}
          <div className="xl:col-span-3 space-y-8">
            {/* Başlık Bölümü */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 backdrop-blur-sm">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-gray-800 rounded-xl flex-shrink-0 overflow-hidden">
                  {job.logo ? (
                    <Image
                      src={job.logo}
                      alt={`${job.company} logosu`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">
                        {job.title}
                      </h1>
                      <p className="text-xl text-gray-400 mb-4">
                        {job.company}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleSave}
                        className={isSaved ? "text-yellow-500" : ""}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleShare}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Briefcase className="w-4 h-4" />
                      {job.type} • {job.experience}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      {formatDistanceToNow(new Date(job.postedAt))} önce
                      yayınlandı
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Building2 className="w-4 h-4" />
                      {job.company}
                    </div>
                  </div>
                  {job.salary && (
                    <div className="mt-4">
                      <span className="text-xl font-semibold text-purple-400">
                        {job.salary}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Video Bölümü */}
            {job.youtubeVideoId && (
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Youtube className="w-5 h-5 text-red-400" />
                  <h2 className="text-xl font-semibold text-white">
                    İş Tanıtım Videosu
                  </h2>
                </div>
                <YouTubeEmbed
                  videoId={job.youtubeVideoId}
                  title={`${job.title} - Video Tanıtım`}
                />
              </div>
            )}

            {/* Açıklama Önizleme */}
            {job.description && (
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  İş Tanımı
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-400">{truncatedDescription}</p>
                  <Button
                    variant="ghost"
                    className="mt-2"
                    onClick={() => setIsDescriptionModalOpen(true)}
                  >
                    Devamını Oku <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Yetenekler Bölümü */}
            {job.skills && job.skills.length > 0 && (
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Gerekli Yetenekler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {job.skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sorumluluklar Bölümü */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Sorumluluklar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {job.responsibilities.map((responsibility, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-gray-400"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{responsibility}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Yan Menü */}
          <div className="space-y-8">
            {/* Başvuru Butonu */}
            <Button className="w-full h-12 text-lg relative group overflow-hidden">
              <span className="relative z-10">Hemen Başvur</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>

            {/* Avantajlar Bölümü */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Avantajlar
                </h2>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-400"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Testler Bölümü */}
            {job.requiredTestIds && job.requiredTestIds.length > 0 && (
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  <Trophy className="w-5 h-5 inline-block mr-2 text-yellow-500" />
                  Gerekli Testler
                </h2>
                <div className="space-y-4">
                  {job.requiredTestIds.map((testId) => (
                    <div
                      key={testId}
                      className="border border-gray-800 rounded-lg p-4"
                    >
                      <h3 className="font-medium text-white mb-2">
                        Teknik Değerlendirme {testId}
                      </h3>
                      <div className="text-sm text-gray-400">
                        Başvuru için tamamlanması gerekiyor
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Benzer İlanlar Bölümü */}
        {relatedJobs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              Benzer İlanlar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedJobs.map((relatedJob) => (
                <Link
                  key={relatedJob.id}
                  href={`/jobs/${relatedJob.id}`}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm hover:border-purple-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden">
                      {relatedJob.logo && (
                        <Image
                          src={relatedJob.logo}
                          alt={`${relatedJob.company} logosu`}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {relatedJob.title}
                      </h3>
                      <p className="text-gray-400">{relatedJob.company}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">
                          {relatedJob.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {relatedJob.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* İlgili Makaleler Bölümü */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              İlgili Makaleler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.id}`}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden backdrop-blur-sm hover:border-purple-500/50 transition-colors group"
                >
                  {blog.image && (
                    <div className="relative h-48">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <div className="flex items-center gap-2">
                        <Image
                          src={blog.authorAvatar}
                          alt={blog.author}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <span>{blog.author}</span>
                      </div>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags
                        .slice(0, 3)
                        .map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Açıklama Modalı */}
        <JobDescriptionModal
          isOpen={isDescriptionModalOpen}
          onClose={() => setIsDescriptionModalOpen(false)}
          title={job.title}
          description={job.description || ""}
        />
      </div>
    </main>
  );
}
