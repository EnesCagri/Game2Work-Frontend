"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  Code2,
  Building2,
  LineChart,
  Gamepad2,
  ArrowRight,
} from "lucide-react";
import { GradientOrb } from "./ui/gradient-orb";

const ecosystemRoles = [
  {
    icon: Code2,
    title: "Geliştiriciler",
    description: [
      "İster bağımsız oyun geliştirici olun, ister büyük bir stüdyoda çalışın, size uygun fırsatları keşfedin.",
      "Oyun geliştirme becerilerinizi geliştirin, portfolyonuzu oluşturun ve iş fırsatlarına erişin.",
      "Kendi oyun girişiminizi başlatın, topluluk desteği alın ve yatırımcılarla tanışın.",
    ],
    cta: {
      text: "Geliştirici Profili Oluştur",
      href: "/developer-signup",
    },
  },
  {
    icon: Building2,
    title: "Şirketler",
    description: [
      "Oyun stüdyonuzu tanıtın ve yetenekli geliştiricilerle buluşun.",
      "Yeni projeler için işbirlikleri kurun ve ekibinizi genişletin.",
      "Oyun endüstrisindeki en son trendleri ve teknolojileri takip edin.",
    ],
    cta: {
      text: "Şirket Profili Oluştur",
      href: "/company-signup",
    },
  },
  {
    icon: LineChart,
    title: "Yatırımcılar",
    description: [
      "Yenilikçi oyun projelerini ve stüdyoları keşfedin.",
      "Erken aşama yatırım fırsatlarını değerlendirin.",
      "Oyun endüstrisindeki yükselen trendleri takip edin.",
    ],
    cta: {
      text: "Yatırımcı Profili Oluştur",
      href: "/investor-signup",
    },
  },
  {
    icon: Gamepad2,
    title: "Oyun Tutkunları",
    description: [
      "Yeni oyunları keşfedin ve geliştiricilere geri bildirim verin.",
      "Oyun topluluğuna katılın ve etkinliklere katılın.",
      "Oyun geliştirme süreçlerini yakından takip edin.",
    ],
    cta: {
      text: "Topluluğa Katıl",
      href: "/community-signup",
    },
  },
];

const Ecosystem = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gray-950" />

      <GradientOrb
        color="#ef4442"
        position="top-left"
        size="lg"
        opacity={0.01}
      />
      <GradientOrb
        color="#ef4442"
        position="bottom-right"
        size="lg"
        opacity={0.01}
      />
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden"></div>

      <div className="py-24 relative">
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-700 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Ekosistemimizi Tanıyın
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Oyun dünyasının her kesiminden insanları bir araya getiriyoruz.
              İster geliştirici olun, ister oyun tutkunu, ekosistemimizde sizin
              için bir yer var.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ecosystemRoles.map((role, index) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="group relative"
                >
                  <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 h-full hover:bg-gray-900/80 transition-all duration-300">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500/20 via-pink-500/20 to-orange-500/20 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-purple-500 group-hover:text-pink-500 transition-colors" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-white/90">
                      {role.title}
                    </h3>

                    <ul className="space-y-3 mb-8">
                      {role.description.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-gray-400 group-hover:text-gray-300"
                        >
                          <span className="w-2 h-2 mt-2 rounded-full bg-purple-500/50 group-hover:bg-pink-500/50 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      className="group/btn w-full"
                      variant="outline"
                      size="lg"
                    >
                      {role.cta.text}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
