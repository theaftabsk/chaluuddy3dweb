import React, { Component, ErrorInfo, ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { AnnouncementNavbar } from './components/AnnouncementNavbar';
import { CinematicStoryJourney } from './components/CinematicStoryJourney';
import { GlobalExploreGlobe } from './components/GlobalExploreGlobe';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#FEF2F2', color: '#991B1B' }}>
          <h2>Something went wrong loading this section.</h2>
          <pre style={{ fontSize: '0.85rem', marginTop: '1rem' }}>{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export const App: React.FC = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="chalobuddy-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* SECTION 01: ANNOUNCEMENT BAR + NAVBAR */}
      <AnnouncementNavbar />

      <main style={{ flexGrow: 1 }}>
        {/* CONTINUOUS CINEMATIC SCROLL JOURNEY: HERO -> HOW IT WORKS -> WHY CHOOSE CHALOBUDDY */}
        <ErrorBoundary>
          <CinematicStoryJourney />
        </ErrorBoundary>

        {/* SECTION 07: GLOBAL EXPLORE (3D GLOBE & FLIGHT ROUTES) */}
        <ErrorBoundary>
          <GlobalExploreGlobe />
        </ErrorBoundary>

        {/* SECTION 08: FINAL CTA */}
        <ErrorBoundary>
          <FinalCTA />
        </ErrorBoundary>
      </main>

      {/* SECTION 09: FOOTER */}
      <Footer />
    </div>
  );
};

export default App;
