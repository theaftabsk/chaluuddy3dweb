import React from 'react';
import { Users, UserPlus, Compass, ArrowRight } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  return (
    <section
      id="join"
      style={{
        position: 'relative',
        minHeight: '760px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#FFFFFF',
        padding: '9rem 1.5rem 8rem 1.5rem',
        backgroundImage: "url('/cta-adventure-bg.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center bottom',
        backgroundSize: 'cover'
      }}
    >
      {/* Subtle top gradient overlay to blend smoothly from the dark 3D Earth section */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '140px',
          background: 'linear-gradient(to bottom, #070D1B 0%, rgba(7, 13, 27, 0.6) 40%, rgba(7, 13, 27, 0) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Main Content Box */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '820px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Top Pill Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            padding: '0.45rem 1.35rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderRadius: '9999px',
            color: '#FFFFFF',
            fontSize: '0.84rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            border: '1px solid rgba(255, 255, 255, 0.42)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
            marginBottom: '1.75rem'
          }}
        >
          <Users size={16} color="#FFFFFF" />
          <span>JOIN OVER 100,000+ TRAVELERS</span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontSize: 'clamp(2.6rem, 5.8vw, 4.4rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.55)'
          }}
        >
          Your Next Adventure <br />
          <span
            style={{
              color: '#38BDF8',
              display: 'inline-block',
              position: 'relative',
              marginTop: '0.2rem'
            }}
          >
            Is Waiting.
            {/* Curved Accent Stroke under Waiting */}
            <svg
              style={{
                position: 'absolute',
                bottom: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '185px',
                height: '14px',
                pointerEvents: 'none'
              }}
              viewBox="0 0 185 14"
              fill="none"
            >
              <path
                d="M 6 8 Q 50 14, 95 8 Q 140 2, 179 8"
                stroke="#38BDF8"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.95"
              />
            </svg>
          </span>
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.94)',
            lineHeight: 1.55,
            maxWidth: '620px',
            margin: '0 auto 2.5rem auto',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.65)'
          }}
        >
          Don’t just travel. Create stories, meet people, and explore the world together.
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap'
          }}
        >
          {/* Primary Button: Join Chalobuddy Free */}
          <a
            href="#join"
            className="cta-primary-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.95rem 2.2rem',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #0284C7 0%, #2563EB 100%)',
              borderRadius: '9999px',
              border: '1px solid rgba(56, 189, 248, 0.85)',
              boxShadow: '0 0 30px rgba(56, 189, 248, 0.6), 0 8px 24px rgba(2, 132, 199, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.5)',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            <UserPlus size={19} />
            <span>Join Chalobuddy Free</span>
            <ArrowRight size={18} />
          </a>

          {/* Secondary Button: Explore Global */}
          <a
            href="#global"
            className="cta-secondary-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.95rem 2.2rem',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#FFFFFF',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.45)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.35)',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            <Compass size={19} />
            <span>Explore Global</span>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .cta-primary-btn, .cta-secondary-btn {
            width: 100% !important;
            justify-content: center !important;
            padding: 0.85rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
