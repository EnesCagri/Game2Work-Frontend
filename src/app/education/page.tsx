"use client";

import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Play,
  Clock,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
  Flame,
  PlayCircle,
  Trophy,
  ThumbsUp,
  ArrowRight,
  Gamepad2,
  Swords,
  Shield,
  Code2,
  Palette,
  Music4,
  BarChart,
  Laptop,
  Unplug,
  Blocks,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { db } from "@/lib/db";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  field: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  rating: number;
  tutor: {
    name: string;
    avatar: string;
    expertise: string;
  };
  students?: number;
  lessons?: number;
  keywords?: string[];
  technologies?: string[];
  platforms?: string[];
}

interface FilterOption {
  id: string;
  label: string;
  value: string;
  checked: boolean;
  icon?: any;
  imageSrc?: string;
}

interface FilterSection {
  title: string;
  icon?: any;
  isOpen: boolean;
  options: FilterOption[];
}

interface Bundle {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  courses: number;
  students: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
}

const difficultyIcons = {
  Beginner: Shield,
  Intermediate: Swords,
  Advanced: Flame,
};

const difficultyColors = {
  Beginner:
    "bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-500/90 hover:to-green-600/90",
  Intermediate:
    "bg-gradient-to-r from-yellow-500/80 to-yellow-600/80 hover:from-yellow-500/90 hover:to-yellow-600/90",
  Advanced:
    "bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-500/90 hover:to-red-600/90",
};

const fields = [
  "Game Development",
  "Programming",
  "Design",
  "Art",
  "Audio",
  "Business",
  "Marketing",
];

const featuredCourses = [
  {
    id: 1,
    title: "Unity Game Development Fundamentals",
    description:
      "Learn the basics of Unity game development, from setting up your first project to creating simple games.",
    thumbnail: "/Education/course1.jpg",
    field: "Game Development",
    difficulty: "Beginner",
    duration: "8 weeks",
    rating: 4.8,
    tutor: {
      name: "John Smith",
      avatar: "/tutors/john-smith.jpg",
      expertise: "Game Developer with 10+ years of experience",
    },
    students: 1234,
    lessons: 48,
  },
  // Add more featured courses here
];

const initialFilters: Record<string, FilterSection> = {
  type: {
    title: "Tür",
    icon: Blocks,
    isOpen: true,
    options: [
      {
        id: "course",
        label: "Kurslar",
        value: "course",
        checked: false,
        icon: Laptop,
      },
      {
        id: "tutorial",
        label: "Öğreticiler",
        value: "tutorial",
        checked: false,
        icon: PlayCircle,
      },
      {
        id: "asset",
        label: "Varlıklar",
        value: "asset",
        checked: false,
        icon: Unplug,
      },
    ],
  },
  categories: {
    title: "Kategoriler",
    icon: Filter,
    isOpen: true,
    options: [
      {
        id: "game-development",
        label: "Oyun Geliştirme",
        value: "Game Development",
        checked: false,
        icon: Gamepad2,
      },
      {
        id: "programming",
        label: "Programlama",
        value: "Programming",
        checked: false,
        icon: Code2,
      },
      {
        id: "design",
        label: "Tasarım",
        value: "Design",
        checked: false,
        icon: Blocks,
      },
      {
        id: "art",
        label: "Sanat",
        value: "Art",
        checked: false,
        icon: Palette,
      },
      {
        id: "audio",
        label: "Ses",
        value: "Audio",
        checked: false,
        icon: Music4,
      },
      {
        id: "marketing",
        label: "Pazarlama",
        value: "Marketing",
        checked: false,
        icon: BarChart,
      },
    ],
  },
  software: {
    title: "Yazılım",
    icon: Laptop,
    isOpen: true,
    options: [
      {
        id: "unity",
        label: "Unity",
        value: "unity",
        checked: false,
        imageSrc: "/logos/unity.png",
      },
      {
        id: "unreal",
        label: "Unreal",
        value: "unreal",
        checked: false,
        imageSrc: "/logos/unreal.png",
      },
      {
        id: "blender",
        label: "Blender",
        value: "blender",
        checked: false,
        imageSrc: "/logos/blender.png",
      },
      {
        id: "maya",
        label: "Maya",
        value: "maya",
        checked: false,
        imageSrc: "/logos/maya.png",
      },
      {
        id: "zbrush",
        label: "ZBrush",
        value: "zbrush",
        checked: false,
        imageSrc: "/logos/zbrush.png",
      },
      {
        id: "substance",
        label: "Substance",
        value: "substance",
        checked: false,
        imageSrc: "/logos/substance.png",
      },
    ],
  },
  level: {
    title: "Seviye",
    icon: Trophy,
    isOpen: true,
    options: [
      {
        id: "beginner",
        label: "Başlangıç",
        value: "Beginner",
        checked: false,
        icon: Shield,
      },
      {
        id: "intermediate",
        label: "Orta",
        value: "Intermediate",
        checked: false,
        icon: Swords,
      },
      {
        id: "advanced",
        label: "İleri",
        value: "Advanced",
        checked: false,
        icon: Flame,
      },
    ],
  },
};

