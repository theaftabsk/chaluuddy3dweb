import React from 'react';
import { Compass, Users, Plane, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Discover Trips',
      description: 'Explore trips based on your destination, interests and budget.',
      icon: Compass,
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      highlights: ['Custom budget filter', 'Verified trip dates', 'Multiple travel styles']
    },
    {
      step: '02',
      title: 'Find Your Buddy',
      description: 'Connect with verified travelers who share your interests.',
      icon: Users,
      gradient: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
      highlights: ['Government ID verified', 'Shared travel vibes', 'In-app chat & video']
    },
    {
      step: '03',
      title: 'Start Your Journey',
      description: 'Join a trip and create unforgettable travel memories.',
      icon: Plane,
      gradient: 'linear-gradient(135deg, #2563EB 0%, #4338CA 100%)',
      highlights: ['Instant itinerary sync', 'Group expense sharing', '24/7 safety concierge']
    }
  ];

  return (
    <section id="how-it-works" className="section-wrapper" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span>EASY ONBOARDING</span>
          </div>
          <h2 className="section-title">Your Journey Starts With Three Simple Steps</h2>
          <p className="section-subtitle">
            Chalobuddy connects you with vetted co-travelers so you never have to put your travel bucket list on hold.
          </p>
        </div>

        {/* 3 Steps Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            position: 'relative'
          }}
        >
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="step-card"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2.5rem 2rem',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.35s ease'
                }}
              >
                {/* Step Number Watermark */}
                <span
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1.5rem',
                    fontSize: '4.5rem',
                    fontWeight: 900,
                    color: 'rgba(37, 99, 235, 0.06)',
                    lineHeight: 1,
                    pointerEvents: 'none'
                  }}
                >
                  {item.step}
                </span>

                {/* 3D Icon Badge */}
                <div
                  style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '1.25rem',
                    background: item.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)',
                    marginBottom: '1.75rem'
                  }}
                >
                  <Icon size={28} strokeWidth={2.2} />
                </div>

                <div
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    letterSpacing: '0.05em',
                    marginBottom: '0.35rem'
                  }}
                >
                  STEP {item.step}
                </div>

                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem'
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.975rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1.75rem'
                  }}
                >
                  {item.description}
                </p>

                {/* Checkpoint Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
                  {item.highlights.map((point) => (
                    <div key={point} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      <CheckCircle2 size={16} color="var(--primary)" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .step-card:hover {
          transform: translateY(-8px);
          background-color: #FFFFFF !important;
          border-color: var(--border-blue) !important;
          box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.12) !important;
        }
      `}</style>
    </section>
  );
};
