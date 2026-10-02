import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domainSlug = searchParams.get("domain");
    const roleParam = searchParams.get("role");

    const where: any = { isActive: true };

    if (domainSlug) {
      where.domain = { slug: domainSlug.toLowerCase() };
    }

    if (roleParam) {
      where.role = { contains: roleParam, mode: "insensitive" };
    }

    const members = await prisma.member.findMany({
      where,
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        role: true,
        rollNumber: true,
        email: true,
        year: true,
        skills: true,
        github: true,
        instagram: true,
        linkedin: true,
        profileImage: true,
        domain: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.error("GET /api/members Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch members from database" },
      { status: 500 }
    );
  }
}
