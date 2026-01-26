import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Updated destructuring to match your new form exactly
    const { name, email, instagram, phone, tier } = body;

    const { data, error } = await resend.emails.send({
      from: 'Natitude <onboarding@resend.dev>',
      to: ['alex.john.norton9@gmail.com'], 
      subject: `🌿 ${tier === 'Standard' ? 'New Join Request' : 'PROMO CLAIMED'}: ${name}`,
      html: `
        <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif; border: 1px solid #333; border-radius: 30px; max-width: 600px; margin: auto;">
          <h1 style="color: #FF00FF; text-transform: uppercase; font-style: italic; letter-spacing: -1px; margin-bottom: 5px;">NATITUDE.</h1>
          <p style="color: #555; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 30px;">Member Application Registry</p>
          
          <div style="background: #111; padding: 25px; border-radius: 15px; border-left: 4px solid #FF00FF;">
            <p style="font-size: 12px; color: #FF00FF; text-transform: uppercase; font-weight: bold; margin-bottom: 5px;">Status</p>
            <p style="font-size: 18px; margin: 0; font-weight: bold;">${tier}</p>
          </div>

          <div style="padding: 20px 0;">
            <p style="font-size: 14px; color: #888; margin-bottom: 5px;">Authorized Identity</p>
            <p style="font-size: 20px; margin: 0; text-transform: uppercase;">${name}</p>
            
            <hr style="border: 0; border-top: 1px solid #222; margin: 20px 0;" />
            
            <p style="font-size: 14px; margin: 10px 0;"><strong>Instagram:</strong> <a href="https://instagram.com/${instagram?.replace('@', '')}" style="color: #FF00FF; text-decoration: none;">${instagram}</a></p>
            <p style="font-size: 14px; margin: 10px 0;"><strong>Telephone:</strong> ${phone}</p>
            <p style="font-size: 14px; margin: 10px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="margin-top: 40px; font-size: 9px; color: #444; text-transform: uppercase; letter-spacing: 2px; text-align: center; border-top: 1px solid #111; pt-20px;">
            Digital ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()} / Verification Required
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