import React, { useEffect, useState } from 'react';

interface NavProps {
  onOpenMenu: () => void;
  onNavigateSection: (sectionId: string) => void;
  isLoaded: boolean;
}

export const Nav: React.FC<NavProps> = ({ onOpenMenu, onNavigateSection, isLoaded }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      data-testid="editorial-header"
      data-scrolled={isScrolled ? 'true' : 'false'}
      className={`fixed top-0 right-0 left-0 z-40 px-2.5 pt-2.5 transition-opacity duration-700 sm:px-3.5 sm:pt-3.5 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Top Hero scrim when at top of page so text stays crisp over sunlit gold glow */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-24 transition-opacity duration-700 ease-out ${
          isScrolled ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background:
            'linear-gradient(180deg, rgba(21, 15, 6, 0.34) 0%, rgba(21, 15, 6, 0.10) 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1860px]">
        {/* Scrolled Lighter River-Forest Header Backdrop with Feather-Soft Bottom Fade */}
        <div
          data-testid="scrolled-header-backdrop"
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 -bottom-8 rounded-t-[24px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
          }`}
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 0%, rgba(140, 155, 52, 0.36) 0%, rgba(74, 140, 58, 0.18) 52%, transparent 82%), linear-gradient(180deg, rgba(38, 102, 54, 0.94) 0%, rgba(28, 82, 44, 0.86) 38%, rgba(19, 61, 34, 0.62) 64%, rgba(14, 51, 32, 0.26) 84%, rgba(7, 25, 14, 0) 100%)',
          }}
        />

        <nav
          aria-label="Primary Editorial Navigation"
          data-testid="editorial-nav"
          className={`relative z-10 flex items-center justify-between gap-8 px-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-9 ${
            isScrolled ? 'pt-4 pb-4 sm:pt-5 sm:pb-5' : 'pt-4 pb-3 sm:pt-5'
          }`}
        >
          {/* Zone 1: Brand Name at Left */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('hero');
            }}
            className="font-display nav-text-shadow text-[13px] tracking-[0.08em] whitespace-nowrap text-[#FFF8E6] uppercase transition-all duration-200 hover:text-[#FFE08F] hover:drop-shadow-[0_0_12px_rgba(255,224,143,0.55)] sm:text-[15px] shrink-0"
          >
            ARGENTINOSAURUS
          </a>

          {/* Zone 2: MENU with thin 1px line (~80px wide) above it at Centre */}
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open chapter menu"
            className="group flex flex-col items-center justify-center bg-transparent border-0 p-1 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span
              className="mb-2 block h-[1px] w-16 bg-[#FFF8E6]/85 transition-all duration-300 ease-out group-hover:w-28 group-hover:bg-[#FFE08F] group-hover:shadow-[0_0_10px_rgba(255,224,143,0.75)] sm:w-20"
              aria-hidden="true"
            />
            <span className="font-display nav-text-shadow text-[13px] tracking-[0.14em] text-[#FFF8E6] uppercase transition-all duration-200 group-hover:text-[#FFE08F] group-hover:drop-shadow-[0_0_12px_rgba(255,224,143,0.65)] sm:text-[15px]">
              MENU
            </span>
          </button>

          {/* Zone 3: CONTACT at Right */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('contact');
            }}
            className="font-display nav-text-shadow text-[13px] tracking-[0.08em] whitespace-nowrap text-[#FFF8E6] uppercase transition-all duration-200 hover:text-[#FFE08F] hover:drop-shadow-[0_0_12px_rgba(255,224,143,0.55)] sm:text-[15px] shrink-0"
          >
            CONTACT
          </a>
        </nav>
      </div>
    </header>
  );
};
