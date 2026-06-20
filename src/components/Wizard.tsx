import React, { useState } from 'react';
import { Home, Car, Utensils, ShoppingBag, ArrowRight, ArrowLeft, Leaf } from 'lucide-react';

export interface FootprintData {
  householdMembers: number;
  electricity: number; // kWh/month
  heatingType: 'gas' | 'oil' | 'lpg' | 'none';
  heatingUsage: number; // liters or m3/month
  vehicleType: 'petrol' | 'diesel' | 'hybrid' | 'ev' | 'none';
  vehicleDistance: number; // km/week
  publicDistance: number; // km/week
  shortFlights: number; // per year
  longFlights: number; // per year
  dietType: 'high-meat' | 'average' | 'flexitarian' | 'vegetarian' | 'vegan';
  recycleHabits: 'active' | 'partial' | 'none';
  shoppingHabits: 'minimalist' | 'average' | 'heavy';
}

interface WizardProps {
  onComplete: (data: FootprintData) => void;
}

export const Wizard: React.FC<WizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FootprintData>({
    householdMembers: 2,
    electricity: 300,
    heatingType: 'gas',
    heatingUsage: 100,
    vehicleType: 'petrol',
    vehicleDistance: 150,
    publicDistance: 50,
    shortFlights: 2,
    longFlights: 1,
    dietType: 'average',
    recycleHabits: 'partial',
    shoppingHabits: 'average',
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateField = (key: keyof FootprintData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="glass-card animate-fade-in" style={{ maxWidth: '680px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Leaf size={28} color="var(--primary)" />
          <h1 style={{ fontSize: '1.75rem' }}>Calculate Your Baseline</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          Answer a few questions to get your personalized carbon baseline.
        </p>
      </div>

      {/* Progress nodes */}
      <div className="wizard-steps">
        <div className={`wizard-step-node ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
          {step > 1 ? '✓' : '1'}
        </div>
        <div className={`wizard-step-node ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
          {step > 2 ? '✓' : '2'}
        </div>
        <div className={`wizard-step-node ${step === 3 ? 'active' : step > 3 ? 'completed' : ''}`}>
          {step > 3 ? '✓' : '3'}
        </div>
        <div className={`wizard-step-node ${step === 4 ? 'active' : ''}`}>
          4
        </div>
      </div>

      {/* STEP 1: HOUSEHOLD ENERGY */}
      {step === 1 && (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Home color="var(--primary)" size={24} />
            <h2>Step 1: Household Energy</h2>
          </div>

          <div className="slider-container">
            <div className="slider-header">
              <span className="form-label">Household Size</span>
              <span className="slider-value">{formData.householdMembers} {formData.householdMembers === 1 ? 'person' : 'people'}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.householdMembers}
              onChange={(e) => updateField('householdMembers', parseInt(e.target.value))}
              className="custom-slider"
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Your home emissions will be divided among household members.
            </p>
          </div>

          <div className="slider-container">
            <div className="slider-header">
              <span className="form-label">Monthly Electricity Consumption</span>
              <span className="slider-value">{formData.electricity} kWh</span>
            </div>
            <input
              type="range"
              min="50"
              max="1200"
              step="50"
              value={formData.electricity}
              onChange={(e) => updateField('electricity', parseInt(e.target.value))}
              className="custom-slider"
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Average home consumes about 300-600 kWh/month depending on climate.
            </p>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Heating Fuel Type</label>
              <select
                value={formData.heatingType}
                onChange={(e) => updateField('heatingType', e.target.value)}
                className="form-select"
              >
                <option value="gas">Natural Gas</option>
                <option value="oil">Heating Oil</option>
                <option value="lpg">LPG (Propane)</option>
                <option value="none">Electric / None</option>
              </select>
            </div>

            {formData.heatingType !== 'none' && (
              <div className="form-group">
                <label className="form-label">
                  Monthly Heating Fuel Usage ({formData.heatingType === 'gas' ? 'm³' : 'liters'})
                </label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={formData.heatingUsage}
                  onChange={(e) => updateField('heatingUsage', Math.max(0, parseInt(e.target.value) || 0))}
                  className="form-input"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: TRANSPORTATION */}
      {step === 2 && (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Car color="var(--primary)" size={24} />
            <h2>Step 2: Transportation</h2>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Primary Vehicle Type</label>
              <select
                value={formData.vehicleType}
                onChange={(e) => updateField('vehicleType', e.target.value)}
                className="form-select"
              >
                <option value="petrol">Petrol (Gasoline)</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Hybrid</option>
                <option value="ev">Electric Vehicle (EV)</option>
                <option value="none">No personal car / Don't drive</option>
              </select>
            </div>

            {formData.vehicleType !== 'none' && (
              <div className="slider-container">
                <div className="slider-header">
                  <span className="form-label">Weekly Distance Driven</span>
                  <span className="slider-value">{formData.vehicleDistance} km</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="800"
                  step="10"
                  value={formData.vehicleDistance}
                  onChange={(e) => updateField('vehicleDistance', parseInt(e.target.value))}
                  className="custom-slider"
                />
              </div>
            )}
          </div>

          <div className="slider-container">
            <div className="slider-header">
              <span className="form-label">Weekly Public Transit (Bus/Train)</span>
              <span className="slider-value">{formData.publicDistance} km</span>
            </div>
            <input
              type="range"
              min="0"
              max="400"
              step="10"
              value={formData.publicDistance}
              onChange={(e) => updateField('publicDistance', parseInt(e.target.value))}
              className="custom-slider"
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Short flights per year (&lt; 3 hrs)</label>
              <input
                type="number"
                min="0"
                max="50"
                value={formData.shortFlights}
                onChange={(e) => updateField('shortFlights', Math.max(0, parseInt(e.target.value) || 0))}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Long flights per year (&gt; 3 hrs)</label>
              <input
                type="number"
                min="0"
                max="50"
                value={formData.longFlights}
                onChange={(e) => updateField('longFlights', Math.max(0, parseInt(e.target.value) || 0))}
                className="form-input"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: DIET & FOOD */}
      {step === 3 && (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Utensils color="var(--primary)" size={24} />
            <h2>Step 3: Food & Diet</h2>
          </div>

          <div className="form-group">
            <label className="form-label">Select the diet that matches you closest:</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div 
                className={`option-card ${formData.dietType === 'high-meat' ? 'selected' : ''}`}
                onClick={() => updateField('dietType', 'high-meat')}
              >
                <div className="checkbox-circle" />
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>High Meat Diet</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>You eat red meat (beef, lamb) almost daily (~8.0 kg CO₂e/day)</p>
                </div>
              </div>

              <div 
                className={`option-card ${formData.dietType === 'average' ? 'selected' : ''}`}
                onClick={() => updateField('dietType', 'average')}
              >
                <div className="checkbox-circle" />
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Average Diet</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Balanced meat, poultry, dairy, and veggies (~5.5 kg CO₂e/day)</p>
                </div>
              </div>

              <div 
                className={`option-card ${formData.dietType === 'flexitarian' ? 'selected' : ''}`}
                onClick={() => updateField('dietType', 'flexitarian')}
              >
                <div className="checkbox-circle" />
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Low Meat / Flexitarian</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Rarely eat red meat; focus on poultry, fish, and greens (~3.8 kg CO₂e/day)</p>
                </div>
              </div>

              <div 
                className={`option-card ${formData.dietType === 'vegetarian' ? 'selected' : ''}`}
                onClick={() => updateField('dietType', 'vegetarian')}
              >
                <div className="checkbox-circle" />
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Vegetarian</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>No meat or fish; consume dairy and eggs (~2.8 kg CO₂e/day)</p>
                </div>
              </div>

              <div 
                className={`option-card ${formData.dietType === 'vegan' ? 'selected' : ''}`}
                onClick={() => updateField('dietType', 'vegan')}
              >
                <div className="checkbox-circle" />
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Vegan</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>100% plant-based diet, no animal products (~1.8 kg CO₂e/day)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: CONSUMPTION & WASTE */}
      {step === 4 && (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <ShoppingBag color="var(--primary)" size={24} />
            <h2>Step 4: Consumption & Lifestyle</h2>
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">How actively do you recycle?</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div 
                className={`option-card ${formData.recycleHabits === 'active' ? 'selected' : ''}`}
                style={{ flex: 1, flexDirection: 'column', textAlign: 'center', padding: '1.25rem 0.5rem' }}
                onClick={() => updateField('recycleHabits', 'active')}
              >
                <div className="checkbox-circle" style={{ marginBottom: '0.5rem' }} />
                <h3 style={{ fontSize: '0.95rem' }}>Active</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Separate paper, glass, plastic, food waste</p>
              </div>

              <div 
                className={`option-card ${formData.recycleHabits === 'partial' ? 'selected' : ''}`}
                style={{ flex: 1, flexDirection: 'column', textAlign: 'center', padding: '1.25rem 0.5rem' }}
                onClick={() => updateField('recycleHabits', 'partial')}
              >
                <div className="checkbox-circle" style={{ marginBottom: '0.5rem' }} />
                <h3 style={{ fontSize: '0.95rem' }}>Partial</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Recycle sometimes / cardboard only</p>
              </div>

              <div 
                className={`option-card ${formData.recycleHabits === 'none' ? 'selected' : ''}`}
                style={{ flex: 1, flexDirection: 'column', textAlign: 'center', padding: '1.25rem 0.5rem' }}
                onClick={() => updateField('recycleHabits', 'none')}
              >
                <div className="checkbox-circle" style={{ marginBottom: '0.5rem' }} />
                <h3 style={{ fontSize: '0.95rem' }}>Do Not Recycle</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>All waste goes to trash</p>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Which describes your shopping habits best?</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div 
                className={`option-card ${formData.shoppingHabits === 'minimalist' ? 'selected' : ''}`}
                style={{ flex: 1, flexDirection: 'column', textAlign: 'center', padding: '1.25rem 0.5rem' }}
                onClick={() => updateField('shoppingHabits', 'minimalist')}
              >
                <div className="checkbox-circle" style={{ marginBottom: '0.5rem' }} />
                <h3 style={{ fontSize: '0.95rem' }}>Minimalist</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Only buy essentials, second-hand goods</p>
              </div>

              <div 
                className={`option-card ${formData.shoppingHabits === 'average' ? 'selected' : ''}`}
                style={{ flex: 1, flexDirection: 'column', textAlign: 'center', padding: '1.25rem 0.5rem' }}
                onClick={() => updateField('shoppingHabits', 'average')}
              >
                <div className="checkbox-circle" style={{ marginBottom: '0.5rem' }} />
                <h3 style={{ fontSize: '0.95rem' }}>Average</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Buy new things occasionally, standard consumer</p>
              </div>

              <div 
                className={`option-card ${formData.shoppingHabits === 'heavy' ? 'selected' : ''}`}
                style={{ flex: 1, flexDirection: 'column', textAlign: 'center', padding: '1.25rem 0.5rem' }}
                onClick={() => updateField('shoppingHabits', 'heavy')}
              >
                <div className="checkbox-circle" style={{ marginBottom: '0.5rem' }} />
                <h3 style={{ fontSize: '0.95rem' }}>Heavy Consumer</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Frequently purchase new electronics, fashion, goods</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Button Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
        {step > 1 ? (
          <button onClick={handlePrev} className="btn-secondary">
            <ArrowLeft size={16} /> Back
          </button>
        ) : (
          <div /> // placeholder
        )}
        <button onClick={handleNext} className="btn-primary">
          {step === 4 ? 'Finish Calculation' : 'Continue'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
