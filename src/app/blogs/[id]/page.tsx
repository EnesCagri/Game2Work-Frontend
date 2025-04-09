"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { motion } from "framer-motion";
import { db } from "@/lib/db";
import { Heart, MessageCircle, Share2, Clock, Calendar } from "lucide-react";
import Link from "next/link";

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}

interface Blog {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  date: string;
  image: string;
  topic: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
  likes: number;
  comments: Comment[];
}

const topicColors = {
  "Game Development": "bg-blue-500/10 text-blue-500",
  "Industry News": "bg-green-500/10 text-green-500",
  "Career Tips": "bg-purple-500/10 text-purple-500",
  Technology: "bg-red-500/10 text-red-500",
  Education: "bg-yellow-500/10 text-yellow-500",
  Community: "bg-pink-500/10 text-pink-500",
};

export default function BlogDetail({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await db.getBlogById(Number(params.id));
        if (data) {
          setBlog({
            ...data,
            authorAvatar: `/authors/${data.author
              .toLowerCase()
              .replace(/\s+/g, "-")}.jpg`,
            likes: 0,
            comments: [],
          });

          // Fetch related blogs based on topic
          const related = await db.getBlogsByTopic(data.topic);
          setRelatedBlogs(
            related
              .filter((b) => b.id !== data.id)
              .slice(0, 2)
              .map((blog) => ({
                ...blog,
                authorAvatar: `/authors/${blog.author
                  .toLowerCase()
                  .replace(/\s+/g, "-")}.jpg`,
                likes: 0,
                comments: [],
              }))
          );
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id]);

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;

    // TODO: Implement comment submission
    console.log("Comment submitted:", comment);
    setComment("");
  };

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-center py-16">Blog not found</div>;
  }

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
        {/* Blog Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div
            className={`inline-block px-3 py-1 rounded-full text-sm mb-6 ${
              topicColors[blog.topic as keyof typeof topicColors]
            }`}
          >
            {blog.topic}
          </div>
          <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
          <div className="flex items-center gap-4 mb-8">
            <Avatar>
              <AvatarImage src={blog.authorAvatar} />
              <AvatarFallback>{blog.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{blog.author}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {blog.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {blog.readTime}
                </span>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Blog Content */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="prose prose-invert max-w-none">{blog.content}</div>
        </div>

        {/* Tags */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <Heart className="h-4 w-4" />
              {blog.likes} Likes
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              {blog.comments.length} Comments
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Comments */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8">Comments</h2>
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <Textarea
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-4"
            />
            <Button type="submit">Post Comment</Button>
          </form>
          <div className="space-y-6">
            {blog.comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{comment.author}</p>
                    <span className="text-sm text-gray-400">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-gray-300">{comment.content}</p>
                  <Button variant="ghost" size="sm" className="gap-2 mt-2">
                    <Heart className="h-4 w-4" />
                    {comment.likes}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  href={`/blogs/${relatedBlog.id}`}
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
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        fill
                        className="object-cover"
                      />
                      <div
                        className={`absolute top-2 left-2 px-2 py-1 rounded-full text-sm ${
                          topicColors[
                            relatedBlog.topic as keyof typeof topicColors
                          ]
                        }`}
                      >
                        {relatedBlog.topic}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {relatedBlog.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>{relatedBlog.author}</span>
                        <span>•</span>
                        <span>{relatedBlog.date}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
