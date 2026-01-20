import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/client';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();
    
    // Check the connection state
    // 1 = connected, 2 = connecting, 3 = disconnecting, 0 = disconnected
    const status = mongoose.connection.readyState;
    
    const statusMap = {
      0: "Disconnected ❌",
      1: "Connected ✅",
      2: "Connecting ⏳",
      3: "Disconnecting ⚠️",
    };

    return NextResponse.json({ 
      message: "Natitude Database Status", 
      status: statusMap[status as keyof typeof statusMap],
      database: mongoose.connection.name 
    });
  } catch (error) {
    return NextResponse.json({ 
      message: "Database Connection Failed", 
      error: error instanceof Error ? error.message : "Unknown Error" 
    }, { status: 500 });
  }
}