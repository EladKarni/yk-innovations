import { Resend } from "resend";
import { NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function POST(request: Request) {
  console.log("Contact API: Request received");

  try {
    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.error("Contact API: RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error: Missing API key" },
        { status: 500 }
      );
    }

    console.log("Contact API: API key exists, initializing Resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log("Contact API: Parsing request body");
    const body: ContactFormData = await request.json();
    console.log("Contact API: Body parsed", {
      name: body.name,
      email: body.email,
    });

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email to site owner
    const { error } = await resend.emails.send({
      from: "YK Innovations <onboarding@resend.dev>",
      to: "yalon.karni@gmail.com", // Must match your Resend signup email when using onboarding@resend.dev
      replyTo: body.email,
      subject: `New Contact Form Submission from ${body.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${body.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${body.email}</p>
            ${body.phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${body.phone}</p>` : ""}
          </div>
          
          <div style="margin-top: 20px;">
            <h3 style="color: #333;">Message:</h3>
            <p style="background-color: #fff; padding: 15px; border-left: 4px solid #0066cc; margin: 10px 0;">
              ${body.message.replace(/\n/g, "<br>")}
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            This message was sent from the YK Innovations website contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
