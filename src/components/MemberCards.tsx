"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { GradientOrb } from "./ui/gradient-orb";

type Rarity = "common" | "rare" | "epic" | "legendary";
type RowId = 1 | 2 | 3 | 4 | 5;

type Member = {
  id: number;
  name: string;
  role: string;
  image: string;
  rarity: Rarity;
  rowId: RowId;
  stats: {
    projects: number;
    awards: number;
    experience: number;
  };
};

const members: Member[] = [
  // Row 1 - Game Studios
  {
    id: 1,
    name: "Peak Games",
    role: "Game Studio",
    image: "/akura.png",
    rarity: "legendary",
    rowId: 1,
    stats: { projects: 15, awards: 23, experience: 10 },
  },
  {
    id: 2,
    name: "Dream Games",
    role: "Game Studio",
    image: "/crown.png",
    rarity: "legendary",
    rowId: 1,
    stats: { projects: 8, awards: 12, experience: 5 },
  },
  {
    id: 3,
    name: "Indie Forge",
    role: "Indie Game Studio",
    image: "/deathpizza.png",
    rarity: "epic",
    rowId: 1,
    stats: { projects: 12, awards: 5, experience: 7 },
  },

  // Row 2 - Developers
  {
    id: 4,
    name: "Ahmet Yılmaz",
    role: "Game Developer",
    image: "/akura.png",
    rarity: "rare",
    rowId: 2,
    stats: { projects: 6, awards: 3, experience: 8 },
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "AI Engineer",
    image: "/crown.png",
    rarity: "epic",
    rowId: 2,
    stats: { projects: 10, awards: 7, experience: 6 },
  },
  {
    id: 6,
    name: "James Carter",
    role: "Full Stack Developer",
    image: "/deathpizza.png",
    rarity: "legendary",
    rowId: 2,
    stats: { projects: 18, awards: 4, experience: 12 },
  },

  // Row 3 - Investors
  {
    id: 7,
    name: "Tech Ventures",
    role: "Investor",
    image: "/akura.png",
    rarity: "rare",
    rowId: 3,
    stats: { projects: 20, awards: 0, experience: 15 },
  },
  {
    id: 8,
    name: "Angel Fund",
    role: "Investor",
    image: "/crown.png",
    rarity: "epic",
    rowId: 3,
    stats: { projects: 35, awards: 1, experience: 20 },
  },

  // Row 4 - Designers
  {
    id: 9,
    name: "Sophie Martinez",
    role: "UI/UX Designer",
    image: "/deathpizza.png",
    rarity: "rare",
    rowId: 4,
    stats: { projects: 25, awards: 6, experience: 10 },
  },
  {
    id: 10,
    name: "Pixel Wizards",
    role: "Art Studio",
    image: "/akura.png",
    rarity: "epic",
    rowId: 4,
    stats: { projects: 30, awards: 12, experience: 15 },
  },

  // Row 5 - Cybersecurity & AI
  {
    id: 11,
    name: "CyberShield",
    role: "Cybersecurity",
    image: "/crown.png",
    rarity: "legendary",
    rowId: 5,
    stats: { projects: 50, awards: 9, experience: 20 },
  },
  {
    id: 12,
    name: "AI Pioneers",
    role: "Artificial Intelligence",
    image: "/deathpizza.png",
    rarity: "legendary",
    rowId: 5,
    stats: { projects: 15, awards: 18, experience: 12 },
  },
];

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
  const cardWidth = 280;
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

const rarityColors: Record<
  Rarity,
  {
    base: string;
    glow: string;
    highlight: string;
  }
> = {
  legendary: {
    base: "bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-yellow-500/50",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]",
    highlight: "group-hover:from-yellow-500/30 group-hover:to-amber-500/30",
  },
  epic: {
    base: "bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/50",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(217,70,239,0.3)]",
    highlight: "group-hover:from-fuchsia-500/30 group-hover:to-pink-500/30",
  },
  rare: {
    base: "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]",
    highlight: "group-hover:from-purple-500/30 group-hover:to-pink-500/30",
  },
  common: {
    base: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/50",
    glow: "group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
    highlight: "group-hover:from-blue-500/30 group-hover:to-cyan-500/30",
  },
};

const Card = ({ member }: { member: Member }) => {
  const colors = rarityColors[member.rarity] || rarityColors.common;

  return (
    <Link
      href={`/profile/${member.id}`}
      className="block w-[280px] h-[400px] flex-shrink-0 group"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`
          relative h-full rounded-xl 
          ${colors.base} ${colors.glow} ${colors.highlight}
          border backdrop-blur-sm
          transition-all duration-300
          hover:border-opacity-75
        `}
      >
        {/* Glow Overlay */}
        <div
          className={`
          absolute inset-0 rounded-xl
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          bg-gradient-to-t from-transparent via-white/5 to-transparent
        `}
        />

        <div
          className="absolute top-4 z-99 right-4 px-3 py-1 rounded-full text-xs font-semibold 
          bg-black/50 backdrop-blur-sm border border-gray-700
          group-hover:bg-black/70 group-hover:border-gray-600
          transition-all duration-300"
        >
          {member.rarity.toUpperCase()}
        </div>

        <div className="p-6 flex flex-col h-full relative z-10">
          {/* Image Container */}
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white/90 transition-colors">
            {member.name}
          </h3>
          <p className="text-sm text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
            {member.role}
          </p>

          {/* Stats */}
          <div className="mt-auto space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Projects
              </span>
              <span className="text-white font-semibold group-hover:text-white/90 transition-colors">
                {member.stats.projects}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Awards
              </span>
              <span className="text-white font-semibold group-hover:text-white/90 transition-colors">
                {member.stats.awards}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Experience
              </span>
              <span className="text-white font-semibold group-hover:text-white/90 transition-colors">
                {member.stats.experience}y
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const MemberCards = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
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
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden"></div>

      <div className="py-24 relative">
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Üyelerimiz</h2>
            <p className="text-gray-400">
              Ekosistemimizin değerli üyeleriyle tanışın
            </p>
          </div>

          <div className="space-y-12">
            <ScrollingRow rowId={1} direction="left" speed={30} />
            <ScrollingRow rowId={2} direction="right" speed={25} />
            <ScrollingRow rowId={3} direction="left" speed={35} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberCards;
