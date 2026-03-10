import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("natitude_db");
    const body = await request.json();

    // Basic validation
    if (!body.email || !body.fullName) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const result = await db.collection("members").insertOne({
      ...body,
      status: "pending", // You can approve them later
      appliedAt: new Date()
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (e) {
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}