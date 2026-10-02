"use client";

import React, { useState } from "react";
import SpecularButton from "@/components/ui/SpecularButton";
import { DecryptedText } from "@/components/ui/DecryptedText";
import {
  Check,
  AlertCircle,
  Send,
  Copy,
  CheckCircle2,
  Sparkles,
  User,
  Mail,
  BookOpen,
  Code,
  Globe,
  Layers,
  Cpu,
  FolderGit2,
  Terminal,
  Wrench,
} from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface AreaOption {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

const INTEREST_AREAS: AreaOption[] = [
  {
    id: "Web Dev",
    label: "Web Dev",
    description: "Fullstack platforms, modern UI/UX, web components & APIs",
    icon: Globe,
  },
  {
    id: "App Dev",
    label: "App Dev",
    description: "Cross-platform mobile applications & native mobile tech",
    icon: Layers,
  },
  {
    id: "Backend & Systems",
    label: "Backend & Systems",
    description: "Distributed systems, microservices, databases & scalability",
    icon: Cpu,
  },
  {
    id: "AI / ML",
    label: "AI / ML",
    description: "Intelligent software, LLM integrations & model pipelines",
    icon: Sparkles,
  },
  {
    id: "Open Source",
    label: "Open Source",
    description: "Community packages, public repos & infrastructure",
    icon: FolderGit2,
  },
  {
    id: "Developer Tools",
    label: "Developer Tools",
    description: "CLI tools, developer productivity & automated workflow scripts",
    icon: Wrench,
  },
];

const YEARS_OF_STUDY = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Other"];

interface FormData {
  fullName: string;
  email: string;
  rollNumber: string;
  year: string;
  areasOfInterest: string[];
  whyJoin: string;
  github: string;
  linkedin: string;
  portfolio: string;
  skills: string;
  projects: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  rollNumber?: string;
  year?: string;
  areasOfInterest?: string;
  whyJoin?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

interface SubmittedApplicationData {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  rollNumber: string;
  year: string;
  interests: string[];
}

export function SoftwareApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    rollNumber: "",
    year: "",
    areasOfInterest: [],
    whyJoin: "",
    github: "",
    linkedin: "",
    portfolio: "",
    skills: "",
    projects: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitted">("idle");
  const [apiError, setApiError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedApplicationData | null>(null);

  const toggleInterest = (id: string) => {
    setFormData((prev) => {
      const exists = prev.areasOfInterest.includes(id);
      const updated = exists
        ? prev.areasOfInterest.filter((item) => item !== id)
        : [...prev.areasOfInterest, id];
      return { ...prev, areasOfInterest: updated };
    });
    if (errors.areasOfInterest) {
      setErrors((prev) => ({ ...prev, areasOfInterest: undefined }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name is required (minimum 2 characters).";
    }

    const emailTrim = formData.email.trim().toLowerCase();
    if (!emailTrim) {
      newErrors.email = "IIT Indore email address is required.";
    } else if (!emailTrim.endsWith("@iiti.ac.in")) {
      newErrors.email = "Must be a valid IIT Indore email ending with @iiti.ac.in.";
    }

    if (!formData.rollNumber.trim() || formData.rollNumber.trim().length < 4) {
      newErrors.rollNumber = "Valid roll number is required.";
    }

    if (!formData.year) {
      newErrors.year = "Please select your current year of study.";
    }

    if (formData.areasOfInterest.length === 0) {
      newErrors.areasOfInterest = "Select at least one area of interest.";
    }

    if (!formData.whyJoin.trim() || formData.whyJoin.trim().length < 15) {
      newErrors.whyJoin = "Please elaborate on why you want to join (minimum 15 characters).";
    }

    // Optional URL validations
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/.*)?$/i;
    if (formData.github.trim() && !urlPattern.test(formData.github.trim())) {
      newErrors.github = "Please enter a valid URL (e.g., https://github.com/username).";
    }
    if (formData.linkedin.trim() && !urlPattern.test(formData.linkedin.trim())) {
      newErrors.linkedin = "Please enter a valid URL (e.g., https://linkedin.com/in/username).";
    }
    if (formData.portfolio.trim() && !urlPattern.test(formData.portfolio.trim())) {
      newErrors.portfolio = "Please enter a valid URL.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          rollNumber: formData.rollNumber,
          year: formData.year,
          domainSlug: "software",
          areasOfInterest: formData.areasOfInterest,
          whyJoin: formData.whyJoin,
          github: formData.github,
          linkedin: formData.linkedin,
          portfolio: formData.portfolio,
          skills: formData.skills,
          projects: formData.projects,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSubmitStatus("submitted");
        setSubmittedData({
          id: json.data?.id || "N/A",
          createdAt: json.data?.createdAt || new Date().toISOString(),
          name: formData.fullName,
          email: formData.email,
          rollNumber: formData.rollNumber,
          year: formData.year,
          interests: formData.areasOfInterest,
        });
      } else {
        setApiError(json.error || "Failed to submit application. Please check your inputs and try again.");
      }
    } catch {
      setApiError("Network error. Unable to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitStatus("idle");
    setSubmittedData(null);
    setApiError(null);
    setFormData({
      fullName: "",
      email: "",
      rollNumber: "",
      year: "",
      areasOfInterest: [],
      whyJoin: "",
      github: "",
      linkedin: "",
      portfolio: "",
      skills: "",
      projects: "",
    });
    setErrors({});
  };

  return (
    <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
      <div className="relative rounded-3xl border border-brand-blue/30 bg-[#071225]/85 p-6 backdrop-blur-xl sm:p-10 shadow-2xl shadow-brand-blue/10">
        {/* Subtle Ambient Header Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-1/2 bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-80" />

        <div className="mb-8 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3 py-1 font-mono text-[10px] tracking-widest text-brand-light uppercase mb-3">
            <Terminal size={12} />
            <span><DecryptedText text="APPLICATION FORM" speed={30} maxIterations={6} /></span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Software Domain Application
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Fill out the details below. Required fields are marked with an asterisk (<span className="text-brand-light">*</span>).
          </p>
        </div>

        {submitStatus === "submitted" && submittedData ? (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 sm:p-8 text-left space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-400">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-emerald-400 uppercase">
                  <span>SUBMISSION SUCCESSFUL</span>
                </div>
                <h3 className="mt-1 font-display text-xl font-bold text-white">
                  Application Submitted Successfully
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Your application to join the Software domain has been received and saved to our database.
                </p>
              </div>
            </div>

            {/* Application Data Summary */}
            <div className="rounded-xl border border-white/10 bg-[#050B18] p-4 font-mono text-xs text-slate-300 space-y-2">
              <div className="flex justify-between items-center text-slate-400 border-b border-white/5 pb-2 mb-3">
                <span className="font-bold text-white">APPLICATION DETAILS</span>
                <span className="text-[10px] text-emerald-400 font-bold">ID: {submittedData.id}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div><span className="text-slate-500">Name:</span> <span className="text-white">{submittedData.name}</span></div>
                <div><span className="text-slate-500">Email:</span> <span className="text-white">{submittedData.email}</span></div>
                <div><span className="text-slate-500">Roll No:</span> <span className="text-white">{submittedData.rollNumber}</span></div>
                <div><span className="text-slate-500">Year:</span> <span className="text-white">{submittedData.year}</span></div>
                <div className="col-span-full"><span className="text-slate-500">Interests:</span> <span className="text-brand-light">{submittedData.interests.join(", ")}</span></div>
                <div className="col-span-full text-[11px] text-slate-500">Submitted at: {new Date(submittedData.createdAt).toLocaleString()}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-blue/20 border border-brand-blue px-4 py-2.5 font-mono text-xs font-semibold text-white hover:bg-brand-blue/30 transition-colors"
              >
                <span>Submit Another Application</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {apiError && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-300 leading-relaxed flex items-start gap-3">
                <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-200">Submission Error</p>
                  <p className="mt-0.5">{apiError}</p>
                </div>
              </div>
            )}
            {/* SECTION 1: APPLICANT IDENTIFICATION */}
            <div>
              <h3 className="font-mono text-xs font-semibold tracking-widest text-brand-light uppercase mb-4 flex items-center gap-2">
                <User size={14} />
                <span>1. Applicant Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block font-mono text-xs text-slate-300 mb-2">
                    Full Name <span className="text-brand-light">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Anagh Kumar"
                    className={`w-full rounded-xl border ${
                      errors.fullName ? "border-red-500/80 bg-red-500/5" : "border-white/10 bg-[#050B18]"
                    } px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all`}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 flex items-center gap-1 font-mono text-xs text-red-400">
                      <AlertCircle size={12} />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* IIT Indore Email */}
                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-slate-300 mb-2">
                    IIT Indore Email <span className="text-brand-light">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. cse230001001@iiti.ac.in"
                    className={`w-full rounded-xl border ${
                      errors.email ? "border-red-500/80 bg-red-500/5" : "border-white/10 bg-[#050B18]"
                    } px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 flex items-center gap-1 font-mono text-xs text-red-400">
                      <AlertCircle size={12} />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Roll Number */}
                <div>
                  <label htmlFor="rollNumber" className="block font-mono text-xs text-slate-300 mb-2">
                    Roll Number <span className="text-brand-light">*</span>
                  </label>
                  <input
                    type="text"
                    id="rollNumber"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. 230001001"
                    className={`w-full rounded-xl border ${
                      errors.rollNumber ? "border-red-500/80 bg-red-500/5" : "border-white/10 bg-[#050B18]"
                    } px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all`}
                  />
                  {errors.rollNumber && (
                    <p className="mt-1.5 flex items-center gap-1 font-mono text-xs text-red-400">
                      <AlertCircle size={12} />
                      <span>{errors.rollNumber}</span>
                    </p>
                  )}
                </div>

                {/* Year of Study */}
                <div>
                  <label className="block font-mono text-xs text-slate-300 mb-2">
                    Year of Study <span className="text-brand-light">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {YEARS_OF_STUDY.map((yearOption) => (
                      <button
                        key={yearOption}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, year: yearOption }));
                          if (errors.year) setErrors((prev) => ({ ...prev, year: undefined }));
                        }}
                        className={`rounded-lg px-3 py-2 text-xs font-mono transition-all ${
                          formData.year === yearOption
                            ? "bg-brand-blue text-white font-semibold shadow-[0_0_12px_rgba(37,99,235,0.4)] border border-brand-light/50"
                            : "bg-[#050B18] text-slate-400 border border-white/10 hover:border-brand-blue/50 hover:text-white"
                        }`}
                      >
                        {yearOption}
                      </button>
                    ))}
                  </div>
                  {errors.year && (
                    <p className="mt-1.5 flex items-center gap-1 font-mono text-xs text-red-400">
                      <AlertCircle size={12} />
                      <span>{errors.year}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2: AREAS OF INTEREST (INTERACTIVE MULTI-SELECT GRID) */}
            <div className="border-t border-white/10 pt-8">
              <h3 className="font-mono text-xs font-semibold tracking-widest text-brand-light uppercase mb-1 flex items-center gap-2">
                <Code size={14} />
                <span>2. Areas of Interest <span className="text-brand-light">*</span></span>
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Select one or more software domains you want to build in.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {INTEREST_AREAS.map((area) => {
                  const Icon = area.icon;
                  const isSelected = formData.areasOfInterest.includes(area.id);
                  return (
                    <div
                      key={area.id}
                      onClick={() => toggleInterest(area.id)}
                      className={`group relative cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
                        isSelected
                          ? "border-brand-blue bg-brand-blue/20 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] ring-1 ring-brand-blue"
                          : "border-white/10 bg-[#050B18]/70 text-slate-300 hover:border-brand-blue/40 hover:bg-[#050B18]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                          isSelected ? "bg-brand-blue text-white" : "bg-white/5 text-brand-light group-hover:bg-brand-blue/20"
                        }`}>
                          <Icon size={18} />
                        </div>
                        <div className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                          isSelected ? "border-brand-light bg-brand-blue text-white" : "border-white/20 bg-transparent"
                        }`}>
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>

                      <h4 className="mt-3 font-mono text-xs font-bold uppercase tracking-wider text-white">
                        {area.label}
                      </h4>
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-400 group-hover:text-slate-300">
                        {area.description}
                      </p>
                    </div>
                  );
                })}
              </div>
              {errors.areasOfInterest && (
                <p className="mt-2 flex items-center gap-1 font-mono text-xs text-red-400">
                  <AlertCircle size={12} />
                  <span>{errors.areasOfInterest}</span>
                </p>
              )}
            </div>

            {/* SECTION 3: MOTIVATION & ESSAY */}
            <div className="border-t border-white/10 pt-8">
              <h3 className="font-mono text-xs font-semibold tracking-widest text-brand-light uppercase mb-4 flex items-center gap-2">
                <BookOpen size={14} />
                <span>3. Statement of Purpose</span>
              </h3>

              <div>
                <label htmlFor="whyJoin" className="block font-mono text-xs text-slate-300 mb-2">
                  Why do you want to join the Software domain? <span className="text-brand-light">*</span>
                </label>
                <textarea
                  id="whyJoin"
                  name="whyJoin"
                  rows={4}
                  value={formData.whyJoin}
                  onChange={handleInputChange}
                  placeholder="Tell us about your motivation, software interests, what you hope to build or learn, and how you plan to contribute to team projects..."
                  className={`w-full rounded-xl border ${
                    errors.whyJoin ? "border-red-500/80 bg-red-500/5" : "border-white/10 bg-[#050B18]"
                  } px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all`}
                />
                {errors.whyJoin && (
                  <p className="mt-1.5 flex items-center gap-1 font-mono text-xs text-red-400">
                    <AlertCircle size={12} />
                    <span>{errors.whyJoin}</span>
                  </p>
                )}
              </div>
            </div>

            {/* SECTION 4: PROFILES & OPTIONAL HIGHLIGHTS */}
            <div className="border-t border-white/10 pt-8">
              <h3 className="font-mono text-xs font-semibold tracking-widest text-brand-light uppercase mb-1 flex items-center gap-2">
                <Globe size={14} />
                <span>4. Profiles & Technical Experience (Optional)</span>
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Providing links to code repositories or past projects helps us evaluate your background quickly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* GitHub */}
                <div>
                  <label htmlFor="github" className="block font-mono text-xs text-slate-300 mb-2 flex items-center gap-1.5">
                    <GithubIcon className="h-3 w-3 text-brand-light" />
                    <span>GitHub Profile</span>
                  </label>
                  <input
                    type="text"
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username"
                    className="w-full rounded-xl border border-white/10 bg-[#050B18] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
                  />
                  {errors.github && (
                    <p className="mt-1 font-mono text-[10px] text-red-400">{errors.github}</p>
                  )}
                </div>

                {/* LinkedIn */}
                <div>
                  <label htmlFor="linkedin" className="block font-mono text-xs text-slate-300 mb-2 flex items-center gap-1.5">
                    <LinkedinIcon className="h-3 w-3 text-brand-light" />
                    <span>LinkedIn Profile</span>
                  </label>
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full rounded-xl border border-white/10 bg-[#050B18] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
                  />
                  {errors.linkedin && (
                    <p className="mt-1 font-mono text-[10px] text-red-400">{errors.linkedin}</p>
                  )}
                </div>

                {/* Portfolio */}
                <div>
                  <label htmlFor="portfolio" className="block font-mono text-xs text-slate-300 mb-2 flex items-center gap-1.5">
                    <Globe size={12} className="text-brand-light" />
                    <span>Portfolio / Website</span>
                  </label>
                  <input
                    type="text"
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                    className="w-full rounded-xl border border-white/10 bg-[#050B18] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
                  />
                  {errors.portfolio && (
                    <p className="mt-1 font-mono text-[10px] text-red-400">{errors.portfolio}</p>
                  )}
                </div>
              </div>

              {/* Skills & Past Projects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="skills" className="block font-mono text-xs text-slate-300 mb-2">
                    Technical Skills & Tools
                  </label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="e.g. React, TypeScript, Python, C++, Docker, Git"
                    className="w-full rounded-xl border border-white/10 bg-[#050B18] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="projects" className="block font-mono text-xs text-slate-300 mb-2">
                    Past Projects / Highlight
                  </label>
                  <input
                    type="text"
                    id="projects"
                    name="projects"
                    value={formData.projects}
                    onChange={handleInputChange}
                    placeholder="e.g. Built a real-time chat app, CLI tool for git hooks"
                    className="w-full rounded-xl border border-white/10 bg-[#050B18] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="font-mono text-[11px] text-slate-400">
                <span>By submitting, your response will be validated against domain guidelines.</span>
              </div>

              <SpecularButton
                type="submit"
                size="lg"
                radius={24}
                tint="#2563eb"
                tintOpacity={0.3}
                lineColor="#60a5fa"
                baseColor="#2563eb"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[200px]"
              >
                <div className="flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
                  {isSubmitting ? (
                    <span>SUBMITTING...</span>
                  ) : (
                    <>
                      <span>SUBMIT APPLICATION</span>
                      <Send size={14} />
                    </>
                  )}
                </div>
              </SpecularButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default SoftwareApplicationForm;
