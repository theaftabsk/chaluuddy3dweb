import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Globe,
  ArrowRight,
  UserCheck,
  ShieldCheck,
  Zap,
  ChevronDown,
  Compass,
  Users,
  Plane,
  CheckCircle2,
  Wallet
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 40;
const FOLDER_PATH = '/Travel_animation_video_generatio_4320da43-ezgif-split';

export const CinematicStoryJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const arcsRef = useRef<SVGSVGElement>(null);

  // 3 Liquid Glass Stage Refs
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Scroll progress tracker
    const scrollObj = { frameProgress: 0 };

    // 1. Efficient Preload all 40 frames in numerical order
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const frameNumber = String(i).padStart(3, '0');
      const img = new Image();
      img.src = `${FOLDER_PATH}/ezgif-frame-${frameNumber}.jpg`;
      img.onload = () => {
        count++;
        if (count === 1) {
          drawFrame(0);
        }
        if (count === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    // 2. High-performance Canvas Render Function
    function drawFrame(frameProgress: number) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const imgs = imagesRef.current;
      if (imgs.length === 0) return;

      const frameFloat = Math.max(0, Math.min(frameProgress * (TOTAL_FRAMES - 1), TOTAL_FRAMES - 1));
      const indexA = Math.floor(frameFloat);
      const indexB = Math.min(indexA + 1, TOTAL_FRAMES - 1);
      const sub = frameFloat - indexA;

      const imgA = imgs[indexA];
      const imgB = imgs[indexB];

      if (!imgA || !imgA.complete || imgA.naturalWidth === 0) return;

      const w = canvas.width;
      const h = canvas.height;

      // Object-cover math
      const scaleA = Math.max(w / imgA.naturalWidth, h / imgA.naturalHeight);
      const drawWA = imgA.naturalWidth * scaleA;
      const drawHA = imgA.naturalHeight * scaleA;
      const drawXA = (w - drawWA) / 2;
      const drawYA = (h - drawHA) / 2;

      ctx.drawImage(imgA, drawXA, drawYA, drawWA, drawHA);

      // Smooth optical cross-dissolve between adjacent frames
      if (indexA !== indexB && imgB && imgB.complete && imgB.naturalWidth > 0) {
        const blend = sub * sub * (3 - 2 * sub);
        if (blend > 0.002) {
          const scaleB = Math.max(w / imgB.naturalWidth, h / imgB.naturalHeight);
          const drawWB = imgB.naturalWidth * scaleB;
          const drawHB = imgB.naturalHeight * scaleB;
          const drawXB = (w - drawWB) / 2;
          const drawYB = (h - drawHB) / 2;

          ctx.globalAlpha = blend;
          ctx.drawImage(imgB, drawXB, drawYB, drawWB, drawHB);
          ctx.globalAlpha = 1.0;
        }
      }

      // Atmospheric vignette for contrast over snow and mountains
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.5)');
      gradient.addColorStop(0.35, 'rgba(15, 23, 42, 0.18)');
      gradient.addColorStop(0.75, 'rgba(15, 23, 42, 0.35)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.8)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }

    // 3. Canvas Responsive Resize
    function handleResize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      drawFrame(scrollObj.frameProgress);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    // 4. Master GSAP ScrollTrigger Sequence Timeline
    const ctxTimeline = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=320%',
          pin: true,
          scrub: 0.7,
          onUpdate: (self) => {
            scrollObj.frameProgress = self.progress;
            drawFrame(self.progress);
          }
        }
      });

      // Total timeline scale = 100 units
      // Initial States
      gsap.set(stage1Ref.current, { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' });
      gsap.set(stage2Ref.current, { opacity: 0, y: 50, scale: 0.96, pointerEvents: 'none' });
      gsap.set(stage3Ref.current, { opacity: 0, y: 50, scale: 0.96, pointerEvents: 'none' });
      gsap.set(arcsRef.current, { opacity: 0.85 });

      // =========================================================================
      // BEAT 1: Hero Section (0 -> 15 units)
      // As scroll begins and camera dives into the mountain clouds, Hero fades OUT
      // =========================================================================
      tl.to(
        stage1Ref.current,
        {
          opacity: 0,
          y: -45,
          scale: 0.96,
          pointerEvents: 'none',
          ease: 'power2.inOut',
          duration: 10
        },
        5
      );

      // =========================================================================
      // BEAT 2: How It Works enters right as the Snowy Mountain Peaks appear! (16 -> 55 units)
      // =========================================================================
      tl.to(
        stage2Ref.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          pointerEvents: 'auto',
          ease: 'power2.out',
          duration: 10
        },
        16
      );

      // Hold Stage 2 during the snowy mountain flight
      tl.to(stage2Ref.current, { opacity: 1, duration: 25 }, 26);

      // Transition Stage 2 OUT as the camera continues past the snowy peaks
      tl.to(
        stage2Ref.current,
        {
          opacity: 0,
          y: -45,
          scale: 0.96,
          pointerEvents: 'none',
          ease: 'power2.inOut',
          duration: 10
        },
        53
      );

      // =========================================================================
      // BEAT 3: Why Choose Us (60 -> 95 units) enters during high alpine pass
      // =========================================================================
      tl.to(
        stage3Ref.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          pointerEvents: 'auto',
          ease: 'power2.out',
          duration: 10
        },
        60
      );

      // Hold Stage 3
      tl.to(stage3Ref.current, { opacity: 1, duration: 20 }, 70);

      // Smooth exit near pin end
      tl.to(
        stage3Ref.current,
        {
          opacity: 0.9,
          duration: 5
        },
        92
      );
    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctxTimeline.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        color: '#FFFFFF'
      }}
    >
      {/* 1. Cinematic Background Video Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1
        }}
      />

      {/* 2. Luminous Cyan/Neon Orbital Light Arcs */}
      <svg
        ref={arcsRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10,
          opacity: 0.85
        }}
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="orbitalArc1" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
            <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#818CF8" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="orbitalArc2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#60A5FA" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Top-right sweeping curve */}
        <path
          d="M 1480 320 C 1320 180, 1080 140, 720 220 C 340 300, 120 540, -80 720"
          stroke="url(#orbitalArc1)"
          strokeWidth="2.4"
          filter="url(#glowFilter)"
        />

        {/* Bottom-left accent curve */}
        <path
          d="M -60 720 C 100 780, 260 840, 480 820"
          stroke="url(#orbitalArc2)"
          strokeWidth="2.2"
          filter="url(#glowFilter)"
        />
      </svg>

      {/* Glassmorphism Stylesheet */}
      <style>{`
        .step-glass-card {
          background: rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(28px) saturate(190%);
          -webkit-backdrop-filter: blur(28px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.38);
          box-shadow: 
            0 20px 45px rgba(0, 0, 0, 0.28),
            inset 0 1px 1px rgba(255, 255, 255, 0.65),
            inset 0 -1px 1px rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .step-glass-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255, 255, 255, 0.65);
          box-shadow: 0 25px 55px rgba(37, 99, 235, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.85);
        }
        .step-glass-card-featured {
          background: rgba(30, 58, 138, 0.28);
          backdrop-filter: blur(32px) saturate(200%);
          -webkit-backdrop-filter: blur(32px) saturate(200%);
          border: 2px solid #38BDF8 !important;
          box-shadow: 
            0 0 35px rgba(56, 189, 248, 0.55),
            inset 0 0 25px rgba(56, 189, 248, 0.18),
            0 25px 50px rgba(0, 0, 0, 0.35);
          border-radius: 24px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }
        .step-glass-card-featured:hover {
          transform: translateY(-6px);
          box-shadow: 
            0 0 45px rgba(56, 189, 248, 0.75),
            inset 0 0 30px rgba(56, 189, 248, 0.25),
            0 30px 60px rgba(0, 0, 0, 0.45);
        }
        .liquid-glass-pill {
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(26px) saturate(190%);
          -webkit-backdrop-filter: blur(26px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.38);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.6);
          border-radius: var(--radius-full);
        }
        .story-stage {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          z-index: 20;
          will-change: transform, opacity;
        }
        @media (max-width: 768px) {
          .stage-inner {
            padding: 1rem 0 !important;
          }
          .trust-divider {
            display: none !important;
          }
          .hide-on-mobile {
            display: none !important;
          }
          .step-glass-card {
            padding: 1.6rem 1.4rem !important;
          }
        }
        @media (max-width: 580px) {
          .step-cards-grid, .feature-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>

      {/* =========================================================================
          STAGE 1: HERO SECTION (Find Your People. Explore The World.)
         ========================================================================= */}
      <div ref={stage1Ref} className="story-stage">
        <div
          className="container stage-inner"
          style={{
            textAlign: 'center',
            maxWidth: '920px',
            position: 'relative',
            zIndex: 30,
            paddingTop: '2rem'
          }}
        >
          {/* 1. Global Travel Community Pill Badge */}
          <div
            className="liquid-glass-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.45rem 1.4rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '1.75rem',
              letterSpacing: '0.08em',
              border: '1px solid rgba(147, 197, 253, 0.45)',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.6)'
            }}
          >
            <Globe size={16} color="#38BDF8" />
            <span>GLOBAL TRAVEL COMMUNITY</span>
          </div>

          {/* 2. Main Heading */}
          <h1
            style={{
              fontSize: 'clamp(2.7rem, 6vw, 4.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '1.4rem',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{ color: '#FFFFFF' }}>Find Your People.</div>
            <div
              style={{
                background: 'linear-gradient(135deg, #7DD3FC 0%, #BAE6FD 50%, #FFFFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 14px rgba(56, 189, 248, 0.35))'
              }}
            >
              Explore The World.
            </div>
          </h1>

          {/* 3. Description Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              lineHeight: 1.65,
              maxWidth: '720px',
              margin: '0 auto 2.5rem auto',
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.45)'
            }}
          >
            Discover amazing destinations, connect with like-minded travelers, and<br className="hide-on-mobile" />
            turn your travel dreams into unforgettable adventures.
          </p>

          {/* 4. Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
              marginBottom: '3rem'
            }}
          >
            {/* Glowing Blue Primary Button */}
            <a
              href="#how-it-works"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.95rem 2.25rem',
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '1rem',
                borderRadius: '9999px',
                boxShadow: '0 0 35px rgba(37, 99, 235, 0.8), 0 8px 25px rgba(37, 99, 235, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 45px rgba(37, 99, 235, 0.95), 0 12px 30px rgba(37, 99, 235, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 35px rgba(37, 99, 235, 0.8), 0 8px 25px rgba(37, 99, 235, 0.55)';
              }}
            >
              <span>Explore Trips</span>
              <ArrowRight size={17} />
            </a>

            {/* Liquid Glass Secondary Button */}
            <a
              href="#how-it-works"
              className="liquid-glass-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.95rem 2.25rem',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.45)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.55)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.24)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Start Your Journey</span>
            </a>
          </div>

          {/* 5. Trust Indicators Pill with Divider Lines */}
          <div
            className="liquid-glass-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.25rem',
              flexWrap: 'wrap',
              padding: '0.95rem 2.75rem',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.55)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem' }}>
              <UserCheck size={19} color="#60A5FA" />
              <span>Verified Travelers</span>
            </div>

            <div className="trust-divider" style={{ width: '1px', height: '22px', backgroundColor: 'rgba(255, 255, 255, 0.35)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem' }}>
              <ShieldCheck size={19} color="#34D399" />
              <span>Safe & Secure Trips</span>
            </div>

            <div className="trust-divider" style={{ width: '1px', height: '22px', backgroundColor: 'rgba(255, 255, 255, 0.35)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem' }}>
              <Zap size={19} color="#FBBF24" />
              <span>Join Instantly</span>
            </div>
          </div>

          {/* 6. Scroll Prompt */}
          <div
            style={{
              marginTop: '3.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'rgba(255, 255, 255, 0.85)'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              SCROLL TO EXPLORE
            </span>
            <ChevronDown size={18} className="bounce-scroll" />
          </div>
        </div>
      </div>

      {/* =========================================================================
          STAGE 2: HOW CHALOBUDDY WORKS (Exact 1:1 Match to Reference Image)
         ========================================================================= */}
      <div id="how-it-works" ref={stage2Ref} className="story-stage">
        <div className="container stage-inner" style={{ maxWidth: '1240px', textAlign: 'center' }}>
          {/* Header */}
          <div style={{ marginBottom: '2.5rem' }}>
            {/* Glowing Lightning Easy Onboarding Pill */}
            <div
              className="liquid-glass-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 1.35rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.08em',
                marginBottom: '1.25rem',
                border: '1px solid rgba(56, 189, 248, 0.65)',
                boxShadow: '0 0 25px rgba(56, 189, 248, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.6)'
              }}
            >
              <Zap size={15} color="#38BDF8" fill="#38BDF8" />
              <span>EASY ONBOARDING</span>
            </div>

            {/* Title with Gradient Line & Subtle Wave */}
            <h2
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
                textShadow: '0 4px 25px rgba(0, 0, 0, 0.55)'
              }}
            >
              <div style={{ color: '#FFFFFF' }}>Your Journey Starts With</div>
              <div
                style={{
                  background: 'linear-gradient(135deg, #7DD3FC 0%, #93C5FD 50%, #818CF8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  position: 'relative'
                }}
              >
                Three Simple Steps
                {/* Subtle wavy stroke under Three Simple Steps */}
                <svg
                  style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '180px',
                    height: '8px'
                  }}
                  viewBox="0 0 180 8"
                  fill="none"
                >
                  <path
                    d="M 5 4 Q 45 8, 90 4 Q 135 0, 175 4"
                    stroke="#38BDF8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </svg>
              </div>
            </h2>

            {/* Description Subtitle */}
            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                color: 'rgba(255, 255, 255, 0.92)',
                maxWidth: '720px',
                margin: '0 auto',
                lineHeight: 1.6,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.45)'
              }}
            >
              Chalobuddy connects you with vetted co-travelers so you never have to<br className="hide-on-mobile" />
              put your travel bucket list on hold.
            </p>
          </div>

          {/* 3 Step Cards Grid (Center Card with Neon Blue Glow) */}
          <div
            className="step-cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem',
              textAlign: 'left'
            }}
          >
            {/* CARD 01: Discover Trips */}
            <div
              className="step-glass-card"
              style={{
                padding: '2.4rem 2.2rem',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 0 25px rgba(56, 189, 248, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.65)',
                  marginBottom: '1.4rem'
                }}
              >
                <Compass size={28} strokeWidth={2.4} />
              </div>

              {/* Tag */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(56, 189, 248, 0.22)',
                  color: '#7DD3FC',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  borderRadius: '9999px',
                  padding: '0.25rem 0.8rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  marginBottom: '0.85rem',
                  width: 'fit-content'
                }}
              >
                STEP 01
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '0.65rem',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.35)'
                }}
              >
                Discover Trips
              </h3>

              {/* Desc */}
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.88)',
                  lineHeight: 1.55,
                  marginBottom: '1.75rem',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.25)'
                }}
              >
                Explore trips based on your destination, interests and budget.
              </p>

              {/* Checkpoints */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Custom budget filter', 'Verified trip dates', 'Multiple travel styles'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.925rem', color: 'rgba(255, 255, 255, 0.95)' }}>
                    <CheckCircle2 size={17} color="#38BDF8" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 02 (FEATURED / ACTIVE): Find Your Buddy */}
            <div
              className="step-glass-card-featured"
              style={{
                padding: '2.4rem 2.2rem',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 0 30px rgba(96, 165, 250, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.75)',
                  marginBottom: '1.4rem'
                }}
              >
                <Users size={28} strokeWidth={2.4} />
              </div>

              {/* Tag */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(56, 189, 248, 0.3)',
                  color: '#BAE6FD',
                  border: '1px solid rgba(56, 189, 248, 0.6)',
                  borderRadius: '9999px',
                  padding: '0.25rem 0.8rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  marginBottom: '0.85rem',
                  width: 'fit-content'
                }}
              >
                STEP 02
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '0.65rem',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.35)'
                }}
              >
                Find Your Buddy
              </h3>

              {/* Desc */}
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.92)',
                  lineHeight: 1.55,
                  marginBottom: '1.75rem',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.25)'
                }}
              >
                Connect with verified travelers who share your interests.
              </p>

              {/* Checkpoints */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Government ID verified', 'Shared travel vibes', 'In-app chat & video'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.925rem', color: 'rgba(255, 255, 255, 0.95)' }}>
                    <CheckCircle2 size={17} color="#38BDF8" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 03: Start Your Journey */}
            <div
              className="step-glass-card"
              style={{
                padding: '2.4rem 2.2rem',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 0 25px rgba(56, 189, 248, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.65)',
                  marginBottom: '1.4rem'
                }}
              >
                <Plane size={28} strokeWidth={2.4} />
              </div>

              {/* Tag */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(56, 189, 248, 0.22)',
                  color: '#7DD3FC',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  borderRadius: '9999px',
                  padding: '0.25rem 0.8rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  marginBottom: '0.85rem',
                  width: 'fit-content'
                }}
              >
                STEP 03
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '0.65rem',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.35)'
                }}
              >
                Start Your Journey
              </h3>

              {/* Desc */}
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.88)',
                  lineHeight: 1.55,
                  marginBottom: '1.75rem',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.25)'
                }}
              >
                Join a trip and create unforgettable travel memories.
              </p>

              {/* Checkpoints */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Instant itinerary sync', 'Group expense sharing', '24/7 safety concierge'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.925rem', color: 'rgba(255, 255, 255, 0.95)' }}>
                    <CheckCircle2 size={17} color="#38BDF8" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          STAGE 3: WHY CHOOSE CHALOBUDDY (Exact 1:1 Match to Reference Image)
         ========================================================================= */}
      <div id="why-us" ref={stage3Ref} className="story-stage">
        <div className="container stage-inner" style={{ maxWidth: '1240px', textAlign: 'center' }}>
          {/* Header */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div
              className="liquid-glass-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 1.35rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.08em',
                marginBottom: '1.25rem',
                border: '1px solid rgba(56, 189, 248, 0.65)',
                boxShadow: '0 0 25px rgba(56, 189, 248, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.6)'
              }}
            >
              <span style={{ color: '#38BDF8', fontSize: '1rem' }}>✦</span>
              <span>THE CHALOBUDDY ADVANTAGE</span>
            </div>

            {/* Title with Gradient and Wavy Accent Line */}
            <h2
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
                textShadow: '0 4px 25px rgba(0, 0, 0, 0.55)'
              }}
            >
              <span style={{ color: '#FFFFFF' }}>More Than a </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, #38BDF8 0%, #60A5FA 50%, #C084FC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  position: 'relative'
                }}
              >
                Travel Platform.
                {/* Wavy accent stroke */}
                <svg
                  style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '180px',
                    height: '8px'
                  }}
                  viewBox="0 0 180 8"
                  fill="none"
                >
                  <path
                    d="M 5 4 Q 45 8, 90 4 Q 135 0, 175 4"
                    stroke="#38BDF8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </svg>
              </span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                color: 'rgba(255, 255, 255, 0.92)',
                maxWidth: '720px',
                margin: '0 auto',
                lineHeight: 1.6,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.45)'
              }}
            >
              Everything you need for a safe, fun and memorable journey from start to finish.
            </p>
          </div>

          {/* 6 Feature Cards Grid (3 Columns x 2 Rows) */}
          <div
            className="feature-cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              textAlign: 'left'
            }}
          >
            {/* Card 1: Verified Travelers */}
            <div
              className="step-glass-card"
              style={{
                padding: '2.2rem 2rem',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 0 20px rgba(56, 189, 248, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.65)',
                  marginBottom: '1.25rem'
                }}
              >
                <Users size={26} strokeWidth={2.4} />
              </div>
              <h3
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '0.65rem',
                  textShadow: '0 2px 8px rgba(0,0,0,0.35)'
                }}
              >
                Verified Travelers
              </h3>
              <p
                style={{
                  fontSize: '0.925rem',
                  color: 'rgba(255, 255, 255, 0.88)',
                  lineHeight: 1.55,
                  textShadow: '0 1px 3px rgba(0,0,0,0.25)'
                }}
              >
                Strict identity and phone verification protocols ensure you travel with authentic, trustworthy people.
              </p>
            </div>

            {/* Card 2 (FEATURED / ACTIVE): Smart Trip Discovery with Neon Blue Border */}
            <div
              className="step-glass-card-featured"
              style={{
                padding: '2.2rem 2rem',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #818CF8 0%, #4F46E5 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 0 25px rgba(129, 140, 248, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.75)',
                  marginBottom: '1.25rem'
                }}
              >
                <Compass size={26} strokeWidth={2.4} />
              </div>
              <h3
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '0.65rem',
                  textShadow: '0 2px 8px rgba(0,0,0,0.35)'
                }}
              >
                Smart Trip Discovery
              </h3>
              <p
                style={{
                  fontSize: '0.925rem',
                  color: 'rgba(255, 255, 255, 0.92)',
                  lineHeight: 1.55,
                  textShadow: '0 1px 3px rgba(0,0,0,0.25)'
                }}
              >
                Intelligent matchmaking algorithms pair you with buddies based on pace, interests, and destination goals.
              </p>
            </div>

            {/* Card 3: Safe Community */}
            <div
              className="step-glass-card"
              style={{
                padding: '2.2rem 2rem',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #34D399 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 0 20px rgba(52, 211, 153, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.65)',
                  marginBottom: '1.25rem'
                }}
              >
                <ShieldCheck size={26} strokeWidth={2.4} />
              </div>
              <h3
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '0.65rem',
                  textShadow: '0 2px 8px rgba(0,0,0,0.35)'
                }}
              >
                Safe Community
              </h3>
              <p
                style={{
                  fontSize: '0.925rem',
                  color: 'rgba(255, 255, 255, 0.88)',
                  lineHeight: 1.55,
                  textShadow: '0 1px 3px rgba(0,0,0,0.25)'
                }}
              >
                Zero-tolerance community guidelines, emergency SOS beacons, and transparent traveler review histories.
              </p>
            </div>

            {/* Card 4: Instant Joining */}
            <div
              className="step-glass-card"
              style={{
                padding: '2.2rem 2rem',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 0 20px rgba(251, 191, 36, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.65)',
                  marginBottom: '1.25rem'
                }}
              >
                <Zap size={26} strokeWidth={2.4} fill="#FFFFFF" />
              </div>
              <h3
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '0.65rem',
                  textShadow: '0 2px 8px rgba(0,0,0,0.35)'
                }}
              >
                Instant Joining
              </h3>
              <p
                style={{
                  fontSize: '0.925rem',
                  color: 'rgba(255, 255, 255, 0.88)',
                  lineHeight: 1.55,
                  textShadow: '0 1px 3px rgba(0,0,0,0.25)'
                }}
              >
                Skip tedious back-and-forth approval loops; join pre-confirmed itineraries with one single tap.
              </p>
            </div>

            {/* Card 5: Group Adventures */}
            <div
              className="step-glass-card"
              style={{
                padding: '2.2rem 2rem',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 0 20px rgba(167, 139, 250, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.65)',
                  marginBottom: '1.25rem'
                }}
              >
                <Users size={26} strokeWidth={2.4} />
              </div>
              <h3
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '0.65rem',
                  textShadow: '0 2px 8px rgba(0,0,0,0.35)'
                }}
              >
                Group Adventures
              </h3>
              <p
                style={{
                  fontSize: '0.925rem',
                  color: 'rgba(255, 255, 255, 0.88)',
                  lineHeight: 1.55,
                  textShadow: '0 1px 3px rgba(0,0,0,0.25)'
                }}
              >
                From road trips across Ladakh to backpacking Southeast Asia, experience destinations better together.
              </p>
            </div>

            {/* Card 6: Budget Friendly */}
            <div
              className="step-glass-card"
              style={{
                padding: '2.2rem 2rem',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #F472B6 0%, #DB2777 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 0 20px rgba(244, 114, 182, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.65)',
                  marginBottom: '1.25rem'
                }}
              >
                <Wallet size={26} strokeWidth={2.4} />
              </div>
              <h3
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '0.65rem',
                  textShadow: '0 2px 8px rgba(0,0,0,0.35)'
                }}
              >
                Budget Friendly
              </h3>
              <p
                style={{
                  fontSize: '0.925rem',
                  color: 'rgba(255, 255, 255, 0.88)',
                  lineHeight: 1.55,
                  textShadow: '0 1px 3px rgba(0,0,0,0.25)'
                }}
              >
                Split cab fares, villa stays, and group gear rentals to save up to 45% compared to solo excursions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
