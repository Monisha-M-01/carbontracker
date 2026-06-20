import React, { useState } from 'react';
import { DollarSign, Award, ShieldCheck } from 'lucide-react';

interface OffsetsProps {
  totalEmissionsTonnes: number;
  onOffsetPurchase: (cost: number, offsetPercentage: number, xpReward: number) => void;
}

interface OffsetProject {
  id: string;
  name: string;
  category: string;
  costPerTonne: number; // in USD
  desc: string;
  image: string;
}

export const Offsets: React.FC<OffsetsProps> = ({ totalEmissionsTonnes, onOffsetPurchase }) => {
  const [offsetPercentage, setOffsetPercentage] = useState(100);
  const [selectedProjectId, setSelectedProjectId] = useState('p1');
  const [isPurchased, setIsPurchased] = useState(false);

  const projects: OffsetProject[] = [
    {
      id: 'p1',
      name: 'Amazon Rainforest Reforestation',
      category: 'Forestry',
      costPerTonne: 12,
      desc: 'Restoring degraded lands in the Amazon basin. Promotes biodiversity and supports local indigenous communities.',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'p2',
      name: 'Community Wind Farms in India',
      category: 'Renewable Energy',
      costPerTonne: 8,
      desc: 'Replacing coal grid electricity with clean, grid-connected wind energy. Creates local jobs and reduces regional air pollution.',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'p3',
      name: 'Icelandic Direct Air Capture (DAC)',
      category: 'Advanced Tech',
      costPerTonne: 55,
      desc: 'Using industrial fans and geothermal energy to extract CO₂ directly from the atmosphere and permanently mineralize it underground.',
      image: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Calculations
  const emissionsToOffset = (totalEmissionsTonnes * offsetPercentage) / 100;
  const treesNeeded = Math.round((emissionsToOffset * 1000) / 22); // 1 tree absorbs ~22kg CO2/year
  const totalCost = parseFloat((emissionsToOffset * activeProject.costPerTonne).toFixed(2));
  const xpReward = Math.round(offsetPercentage * 2); // e.g. 100% offset = 200 XP

  const handlePurchase = () => {
    onOffsetPurchase(totalCost, offsetPercentage, xpReward);
    setIsPurchased(true);
    setTimeout(() => {
      setIsPurchased(false);
    }, 4000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Offsets Overview Banner */}
      <div className="glass-card grid-2" style={{ alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Neutralize Your Carbon Impact</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Even with extreme lifestyle reductions, most modern citizens will have a residual carbon footprint. You can offset this remainder by funding verified carbon-reduction projects globally.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Remaining Footprint</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'white' }}>{totalEmissionsTonnes.toFixed(1)} <span style={{ fontSize: '1rem', fontWeight: '500' }}>t CO₂e</span></div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Equivalency</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-light)' }}>{treesNeeded.toLocaleString()} <span style={{ fontSize: '1rem', fontWeight: '500' }}>Trees</span></div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Planted & grown for 1 year</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="slider-container" style={{ margin: 0 }}>
            <div className="slider-header">
              <span className="form-label">Offset Coverage Percentage</span>
              <span className="slider-value" style={{ color: 'var(--secondary)' }}>{offsetPercentage}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="10"
              value={offsetPercentage}
              onChange={(e) => setOffsetPercentage(parseInt(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
            <ShieldCheck size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              <strong>Gold Standard Certified:</strong> All listed projects are fully vetted and verified by international bodies (Gold Standard / Verra VCS) ensuring additionality and permanent removal.
            </p>
          </div>
        </div>
      </div>

      {/* Selector & Details Grid */}
      <div className="grid-3-main">
        {/* Project Selector List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Choose an Offset Project</h2>
          <div className="grid-2">
            {projects.map((project) => {
              const isSelected = selectedProjectId === project.id;
              return (
                <div
                  key={project.id}
                  className={`glass-card offset-project-card glass-card-interactive ${isSelected ? 'selected' : ''}`}
                  style={{ 
                    padding: 0,
                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  }}
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  <img src={project.image} alt={project.name} className="offset-project-img" />
                  <div className="offset-project-content">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span className="badge badge-info" style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem' }}>{project.category}</span>
                      <strong style={{ color: 'var(--primary-light)', fontSize: '0.9rem' }}>${project.costPerTonne}/tonne</strong>
                    </div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.5rem', color: 'white' }}>{project.name}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{project.desc.substring(0, 100)}...</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Purchase Summary Column */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Offset Summary</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Selected Project:</span>
                <span style={{ fontWeight: '600', color: 'white', textAlign: 'right' }}>{activeProject.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Emissions to Offset:</span>
                <span style={{ fontWeight: '600', color: 'white' }}>{emissionsToOffset.toFixed(2)} t CO₂e</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Project Rate:</span>
                <span style={{ fontWeight: '600', color: 'white' }}>${activeProject.costPerTonne} / tonne</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '700', padding: '0.5rem 0' }}>
                <span>Total Cost:</span>
                <span style={{ color: 'var(--primary-light)', display: 'flex', alignItems: 'center' }}>
                  <DollarSign size={18} /> {totalCost.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button
              onClick={handlePurchase}
              disabled={isPurchased}
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
            >
              {isPurchased ? 'Offset Credit Issued! ✓' : 'Support Project & Offset'}
            </button>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', alignItems: 'center', color: 'var(--secondary)', fontSize: '0.8rem', marginTop: '0.75rem', fontWeight: '500' }}>
              <Award size={14} /> Rewards: +{xpReward} XP Points
            </div>
          </div>
        </div>
      </div>

      {isPurchased && (
        <div className="glass-card animate-fade-in" style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          borderLeft: '4px solid var(--primary)',
          background: 'var(--bg-surface-solid)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          padding: '1.25rem 2rem',
          maxWidth: '380px',
          zIndex: 1000,
        }}>
          <h3 style={{ color: 'var(--primary-light)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', marginBottom: '0.25rem' }}>
            Offset Successful!
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Successfully offset {emissionsToOffset.toFixed(2)} tonnes of CO₂e via {activeProject.name}. Your dashboard baseline has been updated!
          </p>
        </div>
      )}
    </div>
  );
};
