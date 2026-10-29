import React from 'react';
import { OVERVIEW_STATS } from '../data/argentinosaurusData';

export const Overview: React.FC = () => {
  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className="relative border-t border-[#D8C089]/15 bg-gradient-to-b from-[#07190E] via-[#0E3320] to-[#07190E] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Section Header with Outlined Number 02 */}
        <div className="grid grid-cols-1 items-end gap-8 border-b border-[#D8C089]/20 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-baseline gap-5">
              <span
                className="section-number-outline text-6xl leading-none sm:text-7xl"
                aria-hidden="true"
              >
                02
              </span>
              <div>
                <p className="font-display text-xs tracking-[0.22em] text-[#D8C089] uppercase">
                  OVERVIEW · TAXON PROFILE
                </p>
                <h2
                  id="overview-heading"
                  className="font-display mt-2 text-3xl tracking-[0.04em] text-[#FFF8E6] uppercase sm:text-5xl"
                  style={{ textWrap: 'balance' }}
                >
                  The Argentine Lizard
                </h2>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="max-w-prose text-base leading-[1.75] text-[#FFF8E6]/90 sm:text-[17px]">
              <em>Argentinosaurus huinculensis</em> was a gigantic, long-necked, plant-eating
              sauropod dinosaur—a titanosaur—that lived in what is now Patagonia, Argentina. It is
              among the largest land animals ever known, but it is represented by only a few
              bones, so every size figure is an <strong>estimate</strong>.
            </p>
          </div>
        </div>

        {/* Epistemic Notice Banner (Zero-Pill Unboxed Typographic Discipline) */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#D8C089]/15 pb-6 text-xs tracking-[0.08em] text-[#D8C089]">
          <span>
            HOLOTYPE SPECIMEN: MCF-PVPH-1 · MUSEO MUNICIPAL CARMEN FUNES, PLAZA HUINCUL
          </span>
          <span>
            PRESERVED ELEMENTS: DORSAL VERTEBRAE · PARTIAL SACRUM · RIBS · RIGHT FIBULA (1.55 M)
          </span>
        </div>

        {/* Stat Cards Grid */}
        <dl className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OVERVIEW_STATS.map((stat) => (
            <div
              key={stat.id}
              className="group flex flex-col justify-between rounded-xl border border-[#D8C089]/18 bg-[#07190E]/80 p-6 transition-colors duration-200 hover:border-[#F7C95F]/45"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2 text-xs tracking-[0.12em] text-[#D8C089]/80 uppercase">
                  <dt className="font-display">{stat.label}</dt>
                  {stat.epistemicTag && (
                    <span className="text-[11px] tracking-[0.06em] text-[#F7C95F]/85 lowercase italic">
                      · {stat.epistemicTag}
                    </span>
                  )}
                </div>

                <dd className="font-display mt-3 text-xl tracking-[0.02em] text-[#FFF8E6] tabular-nums sm:text-2xl">
                  {stat.value}
                </dd>
              </div>

              <p className="mt-4 border-t border-[#D8C089]/12 pt-3 text-sm leading-relaxed text-[#FFF8E6]/80">
                {stat.detail}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
