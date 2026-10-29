import React from 'react';
import { FAST_FACTS, SCIENTIFIC_SOURCES } from '../data/argentinosaurusData';

export const FastFactsSources: React.FC = () => {
  return (
    <section
      id="fast-facts"
      aria-labelledby="fast-facts-heading"
      className="relative border-t border-[#D8C089]/15 bg-gradient-to-b from-[#07190E] via-[#0E3320] to-[#07190E] py-24 sm:py-32"
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
                12
              </span>
              <div>
                <p className="font-display text-xs tracking-[0.22em] text-[#D8C089] uppercase">
                  COMPENDIUM &amp; BIBLIOGRAPHY
                </p>
                <h2
                  id="fast-facts-heading"
                  className="font-display mt-2 text-3xl tracking-[0.04em] text-[#FFF8E6] uppercase sm:text-5xl"
                  style={{ textWrap: 'balance' }}
                >
                  Fast Facts &amp; Scientific Sources
                </h2>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="max-w-prose text-base leading-[1.75] text-[#FFF8E6]/85">
              Eight key paleontological takeaways and the peer-reviewed literature and museum
              repositories underpinning every figure on this page.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left 6 Cols: 8 "Did You Know" Fast Facts */}
          <div className="lg:col-span-6">
            <h3 className="font-display text-xl tracking-[0.04em] text-[#FFE08F] uppercase">
              8 Essential Facts (“Did You Know?”)
            </h3>

            <ol className="mt-6 space-y-4">
              {FAST_FACTS.map((fact, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 rounded-xl border border-[#D8C089]/18 bg-[#07190E]/85 p-5"
                >
                  <span className="font-display text-lg text-[#F7C95F] tabular-nums shrink-0">
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-[1.7] text-[#FFF8E6]/90">{fact}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Right 6 Cols: Complete Scientific Bibliography & Institutional Repositories */}
          <div className="lg:col-span-6">
            <h3 className="font-display text-xl tracking-[0.04em] text-[#FFE08F] uppercase">
              Primary Literature &amp; Museum Repositories
            </h3>

            <div className="mt-6 rounded-2xl border border-[#D8C089]/20 bg-[#07190E]/90 p-6 sm:p-8">
              <ul className="space-y-3 text-xs leading-relaxed text-[#FFF8E6]/80">
                {SCIENTIFIC_SOURCES.map((source, idx) => (
                  <li
                    key={idx}
                    className="border-b border-[#D8C089]/12 pb-2.5 last:border-b-0 last:pb-0"
                  >
                    {source}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
