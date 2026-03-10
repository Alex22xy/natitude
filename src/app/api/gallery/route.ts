import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("natitude");
    
    // This fetches all items from the 'gallery' collection
    const gallery = await db.collection("gallery").find({}).toArray();

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Gallery Fetch Error:", error);
    return NextResponse.json({ error: "Failed to load artifacts" }, { status: 500 });
  }
}