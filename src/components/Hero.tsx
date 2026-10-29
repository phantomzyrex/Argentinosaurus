import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  HERO_IMAGE_PATH,
  FALLBACK_UPLOADED_IMAGE_PATH,
} from '../data/argentinosaurusData';
import { HeroBackAtmosphere, HeroFrontAtmosphere } from './EcosystemAtmosphere';

interface HeroProps {
  isLoaded: boolean;
  reducedMotion: boolean;
  onExploreClick: () => void;
}

const WORDMARK_LETTERS = 'ARGENTINOSAURUS'.split('');

export const Hero: React.FC<HeroProps> = ({
  isLoaded,
  reducedMotion,
  onExploreClick,
}) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [imgSrc, setImgSrc] = useState(HERO_IMAGE_PATH);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const creatureWrapRef = useRef<HTMLDivElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);

  // Mouse parallax handler on desktop
  useEffect(() => {
    if (reducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      setMouseOffset({ x: nx, y: ny });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  // Entrance choreography + two subtle ground tremors when loaded
  useEffect(() => {
    if (!isLoaded) return;
    if (reducedMotion) {
      gsap.set(lettersRef.current, { yPercent: 0, opacity: 1 });
      gsap.set(creatureWrapRef.current, { x: 0, scale: 1, opacity: 1, filter: 'blur(0px)' });
      gsap.set(taglineRef.current, { opacity: 0.78, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Wordmark letters rise one by one from mask (stagger 0.045s)
      tl.fromTo(
        lettersRef.current.filter(Boolean),
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.045 },
        0.05
      );

      // Creature slides in from the right with scale 1.08 -> 1 and slight blur-to-sharp
      tl.fromTo(
        creatureWrapRef.current,
        { x: 90, scale: 1.08, opacity: 0, filter: 'blur(8px)' },
        { x: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.35, ease: 'power3.out' },
        0.18
      );

      // Two subtle ground tremors (1-2px screen shake, ~400ms each) as the giant settles
      if (frameRef.current) {
        tl.to(
          frameRef.current,
          {
            keyframes: [
              { y: 2, x: -1, duration: 0.06 },
              { y: -2, x: 1, duration: 0.06 },
              { y: 1.5, x: 0, duration: 0.08 },
              { y: 0, x: 0, duration: 0.12 },
            ],
          },
          0.75
        );
        tl.to(
          frameRef.current,
          {
            keyframes: [
              { y: 1.5, x: 1, duration: 0.06 },
              { y: -1.5, x: -1, duration: 0.06 },
              { y: 0, x: 0, duration: 0.14 },
            ],
          },
          1.22
        );
      }

      // Tagline reveals softly
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 10 },
        { opacity: 0.78, y: 0, duration: 0.8 },
        0.85
      );
    });

    return () => ctx.revert();
  }, [isLoaded, reducedMotion]);

  const wordmarkShiftX = reducedMotion ? 0 : mouseOffset.x * 12;
  const wordmarkShiftY = reducedMotion ? 0 : mouseOffset.y * 8;
  const creatureShiftX = reducedMotion ? 0 : mouseOffset.x * -24;
  const creatureShiftY = reducedMotion ? 0 : mouseOffset.y * -14;

  return (
    <section
      id="hero"
      aria-label="Hero — Argentinosaurus on the Patagonian River Plain"
      className="relative h-screen min-h-[640px] w-full bg-[#07190E] p-2.5 sm:p-3.5"
    >
      {/* Full-viewport rounded frame (24px radius) with thin dark margin around it */}
      <div
        ref={frameRef}
        className="hero-ecosystem-gradient relative h-full w-full overflow-hidden rounded-[24px] border border-[#D8C089]/15"
      >
        {/* LAYER 1-3: Sunbeams, Horizon Heat Shimmer, Distant Conifer/Fern Treeline, Braided River */}
        <HeroBackAtmosphere mouseOffset={mouseOffset} reducedMotion={reducedMotion} />

        {/* LAYER 4: GIGANTIC WORDMARK (Z-10, sits at 52% vertical middle on desktop, behind the creature's central torso/neck) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[44%] z-10 flex -translate-y-1/2 flex-col items-center justify-center px-6 transition-transform duration-300 ease-out md:top-[52%] md:px-12"
          style={{
            transform: `translate3d(${wordmarkShiftX}px, ${wordmarkShiftY}px, 0)`,
          }}
        >
          {/* Desktop & Tablet single-line ~85% viewport width wordmark */}
          <h1
            aria-label="ARGENTINOSAURUS"
            className="font-display wordmark-glow hidden w-[85vw] max-w-[1440px] justify-between text-center text-[7.1vw] leading-[0.92] font-normal tracking-[-0.01em] text-[#FFF8E6] uppercase select-none md:flex"
          >
            {WORDMARK_LETTERS.map((char, idx) => (
              <span key={idx} className="inline-block overflow-hidden py-1">
                <span
                  ref={(el) => {
                    lettersRef.current[idx] = el;
                  }}
                  className="inline-block"
                >
                  {char}
                </span>
              </span>
            ))}
          </h1>

          {/* Mobile two-line split wordmark ("ARGENTINO / SAURUS" at ~13vw) */}
          <div
            aria-hidden="true"
            className="font-display wordmark-glow flex flex-col items-center text-center leading-[0.94] tracking-[-0.01em] text-[#FFF8E6] uppercase select-none md:hidden"
          >
            <span className="text-[12.8vw]">ARGENTINO</span>
            <span className="mt-1 text-[13.4vw]">SAURUS</span>
          </div>
        </div>

        {/* LAYER 5: TRANSPARENT CREATURE CUTOUT IN FRONT OF WORDMARK (Z-20) */}
        <div
          ref={creatureWrapRef}
          className="pointer-events-none absolute inset-x-0 bottom-[21%] z-20 flex items-end justify-center md:bottom-[4%]"
          style={{
            transform: `translate3d(${creatureShiftX}px, ${creatureShiftY}px, 0)`,
          }}
        >
          <div className="animate-creature-idle relative flex h-[44vh] w-[225vw] shrink-0 -translate-x-[13%] items-end justify-center sm:h-[62vh] sm:w-[140vw] md:h-[78vh] md:w-[96vw] md:max-w-[1400px] md:-translate-x-[12%] lg:h-[82vh]">
            {/* Warm rim backlight aura directly behind the creature's neck and back */}
            <div
              className="absolute top-[10%] left-[55%] h-[68%] w-[58%] -translate-x-1/2 rounded-full opacity-55"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(255,224,143,0.48) 0%, rgba(217,150,58,0.20) 45%, transparent 72%)',
              }}
            />

            <img
              src={imgSrc}
              onError={() => {
                if (imgSrc !== FALLBACK_UPLOADED_IMAGE_PATH) {
                  setImgSrc(FALLBACK_UPLOADED_IMAGE_PATH);
                }
              }}
              alt="Life reconstruction of Argentinosaurus huinculensis striding across a braided Patagonian river plain"
              referrerPolicy="no-referrer"
              className="creature-hero-grade relative z-10 h-full w-full object-contain object-bottom select-none"
            />

            {/* Subtle warm-olive atmospheric tint overlay matching the surrounding plain */}
            <div
              className="pointer-events-none absolute inset-0 z-20 opacity-12"
              style={{
                background:
                  'linear-gradient(180deg, rgba(247,201,95,0.08) 0%, rgba(140,155,52,0.18) 65%, rgba(14,51,32,0.55) 100%)',
              }}
            />

            {/* Dust puffs drifting up around the pillar-like feet */}
            <div className="absolute bottom-[4%] left-[44%] z-20 flex gap-8">
              <span
                className="animate-dust-puff block h-20 w-36 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(216,192,137,0.42) 0%, rgba(217,150,58,0.16) 48%, transparent 72%)',
                }}
              />
              <span
                className="animate-dust-puff block h-24 w-40 rounded-full"
                style={{
                  animationDelay: '2.1s',
                  background:
                    'radial-gradient(circle, rgba(216,192,137,0.38) 0%, rgba(140,155,52,0.14) 48%, transparent 72%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Tagline & Epistemic Note positioned clearly in the lower river-forest zone (Z-35) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-14 z-35 flex flex-col items-center justify-center px-6 text-center sm:bottom-16">
          <p
            ref={taglineRef}
            className="font-display text-sm tracking-[0.22em] text-[#FFF8E6]/80 uppercase drop-shadow-[0_2px_10px_rgba(7,25,14,0.9)] sm:text-base"
          >
            Titan of the Patagonian River Plains
          </p>
          <p className="mt-1 text-xs tracking-[0.08em] text-[#D8C089]/75 drop-shadow-[0_1px_8px_rgba(7,25,14,0.95)]">
            Huincul Formation · Early Cretaceous (Albian, ~107 Ma) · Lengths ~30–35 m &amp; Mass
            65–80 t (Estimates)
          </p>
        </div>

        {/* LAYER 6-9: Ground Haze, Dust/Pollen & Drifting Leaves Canvas, Foreground Conifers/Ferns, Film Grain */}
        <HeroFrontAtmosphere mouseOffset={mouseOffset} reducedMotion={reducedMotion} />

        {/* Bottom-centre SCROLL TO EXPLORE trigger */}
        <div className="absolute inset-x-0 bottom-3.5 z-40 flex justify-center">
          <button
            type="button"
            onClick={onExploreClick}
            aria-label="Scroll to explore Overview section"
            className="group flex flex-col items-center gap-1 bg-transparent border-0 px-4 py-1 text-[11px] font-display tracking-[0.22em] text-[#FFF8E6]/75 uppercase transition-colors hover:text-[#FFE08F] cursor-pointer"
          >
            <span>SCROLL TO EXPLORE</span>
            <span className="block h-3.5 w-[1px] bg-gradient-to-b from-[#FFE08F] to-transparent transition-transform duration-300 group-hover:translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
