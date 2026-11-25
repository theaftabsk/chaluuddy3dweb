import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, UserCheck, Zap, Compass, MapPin, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 40;
const FOLDER_PATH = '/Travel_animation_video_generatio_4320da43-ezgif-split';

export const HeroCinematic: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Store preloaded images in a ref
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // 0. Scroll progress state tracking
    const scrollObj = { frameProgress: 0 };

    // 1. Efficient Image Preloading in numerical order
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const frameNumber = String(i).padStart(3, '0');
      const img = new Image();
      img.src = `${FOLDER_PATH}/ezgif-frame-${frameNumber}.jpg`;
      img.onload = () => {
        count++;
        if (count === 1) {
          // Draw frame 1 immediately to prevent blank flash
          drawFrame(0);
        }
        if (count === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    // Canvas render function with responsive object-cover and sub-frame interpolation
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

      // Cover math
      const scaleA = Math.max(w / imgA.naturalWidth, h / imgA.naturalHeight);
      const drawWA = imgA.naturalWidth * scaleA;
      const drawHA = imgA.naturalHeight * scaleA;
      const drawXA = (w - drawWA) / 2;
      const drawYA = (h - drawHA) / 2;

      ctx.drawImage(imgA, drawXA, drawYA, drawWA, drawHA);

      // Smooth cross-dissolve with smoothstep easing
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

      // Add soft cinematic ambient gradient overlay for UI contrast
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.45)');
      gradient.addColorStop(0.4, 'rgba(15, 23, 42, 0.2)');
      gradient.addColorStop(0.85, 'rgba(15, 23, 42, 0.65)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }

    // Resize canvas with DPR
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

    // GSAP ScrollTrigger Sequence scrub animation
    const ctxTimeline = gsap.context(() => {
      // Pin hero and scrub sequence through scroll
      gsap.to(scrollObj, {
        frameProgress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 0.6,
          onUpdate: () => {
            drawFrame(scrollObj.frameProgress);
          }
        }
      });

      // Subtle parallax on hero text and badges
      if (heroContentRef.current) {
        gsap.to(heroContentRef.current, {
          y: -40,
          opacity: 0.92,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=120%',
            scrub: true
          }
        });
      }

      // Floating badges gentle animation
      if (badgesRef.current) {
        gsap.to('.hero-badge-1', {
          y: -18,
          x: 6,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
        gsap.to('.hero-badge-2', {
          y: 15,
          x: -8,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.5
        });
      }
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Background Cinematic Canvas */}
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

      {/* Floating Destination Badges */}
      <div ref={badgesRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
        {/* Badge 1: Top Right */}
        <div
          className="hero-badge-1 desktop-badge"
          style={{
            position: 'absolute',
            top: '22%',
            right: '8%',
            backgroundColor: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(16px)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1.25rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            pointerEvents: 'auto'
          }}
        >
          <div
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-blue-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)'
            }}
          >
            <MapPin size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>TRENDING TRIP</div>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 700 }}>
              Manali Summit • 4 Buddies
            </div>
          </div>
        </div>

        {/* Badge 2: Bottom Left */}
        <div
          className="hero-badge-2 desktop-badge"
          style={{
            position: 'absolute',
            bottom: '24%',
            left: '8%',
            backgroundColor: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(16px)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1.25rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            pointerEvents: 'auto'
          }}
        >
          <div
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              backgroundColor: '#ECFDF5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669'
            }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>INSTANT MATCH</div>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 700 }}>
              Bali Coastal Escape • 98%
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Foreground Content */}
      <div
        ref={heroContentRef}
        className="container"
        style={{
          position: 'relative',
          zIndex: 20,
          textAlign: 'center',
          maxWidth: '860px',
          padding: '0 1.5rem'
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.25rem',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(12px)',
            borderRadius: 'var(--radius-full)',
            color: 'var(--primary)',
            fontSize: '0.9rem',
            fontWeight: 700,
            border: '1px solid rgba(255, 255, 255, 0.9)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            marginBottom: '1.75rem'
          }}
        >
          <Compass size={17} />
          <span>GLOBAL TRAVEL COMMUNITY</span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
            marginBottom: '1.5rem'
          }}
        >
          Find Your People.{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #93C5FD 0%, #FFFFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Explore The World.
          </span>
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
            color: 'rgba(255, 255, 255, 0.92)',
            lineHeight: 1.6,
            maxWidth: '680px',
            margin: '0 auto 2.5rem auto',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}
        >
          Discover amazing destinations, connect with like-minded travelers, and turn your travel dreams into
          unforgettable adventures.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3.5rem'
          }}
        >
          <a
            href="#how-it-works"
            className="btn-primary"
            style={{
              fontSize: '1.05rem',
              padding: '1rem 2.25rem',
              boxShadow: '0 8px 25px rgba(37, 99, 235, 0.5)'
            }}
          >
            <span>Explore Trips</span>
            <ArrowRight size={18} />
          </a>

          <a
            href="#how-it-works"
            className="btn-secondary"
            style={{
              fontSize: '1.05rem',
              padding: '1rem 2.25rem',
              backgroundColor: 'rgba(255, 255, 255, 0.92)'
            }}
          >
            <span>Start Your Journey</span>
          </a>
        </div>

        {/* Trust Indicators */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
            flexWrap: 'wrap',
            padding: '1rem 2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(16px)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
            <UserCheck size={18} color="var(--primary)" />
            <span>Verified Travelers</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
            <ShieldCheck size={18} color="#059669" />
            <span>Safe & Secure Trips</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
            <Zap size={18} color="#D97706" />
            <span>Join Instantly</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator prompt */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.35rem',
          color: 'var(--text-primary)',
          opacity: 0.85
        }}
      >
        <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Scroll To Travel
        </span>
        <ChevronDown size={18} className="bounce-scroll" />
      </div>

      <style>{`
        @keyframes bounceScroll {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .bounce-scroll {
          animation: bounceScroll 1.8s ease-in-out infinite;
        }
        @media (max-width: 900px) {
          .desktop-badge {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
