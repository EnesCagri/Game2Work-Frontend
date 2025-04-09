"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { motion } from "framer-motion";
import { db } from "@/lib/db";

interface Achievement {
  id: number;
  name: string;
  icon: string;
  description: string;
}

interface Investor {
  id: number;
  name: string;
  type: string;
  level: number;
  image: string;
  description: string;
  investments: number;
  totalFunds: number;
  achievements: Achievement[];
  focus: string[];
  location: string;
  founded: string;
}

const investorTypes = [
  "Venture Capital",
  "Private Equity",
  "Angel Network",
  "Corporate Venture",
] as const;

const levelColors = {
  1: "bg-gray-500",
  2: "bg-green-500",
  3: "bg-blue-500",
  4: "bg-purple-500",
  5: "bg-yellow-500",
};

export default function InvestorsList() {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const investorsPerPage = 4;

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        // TODO: Replace with actual API call
        const data = await db.getInvestors();
        setInvestors(data as Investor[]);
      } catch (error) {
        console.error("Error fetching investors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestors();
  }, []);

  const filteredInvestors = investors.filter((investor) => {
    const matchesSearch = investor.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      selectedType === "all" || investor.type === selectedType;
    const matchesLevel =
      selectedLevel === "all" || investor.level.toString() === selectedLevel;
    return matchesSearch && matchesType && matchesLevel;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredInvestors.length / investorsPerPage);
  const indexOfLastInvestor = currentPage * investorsPerPage;
  const indexOfFirstInvestor = indexOfLastInvestor - investorsPerPage;
  const currentInvestors = filteredInvestors.slice(
    indexOfFirstInvestor,
    indexOfLastInvestor
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-black" />
      <GradientOrb
        color="#3b82f6"
        position="top-right"
        size="sm"
        opacity={0.08}
      />
      <GradientOrb
        color="#06b6d4"
        position="bottom-left"
        size="sm"
        opacity={0.08}
      />

      <div className="container relative z-10 mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Investors</h1>
          <p className="text-gray-400">
            Discover our network of gaming industry investors
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search investors..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
          <div className="flex gap-4">
            <Select
              value={selectedType}
              onValueChange={(value) => {
                setSelectedType(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Investor Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {investorTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedLevel}
              onValueChange={(value) => {
                setSelectedLevel(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {[1, 2, 3, 4, 5].map((level) => (
                  <SelectItem key={level} value={level.toString()}>
                    Level {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Investors List */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : filteredInvestors.length === 0 ? (
          <div className="text-center text-gray-400">
            No investors found matching your criteria
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {currentInvestors.map((investor) => (
                <motion.div
                  key={investor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-lg overflow-hidden">
                      <Image
                        src={investor.image}
                        alt={investor.name}
                        fill
                        className="object-cover"
                      />
                      <div
                        className={`absolute top-2 right-2 px-2 py-1 rounded-full text-white text-sm ${
                          levelColors[
                            investor.level as keyof typeof levelColors
                          ]
                        }`}
                      >
                        Level {investor.level}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h2 className="text-2xl font-bold">{investor.name}</h2>
                        <Badge variant="outline">{investor.type}</Badge>
                      </div>
                      <p className="text-gray-400 mb-4">
                        {investor.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-2xl font-bold">
                            {investor.investments}
                          </div>
                          <div className="text-gray-400">Investments</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">
                            ${(investor.totalFunds / 1000000).toFixed(0)}M
                          </div>
                          <div className="text-gray-400">Total Funds</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">
                            {investor.location}
                          </div>
                          <div className="text-gray-400">Location</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">
                            {investor.founded}
                          </div>
                          <div className="text-gray-400">Founded</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {investor.focus.map((area) => (
                          <Badge key={area} variant="secondary">
                            {area}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {investor.achievements.map((achievement) => (
                          <Badge
                            key={achievement.id}
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <span>{achievement.icon}</span>
                            <span>{achievement.name}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  )
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
