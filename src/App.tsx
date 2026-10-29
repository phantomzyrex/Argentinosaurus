/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { GlobalSvgFilters } from './components/EcosystemAtmosphere';
import { Loader } from './components/Loader';
import { CustomCursor } from './components/CustomCursor';
import { Nav } from './components/Nav';
import { MenuOverlay } from './components/MenuOverlay';
import { ScaleGauge } from './components/ScaleGauge';
import { Hero } from './components/Hero';
import { Overview } from './components/Overview';
import { Timeline } from './components/Timeline';
import { AnatomyHotspots } from './components/AnatomyHotspots';
import { SizeCompare } from './components/SizeCompare';
import { DietGrowth } from './components/DietGrowth';
import { EcosystemMap } from './components/EcosystemMap';
import { Taxonomy } from './components/Taxonomy';
import { EvolutionExtinction } from './components/EvolutionExtinction';
import { MythReality } from './components/MythReality';
import { Gallery } from './components/Gallery';
import { FastFactsSources } from './components/FastFactsSources';
import { Footer } from './components/Footer';
import { MENU_SECTIONS } from './data/argentinosaurusData';
import { getTargetSectionForKey } from './utils/scaleMath';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoaded, setIsLoaded] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') return true;
    }
    return false;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [keyboardHudToast, setKeyboardHudToast] = useState<{
    number: string;
    label: string;
  } | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);
  const activeSectionRef = useRef<number>(0);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const updateScrollState = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollProgress(0);
      } else {
        const p = Math.max(0, Math.min(1, window.scrollY / docHeight));
        setScrollProgress(p);
      }

      // Determine which section (01..13) is currently active in the viewport
      const viewportCenter = window.innerHeight * 0.38;
      let detectedIdx = 0;
      for (let i = 0; i < MENU_SECTIONS.length; i++) {
        const el = document.getElementById(MENU_SECTIONS[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportCenter) {
          detectedIdx = i;
        }
      }
      activeSectionRef.current = detectedIdx;
      setActiveSectionIndex(detectedIdx);
    };

    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();

    if (reducedMotion) {
      return () => window.removeEventListener('scroll', updateScrollState);
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      autoRaf: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      window.removeEventListener('scroll', updateScrollState);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  // GSAP ScrollTrigger animations for sections and Hero parallax
  useEffect(() => {
    if (reducedMotion || !isLoaded) return;

    const ctx = gsap.context(() => {
      const sectionIds = MENU_SECTIONS.slice(1).map((s) => `#${s.id}`);
      sectionIds.forEach((selector) => {
        const sectionEl = document.querySelector(selector);
        if (!sectionEl) return;

        const heading = sectionEl.querySelector('h2');
        if (heading) {
          gsap.fromTo(
            heading,
            { y: 24, opacity: 0.25 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionEl,
                start: 'top 82%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, [isLoaded, reducedMotion]);

  const handleLoaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const foundIdx = MENU_SECTIONS.findIndex((s) => s.id === sectionId);
    if (foundIdx !== -1) {
      activeSectionRef.current = foundIdx;
      setActiveSectionIndex(foundIdx);
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: 0, duration: 1.1 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Global Keyboard Navigation (ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Space)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (isMenuOpen || !isLoaded) return;
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;

      const activeEl = document.activeElement as HTMLElement | null;
      if (activeEl) {
        const tag = activeEl.tagName;
        if (
          tag === 'INPUT' ||
          tag === 'TEXTAREA' ||
          tag === 'SELECT' ||
          activeEl.isContentEditable
        ) {
          return;
        }
        // If Space is pressed while focused on a button or link, let native click happen
        if (e.key === ' ' && (tag === 'BUTTON' || tag === 'A')) {
          return;
        }
      }

      const targetSection = getTargetSectionForKey(
        activeSectionRef.current,
        e.key,
        e.shiftKey
      );

      if (!targetSection) return;

      e.preventDefault();
      activeSectionRef.current = targetSection.index;
      setActiveSectionIndex(targetSection.index);

      const chapterMeta = MENU_SECTIONS[targetSection.index];
      if (chapterMeta) {
        setKeyboardHudToast({
          number: chapterMeta.number,
          label: chapterMeta.label,
        });
        if (toastTimerRef.current) {
          window.clearTimeout(toastTimerRef.current);
        }
        toastTimerRef.current = window.setTimeout(() => {
          setKeyboardHudToast(null);
        }, 1600);
      }

      const el = document.getElementById(targetSection.id);
      if (el) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(el, { offset: 0, duration: 1.05 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, [isMenuOpen, isLoaded]);

  const handleBackToTop = useCallback(() => {
    setScrollProgress(0);
    activeSectionRef.current = 0;
    setActiveSectionIndex(0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#07190E] text-[#FFF8E6] selection:bg-[#D9963A]/35 selection:text-[#FFF8E6]">
      {/* Global SVG Filters (Duotone creature colour grading + horizon heat shimmer) */}
      <GlobalSvgFilters reducedMotion={reducedMotion} />

      {/* Custom Warm-Gold Ring Cursor (Desktop) */}
      <CustomCursor reducedMotion={reducedMotion} />

      {/* Minimal Meandering River Line Loader */}
      {!isLoaded && (
        <Loader onComplete={handleLoaderComplete} reducedMotion={reducedMotion} />
      )}

      {/* 3-Part Editorial Navigation Bar */}
      <Nav
        onOpenMenu={() => setIsMenuOpen(true)}
        onNavigateSection={scrollToSection}
        isLoaded={isLoaded}
      />

      {/* Full-Screen River-Forest Chapter Menu Overlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectSection={scrollToSection}
      />

      {/* Right-Edge Vertical Scale Gauge (0.0 m -> 7.3 m) + Keyboard Chapter HUD */}
      <ScaleGauge
        scrollProgress={scrollProgress}
        activeSectionIndex={activeSectionIndex}
        onNavigateSection={scrollToSection}
      />

      {/* Deep-Dive Keyboard Navigation Toast Indicator */}
      {keyboardHudToast && (
        <div
          role="status"
          aria-live="polite"
          data-testid="keyboard-nav-toast"
          className="pointer-events-none fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-xl border border-[#F7C95F]/45 bg-[#07190E]/92 px-4 py-2 text-xs shadow-[0_10px_30px_rgba(7,25,14,0.85)] transition-all duration-300"
        >
          <span className="font-display text-sm tracking-widest text-[#F7C95F] tabular-nums">
            {keyboardHudToast.number}
          </span>
          <span className="text-[#D8C089]/40" aria-hidden="true">
            ·
          </span>
          <span className="font-display tracking-[0.14em] text-[#FFF8E6] uppercase">
            {keyboardHudToast.label}
          </span>
        </div>
      )}

      {/* Main Editorial Monograph Content */}
      <main>
        {/* 01 HERO */}
        <Hero
          isLoaded={isLoaded}
          reducedMotion={reducedMotion}
          onExploreClick={() => scrollToSection('overview')}
        />

        {/* 02 OVERVIEW */}
        <Overview />

        {/* 03 DISCOVERY & HISTORY */}
        <Timeline />

        {/* 04 ANATOMY */}
        <AnatomyHotspots />

        {/* 05 SIZE COMPARISON */}
        <SizeCompare />

        {/* 06 DIET & GROWTH */}
        <DietGrowth />

        {/* 07 HABITAT & DISTRIBUTION */}
        <EcosystemMap />

        {/* 08 CLASSIFICATION & SPECIES */}
        <Taxonomy />

        {/* 09 EVOLUTION & EXTINCTION */}
        <EvolutionExtinction />

        {/* 10 MYTH VS REALITY */}
        <MythReality />

        {/* 11 GALLERY */}
        <Gallery />

        {/* 12 FAST FACTS & SOURCES */}
        <FastFactsSources />
      </main>

      {/* 13 CONTACT & FOOTER */}
      <Footer onBackToTop={handleBackToTop} />
    </div>
  );
}
