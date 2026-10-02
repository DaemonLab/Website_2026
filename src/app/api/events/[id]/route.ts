import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const event = await prisma.event.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        eventDate: true,
        startTime: true,
        endTime: true,
        venue: true,
        registrationOpen: true,
        registrationDeadline: true,
        maxParticipants: true,
        registrationRequired: true,
        posterImage: true,
        status: true,
        domain: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    console.error("GET /api/events/[id] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch event details" },
      { status: 500 }
    );
  }
}
