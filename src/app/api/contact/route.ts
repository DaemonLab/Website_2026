import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    const senderName = (name || "").trim();
    if (!senderName || senderName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Full name is required (minimum 2 characters)" },
        { status: 400 }
      );
    }

    const emailTrim = (email || "").trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrim || !emailRegex.test(emailTrim)) {
      return NextResponse.json(
        { success: false, error: "Valid email address is required" },
        { status: 400 }
      );
    }

    const msgSubject = (subject || "General Inquiry").trim();
    const msgContent = (message || "").trim();
    if (!msgContent || msgContent.length < 10) {
      return NextResponse.json(
        { success: false, error: "Message content is required (minimum 10 characters)" },
        { status: 400 }
      );
    }

    const contactMsg = await prisma.contactMessage.create({
      data: {
        name: senderName,
        email: emailTrim,
        subject: msgSubject,
        message: msgContent,
        status: "UNREAD",
      },
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been received and saved.",
      data: contactMsg,
    });
  } catch (error) {
    console.error("POST /api/contact Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save message in database" },
      { status: 500 }
    );
  }
}
