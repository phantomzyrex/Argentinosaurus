import React from 'react';
import {
  computeScaleGaugeState,
  SCALE_GAUGE_MAX_METERS,
  SCALE_GAUGE_TICKS,
} from '../utils/scaleMath';
import { MENU_SECTIONS } from '../data/argentinosaurusData';

interface ScaleGaugeProps {
  scrollProgress: number;
  activeSectionIndex?: number;
  onNavigateSection?: (sectionId: string) => void;
}

export const ScaleGauge: React.FC<ScaleGaugeProps> = ({
  scrollProgress,
  activeSectionIndex = 0,
  onNavigateSection,
}) => {
  const gauge = computeScaleGaugeState(scrollProgress);
  const clampedIndex = Math.max(0, Math.min(MENU_SECTIONS.length - 1, activeSectionIndex));
  const currentChapter = MENU_SECTIONS[clampedIndex] || MENU_SECTIONS[0];
  const prevChapter = MENU_SECTIONS[Math.max(0, clampedIndex - 1)];
  const nextChapter = MENU_SECTIONS[Math.min(MENU_SECTIONS.length - 1, clampedIndex + 1)];

  return (
    <aside
      aria-label="Vertical Elevation Scale Gauge and Section Explorer"
      className="pointer-events-none fixed top-1/2 right-2.5 z-30 hidden -translate-y-1/2 flex-col items-end select-none md:flex lg:right-4"
    >
      <div className="pointer-events-auto rounded-xl border border-[#D8C089]/20 bg-[#07190E]/82 px-2.5 py-2.5 shadow-[0_6px_20px_rgba(7,25,14,0.7)]">
        <div className="mb-1.5 text-right">
          <span className="block font-display text-[8px] tracking-[0.14em] text-[#D8C089]/75 uppercase">
            SCALE GAUGE
          </span>
          <span
            data-testid="scale-gauge-value"
            className="font-display text-xs tracking-wider text-[#FFE08F] tabular-nums"
          >
            {gauge.formattedMeters}
          </span>
        </div>

        {/* Sleek Vertical Ruler Track (0 m at bottom to 7.3 m at top) */}
        <div className="relative flex h-28 items-center justify-end pr-0.5">
          <div className="relative h-full w-24">
            {SCALE_GAUGE_TICKS.map((tick) => {
              const bottomPct = (tick.meters / SCALE_GAUGE_MAX_METERS) * 100;
              const isReached = gauge.currentMeters >= tick.meters - 0.05;
              return (
                <div
                  key={tick.meters}
                  style={{ bottom: `${bottomPct}%` }}
                  className="absolute right-0 flex w-full translate-y-1/2 items-center justify-end gap-1.5"
                >
                  <span
                    className={`text-[8px] tracking-[0.06em] uppercase transition-colors duration-200 whitespace-nowrap ${
                      isReached ? 'font-medium text-[#FFF8E6]' : 'text-[#D8C089]/55'
                    }`}
                  >
                    {tick.shortLabel}
                  </span>
                  <span
                    className={`block h-[1px] transition-all duration-200 ${
                      isReached ? 'w-2.5 bg-[#F7C95F]' : 'w-1.5 bg-[#D8C089]/40'
                    }`}
                  />
                </div>
              );
            })}

            {/* Continuous vertical spine */}
            <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-[#D8C089]/25" />

            {/* Filled progress bar climbing from bottom (0 m) to top (7.3 m) */}
            <div
              className="absolute right-0 bottom-0 w-[2px] bg-gradient-to-t from-[#8C9B34] via-[#D9963A] to-[#F7C95F] transition-all duration-150"
              style={{ height: `${gauge.progressPercent}%` }}
            />

            {/* Moving Marker Indicator */}
            <div
              className="absolute right-[-2.5px] flex translate-y-1/2 items-center transition-all duration-150"
              style={{ bottom: `${gauge.progressPercent}%` }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFE08F] shadow-[0_0_8px_#F7C95F]" />
            </div>
          </div>
        </div>

        <div className="mt-1.5 border-t border-[#D8C089]/15 pt-1 text-right">
          <span className="block max-w-[100px] truncate text-[8px] tracking-[0.05em] text-[#D8C089]/75 uppercase">
            {gauge.activeMilestoneLabel}
          </span>
        </div>

        {/* Deep-Dive Keyboard Navigation HUD */}
        <div className="mt-1.5 border-t border-[#D8C089]/15 pt-1.5 text-right">
          <div className="flex items-center justify-between gap-1">
            <button
              type="button"
              disabled={clampedIndex <= 0}
              onClick={() => onNavigateSection && onNavigateSection(prevChapter.id)}
              aria-label="Previous section (Arrow Up)"
              className="rounded border border-[#D8C089]/20 px-1.5 py-0.5 text-[9px] text-[#FFE08F] transition-colors hover:border-[#F7C95F] disabled:opacity-30 cursor-pointer"
            >
              ↑
            </button>
            <span
              data-testid="active-section-indicator"
              className="font-display text-[9px] tracking-[0.12em] text-[#FFF8E6] tabular-nums"
            >
              {currentChapter.number} / 13
            </span>
            <button
              type="button"
              disabled={clampedIndex >= MENU_SECTIONS.length - 1}
              onClick={() => onNavigateSection && onNavigateSection(nextChapter.id)}
              aria-label="Next section (Arrow Down or Space)"
              className="rounded border border-[#D8C089]/20 px-1.5 py-0.5 text-[9px] text-[#FFE08F] transition-colors hover:border-[#F7C95F] disabled:opacity-30 cursor-pointer"
            >
              ↓
            </button>
          </div>
          <span className="mt-1 block text-[7px] tracking-[0.1em] text-[#8C9B34] uppercase">
            KEYS: ↑↓ · SPACE
          </span>
        </div>
      </div>
    </aside>
  );
};
