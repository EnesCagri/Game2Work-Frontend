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
    const blogId = parseInt(params.id);

    // Get all blogs
    const blogs = await db.getBlogs();
    const blog = blogs.find((b) => b.id === blogId);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Increment likes
    blog.likes = (blog.likes || 0) + 1;

    // Save updated blogs data
    await saveBlogsData(blogs);

    return NextResponse.json({ likes: blog.likes });
  } catch (error) {
    console.error("Error updating likes:", error);
    return NextResponse.json(
      { error: "Failed to update likes" },
      { status: 500 }
    );
  }
}

// Add endpoint to handle unliking if needed
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const blogId = parseInt(params.id);

    // Get all blogs
    const blogs = await db.getBlogs();
    const blog = blogs.find((b) => b.id === blogId);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Decrement likes, but don't go below 0
    blog.likes = Math.max(0, (blog.likes || 0) - 1);

    // Save updated blogs data
    await saveBlogsData(blogs);

    return NextResponse.json({ likes: blog.likes });
  } catch (error) {
    console.error("Error updating likes:", error);
    return NextResponse.json(
      { error: "Failed to update likes" },
      { status: 500 }
    );
  }
}
