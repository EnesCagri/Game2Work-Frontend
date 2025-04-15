"use client";

//import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
//import { Button } from "@/components/ui/button";
//import { Badge } from "@/components/ui/badge";
import {
  ImageIcon,
  MessageSquare,
  Wallet,
  Users,
  Briefcase,
  BarChart,
  MessageCircle,
  GraduationCap,
  Globe,
  Search,
  ThumbsUp,
  Users2,
  Brain,
  Gift,
  BookOpen,
  Mail,
  Video,
  TrendingUp,
  Handshake,
  Target,
  Bell,
  LayoutDashboard,
  BriefcaseBusiness,
  X,
} from "lucide-react";
// import { RocketIcon, UsersIcon, GraduationCapIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { GradientOrb } from "./ui/gradient-orb";
import { useState } from "react";

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  hoverColor: string;
  bgColor: string;
  hoverBgColor: string;
}

interface Segment {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  features: Feature[];
}

const developerFeatures = [
  {
    icon: ImageIcon,
    title: "Oyununu Sergile",
    description:
      "Projeni vitrine çıkar, kullanıcıların ve yatırımcıların ilgisini çek.",
    color: "text-pink-500",
    hoverColor: "group-hover:text-pink-400",
    bgColor: "bg-pink-500/10",
    hoverBgColor: "group-hover:bg-pink-500/20",
  },
  {
    icon: MessageSquare,
    title: "Geri Bildirim Al",
    description:
      "Oyuncular ve diğer geliştiricilerden oyununa dair yorum ve değerlendirme topla.",
    color: "text-blue-500",
    hoverColor: "group-hover:text-blue-400",
    bgColor: "bg-blue-500/10",
    hoverBgColor: "group-hover:bg-blue-500/20",
  },
  {
    icon: Wallet,
    title: "Yatırım veya Bağış Al",
    description:
      "Bağış sistemiyle topluluktan destek topla veya yatırımcılarla doğrudan bağlantı kur.",
    color: "text-green-500",
    hoverColor: "group-hover:text-green-400",
    bgColor: "bg-green-500/10",
    hoverBgColor: "group-hover:bg-green-500/20",
  },
  {
    icon: Users,
    title: "Takım Kur veya Katıl",
    description:
      "Kendi projen için ekip arkadaşları bul ya da başkalarının projelerine katıl.",
    color: "text-purple-500",
    hoverColor: "group-hover:text-purple-400",
    bgColor: "bg-purple-500/10",
    hoverBgColor: "group-hover:bg-purple-500/20",
  },
  {
    icon: Briefcase,
    title: "İş İlanlarına Başvur",
    description:
      "Yeteneklerini göstermek ve sektöre adım atmak için iş fırsatlarını değerlendir.",
    color: "text-yellow-500",
    hoverColor: "group-hover:text-yellow-400",
    bgColor: "bg-yellow-500/10",
    hoverBgColor: "group-hover:bg-yellow-500/20",
  },
  {
    icon: BarChart,
    title: "Performansını Takip Et",
    description:
      "Oyununun etkileşim, görüntülenme ve puanlanma verilerini analiz et.",
    color: "text-red-500",
    hoverColor: "group-hover:text-red-400",
    bgColor: "bg-red-500/10",
    hoverBgColor: "group-hover:bg-red-500/20",
  },
  {
    icon: MessageCircle,
    title: "Toplulukla Etkileşim Kur",
    description:
      "Diğer geliştiricilerle iletişim kur, destek al ve fikir alışverişi yap.",
    color: "text-cyan-500",
    hoverColor: "group-hover:text-cyan-400",
    bgColor: "bg-cyan-500/10",
    hoverBgColor: "group-hover:bg-cyan-500/20",
  },
  {
    icon: GraduationCap,
    title: "Eğitim ve Kaynaklara Eriş",
    description: "Oyun geliştirme yolculuğunu kolaylaştıracak içeriklere ulaş.",
    color: "text-orange-500",
    hoverColor: "group-hover:text-orange-400",
    bgColor: "bg-orange-500/10",
    hoverBgColor: "group-hover:bg-orange-500/20",
  },
];

