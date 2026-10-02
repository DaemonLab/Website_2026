import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domainSlug = searchParams.get("domain");
    const statusParam = searchParams.get("status");

    const where: any = {};

    if (domainSlug) {
      where.domain = { slug: domainSlug.toLowerCase() };
    }

    if (statusParam) {
      where.status = statusParam.toUpperCase();
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { eventDate: "asc" },
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

    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    console.error("GET /api/events Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch events from database" },
      { status: 500 }
    );
  }
}
