import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    // We explicitly tell it to use "natitude"
    const db = client.db("natitude"); 
    const body = await req.json();

    // Now it will create "members" inside "natitude"
    const result = await db.collection("members").insertOne({
      ...body,
      appliedAt: new Date()
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error: any) {
    // This will help us see exactly what went wrong in the Vercel logs
    console.error("Database error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}