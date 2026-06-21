import React, { useState, useEffect } from 'react';

interface EcoSaplingProps {
  savedCarbon: number;
  todaySavings?: number;
}

type MoodStage = 'gloomy' | 'dreamy' | 'happy' | 'ecstatic';

export const EcoSapling: React.FC<EcoSaplingProps> = ({ savedCarbon, todaySavings }) => {
  const [bubbleClicked, setBubbleClicked] = useState(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [tiltAngle, setTiltAngle] = useState(0);

  // Mouse tracking to look towards cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Approximate coordinates of the fixed mascot (top-right of screen)
      const mascotX = window.innerWidth - 80;
      const mascotY = 80;

      const dx = e.clientX - mascotX;
      const dy = e.clientY - mascotY;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;

      // Eye pupils offset (max 1.5px movement in any direction)
      const maxPupilMove = 1.5;
      const ox = (dx / distance) * maxPupilMove;
      const oy = (dy / distance) * maxPupilMove;
      setPupilOffset({ x: ox, y: oy });

      // Trunk tilt angle (max 5 degrees rotation)
      const maxTilt = 5;
      const angle = Math.min(maxTilt, Math.max(-maxTilt, (dx / (window.innerWidth || 1)) * maxTilt * 2));
      setTiltAngle(angle);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Determine stage: gloomy, dreamy, happy, or ecstatic
  let stage: MoodStage = 'gloomy';
  if (todaySavings && todaySavings >= 5) {
    stage = 'ecstatic';
  } else if (todaySavings && todaySavings > 0) {
    stage = 'happy';
  } else if (savedCarbon >= 10) {
    stage = 'dreamy';
  }

  // Content for speech bubble
  let speechText = '';
  let moodLabel = '';
  let themeColor = '';

  if (stage === 'gloomy') {
    moodLabel = 'Gloomy Sprout 🌧️';
    themeColor = '#f87171'; // Red / Warning
    speechText = savedCarbon <= 0 
      ? "The air is heavy. Let's log some green choices today to clean up our environment!"
      : `I have only saved ${savedCarbon.toFixed(1)}kg of CO₂e total. The air is still a bit stuffy...`;
  } else if (stage === 'dreamy') {
    moodLabel = 'Chilling Sapling 💤';
    themeColor = '#60a5fa'; // Blue / Relaxed
    speechText = `Zzz... We've saved ${savedCarbon.toFixed(1)}kg of CO₂e cumulative. Ready when you are for today's logs!`;
  } else if (stage === 'happy') {
    moodLabel = 'Happy Sapling 🌱';
    themeColor = '#34d399'; // Green / Active
    speechText = `Yay! We saved ${todaySavings?.toFixed(1)}kg of CO₂e today! Keep it up and watch me grow!`;
  } else { // ecstatic
    moodLabel = 'Ecstatic Canopy 🌸✨';
    themeColor = '#a78bfa'; // Purple / Sparkly
    speechText = `AMAZING! A massive ${todaySavings?.toFixed(1)}kg of CO₂e saved today! I'm bursting with pure, clean energy!`;
  }

  return (
    <div 
      className={`sapling-container ${bubbleClicked ? 'active' : ''}`}
      onClick={() => setBubbleClicked(!bubbleClicked)}
      title="Click for assistant options"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setBubbleClicked(!bubbleClicked); } }}
      aria-label="EcoSapling Mascot Companion"
      aria-expanded={bubbleClicked}
    >
      {/* Cartoon Tree SVG */}
      <div 
        className="sapling-bounce tree-body-move" 
        style={{ 
          width: '60px', 
          height: '60px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          transform: `rotate(${tiltAngle}deg)`
        }}
      >
        <svg viewBox="0 0 24 24" width="100%" height="100%" style={{ overflow: 'visible' }}>
          {/* Terracotta pot */}
          <path d="M6,19 L7.5,23 C7.7,23.6 8.2,24 8.8,24 L15.2,24 C15.8,24 16.3,23.6 16.5,23 L18,19 Z" fill="#e07a5f" stroke="#2d3748" strokeWidth="0.8" />
          <rect x="5" y="17.8" width="14" height="1.6" rx="0.8" fill="#f4a261" stroke="#2d3748" strokeWidth="0.8" />
          
          {/* Pot Shadow/Highlight */}
          <rect x="7" y="19" width="10" height="0.6" fill="#2d3748" opacity="0.15" />

          {/* Wooden Trunk */}
          <path d="M10.5,18 C10.8,13.5 11.2,10 12,10 C12.8,10 13.2,13.5 13.5,18 Z" fill="#8b5a2b" stroke="#2d3748" strokeWidth="0.8" />

          {/* Dynamic Arms based on stage */}
          {stage === 'gloomy' && (
            <>
              {/* Drooping arms */}
              <path d="M10.8,15 C9.5,16.5 8.2,17.2 7,17.5" stroke="#8b5a2b" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.2,15 C14.5,16.5 15.8,17.2 17,17.5" stroke="#8b5a2b" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </>
          )}
          {stage === 'dreamy' && (
            <>
              {/* Relaxed horizontal/peaceful arms */}
              <path d="M10.8,15.5 Q8.8,16 7.5,16" stroke="#8b5a2b" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M13.2,15.5 Q15.2,16 16.5,16" stroke="#8b5a2b" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </>
          )}
          {stage === 'happy' && (
            <>
              {/* Waving/cheering arms */}
              <path d="M10.8,15 Q8.5,14.5 7,12.8" stroke="#8b5a2b" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M13.2,15 Q15.5,14.5 17,12.8" stroke="#8b5a2b" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </>
          )}
          {stage === 'ecstatic' && (
            <>
              {/* Arms raised high in victory */}
              <path d="M10.5,14 M10.5,14 Q8.5,11.5 7,9.8" stroke="#8b5a2b" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              <path d="M13.5,14 M13.5,14 Q15.5,11.5 17,9.8" stroke="#8b5a2b" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            </>
          )}

          {/* Dynamic Canopy Foliage */}
          {stage === 'gloomy' && (
            <>
              {/* Drooping, withered yellow-olive canopy */}
              <path d="M12,10 C9,10 7.8,7.5 9,5.5 C10,3.5 14,3.5 15,5.5 C16.2,7.5 15,10 12,10 Z" fill="#b08d57" stroke="#5d4037" strokeWidth="0.8" opacity="0.95" />
              <path d="M9.5,8 C7.5,8 6.5,6.5 7.5,5 C8.5,3.8 10.5,4.5 11,5.5 Z" fill="#8d6e63" stroke="#5d4037" strokeWidth="0.6" opacity="0.9" />
              {/* Falling withered leaf */}
              <path d="M5.5,14 C4.8,14.5 4.5,15.5 4.8,16" fill="#b08d57" stroke="#5d4037" strokeWidth="0.6" className="cry-drip" />
            </>
          )}

          {stage === 'dreamy' && (
            <>
              {/* Soft green, simple sleepy canopy */}
              <circle cx="12" cy="5.5" r="4.5" fill="#4caf50" stroke="#2e7d32" strokeWidth="0.8" />
              <circle cx="8.5" cy="7.5" r="3.2" fill="#388e3c" stroke="#2e7d32" strokeWidth="0.8" />
              <circle cx="15.5" cy="7.5" r="3.2" fill="#388e3c" stroke="#2e7d32" strokeWidth="0.8" />
              {/* Floating sleep Zzz's using animated text */}
              <text x="18" y="2" fill="#60a5fa" fontSize="2.8" fontWeight="bold" className="sleep-zzz-1">z</text>
              <text x="21" y="-1" fill="#93c5fd" fontSize="3.8" fontWeight="bold" className="sleep-zzz-2">Z</text>
            </>
          )}

          {stage === 'happy' && (
            <>
              {/* Vibrant green fluffy cartoon canopy */}
              <circle cx="12" cy="5.5" r="5" fill="#10b981" stroke="#047857" strokeWidth="0.8" />
              <circle cx="8" cy="7.5" r="3.8" fill="#059669" stroke="#047857" strokeWidth="0.8" />
              <circle cx="16" cy="7.5" r="3.8" fill="#059669" stroke="#047857" strokeWidth="0.8" />
              <circle cx="12" cy="3.2" r="3.2" fill="#34d399" />
              
              {/* Growing flowers */}
              <circle cx="7.5" cy="6" r="0.8" fill="#ef4444" />
              <circle cx="7.5" cy="6" r="0.3" fill="#fef08a" />
              
              <circle cx="16.5" cy="6" r="0.8" fill="#ef4444" />
              <circle cx="16.5" cy="6" r="0.3" fill="#fef08a" />

              <circle cx="12" cy="2.5" r="0.8" fill="#3b82f6" />
              <circle cx="12" cy="2.5" r="0.3" fill="#fef08a" />
            </>
          )}

          {stage === 'ecstatic' && (
            <>
              {/* Huge blossomed turquoise-emerald canopy */}
              <circle cx="12" cy="5" r="6" fill="#06b6d4" stroke="#0891b2" strokeWidth="0.8" />
              <circle cx="7" cy="7" r="4.5" fill="#0d9488" stroke="#0f766e" strokeWidth="0.8" />
              <circle cx="17" cy="7" r="4.5" fill="#0d9488" stroke="#0f766e" strokeWidth="0.8" />
              <circle cx="12" cy="2" r="4" fill="#22d3ee" />
              
              {/* Sparkling star symbols */}
              <g className="sparkle-pulse">
                <polygon points="4,2 4.5,3.2 5.8,3.5 4.8,4.3 5.2,5.5 4,4.8 2.8,5.5 3.2,4.3 2.2,3.5 3.5,3.2" fill="#fbbf24" />
              </g>
              <g className="sparkle-pulse" style={{ animationDelay: '1s' }}>
                <polygon points="20,3 20.4,4 21.5,4.2 20.7,4.9 21,5.9 20,5.3 19,5.9 19.3,4.9 18.5,4.2 19.6,4" fill="#f472b6" />
              </g>
              
              {/* Blooming pink flowers */}
              <circle cx="6.5" cy="5.5" r="1.1" fill="#f43f5e" />
              <circle cx="6.5" cy="5.5" r="0.4" fill="#fef08a" />

              <circle cx="17.5" cy="5.5" r="1.1" fill="#f43f5e" />
              <circle cx="17.5" cy="5.5" r="0.4" fill="#fef08a" />

              <circle cx="12" cy="1.2" r="1.1" fill="#f59e0b" />
              <circle cx="12" cy="1.2" r="0.4" fill="#ffffff" />
            </>
          )}

          {/* Expressions / Face on the Trunk */}
          {stage === 'gloomy' && (
            <>
              {/* Closed sad crying eyes */}
              <path d="M10.2,13.5 Q11,14.5 11.5,13.8" stroke="#2d3748" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M13.8,13.5 Q13,14.5 12.5,13.8" stroke="#2d3748" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              
              {/* Tear drops */}
              <path d="M9.8,14.2 C9.8,14.2 9,15.5 9,16 C9,16.5 9.4,16.8 9.8,16.8 C10.2,16.8 10.6,16.5 10.6,16 C10.6,15.5 9.8,14.2 9.8,14.2 Z" fill="#60a5fa" opacity="0.8" className="cry-drip" />
              <path d="M14.2,14.2 C14.2,14.2 15,15.5 15,16 C15,16.5 14.6,16.8 14.2,16.8 C13.8,16.8 13.4,16.5 13.4,16 C13.4,15.5 14.2,14.2 14.2,14.2 Z" fill="#60a5fa" opacity="0.8" className="cry-drip" style={{ animationDelay: '0.7s' }} />

              {/* Sad frown */}
              <path d="M11.3,16 Q12,15 12.7,16" stroke="#2d3748" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            </>
          )}

          {stage === 'dreamy' && (
            <>
              {/* Closed relaxed sleeping eyes */}
              <path d="M10,13.2 Q11,12.2 11.5,13.2" stroke="#2d3748" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M14,13.2 Q13,12.2 12.5,13.2" stroke="#2d3748" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              
              {/* Tiny sleeping mouth */}
              <circle cx="12" cy="15.2" r="0.6" fill="#2d3748" />

              {/* Soft blushing cheeks */}
              <circle cx="9.4" cy="14.2" r="0.8" fill="#f87171" opacity="0.4" />
              <circle cx="14.6" cy="14.2" r="0.8" fill="#f87171" opacity="0.4" />
            </>
          )}

          {stage === 'happy' && (
            <>
              {/* Large shiny cartoon eyes */}
              <circle cx="10.6" cy="13.2" r="1.5" fill="#2d3748" />
              {/* Shiny glints (connected to pupilOffset for tracking mouse cursor) */}
              <circle 
                cx="10.2" 
                cy="12.7" 
                r="0.5" 
                fill="white" 
                className="tree-pupils" 
                transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`} 
              />
              <circle 
                cx="11.0" 
                cy="13.7" 
                r="0.25" 
                fill="white" 
                className="tree-pupils" 
                transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`} 
              />

              <circle cx="13.4" cy="13.2" r="1.5" fill="#2d3748" />
              <circle 
                cx="13.0" 
                cy="12.7" 
                r="0.5" 
                fill="white" 
                className="tree-pupils" 
                transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`} 
              />
              <circle 
                cx="13.8" 
                cy="13.7" 
                r="0.25" 
                fill="white" 
                className="tree-pupils" 
                transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`} 
              />

              {/* Rosy blushing cheeks */}
              <ellipse cx="9.2" cy="14.3" rx="0.9" ry="0.6" fill="#fca5a5" opacity="0.95" />
              <ellipse cx="14.8" cy="14.3" rx="0.9" ry="0.6" fill="#fca5a5" opacity="0.95" />

              {/* Smiling mouth */}
              <path d="M11.2,15.2 Q12,16.2 12.8,15.2" stroke="#2d3748" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            </>
          )}

          {stage === 'ecstatic' && (
            <>
              {/* Giant sparkling heart eyes */}
              <path d="M10.5,12.2 C10.1,11.7 9.3,11.8 9.3,12.5 C9.3,13.2 10.5,14.6 10.5,14.6 C10.5,14.6 11.7,13.2 11.7,12.5 C11.7,11.8 10.9,11.7 10.5,12.2 Z" fill="#f43f5e" stroke="#2d3748" strokeWidth="0.5" />
              <path d="M13.5,12.2 C13.1,11.7 12.3,11.8 12.3,12.5 C12.3,13.2 13.5,14.6 13.5,14.6 C13.5,14.6 14.7,13.2 14.7,12.5 C14.7,11.8 13.9,11.7 13.5,12.2 Z" fill="#f43f5e" stroke="#2d3748" strokeWidth="0.5" />

              {/* Rosy glowing cheeks */}
              <ellipse cx="9.0" cy="14.5" rx="1.0" ry="0.7" fill="#f472b6" opacity="0.95" className="sparkle-pulse" />
              <ellipse cx="15.0" cy="14.5" rx="1.0" ry="0.7" fill="#f472b6" opacity="0.95" className="sparkle-pulse" style={{ animationDelay: '0.5s' }} />

              {/* Open laughing mouth with pink tongue */}
              <path d="M11.2,15 Q12,16.8 12.8,15 Z" fill="#f43f5e" stroke="#2d3748" strokeWidth="0.8" />
            </>
          )}
        </svg>
      </div>

      {/* Sprout status labels */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.72rem', color: themeColor, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.1 }}>
          {moodLabel}
        </span>
        <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-primary)' }}>
          {savedCarbon.toFixed(1)} <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '500' }}>kg saved</span>
        </span>
      </div>

      {/* Dialogue Speech Bubble */}
      <div className="sapling-bubble">
        <p style={{ margin: 0 }}>{speechText}</p>
        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.35rem', textAlign: 'right', fontWeight: '600' }}>
          Click to close bubble
        </span>
      </div>
    </div>
  );
};

