import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MYTH_CARDS } from '../data/argentinosaurusData';

gsap.registerPlugin(ScrollTrigger);

export const MythReality: React.FC = () => {
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.myth-stagger-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: gridRef.current || sectionRef.current,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleCard = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allFlipped = MYTH_CARDS.every((c) => Boolean(flippedIds[c.id]));

  const toggleAll = () => {
    if (allFlipped) {
      setFlippedIds({});
    } else {
      const next: Record<string, boolean> = {};
      for (const c of MYTH_CARDS) {
        next[c.id] = true;
      }
      setFlippedIds(next);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="myth-reality"
      aria-labelledby="myth-reality-heading"
      className="relative border-t border-[#D8C089]/15 bg-gradient-to-b from-[#07190E] via-[#0E3320] to-[#07190E] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 items-end gap-8 border-b border-[#D8C089]/20 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex items-baseline gap-5">
              <span
                className="section-number-outline text-6xl leading-none sm:text-7xl"
                aria-hidden="true"
              >
                10
              </span>
              <div>
                <p className="font-display text-xs tracking-[0.22em] text-[#D8C089] uppercase">
                  PUBLIC PERCEPTION VS. PALEONTOLOGY
                </p>
                <h2
                  id="myth-reality-heading"
                  className="font-display mt-2 text-3xl tracking-[0.04em] text-[#FFF8E6] uppercase sm:text-5xl"
                  style={{ textWrap: 'balance' }}
                >
                  Myth vs. Reality
                </h2>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-end gap-4 lg:col-span-4 lg:items-end">
            <p className="text-sm text-[#FFF8E6]/85 lg:text-right">
              Click any card to flip between popular misconceptions and peer-reviewed fossil
              evidence.
            </p>
            <button
              type="button"
              onClick={toggleAll}
              className="rounded-lg border border-[#D8C089]/35 bg-[#07190E] px-4 py-2 text-xs font-display tracking-[0.14em] text-[#FFE08F] uppercase transition-colors hover:border-[#F7C95F] hover:bg-[#0E3320] cursor-pointer whitespace-nowrap"
            >
              {allFlipped ? 'Reset All to Myths' : 'Reveal All Realities'}
            </button>
          </div>
        </div>

        {/* 6 Interactive Flip Cards Grid */}
        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {MYTH_CARDS.map((card) => {
            const isFlipped = Boolean(flippedIds[card.id]);
            return (
              <button
                key={card.id}
                type="button"
                data-testid="myth-stagger-card"
                onClick={() => toggleCard(card.id)}
                aria-pressed={isFlipped}
                aria-label={`Myth ${card.number}: ${card.myth}. Click to flip for scientific reality.`}
                className="myth-stagger-card group relative flex min-h-[270px] flex-col justify-between rounded-2xl border border-[#D8C089]/25 bg-[#07190E]/90 p-7 text-left transition-colors duration-300 hover:border-[#F7C95F]/65 cursor-pointer will-change-transform"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-[#D8C089]/15 pb-3 text-xs tracking-[0.14em] uppercase">
                    <span
                      className={`font-display ${
                        isFlipped ? 'text-[#8C9B34]' : 'text-[#D9963A]'
                      }`}
                    >
                      {isFlipped ? `REALITY · ${card.number}` : `POPULAR MYTH · ${card.number}`}
                    </span>
                    <span className="text-[11px] text-[#D8C089]/75 group-hover:text-[#FFE08F]">
                      {isFlipped ? 'Click to view Myth ↺' : 'Click to reveal Reality →'}
                    </span>
                  </div>

                  {!isFlipped ? (
                    <div className="mt-6">
                      <h3 className="font-display text-xl leading-snug text-[#FFF8E6] sm:text-2xl">
                        {card.myth}
                      </h3>
                      <p className="mt-4 text-xs tracking-[0.08em] text-[#D8C089]/75 uppercase">
                        COMMON CLAIM IN POPULAR MEDIA
                      </p>
                    </div>
                  ) : (
                    <div className="mt-5">
                      <p className="text-xs text-[#D8C089]/75 line-through">{card.myth}</p>
                      <p className="mt-3 text-base leading-[1.7] font-normal text-[#FFF8E6]">
                        {card.reality}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 border-t border-[#D8C089]/15 pt-3 text-xs italic text-[#FFE08F]/85">
                  {card.epistemicNote}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
