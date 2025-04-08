"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Users, Gamepad, Banknote, Briefcase } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 5000,
    label: "Kayıtlı Geliştirici",
    color: "from-blue-600 to-blue-400",
    iconColor: "text-blue-500",
    suffix: "+",
  },
  {
    icon: Gamepad,
    value: 1200,
    label: "Toplam Proje",
    color: "from-purple-600 to-purple-400",
    iconColor: "text-purple-500",
    suffix: "+",
  },
  {
    icon: Banknote,
    value: 750000,
    label: "Toplam Yatırım",
    color: "from-green-600 to-green-400",
    iconColor: "text-green-500",
    prefix: "$",
  },
  {
    icon: Briefcase,
    value: 300,
    label: "Aktif İş İlanı",
    color: "from-red-600 to-red-400",
    iconColor: "text-red-500",
    suffix: "+",
  },
];

const Statistics = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-black/90" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Rakamlarla GameToWork</h2>
          <p className="text-gray-400">
            Join our growing community of gamers and professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative group">
                  {/* Glowing background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}
                  />

                  {/* Card */}
                  <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors duration-300">
                    {/* Icon */}
                    <div className="mb-4">
                      <Icon className={`w-8 h-8 ${stat.iconColor}`} />
                    </div>

                    {/* Number */}
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        separator=","
                        prefix={stat.prefix || ""}
                        suffix={stat.suffix || ""}
                      />
                    </div>

                    {/* Label */}
                    <div className="text-gray-400 text-lg">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
