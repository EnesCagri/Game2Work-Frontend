"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  X,
  Tag,
  Check,
  MapPin,
  Clock,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { db } from "@/lib/db";
import type { Job } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import JobsForYouCarousel from "@/components/JobsForYouCarousel";
import JobCard from "@/components/JobCard";

const ITEMS_PER_PAGE = 12;

// Filter options
const POSITION_TYPES = [
  { emoji: "🧑‍💻", label: "Geliştirici", value: "developer" },
  { emoji: "🎨", label: "Tasarımcı", value: "designer" },
  { emoji: "🎼", label: "Sanatçı", value: "artist" },
  { emoji: "🔊", label: "Ses / Audio", value: "audio" },
  { emoji: "🎬", label: "Hikaye / Senaryo", value: "narrative" },
  { emoji: "📈", label: "PM / İş", value: "business" },
  { emoji: "🧪", label: "QA / Test", value: "qa" },
  { emoji: "🔧", label: "Teknik Sanat / Araçlar", value: "tech_art" },
] as const;

// Job tag types
const JOB_TAGS = {
  NEW: {
    emoji: "🆕",
    label: "Yeni",
    description: "Son 24-72 saat içinde yayınlanan ilanlar",
  },
  ENDING_SOON: {
    emoji: "⏳",
    label: "Son Günler",
    description: "Kapanmasına 2 günden az kalan ilanlar",
  },
  POPULAR: {
    emoji: "🔥",
    label: "Popüler",
    description: "Çok başvuru alan ilanlar",
  },
  TESTED: {
    emoji: "🧪",
    label: "Testli İlan",
    description: "Teknik test şartı olan ilanlar",
  },
  VERIFIED: {
    emoji: "✅",
    label: "Doğrulanmış Şirket",
    description: "GTW tarafından doğrulanmış şirketler",
  },
} as const;

const LOCATIONS = [
  "Los Angeles, CA, USA",
  "London, UK",
  "San Francisco, CA, USA",
  "Montréal, QC, Canada",
  "Vancouver, BC, Canada",
  "New York, NY, USA",
  "Tokyo, Japan",
  "Berlin, Germany",
  "Singapore",
  "Sydney, Australia",
  "İstanbul, Turkey",
  "Ankara, Turkey",
];

const REMOTE_OPTIONS = ["On-site", "Remote", "Hybrid"];

const CATEGORIES = [
  "Game Development",
  "Game Design",
  "Art & Animation",
  "Programming",
  "QA & Testing",
  "Project Management",
  "Marketing",
  "Sales",
];

const CONTRACT_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

const EXPERIENCE_LEVELS = ["Entry Level", "Mid Level", "Senior", "Lead"];

const KEYWORDS = [
  "Unity",
  "Unreal Engine",
  "C++",
  "C#",
  "Python",
  "JavaScript",
  "3D Modeling",
  "Animation",
  "UI/UX",
  "Game Design",
  "Level Design",
  "Multiplayer",
  "Mobile Gaming",
  "Console Development",
  "VR/AR",
  "DirectX",
  "OpenGL",
  "Vulkan",
  "Maya",
  "Blender",
  "ZBrush",
  "Substance Painter",
  "Photoshop",
  "Shader Programming",
  "Network Programming",
];

// Skill badge colors based on category
const SKILL_COLORS: { [key: string]: string } = {
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
};

// Get color for a skill
const getSkillColor = (skill: string) => {
  const color = SKILL_COLORS[skill];
  return color || `bg-gray-500`; // Default color if not found
};

