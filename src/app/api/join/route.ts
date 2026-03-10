import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("natitude");
    const body = await req.json();

    // 1. SAVE TO DATABASE
    await db.collection("members").insertOne({
      fullName: body.fullName,
      email: body.email,
      instagram: body.instagram,
      status: 'pending',
      appliedAt: new Date(),
    });

    // 2. SEND THE WELCOME EMAIL (The Transmission)
    await resend.emails.send({
      from: 'NATITUDE <onboarding@resend.dev>', // Update this once your domain is verified
      to: body.email, 
      subject: 'TRANSMISSION RECEIVED // NATITUDE',
      html: `
        <div style="background-color: #000; color: #fff; padding: 50px 20px; font-family: 'Courier New', Courier, monospace; text-align: center; border: 1px solid #333;">
          <h1 style="color: #fff; letter-spacing: 10px; margin-bottom: 40px; font-size: 24px;">NATITUDE</h1>
          
          <div style="max-width: 500px; margin: 0 auto; text-align: left; line-height: 1.6; font-size: 14px;">
            <p>Greetings, ${body.fullName}.</p>
            
            <p>Your transmission has been received and safely encrypted within the Jungle Archives.</p>
            
            <p>The tribe is now reviewing the latest wave of seekers. While the signal clears, stay tuned to your frequency — further instructions will be transmitted soon.</p>
            
            <p>Until then...</p>
            
            <p>Stay wild.<br>Stay connected.</p>
            
            <p style="margin-top: 40px; color: #666;">— NATITUDE</p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("JOIN_ERROR:", error.message);
    return NextResponse.json({ error: "Transmission Interrupted" }, { status: 500 });
  }
}