import React, { useState } from 'react';
import { Leaf, Globe } from 'lucide-react';

interface IntroModalProps {
  onComplete: (pledgeId: string, bonusXp: number) => void;
}

const ECO_FACTS = [
  "The Great Basin bristlecone pines, the oldest trees on Earth, have been absorbing carbon dioxide for over 4,800 years.",
  "More than 70% of Earth's oxygen is produced by marine organisms like phytoplankton, not terrestrial rainforests.",
  "If food waste were a country, it would be the third-largest greenhouse gas emitter in the world, behind only the US and China.",
  "The internet's digital footprint accounts for 3.7% of global greenhouse emissions—equivalent to the entire global aviation industry.",
  "Sphagnum peatlands cover only 3% of Earth's land area, but store twice as much carbon as all the world's forests combined.",
  "Fungi form vast subterranean networks (mycorrhizae) that allow trees to share carbon, nutrients, and warn each other of pests.",
  "A single mature tree absorbs about 22kg of carbon dioxide per year, providing fresh oxygen for two human beings.",
  "Just 10% of a tree's canopy can intercept up to 10,000 gallons of rainfall per year, preventing toxic urban stormwater runoff."
];

export const IntroModal: React.FC<IntroModalProps> = ({ onComplete }) => {
  const [isCinematic, setIsCinematic] = useState(false);
  const [randomFact, setRandomFact] = useState('');

  const handleFinish = () => {
    const fact = ECO_FACTS[Math.floor(Math.random() * ECO_FACTS.length)];
    setRandomFact(fact);
    setIsCinematic(true);

    setTimeout(() => {
      onComplete('start', 50);
    }, 4500); // 4.5 seconds of cinematic transition
  };

  if (isCinematic) {
    return (
      <div className="cinematic-backdrop">
        {/* Floating particles background */}
        <div className="cinematic-particles">
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
        </div>
        
        <div className="cinematic-container">
          <div className="cinematic-globe-wrapper">
            <div className="cinematic-pulse-ring" />
            <Globe size={56} className="cinematic-globe" color="var(--primary-light)" />
          </div>
          
          <div className="cinematic-fact-box">
            <span className="cinematic-subtitle">synchronizing biosphere...</span>
            <h2 className="cinematic-title">Did You Know?</h2>
            <p className="cinematic-text">"{randomFact}"</p>
          </div>
          
          {/* Animated Progress bar */}
          <div className="cinematic-progress-bar">
            <div className="cinematic-progress-fill" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="nature-modal-backdrop">
      <div className="nature-modal-container">
        
        {/* Nature Theme Spinning Backdrop (Backside Art) */}
        <div className="nature-backside-art">
          <div className="nature-spin-ring">
            <Leaf 
              size={24} 
              color="var(--primary)" 
              style={{ position: 'absolute', top: '10px', transform: 'rotate(45deg)' }} 
            />
            <Leaf 
              size={20} 
              color="var(--secondary)" 
              style={{ position: 'absolute', bottom: '20px', left: '40px', transform: 'rotate(210deg)' }} 
            />
            <Leaf 
              size={18} 
              color="var(--primary-light)" 
              style={{ position: 'absolute', right: '30px', top: '120px', transform: 'rotate(120deg)' }} 
            />
          </div>
        </div>

        <div className="animate-fade-in" style={{ position: 'relative', zIndex: 1 }}>
          {/* Heartbeat pulse element */}
          <div 
            className="heartbeat-pulse"
            onClick={handleFinish}
            title="Click to start rebuilding"
          >
            <Globe size={42} color="var(--primary-light)" style={{ filter: 'drop-shadow(0 0 8px rgba(52, 211, 153, 0.5))' }} />
          </div>

          <h1 
            style={{ 
              fontSize: '2.8rem', 
              fontFamily: 'var(--font-display)', 
              fontWeight: '800', 
              marginBottom: '1rem',
              lineHeight: '1.1' 
            }}
          >
            Let's <span className="gradient-text">Rebuild</span> Again
          </h1>

          <p 
            style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1rem', 
              lineHeight: '1.6', 
              maxWidth: '480px',
              margin: '0 auto 2.5rem' 
            }}
          >
            Restore balance to our biosphere. Commit to daily micro-actions, track your carbon footprint in real time, and grow your virtual forest.
          </p>

          <button 
            onClick={handleFinish} 
            className="btn-primary" 
            style={{ 
              padding: '0.9rem 2.5rem', 
              fontSize: '1.05rem', 
              borderRadius: 'var(--radius-lg)' 
            }}
          >
            Begin Journey
          </button>
        </div>
      </div>
    </div>
  );
};
