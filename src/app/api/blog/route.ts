import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        coverImage: true,
        publishedAt: true,
        author: {
          select: {
            name: true,
            role: true,
            profileImage: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error("GET /api/blog Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog posts from database" },
      { status: 500 }
    );
  }
}
