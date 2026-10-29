import React, { useRef, useState } from 'react';
import {
  GALLERY_PLATES,
  type GalleryPlate,
} from '../data/argentinosaurusData';

/**
 * Renders a distinct, gold-olive-green graded SVG paleontological plate for each of the 6 gallery slots
 */
const PlateVectorArtwork: React.FC<{ index: number; plateNumber: string; src: string }> = ({
  index,
  plateNumber,
  src,
}) => {
  return (
    <div className="hero-ecosystem-gradient relative flex h-full w-full flex-col justify-between overflow-hidden p-5">
      <div className="relative z-10 flex items-center justify-between text-[10px] tracking-[0.14em] text-[#07190E] font-semibold uppercase">
        <span>
          {plateNumber} · PLACEHOLDER ({src})
        </span>
        <span>GOLD–OLIVE–GREEN PALETTE</span>
      </div>

      {/* Bespoke SVG Scene per Plate */}
      <svg
        viewBox="0 0 400 180"
        className="relative z-10 my-auto h-36 w-full select-none"
        aria-hidden="true"
      >
        {/* Distant sun & braided river channels */}
        <circle
          cx={70 + index * 48}
          cy={38}
          r={24}
          fill="#FFE08F"
          fillOpacity="0.45"
        />
        <path
          d="M 0 145 Q 100 125, 200 142 T 400 135 L 400 180 L 0 180 Z"
          fill="#0E3320"
          fillOpacity="0.85"
        />
        <path
          d="M -10 154 C 90 138, 190 168, 290 148 C 340 138, 380 155, 410 150"
          fill="none"
          stroke="#F7C95F"
          strokeWidth="2.5"
          strokeOpacity="0.65"
        />
        <path
          d="M -10 166 C 110 175, 220 148, 330 164 C 365 168, 390 160, 410 162"
          fill="none"
          stroke="#D8C089"
          strokeWidth="1.8"
          strokeOpacity="0.5"
        />

        {/* Araucaria conifers on horizon */}
        <polygon points="35,142 48,88 61,142" fill="#1F5B2F" />
        <polygon points="330,138 346,78 362,138" fill="#1F5B2F" />
        <polygon points="358,140 370,96 382,140" fill="#07190E" />

        {/* Sauropod silhouette striding across the river plain */}
        <g transform={`translate(${55 + (index % 3) * 18}, 22)`}>
          <path
            d="M 5 98 C 45 96, 85 84, 125 65 C 155 52, 185 52, 210 62 C 240 46, 275 18, 305 10 C 314 9, 320 13, 322 18 C 315 22, 304 20, 295 25 C 268 40, 240 72, 218 86 L 224 122 L 210 122 L 204 90 C 182 94, 162 94, 145 88 L 138 122 L 124 122 L 128 82 C 88 90, 45 98, 5 98 Z"
            fill="#150F06"
            stroke="#FFE08F"
            strokeWidth="1.2"
          />
        </g>
      </svg>

      <div className="relative z-10 flex items-center justify-between text-[10px] tracking-[0.1em] text-[#FFF8E6]/85 uppercase">
        <span>ARTISTIC RECONSTRUCTION · SKIN COLOUR UNKNOWN</span>
        <span>DROP IMAGE AT /public{src}</span>
      </div>
    </div>
  );
};

