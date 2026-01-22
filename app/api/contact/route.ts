import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// This initializes the mail service using your secret key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    await resend.emails.send({
      from: 'Natitude Web <onboarding@resend.dev>', 
      to: 'natituebars@gmail.com',
      reply_to: email, // This is what lets you click "Reply" in Gmail
      subject: `🌿 New Inquiry: ${email}`,
      html: `
        <div style="background-color: #000; color: #fff; padding: 30px; font-family: sans-serif; border: 1px solid #FF00FF; border-radius: 15px;">
          <h2 style="color: #FF00FF; text-transform: uppercase;">New Tribe Message</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #111; padding: 15px; border-radius: 10px;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}