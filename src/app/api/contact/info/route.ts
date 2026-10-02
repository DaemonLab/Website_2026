import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const clubSetting = await prisma.clubSetting.findFirst();

    const domainLeads = await prisma.member.findMany({
      where: {
        role: { contains: "Lead", mode: "insensitive" },
        isActive: true,
      },
      select: {
        name: true,
        role: true,
        email: true,
        rollNumber: true,
        linkedin: true,
        github: true,
        domain: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    const data = {
      clubName: clubSetting?.clubName || "Programming Club IIT Indore",
      clubId: clubSetting?.clubId || "",
      institution: clubSetting?.institution || "Indian Institute of Technology Indore",
      campusAddress:
        clubSetting?.campusAddress ||
        "Khandwa Road, Simrol, Indore 453552, Madhya Pradesh, India",
      officialEmail: clubSetting?.officialEmail || "progclub@iiti.ac.in",
      facultyCoordinator: {
        name: clubSetting?.facultyCoordinatorName || "",
        designation: clubSetting?.facultyCoordinatorDesignation || "Faculty Advisor",
        department:
          clubSetting?.facultyCoordinatorDepartment ||
          "Department of Computer Science & Engineering",
        email: clubSetting?.facultyCoordinatorEmail || "",
      },
      domainLeads: domainLeads.map((lead: any) => ({
        domain: lead.domain?.name || lead.role,
        role: lead.role,
        name: lead.name,
        email: lead.email || "",
        rollNumber: lead.rollNumber || undefined,
        linkedinUrl: lead.linkedin || undefined,
        githubUrl: lead.github || undefined,
      })),
      socialLinks: {
        github: clubSetting?.githubUrl || "https://github.com/KartikeyRaghav",
        linkedin: clubSetting?.linkedinUrl || "",
        instagram: clubSetting?.instagramUrl || "",
        website: clubSetting?.websiteUrl || "https://pclub.iiti.ac.in",
      },
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET /api/contact/info Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contact info from database" },
      { status: 500 }
    );
  }
}
