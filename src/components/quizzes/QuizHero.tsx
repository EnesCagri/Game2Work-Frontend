import { motion } from "framer-motion";
import { MysteryBox } from "./MysteryBox";

export function QuizHero() {
  return (
    <div className="relative overflow-hidden py-20 bg-gradient-to-b from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Test Your Skills with
              <span className="block text-yellow-400">Gaming Quizzes</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Challenge yourself with our collection of programming and gaming
              quizzes. Earn badges, certificates, and level up your career!
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-300 transition-colors"
              >
                Start a Quiz
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
              >
                View Leaderboard
              </motion.button>
            </div>
          </motion.div>

          {/* Mystery Box Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 flex justify-center items-center"
          >
            <MysteryBox className="transform scale-75 md:scale-100" />
          </motion.div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}
