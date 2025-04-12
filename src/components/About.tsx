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

const targetGroups = [
  { icon: GamepadIcon, text: "Bireysel Oyun Geliştiricileri" },
  { icon: BriefcaseIcon, text: "Kurumsal Oyun Şirketleri" },
  { icon: Wallet, text: "Yatırımcılar" },
  { icon: Users, text: "Mentorlar ve Profesyoneller" },
  { icon: Target, text: "Oyun Meraklıları" },
];

export default function About() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-red-500/20" />
            <Image
              src="/Developers/gamer2.jpg"
              alt="Game Developer"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-700 via-pink-500 to-red-500 bg-clip-text text-transparent"
            >
              Neden Game To Work?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-300 text-lg"
            >
              Game To Work sayesinde geliştiriciler projelerini sergiler,
              yatırımcılar potansiyel fırsatları erkenden yakalar, oyuncular ise
              keyifli bir oyun topluluğunun parçası olurlar.
            </motion.p>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative flex items-start gap-4 bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-purple-500/5 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative z-10 w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors duration-300">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    🤝
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
                    Doğru Kişilerle Buluşma
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    Oyun, yatırım ve kullanıcı katkılarının kesiştiği buluşma
                    noktası.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative flex items-start gap-4 bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-pink-500/5 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative z-10 w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500/20 transition-colors duration-300">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    🧭
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-pink-200 transition-colors duration-300">
                    Şeffaf ve Erişilebilir Yapı
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    Herkesin katılabildiği ve katkı sunabildiği açık bir sistem.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative flex items-start gap-4 bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-red-500/5 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative z-10 w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 transition-colors duration-300">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    🚀
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-200 transition-colors duration-300">
                    Gerçek Potansiyele Ulaşma
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    Girişimleri, yetenekleri ve fikirleri görünür kılıyoruz.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Target Groups */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {targetGroups.map((group, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-white/5 rounded-full blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="relative z-10 flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-white/10">
                    <group.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                      {group.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
