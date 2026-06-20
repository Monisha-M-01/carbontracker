import React from 'react';
import { Home, Car, Utensils, ShoppingBag, Zap, Award, BarChart3, TrendingDown, Target, ArrowRight } from 'lucide-react';
import type { EmissionsBreakdown } from '../utils/footprintCalculator';

interface DashboardProps {
  emissions: EmissionsBreakdown;
  ecoPoints: number;
  streak: number;
  savedCarbon: number; // in kg CO2e
  onNavigate: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  emissions,
  ecoPoints,
  streak,
  savedCarbon,
  onNavigate,
}) => {
  const { energy, transport, food, lifestyle, total } = emissions;
  
  // Calculate adjusted total if the user saved carbon
  // savedCarbon is in kg, let's convert to tonnes
  const savedTonnes = savedCarbon / 1000;
  const currentTotal = Math.max(0.1, total - savedTonnes);

  const categories = [
    { name: 'Energy', value: energy, color: '#10b981', icon: Home, desc: 'Electricity & Heating' },
    { name: 'Transport', value: transport, color: '#06b6d4', icon: Car, desc: 'Driving, Flights, Transit' },
    { name: 'Diet & Food', value: food, color: '#f59e0b', icon: Utensils, desc: 'Dietary footprint' },
    { name: 'Lifestyle', value: lifestyle, color: '#6366f1', icon: ShoppingBag, desc: 'Shopping & Waste' },
  ];

  // Sorted by emission value to find the highest emission category
  const sortedCategories = [...categories].sort((a, b) => b.value - a.value);
  const highestCategory = sortedCategories[0];

  // Dynamic recommendations based on the highest category
  const getRecommendations = (catName: string) => {
    switch (catName) {
      case 'Energy':
        return [
          { text: 'Switch to energy-efficient LED lightbulbs.', impact: 'Saves ~150kg CO₂e/yr' },
          { text: 'Reduce thermostat by 1°C in winter or increase by 1°C in summer.', impact: 'Saves ~300kg CO₂e/yr' },
          { text: 'Unplug devices when not in use to eliminate phantom load.', impact: 'Saves ~80kg CO₂e/yr' },
        ];
      case 'Transport':
        return [
          { text: 'Commit to riding public transit or carpooling twice a week.', impact: 'Saves ~600kg CO₂e/yr' },
          { text: 'Walk or bicycle for all trips under 2 kilometers.', impact: 'Saves ~180kg CO₂e/yr' },
          { text: 'Choose train over short-haul domestic flights when possible.', impact: 'Saves ~250kg CO₂e/yr' },
        ];
      case 'Diet & Food':
        return [
          { text: 'Adopt "Meat-free Mondays" (go vegetarian/vegan one day a week).', impact: 'Saves ~400kg CO₂e/yr' },
          { text: 'Swap dairy milk for oat, soy, or almond milk.', impact: 'Saves ~120kg CO₂e/yr' },
          { text: 'Plan meals ahead to reduce edible food waste to zero.', impact: 'Saves ~150kg CO₂e/yr' },
        ];
      case 'Lifestyle':
      default:
        return [
          { text: 'Implement strict waste sorting and active home composting.', impact: 'Saves ~200kg CO₂e/yr' },
          { text: 'Avoid single-use plastics and carry reusable bags/cups.', impact: 'Saves ~50kg CO₂e/yr' },
          { text: 'Prioritize buying second-hand or repairing items instead of buying new.', impact: 'Saves ~450kg CO₂e/yr' },
        ];
    }
  };

  const recommendations = getRecommendations(highestCategory.name);

  // SVG circular chart math
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercentage = 0;

  // Global averages
  const benchmarks = [
    { label: 'U.S. Average', value: 17.6, color: '#f87171' },
    { label: 'Global Average', value: 6.6, color: '#9ca3af' },
    { label: 'Your Footprint', value: parseFloat(currentTotal.toFixed(2)), color: 'var(--primary)', isUser: true },
    { label: 'India Average', value: 2.0, color: '#fbbf24' },
    { label: '2050 Climate Target', value: 2.0, color: '#34d399' },
  ];

  // Find max value to scale the horizontal comparison chart
  const maxBenchmarkVal = Math.max(...benchmarks.map(b => b.value), 20);

  return (
    <div className="animate-fade-in">
      {/* Top Welcome Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Welcome Back, Eco-Citizen!</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Here is your real-time carbon tracking status.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass-card" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-md)' }}>
            <Award color="var(--primary)" size={20} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ECO POINTS</div>
              <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{ecoPoints} XP</div>
            </div>
          </div>
          <div className="glass-card" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: 'var(--radius-md)' }}>
            <Zap color="var(--secondary)" size={20} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>STREAK</div>
              <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{streak} Days</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-3-main">
        {/* Main Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Circular Chart & Category List */}
          <div className="glass-card grid-2" style={{ alignItems: 'center' }}>
            
            {/* SVG Donut Chart */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '220px', height: '220px' }}>
                <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                  <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                  {categories.map((cat, idx) => {
                    const percentage = (cat.value / total) * 100;
                    const strokeOffset = circumference - (percentage / 100) * circumference;
                    const rotation = (accumulatedPercentage / 100) * 360;
                    accumulatedPercentage += percentage;

                    if (cat.value === 0) return null;

                    return (
                      <circle
                        key={idx}
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke={cat.color}
                        strokeWidth="12"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeOffset}
                        transform={`rotate(${rotation} 60 60)`}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
                      />
                    );
                  })}
                </svg>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Baseline</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'white', lineHeight: '1' }}>{currentTotal.toFixed(1)}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary-light)', fontWeight: '600' }}>t CO₂e/yr</div>
                </div>
              </div>
              {savedCarbon > 0 && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '0.35rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', marginTop: '1rem', fontWeight: '500' }}>
                  <TrendingDown size={14} /> Logged Savings: -{savedCarbon.toFixed(1)} kg CO₂e
                </div>
              )}
            </div>

            {/* Category Breakdown Table */}
            <div>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Carbon Breakdown</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {categories.map((cat, idx) => {
                  const percentage = total > 0 ? ((cat.value / total) * 100).toFixed(0) : '0';
                  const Icon = cat.icon;
                  return (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ background: `${cat.color}15`, color: cat.color, padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
                        <Icon size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: '600' }}>
                          <span>{cat.name}</span>
                          <span>{cat.value.toFixed(1)} t CO₂e ({percentage}%)</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          <span>{cat.desc}</span>
                        </div>
                        <div className="progress-bar-bg" style={{ marginTop: '0.4rem' }}>
                          <div 
                            className="progress-bar-fill" 
                            style={{ 
                              width: `${percentage}%`, 
                              background: `linear-gradient(90deg, ${cat.color}aa, ${cat.color})` 
                            }} 
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Comparative Benchmarks */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <BarChart3 color="var(--secondary)" size={22} />
              <h2>How You Compare</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {benchmarks.map((b, idx) => {
                const widthPct = (b.value / maxBenchmarkVal) * 100;
                return (
                  <div key={idx} style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: b.isUser ? '700' : '400', color: b.isUser ? 'white' : 'var(--text-secondary)' }}>
                      <span>{b.label} {b.isUser && ' (Adjusted)'}</span>
                      <span>{b.value} t CO₂e/yr</span>
                    </div>
                    <div className="progress-bar-bg" style={{ height: b.isUser ? '12px' : '8px', border: b.isUser ? '1px solid var(--primary-light)' : 'none' }}>
                      <div 
                        className="progress-bar-fill" 
                        style={{ 
                          width: `${widthPct}%`, 
                          background: b.isUser 
                            ? 'linear-gradient(90deg, var(--primary), var(--primary-light))' 
                            : b.color 
                        }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <Target color="var(--primary)" size={28} />
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                The <span style={{ color: 'var(--primary-light)', fontWeight: '600' }}>Paris Agreement global target</span> is under <strong>2.0 tonnes</strong> per person annually. {currentTotal > 2.0 ? `You need to reduce your footprint by ${(currentTotal - 2.0).toFixed(1)} tonnes to meet this goal.` : `Congratulations, you are meeting the 2050 target!`}
              </p>
            </div>
          </div>

        </div>

        {/* Sidebar Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Personalized Insights */}
          <div className="glass-card" style={{ borderLeft: `4px solid ${highestCategory.color}` }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Personalized Insights
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Based on your highest emission category: <strong style={{ color: highestCategory.color }}>{highestCategory.name}</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recommendations.map((rec, idx) => (
                <div key={idx} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>{rec.text}</p>
                  <span className="badge badge-success">{rec.impact}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => onNavigate('habits')}
              className="btn-primary" 
              style={{ width: '100%', marginTop: '1.5rem', fontSize: '0.9rem' }}
            >
              Start Reducing <ArrowRight size={16} />
            </button>
          </div>

          {/* Quick Tips */}
          <div className="glass-card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Climate Fact</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              According to the Science (2018) paper by Joseph Poore & Thomas Nemecek, dietary choices are far more critical than food transport. Swap beef for poultry or plant proteins to immediately cut your food footprint by up to 75%.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
