import React, { useState } from 'react';
import { Car, Utensils, Zap, Trash2, Check, Leaf } from 'lucide-react';

interface DailyLoggerProps {
  onSaveLog: (footprint: number, savings: number, xp: number) => void;
  streak: number;
}

export const DailyLogger: React.FC<DailyLoggerProps> = ({ onSaveLog, streak }) => {
  // Today's Activity States
  const [transportMode, setTransportMode] = useState<'petrol' | 'diesel' | 'ev' | 'transit' | 'active'>('petrol');
  const [transportDistance, setTransportDistance] = useState<number>(20);
  const [dietType, setDietType] = useState<'high-meat' | 'average' | 'vegetarian' | 'vegan'>('average');
  const [heatingHours, setHeatingHours] = useState<number>(2);
  const [electricityHours, setElectricityHours] = useState<number>(6);
  const [recycled, setRecycled] = useState<boolean>(true);
  const [purchases, setPurchases] = useState<number>(0);
  const [customAction, setCustomAction] = useState<string>('');

  // Success indicator state
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [lastCalculation, setLastCalculation] = useState<{ footprint: number; savings: number; xp: number } | null>(null);

  // Calculate carbon footprint dynamically for preview
  const calculateTodayFootprint = (): number => {
    // 1. Transport
    let transportFactor = 0;
    if (transportMode === 'petrol') transportFactor = 0.19;
    else if (transportMode === 'diesel') transportFactor = 0.18;
    else if (transportMode === 'ev') transportFactor = 0.05;
    else if (transportMode === 'transit') transportFactor = 0.04;

    const transportEmissions = transportDistance * transportFactor;

    // 2. Diet
    let dietEmissions = 5.5;
    if (dietType === 'high-meat') dietEmissions = 8.0;
    else if (dietType === 'vegetarian') dietEmissions = 2.8;
    else if (dietType === 'vegan') dietEmissions = 1.8;

    // 3. Energy
    const energyEmissions = (heatingHours * 1.2) + (electricityHours * 0.45);

    // 4. Waste & Consumption
    const wasteEmissions = 1.5 - (recycled ? 0.6 : 0);
    const shoppingEmissions = purchases * 1.5;

    // 5. Custom Eco-Action
    const customDeduction = customAction.trim() !== '' ? 2.0 : 0;

    return parseFloat(Math.max(0.1, transportEmissions + dietEmissions + energyEmissions + wasteEmissions + shoppingEmissions - customDeduction).toFixed(2));
  };

  const handleSave = () => {
    const todayFootprint = calculateTodayFootprint();
    
    // Average daily carbon footprint benchmark is ~18 kg CO2e
    const dailyBenchmark = 18.0;
    const savings = Math.max(0, parseFloat((dailyBenchmark - todayFootprint).toFixed(2)));
    
    // XP based on savings rate + base XP
    const xpEarned = Math.round(15 + savings * 2);

    onSaveLog(todayFootprint, savings, xpEarned);
    
    setLastCalculation({ footprint: todayFootprint, savings, xp: xpEarned });
    setShowSuccess(true);
    setCustomAction('');
    
    // Reset state after showing confirmation for 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const todayFootprintPreview = calculateTodayFootprint();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Dynamic Summary Banner */}
      <div className="glass-card grid-3" style={{ padding: '1.5rem', textAlign: 'center', background: 'rgba(16, 185, 129, 0.08)', borderLeft: '4px solid var(--primary)' }}>
        <div>
          <span className="metric-label">Estimated Today</span>
          <span className="metric-value" style={{ color: todayFootprintPreview > 15 ? 'var(--danger)' : todayFootprintPreview > 8 ? 'var(--accent)' : 'var(--primary-light)' }}>
            {todayFootprintPreview.toFixed(1)} <span style={{ fontSize: '1.25rem', fontWeight: '500' }}>kg</span>
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CO₂e footprint preview</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
          <span className="metric-label">Daily Avg Target</span>
          <span className="metric-value" style={{ color: 'white' }}>
            5.5 <span style={{ fontSize: '1.25rem', fontWeight: '500' }}>kg</span>
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Required for climate target</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span className="metric-label">Current Streak</span>
          <span className="metric-value" style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
            🔥 {streak} Days
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Keep logging to build your record</span>
        </div>
      </div>

      <div className="grid-3-main">
        {/* Daily Questionnaire Form - Segmented into themed sub-cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>
            Record Today's Activities
          </h2>

          {/* 1. TRANSPORT - Cyan Theme */}
          <div className="glass-card card-theme-transport" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Car size={18} color="var(--secondary)" />
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Transportation Log</h3>
            </div>
            <div className="grid-2">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Transport Mode</label>
                <select
                  value={transportMode}
                  onChange={(e) => setTransportMode(e.target.value as any)}
                  className="form-select"
                  style={{ background: '#091c24' }}
                >
                  <option value="petrol">Petrol (Gasoline) Car</option>
                  <option value="diesel">Diesel Car</option>
                  <option value="ev">Electric Car (EV)</option>
                  <option value="transit">Public Transit (Bus/Train)</option>
                  <option value="active">Active (Walk, Bike, Skate)</option>
                </select>
              </div>

              {transportMode !== 'active' && (
                <div className="slider-container" style={{ margin: 0 }}>
                  <div className="slider-header">
                    <span className="form-label">Distance Driven/Ridden</span>
                    <span className="slider-value" style={{ color: 'var(--secondary)' }}>{transportDistance} km</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    step="5"
                    value={transportDistance}
                    onChange={(e) => setTransportDistance(parseInt(e.target.value))}
                    className="custom-slider"
                    style={{ background: 'rgba(6, 182, 212, 0.15)' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* 2. DIET - Orange/Amber Theme */}
          <div className="glass-card card-theme-diet" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Utensils size={18} color="var(--accent)" />
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Diet Choices Today</h3>
            </div>
            <div className="grid-2">
              <div 
                className={`option-card ${dietType === 'high-meat' ? 'selected' : ''}`}
                style={{ borderColor: 'rgba(245, 158, 11, 0.15)' }}
                onClick={() => setDietType('high-meat')}
              >
                <div className="checkbox-circle" style={{ borderColor: 'rgba(245, 158, 11, 0.5)' }} />
                <div>
                  <h4 style={{ fontSize: '0.85rem' }}>Meat Heavily</h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Heavy beef/lamb (~8.0kg CO₂)</span>
                </div>
              </div>
              <div 
                className={`option-card ${dietType === 'average' ? 'selected' : ''}`}
                style={{ borderColor: 'rgba(245, 158, 11, 0.15)' }}
                onClick={() => setDietType('average')}
              >
                <div className="checkbox-circle" style={{ borderColor: 'rgba(245, 158, 11, 0.5)' }} />
                <div>
                  <h4 style={{ fontSize: '0.85rem' }}>Average / Mixed</h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Poultry, dairy, veggies (~5.5kg CO₂)</span>
                </div>
              </div>
              <div 
                className={`option-card ${dietType === 'vegetarian' ? 'selected' : ''}`}
                style={{ borderColor: 'rgba(245, 158, 11, 0.15)' }}
                onClick={() => setDietType('vegetarian')}
              >
                <div className="checkbox-circle" style={{ borderColor: 'rgba(245, 158, 11, 0.5)' }} />
                <div>
                  <h4 style={{ fontSize: '0.85rem' }}>Vegetarian</h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>No meat/fish, dairy OK (~2.8kg CO₂)</span>
                </div>
              </div>
              <div 
                className={`option-card ${dietType === 'vegan' ? 'selected' : ''}`}
                style={{ borderColor: 'rgba(245, 158, 11, 0.15)' }}
                onClick={() => setDietType('vegan')}
              >
                <div className="checkbox-circle" style={{ borderColor: 'rgba(245, 158, 11, 0.5)' }} />
                <div>
                  <h4 style={{ fontSize: '0.85rem' }}>Vegan</h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>100% plant-based (~1.8kg CO₂)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. ENERGY - Yellow Theme */}
          <div className="glass-card card-theme-energy" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Zap size={18} color="#eab308" />
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Household Energy Usage</h3>
            </div>
            <div className="grid-2">
              <div className="slider-container" style={{ margin: 0 }}>
                <div className="slider-header">
                  <span className="form-label">Heating/AC Hours</span>
                  <span className="slider-value" style={{ color: '#eab308' }}>{heatingHours} hrs</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={heatingHours}
                  onChange={(e) => setHeatingHours(parseInt(e.target.value))}
                  className="custom-slider"
                  style={{ background: 'rgba(234, 179, 8, 0.15)' }}
                />
              </div>

              <div className="slider-container" style={{ margin: 0 }}>
                <div className="slider-header">
                  <span className="form-label">Active Electronics/AC</span>
                  <span className="slider-value" style={{ color: '#eab308' }}>{electricityHours} hrs</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="18"
                  value={electricityHours}
                  onChange={(e) => setElectricityHours(parseInt(e.target.value))}
                  className="custom-slider"
                  style={{ background: 'rgba(234, 179, 8, 0.15)' }}
                />
              </div>
            </div>
          </div>

          {/* 4. WASTE & CONSUMPTION - Purple Theme */}
          <div className="glass-card card-theme-waste" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Trash2 size={18} color="var(--info)" />
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Waste & Lifestyle</h3>
            </div>
            <div className="grid-2">
              <div 
                className={`option-card ${recycled ? 'selected' : ''}`}
                style={{ borderColor: 'rgba(99, 102, 241, 0.15)' }}
                onClick={() => setRecycled(!recycled)}
              >
                <div className="checkbox-circle" style={{ borderColor: 'rgba(99, 102, 241, 0.5)' }} />
                <div>
                  <h4 style={{ fontSize: '0.85rem' }}>Composted & Recycled All Trash</h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Reduces waste footprint by 0.6 kg</span>
                </div>
              </div>

              <div className="slider-container" style={{ margin: 0 }}>
                <div className="slider-header">
                  <span className="form-label">New Goods/Items Purchased</span>
                  <span className="slider-value" style={{ color: 'var(--info)' }}>{purchases} {purchases === 1 ? 'item' : 'items'}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={purchases}
                  onChange={(e) => setPurchases(parseInt(e.target.value))}
                  className="custom-slider"
                  style={{ background: 'rgba(99, 102, 241, 0.15)' }}
                />
              </div>
            </div>
          </div>

          {/* 5. CUSTOM EXTRA ECO-ACTION - Light Emerald Theme */}
          <div className="glass-card card-theme-custom" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Leaf size={18} color="var(--primary-light)" />
              <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Custom Eco-Action</h3>
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Type any other custom green action you did today (e.g. used canvas bags):</label>
              <input
                type="text"
                placeholder="e.g. Planted a sapling, turned off power strip, did not use elevator..."
                value={customAction}
                onChange={(e) => setCustomAction(e.target.value)}
                className="form-input"
                style={{ background: 'rgba(16, 185, 129, 0.04)' }}
              />
              {customAction.trim() !== '' && (
                <span style={{ fontSize: '0.8rem', color: 'var(--primary-light)', marginTop: '0.35rem', display: 'block', fontWeight: '500' }}>
                  🌱 Custom action registered! Deducting 2.0 kg CO₂e from today's footprint.
                </span>
              )}
            </div>
          </div>

          {/* Save Button */}
          <button 
            onClick={handleSave} 
            className="btn-primary" 
            style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', display: 'flex', gap: '0.5rem', fontSize: '1.05rem', borderRadius: 'var(--radius-md)' }}
          >
            Calculate & Log Today's Footprint
          </button>
        </div>

        {/* Side Panel: Information/Instructions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>How it Works</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem' }}>
              Every day, log your activities before going to bed. We compile your transport fuel, electricity, meals, and waste sorting to calculate your exact carbon footprint in kilograms.
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              We track this data historically and render a weekly chart. Saving carbon sprouts virtual trees in your forest tab!
            </p>
          </div>
        </div>
      </div>

      {/* Popup Success message */}
      {showSuccess && lastCalculation && (
        <div className="glass-card animate-fade-in" style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          borderLeft: '4px solid var(--primary)',
          background: 'var(--bg-surface-solid)',
          boxShadow: '0 10px 45px rgba(2, 10, 5, 0.7)',
          padding: '1.25rem 2rem',
          maxWidth: '380px',
          zIndex: 1000,
        }}>
          <h3 style={{ color: 'var(--primary-light)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', marginBottom: '0.25rem' }}>
            <Check size={18} /> Footprint Logged!
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Your footprint today is <strong>{lastCalculation.footprint.toFixed(1)} kg CO₂e</strong>.
          </p>
          <div style={{ display: 'flex', gap: '0.50rem' }}>
            <span className="badge badge-success">-{lastCalculation.savings.toFixed(1)} kg saved</span>
            <span className="badge badge-success">+{lastCalculation.xp} XP</span>
          </div>
        </div>
      )}
    </div>
  );
};
