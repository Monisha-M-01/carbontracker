import { useState, useEffect } from 'react';
import { Leaf, Calendar, Trees } from 'lucide-react';
import { FallingLeaves } from './components/FallingLeaves';
import { DailyLogger } from './components/DailyLogger';
import { HistoryLog } from './components/HistoryLog';
import type { HistoryEntry } from './components/HistoryLog';
import { VirtualForest } from './components/VirtualForest';
import { EcoSapling } from './components/EcoSapling';
import { IntroModal } from './components/IntroModal';

const ECO_TIPS = [
  "Leaving heating/cooling on for just 2 hours less saves up to 2.4 kg of CO₂e, equivalent to growing 10% of a tree instantly!",
  "Choosing a plant-based meal over beef cuts your carbon emissions by 80% for that meal!",
  "Unplugging electronics when fully charged eliminates vampire power draw, saving up to 80kg of CO₂e per year.",
  "Drying clothes on a line instead of a dryer for 1 month saves 30kg of CO₂e, protecting your local canopy.",
  "A single 5-minute shorter shower saves 12 gallons of water and prevents 0.5kg of carbon from water heating.",
  "Walking or cycling for trips under 2 km prevents carbon emissions entirely and keeps you healthy!",
  "Sorting recyclable plastic, paper, and compost cuts your weekly landfill waste emissions by 40%."
];

const getDailyTip = () => {
  const day = new Date().getDate();
  return ECO_TIPS[day % ECO_TIPS.length];
};

