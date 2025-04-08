"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

type Member = {
  id: number;
  name: string;
  role: string;
  type: "developer" | "company" | "investor";
  image: string;
  description: string;
  link: string;
};

const members: Member[] = [
  {
    id: 1,
    name: "Peak Games",
    role: "Game Company",
    type: "company",
    image: "/companies/peak.jpg",
    description: "Türkiye'nin en büyük mobil oyun şirketi",
    link: "/companies/peak",
  },
  {
    id: 2,
    name: "Dream Games",
    role: "Game Company",
    type: "company",
    image: "/companies/dream.jpg",
    description: "Royal Match'in yaratıcısı",
    link: "/companies/dream",
  },
  {
    id: 3,
    name: "Ahmet Yılmaz",
    role: "Game Developer",
    type: "developer",
    image: "/developers/dev1.jpg",
    description: "Bağımsız Oyun Geliştirici",
    link: "/developers/ahmet",
  },
  // Add more members as needed
];

const CardStack = ({
  type,
  title,
}: {
  type: Member["type"];
  title: string;
}) => {
  const filteredMembers = members.filter((member) => member.type === type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative h-[500px] group"
    >
      <h3 className="text-2xl font-bold mb-6 text-center">{title}</h3>
      <div className="relative w-full h-full">
        {filteredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
            style={{
              zIndex: filteredMembers.length - index,
            }}
            initial={{
              rotate: -5 + index * 2,
              y: index * 10,
              scale: 1 - index * 0.05,
            }}
            whileHover={{
              rotate: -20 + index * 20,
              y: index * 40,
              scale: 0.95,
              transition: { duration: 0.3 },
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <div className="relative w-full h-full bg-gray-900/90 border border-gray-800 rounded-2xl overflow-hidden group/card">
              {/* Image */}
              <div className="relative w-full h-3/4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-xl font-semibold text-white mb-1">
                  {member.name}
                </h4>
                <p className="text-gray-400 text-sm mb-4">
                  {member.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full opacity-0 group-hover/card:opacity-100 transition-opacity"
                >
                  Profili Görüntüle
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const TopMembers = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
            Ekosistemimizin Öncüleri
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Game2Work'te öne çıkan oyun şirketleri, geliştiriciler ve
            yatırımcılarla tanışın.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <CardStack type="company" title="Öncü Şirketler" />
          <CardStack type="developer" title="Top Geliştiriciler" />
          <CardStack type="investor" title="Aktif Yatırımcılar" />
        </div>
      </div>
    </section>
  );
};

export default TopMembers;
