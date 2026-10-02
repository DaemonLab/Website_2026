import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domainSlug = searchParams.get("domain");

    const where: any = { isActive: true };

    if (domainSlug) {
      where.domain = { slug: domainSlug.toLowerCase() };
    }

    const announcements = await prisma.announcement.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        message: true,
        startsAt: true,
        expiresAt: true,
        domain: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: announcements });
  } catch (error) {
    console.error("GET /api/announcements Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch announcements from database" },
      { status: 500 }
    );
  }
}
