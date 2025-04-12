"use client";

//import { useEffect, useState } from "react";
import { motion } from "framer-motion";
//import { Button } from "@/components/ui/button";
//import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Rocket,
  BarChart3,
  Wallet,
  Globe2,
  Users,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
// import { RocketIcon, UsersIcon, GraduationCapIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { GradientOrb } from "./ui/gradient-orb";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const features = [
  {
    icon: Clock,
    title: "Geliştirme Günlüğü",
    description:
      "Projeleriniz için ilerleme kaydedin ve topluluğunuzla paylaşın.",
    color: "text-pink-500",
    hoverColor: "group-hover:text-pink-400",
    bgColor: "bg-pink-500/10",
    hoverBgColor: "group-hover:bg-pink-500/20",
  },
  {
    icon: Rocket,
    title: "Geliştirici Profilleri",
    description: "Kendi portföyünüzü oluşturun ve projelerinizi sergileyin.",
    color: "text-blue-500",
    hoverColor: "group-hover:text-blue-400",
    bgColor: "bg-blue-500/10",
    hoverBgColor: "group-hover:bg-blue-500/20",
  },
  {
    icon: BarChart3,
    title: "Proje Değerlendirme",
    description:
      "Oyunlarınızı topluluk ve yatırımcılar tarafından değerlendirin.",
    color: "text-purple-500",
    hoverColor: "group-hover:text-purple-400",
    bgColor: "bg-purple-500/10",
    hoverBgColor: "group-hover:bg-purple-500/20",
  },
  {
    icon: Wallet,
    title: "Finansman & Destek",
    description: "Bağış ve yatırım alma fırsatlarıyla projelerinizi büyütün.",
    color: "text-green-500",
    hoverColor: "group-hover:text-green-400",
    bgColor: "bg-green-500/10",
    hoverBgColor: "group-hover:bg-green-500/20",
  },
  {
    icon: Globe2,
    title: "Küresel Görünürlük",
    description:
      "Oyunlarınızı yayıncılar, yatırımcılar ve oyuncularla buluşturun.",
    color: "text-red-500",
    hoverColor: "group-hover:text-red-400",
    bgColor: "bg-red-500/10",
    hoverBgColor: "group-hover:bg-red-500/20",
  },
  {
    icon: Users,
    title: "Topluluk ve Geri Bildirim",
    description: "Diğer geliştiricilerden ve mentorlerden geri bildirim alın.",
    color: "text-yellow-500",
    hoverColor: "group-hover:text-yellow-400",
    bgColor: "bg-yellow-500/10",
    hoverBgColor: "group-hover:bg-yellow-500/20",
  },
  {
    icon: Lightbulb,
    title: "Eğitim ve Kaynaklar",
    description:
      "Oyun geliştirme ile ilgili rehberler ve eğitim içeriklerine erişin.",
    color: "text-cyan-500",
    hoverColor: "group-hover:text-cyan-400",
    bgColor: "bg-cyan-500/10",
    hoverBgColor: "group-hover:bg-cyan-500/20",
  },
  {
    icon: TrendingUp,
    title: "Performans Analitikleri",
    description: "Oyun projelerinizin performansını analiz edin ve geliştirin.",
    color: "text-orange-500",
    hoverColor: "group-hover:text-orange-400",
    bgColor: "bg-orange-500/10",
    hoverBgColor: "group-hover:bg-orange-500/20",
  },
];

const FeatureCard = ({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) => {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
    >
      <motion.div
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
      >
        <Card className="group p-6 bg-gray-900/50 border-gray-800 hover:bg-gray-900/80 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--feature-glow)] relative overflow-hidden">
          {/* Glow effect on hover */}
          <div
            className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
            style={{
              background: `radial-gradient(circle at center, var(--feature-color), transparent 70%)`,
              ["--feature-color" as any]: feature.color.includes("pink")
                ? "#ec4899"
                : feature.color.includes("blue")
                ? "#3b82f6"
                : feature.color.includes("purple")
                ? "#8b5cf6"
                : feature.color.includes("green")
                ? "#22c55e"
                : feature.color.includes("red")
                ? "#ef4444"
                : feature.color.includes("yellow")
                ? "#eab308"
                : feature.color.includes("cyan")
                ? "#06b6d4"
                : "#f97316",
              ["--feature-glow" as any]: `${
                feature.color.includes("pink")
                  ? "#ec489922"
                  : feature.color.includes("blue")
                  ? "#3b82f622"
                  : feature.color.includes("purple")
                  ? "#8b5cf622"
                  : feature.color.includes("green")
                  ? "#22c55e22"
                  : feature.color.includes("red")
                  ? "#ef444422"
                  : feature.color.includes("yellow")
                  ? "#eab30822"
                  : feature.color.includes("cyan")
                  ? "#06b6d422"
                  : "#f9731622"
              }`,
            }}
          />

          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={`w-12 h-12 ${feature.bgColor} ${feature.hoverBgColor} rounded-lg flex items-center justify-center mb-4 transition-colors duration-300`}
          >
            <Icon
              className={`w-6 h-6 ${feature.color} ${feature.hoverColor} transition-colors duration-300`}
            />
          </motion.div>

          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-white/90 transition-colors">
            {feature.title}
          </h3>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
            {feature.description}
          </p>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const FeaturesGrid = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-black" />

      <GradientOrb
        color="#ef4442"
        position="top-right"
        size="lg"
        opacity={0.01}
      />
      <GradientOrb
        color="#ef4442"
        position="bottom-left"
        size="lg"
        opacity={0.01}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden"></div>

      <div className="py-24 relative">
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-700 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Özellikler
            </h2>
            <p className="text-gray-400">
              Game2Work ile oyun geliştirme sürecinizi kolaylaştırın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
