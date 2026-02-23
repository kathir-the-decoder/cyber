import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Defense.css";

export default function Defense() {
  const navigate = useNavigate();

  const defenseLabs = [
    {
      id: 'incident-response',
      title: 'Incident Response',
      description: 'Learn to respond to and manage security incidents effectively using industry-standard procedures',
      difficulty: 'Intermediate',
      icon: '🚨',
      path: '/defense/incident-response',
      features: ['6-phase IR lifecycle', 'Evidence collection', 'Team coordination', 'Reporting procedures']
    },
    {
      id: 'network-security',
      title: 'Network Security',
      description: 'Configure firewalls, IDS, and network monitoring for comprehensive security coverage',
      difficulty: 'Intermediate',
      icon: '🌐',
      path: '/defense/network-security',
      features: ['Firewall configuration', 'IDS/IPS setup', 'Network monitoring', 'VPN deployment']
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="defense-wrapper">
      <div className="defense-container">
        <div className="defense-header">
          <h1>🛡️ Defense Training Labs</h1>
          <p>Master defensive security practices and incident response strategies</p>
        </div>

        <div className="labs-grid">
          {defenseLabs.map((lab) => (
            <div 
              key={lab.id}
              className="lab-card defense-card" 
              onClick={() => navigate(lab.path)}
              style={{ cursor: 'pointer' }}
            >
              <div className="lab-icon">{lab.icon}</div>
              <div className="lab-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{lab.title}</h3>
                  <span style={{ 
                    color: getDifficultyColor(lab.difficulty),
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {lab.difficulty}
                  </span>
                </div>
                <p style={{ margin: '0 0 1rem 0', color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  {lab.description}
                </p>
                <ul className="lab-features">
                  {lab.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              <button className="btn primary" style={{ marginTop: '1.5rem', width: '100%' }}>
                Start Defense Lab
              </button>
            </div>
          ))}
        </div>

        <div className="defense-info">
          <div className="info-card">
            <div className="info-icon">🔍</div>
            <h3>Real-World Scenarios</h3>
            <p>Practice with realistic security incidents and network configurations</p>
          </div>
          <div className="info-card">
            <div className="info-icon">⚡</div>
            <h3>Interactive Learning</h3>
            <p>Hands-on terminal experience with immediate feedback and guidance</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📊</div>
            <h3>Progress Tracking</h3>
            <p>Monitor your completion status and track learning milestones</p>
          </div>
        </div>

        <div className="back-to-learn">
          <button 
            className="btn ghost" 
            onClick={() => navigate('/learn')}
            style={{ marginTop: '2rem' }}
          >
            ← Back to All Labs
          </button>
        </div>
      </div>
    </div>
  );
}
