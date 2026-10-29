import React, { useState } from 'react';
import { DISCOVERY_TIMELINE } from '../data/argentinosaurusData';

export const Timeline: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('1987');

  return (
    <section
      id="discovery"
      aria-labelledby="discovery-heading"
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
                03
              </span>
              <div>
                <p className="font-display text-xs tracking-[0.22em] text-[#D8C089] uppercase">
                  CHRONOLOGY · 1987 TO 2026
                </p>
                <h2
                  id="discovery-heading"
                  className="font-display mt-2 text-3xl tracking-[0.04em] text-[#FFF8E6] uppercase sm:text-5xl"
                  style={{ textWrap: 'balance' }}
                >
                  Discovery &amp; Scientific History
                </h2>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="max-w-prose text-base leading-[1.75] text-[#FFF8E6]/85">
              From a rancher’s chance discovery near Plaza Huincul in 1987 to pneumatic-hammer
              excavations, computer gait simulations, and the 2026 radiometric re-dating of the
              Huincul Formation.
            </p>
          </div>
        </div>

        {/* Vertical Timeline with Animated Draw-Line Spine */}
        <div className="relative mt-16">
          {/* Continuous Vertical Spine */}
          <div
            className="pointer-events-none absolute top-2 bottom-2 left-4 w-[1.5px] bg-gradient-to-b from-[#F7C95F] via-[#8C9B34] to-[#1F5B2F] sm:left-1/2 sm:-translate-x-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-10 sm:space-y-12">
            {DISCOVERY_TIMELINE.map((item, index) => {
              const isEven = index % 2 === 0;
              const isSelected = selectedYear === item.year;

              return (
                <li
                  key={item.year}
                  className="relative grid grid-cols-1 items-start sm:grid-cols-12"
                >
                  {/* Timeline Node Marker on the Spine */}
                  <button
                    type="button"
                    onClick={() => setSelectedYear(item.year)}
                    aria-label={`Highlight milestone ${item.year}: ${item.title}`}
                    className={`absolute top-5 left-4 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border transition-transform duration-200 sm:left-1/2 cursor-pointer ${
                      isSelected
                        ? 'scale-125 border-[#FFE08F] bg-[#F7C95F] shadow-[0_0_14px_#F7C95F]'
                        : 'border-[#D8C089]/60 bg-[#0E3320] hover:scale-110 hover:border-[#FFE08F]'
                    }`}
                  />

                  {/* Card Column (Alternating Left/Right on Desktop) */}
                  <div
                    className={`pl-12 sm:pl-0 ${
                      isEven
                        ? 'sm:col-span-5 sm:col-start-1 sm:pr-10 sm:text-right'
                        : 'sm:col-span-5 sm:col-start-8 sm:pl-10 sm:text-left'
                    }`}
                  >
                    <article
                      onClick={() => setSelectedYear(item.year)}
                      className={`rounded-xl border p-6 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-[#F7C95F]/55 bg-[#0E3320]/90 shadow-[0_12px_32px_rgba(7,25,14,0.65)]'
                          : 'border-[#D8C089]/18 bg-[#0E3320]/45 hover:border-[#D8C089]/40'
                      }`}
                    >
                      <div
                        className={`flex flex-wrap items-baseline gap-2 text-xs tracking-[0.12em] text-[#D8C089] ${
                          isEven ? 'sm:justify-end' : 'sm:justify-start'
                        }`}
                      >
                        <span className="font-display text-xl text-[#F7C95F] tabular-nums sm:text-2xl">
                          {item.year}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="uppercase">{item.highlight}</span>
                        {item.epistemicTag && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="italic text-[#FFE08F]/85">{item.epistemicTag}</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-display mt-2 text-lg tracking-[0.03em] text-[#FFF8E6] uppercase sm:text-xl">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-[1.7] text-[#FFF8E6]/85">
                        {item.description}
                      </p>
                    </article>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
