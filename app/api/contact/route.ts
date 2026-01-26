import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, telephone, instagram, zone, type } = body;

    // Create a high-end summary for the email body
    const isVIP = type === "VIP_TABLE_REQUEST";
    const subjectLine = isVIP ? `🚨 VIP TABLE: ${zone} - ${name}` : `🌿 New Tribe Inquiry: ${name}`;

    const { data, error } = await resend.emails.send({
      from: 'Natitude <onboarding@resend.dev>', // Update this once domain is verified
      to: ['alex.john.norotn9@gmail.com'], // The email where you want to receive alerts
      subject: subjectLine,
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif; border: 1px solid #FF00FF;">
          <h1 style="color: #FF00FF; font-style: italic;">NEW TRIBE MESSAGE</h1>
          <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
          <p><strong>Sender:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${telephone}</p>
          <p><strong>Instagram:</strong> ${instagram}</p>
          ${zone ? `<p><strong>Requested Zone:</strong> <span style="color: #FF00FF;">${zone}</span></p>` : ''}
          <div style="margin-top: 30px; font-size: 10px; color: #444; text-transform: uppercase;">
            Sent from Natitude Digital Ecosystem
          </div>
        </div>
      `,
    });

    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ message: "Email Sent" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}