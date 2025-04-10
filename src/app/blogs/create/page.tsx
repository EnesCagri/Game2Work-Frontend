"use client";

import React from "react";
import { useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image as TiptapImage } from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Undo,
  Redo,
  Save,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { db } from "@/lib/db";
import NextImage from "next/image";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const addImage = useCallback(() => {
    const url = window.prompt("Enter image URL");
    if (url) {
      if (!url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        toast.error(
          "Please enter a valid image URL (jpg, jpeg, png, gif, webp)"
        );
        return;
      }
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    const url = window.prompt("Enter URL");
    if (url) {
      if (!url.match(/^https?:\/\//i)) {
        toast.error(
          "Please enter a valid URL starting with http:// or https://"
        );
        return;
      }
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-gray-800">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-gray-800" : ""}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-gray-800" : ""}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 }) ? "bg-gray-800" : ""
        }
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 }) ? "bg-gray-800" : ""
        }
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 }) ? "bg-gray-800" : ""
        }
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-gray-800" : ""}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-gray-800" : ""}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "bg-gray-800" : ""}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "bg-gray-800" : ""}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={addImage}>
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={addLink}>
        <LinkIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default function CreateBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [coverImage, setCoverImage] = useState("/blogs/default.jpg");
  const [isImageValid, setIsImageValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [publishStatus, setPublishStatus] = useState<
    "idle" | "publishing" | "success" | "error"
  >("idle");
  const [showPreview, setShowPreview] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapImage.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-400 hover:text-blue-300",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your blog post...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none p-4 min-h-[400px] focus:outline-none",
      },
    },
  });

  const validateImageUrl = (url: string) => {
    const isValid = Boolean(url.match(/\.(jpg|jpeg|png|gif|webp)$/i));
    setIsImageValid(isValid);
    return isValid;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setCoverImage(url);
    validateImageUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!topic) {
      toast.error("Please select a topic");
      return;
    }

    if (!editor?.getHTML() || editor.getHTML() === "<p></p>") {
      toast.error("Please enter some content");
      return;
    }

    if (!isImageValid) {
      toast.error(
        "Please enter a valid image URL (jpg, jpeg, png, gif, or webp)"
      );
      return;
    }

    setShowPreview(true);
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

  const handlePublish = async () => {
    if (!editor) return;

    setIsSubmitting(true);
    setPublishStatus("publishing");
    const loadingToast = toast.loading("Publishing your blog post...");

    try {
      const content = editor.getHTML();
      const formattedContent = formatContent(content);
      const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);

      const blogData = {
        title,
        author: "Current User",
        authorAvatar: "/avatars/default.png",
        date: new Date().toISOString(),
        image: coverImage,
        topic,
        readTime: `${readTime} min read`,
        excerpt: content.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
        content: formattedContent,
        tags: [topic],
      };

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        throw new Error("Failed to create blog");
      }

      const newBlog = await response.json();

      setPublishStatus("success");
      toast.dismiss(loadingToast);
      toast.success("Blog post published successfully!");

      setTimeout(() => {
        router.push(`/blogs/${newBlog.id}`);
      }, 1500);
    } catch (error) {
      console.error("Error creating blog:", error);
      setPublishStatus("error");
      toast.dismiss(loadingToast);

      if (error instanceof Error) {
        toast.error(`Failed to publish blog: ${error.message}`);
      } else {
        toast.error("Failed to publish blog post. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewData = {
    author: "Current User",
    readTime: `${Math.ceil(
      (editor?.getText().split(/\s+/).length || 0) / 200
    )} min read`,
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create New Blog Post
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showPreview ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your blog post title"
                  className="bg-gray-800 border-gray-700"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  value={coverImage}
                  onChange={handleImageChange}
                  placeholder="Enter image URL (jpg, jpeg, png, gif, webp)"
                  className="bg-gray-800 border-gray-700"
                  disabled={isSubmitting}
                />
                {coverImage && (
                  <div className="mt-4 relative h-[200px] rounded-lg overflow-hidden">
                    <NextImage
                      src={coverImage}
                      alt="Cover preview"
                      fill
                      className="object-cover"
                      onError={() => setIsImageValid(false)}
                      onLoad={() => setIsImageValid(true)}
                    />
                  </div>
                )}
                {!isImageValid && (
                  <p className="text-red-500 text-sm mt-1">
                    Please enter a valid image URL (jpg, jpeg, png, gif, or
                    webp)
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Select
                  value={topic}
                  onValueChange={setTopic}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="game-development">
                      Game Development
                    </SelectItem>
                    <SelectItem value="industry-news">Industry News</SelectItem>
                    <SelectItem value="career-tips">Career Tips</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <div className="border border-gray-800 rounded-lg overflow-hidden">
                  <MenuBar editor={editor} />
                  <EditorContent editor={editor} />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPreview(true)}
                >
                  Preview
                </Button>
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  Next: Preview
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="prose prose-invert max-w-none">
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                  <span>By {previewData.author}</span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{previewData.readTime}</span>
                </div>
                {coverImage && (
                  <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
                    <NextImage
                      src={coverImage}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: editor?.getHTML()
                      ? formatContent(editor.getHTML())
                      : "",
                  }}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Back to Edit
                </Button>
                <Button
                  onClick={handlePublish}
                  className="gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Publishing...
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Publish Blog
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
