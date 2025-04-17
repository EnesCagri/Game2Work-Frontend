"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export default function ProfilePage() {
  // TODO: Replace with actual user data from your auth system
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/default.png",
    roles: ["developer", "gamer"],
    profile: {
      country: "Turkey",
      city: "Istanbul",
      education: "Bachelor",
      birthDate: "1990-01-01",
      phone: "+90 555 555 55 55",
    },
  };

  const roleDetails = {
    developer: {
      title: "Geliştirici",
      description: "Oyun geliştirme süreçlerinde yer almak istiyorum",
      icon: "👨‍💻",
    },
    gamer: {
      title: "Oyuncu",
      description: "Oyunları test etmek ve geri bildirim vermek istiyorum",
      icon: "🎮",
    },
    investor: {
      title: "Yatırımcı",
      description: "Oyun projelerine yatırım yapmak ve desteklemek istiyorum",
      icon: "💰",
    },
    company: {
      title: "Şirket",
      description: "Şirketimizi tanıtmak ve iş birlikleri kurmak istiyorum",
      icon: "🏢",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 shadow-2xl p-8"
        >
          <div className="flex items-center space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-purple-500 text-white text-2xl">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 shadow-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Profil Bilgileri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400">Ülke</p>
              <p className="text-white">{user.profile.country}</p>
            </div>
            <div>
              <p className="text-gray-400">Şehir</p>
              <p className="text-white">{user.profile.city}</p>
            </div>
            <div>
              <p className="text-gray-400">Eğitim Durumu</p>
              <p className="text-white">{user.profile.education}</p>
            </div>
            <div>
              <p className="text-gray-400">Doğum Tarihi</p>
              <p className="text-white">{user.profile.birthDate}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-400">Telefon</p>
              <p className="text-white">{user.profile.phone}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 shadow-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Rollerim</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.roles.map((role) => (
              <Card
                key={role}
                className="p-6 border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">
                    {roleDetails[role as keyof typeof roleDetails].icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {roleDetails[role as keyof typeof roleDetails].title}
                    </h3>
                    <p className="mt-2 text-gray-400">
                      {
                        roleDetails[role as keyof typeof roleDetails]
                          .description
                      }
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-end"
        >
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02]">
            Profili Düzenle
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
