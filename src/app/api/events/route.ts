import { NextResponse } from "next/server";
import eventsData from "@/data/events.json";

export async function GET() {
  try {
    return NextResponse.json(eventsData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newEvent = {
      id: eventsData.events.length + 1,
      ...body,
    };

    // In a real application, you would save this to a database
    // For now, we'll just return the new event
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
