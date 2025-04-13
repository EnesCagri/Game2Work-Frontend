"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Game } from "@/types";
import {
  TrophyIcon,
  ClockIcon,
  UsersIcon,
  MonitorIcon,
  HardDriveIcon,
  CpuIcon,
  CircleIcon,
  AwardIcon,
  LanguagesIcon,
  GamepadIcon,
  TagIcon,
  ShieldIcon,
  TrophyIcon as AchievementIcon,
} from "lucide-react";

export default function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const data = await db.getGameById(id as string);
        if (!data) return null;

        setGame(data);
      } catch (error) {
        console.error("Failed to fetch game:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500" />
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Oyun bulunamadı</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-lg overflow-hidden mb-8 bg-gray-900/50"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          <div className="relative w-full h-[500px]">
            <img
              src={game.image}
              alt={game.title}
              className="absolute inset-0 w-full h-full object-contain"
            />
            <div
              className="absolute inset-0 backdrop-blur-sm bg-black/30"
              style={{ zIndex: 5 }}
            />
            <img
              src={game.image}
              alt={game.title}
              className="relative w-full h-full object-contain z-10"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-white">{game.title}</h1>
              {game.metacritic && (
                <div className="px-3 py-1 rounded-md bg-green-500/20 text-green-400">
                  {game.metacritic}
                </div>
              )}
              {game.esrbRating && (
                <div className="px-3 py-1 rounded-md bg-yellow-500/20 text-yellow-400">
                  {game.esrbRating}
                </div>
              )}
            </div>
            <div className="flex gap-4 text-gray-300 mb-4">
              {game.developer && <span>{game.developer}</span>}
              {game.developer && game.publisher && <span>•</span>}
              {game.publisher && <span>{game.publisher}</span>}
              {game.releaseDate && <span>•</span>}
              {game.releaseDate && <span>{game.releaseDate}</span>}
              <span>•</span>
              <span>{game.price}</span>
            </div>
            <div className="flex gap-2">
              {game.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Screenshots Section */}
        {game.screenshots && game.screenshots.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Oyun Görüntüleri
            </h2>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900/50 border border-gray-800 mb-4">
              <img
                src={game.screenshots[activeScreenshot]}
                alt={`Screenshot ${activeScreenshot + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {game.screenshots.map((screenshot, index) => (
                <button
                  key={index}
                  onClick={() => setActiveScreenshot(index)}
                  className={`relative rounded-lg overflow-hidden border-2 ${
                    activeScreenshot === index
                      ? "border-red-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={screenshot}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full aspect-video object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Trailer Section */}
        {game.youtubeId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Oyun Fragmanı
            </h2>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900/50 border border-gray-800">
              <iframe
                src={`https://www.youtube.com/embed/${game.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${game.title} Fragmanı`}
              />
            </div>
          </motion.div>
        )}

        {/* Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 flex items-center gap-4"
          >
            <TrophyIcon className="w-8 h-8 text-red-500" />
            <div>
              <div className="text-gray-400">Puan</div>
              <div className="text-2xl font-bold text-white">
                {game.rating}/5.0
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 flex items-center gap-4"
          >
            <ClockIcon className="w-8 h-8 text-red-500" />
            <div>
              <div className="text-gray-400">Toplam Oynama Süresi</div>
              <div className="text-2xl font-bold text-white">
                {game.totalPlaytime}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 flex items-center gap-4"
          >
            <UsersIcon className="w-8 h-8 text-red-500" />
            <div>
              <div className="text-gray-400">Aktif Oyuncular</div>
              <div className="text-2xl font-bold text-white">
                {game.playerCount}
              </div>
            </div>
          </motion.div>

          {game.achievements && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 flex items-center gap-4"
            >
              <AchievementIcon className="w-8 h-8 text-red-500" />
              <div>
                <div className="text-gray-400">Başarımlar</div>
                <div className="text-2xl font-bold text-white">
                  {game.achievements}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Hakkında</h2>
          <p className="text-gray-300 leading-relaxed">{game.description}</p>
        </motion.div>

        {/* Features */}
        {game.features && game.features.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Özellikler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {game.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <GamepadIcon className="w-5 h-5 text-red-500" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* System Requirements */}
        {game.systemRequirements && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Sistem Gereksinimleri
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Minimum Requirements */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Minimum
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MonitorIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-gray-400">İşletim Sistemi</div>
                      <div className="text-white">
                        {game.systemRequirements.minimum.os}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CpuIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-gray-400">İşlemci</div>
                      <div className="text-white">
                        {game.systemRequirements.minimum.processor}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CircleIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-gray-400">Bellek</div>
                      <div className="text-white">
                        {game.systemRequirements.minimum.memory}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <HardDriveIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-gray-400">Depolama</div>
                      <div className="text-white">
                        {game.systemRequirements.minimum.storage}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Requirements */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Önerilen
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MonitorIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-gray-400">İşletim Sistemi</div>
                      <div className="text-white">
                        {game.systemRequirements.recommended.os}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CpuIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-gray-400">İşlemci</div>
                      <div className="text-white">
                        {game.systemRequirements.recommended.processor}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CircleIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-gray-400">Bellek</div>
                      <div className="text-white">
                        {game.systemRequirements.recommended.memory}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <HardDriveIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-gray-400">Depolama</div>
                      <div className="text-white">
                        {game.systemRequirements.recommended.storage}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Awards */}
        {game.awards && game.awards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Ödüller</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {game.awards.map((award, index) => (
                <div key={index} className="flex items-center gap-3">
                  <AwardIcon className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-300">{award}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Languages and Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Languages */}
          {game.languages && game.languages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Dil Desteği
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {game.languages.map((language, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <LanguagesIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{language}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Additional Info */}
          {(game.size || game.esrbRating) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Ek Bilgiler
              </h2>
              <div className="space-y-3">
                {game.size && (
                  <div className="flex items-center gap-3">
                    <TagIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-gray-400">Boyut</div>
                      <div className="text-white">{game.size}</div>
                    </div>
                  </div>
                )}
                {game.esrbRating && (
                  <div className="flex items-center gap-3">
                    <ShieldIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-gray-400">ESRB Değerlendirmesi</div>
                      <div className="text-white">{game.esrbRating}</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Related Games */}
        {game.relatedGames && game.relatedGames.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Benzer Oyunlar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {game.relatedGames.map((relatedGame) => (
                <div
                  key={relatedGame.id}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden group cursor-pointer"
                >
                  <div className="relative aspect-video">
                    <img
                      src={relatedGame.image}
                      alt={relatedGame.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold group-hover:text-red-500 transition-colors">
                      {relatedGame.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* DLC Section */}
        {game.dlc && game.dlc.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              İndirilebilir İçerikler
            </h2>
            <div className="space-y-4">
              {game.dlc.map((dlc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                >
                  <div>
                    <h3 className="text-white font-semibold">{dlc.title}</h3>
                    <p className="text-gray-400">{dlc.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white font-semibold">
                      ${dlc.price}
                    </span>
                    <Button
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Satın Al
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            size="lg"
            className="flex-1 bg-gradient-to-r from-red-700 via-pink-500 to-red-500 text-white hover:from-red-600 hover:via-pink-400 hover:to-red-600"
          >
            Oyna
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 border-gray-800 hover:bg-gray-900/50"
          >
            Kütüphaneye Ekle
          </Button>
        </div>
      </div>
    </div>
  );
}
