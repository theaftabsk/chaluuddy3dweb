import React from 'react';
import { UserCheck, Compass, ShieldCheck, Zap, Users, Wallet } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: UserCheck,
      title: 'Verified Travelers',
      description: 'Strict identity and phone verification protocols ensure you travel with authentic, trustworthy people.'
    },
    {
      icon: Compass,
      title: 'Smart Trip Discovery',
      description: 'Intelligent matchmaking algorithms pair you with buddies based on pace, interests, and destination goals.'
    },
    {
      icon: ShieldCheck,
      title: 'Safe Community',
      description: 'Zero-tolerance community guidelines, emergency SOS beacons, and transparent traveler review histories.'
    },
    {
      icon: Zap,
      title: 'Instant Joining',
      description: 'Skip tedious back-and-forth approval loops; join pre-confirmed itineraries with one single tap.'
    },
    {
      icon: Users,
      title: 'Group Adventures',
      description: 'From road trips across Ladakh to backpacking Southeast Asia, experience destinations better together.'
    },
    {
      icon: Wallet,
      title: 'Budget Friendly',
      description: 'Split cab fares, villa stays, and group gear rentals to save up to 45% compared to solo excursions.'
    }
  ];

  return (
    <section id="why-us" className="section-wrapper" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span>THE CHALOBUDDY ADVANTAGE</span>
          </div>
          <h2 className="section-title">More Than a Travel Platform.</h2>
          <p className="section-subtitle">
            Everything you need for a safe, fun and memorable journey from start to finish.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="why-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2.25rem 2rem',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}
              >
                <div
                  style={{
                    width: '3.25rem',
                    height: '3.25rem',
                    borderRadius: '1rem',
                    backgroundColor: 'var(--bg-blue-soft)',
                    border: '1px solid var(--border-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)'
                  }}
                  className="why-icon"
                >
                  <Icon size={24} strokeWidth={2.2} />
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {feat.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6
                    }}
                  >
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .why-card:hover {
          transform: translateY(-6px);
          border-color: var(--border-blue) !important;
          box-shadow: 0 20px 35px -10px rgba(37, 99, 235, 0.12) !important;
        }
        .why-card:hover .why-icon {
          background-color: var(--primary) !important;
          color: #FFFFFF !important;
          transform: scale(1.08);
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
};
