import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const domains = await prisma.domain.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
      },
    });

    return NextResponse.json({ success: true, data: domains });
  } catch (error) {
    console.error("GET /api/domains Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch domains from database" },
      { status: 500 }
    );
  }
}
