import React, { useState } from 'react';
import { MapPin, Calendar, DollarSign, Compass, Search, Sparkles } from 'lucide-react';

export const TripSearch: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('$500 - $1,500');
  const [category, setCategory] = useState('Adventure & Trekking');
  const [isSearched, setIsSearched] = useState(false);

  const categories = [
    'Adventure & Trekking',
    'Beach & Island Chill',
    'Solo Backpackers',
    'Luxury Retreat',
    'Cultural Heritage'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearched(true);
    setTimeout(() => setIsSearched(false), 3000);
  };

  return (
    <section
      id="search"
      className="section-wrapper"
      style={{
        backgroundColor: '#FFFFFF',
        position: 'relative',
        zIndex: 30,
        paddingTop: '3rem'
      }}
    >
      <div className="container">
        {/* Floating Search Container with soft shadow and rounded corners */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            boxShadow: '0 20px 45px -10px rgba(37, 99, 235, 0.1), 0 0 0 1px rgba(226, 232, 240, 0.8)',
            maxWidth: '1100px',
            margin: '0 auto',
            position: 'relative'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="section-tag">
              <Sparkles size={14} />
              <span>SMART TRIP DISCOVERY</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800 }}>
              Find Your Next Adventure
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.4rem' }}>
              Filter by destination, travel dates, budget, and travel style to meet your ideal buddies.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem',
                alignItems: 'end'
              }}
            >
              {/* Destination Input */}
              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}
                >
                  <MapPin size={16} color="var(--primary)" />
                  <span>Destination</span>
                </label>
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: 'var(--bg-secondary)',
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  }}
                />
              </div>

              {/* Travel Date */}
              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}
                >
                  <Calendar size={16} color="var(--primary)" />
                  <span>Travel Date</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: 'var(--bg-secondary)',
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  }}
                />
              </div>

              {/* Budget Range */}
              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}
                >
                  <DollarSign size={16} color="var(--primary)" />
                  <span>Budget Range</span>
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: 'var(--bg-secondary)',
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="$200 - $500">$200 - $500 (Budget Friendly)</option>
                  <option value="$500 - $1,500">$500 - $1,500 (Standard)</option>
                  <option value="$1,500 - $3,000">$1,500 - $3,000 (Premium)</option>
                  <option value="$3,000+">$3,000+ (Luxury Explorer)</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}
                >
                  <Compass size={16} color="var(--primary)" />
                  <span>Category</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: 'var(--bg-secondary)',
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    height: '52px'
                  }}
                >
                  <Search size={18} />
                  <span>Search Trips</span>
                </button>
              </div>
            </div>

            {/* Live Search Status Notification */}
            {isSearched && (
              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  color: 'var(--primary)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textAlign: 'center'
                }}
              >
                Finding trips in {destination || 'All Destinations'} under {category} ({budget})... 24 buddies active now!
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
