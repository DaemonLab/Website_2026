import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domainSlug = searchParams.get("domain");
    const featuredParam = searchParams.get("featured");

    const where: any = { isPublished: true };

    if (domainSlug) {
      where.domain = { slug: domainSlug.toLowerCase() };
    }

    if (featuredParam === "true") {
      where.featured = true;
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        technologies: true,
        team: true,
        year: true,
        githubUrl: true,
        liveUrl: true,
        imageSrc: true,
        featured: true,
        createdAt: true,
        updatedAt: true,
        domain: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("GET /api/projects Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects from database" },
      { status: 500 }
    );
  }
}
