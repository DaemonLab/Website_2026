import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // 1. SEED DOMAINS
  const softwareDomain = await prisma.domain.upsert({
    where: { slug: "software" },
    update: {
      name: "Software Development",
      description: "Building software systems, web platforms, developer tools, and scalable architecture.",
    },
    create: {
      name: "Software Development",
      slug: "software",
      description: "Building software systems, web platforms, developer tools, and scalable architecture.",
      isActive: true,
    },
  });

  const cpDomain = await prisma.domain.upsert({
    where: { slug: "cp" },
    update: {
      name: "Competitive Programming",
      description: "Data structures, algorithms, problem solving, and competitive coding contests.",
    },
    create: {
      name: "Competitive Programming",
      slug: "cp",
      description: "Data structures, algorithms, problem solving, and competitive coding contests.",
      isActive: true,
    },
  });

  const cyberDomain = await prisma.domain.upsert({
    where: { slug: "cybersecurity" },
    update: {
      name: "Cybersecurity",
      description: "Ethical hacking, Capture The Flag (CTF), network security, and cryptography.",
    },
    create: {
      name: "Cybersecurity",
      slug: "cybersecurity",
      description: "Ethical hacking, Capture The Flag (CTF), network security, and cryptography.",
      isActive: true,
    },
  });

  console.log("✅ Seeded Domains: Software, Competitive Programming, Cybersecurity");

  // 2. SEED 14 SOFTWARE TEAM MEMBERS (Source of truth: softwareTeam.ts)
  const softwareMembers = [
    {
      name: "Kartikey Raghav",
      role: "Domain Lead",
      rollNumber: "240021008",
      email: "sse240021008@iiti.ac.in",
      year: "3",
      skills: ["Full Stack Web Development"],
      github: "https://github.com/KartikeyRaghav",
      instagram: "https://www.instagram.com/k_raghav_/",
      linkedin: "https://www.linkedin.com/in/k-raghav-",
      profileImage: "https://lh3.googleusercontent.com/d/1pMXM5Qhd1kTuKPzoj1NVkdAfF4Ugs1u9",
    },
    {
      name: "Anagh Singla",
      role: "Volunteer",
      rollNumber: "250001006",
      email: "cse250001006@iiti.ac.in",
      year: "2",
      skills: ["react.js", "node.js", "cp"],
      github: "https://github.com/anaghsingla-ai",
      instagram: "https://www.instagram.com/anagh1662/",
      linkedin: "https://www.linkedin.com/in/anagh-singla-96a2a6300/",
      profileImage: "https://lh3.googleusercontent.com/d/1D-Bik-cLleArlBCJsEKOluEwoHQ0fo6P",
    },
    {
      name: "Abhishek Raj",
      role: "Member",
      rollNumber: "240001006",
      email: "cse240001006@iiti.ac.in",
      year: "3",
      skills: ["Software dev full stack"],
      github: "https://github.com/abhishek130904",
      linkedin: "http://www.linkedin.com/in/abhishekraj-iiti",
      profileImage: "https://lh3.googleusercontent.com/d/1-9_WZfR7lSDe_wnyY23D3K-bKuDbvAGM",
    },
    {
      name: "Veer Doria",
      role: "Volunteer",
      rollNumber: "240041039",
      email: "mc240041039@iiti.ac.in",
      year: "3",
      skills: ["Mern stack"],
      profileImage: "https://lh3.googleusercontent.com/d/17Fw78Wlzx8JPla4yHG-1GlNPElPmasGp",
    },
    {
      name: "Yash Arya Saxena",
      role: "Member",
      rollNumber: "240001081",
      email: "cse240001081@iiti.ac.in",
      year: "3",
      skills: ["Fullstack Development", "AI"],
      github: "https://github.com/yasharyasaxena",
      linkedin: "https://www.linkedin.com/in/yash-arya-saxena",
      profileImage: "https://lh3.googleusercontent.com/d/1k3rJfne6GXEJ0j8SELIFhw6-7lu3gjR8",
    },
    {
      name: "Shavait Pandita",
      role: "Volunteer",
      rollNumber: "250004042",
      email: "ce250004042@iiti.ac.in",
      year: "2",
      skills: ["Full Stack"],
      github: "https://github.com/ershavait",
      linkedin: "http://www.linkedin.com/in/shavait-pandita-2ab4b92a5",
      profileImage: "https://lh3.googleusercontent.com/d/1gstFeUjIZUeds6n1YzLf5AV2s8GdTyCU",
    },
    {
      name: "Aditya Raj",
      role: "Volunteer",
      rollNumber: "250004002",
      email: "ce250004002@iiti.ac.in",
      year: "2",
      skills: ["MERN", "GSAP", "TypeScript"],
      github: "https://github.com/Aditya-Raj2",
      instagram: "https://www.instagram.com/adi_19.nu/",
      linkedin: "http://www.linkedin.com/in/aditya-raj-7142b6354",
      profileImage: "https://lh3.googleusercontent.com/d/1Qn76aUqm9pTb1ROq99vgGvN7rySBFH1P",
    },
    {
      name: "Yatharth Maurya",
      role: "Member",
      rollNumber: "240001082",
      email: "cse240001082@iiti.ac.in",
      year: "3",
      skills: ["Full Stack"],
      github: "https://github.com/YATHARTH-77",
      instagram: "https://www.instagram.com/yatharth_maurya07/",
      linkedin: "https://www.linkedin.com/in/yatharth-maurya-ab7432353/",
      profileImage: "https://lh3.googleusercontent.com/d/1tZFca_f6gznbKXdN_eDNiD0vFSq1zVMT",
    },
    {
      name: "Dhoke Vinod Eknath",
      role: "Volunteer",
      rollNumber: "240001025",
      email: "cse240001025@iiti.ac.in",
      year: "3",
      skills: ["React", "Node.js", "C++", "python"],
      github: "https://github.com/vinod765",
      instagram: "https://www.instagram.com/vinod_dh7/",
      linkedin: "https://www.linkedin.com/in/vinod7",
      profileImage: "https://lh3.googleusercontent.com/d/1CFUJNhiLt7HR9osRwA6ZpjF_QbyBiQ62",
    },
    {
      name: "Atharv Vyas",
      role: "Volunteer",
      rollNumber: "250001012",
      email: "cse250001012@iiti.ac.in",
      year: "2",
      skills: ["Web dev"],
      github: "https://github.com/Atharv-vyas28",
      instagram: "https://www.instagram.com/ATHARV_VYAS_28/",
      linkedin: "https://www.linkedin.com/in/atharv-vyas-b0a575377",
      profileImage: "https://lh3.googleusercontent.com/d/1ubFMcC8PjIfGjzHb-qXo6xoGmwr4p6LP",
    },
    {
      name: "Abhishek Bairwa",
      role: "Volunteer",
      rollNumber: "250001002",
      email: "cse250001002@iiti.ac.in",
      year: "2",
      skills: ["MERN", "Next.js", "EJS", "tailwind", "typescript"],
      github: "https://github.com/abhishek2006-create",
      instagram: "https://www.instagram.com/abhishek_bairwa_05/",
      linkedin: "https://www.linkedin.com/in/abhishek-bairwa-5aba69398",
      profileImage: "https://lh3.googleusercontent.com/d/1UG5lPj_oINaTZm0Om_uJsFR5iEjDxbL_",
    },
    {
      name: "Prathamesh Hingol",
      role: "Volunteer",
      rollNumber: "250001056",
      email: "cse250001056@iiti.ac.in",
      year: "2",
      skills: ["React.js", "TypeScript", "Node.js"],
      github: "https://github.com/Prathamesh-Hingol",
      instagram: "https://www.instagram.com/prathameshhingol",
      linkedin: "https://www.linkedin.com/in/prathamesh-hingol-7b173438b/",
      profileImage: "https://lh3.googleusercontent.com/d/1QkAzqDRea_Br04VYcsKZqepoWlFy_gTH",
    },
    {
      name: "Pratyush Gupta",
      role: "Member",
      rollNumber: "240001054",
      email: "cse240001054@iiti.ac.in",
      year: "3",
      skills: ["MERN Stack"],
      github: "https://github.com/PratyushG434",
      instagram: "https://www.instagram.com/pratyush_054/",
      linkedin: "https://www.linkedin.com/in/pratyush-gupta-ba4102331/",
      profileImage: "https://lh3.googleusercontent.com/d/1xjgxtqqjCul8IVUL8JC0xV6aupbLbK1a",
    },
    {
      name: "Abhinav Patel",
      role: "Member",
      rollNumber: "240001004",
      email: "cse240001004@iiti.ac.in",
      year: "3",
      skills: ["Software development", "AI"],
      linkedin: "https://www.linkedin.com/in/abhinav-patel-b92429323/",
      profileImage: "https://lh3.googleusercontent.com/d/1Ia7yhj18MiYwa7Z5K9ahHYyB7QhvTQUr",
    },
  ];

  for (const memberData of softwareMembers) {
    await prisma.member.upsert({
      where: { email: memberData.email },
      update: {
        ...memberData,
        domainId: softwareDomain.id,
      },
      create: {
        ...memberData,
        domainId: softwareDomain.id,
      },
    });
  }
  console.log(`✅ Seeded ${softwareMembers.length} Software Development team members.`);

  // 3. SEED COMPETITIVE PROGRAMMING LEAD (Hrishab Mittal)
  await prisma.member.upsert({
    where: { email: "cse240001035@iiti.ac.in" },
    update: {
      name: "Hrishab Mittal",
      role: "Competitive Programming Lead",
      linkedin: "https://www.linkedin.com/in/hrishabh-mittal/",
      domainId: cpDomain.id,
    },
    create: {
      name: "Hrishab Mittal",
      email: "cse240001035@iiti.ac.in",
      role: "Competitive Programming Lead",
      linkedin: "https://www.linkedin.com/in/hrishabh-mittal/",
      domainId: cpDomain.id,
    },
  });

  // 4. SEED CYBERSECURITY LEAD (Akarsh Raj)
  await prisma.member.upsert({
    where: { email: "ep240051003@iiti.ac.in" },
    update: {
      name: "Akarsh Raj",
      role: "Cybersecurity Lead",
      linkedin: "https://www.linkedin.com/in/akarsh-raj-a74a4931a",
      domainId: cyberDomain.id,
    },
    create: {
      name: "Akarsh Raj",
      email: "ep240051003@iiti.ac.in",
      role: "Cybersecurity Lead",
      linkedin: "https://www.linkedin.com/in/akarsh-raj-a74a4931a",
      domainId: cyberDomain.id,
    },
  });

  console.log("✅ Seeded CP Lead (Hrishab Mittal) and Cybersecurity Lead (Akarsh Raj).");

  // 5. SEED CLUB CONTACT SETTINGS
  const existingSetting = await prisma.clubSetting.findFirst();
  if (existingSetting) {
    await prisma.clubSetting.update({
      where: { id: existingSetting.id },
      data: {
        clubName: "Programming Club IIT Indore",
        officialEmail: "progclub@iiti.ac.in",
        institution: "Indian Institute of Technology Indore",
        campusAddress: "Khandwa Road, Simrol, Indore 453552, Madhya Pradesh, India",
        facultyCoordinatorDesignation: "Faculty Advisor",
        facultyCoordinatorDepartment: "Department of Computer Science & Engineering",
        githubUrl: "https://github.com/KartikeyRaghav",
        websiteUrl: "https://pclub.iiti.ac.in",
      },
    });
  } else {
    await prisma.clubSetting.create({
      data: {
        clubName: "Programming Club IIT Indore",
        officialEmail: "progclub@iiti.ac.in",
        institution: "Indian Institute of Technology Indore",
        campusAddress: "Khandwa Road, Simrol, Indore 453552, Madhya Pradesh, India",
        facultyCoordinatorDesignation: "Faculty Advisor",
        facultyCoordinatorDepartment: "Department of Computer Science & Engineering",
        githubUrl: "https://github.com/KartikeyRaghav",
        websiteUrl: "https://pclub.iiti.ac.in",
      },
    });
  }
  console.log("✅ Seeded Club Contact Settings.");

  // 6. SEED SOFTWARE PROJECTS (Source of truth: softwareProjects.ts)
  const softwareProjectsData = [
    {
      title: "Project name pending",
      slug: "placeholder-featured",
      description:
        "Placeholder. A featured Software-domain project will appear here once official details are provided — name, stack, team, and links.",
      technologies: ["TypeScript", "Next.js", "API"],
      team: ["To be listed"],
      year: "TBA",
      featured: true,
      domainId: softwareDomain.id,
    },
    {
      title: "Project slot A",
      slug: "placeholder-secondary-a",
      description:
        "Placeholder. Secondary showcase for a shipped or in-progress Software project.",
      technologies: ["React", "Node.js"],
      team: ["To be listed"],
      year: "TBA",
      featured: false,
      domainId: softwareDomain.id,
    },
    {
      title: "Project slot B",
      slug: "placeholder-secondary-b",
      description:
        "Placeholder. Secondary showcase for a shipped or in-progress Software project.",
      technologies: ["Python", "PostgreSQL"],
      team: ["To be listed"],
      year: "TBA",
      featured: false,
      domainId: softwareDomain.id,
    },
  ];

  for (const proj of softwareProjectsData) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: {
        ...proj,
        domainId: softwareDomain.id,
      },
      create: {
        ...proj,
        domainId: softwareDomain.id,
      },
    });
  }
  console.log(`✅ Seeded ${softwareProjectsData.length} Software Development Projects.`);

  console.log("🌱 Database seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
