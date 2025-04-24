import Image from "next/image";
import { motion } from "framer-motion";

const MysteryBox = () => {
  return (
    <motion.div
      className="relative w-64 h-64 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Base box with circuit pattern */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600/80 to-blue-600/80 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("/patterns/circuit-board.svg")',
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000" />

      {/* Question mark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-8xl font-bold text-white/90 drop-shadow-lg">
          ?
        </span>
      </div>

      {/* Sparkles */}
      <motion.div
        className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-6 left-6 w-2 h-2 bg-white rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Edge highlight */}
      <div className="absolute inset-0 rounded-xl border border-white/20" />
    </motion.div>
  );
};

export default MysteryBox;
