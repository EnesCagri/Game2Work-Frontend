import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const blog = await request.json();

    // Create the blog in memory
    const newBlog = await db.createBlog(blog);

    // Update the blogs.json file
    const blogsPath = path.join(
      process.cwd(),
      "src",
      "data",
      "db",
      "blogs.json"
    );
    const blogs = await db.getBlogs();

    fs.writeFileSync(blogsPath, JSON.stringify(blogs, null, 2));

    return NextResponse.json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
