"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const roles = [
  {
    id: "investor",
    title: "Yatırımcı",
    description: "Oyun projelerine yatırım yapmak ve desteklemek istiyorum",
    icon: "💰",
  },
  {
    id: "developer",
    title: "Geliştirici",
    description: "Oyun geliştirme süreçlerinde yer almak istiyorum",
    icon: "👨‍💻",
  },
  {
    id: "company",
    title: "Şirket",
    description: "Şirketimizi tanıtmak ve iş birlikleri kurmak istiyorum",
    icon: "🏢",
  },
  {
    id: "gamer",
    title: "Oyuncu",
    description: "Oyunları test etmek ve geri bildirim vermek istiyorum",
    icon: "🎮",
  },
];

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleRole = (roleId: string) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleSubmit = async () => {
    if (selectedRoles.length === 0) {
      toast.error("Lütfen en az bir rol seçin");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement role selection logic
      toast.success("Roller başarıyla kaydedildi!");
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error) {
      toast.error("Roller kaydedilirken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl space-y-8 p-8 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 shadow-2xl"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
            Rol Seçimi
          </h2>
          <p className="mt-2 text-gray-400">
            Lütfen size uygun rolleri seçin (Birden fazla seçebilirsiniz)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <motion.div
              key={role.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                selectedRoles.includes(role.id)
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-gray-700 hover:border-purple-500/50"
              }`}
              onClick={() => toggleRole(role.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{role.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-gray-400">{role.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
          disabled={isLoading || selectedRoles.length === 0}
        >
          {isLoading ? "Kaydediliyor..." : "Kaydet ve Devam Et"}
        </Button>
      </motion.div>
    </div>
  );
}
