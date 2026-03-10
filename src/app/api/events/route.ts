import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("natitude");
    
    // Fetches all rituals, sorted by date
    const events = await db.collection("events").find({}).toArray();

    return NextResponse.json(events);
  } catch (error) {
    console.error("Events Fetch Error:", error);
    return NextResponse.json({ error: "Failed to load rituals" }, { status: 500 });
  }
}