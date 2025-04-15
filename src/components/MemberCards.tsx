"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { GradientOrb } from "./ui/gradient-orb";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type Category = "all" | "developer" | "studio" | "investor";
type RowId = 1 | 2 | 3;

type Member = {
  id: number;
  name: string;
  role: string;
  category: Category;
  image: string;
  isVerified: boolean;
  rowId: RowId;
  stats: {
    projects?: number;
    experience?: number;
    communityScore?: number;
    developedGames?: number;
    employeeCount?: number;
    investmentCount?: number;
    totalInvestment?: number;
    interests?: string[];
  };
};

const members: Member[] = [
  // Row 1 - Developers
  {
    id: 1,
    name: "Ahmet Yılmaz",
    role: "Game Developer",
    category: "developer",
    image: "/akura.png",
    isVerified: true,
    rowId: 1,
    stats: {
      projects: 6,
      experience: 4,
      communityScore: 8.7,
    },
  },
  {
    id: 2,
    name: "Lisa Thompson",
    role: "Unity Developer",
    category: "developer",
    image: "/crown.png",
    isVerified: true,
    rowId: 1,
    stats: {
      projects: 8,
      experience: 5,
      communityScore: 9.1,
    },
  },
  {
    id: 3,
    name: "James Carter",
    role: "Full Stack Developer",
    category: "developer",
    image: "/deathpizza.png",
    isVerified: true,
    rowId: 1,
    stats: {
      projects: 12,
      experience: 7,
      communityScore: 9.3,
    },
  },

  // Row 2 - Studios
  {
    id: 4,
    name: "Dream Games",
    role: "Game Studio",
    category: "studio",
    image: "/deathpizza.png",
    isVerified: true,
    rowId: 2,
    stats: {
      developedGames: 12,
      employeeCount: 8,
      communityScore: 9.2,
    },
  },
  {
    id: 5,
    name: "Indie Forge",
    role: "Indie Game Studio",
    category: "studio",
    image: "/akura.png",
    isVerified: true,
    rowId: 2,
    stats: {
      developedGames: 8,
      employeeCount: 5,
      communityScore: 8.9,
    },
  },
  {
    id: 6,
    name: "Pixel Wizards",
    role: "Art Studio",
    category: "studio",
    image: "/crown.png",
    isVerified: true,
    rowId: 2,
    stats: {
      developedGames: 15,
      employeeCount: 12,
      communityScore: 9.4,
    },
  },

  // Row 3 - Investors
  {
    id: 7,
    name: "Tech Ventures",
    role: "Game Investor",
    category: "investor",
    image: "/crown.png",
    isVerified: true,
    rowId: 3,
    stats: {
      investmentCount: 5,
      totalInvestment: 250000,
      interests: ["Mobil", "Hypercasual"],
    },
  },
  {
    id: 8,
    name: "Angel Fund",
    role: "Investment Fund",
    category: "investor",
    image: "/deathpizza.png",
    isVerified: true,
    rowId: 3,
    stats: {
      investmentCount: 8,
      totalInvestment: 500000,
      interests: ["PC", "Console", "Mobile"],
    },
  },
  {
    id: 9,
    name: "Game Capital",
    role: "Venture Capital",
    category: "investor",
    image: "/akura.png",
    isVerified: true,
    rowId: 3,
    stats: {
      investmentCount: 12,
      totalInvestment: 1000000,
      interests: ["Mobile", "PC", "Console"],
    },
  },
];

const categoryColors: Record<
  Category,
  { bg: string; border: string; text: string }
> = {
  all: { bg: "bg-gray-800", border: "border-gray-700", text: "text-gray-300" },
  developer: {
    bg: "bg-blue-900/20",
    border: "border-blue-500/50",
    text: "text-blue-400",
  },
  studio: {
    bg: "bg-orange-900/20",
    border: "border-orange-500/50",
    text: "text-orange-400",
  },
  investor: {
    bg: "bg-purple-900/20",
    border: "border-purple-500/50",
    text: "text-purple-400",
  },
};

