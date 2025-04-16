"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Code2, ArrowRight, ChevronDown } from "lucide-react";
import { GradientOrb } from "@/components/ui/gradient-orb";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type CodeExample = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  likes: number;
  views: number;
  coverImage: string;
};

const codeExamples: CodeExample[] = [
  {
    id: "1",
    title: "Unity'de El Bombası Scripti",
    description:
      "Unity'de gerçekçi el bombası fırlatma ve patlama sistemini fizik ve parçacık efektleriyle nasıl oluşturacağınızı öğrenin.",
    category: "Oynanış",
    difficulty: "intermediate",
    tags: ["Unity", "Fizik", "Parçacıklar", "C#"],
    author: {
      name: "Ahmet Yılmaz",
      avatar: "/akura.png",
    },
    createdAt: "2024-03-15",
    likes: 45,
    views: 120,
    coverImage: "/Codes/GrandeTutorial/granade1.png",
  },
  {
    id: "2",
    title: "Açlık & Hayatta Kalma Sistemi",
    description:
      "Durum efektleri, UI göstergeleri ve kaynak yönetimi içeren eksiksiz bir açlık ve hayatta kalma sistemi oluşturun.",
    category: "Oynanış",
    difficulty: "intermediate",
    tags: ["Unity", "Sistemler", "UI", "C#"],
    author: {
      name: "Lisa Thompson",
      avatar: "/crown.png",
    },
    createdAt: "2024-03-14",
    likes: 38,
    views: 95,
    coverImage: "/crown.png",
  },
  {
    id: "3",
    title: "Envanter Sistemi",
    description:
      "Sürükle-bırak işlevselliği, eşya istifleme ve ekipman yuvaları içeren esnek bir envanter sistemi oluşturun.",
    category: "Sistemler",
    difficulty: "advanced",
    tags: ["Unity", "UI", "Envanter", "C#"],
    author: {
      name: "James Carter",
      avatar: "/deathpizza.png",
    },
    createdAt: "2024-03-13",
    likes: 52,
    views: 150,
    coverImage: "/deathpizza.png",
  },
  {
    id: "4",
    title: "Gündüz-Gece Döngüsü",
    description:
      "Yumuşak geçişler ve çevresel efektlerle dinamik bir gündüz-gece döngüsü sistemi oluşturun.",
    category: "Çevre",
    difficulty: "beginner",
    tags: ["Unity", "Işıklandırma", "Zaman", "C#"],
    author: {
      name: "Sophie Martinez",
      avatar: "/akura.png",
    },
    createdAt: "2024-03-12",
    likes: 28,
    views: 80,
    coverImage: "/akura.png",
  },
  {
    id: "5",
    title: "Yapay Zeka Yol Bulma",
    description:
      "A* algoritması kullanarak dinamik engel kaçınma özellikli verimli bir yapay zeka yol bulma sistemi oluşturun.",
    category: "Yapay Zeka",
    difficulty: "advanced",
    tags: ["Unity", "Yapay Zeka", "Yol Bulma", "C#"],
    author: {
      name: "Alex Chen",
      avatar: "/crown.png",
    },
    createdAt: "2024-03-11",
    likes: 41,
    views: 110,
    coverImage: "/crown.png",
  },
  {
    id: "6",
    title: "Kaydetme & Yükleme Sistemi",
    description:
      "Karmaşık oyun durumlarını ve oyuncu ilerlemesini yöneten sağlam bir kaydetme ve yükleme sistemi oluşturun.",
    category: "Sistemler",
    difficulty: "intermediate",
    tags: ["Unity", "Veri", "Serileştirme", "C#"],
    author: {
      name: "Maria Garcia",
      avatar: "/deathpizza.png",
    },
    createdAt: "2024-03-10",
    likes: 35,
    views: 90,
    coverImage: "/deathpizza.png",
  },
];

const categories = [
  "Tümü",
  "Oynanış",
  "Sistemler",
  "Çevre",
  "Yapay Zeka",
  "UI",
  "Ağ",
  "Optimizasyon",
];

const difficulties = [
  { value: "all", label: "Tüm Seviyeler" },
  { value: "beginner", label: "Başlangıç" },
  { value: "intermediate", label: "Orta" },
  { value: "advanced", label: "İleri" },
];

