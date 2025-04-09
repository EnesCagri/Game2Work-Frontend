"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { db } from "@/lib/db";

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
}

const difficultyColors = {
  Beginner: "bg-green-500/10 text-green-500",
  Intermediate: "bg-yellow-500/10 text-yellow-500",
  Advanced: "bg-red-500/10 text-red-500",
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

export default function Education() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

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

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesField =
      selectedField === "all" || course.field === selectedField;
    const matchesDifficulty =
      selectedDifficulty === "all" || course.difficulty === selectedDifficulty;
    return matchesSearch && matchesField && matchesDifficulty;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-black" />
      <GradientOrb
        color="#3b82f6"
        position="top-right"
        size="sm"
        opacity={0.08}
      />
      <GradientOrb
        color="#06b6d4"
        position="bottom-left"
        size="sm"
        opacity={0.08}
      />

      <div className="container relative z-10 mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Education</h1>
          <p className="text-gray-400">
            Learn from industry experts and enhance your skills
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="pl-10"
            />
          </div>
          <div className="flex gap-4">
            <Select
              value={selectedField}
              onValueChange={(value) => {
                setSelectedField(value);
                setCurrentPage(1); // Reset to first page when changing field
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fields</SelectItem>
                {fields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedDifficulty}
              onValueChange={(value) => {
                setSelectedDifficulty(value);
                setCurrentPage(1); // Reset to first page when changing difficulty
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center text-gray-400">
            No courses found matching your criteria
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentCourses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-video">
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge
                        className={`absolute top-2 right-2 ${
                          difficultyColors[course.difficulty]
                        }`}
                      >
                        {course.difficulty}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={course.tutor.avatar}
                            alt={course.tutor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">
                            {course.tutor.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {course.tutor.expertise}
                          </p>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{course.duration}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{course.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
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
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
