import React from 'react';

interface NavProps {
  onOpenMenu: () => void;
  onNavigateSection: (sectionId: string) => void;
  isLoaded: boolean;
}

export const Nav: React.FC<NavProps> = ({ onOpenMenu, onNavigateSection, isLoaded }) => {
  return (
    <header
      className={`fixed top-0 right-0 left-0 z-40 transition-opacity duration-700 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Soft dark scrim behind nav row so it remains readable on bright gold top glow and dark sections alike */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{
          background:
            'linear-gradient(180deg, rgba(21, 15, 6, 0.42) 0%, rgba(21, 15, 6, 0.14) 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <nav
        aria-label="Primary Editorial Navigation"
        className="relative mx-auto flex max-w-[1680px] items-center justify-between gap-8 px-6 pt-6 pb-3 sm:px-10 sm:pt-7"
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
            className="mb-1.5 block h-[1px] w-16 bg-[#FFF8E6]/80 transition-all duration-300 ease-out group-hover:w-28 group-hover:bg-[#FFE08F] group-hover:shadow-[0_0_10px_rgba(255,224,143,0.75)] sm:w-20"
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
    </header>
  );
};
