import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domainSlug = searchParams.get("domain");

    const where: any = { isPublished: true };

    if (domainSlug) {
      where.domain = { slug: domainSlug.toLowerCase() };
    }

    const achievements = await prisma.achievement.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        year: true,
        date: true,
        image: true,
        link: true,
        domain: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: achievements });
  } catch (error) {
    console.error("GET /api/achievements Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch achievements from database" },
      { status: 500 }
    );
  }
}
