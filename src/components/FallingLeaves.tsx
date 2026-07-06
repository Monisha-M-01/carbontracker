import React, { useEffect, useState } from 'react';

type LeafType = 'maple' | 'birch' | 'fern' | 'oak';

interface LeafParticle {
  id: number;
  left: number; // percentage
  duration: number; // seconds
  delay: number; // seconds
  type: LeafType;
  color: string;
  size: number; // px
}

const LeafSVG: React.FC<{ type: LeafType; color: string; size: number }> = ({ type, color, size }) => {
  // SVG paths with light fill opacity and distinct line art strokes for a high-end vector look.
  if (type === 'maple') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} fill="currentColor" stroke="currentColor" strokeWidth="1.2" opacity="0.88">
        <path d="M12 2.5C12.5 4 14.5 5 15.5 5.5C16.5 6 18.5 5.5 19 6.5C19.5 7.5 18 9 18.5 10C19 11 20.5 11.5 20.5 13C20.5 14.5 18.5 15 18 16.5C17.5 18 18 19.5 16.5 20C15 20.5 14 18.5 12 18.5C10 18.5 9 20.5 7.5 20C6 19.5 6.5 18 6 16.5C5.5 15 3.5 14.5 3.5 13C3.5 11.5 5 11 5.5 10C6 9 4.5 7.5 5 6.5C5.5 5.5 7.5 6 8.5 5.5C9.5 5 11.5 4 12 2.5Z" />
        <path d="M12 18.5V22" strokeWidth="1.8" />
      </svg>
    );
  }
  if (type === 'birch') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} fill="currentColor" stroke="currentColor" strokeWidth="1.2" opacity="0.9">
        <path d="M12 3C8 8 5 12 5 15C5 18.87 8.13 22 12 22C15.87 22 19 18.87 19 15C19 12 16 8 12 3Z" />
        <path d="M12 3V22" strokeWidth="1.8" />
      </svg>
    );
  }
  if (type === 'fern') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} fill="currentColor" stroke="currentColor" strokeWidth="1.2" opacity="0.88">
        <path d="M12 2V22" strokeWidth="1.8" />
        <path d="M12 5C14.5 6 16.5 5 16.5 5C16.5 5 15 7.5 12 8" />
        <path d="M12 5C9.5 6 7.5 5 7.5 5C7.5 5 9 7.5 12 8" />
        <path d="M12 9C15 10.5 17 9.5 17 9.5C17 9.5 15.5 12 12 12.5" />
        <path d="M12 9C9 10.5 7 9.5 7 9.5C7 9.5 8.5 12 12 12.5" />
        <path d="M12 14C15.5 15.5 17.5 14.5 17.5 14.5C17.5 14.5 16 17 12 17.5" />
        <path d="M12 14C8.5 15.5 6.5 14.5 6.5 14.5C6.5 14.5 8 17 12 17.5" />
      </svg>
    );
  }
  // Oak
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color }} fill="currentColor" stroke="currentColor" strokeWidth="1.2" opacity="0.9">
      <path d="M12 2C12 2 4 7 4 14C4 18.42 7.58 22 12 22C16.42 22 20 18.42 20 14C20 7 12 2 12 2Z" />
      <path d="M12 2V22" strokeWidth="1.8" />
      <path d="M12 8L7 11" />
      <path d="M12 12L17 9" />
      <path d="M12 14L8 17" />
      <path d="M12 17L16 15" />
    </svg>
  );
};

export const FallingLeaves: React.FC = () => {
  const [leaves, setLeaves] = useState<LeafParticle[]>([]);

  useEffect(() => {
    const types: LeafType[] = ['maple', 'birch', 'fern', 'oak'];
    // Palette curated to match primary, secondary, danger, and accent themes
    const colors = [
      'rgba(16, 185, 129, 0.78)',  // Emerald Green
      'rgba(6, 182, 212, 0.78)',   // Cyan/Teal
      'rgba(245, 158, 11, 0.78)',   // Amber/Gold
      'rgba(239, 68, 68, 0.78)',    // Coral/Rose
    ];
    const generated: LeafParticle[] = [];
    
    // Reduce particle count on mobile for performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 15 : 40;
    
    // Spawn high-fidelity particles across the screen
    for (let i = 0; i < particleCount; i++) {
      generated.push({
        id: i,
        left: Math.random() * 95,
        duration: 10 + Math.random() * 14, // slightly faster for responsiveness
        delay: Math.random() * 20 * -1,    // staggered start
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 16 + Math.random() * 22,     // larger range for SVG crispness
      });
    }
    
    setLeaves(generated);
  }, []);

  return (
    <>
      {/* Background Visual Atmosphere (Dynamic glowing orbs) */}
      <div className="ambient-glow-container">
        <div className="ambient-glow-orb ambient-glow-orb-1" />
        <div className="ambient-glow-orb ambient-glow-orb-2" />
        <div className="ambient-glow-orb ambient-glow-orb-3" />
      </div>

      {/* Tech-organic Dotted Grid overlay */}
      <div className="bg-dot-grid" />

      {/* Falling Leaves vector layer */}
      <div className="falling-leaves-container">
        {leaves.map((leaf) => (
          <span
            key={leaf.id}
            className="leaf-particle"
            style={{
              left: `${leaf.left}%`,
              animationDuration: `${leaf.duration}s`,
              animationDelay: `${leaf.delay}s`,
            }}
          >
            <LeafSVG type={leaf.type} color={leaf.color} size={leaf.size} />
          </span>
        ))}
      </div>
    </>
  );
};
