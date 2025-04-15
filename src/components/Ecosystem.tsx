"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  Code2,
  Building2,
  LineChart,
  Gamepad2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { GradientOrb } from "./ui/gradient-orb";
import { useState } from "react";

const ecosystemRoles = [
  {
    icon: Code2,
    title: "Bağımsız Oyun Geliştiricileri",
    mainDescription:
      "Kendi oyun projesini başlatan, mini bir ekiple ilerleyen ya da yeteneklerini göstererek iş başvuruları yapmak isteyen bir oyun geliştiricisiysen Game To Work tam sana göre.",
    features: [
      "Yeni oyun girişimlerin için vitrin oluştur ve çalışmalarını sergile.",
      "Oyununu deneyimleyen kullanıcılardan geri bildirimler al.",
      "Finansman ihtiyacını karşılayacak yatırımcılarla buluş veya bağış topla.",
      "Diğer geliştiricilerle iletişime geçerek projelerine katılacak yeni ortaklar bul.",
      "Kariyerini bir basamak yukarı taşıyacak iş ilanlarına başvur.",
    ],
    cta: {
      text: "Geliştirici Profili Oluştur",
      href: "/developer-signup",
    },
  },
  {
    icon: Building2,
    title: "Oyun Şirketleri",
    mainDescription:
      "Endüstriyel oyun dünyasında büyük projelere imza atan, ekibini genişletmek ve finansal ortaklıklarla büyümek isteyen bir oyun şirketiysen Game To Work'te aradıklarına sadece bir adım uzaksın.",
    features: [
      "Şirket olarak geliştirdiğin oyunları büyük bir topluluğun erişimine sunarak kullanıcı deneyimini ölç.",
      "Oyunlarını deneyimleyen kullanıcılardan doğrudan geri bildirimler toplayarak geliştirme sürecini güçlendir.",
      "Şirket içi ihtiyaçların için iş ilanları yayınlayarak yeni yetenekleri ekibine kat.",
      "Proje bazlı ya da şirket geneli yatırımlar arayarak hibe, bağış ya da sponsor alma fırsatları yakala.",
      "Diğer oyun stüdyolarıyla işbirlikleri yaparak çalışma kapasiteni büyüt.",
    ],
    cta: {
      text: "Şirket Profili Oluştur",
      href: "/company-signup",
    },
  },
  {
    icon: Gamepad2,
    title: "Oyun Tutkunları",
    mainDescription:
      "Geliştiricilerin ve oyun şirketlerinin paylaşıma sunduğu yeni oyunları ilk deneyenlerden olmak ve oyun kültürüne yeni bir soluk katmak istiyorsan Game To Work senin için hazır.",
    features: [
      "Indie oyunları erkenden keşfet, ilk deneyimleyenlerden biri ol.",
      "Yorumların ve puanlarınla geliştiricilere doğrudan katkı sağla.",
      "Sosyal bir topluluğun parçası olarak diğer oyun tutkunlarıyla iletişim kur.",
      "Oyun dünyasındaki gelişmeleri, kampanyaları ve yaklaşan AAA yapımları kaçırma.",
      "Kendi indie oyun kütüphaneni oluştur, favorilerini listele.",
    ],
    cta: {
      text: "Topluluğa Katıl",
      href: "/community-signup",
    },
  },
  {
    icon: LineChart,
    title: "Oyun Yatırımcıları",
    mainDescription:
      "Erken aşamadaki oyun projelerini erkenden keşfetmek, girişimcilerle birebir temas kurmak ve oyun ekosisteminin geleceğine yön vermek istiyorsan Game To Work senin için ideal bir alan.",
    features: [
      "Potansiyel taşıyan oyun girişimlerini geliştirici profilleriyle birlikte incele.",
      "Geliştiriciler ve oyun şirketleriyle doğrudan bağlantı kurarak yatırım fırsatlarını değerlendir.",
      "Proje bazlı fonlama, sponsorluk ya da hisse bazlı yatırım modelleriyle projelere katkı ver.",
      "Oyuncuların geri bildirimleri ve topluluk etkileşimleri üzerinden kullanıcı davranışlarını analiz et.",
      "Girişim portföyünü oluştur, yatırım yaptığın projeleri uzun vadeli olarak takip et.",
    ],
    cta: {
      text: "Yatırımcı Profili Oluştur",
      href: "/investor-signup",
    },
  },
];

const Ecosystem = () => {
  const [expandedRoles, setExpandedRoles] = useState<Record<number, boolean>>(
    {}
  );

  const toggleExpand = (index: number) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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
              const isExpanded = expandedRoles[index];
              const visibleItems = isExpanded
                ? role.features
                : role.features.slice(0, 3);

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

                    {/* Main Description */}
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                      {role.mainDescription}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {visibleItems.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-gray-400 group-hover:text-gray-300"
                        >
                          <span className="w-2 h-2 mt-2 rounded-full bg-purple-500/50 group-hover:bg-pink-500/50 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Expand/Collapse Button */}
                    {role.features.length > 3 && (
                      <button
                        onClick={() => toggleExpand(index)}
                        className="text-sm text-purple-500 hover:text-pink-500 flex items-center gap-1 mb-4 transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            Daha Az Göster <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Daha Fazla Göster{" "}
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}

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
