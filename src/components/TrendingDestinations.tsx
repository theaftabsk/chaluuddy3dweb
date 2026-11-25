import React from 'react';
import { ArrowUpRight, Users, Sparkles, MapPin } from 'lucide-react';

interface DestinationCard {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  activeBuddies: number;
  tag: string;
}

const DESTINATIONS: DestinationCard[] = [
  {
    id: 'goa',
    name: 'Goa',
    tagline: 'Beach & Nightlife',
    description: 'Golden sandy shores, vibrant coastal sunsets, lively beach clubs, and serene Portuguese heritage.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    activeBuddies: 42,
    tag: 'Coastal Paradise'
  },
  {
    id: 'manali',
    name: 'Manali',
    tagline: 'Mountain Adventure',
    description: 'Snow-capped Himalayan peaks, thrilling high-altitude passes, pine valley trails, and riverside stays.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    activeBuddies: 56,
    tag: 'High Altitude Trek'
  },
  {
    id: 'bali',
    name: 'Bali',
    tagline: 'Tropical Escape',
    description: 'Lush green terraced rice fields, spiritual cliff temples, surfing reef breaks, and holistic wellness retreats.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    activeBuddies: 78,
    tag: 'Island Vibes'
  },
  {
    id: 'dubai',
    name: 'Dubai',
    tagline: 'Luxury Experience',
    description: 'Iconic futuristic architecture, thrilling red desert safaris, world-class dining, and marina yachting.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    activeBuddies: 34,
    tag: 'Urban Oasis'
  }
];

export const TrendingDestinations: React.FC = () => {
  return (
    <section id="destinations" className="section-wrapper" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <MapPin size={14} />
            <span>POPULAR GETAWAYS</span>
          </div>
          <h2 className="section-title">Explore Trending Destinations</h2>
          <p className="section-subtitle">
            Discover amazing places and find your next travel adventure with certified buddies.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '2rem'
          }}
        >
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="dest-card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Image Container with zoom on hover */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '240px',
                  overflow: 'hidden',
                  backgroundColor: '#E2E8F0'
                }}
              >
                <img
                  src={dest.image}
                  alt={`${dest.name} - ${dest.tagline}`}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="dest-img"
                />

                {/* Tag Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.35rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                >
                  <Sparkles size={13} />
                  <span>{dest.tag}</span>
                </div>

                {/* Buddies Count Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Users size={13} />
                  <span>{dest.activeBuddies} Buddies</span>
                </div>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1
                }}
              >
                <div style={{ marginBottom: '0.75rem' }}>
                  <h3
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      marginBottom: '0.2rem'
                    }}
                  >
                    {dest.name}
                  </h3>
                  <div
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'var(--primary)'
                    }}
                  >
                    {dest.tagline}
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '0.925rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    marginBottom: '1.5rem',
                    flexGrow: 1
                  }}
                >
                  {dest.description}
                </p>

                {/* Explore Button */}
                <a
                  href="#search"
                  className="btn-secondary"
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1.25rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <span>Explore Trips</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .dest-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.15), 0 0 0 1px rgba(191, 219, 254, 0.8) !important;
        }
        .dest-card:hover .dest-img {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
};
