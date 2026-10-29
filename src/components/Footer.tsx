import React from 'react';

interface FooterProps {
  onBackToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop }) => {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-[#D8C089]/15 bg-[#07190E] pt-20 pb-12 sm:pt-28 sm:pb-16"
    >
      {/* Subtle geometric constellation lines & nodes matching reference screenshot in our river-forest palette */}
      <svg
        viewBox="0 0 1440 700"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-35 select-none"
        aria-hidden="true"
      >
        {/* Top-left triangle near 13 */}
        <g stroke="#8C9B34" strokeWidth="0.8" fill="#8C9B34">
          <line x1="122" y1="42" x2="180" y2="75" strokeOpacity="0.45" />
          <line x1="180" y1="75" x2="132" y2="108" strokeOpacity="0.45" />
          <line x1="132" y1="108" x2="122" y2="42" strokeOpacity="0.45" />
          <circle cx="122" cy="42" r="2.2" fill="#D8C089" />
          <circle cx="180" cy="75" r="2" />
          <circle cx="132" cy="108" r="1.8" />
        </g>

        {/* Upper-right geometric diamond & branch near the CTA button */}
        <g stroke="#8C9B34" strokeWidth="0.85" fill="#8C9B34">
          <line x1="960" y1="28" x2="920" y2="112" strokeOpacity="0.4" />
          <line x1="920" y1="112" x2="856" y2="148" strokeOpacity="0.5" />
          <line x1="920" y1="112" x2="1012" y2="195" strokeOpacity="0.45" />
          <line x1="856" y1="148" x2="968" y2="236" strokeOpacity="0.45" />
          <line x1="1012" y1="195" x2="968" y2="236" strokeOpacity="0.45" />
          <circle cx="920" cy="112" r="2.5" fill="#F7C95F" />
          <circle cx="856" cy="148" r="2.5" />
          <circle cx="968" cy="236" r="2" />
        </g>

        {/* Center-left triangle above "Shivang Studios" */}
        <g stroke="#8C9B34" strokeWidth="0.8" fill="#8C9B34">
          <line x1="376" y1="335" x2="342" y2="418" strokeOpacity="0.4" />
          <line x1="376" y1="335" x2="418" y2="402" strokeOpacity="0.4" />
          <line x1="342" y1="418" x2="418" y2="402" strokeOpacity="0.4" />
          <circle cx="376" cy="335" r="1.8" />
          <circle cx="342" cy="418" r="2" fill="#D8C089" />
          <circle cx="418" cy="402" r="2" />
        </g>

        {/* Ambient isolated specks */}
        <circle cx="18" cy="268" r="2" fill="#8C9B34" opacity="0.6" />
        <circle cx="1405" cy="405" r="2" fill="#8C9B34" opacity="0.6" />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-14">
        {/* Top Kicker Row: Outlined 13 + CURATORIAL INQUIRIES & DIGITAL PORTFOLIO */}
        <div className="flex items-baseline gap-4">
          <span
            className="section-number-outline text-5xl leading-none sm:text-6xl"
            aria-hidden="true"
          >
            13
          </span>
          <p className="font-display text-xs tracking-[0.22em] text-[#8C9B34] uppercase sm:text-[13px]">
            CURATORIAL INQUIRIES &amp; DIGITAL PORTFOLIO
          </p>
        </div>

        {/* Upper Section: LET'S TALK + Links on Left, Return Button on Right */}
        <div className="mt-5 flex flex-col items-start justify-between gap-10 border-b border-[#D8C089]/15 pb-14 lg:flex-row lg:items-end">
          <div>
            <h2
              id="contact-heading"
              className="font-display wordmark-glow text-5xl leading-none tracking-[0.02em] text-[#FFF8E6] uppercase sm:text-7xl lg:text-[84px]"
            >
              LET&apos;S TALK
            </h2>

            {/* Contact & Portfolio Links Row */}
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:text-[15px]">
              <a
                href="mailto:techhelp.shivang@gmail.com"
                className="font-normal text-[#8C9B34] transition-colors duration-200 hover:text-[#F7C95F]"
              >
                techhelp.shivang@gmail.com
              </a>
              <span className="text-[#D8C089]/40" aria-hidden="true">
                ·
              </span>
              <a
                href="https://github.com/phantomzyrex"
                target="_blank"
                rel="noreferrer"
                className="text-[#FFF8E6]/80 transition-colors duration-200 hover:text-[#FFE08F]"
              >
                github.com/phantomzyrex
              </a>
              <span className="text-[#D8C089]/40" aria-hidden="true">
                ·
              </span>
              <a
                href="#overview"
                className="text-[#FFF8E6]/80 transition-colors duration-200 hover:text-[#FFE08F]"
              >
                Paleo-Dossier
              </a>
            </div>
          </div>

          {/* Right Column: Return to the Riverbank / Canopy CTA Button */}
          <div className="flex flex-col items-start lg:items-end">
            <button
              type="button"
              onClick={onBackToTop}
              aria-label="Return to the riverbank — scroll to top and reset scale gauge to 0.0 m (107 MYA)"
              className="group rounded-xl border border-[#8C9B34]/65 bg-[#0E3320]/80 px-6 py-3.5 font-display text-xs tracking-[0.14em] text-[#FFF8E6] uppercase shadow-[0_0_24px_rgba(140,155,52,0.15)] transition-all duration-200 hover:border-[#F7C95F] hover:bg-[#1F5B2F] hover:text-[#FFE08F] cursor-pointer whitespace-nowrap sm:text-[13px]"
            >
              <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 mr-1.5">
                ↑
              </span>
              RETURN TO THE RIVERBANK (107.0 MYA)
            </button>
            <p className="mt-2.5 text-[11px] tracking-[0.02em] text-[#D8C089]/60 lg:text-right">
              Resets elevation scale gauge to Patagonian river plain (0.0 m)
            </p>
          </div>
        </div>

        {/* Centerpiece Giant Wordmark: "Shivang Studios" */}
        <div className="border-b border-[#D8C089]/15 py-14 text-center sm:py-20 lg:py-24">
          <div
            aria-label="Shivang Studios"
            className="mx-auto select-none text-[11.5vw] leading-[1.02] font-semibold tracking-[-0.03em] text-[#FFF8E6] sm:text-[10.5vw] lg:text-[138px]"
            style={{
              textShadow:
                '0 0 28px rgba(140, 155, 52, 0.32), 0 0 56px rgba(247, 201, 95, 0.18)',
            }}
          >
            Shivang Studios
          </div>
        </div>

        {/* Bottom Attribution & Links Bar */}
        <div className="mt-7 flex flex-col items-start justify-between gap-4 text-xs sm:flex-row sm:items-center sm:text-sm">
          <div className="flex flex-wrap items-center gap-2 text-[#D8C089]/80">
            <span className="font-semibold text-[#FFF8E6]">Shivang Gupta</span>
            <span className="text-[#D8C089]/40" aria-hidden="true">
              ·
            </span>
            <span>
              Created with{' '}
              <span
                className="mx-0.5 inline-block text-[#8C9B34] drop-shadow-[0_0_8px_rgba(247,201,95,0.65)]"
                aria-label="love"
              >
                ♥
              </span>{' '}
              by Shivang Studios
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#D8C089]/80 sm:text-sm">
            <a
              href="https://github.com/phantomzyrex"
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-200 hover:text-[#FFE08F]"
            >
              GitHub
            </a>
            <a
              href="mailto:techhelp.shivang@gmail.com"
              className="transition-colors duration-200 hover:text-[#FFE08F]"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
