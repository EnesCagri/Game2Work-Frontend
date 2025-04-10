import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import fs from "fs";
import path from "path";

// Helper function to save blogs data
const saveBlogsData = async (blogs: any[]) => {
  const blogsPath = path.join(process.cwd(), "src", "data", "db", "blogs.json");
  await fs.promises.writeFile(blogsPath, JSON.stringify(blogs, null, 2));
};

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { author, content } = await request.json();
    const blogId = parseInt(params.id);

    // Validate required fields
    if (!author || !content) {
      return NextResponse.json(
        { error: "Author and content are required" },
        { status: 400 }
      );
    }

    // Get all blogs
    const blogs = await db.getBlogs();
    const blog = blogs.find((b) => b.id === blogId);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Create new comment
    const newComment = {
      id: blog.comments.length + 1,
      author,
      avatar: "/avatars/default.png", // You can customize this
      content,
      date: new Date().toISOString(),
      likes: 0,
    };

    // Add comment to blog
    blog.comments.push(newComment);

    // Save updated blogs data
    await saveBlogsData(blogs);

    return NextResponse.json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}
