import React, { useState } from 'react';
import {
  ANATOMY_HOTSPOTS,
  HERO_IMAGE_PATH,
  FALLBACK_UPLOADED_IMAGE_PATH,
  type AnatomyHotspot,
} from '../data/argentinosaurusData';
import { getAnatomyPreservationSummary } from '../utils/scaleMath';

export const AnatomyHotspots: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<AnatomyHotspot>(ANATOMY_HOTSPOTS[0]);
  const [filterMode, setFilterMode] = useState<'all' | 'preserved' | 'reconstructed'>('all');
  const [imgSrc, setImgSrc] = useState('/assets/argentinosaurus-side.png');

  const preservationSummary = getAnatomyPreservationSummary();

  const visibleHotspots = ANATOMY_HOTSPOTS.filter((h) => {
    if (filterMode === 'preserved') return h.preserved;
    if (filterMode === 'reconstructed') return !h.preserved;
    return true;
  });

  return (
    <section
      id="anatomy"
      aria-labelledby="anatomy-heading"
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
                04
              </span>
              <div>
                <p className="font-display text-xs tracking-[0.22em] text-[#D8C089] uppercase">
                  OSTEOLOGY &amp; RECONSTRUCTION
                </p>
                <h2
                  id="anatomy-heading"
                  className="font-display mt-2 text-3xl tracking-[0.04em] text-[#FFF8E6] uppercase sm:text-5xl"
                  style={{ textWrap: 'balance' }}
                >
                  Interactive Skeletal Anatomy
                </h2>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="max-w-prose text-base leading-[1.75] text-[#FFF8E6]/90">
              Only the back vertebrae, partial sacrum, ribs, and a calf bone (fibula) belong to the
              holotype (with two referred femora of uncertain identity).{' '}
              <strong>The skull, neck, tail, and forelimbs are NOT preserved</strong>—shown below
              with dashed outlines labelled <em>reconstructed from relatives</em>.
            </p>
          </div>
        </div>

        {/* Filter Bar & Legend */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Filter anatomical hotspots by fossil preservation"
            className="flex flex-wrap items-center gap-1.5 rounded-lg border border-[#D8C089]/20 bg-[#07190E]/90 p-1"
          >
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                filterMode === 'all'
                  ? 'bg-[#D9963A] text-[#07190E]'
                  : 'text-[#FFF8E6]/80 hover:text-[#FFF8E6]'
              }`}
            >
              All Regions ({ANATOMY_HOTSPOTS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('preserved')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                filterMode === 'preserved'
                  ? 'bg-[#F7C95F] text-[#07190E]'
                  : 'text-[#FFF8E6]/80 hover:text-[#FFF8E6]'
              }`}
            >
              Preserved / Referred ({preservationSummary.preservedCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('reconstructed')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                filterMode === 'reconstructed'
                  ? 'bg-[#8C9B34] text-[#07190E]'
                  : 'text-[#FFF8E6]/80 hover:text-[#FFF8E6]'
              }`}
            >
              Reconstructed from Relatives ({preservationSummary.reconstructedCount})
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#D8C089]">
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-5 border border-[#F7C95F] bg-[#F7C95F]/25" />
              Solid Zone: Known / Referred Elements
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-5 border border-dashed border-[#D8C089] bg-transparent" />
              Dashed Outline: Reconstructed from Relatives
            </span>
          </div>
        </div>

        {/* Main Interactive Diagram + Inspector Split */}
        <div className="mt-8 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Left 8 Columns: Side-Profile Creature + Dashed Reconstructed Regions SVG + Clickable Hotspots */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#D8C089]/25 bg-[#07190E] p-6 sm:p-8 lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D8C089]/15 pb-3 text-xs tracking-[0.1em] text-[#D8C089]/80 uppercase">
              <span>LATERAL ANATOMICAL PROFILE · MCF-PVPH-1 COMPOSITE</span>
              <span>COLOURS ARE ARTISTIC · REAL SKIN COLOUR UNKNOWN</span>
            </div>

            <div className="relative my-8 aspect-[3/1] w-full min-h-[220px] select-none">
              {/* Side-view creature image */}
              <img
                src={imgSrc}
                onError={() => {
                  if (imgSrc === '/assets/argentinosaurus-side.png') {
                    setImgSrc(HERO_IMAGE_PATH);
                  } else if (imgSrc !== FALLBACK_UPLOADED_IMAGE_PATH) {
                    setImgSrc(FALLBACK_UPLOADED_IMAGE_PATH);
                  }
                }}
                alt="Annotated lateral view of Argentinosaurus showing preserved dorsal, sacral, and fibular regions versus dashed reconstructed skull, neck, tail, and forelimbs"
                referrerPolicy="no-referrer"
                className="creature-hero-grade h-full w-full object-contain"
              />

              {/* SVG Overlay with Dashed Outlines for Unpreserved Skull, Neck, Tail & Forelimbs ("reconstructed from relatives") */}
              <svg
                viewBox="0 0 1000 333"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                {/* Dashed Reconstructed Tail Zone (Left 0..380) */}
                <path
                  d="M 18 185 C 65 255, 220 245, 385 182 C 390 142, 240 185, 130 130"
                  fill="none"
                  stroke="#D8C089"
                  strokeWidth="1.8"
                  strokeDasharray="7 5"
                  opacity="0.82"
                />
                <text
                  x="110"
                  y="108"
                  fill="#D8C089"
                  fontSize="11"
                  letterSpacing="1.2"
                  className="font-display uppercase"
                >
                  TAIL · RECONSTRUCTED FROM RELATIVES
                </text>

                {/* Preserved Dorsal, Sacral & Rib Torso Box (Center 400..630) */}
                <rect
                  x="402"
                  y="58"
                  width="225"
                  height="148"
                  rx="10"
                  fill="rgba(247, 201, 95, 0.08)"
                  stroke="#F7C95F"
                  strokeWidth="1.5"
                />
                <text
                  x="412"
                  y="48"
                  fill="#FFE08F"
                  fontSize="11"
                  letterSpacing="1.2"
                  className="font-display uppercase"
                >
                  DORSALS, SACRUM &amp; RIBS · PRESERVED (MCF-PVPH-1)
                </text>

                {/* Dashed Reconstructed Neck & Skull Zone (Right 660..990) */}
                <path
                  d="M 655 110 C 745 55, 855 8, 982 32 C 992 65, 955 78, 895 62 C 805 88, 735 142, 668 175 Z"
                  fill="rgba(216, 192, 137, 0.04)"
                  stroke="#D8C089"
                  strokeWidth="1.8"
                  strokeDasharray="7 5"
                  opacity="0.85"
                />
                <text
                  x="695"
                  y="24"
                  fill="#D8C089"
                  fontSize="11"
                  letterSpacing="1.2"
                  className="font-display uppercase"
                >
                  NECK &amp; SKULL · RECONSTRUCTED FROM RELATIVES
                </text>

                {/* Dashed Reconstructed Forelimbs Zone (585..735) */}
                <rect
                  x="595"
                  y="212"
                  width="145"
                  height="112"
                  rx="8"
                  fill="none"
                  stroke="#D8C089"
                  strokeWidth="1.6"
                  strokeDasharray="6 5"
                  opacity="0.8"
                />
                <text
                  x="602"
                  y="320"
                  fill="#D8C089"
                  fontSize="10"
                  letterSpacing="1"
                  className="font-display uppercase"
                >
                  FORELIMBS · RECONSTRUCTED FROM RELATIVES
                </text>
              </svg>

              {/* Interactive Hotspot Pins */}
              {visibleHotspots.map((hotspot, index) => {
                const isSelected = selectedHotspot.id === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => setSelectedHotspot(hotspot)}
                    aria-label={`Inspect ${hotspot.label} (${hotspot.epistemicTag})`}
                    aria-pressed={isSelected}
                    style={{
                      left: `${hotspot.xPercent}%`,
                      top: `${hotspot.yPercent}%`,
                    }}
                    className={`group absolute z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-medium tabular-nums transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'scale-125 border-[#FFF8E6] bg-[#F7C95F] text-[#07190E] shadow-[0_0_20px_rgba(247,201,95,0.85)]'
                        : hotspot.preserved
                          ? 'border-[#F7C95F] bg-[#07190E]/90 text-[#FFE08F] hover:scale-110 hover:bg-[#F7C95F] hover:text-[#07190E]'
                          : 'border-dashed border-[#D8C089] bg-[#07190E]/90 text-[#D8C089] hover:scale-110 hover:border-solid hover:bg-[#D8C089] hover:text-[#07190E]'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            {/* Bottom Quick-Select Tabs for Keyboard & Mobile Convenience */}
            <div className="flex flex-wrap gap-2 border-t border-[#D8C089]/15 pt-4">
              {visibleHotspots.map((hotspot, idx) => {
                const isSelected = selectedHotspot.id === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => setSelectedHotspot(hotspot)}
                    className={`rounded-md border px-3 py-1.5 text-xs transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'border-[#F7C95F] bg-[#F7C95F]/20 text-[#FFF8E6] font-medium'
                        : 'border-[#D8C089]/20 bg-[#0E3320]/40 text-[#D8C089] hover:border-[#D8C089]/50 hover:text-[#FFF8E6]'
                    }`}
                  >
                    {idx + 1}. {hotspot.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right 4 Columns: Active Hotspot Scientific Dossier */}
          <div
            data-testid="anatomy-detail-panel"
            className="flex flex-col justify-between rounded-2xl border border-[#D8C089]/25 bg-[#0E3320]/75 p-6 sm:p-8 lg:col-span-4"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D8C089]/20 pb-3 text-xs tracking-[0.12em] text-[#D8C089] uppercase">
                <span>
                  {selectedHotspot.preserved
                    ? 'KNOWN / REFERRED MATERIAL'
                    : 'RECONSTRUCTED FROM RELATIVES'}
                </span>
                <span className="italic text-[#F7C95F]">· {selectedHotspot.epistemicTag}</span>
              </div>

              <h3 className="font-display mt-5 text-2xl tracking-[0.03em] text-[#FFF8E6] uppercase sm:text-3xl">
                {selectedHotspot.label}
              </h3>

              {selectedHotspot.dimensions && (
                <p className="mt-2 font-display text-sm tracking-[0.06em] text-[#FFE08F] tabular-nums">
                  {selectedHotspot.dimensions}
                </p>
              )}

              <p className="mt-4 text-base font-medium leading-snug text-[#FFF8E6]">
                {selectedHotspot.summary}
              </p>

              <p className="mt-4 text-sm leading-[1.75] text-[#FFF8E6]/85">
                {selectedHotspot.details}
              </p>
            </div>

            <div className="mt-8 border-t border-[#D8C089]/20 pt-4 text-xs leading-relaxed text-[#D8C089]/80">
              <strong className="font-display tracking-wider text-[#FFF8E6] uppercase">
                Osteological Rule:
              </strong>{' '}
              Because no skull, cervical series, forelimb, or caudal series was preserved with
              holotype MCF-PVPH-1, those regions are restored from related South American
              titanosaurs (<em>Futalognkosaurus</em>, <em>Patagotitan</em>).
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
