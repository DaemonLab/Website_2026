import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, name, email, rollNumber, year } = body;

    // 1. Basic field presence validation
    if (!eventId || typeof eventId !== "string") {
      return NextResponse.json(
        { success: false, error: "Valid event ID is required" },
        { status: 400 }
      );
    }

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Full name is required (minimum 2 characters)" },
        { status: 400 }
      );
    }

    const emailTrim = (email || "").trim().toLowerCase();
    if (!emailTrim || !emailTrim.endsWith("@iiti.ac.in")) {
      return NextResponse.json(
        { success: false, error: "Valid IIT Indore email ending with @iiti.ac.in is required" },
        { status: 400 }
      );
    }

    if (!rollNumber || typeof rollNumber !== "string" || rollNumber.trim().length < 4) {
      return NextResponse.json(
        { success: false, error: "Valid roll number is required" },
        { status: 400 }
      );
    }

    if (!year || typeof year !== "string") {
      return NextResponse.json(
        { success: false, error: "Year of study is required" },
        { status: 400 }
      );
    }

    // 2. Fetch event details from database
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        _count: {
          select: { registrations: true },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        { success: false, error: "Target event does not exist" },
        { status: 404 }
      );
    }

    // 3. Check registration status
    if (!event.registrationOpen || event.status === "CANCELLED" || event.status === "COMPLETED") {
      return NextResponse.json(
        { success: false, error: "Registration for this event is currently closed" },
        { status: 400 }
      );
    }

    // 4. Check deadline if specified
    if (event.registrationDeadline && new Date() > new Date(event.registrationDeadline)) {
      return NextResponse.json(
        { success: false, error: "Registration deadline for this event has passed" },
        { status: 400 }
      );
    }

    // 5. Check capacity limit if specified
    if (event.maxParticipants && event._count.registrations >= event.maxParticipants) {
      return NextResponse.json(
        { success: false, error: "Event capacity limit reached" },
        { status: 400 }
      );
    }

    // 6. Check duplicate registration
    const existingReg = await prisma.eventRegistration.findUnique({
      where: {
        eventId_email: {
          eventId,
          email: emailTrim,
        },
      },
    });

    if (existingReg) {
      return NextResponse.json(
        { success: false, error: "You are already registered for this event" },
        { status: 409 }
      );
    }

    // 7. Store registration in PostgreSQL
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId,
        name: name.trim(),
        email: emailTrim,
        rollNumber: rollNumber.trim(),
        year: year.trim(),
        status: "REGISTERED",
      },
      select: {
        id: true,
        eventId: true,
        name: true,
        email: true,
        registeredAt: true,
        status: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Event registration successful",
      data: registration,
    });
  } catch (error: any) {
    console.error("POST /api/event-registrations Error:", error);
    if (error?.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "You are already registered for this event" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to process event registration" },
      { status: 500 }
    );
  }
}
