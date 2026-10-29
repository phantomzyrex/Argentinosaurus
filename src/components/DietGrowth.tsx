import React, { useState } from 'react';
import { GROWTH_STAGES } from '../data/argentinosaurusData';
import { getGrowthStageDetails } from '../utils/scaleMath';

export const DietGrowth: React.FC = () => {
  const [stageIndex, setStageIndex] = useState<number>(2); // Default to Adult (~20 years)
  const { stage, lengthFoldIncrease, massFoldIncrease, scaleRatioPercent } =
    getGrowthStageDetails(stageIndex);

  return (
    <section
      id="diet-growth"
      aria-labelledby="diet-growth-heading"
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
                06
              </span>
              <div>
                <p className="font-display text-xs tracking-[0.22em] text-[#D8C089] uppercase">
                  TROPHIC ECOLOGY &amp; ONTOGENY
                </p>
                <h2
                  id="diet-growth-heading"
                  className="font-display mt-2 text-3xl tracking-[0.04em] text-[#FFF8E6] uppercase sm:text-5xl"
                  style={{ textWrap: 'balance' }}
                >
                  Diet, Life History &amp; Predators
                </h2>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="max-w-prose text-base leading-[1.75] text-[#FFF8E6]/90">
              <em>Argentinosaurus</em> was a plant-eater (<strong>inferred</strong> from relatives).
              Its long neck and lack of chewing probably allowed fast, energy-efficient feeding
              across wide swathes of foliage without moving its massive body (Sander et al., 2011).
            </p>
          </div>
        </div>

        {/* Top Row: Palynological Flora & Hypothetical Food-Web Graphic */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Dietary Context & Pollen Evidence */}
          <div className="rounded-2xl border border-[#D8C089]/20 bg-[#07190E]/85 p-6 sm:p-8 lg:col-span-5">
            <p className="font-display text-xs tracking-[0.16em] text-[#D8C089] uppercase">
              PALYNOLOGICAL RECORD · VALLATI (2001)
            </p>
            <h3 className="font-display mt-2 text-2xl tracking-[0.03em] text-[#FFF8E6] uppercase">
              Available Habitat Flora
            </h3>
            <p className="mt-4 text-sm leading-[1.75] text-[#FFF8E6]/85">
              Fossil pollen and spores recovered from the Huincul Formation reveal what grew in its
              habitat: <strong>ferns, conifers, gnetophytes, club-moss relatives, and early
              flowering plants (angiosperms)</strong>. Crucially, this palynological record shows
              what plant groups were available in the landscape, <em>not</em> direct gut-content
              proof of which specific plants <em>Argentinosaurus</em> ate.
            </p>

            <div className="mt-6 border-t border-[#D8C089]/15 pt-5">
              <p className="font-display text-xs tracking-[0.14em] text-[#F7C95F] uppercase">
                PREDATION HYPOTHESIS · MAPUSAURUS ROSEAE
              </p>
              <p className="mt-2 text-sm leading-[1.75] text-[#FFF8E6]/85">
                The giant carcharodontosaurid theropod <em>Mapusaurus</em> lived in the same
                formation and is known from at least seven individuals of different ages found
                together in a single bonebed. This association raises the possibility that{' '}
                <em>Mapusaurus</em> hunted large prey such as <em>Argentinosaurus</em> in groups.
                However, <strong>there is no direct evidence of this (hypothesis)</strong>.
              </p>
            </div>
          </div>

          {/* Animated Food-Web Graphic Labelled "Hypothetical" */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#D8C089]/20 bg-[#07190E]/85 p-6 sm:p-8 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D8C089]/15 pb-3 text-xs tracking-[0.12em] text-[#D8C089] uppercase">
              <span>TROPHIC ENERGY FLOW DIAGRAM</span>
              <span className="italic text-[#F7C95F]">· LABELLED: HYPOTHETICAL</span>
            </div>

            <div className="my-6">
              <svg
                viewBox="0 0 820 220"
                className="h-auto w-full select-none"
                role="img"
                aria-label="Hypothetical food-web diagram flowing from Huincul flora to Argentinosaurus to giant theropod predators like Mapusaurus"
              >
                <defs>
                  <linearGradient id="trophicArrow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8C9B34" />
                    <stop offset="50%" stopColor="#F7C95F" />
                    <stop offset="100%" stopColor="#D9963A" />
                  </linearGradient>
                </defs>

                {/* Node 1: Primary Producers */}
                <rect
                  x="16"
                  y="35"
                  width="215"
                  height="150"
                  rx="14"
                  fill="rgba(31, 91, 47, 0.35)"
                  stroke="#8C9B34"
                  strokeWidth="1.5"
                />
                <text
                  x="123"
                  y="68"
                  textAnchor="middle"
                  fill="#D8C089"
                  fontSize="10"
                  letterSpacing="1.5"
                  className="font-display uppercase"
                >
                  PRIMARY PRODUCERS
                </text>
                <text
                  x="123"
                  y="95"
                  textAnchor="middle"
                  fill="#FFF8E6"
                  fontSize="15"
                  className="font-display uppercase"
                >
                  HUINCUL FLORA
                </text>
                <text x="123" y="122" textAnchor="middle" fill="#FFF8E6" opacity="0.8" fontSize="11">
                  Conifers, Tree Ferns,
                </text>
                <text x="123" y="140" textAnchor="middle" fill="#FFF8E6" opacity="0.8" fontSize="11">
                  Gnetophytes &amp; Lycopods
                </text>
                <text x="123" y="166" textAnchor="middle" fill="#FFE08F" fontSize="10" fontStyle="italic">
                  (Available in habitat; Vallati 2001)
                </text>

                {/* Animated Flow Arrow 1 -> 2 */}
                <line
                  x1="236"
                  y1="110"
                  x2="296"
                  y2="110"
                  stroke="url(#trophicArrow)"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                />
                <polygon points="296,105 308,110 296,115" fill="#F7C95F" />

                {/* Node 2: Primary Consumer (Argentinosaurus) */}
                <rect
                  x="312"
                  y="25"
                  width="215"
                  height="170"
                  rx="14"
                  fill="rgba(217, 150, 58, 0.16)"
                  stroke="#F7C95F"
                  strokeWidth="1.8"
                />
                <text
                  x="419"
                  y="58"
                  textAnchor="middle"
                  fill="#FFE08F"
                  fontSize="10"
                  letterSpacing="1.5"
                  className="font-display uppercase"
                >
                  MEGaherbivore
                </text>
                <text
                  x="419"
                  y="86"
                  textAnchor="middle"
                  fill="#FFF8E6"
                  fontSize="15"
                  className="font-display uppercase"
                >
                  ARGENTINOSAURUS
                </text>
                <text x="419" y="114" textAnchor="middle" fill="#FFF8E6" opacity="0.85" fontSize="11">
                  No-chew rapid cropping;
                </text>
                <text x="419" y="132" textAnchor="middle" fill="#FFF8E6" opacity="0.85" fontSize="11">
                  long gut fermentation
                </text>
                <text x="419" y="168" textAnchor="middle" fill="#FFE08F" fontSize="10" fontStyle="italic">
                  (Herbivory inferred from relatives)
                </text>

                {/* Animated Flow Arrow 2 -> 3 */}
                <line
                  x1="532"
                  y1="110"
                  x2="592"
                  y2="110"
                  stroke="url(#trophicArrow)"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                />
                <polygon points="592,105 604,110 592,115" fill="#D9963A" />

                {/* Node 3: Apex Theropods */}
                <rect
                  x="608"
                  y="35"
                  width="196"
                  height="150"
                  rx="14"
                  fill="rgba(14, 51, 32, 0.55)"
                  stroke="#D8C089"
                  strokeWidth="1.5"
                  strokeDasharray="5 4"
                />
                <text
                  x="706"
                  y="68"
                  textAnchor="middle"
                  fill="#D8C089"
                  fontSize="10"
                  letterSpacing="1.5"
                  className="font-display uppercase"
                >
                  APEX THEROPODS
                </text>
                <text
                  x="706"
                  y="95"
                  textAnchor="middle"
                  fill="#FFF8E6"
                  fontSize="15"
                  className="font-display uppercase"
                >
                  MAPUSAURUS
                </text>
                <text x="706" y="122" textAnchor="middle" fill="#FFF8E6" opacity="0.8" fontSize="11">
                  Juvenile predation &amp; possible
                </text>
                <text x="706" y="140" textAnchor="middle" fill="#FFF8E6" opacity="0.8" fontSize="11">
                  group hunting or scavenging
                </text>
                <text x="706" y="166" textAnchor="middle" fill="#F7C95F" fontSize="10" fontStyle="italic">
                  (Hypothesis — no direct evidence)
                </text>
              </svg>
            </div>

            <p className="text-xs text-[#D8C089]/80">
              Note: This trophic pathway is strictly <strong>hypothetical</strong>, synthesized from
              co-occurring fossils in the Huincul Formation and sauropod physiological models
              (Sander et al., 2011; Hallett &amp; Wedel, 2016).
            </p>
          </div>
        </div>

        {/* Interactive Life History & Growth Slider (Hallett & Wedel, 2016 — Estimates) */}
        <div className="mt-10 rounded-2xl border border-[#D8C089]/25 bg-[#07190E] p-6 sm:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#D8C089]/15 pb-4">
            <div>
              <p className="font-display text-xs tracking-[0.18em] text-[#D8C089] uppercase">
                ONTOGENETIC GROWTH TRAJECTORY · HALLETT &amp; WEDEL (2016)
              </p>
              <h3 className="font-display mt-1 text-2xl tracking-[0.03em] text-[#FFF8E6] uppercase">
                Interactive Growth Stage Slider (Estimates)
              </h3>
            </div>
            <span className="font-display text-xs tracking-[0.12em] text-[#F7C95F] uppercase">
              STATUS: ALL LIFE-HISTORY FIGURES ARE ESTIMATES
            </span>
          </div>

          {/* 4-Stop Stage Selector Buttons + Range Input */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {GROWTH_STAGES.map((item, idx) => {
              const isSelected = stageIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStageIndex(idx)}
                  aria-pressed={isSelected}
                  className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#F7C95F] bg-[#0E3320] shadow-[0_8px_24px_rgba(7,25,14,0.6)]'
                      : 'border-[#D8C089]/18 bg-[#0E3320]/30 hover:border-[#D8C089]/45'
                  }`}
                >
                  <span className="font-display text-xs tracking-[0.1em] text-[#D8C089] uppercase">
                    {item.stageLabel}
                  </span>
                  <span className="font-display mt-1 text-lg text-[#FFE08F] tabular-nums">
                    {item.ageLabel}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <label
              htmlFor="growth-stage-slider"
              className="mb-2 block text-xs tracking-[0.1em] text-[#D8C089] uppercase"
            >
              Slide across life history stages (Hatchling → 8–10 years → 20 years → 30 years):
            </label>
            <input
              id="growth-stage-slider"
              type="range"
              min={0}
              max={GROWTH_STAGES.length - 1}
              step={1}
              value={stageIndex}
              onChange={(e) => setStageIndex(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#0E3320] accent-[#F7C95F]"
            />
          </div>

          {/* Selected Growth Stage Output Panel */}
          <div
            data-testid="growth-stage-panel"
            className="mt-8 grid grid-cols-1 items-center gap-8 border-t border-[#D8C089]/15 pt-8 lg:grid-cols-12"
          >
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 text-xs tracking-[0.12em] text-[#F7C95F] uppercase">
                <span>{stage.stageLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{stage.ageLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="italic">{stage.epistemicTag}</span>
              </div>

              <h4 className="font-display mt-2 text-2xl text-[#FFF8E6] uppercase">
                {stage.milestone}
              </h4>

              <p className="mt-3 text-sm leading-[1.75] text-[#FFF8E6]/85">
                {stage.description}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[#D8C089]/15 pt-4">
                <div>
                  <span className="block text-[11px] tracking-wider text-[#D8C089] uppercase">
                    Estimated Length
                  </span>
                  <span className="font-display mt-1 block text-lg text-[#FFE08F] tabular-nums">
                    {stage.lengthDisplay}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] tracking-wider text-[#D8C089] uppercase">
                    Estimated Mass
                  </span>
                  <span className="font-display mt-1 block text-lg text-[#FFE08F] tabular-nums">
                    {stage.massDisplay}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] tracking-wider text-[#D8C089] uppercase">
                    Mass vs Hatchling
                  </span>
                  <span className="font-display mt-1 block text-lg text-[#FFF8E6] tabular-nums">
                    {massFoldIncrease.toLocaleString()}× ({lengthFoldIncrease}× length)
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Proportional Silhouette Box */}
            <div className="flex flex-col justify-between rounded-xl border border-[#D8C089]/20 bg-[#0E3320]/40 p-6 lg:col-span-6">
              <div className="flex items-center justify-between text-xs text-[#D8C089]">
                <span>RELATIVE SOMATIC LENGTH SCALE</span>
                <span className="tabular-nums">{scaleRatioPercent}% OF MAXIMUM ADULT LENGTH</span>
              </div>

              <div className="my-8 flex h-28 items-end justify-start border-b border-[#D8C089]/35 pb-2">
                <div
                  className="flex items-center justify-end rounded-r-full bg-gradient-to-r from-[#8C9B34] via-[#D9963A] to-[#F7C95F] px-3 transition-all duration-500"
                  style={{
                    width: `${Math.max(4, scaleRatioPercent)}%`,
                    height: `${Math.max(14, scaleRatioPercent * 0.85)}%`,
                  }}
                >
                  <span className="font-display text-xs font-medium text-[#07190E] tabular-nums whitespace-nowrap">
                    {stage.lengthM} m
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#D8C089]/80">
                Fast growth and clutches of many small (~1 L) eggs allowed sauropods to reach giant
                size while ensuring rapid population recovery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
