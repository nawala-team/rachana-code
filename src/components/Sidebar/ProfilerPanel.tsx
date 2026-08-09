import { useState, useEffect } from 'react';
import './ProfilerPanel.css';

interface Metric {
  name: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}

export default function ProfilerPanel() {
  const [recording, setRecording] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>([
    { name: 'CPU', value: 23, max: 100, unit: '%', color: '#61affe' },
    { name: 'Memory', value: 512, max: 2048, unit: 'MB', color: '#49cc90' },
    { name: 'Heap', value: 128, max: 512, unit: 'MB', color: '#fca130' },
    { name: 'FPS', value: 60, max: 60, unit: '', color: '#50e3c2' },
  ]);
  const [history, setHistory] = useState<number[][]>([[], [], [], []]);

  useEffect(() => {
    if (!recording) return;
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(m => ({
        ...m,
        value: Math.min(m.max, Math.max(0, m.value + (Math.random() - 0.5) * 20))
      })));
      setHistory(prev => prev.map((h, i) => [...h.slice(-29), metrics[i].value]));
    }, 500);
    return () => clearInterval(interval);
  }, [recording, metrics]);

  const getBarWidth = (m: Metric) => `${(m.value / m.max) * 100}%`;

  return (
    <div className="profiler-panel">
      <div className="profiler-header">
        <h3>⚡ Profiler</h3>
        <button onClick={() => setRecording(!recording)} className={`record-btn ${recording ? 'recording' : ''}`}>
          {recording ? '⏹ Stop' : '⏺ Record'}
        </button>
      </div>

      <div className="metrics-section">
        {metrics.map((m, i) => (
          <div key={m.name} className="metric-item">
            <div className="metric-header">
              <span className="metric-name">{m.name}</span>
              <span className="metric-value">{m.value.toFixed(0)}{m.unit}</span>
            </div>
            <div className="metric-bar">
              <div className="metric-fill" style={{ width: getBarWidth(m), background: m.color }} />
            </div>
            {history[i].length > 1 && (
              <div className="metric-sparkline">
                <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke={m.color}
                    strokeWidth="1.5"
                    points={history[i].map((v, j) => `${(j / 29) * 100},${20 - (v / m.max) * 20}`).join(' ')}
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="hotspots-section">
        <div className="section-title">🔥 Hot Functions</div>
        <div className="hotspot-item"><span>render()</span><span className="hotspot-time">45ms</span></div>
        <div className="hotspot-item"><span>parseJSON()</span><span className="hotspot-time">23ms</span></div>
        <div className="hotspot-item"><span>fetchData()</span><span className="hotspot-time">180ms</span></div>
        <div className="hotspot-item"><span>computeLayout()</span><span className="hotspot-time">12ms</span></div>
      </div>

      <div className="timeline-section">
        <div className="section-title">📊 Timeline</div>
        <div className="timeline-bar">
          <div className="timeline-segment js" style={{ width: '35%' }} title="JavaScript 35%" />
          <div className="timeline-segment render" style={{ width: '25%' }} title="Rendering 25%" />
          <div className="timeline-segment paint" style={{ width: '15%' }} title="Painting 15%" />
          <div className="timeline-segment idle" style={{ width: '25%' }} title="Idle 25%" />
        </div>
        <div className="timeline-legend">
          <span><i style={{ background: '#f7df1e' }} />JS</span>
          <span><i style={{ background: '#9b59b6' }} />Render</span>
          <span><i style={{ background: '#2ecc71' }} />Paint</span>
          <span><i style={{ background: '#95a5a6' }} />Idle</span>
        </div>
      </div>
    </div>
  );
}