const companyFeatures = [
  {
    icon: ImageIcon,
    title: "Projeni Sergile",
    description:
      "Şirket olarak geliştirdiğiniz oyunları geniş topluluğa tanıtarak vitrin oluşturun.",
    color: "text-pink-500",
    hoverColor: "group-hover:text-pink-400",
    bgColor: "bg-pink-500/10",
    hoverBgColor: "group-hover:bg-pink-500/20",
  },
  {
    icon: MessageSquare,
    title: "Kullanıcı Geri Bildirimi Al",
    description:
      "Oyunlarınızı deneyimleyen oyunculardan ve geliştiricilerden direkt yorumlar toplayın.",
    color: "text-blue-500",
    hoverColor: "group-hover:text-blue-400",
    bgColor: "bg-blue-500/10",
    hoverBgColor: "group-hover:bg-blue-500/20",
  },
  {
    icon: Briefcase,
    title: "İş İlanı Yayınla",
    description:
      "Yeni pozisyonlar için yetenekli geliştiricilere ulaşarak ekibinizi büyütün.",
    color: "text-green-500",
    hoverColor: "group-hover:text-green-400",
    bgColor: "bg-green-500/10",
    hoverBgColor: "group-hover:bg-green-500/20",
  },
  {
    icon: Handshake,
    title: "Yatırımcılarla Buluş",
    description:
      "Uygun yatırımcılarla doğrudan iletişim kurarak projelerinize fon ve sponsor destekleri alın.",
    color: "text-purple-500",
    hoverColor: "group-hover:text-purple-400",
    bgColor: "bg-purple-500/10",
    hoverBgColor: "group-hover:bg-purple-500/20",
  },
  {
    icon: Globe,
    title: "Toplulukla Etkileşime Gir",
    description:
      "Oyunseverler, içerik üreticileri ve profesyonellerle temasa geçerek bağlantılar kurun.",
    color: "text-yellow-500",
    hoverColor: "group-hover:text-yellow-400",
    bgColor: "bg-yellow-500/10",
    hoverBgColor: "group-hover:bg-yellow-500/20",
  },
  {
    icon: BarChart,
    title: "Analitik Takibi Yap",
    description:
      "Kullanıcı etkileşimi, puanlama ve erişim üzerinden projelerinizin performansını detaylı olarak analiz edin.",
    color: "text-red-500",
    hoverColor: "group-hover:text-red-400",
    bgColor: "bg-red-500/10",
    hoverBgColor: "group-hover:bg-red-500/20",
  },
  {
    icon: Users2,
    title: "Diğer Şirketlerle İş Birliği Yap",
    description:
      "Proje bazlı ortaklıklar kurarak üretim ve yayın süreçlerinizi güçlendirin.",
    color: "text-cyan-500",
    hoverColor: "group-hover:text-cyan-400",
    bgColor: "bg-cyan-500/10",
    hoverBgColor: "group-hover:bg-cyan-500/20",
  },
  {
    icon: GraduationCap,
    title: "Eğitim & Mentorluk İçeriklerine Eriş",
    description:
      "Yeni ekip üyeleri ve şirket içi gelişiminiz için akademik kaynaklardan faydalanın.",
    color: "text-orange-500",
    hoverColor: "group-hover:text-orange-400",
    bgColor: "bg-orange-500/10",
    hoverBgColor: "group-hover:bg-orange-500/20",
  },
];

