"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  GamepadIcon,
  BriefcaseIcon,
  Users,
  Wallet,
  Target,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { GradientOrb } from "./ui/gradient-orb";

const targetGroups = [
  { icon: GamepadIcon, text: "Bireysel Oyun Geliştiricileri" },
  { icon: BriefcaseIcon, text: "Kurumsal Oyun Şirketleri" },
  { icon: Wallet, text: "Yatırımcılar" },
  { icon: Users, text: "Mentorlar ve Profesyoneller" },
  { icon: Target, text: "Oyun Meraklıları" },
];

const About = () => {
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-pink-500/20 to-orange-500/20 z-10" />
                <Image
                  src="/gamedevimg.jpg"
                  alt="Game2Work Platform"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -top-8 -right-8 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 p-4 rounded-xl"
              >
                <GamepadIcon className="w-8 h-8 text-purple-500" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-8 -left-8 bg-orange-500/10 backdrop-blur-sm border border-orange-500/20 p-4 rounded-xl"
              >
                <BriefcaseIcon className="w-8 h-8 text-orange-500" />
              </motion.div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:pl-8"
            >
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                Oyun Dünyasının Yeni Nesil Platformu
              </h2>

              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Game2Work, oyun ekosistemini demokratikleştirerek bireysel
                geliştiricilerin büyük şirketlerle rekabet edebilmesini sağlayan
                yenilikçi bir dijital platformdur.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      Güçlü Topluluk
                    </h3>
                    <p className="text-gray-400">
                      Geliştiriciler, yatırımcılar ve mentorlardan oluşan aktif
                      bir ekosistem.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      Network & Yatırım
                    </h3>
                    <p className="text-gray-400">
                      Projenizi tanıtın, geri bildirim alın ve yatırımcılarla
                      buluşun.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <Wallet className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      Finansal Destek
                    </h3>
                    <p className="text-gray-400">
                      Bağış toplama ve yatırım alma fırsatlarıyla projelerinizi
                      büyütün.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {targetGroups.map((group, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-2 bg-gray-900/30 px-4 py-2 rounded-full border border-gray-800"
                  >
                    <group.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">{group.text}</span>
                  </motion.div>
                ))}
              </div>

              <Button className="group" size="lg">
                Hemen Başla
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
