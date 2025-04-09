"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { motion } from "framer-motion";
import { db } from "@/lib/db";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Blog {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  topic: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  content: string;
}

const topicColors = {
  "Game Development": "bg-blue-500/10 text-blue-500",
  "Industry News": "bg-green-500/10 text-green-500",
  "Career Tips": "bg-purple-500/10 text-purple-500",
  Technology: "bg-red-500/10 text-red-500",
  Education: "bg-yellow-500/10 text-yellow-500",
  Community: "bg-pink-500/10 text-pink-500",
};

const topics = Object.keys(topicColors);
const tags = [
  "Unity",
  "Unreal Engine",
  "Web3",
  "Mobile Games",
  "PC Games",
  "Console Games",
  "Indie Games",
  "Game Design",
  "Programming",
  "Art & Design",
  "Sound Design",
  "Marketing",
  "Business",
];

export default function BlogsList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // TODO: Replace with actual API call
        const data = await db.getBlogs();
        setBlogs(data as Blog[]);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic =
      selectedTopics.length === 0 || selectedTopics.includes(blog.topic);
    const matchesTags =
      selectedTags.length === 0 ||
      blog.tags.some((tag) => selectedTags.includes(tag));
    return matchesSearch && matchesTopic && matchesTags;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-black " />
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
          <h1 className="text-4xl font-bold mb-4">Blogs</h1>
          <p className="text-gray-400">
            Stay updated with the latest in gaming and technology
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[80vh]">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Topics</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {topics.map((topic) => (
                    <div key={topic} className="flex items-center space-x-2">
                      <Checkbox
                        id={topic}
                        checked={selectedTopics.includes(topic)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTopics([...selectedTopics, topic]);
                          } else {
                            setSelectedTopics(
                              selectedTopics.filter((t) => t !== topic)
                            );
                          }
                          setCurrentPage(1);
                        }}
                      />
                      <Label htmlFor={topic}>{topic}</Label>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="grid grid-cols-2 gap-4">
                  {tags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={tag}
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTags([...selectedTags, tag]);
                          } else {
                            setSelectedTags(
                              selectedTags.filter((t) => t !== tag)
                            );
                          }
                          setCurrentPage(1);
                        }}
                      />
                      <Label htmlFor={tag}>{tag}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center text-gray-400">
            No blogs found matching your criteria
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blogs/${blog.id}`}
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors"
                  >
                    <div className="relative h-48">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                      <div
                        className={`absolute top-2 left-2 px-2 py-1 rounded-full text-sm ${
                          topicColors[blog.topic as keyof typeof topicColors]
                        }`}
                      >
                        {blog.topic}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <span>{blog.author}</span>
                        <span>•</span>
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>
                      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                      <p className="text-gray-400 mb-4">{blog.excerpt}</p>
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Link>
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
