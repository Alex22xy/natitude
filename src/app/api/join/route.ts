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

    // 2. SEND THE ENCRYPTED TRANSMISSION (Welcome Email)
    await resend.emails.send({
      from: 'NATITUDE <onboarding@resend.dev>', // Change to 'tribe@yourdomain.com' once verified
      to: body.email, 
      subject: 'TRANSMISSION RECEIVED // NATITUDE',
      html: `
        <div style="background-color: #000; color: #fff; padding: 60px 20px; font-family: 'Courier New', Courier, monospace; line-height: 1.5;">
          <div style="max-width: 600px; margin: 0 auto; border: 1px solid #333; padding: 40px;">
            <h1 style="text-align: center; letter-spacing: 12px; margin-bottom: 50px; font-size: 20px; font-weight: normal; color: #fff;">NATITUDE</h1>
            
            <p style="margin-bottom: 25px;">Greetings, ${body.fullName}.</p>
            
            <p style="margin-bottom: 25px;">Your transmission has been received and safely encrypted within the Jungle Archives.</p>
            
            <p style="margin-bottom: 25px;">The tribe is now reviewing the latest wave of seekers. While the signal clears, stay tuned to your frequency — further instructions will be transmitted soon.</p>
            
            <p style="margin-bottom: 10px;">Until then...</p>
            
            <p style="margin-bottom: 0;">Stay wild.</p>
            <p style="margin-top: 0;">Stay connected.</p>
            
            <p style="margin-top: 50px; opacity: 0.6; font-size: 12px; letter-spacing: 2px;">— NATITUDE</p>
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