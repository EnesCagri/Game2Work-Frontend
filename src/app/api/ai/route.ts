import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// API key is secure in environment variable
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      { error: "Failed to process AI request" },
      { status: 500 }
    );
  }
}
