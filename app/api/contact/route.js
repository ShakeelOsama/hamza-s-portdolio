import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ success: false, error: 'All fields are required.' }, { status: 400 });
    }

    // Ensure recipient is set
    const recipient = process.env.SMTP_TO || process.env.ADMIN_EMAIL;
    if (!recipient) {
      throw new Error('Recipient email is not defined in environment variables.');
    }

    // Log recipient for debugging
    console.log('Sending to:', recipient);

    // Create transporter using MailerSend SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: recipient, // ✅ Correct and now guaranteed to exist
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #f4f6fb; padding: 40px 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 24px #a29bfe33; padding: 32px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="color: #6c5ce7; margin-bottom: 8px;">🚀 New Contact Form Submission</h2>
              <p style="color: #636e72; font-size: 16px;">You received a new message from your portfolio website.</p>
            </div>
            <div style="border-top: 1px solid #eee; padding-top: 24px;">
              <p style="margin: 0 0 12px 0;">
                <span style="font-weight: bold; color: #fd79a8;">Name:</span>
                <span style="color: #2d3436;">${name}</span>
              </p>
              <p style="margin: 0 0 12px 0;">
                <span style="font-weight: bold; color: #00cec9;">Email:</span>
                <span style="color: #2d3436;">${email}</span>
              </p>
              <p style="margin: 0 0 12px 0;">
                <span style="font-weight: bold; color: #a29bfe;">Message:</span>
                <span style="color: #2d3436;">${message.replace(/\n/g, '<br/>')}</span>
              </p>
            </div>
            <div style="margin-top: 32px; text-align: center; color: #b2bec3; font-size: 13px;">
              <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
              <p>Sent from your portfolio website &copy; ${new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('SMTP API route error:', error);
    return Response.json({ success: false, error: 'Server error. Please try again later.' }, { status: 500 });
  }
}
