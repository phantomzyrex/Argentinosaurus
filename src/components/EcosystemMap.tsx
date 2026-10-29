import React, { useState } from 'react';
import { ECOSYSTEM_ZONES, type EcosystemZone } from '../data/argentinosaurusData';

export const EcosystemMap: React.FC = () => {
  const [activeZone, setActiveZone] = useState<EcosystemZone>(ECOSYSTEM_ZONES[2]); // Default to River-Side Forest
  const [mapMode, setMapMode] = useState<'modern' | 'cretaceous'>('modern');

  return (
    <section
      id="habitat"
      aria-labelledby="habitat-heading"
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
                07
              </span>
              <div>
                <p className="font-display text-xs tracking-[0.22em] text-[#D8C089] uppercase">
                  PALEOENVIRONMENT · HUINCUL FORMATION
                </p>
                <h2
                  id="habitat-heading"
                  className="font-display mt-2 text-3xl tracking-[0.04em] text-[#FFF8E6] uppercase sm:text-5xl"
                  style={{ textWrap: 'balance' }}
                >
                  River Plain &amp; River Forest
                </h2>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="max-w-prose text-base leading-[1.75] text-[#FFF8E6]/85">
              The rocks that hold <em>Argentinosaurus</em> (the Huincul Formation, Neuquén Basin,
              Patagonia) are yellowish and greenish sandstones laid down by a braided river system.
              Paleosol studies point to a warm, strongly seasonal, semi-arid to subhumid climate
              near the boundary between a warm-humid belt and a hot-arid belt (Lizzoli et al.,
              2021).
            </p>
          </div>
        </div>

        {/* Interactive Ecosystem Cross-Section SVG: Braided River > Floodplain > River-Side Forest (inferred) > Drier Open Plain */}
        <div className="mt-12 rounded-2xl border border-[#D8C089]/25 bg-[#0E3320]/35 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D8C089]/15 pb-4 text-xs tracking-[0.12em] text-[#D8C089] uppercase">
            <span>INTERACTIVE PALEOECOLOGICAL TRANSECT · CLICK OR HOVER EACH ZONE</span>
            <span>DENSER GALLERY FOREST ALONG RIVERS IS INFERRED FROM POLLEN (VALLATI, 2001)</span>
          </div>

          {/* 4 Interactive Zone Selector Buttons */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ECOSYSTEM_ZONES.map((zone) => {
              const isSelected = activeZone.id === zone.id;
              return (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setActiveZone(zone)}
                  onMouseEnter={() => setActiveZone(zone)}
                  aria-pressed={isSelected}
                  className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#F7C95F] bg-[#0E3320] shadow-[0_8px_24px_rgba(7,25,14,0.65)]'
                      : 'border-[#D8C089]/18 bg-[#07190E]/75 hover:border-[#D8C089]/45'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px] text-[#D8C089]">
                    <span className="font-display uppercase">{zone.name}</span>
                    {zone.epistemicTag && (
                      <span className="italic text-[#F7C95F]">· {zone.epistemicTag}</span>
                    )}
                  </div>
                  <span className="mt-2 block text-xs text-[#FFF8E6]/85">{zone.subtitle}</span>
                </button>
              );
            })}
          </div>

          {/* Cross-Section SVG Diagram */}
          <div className="mt-6 overflow-x-auto rounded-xl border border-[#D8C089]/15 bg-[#07190E] p-4">
            <svg
              viewBox="0 0 1200 240"
              className="h-auto w-full min-w-[680px] select-none"
              role="img"
              aria-label="Cross-section of the Huincul Formation from braided river channels through floodplain and inferred river-side conifer/tree-fern forest to drier open scrub plain"
            >
              {/* Sky/Haze */}
              <rect x="0" y="0" width="1200" height="240" fill="#07190E" />

              {/* Zone 1: Braided River Channels (0..300) */}
              <g
                onClick={() => setActiveZone(ECOSYSTEM_ZONES[0])}
                className="cursor-pointer"
                opacity={activeZone.id === 'braided-channels' ? 1 : 0.65}
              >
                <path
                  d="M 0 155 Q 75 178, 150 162 Q 225 182, 300 155 L 300 240 L 0 240 Z"
                  fill="#1F5B2F"
                />
                {/* Braided water & silt bars */}
                <ellipse cx="85" cy="166" rx="52" ry="8" fill="#F7C95F" fillOpacity="0.55" />
                <ellipse cx="215" cy="170" rx="58" ry="9" fill="#D8C089" fillOpacity="0.55" />
                <text x="24" y="42" fill="#FFE08F" fontSize="12" className="font-display uppercase">
                  01 · BRAIDED RIVER CHANNELS
                </text>
                <text x="24" y="60" fill="#D8C089" fontSize="10">
                  Sandbars, lungfish, gars, chelid turtles
                </text>
              </g>

              {/* Zone 2: Alluvial Floodplain (300..600) */}
              <g
                onClick={() => setActiveZone(ECOSYSTEM_ZONES[1])}
                className="cursor-pointer"
                opacity={activeZone.id === 'floodplain' ? 1 : 0.65}
              >
                <path d="M 300 155 Q 450 142, 600 132 L 600 240 L 300 240 Z" fill="#0E3320" />
                {/* Low ferns & horsetails */}
                <path
                  d="M 350 150 L 355 132 M 390 148 L 395 128 M 480 142 L 486 122 M 530 138 L 535 120"
                  stroke="#8C9B34"
                  strokeWidth="3"
                />
                <text x="320" y="42" fill="#FFE08F" fontSize="12" className="font-display uppercase">
                  02 · SEASONAL FLOODPLAIN
                </text>
                <text x="320" y="60" fill="#D8C089" fontSize="10">
                  Ferns, early angiosperms, rebbachisaurids
                </text>
              </g>

              {/* Zone 3: River-Side Gallery Forest (600..900, Labelled INFERRED) */}
              <g
                onClick={() => setActiveZone(ECOSYSTEM_ZONES[2])}
                className="cursor-pointer"
                opacity={activeZone.id === 'river-forest' ? 1 : 0.65}
              >
                <path d="M 600 132 Q 750 118, 900 112 L 900 240 L 600 240 Z" fill="#1F5B2F" />
                {/* Conifers & Tree Ferns */}
                <polygon points="650,128 670,65 690,128" fill="#4A8C3A" />
                <polygon points="735,124 760,52 785,124" fill="#4A8C3A" />
                <polygon points="825,118 845,68 865,118" fill="#8C9B34" />
                <text x="620" y="42" fill="#FFE08F" fontSize="12" className="font-display uppercase">
                  03 · RIVER-SIDE FOREST (INFERRED)
                </text>
                <text x="620" y="60" fill="#D8C089" fontSize="10">
                  Conifers &amp; tree ferns · Argentinosaurus browsing
                </text>
              </g>

              {/* Zone 4: Drier Open Plain with Scrub (900..1200) */}
              <g
                onClick={() => setActiveZone(ECOSYSTEM_ZONES[3])}
                className="cursor-pointer"
                opacity={activeZone.id === 'open-plain' ? 1 : 0.65}
              >
                <path d="M 900 112 Q 1050 105, 1200 98 L 1200 240 L 900 240 Z" fill="#8C9B34" fillOpacity="0.45" />
                {/* Low xeric gnetophyte scrub */}
                <circle cx="975" cy="106" r="6" fill="#D9963A" />
                <circle cx="1065" cy="102" r="5" fill="#D9963A" />
                <circle cx="1135" cy="99" r="6" fill="#D8C089" />
                <text x="920" y="42" fill="#FFE08F" fontSize="12" className="font-display uppercase">
                  04 · DRIER OPEN SCRUB PLAIN
                </text>
                <text x="920" y="60" fill="#D8C089" fontSize="10">
                  Seasonally arid paleosols, gnetophytes
                </text>
              </g>

              {/* Zone Dividers */}
              <line x1="300" y1="20" x2="300" y2="240" stroke="#D8C089" strokeOpacity="0.25" strokeDasharray="4 4" />
              <line x1="600" y1="20" x2="600" y2="240" stroke="#D8C089" strokeOpacity="0.25" strokeDasharray="4 4" />
              <line x1="900" y1="20" x2="900" y2="240" stroke="#D8C089" strokeOpacity="0.25" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Active Zone Detail Readout */}
          <div
            data-testid="ecosystem-zone-detail"
            className="mt-6 grid grid-cols-1 gap-6 rounded-xl border border-[#D8C089]/20 bg-[#07190E]/90 p-6 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 text-xs tracking-[0.12em] text-[#F7C95F] uppercase">
                <span>{activeZone.name}</span>
                {activeZone.epistemicTag && <span>· {activeZone.epistemicTag}</span>}
              </div>
              <h3 className="font-display mt-2 text-xl text-[#FFF8E6] uppercase">
                {activeZone.subtitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#FFF8E6]/85">
                {activeZone.description}
              </p>
              <p className="mt-3 border-t border-[#D8C089]/15 pt-3 text-xs text-[#D8C089]">
                <strong>Geology &amp; Paleosols:</strong> {activeZone.geologyAndSoil}
              </p>
            </div>

            <div className="lg:col-span-3">
              <h4 className="font-display text-xs tracking-[0.14em] text-[#D8C089] uppercase">
                Pollen &amp; Flora (Vallati, 2001)
              </h4>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#FFF8E6]/85">
                {activeZone.flora.map((item) => (
                  <li key={item} className="border-b border-[#D8C089]/10 pb-1.5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h4 className="font-display text-xs tracking-[0.14em] text-[#D8C089] uppercase">
                Associated Formation Fauna
              </h4>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#FFF8E6]/85">
                {activeZone.fauna.map((item) => (
                  <li key={item} className="border-b border-[#D8C089]/10 pb-1.5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Lower Split: Wildlife Compendium Side Card + Interactive Map of Argentina / Mid-Cretaceous South America */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Wildlife Side Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#D8C089]/20 bg-[#0E3320]/40 p-6 sm:p-8 lg:col-span-6">
            <div>
              <p className="font-display text-xs tracking-[0.16em] text-[#D8C089] uppercase">
                FAUNAL ASSEMBLAGE · HUINCUL FORMATION
              </p>
              <h3 className="font-display mt-2 text-2xl tracking-[0.03em] text-[#FFF8E6] uppercase">
                Co-Occurring Wildlife of the Basin
              </h3>
              <p className="mt-2 text-xs italic text-[#F7C95F]">
                Note: The Huincul Formation spans a thick stratigraphic interval—not every animal
                listed below necessarily lived at the exact same time and place.
              </p>

              <dl className="mt-6 space-y-4 text-sm">
                <div className="border-b border-[#D8C089]/15 pb-3">
                  <dt className="font-display text-xs tracking-[0.12em] text-[#FFE08F] uppercase">
                    Freshwater &amp; Small Vertebrates
                  </dt>
                  <dd className="mt-1 text-[#FFF8E6]/85">
                    Lungfish and gars, chelid side-necked turtles, lizards, sphenodonts (tuatara
                    relatives), and terrestrial/semi-aquatic crocodile relatives.
                  </dd>
                </div>

                <div className="border-b border-[#D8C089]/15 pb-3">
                  <dt className="font-display text-xs tracking-[0.12em] text-[#FFE08F] uppercase">
                    Other Sauropod Dinosaurs
                  </dt>
                  <dd className="mt-1 text-[#FFF8E6]/85">
                    Titanosaurs <em>Choconsaurus</em>, <em>Bustingorrytitan</em>, and{' '}
                    <em>Chucarosaurus</em>; plus the diplodocoid rebbachisaurids{' '}
                    <em>Cathartesaura</em>, <em>Limaysaurus</em>, and <em>Astigmasaura</em>.
                  </dd>
                </div>

                <div className="border-b border-[#D8C089]/15 pb-3">
                  <dt className="font-display text-xs tracking-[0.12em] text-[#FFE08F] uppercase">
                    Theropod Dinosaurs
                  </dt>
                  <dd className="mt-1 text-[#FFF8E6]/85">
                    Giant carcharodontosaurid <em>Mapusaurus</em>; abelisaurids{' '}
                    <em>Skorpiovenator</em>, <em>Ilokelesia</em>, and <em>Tralkasaurus</em>; the
                    small noasaurid <em>Huinculsaurus</em>; megaraptorans/enigmatic theropods{' '}
                    <em>Gualicho</em> and <em>Aoniraptor</em>; and the bird-like paravian{' '}
                    <em>Overoraptor</em>.
                  </dd>
                </div>

                <div>
                  <dt className="font-display text-xs tracking-[0.12em] text-[#FFE08F] uppercase">
                    Ornithischian Dinosaurs
                  </dt>
                  <dd className="mt-1 text-[#FFF8E6]/85">
                    Bipedal herbivorous iguanodontian ornithopods browsing lower riverine scrub.
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Interactive Map of Argentina & Mid-Cretaceous South America */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#D8C089]/20 bg-[#07190E] p-6 sm:p-8 lg:col-span-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D8C089]/15 pb-4">
                <div>
                  <p className="font-display text-xs tracking-[0.16em] text-[#D8C089] uppercase">
                    GEOGRAPHIC PROVENANCE
                  </p>
                  <h3 className="font-display mt-1 text-xl tracking-[0.03em] text-[#FFF8E6] uppercase">
                    Neuquén Basin &amp; Plaza Huincul
                  </h3>
                </div>

                <div
                  role="group"
                  aria-label="Toggle between Modern Argentina Map and Schematic Mid-Cretaceous South America"
                  className="flex items-center gap-1 rounded-lg border border-[#D8C089]/20 bg-[#0E3320]/60 p-1"
                >
                  <button
                    type="button"
                    onClick={() => setMapMode('modern')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium uppercase transition-colors cursor-pointer whitespace-nowrap ${
                      mapMode === 'modern'
                        ? 'bg-[#F7C95F] text-[#07190E]'
                        : 'text-[#FFF8E6]/80 hover:text-[#FFF8E6]'
                    }`}
                  >
                    Modern Argentina
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapMode('cretaceous')}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium uppercase transition-colors cursor-pointer whitespace-nowrap ${
                      mapMode === 'cretaceous'
                        ? 'bg-[#D9963A] text-[#07190E]'
                        : 'text-[#FFF8E6]/80 hover:text-[#FFF8E6]'
                    }`}
                  >
                    Mid-Cretaceous (Approximate)
                  </button>
                </div>
              </div>

              {/* SVG Map Viewport */}
              <div className="my-6 flex items-center justify-center rounded-xl border border-[#D8C089]/15 bg-[#0E3320]/25 p-4">
                <svg
                  viewBox="0 0 480 340"
                  className="h-72 w-full select-none"
                  role="img"
                  aria-label={
                    mapMode === 'modern'
                      ? 'Map of Argentina highlighting Plaza Huincul and the Huincul Formation outcrops across Neuquén, Río Negro, and Mendoza provinces'
                      : 'Approximate schematic paleogeographic map of mid-Cretaceous South America showing the Neuquén Basin in northern Patagonia'
                  }
                >
                  {mapMode === 'modern' ? (
                    <g>
                      {/* Stylized Outline of Argentina & Patagonia */}
                      <path
                        d="M 190 20 L 255 30 L 275 80 L 260 135 L 235 185 L 220 245 L 205 315 L 175 310 L 168 240 L 172 165 L 178 90 Z"
                        fill="rgba(31, 91, 47, 0.38)"
                        stroke="#D8C089"
                        strokeWidth="1.5"
                      />
                      {/* Wider Huincul Formation Outcrop Polygon (Neuquén, Río Negro, Mendoza) */}
                      <ellipse
                        cx="196"
                        cy="186"
                        rx="32"
                        ry="24"
                        fill="rgba(217, 150, 58, 0.35)"
                        stroke="#D9963A"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                      />
                      {/* Plaza Huincul Type Locality Pin */}
                      <circle cx="192" cy="188" r="6" fill="#F7C95F" />
                      <circle
                        cx="192"
                        cy="188"
                        r="12"
                        fill="none"
                        stroke="#FFE08F"
                        strokeWidth="1.2"
                      />

                      {/* Callout Labels */}
                      <line x1="204" y1="188" x2="275" y2="168" stroke="#F7C95F" strokeWidth="1.2" />
                      <text x="280" y="164" fill="#FFE08F" fontSize="11" className="font-display">
                        PLAZA HUINCUL (NEUQUÉN)
                      </text>
                      <text x="280" y="180" fill="#FFF8E6" fontSize="10">
                        Holotype MCF-PVPH-1 · Museo Carmen Funes
                      </text>

                      <line x1="222" y1="202" x2="275" y2="218" stroke="#D8C089" strokeWidth="1" />
                      <text x="280" y="218" fill="#D8C089" fontSize="10" className="font-display">
                        HUINCUL FORMATION OUTCROPS
                      </text>
                      <text x="280" y="232" fill="#D8C089" opacity="0.85" fontSize="9.5">
                        Neuquén, Río Negro &amp; southern Mendoza
                      </text>
                    </g>
                  ) : (
                    <g>
                      {/* Schematic Mid-Cretaceous South America (~107 Ma, Approximate) */}
                      <path
                        d="M 145 18 C 225 15, 295 55, 285 115 C 275 165, 240 215, 215 305 C 185 312, 165 265, 162 200 C 158 135, 130 65, 145 18 Z"
                        fill="rgba(140, 155, 52, 0.25)"
                        stroke="#F7C95F"
                        strokeWidth="1.5"
                        strokeDasharray="6 4"
                      />
                      {/* Warm-Arid / Warm-Humid Climatic Transition Belt */}
                      <rect
                        x="95"
                        y="165"
                        width="270"
                        height="42"
                        fill="rgba(247, 201, 95, 0.14)"
                        stroke="#D9963A"
                        strokeDasharray="3 3"
                      />
                      <circle cx="195" cy="186" r="7" fill="#F7C95F" />
                      <text x="280" y="110" fill="#FFE08F" fontSize="11" className="font-display">
                        SCHEMATIC MID-CRETACEOUS (~107 MA)
                      </text>
                      <text x="280" y="126" fill="#D8C089" fontSize="10">
                        Labelled: Approximate paleogeography
                      </text>
                      <text x="280" y="184" fill="#FFF8E6" fontSize="10">
                        Neuquén Basin braided-river plain
                      </text>
                      <text x="280" y="198" fill="#D8C089" fontSize="9.5">
                        Warm-humid / hot-arid climatic boundary
                      </text>
                    </g>
                  )}
                </svg>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#D8C089]/80">
              <strong>Type Locality:</strong> Las Overas area (~8 km east of Plaza Huincul),
              Neuquén Province, Argentina. Outcrops of the Huincul Formation extend across Neuquén,
              Río Negro, and southern Mendoza provinces.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
