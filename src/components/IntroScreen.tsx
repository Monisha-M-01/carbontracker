import React from 'react';
import { Leaf, Globe } from 'lucide-react';

interface IntroScreenProps {
  onEnter: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  return (
    <div 
      className="glass-card animate-fade-in" 
      style={{ 
        maxWidth: '620px', 
        margin: '6rem auto', 
        textAlign: 'center', 
        padding: '3.5rem 2.5rem',
        border: '1px solid rgba(16, 185, 129, 0.15)',
        boxShadow: '0 20px 50px rgba(16, 185, 129, 0.05)'
      }}
    >
      {/* Blooming Earth Ring */}
      <div className="blooming-ring">
        <div className="blooming-inner-circle">
          <Globe size={42} color="var(--primary)" style={{ filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.4))' }} />
        </div>
        
        {/* Floating Leaf Ornaments inside the ring */}
        <Leaf 
          size={18} 
          color="var(--primary-light)" 
          style={{ position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)' }} 
        />
        <Leaf 
          size={18} 
          color="var(--primary-light)" 
          style={{ position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%) rotate(180deg)' }} 
        />
      </div>

      {/* Slogan */}
      <h1 
        style={{ 
          fontSize: '2.5rem', 
          fontFamily: 'var(--font-display)', 
          fontWeight: '800', 
          marginBottom: '1rem',
          lineHeight: '1.1',
          animation: 'textReveal 1s ease-out forwards'
        }}
      >
        Let's <span className="gradient-text">Rebuild</span> Together.
      </h1>

      <p 
        style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '0.95rem', 
          lineHeight: '1.6', 
          marginBottom: '2.5rem',
          maxWidth: '480px',
          margin: '0 auto 2.5rem'
        }}
      >
        Track your daily carbon footprint, commit to simple micro-actions, and witness your carbon-saving habits grow a virtual forest in real time. Every step helps restore the balance of our ecosphere.
      </p>

      {/* Start Button */}
      <button 
        onClick={onEnter} 
        className="btn-primary" 
        style={{ 
          padding: '0.9rem 2.5rem', 
          fontSize: '1.05rem', 
          borderRadius: 'var(--radius-lg)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}
      >
        <Leaf size={18} fill="white" />
        Enter EcoSphere
      </button>
    </div>
  );
};
