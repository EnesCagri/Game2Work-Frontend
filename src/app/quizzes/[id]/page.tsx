"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { quizzes, sampleQuestions } from "@/data/quizzes";
import { Quiz, QuizQuestion } from "@/types/quiz";
import { FiClock, FiHelpCircle } from "react-icons/fi";

interface Props {
  params: {
    id: string;
  };
}

export default function QuizPage({ params }: Props) {
  const quiz = quizzes.find((q) => q.id === params.id);
  const questions = sampleQuestions[params.id] || [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    quiz?.timeLimit ? quiz.timeLimit * 60 : 0
  );
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  useEffect(() => {
    if (!isQuizComplete && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsQuizComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, isQuizComplete]);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl">Quiz bulunamadı</h1>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / questions.length) * 100;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null || isQuizComplete) return;
    setSelectedAnswer(answerIndex);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsQuizComplete(true);
    }
  };

  const calculateRewards = () => {
    const percentage = (score / questions.length) * 100;
    const rewards = [];

    if (percentage >= 70) {
      rewards.push(quiz.rewards.certificate);
    }
    if (percentage >= 80) {
      rewards.push(quiz.rewards.badge);
    }
    rewards.push(`${quiz.rewards.points} puan`);

    return rewards.filter(Boolean);
  };

  if (isQuizComplete) {
    const rewards = calculateRewards();
    const percentage = (score / questions.length) * 100;

    return (
      <div className="min-h-screen bg-black text-white p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-gray-900/50 border-gray-800 p-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text">
              Quiz Tamamlandı!
            </h2>

            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">
                  %{percentage.toFixed(0)}
                </div>
                <p className="text-gray-400">Başarı Oranı</p>
              </div>

              <div className="space-y-2">
                <p className="text-gray-400">
                  Doğru Cevaplar: {score}/{questions.length}
                </p>
                <p className="text-gray-400">
                  Süre: {formatTime(quiz.timeLimit * 60 - timeLeft)}
                </p>
              </div>

              {rewards.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Kazanılan Ödüller:</h3>
                  <div className="flex flex-wrap gap-2">
                    {rewards.map((reward, index) => (
                      <Badge
                        key={index}
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600"
                      >
                        {reward}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Button
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                onClick={() => (window.location.href = "/quizzes")}
              >
                Quizlere Dön
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
          <div className="flex items-center justify-between text-gray-400">
            <div className="flex items-center gap-2">
              <FiClock />
              <span>Kalan Süre: {formatTime(timeLeft)}</span>
            </div>
            <div>
              Soru {currentQuestionIndex + 1}/{questions.length}
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="bg-gray-900/50 border-gray-800 p-6">
            <h2 className="text-xl mb-6">{currentQuestion.question}</h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  className={`w-full justify-start text-left p-4 h-auto ${
                    selectedAnswer === null
                      ? "hover:bg-gray-800"
                      : selectedAnswer === index
                      ? index === currentQuestion.correctAnswer
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-500"
                      : index === currentQuestion.correctAnswer
                      ? "bg-green-500/20 text-green-500"
                      : "bg-gray-800"
                  }`}
                  variant="outline"
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </Button>
              ))}
            </div>

            {selectedAnswer !== null && currentQuestion.explanation && (
              <div className="mt-6">
                <Button
                  variant="ghost"
                  className="text-blue-400 hover:text-blue-300"
                  onClick={() => setShowExplanation(!showExplanation)}
                >
                  <FiHelpCircle className="mr-2" />
                  Açıklama
                </Button>
                {showExplanation && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 p-4 bg-blue-500/10 text-blue-400 rounded-md"
                  >
                    {currentQuestion.explanation}
                  </motion.p>
                )}
              </div>
            )}

            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6"
              >
                <Button
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex < questions.length - 1
                    ? "Sonraki Soru"
                    : "Quizi Bitir"}
                </Button>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
