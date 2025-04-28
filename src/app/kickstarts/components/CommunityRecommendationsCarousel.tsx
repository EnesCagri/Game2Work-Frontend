"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ThumbsUp, Clock4 } from "lucide-react";
import { Game } from "../types";

interface CommunityRecommendationsCarouselProps {
  projects: Game[];
}

interface Recommendation {
  id: number;
  gameId: string;
  gameTitle: string;
  gameImage: string;
  review: string;
  rating: string;
  reviewer: {
    name: string;
    avatar: string;
    playTime: string;
    reviewDate: string;
    helpfulCount: number;
  };
}

export const CommunityRecommendationsCarousel = ({
  projects,
}: CommunityRecommendationsCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock recommendations data - replace with real data later
  const recommendations: Recommendation[] = [
    {
      id: 1,
      gameId: projects[0].id,
      gameTitle: projects[0].title,
      gameImage: projects[0].image,
      review:
        "Bu oyun gerçekten bir başyapıt. Grafikleri, oynanışı ve hikayesi ile tam bir şaheser. Kickstarter'da desteklediğim en iyi projelerden biri.",
      rating: "Çok Olumlu",
      reviewer: {
        name: "Emir Skywalker",
        avatar: "/avatars/user1.jpg",
        playTime: "30.3 saat",
        reviewDate: "2 gün önce",
        helpfulCount: 156,
      },
    },
    {
      id: 2,
      gameId: projects[1].id,
      gameTitle: projects[1].title,
      gameImage: projects[1].image,
      review:
        "Uzun zamandır beklediğim bir oyundu ve beklentilerimi fazlasıyla karşıladı. Özellikle çok oyunculu modu çok başarılı.",
      rating: "Olumlu",
      reviewer: {
        name: "Ahmet Yıldız",
        avatar: "/avatars/user2.jpg",
        playTime: "45.7 saat",
        reviewDate: "5 gün önce",
        helpfulCount: 89,
      },
    },
    {
      id: 3,
      gameId: projects[2].id,
      gameTitle: projects[2].title,
      gameImage: projects[2].image,
      review:
        "Kickstarter'da gördüğüm en iyi indie oyun projelerinden. Yaratıcı mekanikleri ve özgün sanat tarzıyla dikkat çekiyor.",
      rating: "Çok Olumlu",
      reviewer: {
        name: "Zeynep Kaya",
        avatar: "/avatars/user3.jpg",
        playTime: "25.1 saat",
        reviewDate: "1 hafta önce",
        helpfulCount: 234,
      },
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % recommendations.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + recommendations.length) % recommendations.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentRecommendation = recommendations[currentSlide];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-white">
            TOPLULUK TAVSİYELERİ
          </h2>
          <span className="text-sm text-gray-400">GÜNÜN OYUNLARI</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-gray-800 hover:bg-gray-800/50"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-gray-800 hover:bg-gray-800/50"
            onClick={nextSlide}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="bg-[#1b2838] rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Game Image */}
          <div className="relative w-full md:w-[40%] aspect-[16/9]">
            <Image
              src={currentRecommendation.gameImage}
              alt={currentRecommendation.gameTitle}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b2838] via-transparent to-transparent" />
          </div>

          {/* Right side - Review Content */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {currentRecommendation.gameTitle}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-[#67c1f5] text-white text-sm rounded">
                    {currentRecommendation.rating}
                  </span>
                </div>
              </div>
            </div>

            <blockquote className="text-gray-300 text-lg mb-6">
              "{currentRecommendation.review}"
            </blockquote>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">
                  {currentRecommendation.reviewer.helpfulCount} kişi yararlı
                  buldu
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock4 className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">
                  {currentRecommendation.reviewer.playTime}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-lg">
                {currentRecommendation.reviewer.name[0]}
              </div>
              <div>
                <div className="text-white font-medium">
                  {currentRecommendation.reviewer.name}
                </div>
                <div className="text-sm text-gray-400">
                  İnceleme tarihi: {currentRecommendation.reviewer.reviewDate}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 p-4">
          {recommendations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-blue-500" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