export default function CodeLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [filteredExamples, setFilteredExamples] = useState(codeExamples);

  useEffect(() => {
    const filtered = codeExamples.filter((example) => {
      const matchesSearch =
        searchQuery === "" ||
        example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        example.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        example.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "Tümü" || example.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === "all" ||
        example.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    setFilteredExamples(filtered);
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="min-h-screen bg-gray-950">
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

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-700 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
            Kod Kütüphanesi
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Oyun geliştirme kod örnekleri, öğreticiler ve yeniden kullanılabilir
            sistemler koleksiyonumuza göz atın. Pratik uygulamalardan öğrenin ve
            projelerinize entegre edin.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Kod örneklerinde ara..."
                className="pl-10 bg-gray-900/50 border-gray-800 h-11 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 hover:border-gray-700 h-11 px-4 min-w-[140px] flex items-center justify-between"
                  >
                    <span className="text-gray-300">{selectedCategory}</span>
                    <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border-gray-800">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      className={`text-gray-300 hover:bg-gray-800 focus:bg-gray-800 cursor-pointer ${
                        selectedCategory === category ? "bg-gray-800" : ""
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 hover:border-gray-700 h-11 px-4 min-w-[140px] flex items-center justify-between"
                  >
                    <span className="text-gray-300">
                      {
                        difficulties.find((d) => d.value === selectedDifficulty)
                          ?.label
                      }
                    </span>
                    <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border-gray-800">
                  {difficulties.map((difficulty) => (
                    <DropdownMenuItem
                      key={difficulty.value}
                      className={`text-gray-300 hover:bg-gray-800 focus:bg-gray-800 cursor-pointer ${
                        selectedDifficulty === difficulty.value
                          ? "bg-gray-800"
                          : ""
                      }`}
                      onClick={() => setSelectedDifficulty(difficulty.value)}
                    >
                      {difficulty.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory !== "Tümü" ||
            selectedDifficulty !== "all" ||
            searchQuery) && (
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="text-gray-400">Aktif Filtreler:</span>
              {selectedCategory !== "Tümü" && (
                <Badge
                  variant="outline"
                  className="bg-blue-900/20 border-blue-500/50 text-blue-400 px-3 py-1"
                >
                  {selectedCategory}
                </Badge>
              )}
              {selectedDifficulty !== "all" && (
                <Badge
                  variant="outline"
                  className={
                    selectedDifficulty === "beginner"
                      ? "bg-green-900/20 border-green-500/50 text-green-400"
                      : selectedDifficulty === "intermediate"
                      ? "bg-yellow-900/20 border-yellow-500/50 text-yellow-400"
                      : "bg-red-900/20 border-red-500/50 text-red-400"
                  }
                >
                  {
                    difficulties.find((d) => d.value === selectedDifficulty)
                      ?.label
                  }
                </Badge>
              )}
              {searchQuery && (
                <Badge
                  variant="outline"
                  className="bg-purple-900/20 border-purple-500/50 text-purple-400 px-3 py-1"
                >
                  "{searchQuery}"
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-gray-300"
                onClick={() => {
                  setSelectedCategory("Tümü");
                  setSelectedDifficulty("all");
                  setSearchQuery("");
                }}
              >
                Filtreleri Temizle
              </Button>
            </div>
          )}
        </div>

        {/* No Results Message */}
        {filteredExamples.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">Sonuç bulunamadı</div>
            <Button
              variant="outline"
              size="sm"
              className="text-gray-400 hover:text-gray-300"
              onClick={() => {
                setSelectedCategory("Tümü");
                setSelectedDifficulty("all");
                setSearchQuery("");
              }}
            >
              Filtreleri Temizle
            </Button>
          </div>
        )}

        {/* Code Examples Grid */}
        {filteredExamples.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExamples.map((example) => (
              <motion.div
                key={example.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gray-900/50 border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
                  <div className="relative aspect-video">
                    <Image
                      src={example.coverImage}
                      alt={example.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        variant="outline"
                        className={
                          example.difficulty === "beginner"
                            ? "bg-green-900/20 border-green-500/50 text-green-400"
                            : example.difficulty === "intermediate"
                            ? "bg-yellow-900/20 border-yellow-500/50 text-yellow-400"
                            : "bg-red-900/20 border-red-500/50 text-red-400"
                        }
                      >
                        {example.difficulty === "beginner"
                          ? "Başlangıç"
                          : example.difficulty === "intermediate"
                          ? "Orta"
                          : "İleri"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-blue-900/20 border-blue-500/50 text-blue-400"
                      >
                        {example.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {example.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {example.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={example.author.avatar}
                          alt={example.author.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm text-gray-400">
                          {example.author.name}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-400 hover:text-blue-300"
                        asChild
                      >
                        <Link href={`/code-library/${example.id}`}>
                          Detayları Gör
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