// Job badge types with colors and styles
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

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [keywordDialogOpen, setKeywordDialogOpen] = useState(false);
  const [keywordSearch, setKeywordSearch] = useState("");
  const [selectedPositionType, setSelectedPositionType] =
    useState<string>("all");
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter states
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedRemote, setSelectedRemote] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedContract, setSelectedContract] = useState<string>("all");
  const [selectedExperience, setSelectedExperience] = useState<string>("all");

  const filteredKeywords = KEYWORDS.filter((keyword) =>
    keyword.toLowerCase().includes(keywordSearch.toLowerCase())
  );

  // Load recommended jobs
  useEffect(() => {
    const loadRecommendedJobs = async () => {
      try {
        const [jobsData, companiesData] = await Promise.all([
          db.getJobs(),
          db.getCompanies(),
        ]);

        // Get the first 5 jobs for recommendations and format them
        const recommendedJobsData = jobsData.slice(0, 5).map((job) => {
          const company = companiesData.find((c) => c.id === job.companyId);
          const formattedJob: Job = {
            ...job,
            id: job.id.toString(),
            companyId: job.companyId.toString(),
            company: company?.name || "Unknown Company",
            logo: company?.logo || "",
            positionType: job.type.toLowerCase(),
            createdAt: new Date(job.postedAt),
            updatedAt: new Date(job.postedAt),
          };
          return formattedJob;
        });
        setRecommendedJobs(recommendedJobsData);
      } catch (error) {
        console.error("Failed to load recommended jobs:", error);
      }
    };

    loadRecommendedJobs();
  }, []);

  // Load all jobs
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const [jobsData, companiesData] = await Promise.all([
          db.getJobs(),
          db.getCompanies(),
        ]);

        const formattedJobs = jobsData.map((job) => {
          const company = companiesData.find((c) => c.id === job.companyId);
          const formattedJob: Job = {
            ...job,
            id: job.id.toString(),
            companyId: job.companyId.toString(),
            company: company?.name || "Unknown Company",
            logo: company?.logo || "",
            positionType: job.type.toLowerCase(),
            createdAt: new Date(job.postedAt),
            updatedAt: new Date(job.postedAt),
          };
          return formattedJob;
        });

        setJobs(formattedJobs);
        setTotalPages(Math.ceil(formattedJobs.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Failed to load jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  // Filter jobs based on all criteria
  const filteredJobs = jobs.filter((job) => {
    // Search in title, company, description, and skills
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      (job.description?.toLowerCase() || "").includes(searchLower) ||
      job.skills?.some((skill) =>
        (typeof skill === "string" ? skill : skill.name)
          .toLowerCase()
          .includes(searchLower)
      ) ||
      job.type.toLowerCase().includes(searchLower) ||
      job.experience.toLowerCase().includes(searchLower);

    // Location filter
    const matchesLocation =
      selectedLocation === "all" || job.location === selectedLocation;

    // Remote filter (check benefits array for remote/hybrid options)
    const matchesRemote =
      selectedRemote === "all" ||
      (job.benefits &&
        job.benefits.some((benefit) =>
          benefit.toLowerCase().includes(selectedRemote.toLowerCase())
        ));

    // Category filter (check against title and description)
    const matchesCategory =
      selectedCategory === "all" ||
      job.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (job.description?.toLowerCase() || "").includes(
        selectedCategory.toLowerCase()
      );

    // Company filter
    const matchesCompany =
      selectedCompany === "all" || job.company === selectedCompany;

    // Contract type filter
    const matchesContract =
      selectedContract === "all" ||
      job.type.toLowerCase() === selectedContract.toLowerCase();

    // Experience level filter
    const matchesExperience =
      selectedExperience === "all" ||
      job.experience.toLowerCase() === selectedExperience.toLowerCase();

    // Keywords filter - show jobs that match ANY of the selected keywords
    const matchesKeywords =
      selectedKeywords.length === 0 ||
      selectedKeywords.some((keyword) =>
        job.skills?.some((skill) =>
          (typeof skill === "string" ? skill : skill.name)
            .toLowerCase()
            .includes(keyword.toLowerCase())
        )
      );

    // Position type filter
    const matchesPositionType =
      selectedPositionType === "all" ||
      job.positionType === selectedPositionType;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesRemote &&
      matchesCategory &&
      matchesCompany &&
      matchesContract &&
      matchesExperience &&
      matchesKeywords &&
      matchesPositionType
    );
  });

  // Get unique companies from jobs
  const companies = Array.from(new Set(jobs.map((job) => job.company))).sort();

  // Paginate filtered jobs
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedLocation,
    selectedRemote,
    selectedCategory,
    selectedCompany,
    selectedContract,
    selectedExperience,
    selectedKeywords,
    selectedPositionType,
  ]);

  // Function to handle keyword selection
  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handleApply = async (jobId: string) => {
    try {
      // TODO: Implement job application logic
      toast.success("Application submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    }
  };

  const handleSave = async (jobId: string) => {
    // TODO: Implement job saving logic
    toast.success("Job saved successfully!");
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % recommendedJobs.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + recommendedJobs.length) % recommendedJobs.length
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 md:p-12 mb-12">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Oyun Geliştirme Kariyerinizi Başlatın
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Hayalinizdeki oyun geliştirme işini bulun veya yetenekli
              geliştiricileri ekibinize katın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => {
                  const searchSection =
                    document.getElementById("search-section");
                  searchSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                İş Fırsatlarını Keşfet
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => {
                  // TODO: Implement job posting navigation
                  toast.info("İş ilanı yayınlama özelliği yakında eklenecek!");
                }}
              >
                İş İlanı Yayınla
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recommended Jobs Slider */}
      <JobsForYouCarousel />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
        id="search-section"
      >
        <h2 className="text-2xl font-semibold mb-4">İş Arama</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Filtreleri kullanarak aradığınız işi kolayca bulun
        </p>
      </motion.div>

      {/* Arama ve Filtre Bölümü */}
      <div className="space-y-4 mb-8">
        {/* Arama Çubuğu */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Başlık, şirket, yetenek ile ara (örn: C#, Unity)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtre Satırı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2">
          <div className="px-0">
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger>
                <SelectValue placeholder="Konum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Konumlar</SelectItem>
                {LOCATIONS.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="px-0">
            <Select value={selectedRemote} onValueChange={setSelectedRemote}>
              <SelectTrigger>
                <SelectValue placeholder="Çalışma Şekli" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Türler</SelectItem>
                {REMOTE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option === "On-site"
                      ? "Ofiste"
                      : option === "Remote"
                      ? "Uzaktan"
                      : "Hibrit"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="px-0">
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger>
                <SelectValue placeholder="Şirket" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Şirketler</SelectItem>
                {companies.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="px-0">
            <Select
              value={selectedContract}
              onValueChange={setSelectedContract}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sözleşme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Sözleşmeler</SelectItem>
                {CONTRACT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "Full-time"
                      ? "Tam Zamanlı"
                      : type === "Part-time"
                      ? "Yarı Zamanlı"
                      : type === "Contract"
                      ? "Sözleşmeli"
                      : "Staj"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="px-0">
            <Select
              value={selectedExperience}
              onValueChange={setSelectedExperience}
            >
              <SelectTrigger>
                <SelectValue placeholder="Deneyim" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Seviyeler</SelectItem>
                {EXPERIENCE_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level === "Entry Level"
                      ? "Başlangıç Seviyesi"
                      : level === "Mid Level"
                      ? "Orta Seviye"
                      : level === "Senior"
                      ? "Kıdemli"
                      : "Lider"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="px-0">
            <Select
              value={selectedPositionType}
              onValueChange={setSelectedPositionType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pozisyon Türü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Pozisyonlar</SelectItem>
                {POSITION_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <span className="flex items-center gap-2">
                      {type.emoji} {type.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="px-0">
            <Dialog
              open={keywordDialogOpen}
              onOpenChange={setKeywordDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal h-10"
                >
                  <Tag className="mr-2 h-4 w-4" />
                  {selectedKeywords.length > 0
                    ? `${selectedKeywords.length} anahtar kelime seçildi`
                    : "Anahtar Kelime Seç"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Anahtar Kelime Seç</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <div className="flex items-center border-b px-3 mb-2">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <Input
                      placeholder="Anahtar kelime ara..."
                      value={keywordSearch}
                      onChange={(e) => setKeywordSearch(e.target.value)}
                      className="border-0 focus-visible:ring-0 px-0"
                    />
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {filteredKeywords.length === 0 ? (
                      <p className="text-center py-6 text-sm text-muted-foreground">
                        Anahtar kelime bulunamadı.
                      </p>
                    ) : (
                      <div className="space-y-1">
                        {filteredKeywords.map((keyword) => {
                          const isSelected = selectedKeywords.includes(keyword);
                          return (
                            <div
                              key={keyword}
                              onClick={() => toggleKeyword(keyword)}
                              className={cn(
                                "flex items-center gap-2 px-2 py-1.5 rounded-sm text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground",
                                isSelected && "bg-accent/50"
                              )}
                            >
                              <div
                                className={cn(
                                  "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                  isSelected &&
                                    "bg-primary text-primary-foreground"
                                )}
                              >
                                {isSelected && <Check className="h-3 w-3" />}
                              </div>
                              <span className="flex-1">{keyword}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  {selectedKeywords.length > 0 && (
                    <div className="mt-4 flex justify-between items-center border-t pt-4">
                      <span className="text-sm text-muted-foreground">
                        {selectedKeywords.length} seçildi
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedKeywords([])}
                      >
                        Tümünü Temizle
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Seçili Anahtar Kelimeler */}
        {selectedKeywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedKeywords.map((keyword) => (
              <Badge
                key={keyword}
                variant="secondary"
                className="flex items-center gap-1 cursor-pointer hover:bg-destructive/10"
              >
                {keyword}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => toggleKeyword(keyword)}
                />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedKeywords([])}
              className="h-6 px-2 text-xs"
            >
              Tümünü Temizle
            </Button>
          </div>
        )}

        {/* Sonuç Sayısı */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {filteredJobs.length} ilan bulundu
        </div>
      </div>

      {/* İlanlar Grid */}
      {loading ? (
        <div className="text-center py-12">İlanlar yükleniyor...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedJobs.map((job) => (
              <div
                key={job.id}
                className="group relative rounded-lg border p-5 transition-all hover:border-primary"
              >
                <Link
                  href={`/jobs/${job.id}`}
                  className="absolute inset-0 z-10"
                  aria-label={`${job.title} pozisyonu, ${job.company} şirketinde`}
                />
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={job.logo || "/placeholder-logo.png"}
                          alt={job.company}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {job.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Özel Rozetler */}
                  <div className="flex flex-wrap gap-2">
                    {job.isHot && (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${JOB_BADGES.HOT.className}`}
                      >
                        {JOB_BADGES.HOT.icon} {JOB_BADGES.HOT.label}
                      </span>
                    )}
                    {job.isTrending && (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${JOB_BADGES.TRENDING.className}`}
                      >
                        {JOB_BADGES.TRENDING.icon} {JOB_BADGES.TRENDING.label}
                      </span>
                    )}
                    {job.isPremium && (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${JOB_BADGES.PREMIUM.className}`}
                      >
                        {JOB_BADGES.PREMIUM.icon} {JOB_BADGES.PREMIUM.label}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getSkillColor(
                            typeof skill === "string" ? skill : skill.name
                          )}`}
                        >
                          {typeof skill === "string" ? skill : skill.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex gap-2 mt-4 relative z-20">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handleApply(job.id);
                      }}
                      className="flex-1"
                      variant="outline"
                    >
                      Hemen Başvur
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full hover:text-yellow-500 hover:border-yellow-500"
                      onClick={() => handleSave(job.id)}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sayfalama */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Sonuç Bulunamadı */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                Arama kriterlerinize uygun ilan bulunamadı.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
