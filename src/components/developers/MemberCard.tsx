import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface Member {
  id: number;
  name: string;
  role: string;
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  stats: {
    projects: number;
    awards: number;
    experience: number;
  };
}

const rarityColors = {
  common: {
    base: "bg-gray-900",
    glow: "group-hover:shadow-[0_0_15px_rgba(156,163,175,0.3)]",
    highlight: "group-hover:border-gray-600",
  },
  rare: {
    base: "bg-blue-900/50",
    glow: "group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    highlight: "group-hover:border-blue-500",
  },
  epic: {
    base: "bg-purple-900/50",
    glow: "group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    highlight: "group-hover:border-purple-500",
  },
  legendary: {
    base: "bg-yellow-900/50",
    glow: "group-hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]",
    highlight: "group-hover:border-yellow-500",
  },
};

export const MemberCard = ({ member }: { member: Member }) => {
  const colors = rarityColors[member.rarity] || rarityColors.common;

  return (
    <Link
      href={`/developers/${member.id}`}
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
