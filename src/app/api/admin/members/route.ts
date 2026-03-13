import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const cookieStore = cookies();
  const session = cookieStore.get('admin_session');

  // If the secret cookie is missing, block the data
  if (!session || session.value !== 'authenticated') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("natitude");
    const members = await db.collection("members").find({}).sort({ appliedAt: -1 }).toArray();
    return NextResponse.json(members);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}