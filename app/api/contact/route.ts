await resend.emails.send({
      from: 'Natitude Web <onboarding@resend.dev>', 
      to: 'natituebars@gmail.com',
      replyTo: email, // Changed from reply_to to replyTo
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