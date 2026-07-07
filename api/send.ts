import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Exporting explicit uppercase HTTP methods prevents parsing layout errors entirely
export async function POST(request: Request) {
  try {
    // This standard web API line ensures the payload is cleanly parsed as a JSON object
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields in parsed JSON" }), 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await resend.emails.send({
      from: "info@novapexautomation.com",
      to: "info@novapexautomation.com",
      subject: `New Contact Form Submission from ${name}`,
      reply_to: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #001a4d;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px;">${message}</p>
          </div>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully", data: result }), 
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to process form payload" }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
