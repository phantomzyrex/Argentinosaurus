import React, { useEffect, useRef } from 'react';

interface EcosystemAtmosphereProps {
  mouseOffset: { x: number; y: number };
  reducedMotion: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  depth: 1 | 2 | 3;
  alpha: number;
  isPollen: boolean;
  phase: number;
}

interface DriftingLeaf {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  scale: number;
  kind: 'conifer' | 'fern';
  alpha: number;
}

/**
 * Global SVG Filters (Duotone grading for the creature + Horizon Heat Shimmer)
 */
export const GlobalSvgFilters: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  return (
    <svg className="pointer-events-none fixed h-0 w-0 overflow-hidden" aria-hidden="true">
      <defs>
        {/* Creature Duotone & Warm Rim Grading: maps deep shadows to --umber (#150F06), midtones to warm olive/ochre, highlights to --rim (#FFE08F) */}
        <filter id="argentinosaurus-duotone" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="
              0.92 0.12 0.00 0 0.02
              0.74 0.24 0.02 0 0.01
              0.38 0.14 0.04 0 0.00
              0    0    0    1 0
            "
            result="warmGraded"
          />
          <feComponentTransfer in="warmGraded" result="contrasted">
            <feFuncR type="gamma" amplitude="1.08" exponent="0.92" offset="0.01" />
            <feFuncG type="gamma" amplitude="1.04" exponent="0.95" offset="0.005" />
            <feFuncB type="gamma" amplitude="0.88" exponent="1.08" offset="0" />
          </feComponentTransfer>
        </filter>

        {/* Subtle Horizon Heat Shimmer (2-3px displacement) */}
        <filter id="horizon-heat-shimmer" x="-5%" y="-10%" width="110%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.06"
            numOctaves="1"
            seed="11"
            result="heatNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="heatNoise"
            scale={reducedMotion ? 0 : 2.5}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
};

/**
 * Layer 1-5 behind Creature: Sunbeams, Heat Shimmer Horizon, Distant Treeline, and Braided River Channels
 */
