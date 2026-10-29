import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('a, button, input, [role="button"], [data-cursor-expand="true"]')
      );
      setHovered(isInteractive);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [reducedMotion, visible]);

  if (!visible || reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:block transition-transform duration-150 ease-out"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${
          hovered ? 1.65 : 1
        })`,
      }}
    >
      <div
        className={`h-7 w-7 rounded-full border transition-colors duration-200 ${
          hovered
            ? 'border-[#FFE08F] bg-[#F7C95F]/15 shadow-[0_0_16px_rgba(247,201,95,0.4)]'
            : 'border-[#D8C089]/55 bg-transparent'
        }`}
      />
    </div>
  );
};
