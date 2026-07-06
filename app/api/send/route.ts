import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the system environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Basic server-side validation
    if (!email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Contact Form <info@novaexautomation.com>',
      to: ['info@novapexautomation.com'],
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
