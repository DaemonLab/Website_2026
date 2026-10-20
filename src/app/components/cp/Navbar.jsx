'use client';

import { useState, useEffect, useRef } from 'react';

const navItems = [
  { name: 'OVERVIEW', id: 'overview' },
  { name: 'MEMBERS', id: 'members' },
  { name: 'EVENTS', id: 'events' },
  { name: 'ACHIEVEMENTS', id: 'achievements' },
  { name: 'ROADMAP', id: 'roadmap' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const navRef = useRef(null);
  const itemRefs = useRef({});

  // 1. Position change when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Dynamic smooth positioning of the bottom border highlight link
  const updateIndicator = (id) => {
    const currentItem = itemRefs.current[id];
    const navContainer = navRef.current;

    if (currentItem && navContainer) {
      const itemRect = currentItem.getBoundingClientRect();
      const containerRect = navContainer.getBoundingClientRect();

      setIndicatorStyle({
        left: itemRect.left - containerRect.left,
        width: itemRect.width,
      });
    }
  };

  useEffect(() => {
    updateIndicator(activeSection);
  }, [activeSection]);

  // Recalculate underline position on window resize
  useEffect(() => {
    const handleResize = () => updateIndicator(activeSection);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  // 3. ScrollSpy observer to auto-highlight active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries) => {
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
  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'top-4 left-1/2 -translate-x-1/2'
          : 'top-6 left-6'
      }`}
    >
      <div
        ref={navRef}
        className={`relative flex items-center gap-6 px-6 py-3.5 rounded-full border transition-all duration-500 w-max ${
          isScrolled
            ? 'bg-slate-950/70 backdrop-blur-md border-blue-900/40 shadow-xl shadow-blue-950/50'
            : 'bg-[#030712]/80 backdrop-blur-sm border-blue-900/30'
        }`}
      >
        {/* Domain Logo & Title */}
        <div className="flex items-center gap-3 pr-5 border-r border-slate-800">
          <div className="w-8 h-8 rounded-full border border-blue-500/50 flex items-center justify-center bg-blue-950/30 text-blue-400 font-mono text-xs font-bold">
            {"</>"}
          </div>
          <span className="text-white font-mono font-bold tracking-wider text-sm flex items-center gap-1.5">
            <span className="text-blue-500">CP</span> DOMAIN
          </span>
        </div>

        {/* Scroll Links */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                ref={(el) => (itemRefs.current[item.id] = el)}
                onClick={() => scrollToSection(item.id)}
                className={`text-xs font-semibold tracking-wider transition-colors duration-300 uppercase py-1 ${
                  isActive
                    ? 'text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Highlighted Border line directly at the bottom edge of the parent div */}
        <div
          className="absolute bottom-0 h-[2.5px] bg-blue-500 rounded-full shadow-[0_0_12px_#3b82f6] transition-all duration-300 ease-out"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        />
      </div>
    </header>
  );
}