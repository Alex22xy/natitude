import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("natitude_db"); // Name of your DB in Atlas
    
    const events = await db.collection("events")
      .find({})
      .sort({ date: 1 })
      .toArray();

    return NextResponse.json(events);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch rituals" }, { status: 500 });
  }
}