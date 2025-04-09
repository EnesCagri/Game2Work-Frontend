import { NextResponse } from "next/server";
import { courses } from "@/data/db";

export async function GET() {
  try {
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
