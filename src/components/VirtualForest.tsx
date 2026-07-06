import React, { useState } from 'react';
import { RefreshCw, Trees, Award } from 'lucide-react';

interface VirtualForestProps {
  savedCarbon: number; // in kg CO2e
  ecoPoints: number;
}

interface Quote {
  text: string;
  author: string;
}

export const VirtualForest: React.FC<VirtualForestProps> = ({ savedCarbon, ecoPoints }) => {
  // Array of nature quotes
  const quotes: Quote[] = [
    { text: "The clearest way into the Universe is through a forest wilderness.", author: "John Muir" },
    { text: "To plant a garden is to believe in tomorrow.", author: "Audrey Hepburn" },
    { text: "What we are doing to the forests of the world is but a mirror reflection of what we are doing to ourselves.", author: "Mahatma Gandhi" },
    { text: "Forests are the lungs of our land, purifying the air and giving fresh strength to our people.", author: "Franklin D. Roosevelt" },
    { text: "Look deep into nature, and then you will understand everything better.", author: "Albert Einstein" },
    { text: "He that plants trees loves others besides himself.", author: "Thomas Fuller" },
    { text: "The creation of a thousand forests is in one acorn.", author: "Ralph Waldo Emerson" }
  ];

  const [quoteIdx, setQuoteIdx] = useState(0);

  const rotateQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % quotes.length);
  };

  // 1 tree for every 20 kg CO2e saved
  const carbonPerTree = 20;
  const totalTrees = Math.floor(savedCarbon / carbonPerTree);
  const remainingCarbon = savedCarbon % carbonPerTree;
  
  // Is there a tree currently in progress?
  const hasSprout = remainingCarbon > 0;
  const sproutPercentage = (remainingCarbon / carbonPerTree) * 100;

  // Let's generate an array of trees to display in the grid
  const treeList: { id: number; stage: 'sprout' | 'sapling' | 'pine' | 'oak'; icon: string }[] = [];
  
  for (let i = 0; i < totalTrees; i++) {
    // Determine type based on index to show a diverse forest!
    let stage: 'sprout' | 'sapling' | 'pine' | 'oak' = 'sprout';
    let icon = '🌱';
    
    if (i < 2) {
      stage = 'sapling';
      icon = '🌿';
    } else if (i < 6) {
      stage = 'pine';
      icon = '🌲';
    } else {
      stage = 'oak';
      icon = '🌳';
    }
    
    treeList.push({ id: i, stage, icon });
  }

  // Add the active sprout (sprouting tree) at the end if it exists
  if (hasSprout) {
    treeList.push({ 
      id: totalTrees, 
      stage: 'sprout', 
      icon: '🌱' 
    });
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Overview Card */}
      <div className="glass-card forest-container-card grid-2" style={{ alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Trees color="var(--primary)" size={20} style={{ flexShrink: 0 }} />
            <h1 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.75rem)' }}>My Virtual Forest</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
            Every daily micro-action has a real effect. Here, we translate your carbon savings directly into a sprouting ecosystem. A mature tree absorbs roughly <strong>20 kg of CO₂</strong> per year. Your green choices support this forest!
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Trees Grown</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'white' }}>
                {totalTrees} {hasSprout && <span style={{ fontSize: '0.9rem', color: 'var(--primary-light)', fontWeight: '500' }}>+ 1 sprout</span>}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Next Tree Progress</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--secondary)' }}>
                {sproutPercentage.toFixed(0)}%
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Save {(carbonPerTree - remainingCarbon).toFixed(1)} kg more CO₂ to grow the next tree!
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Progress bar to next tree */}
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Next Tree Grow Status</label>
            <div className="progress-bar-bg" style={{ height: '14px' }}>
              <div 
                className="progress-bar-fill" 
                style={{ 
                  width: `${sproutPercentage}%`, 
                  background: 'linear-gradient(90deg, var(--secondary), var(--primary))' 
                }} 
              />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
            <Award size={20} color="var(--primary)" />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              You have earned <strong>{ecoPoints} XP</strong>. Sprout 5 trees total to unlock the <strong>Low Carbon Commuter</strong> rank!
            </span>
          </div>
        </div>
      </div>

      <div className="grid-3-main">
        {/* Forest Canvas Grid */}
        <div className="forest-canvas">
          {treeList.length === 0 ? (
            <div style={{ textAlign: 'center', maxWidth: '340px', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'bloomPulse 3s infinite' }}>🍂</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Your Forest is Empty</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                You haven't logged any green actions yet. Head to the "Daily Habits & Logs" tab and log transit, diet, or utility savings to grow your first sprout!
              </p>
            </div>
          ) : (
            <div className="forest-grid">
              {treeList.map((tree, idx) => (
                <div key={idx} className="forest-tile" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <span className="forest-tree-icon">{tree.icon}</span>
                  <span className="forest-tree-stage">{tree.stage}</span>
                </div>
              ))}
            </div>
          )}

          {/* Watermark detail */}
          <div style={{ position: 'absolute', bottom: '1rem', right: '1.5rem', opacity: 0.15, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Powered by Carbon Reduction
          </div>
        </div>

        {/* Quotes Board Sidebar */}
        <div className="quote-board" style={{ height: 'fit-content' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary-light)', fontWeight: '700' }}>
              Nature Wisdom
            </span>
            <button 
              onClick={rotateQuote} 
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              title="New Quote"
            >
              <RefreshCw size={14} />
            </button>
          </div>
          <p className="quote-text">"{quotes[quoteIdx].text}"</p>
          <div className="quote-author">— {quotes[quoteIdx].author}</div>
        </div>
      </div>

    </div>
  );
};
