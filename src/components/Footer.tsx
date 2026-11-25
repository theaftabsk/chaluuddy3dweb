import React from 'react';
import { Compass, Building2, Headphones, ChevronRight, Globe, Share2, Heart, Mail, ShieldCheck, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: '#F8FAFC',
        color: '#334155',
        overflow: 'hidden'
      }}
    >
      {/* Upper Main Footer Body with subtle light blue gradient */}
      <div
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 60%, #EFF6FF 100%)',
          paddingTop: '4.5rem',
          paddingBottom: '2.5rem'
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.5rem'
          }}
        >
          {/* Main 5-Column / Responsive Layout */}
          <div
            className="footer-main-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(260px, 1.4fr) repeat(3, minmax(130px, 1fr)) minmax(200px, 1.2fr)',
              gap: '2.25rem',
              alignItems: 'start'
            }}
          >
            {/* Column 1: Brand Info */}
            <div className="footer-brand-col">
              <a
                href="#home"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  textDecoration: 'none',
                  marginBottom: '1.25rem'
                }}
              >
                <img
                  src="/chalobuddy-icon.png"
                  alt="Chalobuddy Logo"
                  style={{
                    height: '42px',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
                <span
                  style={{
                    fontSize: '1.65rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    letterSpacing: '-0.02em',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  Chalobuddy
                </span>
              </a>

              <p
                style={{
                  fontSize: '0.925rem',
                  color: '#64748B',
                  lineHeight: 1.6,
                  maxWidth: '300px',
                  marginBottom: '1.75rem'
                }}
              >
                Chalobuddy is a global community platform connecting travelers, backpackers, and adventure seekers worldwide.
              </p>

              {/* 4 Soft Rounded-Square Social Icons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { label: 'Global', icon: Globe },
                  { label: 'Share', icon: Share2 },
                  { label: 'Community', icon: Heart },
                  { label: 'Contact', icon: Mail }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      title={item.label}
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '12px',
                        backgroundColor: '#EFF6FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#2563EB',
                        border: '1px solid rgba(219, 234, 254, 0.9)',
                        boxShadow: '0 2px 6px rgba(37, 99, 235, 0.06)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#2563EB';
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 14px rgba(37, 99, 235, 0.25)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#EFF6FF';
                        e.currentTarget.style.color = '#2563EB';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 6px rgba(37, 99, 235, 0.06)';
                      }}
                    >
                      <Icon size={17} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Explore */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.35rem'
                }}
              >
                <div
                  style={{
                    width: '1.85rem',
                    height: '1.85rem',
                    borderRadius: '8px',
                    backgroundColor: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563EB'
                  }}
                >
                  <Compass size={15} />
                </div>
                <h4
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#0F172A',
                    letterSpacing: '-0.01em'
                  }}
                >
                  Explore
                </h4>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  { name: 'How It Works', href: '#how-it-works' },
                  { name: 'Why Choose Us', href: '#why-us' },
                  { name: 'Global Explore', href: '#global' }
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.925rem',
                        color: '#475569',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        paddingRight: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#2563EB';
                        e.currentTarget.style.transform = 'translateX(2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#475569';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <span>{item.name}</span>
                      <ChevronRight size={14} color="#94A3B8" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.35rem'
                }}
              >
                <div
                  style={{
                    width: '1.85rem',
                    height: '1.85rem',
                    borderRadius: '8px',
                    backgroundColor: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563EB'
                  }}
                >
                  <Building2 size={15} />
                </div>
                <h4
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#0F172A',
                    letterSpacing: '-0.01em'
                  }}
                >
                  Company
                </h4>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  { name: 'About Us', href: '#home' },
                  { name: 'Careers', href: '#home' },
                  { name: 'Contact Us', href: '#home' }
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.925rem',
                        color: '#475569',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        paddingRight: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#2563EB';
                        e.currentTarget.style.transform = 'translateX(2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#475569';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <span>{item.name}</span>
                      <ChevronRight size={14} color="#94A3B8" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Support */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.35rem'
                }}
              >
                <div
                  style={{
                    width: '1.85rem',
                    height: '1.85rem',
                    borderRadius: '8px',
                    backgroundColor: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563EB'
                  }}
                >
                  <Headphones size={15} />
                </div>
                <h4
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#0F172A',
                    letterSpacing: '-0.01em'
                  }}
                >
                  Support
                </h4>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  { name: 'Help Center', href: '#home' },
                  { name: 'Privacy Policy', href: '#home' },
                  { name: 'Terms & Conditions', href: '#home' },
                  { name: 'Delete Data', href: '#home' }
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.925rem',
                        color: '#475569',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        paddingRight: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#2563EB';
                        e.currentTarget.style.transform = 'translateX(2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#475569';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <span>{item.name}</span>
                      <ChevronRight size={14} color="#94A3B8" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: 3D Illustration */}
            <div
              className="footer-3d-col"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src="/footer-travel-3d.png"
                alt="3D Travel Globe & Backpack"
                style={{
                  maxWidth: '100%',
                  width: '230px',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 15px 25px rgba(37, 99, 235, 0.15))',
                  transition: 'transform 0.4s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.04) rotate(1deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          Bottom Wavy Royal Blue Bar with SVG Waves
         ========================================================================= */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        {/* Organic Curved SVG Wave */}
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: 'block',
            width: '100%',
            height: '42px',
            background: 'transparent'
          }}
        >
          {/* Subtle lighter wave layer */}
          <path
            d="M0 32C240 12 480 48 720 28C960 8 1200 44 1440 24V64H0V32Z"
            fill="rgba(59, 130, 246, 0.35)"
          />
          {/* Main solid vibrant blue wave */}
          <path
            d="M0 42C240 22 480 54 720 34C960 16 1200 50 1440 32V64H0V42Z"
            fill="#1E40AF"
          />
        </svg>

        {/* Content of Bottom Bar */}
        <div
          style={{
            backgroundColor: '#1E40AF',
            padding: '1rem 1.5rem 1.75rem 1.5rem'
          }}
        >
          <div
            className="container footer-bottom-bar"
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              fontSize: '0.88rem',
              color: '#FFFFFF'
            }}
          >
            {/* Copyright */}
            <div style={{ opacity: 0.95, fontWeight: 500 }}>
              &copy; 2026 Chalobuddy. All rights reserved.
            </div>

            {/* Certifications */}
            <div
              className="footer-cert-badges"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                opacity: 0.95,
                fontWeight: 500,
                flexWrap: 'wrap'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <ShieldCheck size={16} color="#93C5FD" />
                <span>Global Traveler Trust Certified</span>
              </div>
              <span className="footer-cert-divider" style={{ opacity: 0.45 }}>|</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Lock size={15} color="#93C5FD" />
                <span>256-bit Encrypted Safety</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 968px) {
          .footer-main-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2.5rem !important;
          }
          .footer-brand-col {
            grid-column: span 2 !important;
          }
          .footer-3d-col {
            grid-column: span 2 !important;
            justify-content: center !important;
          }
        }
        @media (max-width: 580px) {
          .footer-main-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .footer-brand-col {
            grid-column: span 1 !important;
          }
          .footer-3d-col {
            grid-column: span 1 !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            text-align: center !important;
            gap: 0.85rem !important;
            justify-content: center !important;
          }
          .footer-cert-badges {
            justify-content: center !important;
            gap: 0.75rem !important;
          }
          .footer-cert-divider {
            display: none !important;
          }
        }
      `}</style>
    </footer>
  );
};
