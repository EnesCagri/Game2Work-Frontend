"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiAward, FiClock, FiStar, FiBookOpen, FiFilter } from "react-icons/fi";
import { SiCodeforces } from "react-icons/si";
import { GiTrophy } from "react-icons/gi";
import { Quiz, QuizDifficulty, QuizCategory } from "@/types/quiz";
import { quizzes } from "@/data/quizzes";

const difficultyColors: Record<QuizDifficulty, string> = {
  Başlangıç: "bg-green-500/10 text-green-500",
  Orta: "bg-yellow-500/10 text-yellow-500",
  İleri: "bg-red-500/10 text-red-500",
};

const categoryColors: Record<QuizCategory, string> = {
  Programlama: "bg-blue-500/10 text-blue-500",
  Algoritma: "bg-purple-500/10 text-purple-500",
  Web: "bg-pink-500/10 text-pink-500",
};

export default function QuizzesPage() {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<QuizDifficulty | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(
    null
  );

  const filteredQuizzes = quizzes.filter((quiz) => {
    if (selectedDifficulty && quiz.difficulty !== selectedDifficulty)
      return false;
    if (selectedCategory && quiz.category !== selectedCategory) return false;
    return true;
  });

  const difficulties: QuizDifficulty[] = ["Başlangıç", "Orta", "İleri"];
  const categories: QuizCategory[] = ["Programlama", "Algoritma", "Web"];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text">
          Yazılım Quizleri
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Becerilerinizi test edin, rozetler kazanın ve sertifikalarla
          başarılarınızı belgeleyin.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-400" />
          <span className="text-gray-400">Zorluk:</span>
          {difficulties.map((difficulty) => (
            <Badge
              key={difficulty}
              className={`cursor-pointer transition-all ${
                selectedDifficulty === difficulty
                  ? difficultyColors[difficulty]
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
              onClick={() =>
                setSelectedDifficulty(
                  selectedDifficulty === difficulty ? null : difficulty
                )
              }
            >
              {difficulty}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-400" />
          <span className="text-gray-400">Kategori:</span>
          {categories.map((category) => (
            <Badge
              key={category}
              className={`cursor-pointer transition-all ${
                selectedCategory === category
                  ? categoryColors[category]
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? null : category
                )
              }
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className="h-full"
          >
            <Card className="h-full bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-900/70 transition-all overflow-hidden">
              <div className="relative h-48">
                <img
                  src={quiz.image}
                  alt={quiz.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge className={difficultyColors[quiz.difficulty]}>
                    {quiz.difficulty}
                  </Badge>
                  <Badge className={categoryColors[quiz.category]}>
                    {quiz.category}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{quiz.description}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-1">
                    <FiClock />
                    <span>{quiz.timeLimit} dakika</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiBookOpen />
                    <span>{quiz.questionCount} soru</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiStar />
                    <span>%{quiz.completionRate} tamamlama</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <SiCodeforces />
                      <span>{quiz.rewards.points} puan</span>
                    </div>
                    {quiz.rewards.badge && (
                      <div className="flex items-center gap-1 text-purple-500">
                        <FiAward />
                        <span>{quiz.rewards.badge}</span>
                      </div>
                    )}
                    {quiz.rewards.certificate && (
                      <div className="flex items-center gap-1 text-green-500">
                        <GiTrophy />
                        <span>{quiz.rewards.certificate}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    onClick={() =>
                      (window.location.href = `/quizzes/${quiz.id}`)
                    }
                  >
                    Quize Başla
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