export const HeroBackAtmosphere: React.FC<EcosystemAtmosphereProps> = ({
  mouseOffset,
  reducedMotion,
}) => {
  const sunbeamShiftX = reducedMotion ? 0 : mouseOffset.x * 40;
  const sunbeamShiftY = reducedMotion ? 0 : mouseOffset.y * 20;
  const treelineShiftX = reducedMotion ? 0 : mouseOffset.x * 16;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Heat-hazed sunbeams: 5 broad, soft, warm golden shafts from the top */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${sunbeamShiftX}px, ${sunbeamShiftY}px, 0)`,
        }}
      >
        {/* Left outer beam */}
        <div
          className="animate-sunbeam-1 absolute -top-20 left-[2%] h-[110%] w-[24%] origin-top opacity-25"
          style={{
            background:
              'radial-gradient(ellipse 50% 90% at 50% 0%, rgba(247,201,95,0.62) 0%, rgba(217,150,58,0.24) 45%, transparent 80%)',
          }}
        />
        {/* Left inner beam */}
        <div
          className="animate-sunbeam-2 absolute -top-24 left-[20%] h-[105%] w-[24%] origin-top opacity-22"
          style={{
            background:
              'radial-gradient(ellipse 50% 85% at 50% 0%, rgba(255,224,143,0.55) 0%, rgba(216,192,137,0.20) 48%, transparent 80%)',
          }}
        />
        {/* Central zenith glow shaft */}
        <div
          className="animate-sunbeam-1 absolute -top-28 left-[38%] h-[95%] w-[26%] origin-top opacity-26"
          style={{
            background:
              'radial-gradient(ellipse 50% 85% at 50% 0%, rgba(255,224,143,0.68) 0%, rgba(247,201,95,0.24) 45%, transparent 78%)',
          }}
        />
        {/* Right inner beam */}
        <div
          className="animate-sunbeam-2 absolute -top-24 right-[16%] h-[105%] w-[24%] origin-top opacity-22"
          style={{
            background:
              'radial-gradient(ellipse 50% 85% at 50% 0%, rgba(247,201,95,0.52) 0%, rgba(217,150,58,0.18) 50%, transparent 80%)',
          }}
        />
        {/* Right outer beam */}
        <div
          className="animate-sunbeam-1 absolute -top-20 right-[1%] h-[110%] w-[22%] origin-top opacity-26"
          style={{
            background:
              'radial-gradient(ellipse 50% 90% at 50% 0%, rgba(247,201,95,0.60) 0%, rgba(217,150,58,0.24) 45%, transparent 80%)',
          }}
        />
      </div>

      {/* 2 & 6. Distant treeline along the horizon at both sides, leaving the centre open, with subtle heat shimmer */}
      <div
        className="absolute inset-x-0 bottom-[22%] h-[26%] transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${treelineShiftX}px, 0, 0)`,
        }}
      >
        <svg
          viewBox="0 0 1600 320"
          preserveAspectRatio="none"
          className="h-full w-full opacity-55"
        >
          <defs>
            <linearGradient id="treelineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1F5B2F" stopOpacity="0.65" />
              <stop offset="60%" stopColor="#0E3320" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#07190E" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="heatBandGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D8C089" stopOpacity="0" />
              <stop offset="50%" stopColor="#D8C089" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#8C9B34" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Thin horizon heat haze ribbon */}
          <rect x="0" y="150" width="1600" height="55" fill="url(#heatBandGrad)" />

          {/* Left horizon Araucaria conifer & tree-fern silhouettes (0..540px, leaving middle open) */}
          <path
            d="M0,320 L0,145 Q25,135 42,118 L30,118 L48,96 L65,118 L53,118 Q72,135 90,148
               L105,130 L122,82 L140,130 L155,148
               Q182,118 210,128 Q195,112 222,102 Q245,112 232,128
               L265,140 L282,92 L300,140
               Q335,132 365,154 L385,124 L402,156
               Q450,165 520,192 Q580,210 640,222 L640,320 Z"
            fill="url(#treelineGrad)"
          />

          {/* Right horizon Araucaria conifer & tree-fern silhouettes (960..1600px, leaving middle open) */}
          <path
            d="M960,320 L960,222 Q1030,208 1090,190 Q1150,168 1195,155
               L1212,120 L1230,155
               Q1265,136 1295,142 L1315,88 L1335,142
               Q1365,115 1392,105 Q1418,115 1402,134
               L1438,144 L1458,78 L1480,144
               Q1515,126 1545,112 L1565,138 L1600,132 L1600,320 Z"
            fill="url(#treelineGrad)"
          />
        </svg>
      </div>

      {/* 5. Braided river: faint, luminous, silt-gold braided channels across the lower 30% of the frame, running behind the creature's legs */}
      <div className="absolute inset-x-0 bottom-0 h-[32%] opacity-75">
        <svg viewBox="0 0 1600 300" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="braidedSiltGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D8C089" stopOpacity="0.12" />
              <stop offset="25%" stopColor="#F7C95F" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#FFE08F" stopOpacity="0.62" />
              <stop offset="75%" stopColor="#D8C089" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#8C9B34" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient id="riverPlainBed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1F5B2F" stopOpacity="0" />
              <stop offset="45%" stopColor="#0E3320" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#07190E" stopOpacity="0.96" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="1600" height="300" fill="url(#riverPlainBed)" />

          {/* Anastomosing braided channels that split and rejoin */}
          <path
            d="M-60,78 C220,62 410,115 690,94 C960,72 1190,128 1660,88"
            fill="none"
            stroke="url(#braidedSiltGrad)"
            strokeWidth="3.5"
          />
          <path
            d="M-40,112 C260,148 490,78 780,118 C1040,154 1310,92 1650,136"
            fill="none"
            stroke="url(#braidedSiltGrad)"
            strokeWidth="6"
            opacity="0.7"
          />
          <path
            d="M80,92 C310,126 530,132 760,96 C990,62 1210,142 1520,110"
            fill="none"
            stroke="#FFE08F"
            strokeWidth="2"
            className="animate-river-glint"
          />
          <path
            d="M-50,168 C290,132 620,206 940,164 C1220,126 1410,192 1660,174"
            fill="none"
            stroke="url(#braidedSiltGrad)"
            strokeWidth="8.5"
            opacity="0.55"
          />
          <path
            d="M190,152 C460,192 710,144 1020,178 C1260,204 1450,156 1640,188"
            fill="none"
            stroke="#FFE08F"
            strokeWidth="2.4"
            className="animate-river-glint"
          />
          <path
            d="M-30,226 C380,254 790,198 1180,236 C1380,254 1510,224 1650,242"
            fill="none"
            stroke="url(#braidedSiltGrad)"
            strokeWidth="12"
            opacity="0.38"
          />
        </svg>
      </div>
    </div>
  );
};

