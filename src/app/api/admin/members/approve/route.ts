import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (!session || session.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { id } = await req.json();
    const client = await clientPromise;
    const db = client.db("natitude");

    // 1. Get the member's details first so we know who to email
    const member = await db.collection("members").findOne({ _id: new ObjectId(id) });

    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    // 2. Update the status in the Database
    await db.collection("members").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: 'approved', approvedAt: new Date() } }
    );

    // 3. Send the "Welcome to the Inner Circle" Email
    await resend.emails.send({
      from: 'NATITUDE <onboarding@resend.dev>',
      to: member.email,
      subject: 'ACCESS GRANTED // THE INNER CIRCLE',
      // Replace the html block in your approve/route.ts with this:
// Look for the await resend.emails.send section and replace the html part:
html: `
  <div style="background-color: #000; color: #fff; padding: 40px 20px; font-family: 'Helvetica', 'Arial', sans-serif; text-align: center;">
    <div style="max-width: 500px; margin: 0 auto; border: 1px solid #333; padding: 40px; background-color: #000;">
      
      <img src="https://natitude.vercel.app/Email_logo.png" alt="NATITUDE" width="100" style="margin-bottom: 30px;" />
      
      <h1 style="color: #ff00ff; letter-spacing: 4px; font-size: 20px; text-transform: uppercase;">Access Granted</h1>
      
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
        Greetings, ${member.fullName}. Your application to the tribe has been approved.
      </p>

      <div style="background-color: #111; border: 1px solid #222; padding: 25px; text-align: left; margin-bottom: 30px;">
        <h2 style="color: #ff00ff; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-top: 0;">Next Steps:</h2>
        
        <p style="font-size: 14px; margin-bottom: 10px;">
          <strong>1. Save the Date:</strong> Mark your calendar for our next ritual.
        </p>
        
        <p style="font-size: 14px; margin-bottom: 10px;">
          <strong>2. The Signal:</strong> To maintain exclusivity, the exact coordinates will be sent to this email address <strong>24 hours before</strong> the event starts.
        </p>

        <p style="font-size: 14px; margin: 0;">
          <strong>3. Arrival:</strong> Prepare for an immersive experience. No late entry once the ritual begins.
        </p>
      </div>

      <p style="font-size: 12px; color: #666; line-height: 1.6;">
        If you have any questions before the event, reach out to us on Instagram.
      </p>

      <div style="margin-top: 40px; border-top: 1px solid #222; padding-top: 20px;">
        <p style="letter-spacing: 2px; font-size: 10px; color: #ff00ff; text-transform: uppercase; margin: 0;">
          Stay Wild.
        </p>
      </div>
    </div>
  </div>
`
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}