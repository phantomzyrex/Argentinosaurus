import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EvolutionExtinction: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsGridRef = useRef<HTMLDivElement | null>(null);
  const timelineCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.evo-stagger-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: cardsGridRef.current || sectionRef.current,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (timelineCardRef.current) {
        gsap.fromTo(
          timelineCardRef.current,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: timelineCardRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="evolution"
      aria-labelledby="evolution-heading"
      className="relative border-t border-[#D8C089]/15 bg-[#07190E] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 items-end gap-8 border-b border-[#D8C089]/20 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-baseline gap-5">
              <span
                className="section-number-outline text-6xl leading-none sm:text-7xl"
                aria-hidden="true"
              >
                09
              </span>
              <div>
                <p className="font-display text-xs tracking-[0.22em] text-[#D8C089] uppercase">
                  MACROEVOLUTION &amp; GEOCHRONOLOGY
                </p>
                <h2
                  id="evolution-heading"
                  className="font-display mt-2 text-3xl tracking-[0.04em] text-[#FFF8E6] uppercase sm:text-5xl"
                  style={{ textWrap: 'balance' }}
                >
                  Evolution &amp; Extinction
                </h2>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="max-w-prose text-base leading-[1.75] text-[#FFF8E6]/85">
              Titanosaurs were the dominant sauropods of the Cretaceous. On the revised 2026
              dating, <em>Argentinosaurus</em> lived roughly 40 million years before the
              end-Cretaceous asteroid impact—not at the very end of the Age of Dinosaurs.
            </p>
          </div>
        </div>

        {/* Drivers of Sauropod Gigantism & Extinction Narrative */}
        <div ref={cardsGridRef} className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div
            data-testid="evo-stagger-card"
            className="evo-stagger-card rounded-2xl border border-[#D8C089]/20 bg-[#0E3320]/40 p-6 sm:p-8 lg:col-span-6 will-change-transform"
          >
            <p className="font-display text-xs tracking-[0.16em] text-[#D8C089] uppercase">
              BIOLOGICAL DRIVERS OF GIGANTISM · SANDER ET AL. (2011)
            </p>
            <h3 className="font-display mt-2 text-2xl tracking-[0.03em] text-[#FFF8E6] uppercase">
              How Sauropods Reached Giant Size
            </h3>
            <p className="mt-4 text-sm leading-[1.75] text-[#FFF8E6]/85">
              Giant size in sauropods was probably made possible by an interlocking combination of
              evolutionary traits:
            </p>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#FFF8E6]/85">
              <li className="border-b border-[#D8C089]/12 pb-2">
                <strong>Fast, energy-efficient feeding:</strong> A long neck and no chewing allowed
                rapid foliage intake across a huge feeding envelope without shifting the heavy
                torso.
              </li>
              <li className="border-b border-[#D8C089]/12 pb-2">
                <strong>Extended gut retention &amp; protection:</strong> Great body volume let them
                ferment food in the gut for a long time to extract more energy, while rendering
                healthy adults formidable against predators.
              </li>
              <li className="border-b border-[#D8C089]/12 pb-2">
                <strong>Rapid growth &amp; high fecundity:</strong> Fast ontogenetic growth and
                clutches of many small offspring enabled quick population recovery.
              </li>
              <li>
                <strong>Predator–prey escalation:</strong> Hallett and Wedel (2016) argue that
                evolutionary increases in sauropod body size were followed by corresponding
                increases in the size of their theropod predators (such as carcharodontosaurids).
              </li>
            </ul>
          </div>

          {/* Extinction & Why Did the Date Change Card */}
          <div className="flex flex-col justify-between gap-6 lg:col-span-6">
            <div
              data-testid="evo-stagger-card"
              className="evo-stagger-card rounded-2xl border border-[#D8C089]/20 bg-[#0E3320]/40 p-6 sm:p-8 will-change-transform"
            >
              <p className="font-display text-xs tracking-[0.16em] text-[#D8C089] uppercase">
                DISAPPEARANCE &amp; CRETACEOUS SURVIVAL
              </p>
              <h3 className="font-display mt-2 text-2xl tracking-[0.03em] text-[#FFF8E6] uppercase">
                Fate of Argentinosaurus vs. Titanosauria
              </h3>
              <p className="mt-3 text-sm leading-[1.75] text-[#FFF8E6]/85">
                Why <em>Argentinosaurus</em> itself disappeared is <strong>unknown</strong>; its
                fossils are known exclusively from the Huincul Formation. However, titanosaurs as a
                clade thrived throughout the remainder of the Cretaceous and survived right up until
                the end-Cretaceous mass extinction about <strong>66 million years ago</strong>,
                triggered by the Chicxulub asteroid impact.
              </p>
            </div>

            {/* Required "Why did the date change?" Card */}
            <div
              data-testid="evo-stagger-card"
              className="evo-stagger-card rounded-2xl border border-[#F7C95F]/45 bg-[#07190E] p-6 sm:p-8 will-change-transform"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs tracking-[0.12em] text-[#F7C95F] uppercase">
                <span>CHRONOSTRATIGRAPHIC REVISION · MANIEL ET AL. (2026)</span>
                <span className="italic">· new, from one study, may be refined</span>
              </div>
              <h3 className="font-display mt-2 text-xl tracking-[0.03em] text-[#FFF8E6] uppercase">
                Why Did the Date Change from ~97–94 Ma to ~107 Ma?
              </h3>
              <p className="mt-3 text-sm leading-[1.75] text-[#FFF8E6]/85">
                The 2026 study by Maniel et al. argues that earlier radiometric estimates for the
                Huincul Formation (~97–94 Ma, Cenomanian–Turonian)—which relied on the single
                youngest detrital zircon grain—can come out more than 10 million years too young due
                to lead loss. New U–Pb zircon ages from volcanic ash beds place the formation in the{' '}
                <strong>early Albian (~106–107 million years ago)</strong>. Because this revision
                comes from one recent study, it may be further refined by future geochronology.
              </p>
            </div>
          </div>
        </div>

        {/* Animated Geological Timeline: Albian -> Cenomanian -> Turonian -> End-Cretaceous 66 Ma */}
        <div
          ref={timelineCardRef}
          data-testid="evo-timeline-card"
          className="mt-12 rounded-2xl border border-[#D8C089]/25 bg-[#0E3320]/30 p-6 sm:p-8 will-change-transform"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2 text-xs tracking-[0.12em] text-[#D8C089] uppercase">
            <span>GEOLOGICAL TIMELINE · EARLY TO LATE CRETACEOUS (113 MA → 66 MA)</span>
            <span>SOLID MARKER: ~107 MA (2026 STUDY) · FADED MARKER: ~97–94 MA (OLDER ESTIMATE)</span>
          </div>

          <div className="overflow-x-auto">
            <svg
              viewBox="0 0 1100 210"
              className="h-auto w-full min-w-[680px] select-none"
              role="img"
              aria-label="Geological timeline from Albian (113–100.5 Ma) through Cenomanian (100.5–93.9 Ma) and Turonian (93.9–89.8 Ma) to the end-Cretaceous extinction at 66 Ma"
            >
              {/* Stage Blocks */}
              {/* 1. Albian (113 - 100.5 Ma) */}
              <rect
                x="40"
                y="75"
                width="310"
                height="56"
                rx="6"
                fill="rgba(247, 201, 95, 0.22)"
                stroke="#F7C95F"
                strokeWidth="1.5"
              />
              <text x="195" y="100" textAnchor="middle" fill="#FFF8E6" fontSize="13" className="font-display">
                ALBIAN STAGE
              </text>
              <text x="195" y="118" textAnchor="middle" fill="#FFE08F" fontSize="10.5">
                ~113.0 – 100.5 Ma (Early Cretaceous)
              </text>

              {/* 2. Cenomanian (100.5 - 93.9 Ma) */}
              <rect
                x="356"
                y="75"
                width="220"
                height="56"
                rx="6"
                fill="rgba(140, 155, 52, 0.2)"
                stroke="#8C9B34"
                strokeWidth="1.2"
              />
              <text x="466" y="100" textAnchor="middle" fill="#FFF8E6" fontSize="13" className="font-display">
                CENOMANIAN
              </text>
              <text x="466" y="118" textAnchor="middle" fill="#D8C089" fontSize="10.5">
                100.5 – 93.9 Ma
              </text>

              {/* 3. Turonian (93.9 - 89.8 Ma) */}
              <rect
                x="582"
                y="75"
                width="175"
                height="56"
                rx="6"
                fill="rgba(31, 91, 47, 0.35)"
                stroke="#4A8C3A"
                strokeWidth="1.2"
              />
              <text x="670" y="100" textAnchor="middle" fill="#FFF8E6" fontSize="13" className="font-display">
                TURONIAN
              </text>
              <text x="670" y="118" textAnchor="middle" fill="#D8C089" fontSize="10.5">
                93.9 – 89.8 Ma
              </text>

              {/* 4. Later Late Cretaceous to 66 Ma */}
              <rect
                x="763"
                y="75"
                width="290"
                height="56"
                rx="6"
                fill="rgba(14, 51, 32, 0.55)"
                stroke="#D8C089"
                strokeOpacity="0.4"
                strokeDasharray="4 4"
              />
              <text x="908" y="100" textAnchor="middle" fill="#D8C089" fontSize="12" className="font-display">
                SENONIAN → MAASTRICHTIAN
              </text>
              <text x="908" y="118" textAnchor="middle" fill="#D8C089" opacity="0.8" fontSize="10">
                89.8 – 66.0 Ma (Later Titanosaurs Survive)
              </text>

              {/* SOLID MARKER: Argentinosaurus ~107 Ma (2026 Dating) */}
              <g transform="translate(185, 0)">
                <line x1="0" y1="28" x2="0" y2="75" stroke="#F7C95F" strokeWidth="2.5" />
                <circle cx="0" cy="75" r="7" fill="#F7C95F" />
                <rect x="-135" y="4" width="270" height="26" rx="4" fill="#F7C95F" />
                <text
                  x="0"
                  y="21"
                  textAnchor="middle"
                  fill="#07190E"
                  fontSize="11"
                  fontWeight="600"
                  className="font-display"
                >
                  ARGENTINOSAURUS · ~107 MA (2026 DATING)
                </text>
              </g>

              {/* FADED MARKER: Older Estimate (~97-94 Ma) */}
              <g transform="translate(535, 0)" opacity="0.58">
                <line
                  x1="0"
                  y1="131"
                  x2="0"
                  y2="174"
                  stroke="#D8C089"
                  strokeWidth="1.8"
                  strokeDasharray="4 3"
                />
                <circle cx="0" cy="131" r="5" fill="#D8C089" />
                <text x="0" y="190" textAnchor="middle" fill="#D8C089" fontSize="11" className="font-display">
                  OLDER ESTIMATE (~97–94 MA)
                </text>
              </g>

              {/* 66 Ma Chicxulub Impact Marker */}
              <g transform="translate(1053, 0)">
                <line x1="0" y1="45" x2="0" y2="155" stroke="#D9963A" strokeWidth="2.5" />
                <circle cx="0" cy="103" r="6" fill="#D9963A" />
                <text
                  x="-8"
                  y="38"
                  textAnchor="end"
                  fill="#FFE08F"
                  fontSize="11"
                  className="font-display"
                >
                  66 MA · CHICXULUB ASTEROID EXTINCTION
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