/**
 * Layer 3, 4, 7, 8, 9 in Front: Dust & Pollen Canvas + Drifting Leaves + Ground Haze + Foreground Tree-Fern/Conifer Silhouettes + Film Grain
 */
export const HeroFrontAtmosphere: React.FC<EcosystemAtmosphereProps> = ({
  mouseOffset,
  reducedMotion,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef(mouseOffset);
  mouseRef.current = mouseOffset;

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Cap particle count on smaller / low-end viewports
    const isCompact = width < 768;
    const particleCount = isCompact ? 42 : 80;
    const leafCount = isCompact ? 5 : 8;

    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
      const depth = ((i % 3) + 1) as 1 | 2 | 3;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (0.14 + Math.random() * 0.28) * (depth * 0.55),
        vy: (-0.08 + Math.random() * 0.16) * (depth * 0.4),
        size: depth === 1 ? 1.1 : depth === 2 ? 1.8 : 2.6,
        depth,
        alpha: 0.2 + Math.random() * 0.45,
        isPollen: i % 5 === 0,
        phase: Math.random() * Math.PI * 2,
      };
    });

    const leaves: DriftingLeaf[] = Array.from({ length: leafCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.85,
      vx: 0.35 + Math.random() * 0.45,
      vy: 0.12 + Math.random() * 0.22,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.012,
      scale: 0.65 + Math.random() * 0.55,
      kind: i % 2 === 0 ? 'fern' : 'conifer',
      alpha: 0.28 + Math.random() * 0.32,
    }));

    let tick = 0;
    const render = () => {
      tick += 0.015;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x * 60;
      const my = mouseRef.current.y * 30;

      // Draw 3-depth dust motes & pale green pollen specks
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy + Math.sin(tick + p.phase) * 0.08;

        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const px = p.x + mx * (p.depth / 3);
        const py = p.y + my * (p.depth / 3);

        // Glow stronger when crossing upper-middle sunbeam corridors
        const inSunbeamBand = py < height * 0.65 && Math.sin((px / width) * Math.PI * 5) > 0.15;
        const finalAlpha = inSunbeamBand ? Math.min(0.85, p.alpha * 1.65) : p.alpha;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.isPollen
          ? `rgba(174, 206, 110, ${finalAlpha})`
          : inSunbeamBand
            ? `rgba(255, 224, 143, ${finalAlpha})`
            : `rgba(216, 192, 137, ${finalAlpha})`;
        ctx.fill();
      }

      // Draw drifting conifer-needle sprigs & fern-frond silhouettes
      for (const leaf of leaves) {
        leaf.x += leaf.vx;
        leaf.y += leaf.vy + Math.cos(tick + leaf.scale) * 0.14;
        leaf.rotation += leaf.vRot;

        if (leaf.x > width + 40) {
          leaf.x = -40;
          leaf.y = Math.random() * height * 0.8;
        }
        if (leaf.y > height + 40) {
          leaf.y = -30;
        }

        const lx = leaf.x + mx * 0.85;
        const ly = leaf.y + my * 0.85;

        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(leaf.rotation);
        ctx.scale(leaf.scale, leaf.scale);
        ctx.fillStyle = `rgba(14, 51, 32, ${leaf.alpha})`;
        ctx.strokeStyle = `rgba(216, 192, 137, ${leaf.alpha * 0.45})`;
        ctx.lineWidth = 0.8;

        if (leaf.kind === 'fern') {
          // Small fern pinna silhouette
          ctx.beginPath();
          ctx.moveTo(-10, 0);
          ctx.quadraticCurveTo(0, -5, 12, 0);
          ctx.quadraticCurveTo(0, 5, -10, 0);
          ctx.fill();
          ctx.stroke();
        } else {
          // Conifer needle sprig
          ctx.beginPath();
          ctx.moveTo(-8, 0);
          ctx.lineTo(8, 0);
          ctx.moveTo(-3, 0);
          ctx.lineTo(2, -4);
          ctx.moveTo(0, 0);
          ctx.lineTo(5, 4);
          ctx.stroke();
        }
        ctx.restore();
      }

      timeoutId = window.setTimeout(() => {
        animationFrameId = window.requestAnimationFrame(render);
      }, 45);
    };

    let timeoutId = 0;
    animationFrameId = window.requestAnimationFrame(render);
    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion]);

  const foregroundShiftX = reducedMotion ? 0 : mouseOffset.x * -80;
  const foregroundShiftY = reducedMotion ? 0 : mouseOffset.y * -35;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
      {/* 8. Ground haze: warm dust-and-mist gradient in --deep/--floor over bottom 30% so legs/tail dissolve into river plain */}
      <div
        className="absolute inset-x-0 bottom-0 z-25 h-[30%]"
        style={{
          background:
            'linear-gradient(180deg, rgba(14,51,32,0) 0%, rgba(14,51,32,0.52) 48%, rgba(7,25,14,0.92) 86%, rgba(7,25,14,0.98) 100%)',
        }}
      />

      {/* 3 & 4. Dust, pollen, and drifting conifer/fern leaves canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-30 h-full w-full" />

      {/* 7. Foreground silhouettes: dark tree-fern fronds and conifer trunks in --floor at left and right edges */}
      <div
        className="absolute inset-0 z-30 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${foregroundShiftX}px, ${foregroundShiftY}px, 0)`,
        }}
      >
        {/* Left edge conifer trunk & overhanging tree-fern fronds */}
        <svg
          viewBox="0 0 360 900"
          preserveAspectRatio="none"
          className="absolute top-0 bottom-0 -left-8 h-full w-[22vw] max-w-[290px] min-w-[140px] opacity-90"
        >
          {/* Conifer trunk edge */}
          <path d="M0,0 L46,0 Q34,450 58,900 L0,900 Z" fill="#07190E" />
          {/* Upper fern frond */}
          <path
            d="M20,80 Q140,95 260,165 Q175,155 110,148 Q165,175 230,210 Q140,192 75,175 Q125,212 175,245 Q95,220 20,185 Z"
            fill="#07190E"
          />
          {/* Mid-lower tree-fern frond */}
          <path
            d="M15,540 Q155,510 295,565 Q195,575 120,582 Q185,602 250,640 Q150,630 85,622 Q135,655 180,695 Q90,670 15,645 Z"
            fill="#07190E"
          />
          {/* Basal river-bank horsetails & scrub */}
          <path
            d="M0,900 L0,710 Q48,750 85,900 M25,900 Q75,770 135,740 Q95,820 75,900 M60,900 Q115,800 175,790 Q125,850 110,900 Z"
            fill="#07190E"
          />
        </svg>

        {/* Right edge conifer trunk & overhanging tree-fern fronds */}
        <svg
          viewBox="0 0 360 900"
          preserveAspectRatio="none"
          className="absolute top-0 -right-8 bottom-0 h-full w-[22vw] max-w-[290px] min-w-[140px] opacity-90"
        >
          {/* Right conifer trunk edge */}
          <path d="M360,0 L314,0 Q326,450 302,900 L360,900 Z" fill="#07190E" />
          {/* Upper right Araucaria branch & fern */}
          <path
            d="M340,110 Q215,125 95,195 Q185,185 250,178 Q195,205 130,242 Q220,222 285,205 Q235,242 185,275 Q265,250 340,215 Z"
            fill="#07190E"
          />
          {/* Lower right tree-fern frond */}
          <path
            d="M345,590 Q205,560 65,615 Q165,625 240,632 Q175,652 110,690 Q210,680 275,672 Q225,705 180,745 Q270,720 345,695 Z"
            fill="#07190E"
          />
        </svg>
      </div>

      {/* 9. Subtle atmospheric vignette over the frame */}
      <div
        className="pointer-events-none absolute inset-0 z-35"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, transparent 58%, rgba(7, 25, 14, 0.42) 100%)',
        }}
      />
    </div>
  );
};
