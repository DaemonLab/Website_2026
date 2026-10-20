'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const navItems = [
  { name: 'OVERVIEW', id: 'overview' },
  { name: 'PROJECTS', id: 'projects' },
  { name: 'ACHIEVEMENTS', id: 'achievements' },
  { name: 'TEAM', id: 'team' },
];

export default function CyberNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const navRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // 1. Position change when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Dynamic smooth positioning of the bottom border highlight link
  const updateIndicator = (id: string) => {
    const currentItem = itemRefs.current[id];
    const navContainer = navRef.current;

    if (currentItem && navContainer && isScrolled) {
      const itemRect = currentItem.getBoundingClientRect();
      const containerRect = navContainer.getBoundingClientRect();

      setIndicatorStyle({
        left: itemRect.left - containerRect.left,
        width: itemRect.width,
      });
    }
  };

  useEffect(() => {
    if (isScrolled) {
      updateIndicator(activeSection);
    }
  }, [activeSection, isScrolled]);

  // Recalculate underline position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (isScrolled) updateIndicator(activeSection);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection, isScrolled]);

  // 3. ScrollSpy observer to auto-highlight active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 4. Smooth click scrolling
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Centered Main Navbar with 1.5s Transition */}
      <header
        className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-[1500ms] ease-in-out ${
          isScrolled ? 'top-4 w-auto' : 'top-0 w-full px-6 py-4'
        }`}
      >
        <div
          ref={navRef}
          className={`relative flex items-center transition-all duration-[1500ms] ease-in-out mx-auto ${
            isScrolled
              ? 'justify-center gap-5 px-6 py-3.5 rounded-full border bg-slate-950/75 backdrop-blur-md border-cyan-900/40 shadow-xl shadow-cyan-950/40 w-max'
              : 'justify-between max-w-7xl px-8 py-4 rounded-2xl border bg-slate-950/95 backdrop-blur-md border-cyan-900/60 shadow-2xl shadow-cyan-950/60 w-full'
          }`}
        >
          {/* Domain Logo & Title */}
          <div className={`flex items-center gap-3 transition-all duration-[1500ms] ${isScrolled ? 'pr-4 border-r border-slate-800' : ''}`}>
            <div className="w-8 h-8 rounded-full border border-cyan-500/50 flex items-center justify-center bg-cyan-950/30 text-cyan-400 font-mono text-xs font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              {"#_"}
            </div>
            <span className="text-white font-mono font-bold tracking-wider text-sm flex items-center gap-1.5">
              <span className="text-cyan-400">CYBER</span> DOMAIN
            </span>
          </div>

          {/* Scroll Links */}
          <nav className={`flex items-center transition-all duration-[1500ms] ${isScrolled ? 'gap-5' : 'gap-8'}`}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[item.id] = el;
                  }}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-xs font-semibold tracking-wider transition-colors duration-300 uppercase py-1 ${
                    isActive
                      ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Highlighted Border line - Only active when scrolled into pill state */}
          {isScrolled && (
            <div
              className="absolute bottom-0 h-[2.5px] bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee] transition-all duration-300 ease-out"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
              }}
            />
          )}
        </div>
      </header>

      {/* Icon-Only Floating Home Button Fixed to Top-Right Corner */}
      <div className="fixed top-4 right-6 z-50">
        <Link
          href="/"
          title="Home"
          className="w-15 h-15 flex items-center justify-center rounded-full border border-cyan-900/40 bg-slate-950/75 backdrop-blur-md text-slate-300 hover:text-cyan-400 hover:border-cyan-500/60 shadow-lg shadow-cyan-950/40 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-cyan-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
      </div>
    </>
  );
}