function App() {
  // Intro overlay state
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Navigation tab: 'logger' | 'history' | 'forest'
  const [activeTab, setActiveTab] = useState<string>('logger');

  // Gamification & Log state
  const [ecoPoints, setEcoPoints] = useState<number>(180);
  const [streak, setStreak] = useState<number>(3);
  const [savedCarbon, setSavedCarbon] = useState<number>(45.5); // total carbon saved in kg
  const [history, setHistory] = useState<HistoryEntry[]>([]);


  // Load baseline if saved in localStorage, otherwise initialize with mock data for instant visualization!
  useEffect(() => {
    const savedPoints = localStorage.getItem('ecosphere_points');
    const savedStreak = localStorage.getItem('ecosphere_streak');
    const savedCarbonVal = localStorage.getItem('ecosphere_saved_carbon');
    const savedHistory = localStorage.getItem('ecosphere_history');
    // Always show intro screen like a heartbeat on login/page-load!
    setShowIntro(true);

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
      if (savedPoints) setEcoPoints(parseInt(savedPoints));
      if (savedStreak) setStreak(parseInt(savedStreak));
      if (savedCarbonVal) setSavedCarbon(parseFloat(savedCarbonVal));
    } else {
      // Mock history so the chart and forest look premium immediately!
      const mockHistory: HistoryEntry[] = [
        { id: 'h1', date: '2026-06-12', footprint: 16.2, savings: 1.8, xp: 25 },
        { id: 'h2', date: '2026-06-13', footprint: 12.4, savings: 5.6, xp: 45 },
        { id: 'h3', date: '2026-06-14', footprint: 15.0, savings: 3.0, xp: 30 },
        { id: 'h4', date: '2026-06-15', footprint: 8.8, savings: 9.2, xp: 75 },
        { id: 'h5', date: '2026-06-16', footprint: 11.2, savings: 6.8, xp: 55 },
      ];
      setHistory(mockHistory);
      setSavedCarbon(26.4); // sum of savings (1.8 + 5.6 + 3.0 + 9.2 + 6.8 = 26.4 kg)
      setEcoPoints(230);    // sum of xp (25 + 45 + 30 + 75 + 55 = 230 XP)
      setStreak(5);
      
      localStorage.setItem('ecosphere_history', JSON.stringify(mockHistory));
      localStorage.setItem('ecosphere_saved_carbon', '26.4');
      localStorage.setItem('ecosphere_points', '230');
      localStorage.setItem('ecosphere_streak', '5');
    }
  }, []);

  const handleSaveLog = (footprint: number, savings: number, xp: number) => {
    const todayStr = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
    
    // Check if we already logged today to either replace or add
    const existingIndex = history.findIndex((h) => h.date === todayStr);

    let updatedHistory = [...history];
    let carbonDifference = savings;
    let xpDifference = xp;

    if (existingIndex >= 0) {
      // Replace today's log if logging again
      const prev = history[existingIndex];
      carbonDifference = savings - prev.savings;
      xpDifference = xp - prev.xp;
      
      updatedHistory[existingIndex] = {
        id: prev.id,
        date: todayStr,
        footprint,
        savings,
        xp,
      };
    } else {
      // Append new daily log
      const newEntry: HistoryEntry = {
        id: Math.random().toString(36).substr(2, 9),
        date: todayStr,
        footprint,
        savings,
        xp,
      };
      updatedHistory = [newEntry, ...history];
      setStreak((prev) => prev + 1);
      localStorage.setItem('ecosphere_streak', (streak + 1).toString());
    }

    const newSavedCarbon = Math.max(0, savedCarbon + carbonDifference);
    const newPoints = Math.max(0, ecoPoints + xpDifference);

    setHistory(updatedHistory);
    setSavedCarbon(newSavedCarbon);
    setEcoPoints(newPoints);

    localStorage.setItem('ecosphere_history', JSON.stringify(updatedHistory));
    localStorage.setItem('ecosphere_saved_carbon', newSavedCarbon.toString());
    localStorage.setItem('ecosphere_points', newPoints.toString());
  };

  const handleResetHistory = () => {
    setShowResetConfirm(true);
  };

  const handleIntroComplete = (_pledgeId: string, bonusXp: number) => {
    setShowIntro(false);
    
    // Only award bonus XP if they haven't seen the intro yet in this browser's life
    const savedIntroSeen = localStorage.getItem('ecosphere_intro_seen');
    if (!savedIntroSeen) {
      localStorage.setItem('ecosphere_intro_seen', 'true');
      setEcoPoints((prev) => {
        const newPoints = prev + bonusXp;
        localStorage.setItem('ecosphere_points', newPoints.toString());
        return newPoints;
      });
    }
  };
  const todayStr = new Date().toISOString().split('T')[0];
  const todayLog = history.find((h) => h.date === todayStr);
  const todaySavings = todayLog ? todayLog.savings : 0;

  return (
    <>
      {/* Background visual components */}
      <FallingLeaves />
      <div className="blue-lightning-overlay" />

      {/* Floating tree mascot assistant */}
      <EcoSapling savedCarbon={savedCarbon} todaySavings={todaySavings} />

      {/* Interactive nature-themed startup modal */}
      {showIntro && (
        <IntroModal onComplete={handleIntroComplete} />
      )}

      {/* Nature-themed custom confirm modal */}
      {showResetConfirm && (
        <div className="nature-modal-backdrop" style={{ zIndex: 999999 }}>
          <div className="nature-modal-container" style={{ maxWidth: '420px', padding: '2.5rem 2rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem', color: '#f87171' }}>
              Clear Eco-Records?
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
              Are you sure you want to clear your daily footprint logs? This will permanently wipe your history, streak, and saved carbon.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => {
                  setHistory([]);
                  setSavedCarbon(0);
                  setEcoPoints(0);
                  setStreak(0);
                  localStorage.removeItem('ecosphere_history');
                  localStorage.removeItem('ecosphere_saved_carbon');
                  localStorage.removeItem('ecosphere_points');
                  localStorage.removeItem('ecosphere_streak');
                  localStorage.removeItem('ecosphere_intro_seen');
                  setShowIntro(true); // reset and show intro modal
                  setShowResetConfirm(false);
                }}
                className="btn-primary"
                style={{ background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', border: 'none', boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)' }}
              >
                Clear Records
              </button>
              <button 
                onClick={() => setShowResetConfirm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="app-container">
        {/* Header bar */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, #0d9488 100%)',
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
            }}>
              <Leaf size={24} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: '800', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
                Eco<span className="gradient-text">Sphere</span>
              </h1>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600' }}>
                Daily Footprint Logger
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={handleResetHistory}
              className="btn-secondary"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', display: 'flex', gap: '0.35rem', borderRadius: 'var(--radius-sm)' }}
              title="Reset All Logs History"
            >
              Clear Records
            </button>
          </div>
        </header>

        {/* Daily Eco Tip Banner - Distinct Amber Theme */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.22) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          boxShadow: '0 8px 32px rgba(245, 158, 11, 0.15)',
          padding: '1.2rem 1.8rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          <span style={{ fontSize: '1.75rem', filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))' }}>💡</span>
          <div>
            <strong style={{ color: '#fbbf24', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>
              Daily Eco Tip
            </strong>
            <span style={{ fontSize: '0.95rem', color: '#fef08a', fontWeight: '700', lineHeight: '1.4' }}>
              {getDailyTip()}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="nav-tabs">
          <button 
            className={`nav-tab-btn ${activeTab === 'logger' ? 'active' : ''}`}
            onClick={() => setActiveTab('logger')}
          >
            <Leaf size={16} /> Daily Logger
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <Calendar size={16} /> Logs History
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'forest' ? 'active' : ''}`}
            onClick={() => setActiveTab('forest')}
          >
            <Trees size={16} /> My Virtual Forest
          </button>
        </div>

        {/* Tab Panels */}
        <main style={{ flex: 1 }}>
          {activeTab === 'logger' && (
            <DailyLogger 
              onSaveLog={handleSaveLog} 
              streak={streak} 
            />
          )}
          {activeTab === 'history' && (
            <HistoryLog 
              history={history} 
              totalSavedCarbon={savedCarbon} 
            />
          )}
          {activeTab === 'forest' && (
            <VirtualForest 
              savedCarbon={savedCarbon} 
              ecoPoints={ecoPoints} 
            />
          )}
        </main>

        {/* Footer */}
        <footer style={{ marginTop: '4rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <p>© 2026 EcoSphere. Built on science-backed models (EPA, DEFRA, Science 2018). Live Lightly on Earth.</p>
        </footer>
      </div>
    </>
  );
}

export default App;

