import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
  reducedMotion: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete, reducedMotion }) => {
  const [progress, setProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1' || reducedMotion) {
      setProgress(100);
      onComplete();
      return;
    }

    let current = 0;
    const interval = window.setInterval(() => {
      current += 12;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        window.clearInterval(interval);
        setFadingOut(true);
        window.setTimeout(() => {
          onComplete();
        }, 260);
      } else {
        setProgress(current);
      }
    }, 35);

    return () => window.clearInterval(interval);
  }, [onComplete, reducedMotion]);

  return (
    <div
      aria-label="Loading Patagonian River Plain Exhibition"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07190E] text-[#FFF8E6] transition-opacity duration-300 ${
        fadingOut ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-72 sm:w-96 text-center">
        <p className="font-display mb-3 text-xs tracking-[0.22em] text-[#D8C089] uppercase">
          HUINCUL FORMATION · NEUQUÉN BASIN
        </p>

        {/* Thin line meandering like a braided river */}
        <svg viewBox="0 0 320 36" className="mx-auto h-9 w-full overflow-visible">
          <path
            d="M 4 18 C 68 4, 112 32, 168 18 C 224 4, 268 30, 316 18"
            fill="none"
            stroke="rgba(216, 192, 137, 0.2)"
            strokeWidth="1.5"
          />
          <path
            d="M 4 18 C 68 4, 112 32, 168 18 C 224 4, 268 30, 316 18"
            fill="none"
            stroke="#F7C95F"
            strokeWidth="2"
            strokeDasharray="340"
            strokeDashoffset={340 - (340 * progress) / 100}
            className="transition-all duration-75 ease-out"
          />
        </svg>

        <div className="mt-2 flex items-center justify-between font-display text-xs tracking-[0.16em] text-[#FFF8E6]/80 tabular-nums">
          <span>RIVER PLAIN HORIZON</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};
