"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GradientOrb } from "@/components/ui/gradient-orb";
import {
  Play,
  Clock,
  Users,
  Star,
  Shield,
  Swords,
  Flame,
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Lock,
  Unlock,
  RefreshCcw,
  ShieldCheck,
  Clock2,
  GraduationCap,
  Globe,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";
import { db } from "@/lib/db";

interface Review {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
  likes: number;
  helpful: boolean;
}

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  field: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  rating: number;
  price: number;
  originalPrice: number;
  lectures: number;
  language: string;
  technologies: string[];
  learningObjectives: string[];
  benefits: {
    title: string;
    description: string;
  }[];
  curriculum: {
    title: string;
    lessons: {
      title: string;
      duration: string;
      isPreview: boolean;
      isCompleted?: boolean;
      videoUrl?: string;
    }[];
  }[];
  tutor: {
    name: string;
    avatar: string;
    expertise: string;
    bio: string;
  };
  students?: number;
  reviews?: Review[];
  previewVideo?: string;
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

export default function CourseDetail() {
  const params = useParams();
  const [course, setCourse] = React.useState<Course | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [expandedSections, setExpandedSections] = React.useState<number[]>([0]);
  const [showFullDescription, setShowFullDescription] = React.useState(false);

  React.useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await db.getCourseById(Number(params.id));
        setCourse(data as Course);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.id]);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Yükleniyor...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Kurs bulunamadı</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black">
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
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-8 text-white hover:text-blue-400"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri Dön
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Preview Video */}
            {course.previewVideo && (
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${course.previewVideo}`}
                  title="Course Preview"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <div>
              <h1 className="text-4xl font-bold text-white mb-6">
                {course.title}
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                {showFullDescription
                  ? course.description
                  : `${course.description.slice(0, 200)}...`}
              </p>
              <button
                className="text-blue-400 hover:text-blue-300 transition-colors"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? "Daha Az Göster" : "Devamını Oku"}
              </button>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <GraduationCap className="w-5 h-5" />
                  <span>Dersler</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {course.lectures}
                </div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Clock2 className="w-5 h-5" />
                  <span>Süre</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {course.duration}
                </div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Star className="w-5 h-5" />
                  <span>Puan</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {course.rating.toFixed(1)}
                </div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Users className="w-5 h-5" />
                  <span>Öğrenci</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {course.students?.toLocaleString()}
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Neler Öğreneceksiniz
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.learningObjectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">{objective}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Curriculum with Video Previews */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-6">Müfredat</h2>
              {course.curriculum.map((section, sectionIndex) => (
                <Card
                  key={sectionIndex}
                  className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 overflow-hidden"
                >
                  <button
                    className="w-full p-4 flex items-center justify-between text-white hover:bg-gray-700/50 transition-colors"
                    onClick={() => toggleSection(sectionIndex)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{section.title}</span>
                      <Badge className="bg-gray-700/50 text-xs">
                        {section.lessons.length} Ders
                      </Badge>
                    </div>
                    {expandedSections.includes(sectionIndex) ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  {expandedSections.includes(sectionIndex) && (
                    <div className="border-t border-gray-700/50">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex}>
                          <div className="flex items-center justify-between p-4 hover:bg-gray-700/30 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                              {lesson.isPreview ? (
                                <Play className="w-5 h-5 text-blue-400" />
                              ) : (
                                <Lock className="w-5 h-5 text-gray-500" />
                              )}
                              <span className="text-gray-300">
                                {lesson.title}
                              </span>
                              {lesson.isCompleted && (
                                <Check className="w-5 h-5 text-green-500" />
                              )}
                            </div>
                            <span className="text-gray-500">
                              {lesson.duration}
                            </span>
                          </div>
                          {lesson.isPreview &&
                            lesson.videoUrl &&
                            expandedSections.includes(sectionIndex) && (
                              <div className="px-4 pb-4">
                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                  <iframe
                                    src={`https://www.youtube.com/embed/${lesson.videoUrl}`}
                                    title={lesson.title}
                                    className="absolute inset-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </div>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Reviews Section */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Öğrenci Yorumları
                </h2>
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <span className="text-2xl font-bold text-white">
                    {course.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-400">
                    ({course.reviews?.length || 0} yorum)
                  </span>
                </div>
              </div>
              <div className="space-y-6">
                {course.reviews?.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-700/50 last:border-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-start gap-4">
                      <Image
                        src={review.user.avatar}
                        alt={review.user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-white">
                            {review.user.name}
                          </h3>
                          <span className="text-sm text-gray-400">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-300 mb-4">{review.comment}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{review.likes}</span>
                          </button>
                          {review.helpful && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                              Yararlı Yorum
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Related Courses */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">İlgili Kurslar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {course.curriculum.slice(0, 4).map((relatedCourse, index) => (
                  <Card
                    key={index}
                    className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 overflow-hidden group hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={course.thumbnail}
                        alt={relatedCourse.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                          {relatedCourse.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Play className="w-4 h-4" />
                            <span>{relatedCourse.lessons.length} Ders</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock2 className="w-4 h-4" />
                            <span>
                              {relatedCourse.lessons.reduce(
                                (acc, lesson) =>
                                  acc + parseInt(lesson.duration.split(":")[0]),
                                0
                              )}{" "}
                              saat
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 p-6 sticky top-8">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">
                    {course.price}₺
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {course.originalPrice}₺
                  </span>
                </div>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                  {Math.round(
                    ((course.originalPrice - course.price) /
                      course.originalPrice) *
                      100
                  )}
                  % indirim
                </Badge>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  {course.technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      className="bg-gray-700/50 text-white border-0"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>Seviye: {course.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{course.language}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-blue-500 hover:bg-blue-600 mb-6">
                Şimdi Başla
              </Button>

              <div className="space-y-6">
                {course.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    {index === 0 && (
                      <RefreshCcw className="w-6 h-6 text-blue-400" />
                    )}
                    {index === 1 && (
                      <ShieldCheck className="w-6 h-6 text-green-400" />
                    )}
                    {index === 2 && (
                      <Users className="w-6 h-6 text-purple-400" />
                    )}
                    <div>
                      <h3 className="font-semibold text-white mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Instructor */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 p-6 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Eğitmen</h2>
          <div className="flex items-start gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={course.tutor.avatar}
                alt={course.tutor.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {course.tutor.name}
              </h3>
              <p className="text-gray-400 mb-4">{course.tutor.expertise}</p>
              <p className="text-gray-300">{course.tutor.bio}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