export const Gallery: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [lightboxPlate, setLightboxPlate] = useState<GalleryPlate | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => setIsDragging(false);

  const scrollByAmount = (delta: number) => {
    scrollContainerRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative border-t border-[#D8C089]/15 bg-[#07190E] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 items-end gap-8 border-b border-[#D8C089]/20 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex items-baseline gap-5">
              <span
                className="section-number-outline text-6xl leading-none sm:text-7xl"
                aria-hidden="true"
              >
                11
              </span>
              <div>
                <p className="font-display text-xs tracking-[0.22em] text-[#D8C089] uppercase">
                  CURATED ARCHIVAL PLATES · DRAG OR SCROLL HORIZONTALLY
                </p>
                <h2
                  id="gallery-heading"
                  className="font-display mt-2 text-3xl tracking-[0.04em] text-[#FFF8E6] uppercase sm:text-5xl"
                  style={{ textWrap: 'balance' }}
                >
                  River-Plain Ecosystem Gallery
                </h2>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 lg:col-span-4 lg:justify-end">
            <button
              type="button"
              onClick={() => scrollByAmount(-420)}
              aria-label="Scroll gallery left"
              className="rounded-lg border border-[#D8C089]/30 bg-[#0E3320]/60 px-4 py-2 font-display text-xs tracking-wider text-[#FFF8E6] uppercase transition-colors hover:border-[#F7C95F] cursor-pointer whitespace-nowrap"
            >
              ← Prev Plate
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(420)}
              aria-label="Scroll gallery right"
              className="rounded-lg border border-[#D8C089]/30 bg-[#0E3320]/60 px-4 py-2 font-display text-xs tracking-wider text-[#FFF8E6] uppercase transition-colors hover:border-[#F7C95F] cursor-pointer whitespace-nowrap"
            >
              Next Plate →
            </button>
          </div>
        </div>

        {/* Required Scientific Note on Skin Colour */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs tracking-[0.08em] text-[#F7C95F]">
          <span>
            NOTE: COLOURS ARE ARTISTIC; THE REAL SKIN COLOUR OF ARGENTINOSAURUS IS UNKNOWN.
          </span>
          <span className="text-[#D8C089]/75">
            CLICK ANY PLATE TO OPEN LIGHTBOX · SUPPORTS /assets/gallery-01.jpg ... gallery-06.jpg
          </span>
        </div>

        {/* Horizontal Drag-Scroll Track */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          className={`mt-8 flex gap-6 overflow-x-auto pb-6 select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {GALLERY_PLATES.map((plate, index) => (
            <article
              key={plate.id}
              className="flex w-[330px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-[#D8C089]/25 bg-[#0E3320]/35 transition-colors hover:border-[#F7C95F]/60 sm:w-[420px]"
            >
              {/* Visual Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#07190E]">
                <PlateVectorArtwork
                  index={index}
                  plateNumber={plate.plateNumber}
                  src={plate.src}
                />
              </div>

              {/* Caption Body */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between text-xs tracking-[0.14em] text-[#D8C089] uppercase">
                    <span className="font-display text-[#FFE08F]">{plate.plateNumber}</span>
                    <span>FIG. 0{index + 1}</span>
                  </div>

                  <h3 className="font-display mt-2 text-lg tracking-[0.03em] text-[#FFF8E6] uppercase sm:text-xl">
                    {plate.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#FFF8E6]/85">
                    {plate.caption}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-2 border-t border-[#D8C089]/15 pt-4">
                  <span className="truncate text-[11px] text-[#D8C089]/80">
                    {plate.floraNote}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLightboxPlate(plate)}
                    aria-label={`Inspect ${plate.plateNumber}: ${plate.title} in lightbox`}
                    className="font-display text-xs tracking-[0.12em] text-[#F7C95F] uppercase hover:text-[#FFE08F] cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Inspect Plate ↗
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxPlate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxPlate.plateNumber}: ${lightboxPlate.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#07190E]/92 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setLightboxPlate(null)}
        >
          <div
            className="relative max-w-4xl w-full overflow-hidden rounded-2xl border border-[#D8C089]/35 bg-[#0E3320] p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#D8C089]/20 pb-4">
              <div>
                <span className="font-display text-xs tracking-[0.16em] text-[#F7C95F] uppercase">
                  {lightboxPlate.plateNumber} · ARCHIVAL VIEW
                </span>
                <h3 className="font-display mt-1 text-2xl text-[#FFF8E6] uppercase">
                  {lightboxPlate.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxPlate(null)}
                aria-label="Close lightbox"
                className="rounded-lg border border-[#D8C089]/30 bg-[#07190E] px-4 py-2 font-display text-xs tracking-wider text-[#FFF8E6] uppercase hover:border-[#F7C95F] cursor-pointer"
              >
                Close [Esc]
              </button>
            </div>

            <div className="my-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#D8C089]/25">
              <PlateVectorArtwork
                index={0}
                plateNumber={lightboxPlate.plateNumber}
                src={lightboxPlate.src}
              />
            </div>

            <p className="text-sm leading-relaxed text-[#FFF8E6]/90">{lightboxPlate.caption}</p>
            <p className="mt-2 text-xs text-[#D8C089]">
              {lightboxPlate.floraNote} · Asset path: <code>/public{lightboxPlate.src}</code> ·
              Colours are artistic; real skin colour is unknown.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
