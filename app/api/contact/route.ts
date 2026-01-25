import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Initialize Resend inside the POST function or at the top level
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    const data = await resend.emails.send({
      from: 'Natitude <onboarding@resend.dev>',
      to: 'natitudebars@gmail.com',
      replyTo: email,
      subject: `🌿 New Tribe Inquiry: ${email}`,
      html: `
        <div style="background-color: #000; color: #fff; padding: 30px; font-family: sans-serif; border: 1px solid #FF00FF; border-radius: 15px;">
          <h2 style="color: #FF00FF; text-transform: uppercase; letter-spacing: 2px;">New Tribe Message</h2>
          <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
          <p><strong>Sender:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #111; padding: 15px; border-radius: 10px; border: 1px solid #222;">
            ${message}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, id: data.data?.id });
  } catch (error: any) {
    console.error("Resend Error:", error);
    return NextResponse.json({ error: error.message || 'Failed to send' }, { status: 500 });
  }
}