"use client";

import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/Icons";
import type { SoftwareTeamMember } from "@/lib/types/software";
import { useReducedMotion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TeamProfileCardProps {
  member: SoftwareTeamMember;
}

function getGitHubAvatarUrl(githubUrl?: string): string | undefined {
  if (!githubUrl) return undefined;
  const match = githubUrl.match(/github\.com\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://github.com/${match[1]}.png`;
  }
  return undefined;
}

function getDirectImageSrc(
  src?: string,
  githubUrl?: string,
  fallbackStage = 0
): string | undefined {
  if (fallbackStage === 3) {
    return getGitHubAvatarUrl(githubUrl);
  }

  if (!src) {
    return getGitHubAvatarUrl(githubUrl);
  }

  const driveIdMatch = src.match(/(?:id=|file\/d\/|\/d\/)([a-zA-Z0-9_-]+)/);
  if (driveIdMatch) {
    const id = driveIdMatch[1];
    if (fallbackStage === 1) return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
    if (fallbackStage === 2) return `https://docs.google.com/uc?export=download&id=${id}`;
    return `https://lh3.googleusercontent.com/d/${id}`;
  }

  return src;
}

export function TeamProfileCard({ member }: TeamProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [fallbackStage, setFallbackStage] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [isSocialHovered, setIsSocialHovered] = useState(false);

  const finalImageSrc = getDirectImageSrc(member.imageSrc, member.githubUrl, fallbackStage);

  const handleImgError = () => {
    if (fallbackStage < 3) {
      setFallbackStage((prev) => prev + 1);
    } else {
      setImgError(true);
    }
  };

  // Tilt and lighting state
  const [transformStyle, setTransformStyle] = useState("");
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });

  const animFrameId = useRef<number | null>(null);
  const targetRot = useRef({ rx: 0, ry: 0, lx: 50, ly: 50 });
  const currentRot = useRef({ rx: 0, ry: 0, lx: 50, ly: 50 });

  const initial = member.name.trim().charAt(0).toUpperCase();

  const socialLinks = [
    {
      id: "github",
      url: member.githubUrl,
      label: `${member.name}'s GitHub profile`,
      icon: GithubIcon,
      bgColor: "bg-[#00a8e8] hover:bg-[#0092cd]",
    },
    {
      id: "linkedin",
      url: member.linkedinUrl,
      label: `${member.name}'s LinkedIn profile`,
      icon: LinkedinIcon,
      bgColor: "bg-[#0077b5] hover:bg-[#00669c]",
    },
    {
      id: "instagram",
      url: member.instagramUrl,
      label: `${member.name}'s Instagram profile`,
      icon: InstagramIcon,
      bgColor: "bg-[#e1306c] hover:bg-[#c1255b]",
    },
  ].filter((link) => Boolean(link.url));

  const updateAnimation = () => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    currentRot.current.rx = lerp(currentRot.current.rx, targetRot.current.rx, 0.1);
    currentRot.current.ry = lerp(currentRot.current.ry, targetRot.current.ry, 0.1);
    currentRot.current.lx = lerp(currentRot.current.lx, targetRot.current.lx, 0.15);
    currentRot.current.ly = lerp(currentRot.current.ly, targetRot.current.ly, 0.15);

    setTransformStyle(`rotateX(${currentRot.current.rx.toFixed(2)}deg) rotateY(${currentRot.current.ry.toFixed(2)}deg)`);
    setLightPos({ x: currentRot.current.lx, y: currentRot.current.ly });

    const dist = Math.abs(currentRot.current.rx - targetRot.current.rx) + Math.abs(currentRot.current.ry - targetRot.current.ry);

    if (dist > 0.01 || isHovered || isSocialHovered) {
      animFrameId.current = requestAnimationFrame(updateAnimation);
    } else {
      animFrameId.current = null;
    }
  };

  const startAnimation = () => {
    if (!animFrameId.current && !reduceMotion) {
      animFrameId.current = requestAnimationFrame(updateAnimation);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || reduceMotion) return;

    if (isSocialHovered) {
      targetRot.current = { rx: 0, ry: 0, lx: 50, ly: 50 };
      startAnimation();
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    // Restrained tilt to ±4° X and ±5° Y for smooth hit-testing
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 5;
    const rx = -((y - rect.height / 2) / (rect.height / 2)) * 4;

    targetRot.current = { rx, ry, lx: px, ly: py };
    startAnimation();
  };

  const handleMouseEnter = () => {
    if (reduceMotion) return;
    setIsHovered(true);
    startAnimation();
  };

  const handleMouseLeave = () => {
    if (reduceMotion) return;
    setIsHovered(false);
    setIsSocialHovered(false);
    targetRot.current = { rx: 0, ry: 0, lx: 50, ly: 50 };
    startAnimation();
  };

  useEffect(() => {
    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full w-full [perspective:1000px]"
    >
      {/* 3D TILT CONTAINER */}
      <div
        className="relative flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-[#070e1e] p-5 shadow-xl transition-shadow duration-300 group-hover:border-brand-blue/60 group-hover:shadow-[0_0_35px_rgba(37,99,235,0.25)] [transform-style:preserve-3d]"
        style={reduceMotion ? undefined : { transform: transformStyle }}
      >
        {/* LAYER 1 & 2: Royal Blue Spotlight & Technical Grid */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden transition-opacity duration-300"
          style={{
            opacity: isHovered || isSocialHovered ? 0.9 : 0.25,
            background: `radial-gradient(380px circle at ${lightPos.x}% ${lightPos.y}%, rgba(37, 99, 235, 0.28), transparent 75%)`,
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.6) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Faint HUD labels */}
        <span className="pointer-events-none absolute top-3 left-4 font-mono text-[8px] tracking-widest text-brand-light/35 uppercase z-10">
          SYS // PCLUB.DEV
        </span>
        <span className="pointer-events-none absolute top-3 right-4 font-mono text-[8px] tracking-widest text-brand-light/35 uppercase z-10">
          {member.rollNumber ? `ID.${member.rollNumber.slice(-4)}` : "MEMBER"}
        </span>

        {/* LAYER 3: Large Hero Avatar Profile Picture */}
        <div className="relative mt-5 mb-4 flex justify-center [transform:translateZ(15px)]">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-brand-blue/35 bg-[#0b162c] shadow-[0_0_25px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:border-brand-blue group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]">
            {finalImageSrc && !imgError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={finalImageSrc}
                alt={member.name}
                onError={handleImgError}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-95"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0c1834] via-[#081024] to-brand-dark font-display text-4xl font-bold text-brand-light transition-colors group-hover:text-white">
                {initial}
              </div>
            )}

            {/* Subtle Royal Blue Light Highlight on Image */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-blue/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          {/* HOVER SOCIAL MEDIA OVERLAY BAR */}
          {socialLinks.length > 0 && (
            <div
              onMouseEnter={() => {
                setIsSocialHovered(true);
                targetRot.current = { rx: 0, ry: 0, lx: 50, ly: 50 };
              }}
              onMouseLeave={() => setIsSocialHovered(false)}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className={`absolute z-30 bottom-[-14px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#040814]/95 border border-brand-blue/50 shadow-[0_8px_25px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 ease-out ${
                isHovered || isSocialHovered || reduceMotion
                  ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                  : "opacity-0 translate-y-3 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto max-sm:opacity-100 max-sm:translate-y-0 max-sm:pointer-events-auto"
              }`}
            >
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    onClick={(e) => e.stopPropagation()}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${link.bgColor} text-white shadow-md transition-transform duration-200 hover:scale-115 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light`}
                  >
                    <IconComponent size={15} />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* LAYER 5: Bottom Information Panel */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-1 rounded-2xl border border-white/5 bg-[#0a1428]/90 p-4 backdrop-blur-md transition-all duration-300 group-hover:border-brand-blue/30 [transform:translateZ(25px)]">
          {/* Member Name */}
          <h3 className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-brand-light">
            {member.name}
          </h3>

          {/* Role Badge */}
          {member.role && (
            <span className="inline-block rounded-full bg-brand-blue/15 px-3 py-0.5 font-mono text-[10px] font-semibold tracking-widest text-brand-light uppercase border border-brand-blue/25">
              {member.role}
            </span>
          )}

          {/* Roll Number */}
          {member.rollNumber && (
            <p className="font-mono text-xs font-semibold tracking-wider text-muted-dim pt-1">
              {member.rollNumber}
            </p>
          )}

          {/* Email ID */}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="font-mono text-xs italic tracking-wide text-brand-light/90 hover:text-white hover:underline transition-colors truncate max-w-full"
            >
              {member.email}
            </a>
          )}

          {/* Skills tags */}
          {member.skills && member.skills.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-1 max-w-full">
              {member.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded bg-[#040916] px-1.5 py-0.5 font-mono text-[9px] text-muted-dim border border-white/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
