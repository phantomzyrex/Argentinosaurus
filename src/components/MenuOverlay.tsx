import React, { useEffect, useState } from 'react';
import {
  MENU_SECTIONS,
  HERO_IMAGE_PATH,
  FALLBACK_UPLOADED_IMAGE_PATH,
} from '../data/argentinosaurusData';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (sectionId: string) => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({
  isOpen,
  onClose,
  onSelectSection,
}) => {
  const [imgSrc, setImgSrc] = useState(HERO_IMAGE_PATH);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navigableChapters = MENU_SECTIONS.filter((s) => s.number !== '01');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Exhibition Chapters Menu"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-[#08150B] text-[#FFF8E6] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isOpen
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-full opacity-0'
      }`}
    >
      {/* Organic meandering river-shaped SVG top border and ambient river channels */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="pointer-events-none absolute top-0 left-0 h-16 w-full opacity-35"
        aria-hidden="true"
      >
        <path
          d="M0,42 C320,98 620,6 960,54 C1210,88 1350,24 1440,48 L1440,0 L0,0 Z"
          fill="#D9963A"
          fillOpacity="0.18"
        />
        <path
          d="M0,64 C280,18 680,96 1040,38 C1260,8 1380,68 1440,52"
          fill="none"
          stroke="#D8C089"
          strokeWidth="1.5"
          strokeOpacity="0.45"
        />
      </svg>

      {/* Top row inside overlay: Brand & CLOSE with thin line */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1540px] items-center justify-between px-6 pt-7 pb-4 sm:px-10">
        <span className="font-display text-sm tracking-[0.08em] text-[#D8C089] uppercase">
          ARGENTINOSAURUS · DIGITAL MONOGRAPH
        </span>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close chapter menu"
          className="group flex flex-col items-center bg-transparent border-0 p-1 cursor-pointer whitespace-nowrap"
        >
          <span
            className="mb-1.5 block h-[1px] w-16 bg-[#FFF8E6]/80 transition-all duration-300 group-hover:w-24 group-hover:bg-[#F7C95F]"
            aria-hidden="true"
          />
          <span className="font-display text-sm tracking-[0.14em] text-[#FFF8E6] uppercase transition-colors group-hover:text-[#F7C95F]">
            CLOSE
          </span>
        </button>
      </div>

      {/* Main content grid: Numbered links 02 Overview ... 13 Contact + Small Creature Study */}
      <div className="relative z-10 mx-auto my-auto grid w-full max-w-[1540px] grid-cols-1 items-center gap-10 px-6 py-8 lg:grid-cols-12 sm:px-10">
        <div className="lg:col-span-8">
          <p className="mb-6 text-xs tracking-[0.2em] text-[#D8C089]/75 uppercase">
            CHAPTER INDEX · FROM OPEN RIVER PLAIN TO GALLERY FOREST
          </p>

          <div className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
            {navigableChapters.map((chapter) => (
              <button
                key={chapter.id}
                type="button"
                onClick={() => {
                  onSelectSection(chapter.id);
                  onClose();
                }}
                className="group flex items-baseline gap-4 border-b border-[#FFF8E6]/10 py-3 text-left transition-colors duration-200 hover:border-[#F7C95F]/60 cursor-pointer"
              >
                <span className="font-display text-lg tracking-wider text-[#D9963A] tabular-nums transition-transform duration-200 group-hover:translate-x-1">
                  {chapter.number}
                </span>
                <span className="font-display text-xl tracking-[0.04em] text-[#FFF8E6] uppercase transition-colors duration-200 group-hover:text-[#FFE08F] sm:text-2xl">
                  {chapter.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right side: Small copy of creature image & specimen note */}
        <div className="flex flex-col items-start justify-center border-t border-[#FFF8E6]/15 pt-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:pl-10">
          <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#1F5B2F]/35 via-[#0E3320]/50 to-[#07190E] p-6 border border-[#D8C089]/20">
            <img
              src={imgSrc}
              onError={() => {
                if (imgSrc !== FALLBACK_UPLOADED_IMAGE_PATH) {
                  setImgSrc(FALLBACK_UPLOADED_IMAGE_PATH);
                }
              }}
              alt="Argentinosaurus huinculensis side profile reconstruction"
              referrerPolicy="no-referrer"
              className="creature-hero-grade mx-auto h-36 w-full object-contain"
            />
            <div className="mt-4 border-t border-[#FFF8E6]/10 pt-3">
              <p className="font-display text-xs tracking-[0.12em] text-[#FFE08F] uppercase">
                HOLOTYPE MCF-PVPH-1 · PLAZA HUINCUL
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#FFF8E6]/75">
                Huincul Formation, Neuquén Basin, Patagonia · Early Cretaceous (Albian, ~107 Ma,
                revised 2026). All soft-tissue colours are artistic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar inside menu */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1540px] flex-wrap items-center justify-between gap-4 border-t border-[#FFF8E6]/10 px-6 py-5 text-xs text-[#D8C089]/70 sm:px-10">
        <span>PRESS ESC TO CLOSE · USE ↑ ↓ OR SPACE TO JUMP SECTIONS</span>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="mailto:techhelp.shivang@gmail.com"
            className="text-[#8C9B34] transition-colors hover:text-[#F7C95F]"
          >
            techhelp.shivang@gmail.com
          </a>
          <span className="text-[#D8C089]/35" aria-hidden="true">
            ·
          </span>
          <a
            href="https://github.com/phantomzyrex"
            target="_blank"
            rel="noreferrer"
            className="text-[#FFF8E6]/80 transition-colors hover:text-[#FFE08F]"
          >
            github.com/phantomzyrex
          </a>
          <span className="text-[#D8C089]/35" aria-hidden="true">
            ·
          </span>
          <span>MUSEO CARMEN FUNES · NEUQUÉN, ARGENTINA</span>
        </div>
      </div>
    </div>
  );
};
