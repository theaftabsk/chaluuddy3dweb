import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn } from 'lucide-react';

export const AnnouncementNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Explore', href: '#home' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Global', href: '#global' }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: '1.25rem',
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 1.25rem',
        pointerEvents: 'none',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Floating Rounded Liquid Glass Pill Dock */}
      <nav
        style={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: '1220px',
          height: '4.2rem',
          borderRadius: '9999px',
          backgroundColor: isScrolled
            ? 'rgba(15, 23, 42, 0.45)'
            : 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(30px) saturate(200%)',
          WebkitBackdropFilter: 'blur(30px) saturate(200%)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          boxShadow: isScrolled
            ? '0 20px 45px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4)'
            : '0 15px 40px rgba(0, 0, 0, 0.22), inset 0 1px 1px rgba(255, 255, 255, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.75rem',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Chalobuddy Logo Icon + Simple Bold White Font */}
        <a
          href="#home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            textDecoration: 'none'
          }}
        >
          <img
            src="/chalobuddy-icon.png"
            alt="Chalobuddy Icon"
            style={{
              height: '34px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35))'
            }}
          />
          <span
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-heading)',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
            }}
          >
            Chalobuddy
          </span>
        </a>

        {/* Center Navigation Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.95)',
                transition: 'color 0.2s ease, transform 0.2s ease',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.35)',
                letterSpacing: '0.01em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#93C5FD';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
          }}
          className="desktop-actions"
        >
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: '#FFFFFF',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.35)',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#93C5FD')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          >
            <LogIn size={16} />
            <span>Log In</span>
          </button>

          {/* Clean Solid White Pill Join Free Button */}
          <a
            href="#join"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.6rem 1.6rem',
              backgroundColor: '#FFFFFF',
              color: '#0F172A',
              fontWeight: 700,
              fontSize: '0.925rem',
              borderRadius: '9999px',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.2)';
            }}
          >
            <span>Join Free</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-toggle"
          aria-label="Toggle menu"
          style={{
            padding: '0.5rem',
            color: '#FFFFFF',
            display: 'none',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Liquid Glass Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '4.8rem',
            width: 'calc(100% - 2.5rem)',
            maxWidth: '1220px',
            backgroundColor: 'rgba(15, 23, 42, 0.94)',
            backdropFilter: 'blur(32px) saturate(200%)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '24px',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
            pointerEvents: 'auto'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#FFFFFF',
                padding: '0.5rem 0'
              }}
            >
              {link.name}
            </a>
          ))}
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              paddingTop: '1.25rem',
              display: 'flex',
              gap: '0.75rem',
              flexDirection: 'column'
            }}
          >
            <button
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontWeight: 600
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogIn size={18} />
              <span>Log In</span>
            </button>
            <a
              href="#join"
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                color: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontWeight: 700
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Join Free</span>
            </a>
          </div>
        </div>
      )}

      {/* Responsive Inline CSS for Navbar */}
      <style>{`
        @media (max-width: 868px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
