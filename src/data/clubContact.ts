export interface DomainLead {
  domain: string;
  role: string;
  name: string;
  email: string;
  rollNumber?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface ClubContactData {
  clubName: string;
  clubId: string;
  institution: string;
  campusAddress: string;
  officialEmail: string;
  facultyCoordinator: {
    name: string;
    designation: string;
    department: string;
    email: string;
  };
  domainLeads: DomainLead[];
  socialLinks: {
    github: string;
    linkedin: string;
    instagram: string;
    website: string;
  };
}

/**
 * Centralized Contact & Official Club Data Source of Truth for Programming Club IIT Indore.
 * Strictly uses provided data without inventing missing fields.
 */
export const clubContactData: ClubContactData = {
  clubName: "Programming Club IIT Indore",
  clubId: "", // Official Registration ID placeholder
  institution: "Indian Institute of Technology Indore",
  campusAddress: "Khandwa Road, Simrol, Indore 453552, Madhya Pradesh, India",
  officialEmail: "progclub@iiti.ac.in",
  facultyCoordinator: {
    name: "", // Faculty Coordinator Name placeholder
    designation: "Faculty Advisor",
    department: "Department of Computer Science & Engineering",
    email: "", // Faculty Email placeholder
  },
  domainLeads: [
    {
      domain: "Software",
      role: "Software Lead",
      name: "Kartikey Raghav",
      email: "sse240021008@iiti.ac.in",
      rollNumber: "240021008",
      githubUrl: "https://github.com/KartikeyRaghav",
      linkedinUrl: "https://www.linkedin.com/in/k-raghav-",
    },
    {
      domain: "Competitive Programming",
      role: "Competitive Programming Lead",
      name: "Hrishab Mittal",
      email: "cse240001035@iiti.ac.in",
      linkedinUrl: "https://www.linkedin.com/in/hrishabh-mittal/",
    },
    {
      domain: "Cybersecurity",
      role: "Cybersecurity Lead",
      name: "Akarsh Raj",
      email: "ep240051003@iiti.ac.in",
      linkedinUrl: "https://www.linkedin.com/in/akarsh-raj-a74a4931a",
    },
  ],
  socialLinks: {
    github: "https://github.com/KartikeyRaghav",
    linkedin: "", // Official Club LinkedIn URL placeholder
    instagram: "", // Official Club Instagram Handle placeholder
    website: "https://pclub.iiti.ac.in",
  },
};
