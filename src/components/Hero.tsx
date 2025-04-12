"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FallingBlocks } from "./ui/falling-blocks";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background gradient and overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 to-black" />

      {/* Falling Blocks Animation */}
      <FallingBlocks />

      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            className="relative p-8 rounded-2xl backdrop-blur-sm bg-black/20 border border-white/10
                      shadow-[0_0_50px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_-12px_rgba(239,68,68,0.3)]
                      transition-all duration-500"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              whileHover={{ color: "#ffffff" }}
              className="text-red-500 font-semibold text-2xl md:text-3xl mb-4 transition-colors duration-300"
            >
              GİRİŞİMCİLİK ARTIK BİR OYUN
            </motion.h2>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: [1, 1.02, 1],
              }}
              transition={{
                opacity: { delay: 0.5, duration: 0.8 },
                y: { delay: 0.5, duration: 0.8 },
                scale: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              whileHover={{
                color: "#ffffff",
                textShadow: "0 0 30px rgba(239,68,68,0.5)",
              }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-700 via-pink-500 to-red-500 bg-clip-text text-transparent hover:bg-none transition-all duration-300"
            >
              KAZANMAYA
              <br />
              HAZIR MISIN?
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="space-y-4 mt-8"
            >
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                Geliştiriciler, yatırımcılar ve oyun tutkunları
                <br />
                Game To Work'te buluşuyor.
              </p>
              <p className="text-base md:text-lg text-gray-400 font-light tracking-wide">
                Projeni tanıt, destek al, işbirliği kur ve büyü
              </p>

              <motion.div
                className="pt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6
                           shadow-[0_0_20px_-5px_rgba(239,68,68,0.5)]
                           hover:shadow-[0_0_25px_-5px_rgba(239,68,68,0.7)]
                           transition-all duration-300"
                >
                  Hemen Keşfet
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-red-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-red-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </section>
  );
}
