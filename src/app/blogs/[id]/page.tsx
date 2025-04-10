"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { motion } from "framer-motion";
import { db } from "@/lib/db";
import {
  Heart,
  MessageCircle,
  Share2,
  Clock,
  Calendar,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

const formatContent = (content: string) => {
  return content
    .replace(/<p><strong>/g, '<p class="font-bold mb-4">')
    .replace(/<strong>/g, '<span class="font-bold">')
    .replace(/<\/strong>/g, "</span>")
    .replace(/<p>/g, '<p class="mb-4">')
    .replace(/<h1>/g, '<h1 class="text-3xl font-bold mb-4">')
    .replace(/<h2>/g, '<h2 class="text-2xl font-bold mb-3">')
    .replace(/<h3>/g, '<h3 class="text-xl font-bold mb-2">')
    .replace(/<ul>/g, '<ul class="list-disc pl-6 mb-4">')
    .replace(/<ol>/g, '<ol class="list-decimal pl-6 mb-4">')
    .replace(/<li>/g, '<li class="mb-2">')
    .replace(
      /<blockquote>/g,
      '<blockquote class="border-l-4 border-gray-600 pl-4 italic mb-4">'
    )
    .replace(/<code>/g, '<code class="bg-gray-800 px-1 py-0.5 rounded">')
    .replace(
      /<pre>/g,
      '<pre class="bg-gray-800 p-4 rounded-lg mb-4 overflow-x-auto">'
    )
    .replace(/<img/g, '<img class="rounded-lg max-w-full h-auto mb-4"')
    .replace(/<a /g, '<a class="text-blue-400 hover:text-blue-300" ');
};

export default function BlogDetail() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogId = Number(params.id);
        const data = await db.getBlogById(blogId);
        if (data) {
          setBlog({
            ...data,
            authorAvatar: `/authors/${data.author
              .toLowerCase()
              .replace(/\s+/g, "-")}.jpg`,
            likes: 0,
            comments: data.comments || [],
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
        } else {
          toast.error("Blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id]);

  const handleLike = async () => {
    if (!blog) return;

    try {
      const method = isLiked ? "DELETE" : "POST";
      const response = await fetch(`/api/blogs/${blog.id}/likes`, {
        method,
      });

      if (!response.ok) {
        throw new Error("Failed to update likes");
      }

      const data = await response.json();
      setBlog((prev) => (prev ? { ...prev, likes: data.likes } : null));
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error updating likes:", error);
      toast.error("Failed to update likes");
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog || !comment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/blogs/${blog.id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: "Current User", // You can customize this
          content: comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const newComment = await response.json();
      setBlog((prev) =>
        prev ? { ...prev, comments: [...prev.comments, newComment] } : null
      );
      setComment("");
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-800 rounded w-3/4"></div>
          <div className="h-4 bg-gray-800 rounded w-1/4"></div>
          <div className="h-96 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto py-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <p className="text-center text-gray-400">Blog not found</p>
          </CardContent>
        </Card>
      </div>
    );
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
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: formatContent(blog.content),
            }}
          />
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
            <Button
              variant={isLiked ? "default" : "outline"}
              size="sm"
              onClick={handleLike}
              className="gap-2"
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>

          {/* Comment Form */}
          <form onSubmit={handleComment} className="mb-8">
            <div className="space-y-4">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="min-h-[100px]"
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Post Comment"
                )}
              </Button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {blog.comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-800 pb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar>
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{comment.author}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(comment.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300">{comment.content}</p>
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