const gamerFeatures = [
  {
    icon: Search,
    title: "Yeni Oyunları Keşfet",
    description:
      "Yayınlanmış ya da geliştirme aşamasındaki indie oyunları ilk deneyenlerden biri ol.",
    color: "text-pink-500",
    hoverColor: "group-hover:text-pink-400",
    bgColor: "bg-pink-500/10",
    hoverBgColor: "group-hover:bg-pink-500/20",
  },
  {
    icon: ThumbsUp,
    title: "Puanla, Yorumla, Katkı Sun",
    description:
      "Oyunlara not ver, deneyimlerini geliştiriciyle ve toplulukla paylaş.",
    color: "text-blue-500",
    hoverColor: "group-hover:text-blue-400",
    bgColor: "bg-blue-500/10",
    hoverBgColor: "group-hover:bg-blue-500/20",
  },
  {
    icon: Users2,
    title: "Sosyal Ağın Parçası Ol",
    description:
      "Diğer oyuncularla iletişim kur, favori geliştiricilerini takip et, önerilerde bulun.",
    color: "text-green-500",
    hoverColor: "group-hover:text-green-400",
    bgColor: "bg-green-500/10",
    hoverBgColor: "group-hover:bg-green-500/20",
  },
  {
    icon: Brain,
    title: "Oyun Kültürünü Takip Et",
    description:
      "Yeni çıkacak AAA yapımlardan sektörel haberlere kadar oyun dünyasından daima haberdar ol.",
    color: "text-purple-500",
    hoverColor: "group-hover:text-purple-400",
    bgColor: "bg-purple-500/10",
    hoverBgColor: "group-hover:bg-purple-500/20",
  },
  {
    icon: Gift,
    title: "Kampanya & Kuponlardan Yararlan",
    description:
      "Platform üzerinden erişebileceğin özel oyun fırsatlarını ve promosyonları kaçırma.",
    color: "text-yellow-500",
    hoverColor: "group-hover:text-yellow-400",
    bgColor: "bg-yellow-500/10",
    hoverBgColor: "group-hover:bg-yellow-500/20",
  },
  {
    icon: BookOpen,
    title: "Kendi Oyun Kütüphaneni Oluştur",
    description:
      "Favorilerini listele, beğendiğin projeleri takip et, destek verdiğin oyunları arşivle.",
    color: "text-red-500",
    hoverColor: "group-hover:text-red-400",
    bgColor: "bg-red-500/10",
    hoverBgColor: "group-hover:bg-red-500/20",
  },
  {
    icon: Mail,
    title: "Geliştiricilerle İletişim Kur",
    description:
      "İlgini çeken proje sahiplerine direkt mesaj gönder, test sürecine katıl.",
    color: "text-cyan-500",
    hoverColor: "group-hover:text-cyan-400",
    bgColor: "bg-cyan-500/10",
    hoverBgColor: "group-hover:bg-cyan-500/20",
  },
  {
    icon: Video,
    title: "İçerik Üreticileriyle Etkileşime Geç",
    description:
      "Oyun odaklı yayıncıları ve influencer'ları takip ederek içeriklerine katkı ver.",
    color: "text-orange-500",
    hoverColor: "group-hover:text-orange-400",
    bgColor: "bg-orange-500/10",
    hoverBgColor: "group-hover:bg-orange-500/20",
  },
];

const investorFeatures = [
  {
    icon: Search,
    title: "Projeleri Erken Keşfet",
    description:
      "Henüz pazara çıkmamış, potansiyel taşıyan oyun projelerini ilk görenlerden ol.",
    color: "text-pink-500",
    hoverColor: "group-hover:text-pink-400",
    bgColor: "bg-pink-500/10",
    hoverBgColor: "group-hover:bg-pink-500/20",
  },
  {
    icon: Handshake,
    title: "Geliştiricilerle Doğrudan Bağlantı Kur",
    description:
      "İlgini çeken girişimlerle platform üzerinden birebir iletişim başlat.",
    color: "text-blue-500",
    hoverColor: "group-hover:text-blue-400",
    bgColor: "bg-blue-500/10",
    hoverBgColor: "group-hover:bg-blue-500/20",
  },
  {
    icon: Wallet,
    title: "Yatırım, Fon veya Sponsorluk Sağla",
    description:
      "Proje bazlı ya da şirket ölçeğinde yatırım yaparak oyun dünyasına ortak ol.",
    color: "text-green-500",
    hoverColor: "group-hover:text-green-400",
    bgColor: "bg-green-500/10",
    hoverBgColor: "group-hover:bg-green-500/20",
  },
  {
    icon: BarChart,
    title: "Kullanıcı Verilerini Analiz Et",
    description:
      "Oyuncu geri bildirimleri, topluluk eğilimleri ve etkileşim istatistikleri üzerinden içgörü elde et.",
    color: "text-purple-500",
    hoverColor: "group-hover:text-purple-400",
    bgColor: "bg-purple-500/10",
    hoverBgColor: "group-hover:bg-purple-500/20",
  },
  {
    icon: BriefcaseBusiness,
    title: "Kendi Portföyünü Oluştur",
    description:
      "Takip ettiğin projeleri listele, geçmiş yatırımlarını gözlemle, ilerlemeleri izle.",
    color: "text-yellow-500",
    hoverColor: "group-hover:text-yellow-400",
    bgColor: "bg-yellow-500/10",
    hoverBgColor: "group-hover:bg-yellow-500/20",
  },
  {
    icon: Target,
    title: "Oyun Ekosistemine Katıl",
    description:
      "Sadece fonlayan değil, şekillendiren biri ol. Geleceğin oyunları için sen de görüşlerini paylaş.",
    color: "text-red-500",
    hoverColor: "group-hover:text-red-400",
    bgColor: "bg-red-500/10",
    hoverBgColor: "group-hover:bg-red-500/20",
  },
  {
    icon: Bell,
    title: "Trendleri ve Gelişimleri Takip Et",
    description:
      "Sektörel raporlar, öne çıkan projeler ve yatırım duyurularından haberdar ol.",
    color: "text-cyan-500",
    hoverColor: "group-hover:text-cyan-400",
    bgColor: "bg-cyan-500/10",
    hoverBgColor: "group-hover:bg-cyan-500/20",
  },
  {
    icon: LayoutDashboard,
    title: "Yatırımcı Paneline Eriş",
    description:
      "Sana özel içerikler, filtrelenmiş proje listeleri ve zaman kazandıran yönetim araçlarıyla yatırım sürecini kolaylaştır.",
    color: "text-orange-500",
    hoverColor: "group-hover:text-orange-400",
    bgColor: "bg-orange-500/10",
    hoverBgColor: "group-hover:bg-orange-500/20",
  },
];