const banners = [
  {
    id: 1,
    title: "Prosedürel İçerik Oluşturmayı Öğren",
    description: "Sonsuz oyun dünyaları yaratma sanatında ustalaş",
    image: "/Education/educationbanner1.png",
    link: "/courses/procedural-generation",
  },
  {
    id: 2,
    title: "Oyun Yapay Zekası Masterclass",
    description: "Zeki ve sürükleyici oyun yapay zekası oluştur",
    image: "/Education/educationbanner2.png",
    link: "/courses/game-ai",
  },
  // Add more banners as needed
];

const hotBundles: Bundle[] = [
  {
    id: 1,
    title: "Komple Godot Paketi",
    description: "Sıfırdan Godot oyun geliştirmede uzmanlaş",
    image: "/bundles/godot-bundle.jpg",
    price: 49.99,
    originalPrice: 199.99,
    courses: 5,
    students: 1234,
    difficulty: "Beginner",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Komple Unity 2D Paketi",
    description: "Unity ile muhteşem 2D oyunlar yaratmayı öğren",
    image: "/bundles/unity-2d-bundle.jpg",
    price: 59.99,
    originalPrice: 249.99,
    courses: 6,
    students: 2345,
    difficulty: "Intermediate",
    rating: 4.9,
  },
  {
    id: 3,
    title: "İleri Seviye Blender Sanatçı Paketi",
    description: "Blender ile profesyonel 3D sanatçı ol",
    image: "/bundles/blender-bundle.jpg",
    price: 69.99,
    originalPrice: 299.99,
    courses: 7,
    students: 3456,
    difficulty: "Advanced",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Komple Unreal C++ Paketi",
    description: "Unreal Engine C++ oyun geliştirmede uzmanlaş",
    image: "/bundles/unreal-bundle.jpg",
    price: 79.99,
    originalPrice: 349.99,
    courses: 8,
    students: 4567,
    difficulty: "Intermediate",
    rating: 4.6,
  },
];

type TabType = "all" | "top" | "hot" | "popular";

