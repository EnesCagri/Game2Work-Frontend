"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Code2, Rocket, LineChart, ArrowRight } from "lucide-react";

const ecosystemRoles = [
  {
    icon: Code2,
    title: "Ürün Geliştiricileri İçin",
    description: [
      "Projelerinizi şeffaf bir şekilde tanıtın ve gerçek kullanıcılardan anında geri bildirim alın.",
      "Diğer geliştiricilerle iletişim kurarak ağınızı genişletin ve işbirliği fırsatları yakalayın.",
      "Aylık güncellemelerle kullanıcıları ve yatırımcıları gelişmelere dahil edin.",
    ],
    cta: {
      text: "Projenizi Yükleyin",
      href: "/upload-project",
    },
  },
  {
    icon: Rocket,
    title: "Girişimciler İçin",
    description: [
      "Hem yerel hem küresel pazarda girişiminizi tanıtın ve hedef kitlenize ulaşın.",
      "Topluluğunuzdan bağış sistemiyle ilk finansmanınızı sağlayarak projenizi hızlandırın.",
      "Yatırımcıların radarına girerek büyüme fırsatlarını yakalayın.",
    ],
    cta: {
      text: "Girişiminizi Ekleyin",
      href: "/add-startup",
    },
  },
  {
    icon: LineChart,
    title: "Yatırımcılar İçin",
    description: [
      "Filtreleme seçenekleriyle ilgilendiğiniz sektör ve bölgelerde yeni projeleri kolayca bulun.",
      "Girişimlerin gelişimini ve topluluk etkileşimlerini takip ederek doğru kararlar verin.",
      "Doğrudan girişimcilerle bağlantı kurarak yatırım sürecinizi hızlandırın.",
    ],
    cta: {
      text: "Profilinizi Oluşturun",
      href: "/investor-signup",
    },
  },
];

const Ecosystem = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-white text-4xl font-bold mb-4 ">
            Rakamlarla GameToWork
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Türkiye'nin en büyük girişimcilik platformunda herkes için bir yer
            var. Hangi rolde olursanız olun, ekosistemimizde büyümenize yardımcı
            olacak araçlar sunuyoruz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
    </section>
  );
};

export default Ecosystem;
