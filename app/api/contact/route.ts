import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Destructure the exact fields from your Join and VIP forms
    const { name, email, instagram, telephone, zone } = body;

    const { data, error } = await resend.emails.send({
      from: 'Natitude <onboarding@resend.dev>',
      to: ['alex.john.norton9@gmail.com'], // Change to your actual email
      subject: `🌿 New Tribe Inquiry: ${name}`,
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif; border: 2px solid #FF00FF; border-radius: 20px;">
          <h1 style="color: #FF00FF; text-transform: uppercase; font-style: italic;">New Application</h1>
          <hr style="border: 0; border-top: 1px solid #222; margin: 20px 0;" />
          
          <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
          <p style="font-size: 16px;"><strong>Instagram:</strong> <a href="https://instagram.com/${instagram?.replace('@', '')}" style="color: #FF00FF; text-decoration: none;">${instagram}</a></p>
          <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
          
          ${telephone ? `<p style="font-size: 16px;"><strong>Phone:</strong> ${telephone}</p>` : ''}
          ${zone ? `<p style="font-size: 16px; color: #FF00FF;"><strong>Requested VIP Zone:</strong> ${zone}</p>` : ''}
          
          <div style="margin-top: 40px; font-size: 10px; color: #555; text-transform: uppercase; tracking: 2px;">
            Sent from Natitude Digital Ecosystem / 2026
          </div>
        </div>
      `,
    });

    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}