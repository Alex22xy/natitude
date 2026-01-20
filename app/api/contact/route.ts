import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    // 1. Setup the transporter (Your "Mail Server")
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'natituebars@gmail.com',
        // You'll need a "Gmail App Password" here, not your regular password
        pass: process.env.EMAIL_APP_PASSWORD, 
      },
    });

    // 2. Setup the email content
    const mailOptions = {
      from: email,
      to: 'natituebars@gmail.com',
      subject: `New Tribe Inquiry from ${email}`,
      text: message,
      html: `
        <div style="background: #000; color: #fff; padding: 20px; border: 1px solid #FF00FF;">
          <h2 style="color: #FF00FF;">New Message from Natitude</h2>
          <p><strong>Sender:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}