const segments: Segment[] = [
  {
    title: "Bağımsız Oyun Geliştiricileri",
    description:
      "Oyun projelerinizi sergileyin, toplulukla etkileşime geçin ve yatırımcılarla buluşun.",
    icon: ImageIcon,
    color: "from-pink-500 to-purple-500",
    features: developerFeatures,
  },
  {
    title: "Oyun Şirketleri",
    description:
      "Şirketinizi tanıtın, yetenekli geliştiricilerle buluşun ve yeni projeler keşfedin.",
    icon: Briefcase,
    color: "from-blue-500 to-cyan-500",
    features: companyFeatures,
  },
  {
    title: "Oyun Tutkunları",
    description:
      "Yeni oyunları keşfedin, toplulukla etkileşime geçin ve geliştiricilerle bağlantı kurun.",
    icon: Users2,
    color: "from-green-500 to-emerald-500",
    features: gamerFeatures,
  },
  {
    title: "Yatırımcılar",
    description:
      "Potansiyel projeleri keşfedin, geliştiricilerle bağlantı kurun ve yatırım fırsatlarını değerlendirin.",
    icon: Wallet,
    color: "from-yellow-500 to-orange-500",
    features: investorFeatures,
  },
];

const FeaturesGrid = () => {
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);

  return (
    <section className="relative overflow-hidden">
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

      <div className="py-24 relative">
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-700 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Platformda Neler Yapabilirsin?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {segments.map((segment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                onClick={() => setSelectedSegment(segment)}
                className="cursor-pointer"
              >
                <Card className="group p-12 bg-gray-900/50 border-gray-800 hover:bg-gray-900/80 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--feature-glow)] relative overflow-hidden h-full min-h-[400px] flex flex-col items-center justify-center">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${segment.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                  />

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="w-24 h-24 bg-gray-800/50 rounded-xl flex items-center justify-center mb-8"
                  >
                    <segment.icon className="w-12 h-12 text-white" />
                  </motion.div>

                  <h3 className="text-3xl font-semibold mb-6 text-white text-center">
                    {segment.title}
                  </h3>
                  <p className="text-gray-400 text-center text-lg max-w-md">
                    {segment.description}
                  </p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="mt-8 text-pink-500 font-medium flex items-center gap-2"
                  >
                    Detayları Gör
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedSegment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSegment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 ${selectedSegment.color
                      .replace("from-", "bg-")
                      .replace(
                        " to-",
                        "/"
                      )} rounded-lg flex items-center justify-center`}
                  >
                    <selectedSegment.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">
                    {selectedSegment.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedSegment(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedSegment.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="group p-6 bg-gray-800/50 border-gray-700 hover:bg-gray-800/80 transition-all duration-200 relative overflow-hidden">
                      {/* Glow effect */}
                      <div
                        className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-200`}
                        style={{
                          background: `radial-gradient(circle at center, var(--feature-color), transparent 70%)`,
                          ["--feature-color" as any]: feature.color.includes(
                            "pink"
                          )
                            ? "#ec4899"
                            : feature.color.includes("blue")
                            ? "#3b82f6"
                            : feature.color.includes("purple")
                            ? "#8b5cf6"
                            : feature.color.includes("green")
                            ? "#22c55e"
                            : feature.color.includes("red")
                            ? "#ef4444"
                            : feature.color.includes("yellow")
                            ? "#eab308"
                            : feature.color.includes("cyan")
                            ? "#06b6d4"
                            : "#f97316",
                        }}
                      />

                      <div className="flex items-start gap-4 relative z-10">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                          className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <feature.icon
                            className={`w-6 h-6 ${feature.color}`}
                          />
                        </motion.div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90 transition-colors duration-200">
                            {feature.title}
                          </h4>
                          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturesGrid;
