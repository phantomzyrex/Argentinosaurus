import React, { useState } from 'react';
import {
  computeSizeComparison,
  type ComparisonMetricMode,
  type ComparisonEstimateMode,
} from '../utils/scaleMath';

export const SizeCompare: React.FC = () => {
  const [metricMode, setMetricMode] = useState<ComparisonMetricMode>('length');
  const [estimateMode, setEstimateMode] = useState<ComparisonEstimateMode>('conservative');

  const comparisons = computeSizeComparison(metricMode, estimateMode);
  const argLength = estimateMode === 'conservative' ? 33.0 : 39.7;
  const argMass = estimateMode === 'conservative' ? '65–80 tonnes (~73 t midpoint)' : '~83 tonnes';

  return (
    <section
      id="size-comparison"
      aria-labelledby="size-compare-heading"
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
                05
              </span>
              <div>
                <p className="font-display text-xs tracking-[0.22em] text-[#D8C089] uppercase">
                  METRIC &amp; VOLUMETRIC SCALE
                </p>
                <h2
                  id="size-compare-heading"
                  className="font-display mt-2 text-3xl tracking-[0.04em] text-[#FFF8E6] uppercase sm:text-5xl"
                  style={{ textWrap: 'balance' }}
                >
                  Comparative Scale Chart
                </h2>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="max-w-prose text-base leading-[1.75] text-[#FFF8E6]/85">
              Comparing <em>Argentinosaurus</em> against a modern human (1.7 m), African bush
              elephant (~3–4 m shoulder, up to ~6 t), <em>Tyrannosaurus rex</em> (~12 m, 8–9 t), a
              city bus (~12 m), and the blue whale (up to ~30 m, &gt;150 t).
            </p>
          </div>
        </div>

        {/* Interactive Dual Toggles: Length / Mass View + Conservative / High-end Estimate */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#D8C089]/20 bg-[#0E3320]/50 p-4">
          {/* Toggle 1: Length view / Mass view */}
          <div
            role="group"
            aria-label="Toggle between Length view and Mass view"
            className="flex items-center gap-1 rounded-lg bg-[#07190E] p-1 border border-[#D8C089]/20"
          >
            <button
              type="button"
              onClick={() => setMetricMode('length')}
              className={`rounded-md px-4 py-2 text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                metricMode === 'length'
                  ? 'bg-[#F7C95F] text-[#07190E]'
                  : 'text-[#FFF8E6]/80 hover:text-[#FFF8E6]'
              }`}
            >
              Length view
            </button>
            <button
              type="button"
              onClick={() => setMetricMode('mass')}
              className={`rounded-md px-4 py-2 text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                metricMode === 'mass'
                  ? 'bg-[#F7C95F] text-[#07190E]'
                  : 'text-[#FFF8E6]/80 hover:text-[#FFF8E6]'
              }`}
            >
              Mass view
            </button>
          </div>

          {/* Toggle 2: Conservative estimate / High-end estimate */}
          <div
            role="group"
            aria-label="Toggle between Conservative estimate and High-end estimate"
            className="flex flex-wrap items-center gap-1 rounded-lg bg-[#07190E] p-1 border border-[#D8C089]/20"
          >
            <button
              type="button"
              onClick={() => setEstimateMode('conservative')}
              className={`rounded-md px-4 py-2 text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                estimateMode === 'conservative'
                  ? 'bg-[#D9963A] text-[#07190E]'
                  : 'text-[#FFF8E6]/80 hover:text-[#FFF8E6]'
              }`}
            >
              Conservative estimate (30–35 m, 65–80 t)
            </button>
            <button
              type="button"
              onClick={() => setEstimateMode('high-end')}
              className={`rounded-md px-4 py-2 text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                estimateMode === 'high-end'
                  ? 'bg-[#D9963A] text-[#07190E]'
                  : 'text-[#FFF8E6]/80 hover:text-[#FFF8E6]'
              }`}
            >
              High-end estimate (39.7 m, ~83 t, 2013 model)
            </button>
          </div>
        </div>

        {/* SVG Silhouette Scale Chart */}
        <div className="mt-8 overflow-x-auto rounded-2xl border border-[#D8C089]/25 bg-[#07190E] p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs tracking-[0.1em] text-[#D8C089] uppercase">
            <span>
              ACTIVE MODEL: ARGENTINOSAURUS = {argLength} M LENGTH · {argMass} (ESTIMATE)
            </span>
            <span>NOTE: SAUROPOD SILHOUETTE IS A GENERIC RECONSTRUCTION (NECK &amp; TAIL UNKNOWN)</span>
          </div>

          <svg
            viewBox="0 0 1200 320"
            className="h-auto w-full min-w-[680px] select-none"
            role="img"
            aria-label="Proportional SVG silhouette scale comparison of Argentinosaurus, Blue Whale, Tyrannosaurus rex, City Bus, African Elephant, and Human"
          >
            {/* Metric Grid Lines (every 5 metres up to 40 m, and height lines up to 10 m) */}
            {[0, 5, 10, 15, 20, 25, 30, 35, 40].map((m) => {
              const x = 60 + (m / 40) * 1100;
              return (
                <g key={m}>
                  <line
                    x1={x}
                    y1={30}
                    x2={x}
                    y2={275}
                    stroke="rgba(216, 192, 137, 0.14)"
                    strokeDasharray="3 4"
                  />
                  <text
                    x={x}
                    y={296}
                    textAnchor="middle"
                    fill="#D8C089"
                    fontSize="11"
                    className="font-display"
                  >
                    {m} m
                  </text>
                </g>
              );
            })}

            {/* Ground Baseline */}
            <line x1="40" y1="275" x2="1175" y2="275" stroke="#D8C089" strokeWidth="1.5" />

            {/* 7.3 m Shoulder Height Reference Line */}
            <line
              x1="40"
              y1={275 - 7.3 * 18}
              x2="1175"
              y2={275 - 7.3 * 18}
              stroke="#F7C95F"
              strokeWidth="1"
              strokeDasharray="6 4"
              opacity="0.65"
            />
            <text
              x="1168"
              y={270 - 7.3 * 18}
              textAnchor="end"
              fill="#FFE08F"
              fontSize="10"
              className="font-display uppercase"
            >
              7.3 m Shoulder Height (2013 Digital Model Estimate)
            </text>

            {/* 1. Argentinosaurus Silhouette (Scaled dynamically by Conservative 33m vs High-End 39.7m) */}
            <g
              transform={`translate(60, 275) scale(${argLength / 40}, 1)`}
              className="transition-transform duration-500"
            >
              {/* Generic titanosaur profile with dashed neck/tail indicator */}
              <path
                d="M 0 -65 C 90 -72, 210 -88, 340 -128 C 430 -150, 520 -152, 600 -132 C 710 -158, 840 -215, 960 -232 C 985 -234, 1005 -224, 1010 -212 C 995 -202, 965 -205, 935 -195 C 835 -165, 735 -105, 650 -75 L 665 0 L 625 0 L 605 -65 C 535 -58, 475 -58, 425 -68 L 405 0 L 365 0 L 375 -82 C 245 -68, 115 -58, 0 -65 Z"
                fill="rgba(247, 201, 95, 0.24)"
                stroke="#F7C95F"
                strokeWidth="2.2"
                strokeDasharray="8 4"
              />
            </g>

            {/* 2. Blue Whale Silhouette (30 m, subtle translucent lower overlay) */}
            <g transform="translate(60, 272)">
              <path
                d="M 0 -24 C 140 -68, 420 -82, 690 -64 C 770 -55, 815 -34, 825 -18 C 775 -6, 620 -2, 420 -4 C 220 -6, 80 -12, 0 -24 Z"
                fill="rgba(140, 155, 52, 0.22)"
                stroke="#8C9B34"
                strokeWidth="1.5"
              />
              <text x="640" y="-72" fill="#D8C089" fontSize="10" className="font-display">
                BLUE WHALE (~30 m · &gt;150 TONNES)
              </text>
            </g>

            {/* 3. Tyrannosaurus rex (~12.3 m) */}
            <g transform="translate(60, 275)">
              <path
                d="M 0 -48 C 75 -52, 145 -68, 210 -78 C 255 -85, 295 -96, 330 -92 C 338 -82, 325 -70, 302 -68 C 265 -58, 235 -44, 212 -32 L 220 0 L 195 0 L 188 -34 C 125 -34, 65 -42, 0 -48 Z"
                fill="rgba(217, 150, 58, 0.35)"
                stroke="#D9963A"
                strokeWidth="1.5"
              />
              <text x="235" y="-98" fill="#FFE08F" fontSize="10" className="font-display">
                T. REX (~12 m) / CITY BUS (12 m)
              </text>
            </g>

            {/* 4. African Elephant (~6.5 m long, ~3.5 m shoulder) */}
            <g transform="translate(60, 275)">
              <rect
                x="45"
                y="-64"
                width="115"
                height="64"
                rx="18"
                fill="rgba(216, 192, 137, 0.28)"
                stroke="#D8C089"
                strokeWidth="1.5"
              />
              <text x="52" y="-72" fill="#D8C089" fontSize="10" className="font-display">
                ELEPHANT (3.5 m)
              </text>
            </g>

            {/* 5. Adult Human (1.7 m) */}
            <g transform="translate(60, 275)">
              <circle cx="14" cy="-27" r="4" fill="#FFF8E6" />
              <line x1="14" y1="-22" x2="14" y2="0" stroke="#FFF8E6" strokeWidth="3" />
              <text x="2" y="-36" fill="#FFF8E6" fontSize="10" className="font-display">
                HUMAN (1.7 m)
              </text>
            </g>
          </svg>

          {/* Quantitative Comparison Bars */}
          <div className="mt-8 space-y-4 border-t border-[#D8C089]/15 pt-6">
            {comparisons.map((item) => (
              <div
                key={item.subject.id}
                className={`rounded-xl border p-4 transition-colors ${
                  item.subject.isFocal
                    ? 'border-[#F7C95F]/60 bg-[#0E3320]/70'
                    : 'border-[#D8C089]/15 bg-[#0E3320]/25'
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="font-display text-base tracking-[0.04em] text-[#FFF8E6] uppercase">
                      {item.subject.name}
                    </span>
                    <span className="ml-2 text-xs text-[#D8C089]/75">
                      · {item.subject.subtitle}
                    </span>
                  </div>
                  <div className="font-display text-lg text-[#FFE08F] tabular-nums">
                    {item.formattedValue}
                  </div>
                </div>

                {/* Proportional Bar */}
                <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-[#07190E]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.subject.isFocal
                        ? 'bg-gradient-to-r from-[#D9963A] to-[#F7C95F]'
                        : 'bg-[#8C9B34]/75'
                    }`}
                    style={{ width: `${item.barPercentage}%` }}
                  />
                </div>

                <p className="mt-2 text-xs leading-relaxed text-[#FFF8E6]/75">
                  {item.subject.note}
                </p>
              </div>
            ))}
          </div>

          {/* Required Scientific Caption */}
          <p className="mt-6 border-t border-[#D8C089]/15 pt-4 text-xs leading-relaxed text-[#D8C089]">
            <strong>Caption:</strong> The blue whale is still heavier than any known sauropod.
            Which titanosaur was the longest or heaviest is debated (<em>Patagotitan</em>,{' '}
            <em>Puertasaurus</em> and others are rivals). Note: the sauropod silhouette is a
            generic reconstruction because the neck and tail of <em>Argentinosaurus</em> are
            unknown.
          </p>
        </div>
      </div>
    </section>
  );
};
