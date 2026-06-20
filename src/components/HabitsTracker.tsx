import React, { useState } from 'react';
import { Plus, Zap, Award, Trash2, Calendar } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  category: 'energy' | 'transport' | 'food' | 'lifestyle';
  weeklySaving: number; // kg CO2e
  xpReward: number;
}

interface Action {
  id: string;
  name: string;
  saving: number; // kg CO2e
  xp: number;
  icon: string;
}

interface LogEntry {
  id: string;
  actionName: string;
  saving: number;
  xp: number;
  date: string;
}

interface HabitsTrackerProps {
  ecoPoints: number;
  streak: number;
  savedCarbon: number;
  logEntries: LogEntry[];
  onLogAction: (actionName: string, saving: number, xp: number) => void;
  onClearLog: () => void;
}

export const HabitsTracker: React.FC<HabitsTrackerProps> = ({
  ecoPoints,
  streak,
  savedCarbon,
  logEntries,
  onLogAction,
  onClearLog,
}) => {
  // Available long-term habits to commit to
  const habitsList: Habit[] = [
    { id: '1', name: 'Switch to LEDs & energy-saving lightbulbs', category: 'energy', weeklySaving: 3.0, xpReward: 30 },
    { id: '2', name: 'Lower thermostat by 1°C in winter', category: 'energy', weeklySaving: 5.8, xpReward: 50 },
    { id: '3', name: 'Walk/cycle for short distances under 2km', category: 'transport', weeklySaving: 3.5, xpReward: 40 },
    { id: '4', name: 'Go meat-free 3 days a week', category: 'food', weeklySaving: 7.7, xpReward: 60 },
    { id: '5', name: 'Compost organic kitchen waste', category: 'lifestyle', weeklySaving: 2.0, xpReward: 30 },
    { id: '6', name: 'Wash laundry on cold cycle & hang dry', category: 'energy', weeklySaving: 3.0, xpReward: 30 },
  ];

  // Quick action list to log today
  const actionsList: Action[] = [
    { id: 'a1', name: 'Ate a fully plant-based / vegan day', saving: 4.2, xp: 25, icon: '🥗' },
    { id: 'a2', name: 'Commuted by public transit (bus/train)', saving: 5.0, xp: 20, icon: '🚇' },
    { id: 'a3', name: 'Biked or walked instead of driving', saving: 3.5, xp: 30, icon: '🚲' },
    { id: 'a4', name: 'Avoided buying any new plastic packaging', saving: 1.0, xp: 15, icon: '🛍️' },
    { id: 'a5', name: 'Turned off household heating/AC for 2+ hours', saving: 2.0, xp: 15, icon: '🔌' },
    { id: 'a6', name: 'Composted and sorted household recycling', saving: 1.5, xp: 10, icon: '♻️' },
  ];

  const [activeHabits, setActiveHabits] = useState<string[]>(['1', '5']); // preselect default committed habits

  const toggleHabit = (id: string) => {
    if (activeHabits.includes(id)) {
      setActiveHabits(activeHabits.filter((h) => h !== id));
    } else {
      setActiveHabits([...activeHabits, id]);
    }
  };

  // Compute total weekly savings from active habits
  const totalWeeklyHabitsSaving = habitsList
    .filter((h) => activeHabits.includes(h.id))
    .reduce((sum, h) => sum + h.weeklySaving, 0);

  // Compute dynamic annual projection from active habits
  const annualHabitProjectionTonnes = (totalWeeklyHabitsSaving * 52) / 1000;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top Banner Stats */}
      <div className="glass-card grid-3" style={{ padding: '1.5rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span className="metric-label">Total Carbon Logged Savings</span>
          <span className="metric-value" style={{ color: 'var(--primary-light)' }}>
            {savedCarbon.toFixed(1)} <span style={{ fontSize: '1.25rem', fontWeight: '500' }}>kg</span>
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Direct, action-based reduction</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
          <span className="metric-label">Habits Weekly Save Rate</span>
          <span className="metric-value" style={{ color: 'var(--secondary)' }}>
            {totalWeeklyHabitsSaving.toFixed(1)} <span style={{ fontSize: '1.25rem', fontWeight: '500' }}>kg</span>
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Projected: ~{annualHabitProjectionTonnes.toFixed(2)} tonnes CO₂e/yr</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span className="metric-label">Streak Status</span>
          <span className="metric-value" style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
            <Zap fill="var(--accent)" size={28} /> {streak} Days
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Keep logging to build your streak!</span>
        </div>
      </div>

      <div className="grid-3-main">
        {/* Main Column: Quick Logs and Commited Habits */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Quick Action Logger */}
          <div className="glass-card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Log Today's Green Actions</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Did you take any eco-friendly steps today? Click below to instantly log them.
            </p>

            <div className="grid-2">
              {actionsList.map((action) => (
                <div 
                  key={action.id}
                  className="option-card"
                  style={{ justifyContent: 'space-between', padding: '1rem 1.25rem' }}
                  onClick={() => onLogAction(action.name, action.saving, action.xp)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{action.icon}</span>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '600' }}>{action.name}</h4>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.15rem' }}>
                        <span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: '600' }}>
                          -{action.saving} kg CO₂e
                        </span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                          •
                        </span>
                        <span style={{ color: 'var(--secondary)', fontSize: '0.75rem', fontWeight: '600' }}>
                          +{action.xp} XP
                        </span>
                      </div>
                    </div>
                  </div>
                  <div 
                    style={{ 
                      background: 'rgba(255,255,255,0.03)', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: '50%', 
                      width: '28px', 
                      height: '28px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}
                  >
                    <Plus size={16} color="var(--primary)" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Long Term Habits */}
          <div className="glass-card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Commit to Green Habits</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Select habits to incorporate into your lifestyle. We subtract these savings from your annual trajectory.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {habitsList.map((habit) => {
                const isSelected = activeHabits.includes(habit.id);
                return (
                  <div 
                    key={habit.id}
                    className={`option-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleHabit(habit.id)}
                  >
                    <div className="checkbox-circle" />
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{habit.name}</h4>
                        <span className="badge badge-info" style={{ fontSize: '0.65rem', marginTop: '0.25rem', padding: '0.1rem 0.4rem' }}>
                          {habit.category}
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'var(--primary-light)', fontWeight: '700', fontSize: '0.9rem' }}>
                          -{habit.weeklySaving.toFixed(1)} kg CO₂e / week
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                          +{habit.xpReward} XP Commited
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Sidebar: Action Log History & Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Action Log History */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', maxHeight: '420px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={18} color="var(--primary)" /> Activity Log
              </h2>
              {logEntries.length > 0 && (
                <button 
                  onClick={onClearLog} 
                  style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: '500' }}
                >
                  <Trash2 size={12} /> Clear
                </button>
              )}
            </div>

            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.25rem' }}>
              {logEntries.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No activities logged yet today. Click on any green action to start!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {logEntries.map((entry) => (
                    <div key={entry.id} className="log-item">
                      <div style={{ flex: 1, paddingRight: '0.5rem' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'white' }}>{entry.actionName}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{entry.date}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--primary-light)', fontWeight: '700' }}>-{entry.saving.toFixed(1)} kg</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--secondary)' }}>+{entry.xp} XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Unlockable Badges */}
          <div className="glass-card">
            <h2 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} color="var(--accent)" /> Achievements
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: ecoPoints >= 0 ? 1 : 0.4 }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--primary)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                  🌱
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '600' }}>Eco Starter</h4>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Unlock by completing calculations</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: ecoPoints >= 100 ? 1 : 0.4 }}>
                <div style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid var(--secondary)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                  🚲
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '600' }}>Low Carbon Commuter</h4>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Log transit / biking actions (100 XP)</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: ecoPoints >= 250 ? 1 : 0.4 }}>
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--accent)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                  🌲
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '600' }}>Planet Guardian</h4>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Reach 250 XP total carbon savings</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