const ScrollingRow = ({
  direction = "left",
  speed = 25,
  rowId,
}: {
  direction?: "left" | "right";
  speed?: number;
  rowId: RowId;
}) => {
  const rowMembers = members.filter((member) => member.rowId === rowId);
  const cardWidth = 320;
  const cardGap = 16;
  const totalCardWidth = cardWidth + cardGap;

  return (
    <div className="relative flex overflow-hidden py-4">
      <motion.div
        animate={{
          x:
            direction === "left"
              ? [0, -totalCardWidth * rowMembers.length]
              : [-totalCardWidth * rowMembers.length, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            duration: speed,
            ease: "linear",
            repeatDelay: 0,
            repeatType: "loop",
            times: [0, 1],
          },
        }}
        className="flex gap-4 px-2"
      >
        {/* Triple the filtered row members for smooth infinite loop */}
        {[...rowMembers, ...rowMembers, ...rowMembers].map((member, idx) => (
          <Card key={`${member.id}-${idx}`} member={member} />
        ))}
      </motion.div>
    </div>
  );
};

const Card = ({ member }: { member: Member }) => {
  const colors = categoryColors[member.category];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`
        relative w-[320px] flex-shrink-0 rounded-xl p-6
        ${colors.bg} ${colors.border}
        border backdrop-blur-sm
        transition-all duration-300
        hover:border-opacity-75
      `}
    >
      {/* Verified Badge */}
      {member.isVerified && (
        <div className="absolute top-4 right-4 z-50">
          <CheckCircle2 className="w-5 h-5 text-blue-400" />
        </div>
      )}

      {/* Image Container */}
      <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
      <p className={`text-sm ${colors.text} mb-4`}>{member.role}</p>

      {/* Stats */}
      <div className="space-y-2 mb-6">
        {member.stats.projects && (
          <div className="flex justify-between">
            <span className="text-gray-400">Projeler</span>
            <span className="text-white font-semibold">
              {member.stats.projects}
            </span>
          </div>
        )}
        {member.stats.experience && (
          <div className="flex justify-between">
            <span className="text-gray-400">Deneyim</span>
            <span className="text-white font-semibold">
              {member.stats.experience} yıl
            </span>
          </div>
        )}
        {member.stats.communityScore && (
          <div className="flex justify-between">
            <span className="text-gray-400">Topluluk Puanı</span>
            <span className="text-white font-semibold">
              {member.stats.communityScore}
            </span>
          </div>
        )}
        {member.stats.developedGames && (
          <div className="flex justify-between">
            <span className="text-gray-400">Geliştirilen Oyun</span>
            <span className="text-white font-semibold">
              {member.stats.developedGames}
            </span>
          </div>
        )}
        {member.stats.employeeCount && (
          <div className="flex justify-between">
            <span className="text-gray-400">Çalışan Sayısı</span>
            <span className="text-white font-semibold">
              {member.stats.employeeCount}
            </span>
          </div>
        )}
        {member.stats.investmentCount && (
          <div className="flex justify-between">
            <span className="text-gray-400">Yatırım Sayısı</span>
            <span className="text-white font-semibold">
              {member.stats.investmentCount} proje
            </span>
          </div>
        )}
        {member.stats.totalInvestment && (
          <div className="flex justify-between">
            <span className="text-gray-400">Toplam Yatırım</span>
            <span className="text-white font-semibold">
              ${member.stats.totalInvestment.toLocaleString()}
            </span>
          </div>
        )}
        {member.stats.interests && (
          <div className="flex flex-wrap gap-2 mt-2">
            {member.stats.interests.map((interest, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-black/20 text-gray-300"
              >
                {interest}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* CTA Button */}
      <Button variant="outline" className="w-full group" asChild>
        <Link href={`/profile/${member.id}`}>
          Profili Gör
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </motion.div>
  );
};

const MemberCards = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-950" />
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

      <div className="py-24 relative">
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-700 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
              GameToWork Ekosistemi
            </h2>
            <p className="text-gray-400">
              Ekosistemimizin değerli üyeleriyle tanışın
            </p>
          </div>

          <div className="space-y-12">
            <ScrollingRow rowId={1} direction="left" speed={30} />
            <ScrollingRow rowId={2} direction="right" speed={25} />
            <ScrollingRow rowId={3} direction="left" speed={35} />
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <p className="text-xl text-gray-300 mb-6">
              Sen de bu listede yer almak ister misin?
            </p>
            <div className="absolute inset-0 bg-red-500/50 rounded-md blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
            <Button className="relative z-10 bg-gradient-to-r from-red-400 to-red-800 hover:from-red-600 hover:to-red-900 duration-300 ease-in-out transition text-white px-8 shadow-lg shadow-red-500/20 hover:shadow-red-500/40">
              Profilini Oluştur
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberCards;
