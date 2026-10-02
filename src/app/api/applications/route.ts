import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      name,
      email,
      rollNumber,
      year,
      domainSlug = "software",
      areasOfInterest = [],
      interests,
      whyJoin,
      reason,
      github,
      linkedin,
      portfolio,
      skills,
      projects,
    } = body;

    const applicantName = (fullName || name || "").trim();
    if (!applicantName || applicantName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Full name is required (minimum 2 characters)" },
        { status: 400 }
      );
    }

    const emailTrim = (email || "").trim().toLowerCase();
    if (!emailTrim || !emailTrim.endsWith("@iiti.ac.in")) {
      return NextResponse.json(
        { success: false, error: "Must be a valid IIT Indore email ending with @iiti.ac.in" },
        { status: 400 }
      );
    }

    const rollTrim = (rollNumber || "").trim();
    if (!rollTrim || rollTrim.length < 4) {
      return NextResponse.json(
        { success: false, error: "Valid roll number is required" },
        { status: 400 }
      );
    }

    const yearTrim = (year || "").trim();
    if (!yearTrim) {
      return NextResponse.json(
        { success: false, error: "Year of study is required" },
        { status: 400 }
      );
    }

    const applicantInterests: string[] = Array.isArray(areasOfInterest) && areasOfInterest.length > 0
      ? areasOfInterest
      : Array.isArray(interests)
      ? interests
      : [];

    if (applicantInterests.length === 0) {
      return NextResponse.json(
        { success: false, error: "Select at least one area of interest" },
        { status: 400 }
      );
    }

    const applicantReason = (whyJoin || reason || "").trim();
    if (!applicantReason || applicantReason.length < 15) {
      return NextResponse.json(
        { success: false, error: "Please elaborate on why you want to join (minimum 15 characters)" },
        { status: 400 }
      );
    }

    // Match Domain by slug or fallback
    let domainRecord = await prisma.domain.findFirst({
      where: {
        OR: [
          { slug: domainSlug.toLowerCase() },
          { name: { contains: domainSlug, mode: "insensitive" } },
        ],
      },
    });

    // Store in database
    const application = await prisma.application.create({
      data: {
        name: applicantName,
        email: emailTrim,
        rollNumber: rollTrim,
        year: yearTrim,
        domainId: domainRecord ? domainRecord.id : null,
        interests: applicantInterests,
        skills: typeof skills === "string" ? skills.trim() : null,
        reason: applicantReason,
        github: typeof github === "string" && github.trim() ? github.trim() : null,
        linkedin: typeof linkedin === "string" && linkedin.trim() ? linkedin.trim() : null,
        portfolio: typeof portfolio === "string" && portfolio.trim() ? portfolio.trim() : null,
        projects: typeof projects === "string" && projects.trim() ? projects.trim() : null,
        status: "PENDING",
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        status: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted and stored in PostgreSQL database successfully.",
      data: application,
    });
  } catch (error) {
    console.error("POST /api/applications Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to store application in database" },
      { status: 500 }
    );
  }
}