export default function Education() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const [currentBanner, setCurrentBanner] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>("popular");
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await db.getCourses();
        setCourses(data as Course[]);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Auto-advance banner every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleFilterSection = (sectionKey: string) => {
    setFilters((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        isOpen: !prev[sectionKey].isOpen,
      },
    }));
  };

  const toggleFilterOption = (sectionKey: string, optionId: string) => {
    setFilters((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        options: prev[sectionKey].options.map((option) =>
          option.id === optionId
            ? { ...option, checked: !option.checked }
            : option
        ),
      },
    }));
    setCurrentPage(1);
  };

  const filteredCourses = courses.filter((course) => {
    // Search in title, description, and keywords
    const searchTerms = searchQuery.toLowerCase().split(" ");
    const matchesSearch = searchTerms.every(
      (term) =>
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term) ||
        course.keywords?.some((keyword) => keyword.toLowerCase().includes(term))
    );

    // Check if any filters are active
    const activeFilters = Object.values(filters).flatMap((section) =>
      section.options.filter((option) => option.checked)
    );

    // If no filters are active, show all courses that match search
    if (activeFilters.length === 0) {
      return matchesSearch;
    }

    // Check if course matches active filters
    const matchesFilters = Object.entries(filters).every(
      ([sectionKey, section]) => {
        const activeOptions = section.options.filter(
          (option) => option.checked
        );
        if (activeOptions.length === 0) return true;

        return activeOptions.some((option) => {
          switch (sectionKey) {
            case "level":
              return course.difficulty === option.value;
            case "software":
              return course.keywords?.some(
                (keyword) =>
                  keyword.toLowerCase() === option.value.toLowerCase()
              );
            case "categories":
              return (
                course.field === option.value ||
                course.keywords?.some(
                  (keyword) =>
                    keyword.toLowerCase() === option.value.toLowerCase()
                )
              );
            case "type":
              // You can add type-specific logic here if needed
              return true;
            default:
              return true;
          }
        });
      }
    );

    return matchesSearch && matchesFilters;
  });

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCourseClick = (courseId: number) => {
    router.push(`/education/${courseId}`);
  };

  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <GradientOrb
        color="#3b82f6"
        position="top-right"
        size="lg"
        opacity={0.15}
      />
      <GradientOrb
        color="#06b6d4"
        position="bottom-left"
        size="lg"
        opacity={0.15}
      />

      <div className="container relative z-10 mx-auto px-4 py-8">
        {/* Banner Image */}
        <div className="relative mb-12 rounded-xl overflow-hidden">
          <div className="relative aspect-[21/9] w-full">
            {banners.map((banner, index) => (
              <motion.div
                key={banner.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentBanner ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h2 className="text-4xl font-bold text-white mb-4">
                    {banner.title}
                  </h2>
                  <p className="text-xl text-gray-300 mb-6">
                    {banner.description}
                  </p>
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                    Daha Fazla Bilgi
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="absolute bottom-4 right-4 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentBanner ? "bg-blue-500" : "bg-gray-500/50"
                }`}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </div>
        </div>

        {/* Course Sections Tabs */}
        <div className="mb-12">
          <div className="flex flex-col items-center">
            <Tabs
              defaultValue="popular"
              className="w-full"
              onValueChange={(value) => setActiveTab(value as TabType)}
            >
              <div className="flex justify-center mb-8">
                <TabsList className="bg-transparent border-0 gap-2">
                  <TabsTrigger
                    value="all"
                    className="px-6 py-2 rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  >
                    Tüm Kurslar
                  </TabsTrigger>
                  <TabsTrigger
                    value="top"
                    className="px-6 py-2 rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    En İyi
                  </TabsTrigger>
                  <TabsTrigger
                    value="hot"
                    className="px-6 py-2 rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  >
                    <Flame className="w-4 h-4 mr-2" />
                    Yeni ve Popüler
                  </TabsTrigger>
                  <TabsTrigger
                    value="popular"
                    className="px-6 py-2 rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    En Popüler
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="w-full px-4">
                <TabsContent value="all" className="m-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {hotBundles.map((bundle) => (
                      <Card
                        key={bundle.id}
                        className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 overflow-hidden group hover:border-blue-500/50 transition-colors"
                      >
                        <div className="relative aspect-[3/2]">
                          <Image
                            src={bundle.image}
                            alt={bundle.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                          <div className="absolute top-4 left-4 flex gap-2">
                            <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/50">
                              {bundle.courses} Kurs
                            </Badge>
                            <Badge className="bg-green-500/20 text-green-400 border border-green-500/50">
                              {bundle.students.toLocaleString()} Öğrenci
                            </Badge>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                              {bundle.title}
                            </h3>
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Star className="w-5 h-5 fill-current" />
                              <span className="font-semibold">
                                {bundle.rating}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-400 mb-6">
                            {bundle.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-white">
                              {bundle.price}₺
                            </span>
                            <span className="text-lg text-gray-500 line-through">
                              {bundle.originalPrice}₺
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="top" className="m-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {hotBundles
                      .sort((a, b) => b.rating - a.rating)
                      .map((bundle) => (
                        <Card
                          key={bundle.id}
                          className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 overflow-hidden group hover:border-blue-500/50 transition-colors"
                        >
                          <div className="relative aspect-[3/2]">
                            <Image
                              src={bundle.image}
                              alt={bundle.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                            <div className="absolute top-4 left-4 flex gap-2">
                              <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/50">
                                {bundle.courses} Kurs
                              </Badge>
                              <Badge className="bg-green-500/20 text-green-400 border border-green-500/50">
                                {bundle.students.toLocaleString()} Öğrenci
                              </Badge>
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                {bundle.title}
                              </h3>
                              <div className="flex items-center gap-1 text-yellow-400">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="font-semibold">
                                  {bundle.rating}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-400 mb-6">
                              {bundle.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-3xl font-bold text-white">
                                {bundle.price}₺
                              </span>
                              <span className="text-lg text-gray-500 line-through">
                                {bundle.originalPrice}₺
                              </span>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="hot" className="m-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {hotBundles
                      .slice()
                      .reverse()
                      .map((bundle) => (
                        <Card
                          key={bundle.id}
                          className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 overflow-hidden group hover:border-blue-500/50 transition-colors"
                        >
                          <div className="relative aspect-[3/2]">
                            <Image
                              src={bundle.image}
                              alt={bundle.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                            <div className="absolute top-4 left-4 flex gap-2">
                              <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/50">
                                {bundle.courses} Kurs
                              </Badge>
                              <Badge className="bg-green-500/20 text-green-400 border border-green-500/50">
                                {bundle.students.toLocaleString()} Öğrenci
                              </Badge>
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                {bundle.title}
                              </h3>
                              <div className="flex items-center gap-1 text-yellow-400">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="font-semibold">
                                  {bundle.rating}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-400 mb-6">
                              {bundle.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-3xl font-bold text-white">
                                {bundle.price}₺
                              </span>
                              <span className="text-lg text-gray-500 line-through">
                                {bundle.originalPrice}₺
                              </span>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="popular" className="m-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {hotBundles
                      .sort((a, b) => b.students - a.students)
                      .map((bundle) => (
                        <Card
                          key={bundle.id}
                          className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 overflow-hidden group hover:border-blue-500/50 transition-colors"
                        >
                          <div className="relative aspect-[3/2]">
                            <Image
                              src={bundle.image}
                              alt={bundle.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                            <div className="absolute top-4 left-4 flex gap-2">
                              <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/50">
                                {bundle.courses} Kurs
                              </Badge>
                              <Badge className="bg-green-500/20 text-green-400 border border-green-500/50">
                                {bundle.students.toLocaleString()} Öğrenci
                              </Badge>
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                {bundle.title}
                              </h3>
                              <div className="flex items-center gap-1 text-yellow-400">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="font-semibold">
                                  {bundle.rating}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-400 mb-6">
                              {bundle.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-3xl font-bold text-white">
                                {bundle.price}₺
                              </span>
                              <span className="text-lg text-gray-500 line-through">
                                {bundle.originalPrice}₺
                              </span>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Filters Sidebar */}
          <div className="col-span-3">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4">
              <div className="space-y-6">
                {Object.entries(filters).map(([key, section]) => (
                  <div
                    key={key}
                    className="border-b border-gray-700/50 pb-4 last:border-0 last:pb-0"
                  >
                    <button
                      className="flex items-center justify-between w-full text-left mb-2"
                      onClick={() => toggleFilterSection(key)}
                    >
                      <div className="flex items-center gap-2">
                        {section.icon && (
                          <section.icon className="w-5 h-5 text-gray-400" />
                        )}
                        <h3 className="text-lg font-semibold text-white">
                          {section.title}
                        </h3>
                      </div>
                      {section.isOpen ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    {section.isOpen && (
                      <div className="space-y-2">
                        {section.options.map((option) => (
                          <label
                            key={option.id}
                            className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white cursor-pointer"
                          >
                            <Checkbox
                              checked={option.checked}
                              onCheckedChange={() =>
                                toggleFilterOption(key, option.id)
                              }
                              className="border-gray-600"
                            />
                            <div className="flex items-center gap-2">
                              {option.icon && (
                                <option.icon className="w-4 h-4 text-gray-400" />
                              )}
                              {option.imageSrc && (
                                <div className="relative w-4 h-4">
                                  <Image
                                    src={option.imageSrc}
                                    alt={option.label}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              )}
                              <span>{option.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Price Range */}
                <div className="border-b border-gray-700/50 pb-4 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Fiyat
                  </h3>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={100}
                      step={1}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{priceRange[0]}₺</span>
                      <span>{priceRange[1]}₺</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Kurs ara..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-500"
                />
              </div>
            </div>

            {/* Course Grid */}
            {loading ? (
              <div className="text-center text-gray-400">Yükleniyor...</div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center text-gray-400">
                Arama kriterlerinize uygun kurs bulunamadı
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {currentCourses.map((course) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5 }}
                      className="relative group cursor-pointer"
                      onClick={() => handleCourseClick(course.id)}
                    >
                      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 overflow-hidden group hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full">
                        <div className="relative aspect-video overflow-hidden">
                          <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-110">
                            <Image
                              src={course.thumbnail}
                              alt={course.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                          {/* Difficulty Badge */}
                          <Badge
                            className={`absolute top-4 right-4 flex items-center gap-1.5 backdrop-blur-sm border-0 text-white text-xs ${
                              difficultyColors[course.difficulty]
                            }`}
                          >
                            {React.createElement(
                              difficultyIcons[course.difficulty],
                              {
                                className: "w-3.5 h-3.5",
                              }
                            )}
                            {course.difficulty === "Beginner"
                              ? "Başlangıç"
                              : course.difficulty === "Intermediate"
                              ? "Orta"
                              : "İleri"}
                          </Badge>
                          <Button
                            className="absolute bottom-4 left-4 bg-blue-500 hover:bg-blue-600 transition-all duration-300 hover:scale-105"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCourseClick(course.id);
                            }}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Şimdi Başla
                          </Button>
                        </div>
                        <div className="flex flex-col flex-grow p-6">
                          <div className="flex items-start gap-3 mb-4">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                            >
                              <Image
                                src={course.tutor.avatar}
                                alt={course.tutor.name}
                                fill
                                className="object-cover"
                              />
                            </motion.div>
                            <div>
                              <h4 className="text-sm font-medium text-white">
                                {course.tutor.name}
                              </h4>
                              <p className="text-xs text-gray-400">
                                {course.tutor.expertise}
                              </p>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 flex-grow group-hover:text-blue-400 transition-colors duration-300">
                            {course.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {course.description}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-400 mt-auto">
                            <div className="flex items-center gap-4">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="flex items-center gap-1"
                              >
                                <Clock className="w-4 h-4" />
                                <span>{course.duration}</span>
                              </motion.div>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="flex items-center gap-1"
                              >
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span>{course.rating.toFixed(1)}</span>
                              </motion.div>
                            </div>
                            {course.students && (
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="flex items-center gap-1"
                              >
                                <Users className="w-4 h-4" />
                                <span>{course.students.toLocaleString()}</span>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="bg-gray-800/50 border-gray-700/50 text-white hover:bg-gray-700/50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="icon"
                          onClick={() => handlePageChange(page)}
                          className={
                            currentPage === page
                              ? "bg-blue-500 hover:bg-blue-600"
                              : "bg-gray-800/50 border-gray-700/50 text-white hover:bg-gray-700/50"
                          }
                        >
                          {page}
                        </Button>
                      )
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="bg-gray-800/50 border-gray-700/50 text-white hover:bg-gray-700/50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
