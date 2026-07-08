import React from 'react';
import { Calendar } from 'lucide-react';

export interface HistoryEntry {
  id: string;
  date: string;
  footprint: number; // in kg CO2e
  savings: number; // in kg CO2e
  xp: number;
}

interface HistoryLogProps {
  history: HistoryEntry[];
  totalSavedCarbon: number;
}

export const HistoryLog: React.FC<HistoryLogProps> = ({ history, totalSavedCarbon }) => {
  // Take last 7 days for the chart
  const chartEntries = [...history].reverse().slice(-7);
  const maxFootprint = Math.max(...chartEntries.map((e) => e.footprint), 15);

  // SVG dimensions
  const chartHeight = 180;
  const chartWidth = 500;
  const padding = 30;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Overview Stat row */}
      <div className="glass-card history-container-card grid-3" style={{ padding: '1.5rem', textAlign: 'center' }}>
        <div>
          <span className="metric-label">Total Days Logged</span>
          <span className="metric-value" style={{ color: 'white' }}>
            {history.length} <span style={{ fontSize: '1.25rem', fontWeight: '500' }}>days</span>
          </span>
        </div>

        <div className="metric-cell-bordered">
          <span className="metric-label">Lifetime CO₂e Saved</span>
          <span className="metric-value" style={{ color: 'var(--primary-light)' }}>
            {totalSavedCarbon.toFixed(1)} <span style={{ fontSize: '1.25rem', fontWeight: '500' }}>kg</span>
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Compared to standard baseline</span>
        </div>

        <div className="metric-cell">
          <span className="metric-label">Avg Footprint</span>
          <span className="metric-value" style={{ color: 'var(--secondary)' }}>
            {(history.reduce((sum, e) => sum + e.footprint, 0) / Math.max(1, history.length)).toFixed(1)} <span style={{ fontSize: '1.25rem', fontWeight: '500' }}>kg</span>
          </span>
        </div>
      </div>

      <div className="grid-3-main">
        {/* SVG Trend Chart */}
        <div className="glass-card history-container-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Calendar color="var(--primary)" size={20} />
            <h2>Carbon Footprint Trend</h2>
          </div>

          {chartEntries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
              Log at least one day's activities to see your trend chart.
            </div>
          ) : (
            <div className="chart-wrapper">
              <svg 
                viewBox={`0 0 ${chartWidth} ${chartHeight + padding}`} 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              >
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary-light)" />
                    <stop offset="100%" stopColor="var(--primary)" />
                  </linearGradient>
                  <linearGradient id="gridGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(16, 185, 129, 0.03)" />
                    <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
                  const y = padding + (chartHeight - padding) * (1 - pct);
                  return (
                    <g key={idx}>
                      <line 
                        x1={padding} 
                        y1={y} 
                        x2={chartWidth - padding} 
                        y2={y} 
                        stroke="rgba(16, 185, 129, 0.08)" 
                        strokeWidth="1" 
                        strokeDasharray="4 4"
                      />
                      <text 
                        x={padding - 5} 
                        y={y + 4} 
                        fill="var(--text-muted)" 
                        fontSize="9" 
                        textAnchor="end"
                      >
                        {(maxFootprint * pct).toFixed(0)} kg
                      </text>
                    </g>
                  );
                })}

                {/* Bars */}
                {chartEntries.map((entry, idx) => {
                  const spacing = (chartWidth - padding * 2) / Math.max(1, chartEntries.length);
                  const barWidth = Math.min(32, spacing - 15);
                  const x = padding + idx * spacing + (spacing - barWidth) / 2;
                  
                  const barHeight = (entry.footprint / maxFootprint) * (chartHeight - padding);
                  const y = chartHeight - barHeight;

                  return (
                    <g key={entry.id}>
                      {/* Bar Background Glow */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        rx="4"
                        fill="rgba(16, 185, 129, 0.05)"
                      />
                      {/* Actual Bar */}
                      <rect
                        className="chart-bar"
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        rx="4"
                        fill="url(#barGrad)"
                      />
                      {/* Footprint Value Text */}
                      <text
                        x={x + barWidth / 2}
                        y={y - 6}
                        fill="white"
                        fontSize="9"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        {entry.footprint.toFixed(0)}
                      </text>
                      {/* X-axis Label */}
                      <text
                        x={x + barWidth / 2}
                        y={chartHeight + 18}
                        fill="var(--text-secondary)"
                        fontSize="9"
                        textAnchor="middle"
                      >
                        {entry.date.substring(5)} {/* formats 'YYYY-MM-DD' to 'MM-DD' */}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          )}
        </div>

        {/* History Log List */}
        <div className="glass-card history-container-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Daily Logs History</h2>
          
          <div style={{ overflowY: 'auto', maxHeight: '260px' }}>
            {history.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No records found. Submit today's log to create history!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {history.map((entry) => (
                  <div key={entry.id} className="log-item">
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'white' }}>
                        {entry.date}
                      </div>
                      <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.25rem' }}>
                        <span className="badge badge-success" style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem' }}>
                          -{entry.savings.toFixed(1)} kg saved
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--primary-light)' }}>
                        {entry.footprint.toFixed(1)} kg
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>
                        +{entry.xp} XP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
