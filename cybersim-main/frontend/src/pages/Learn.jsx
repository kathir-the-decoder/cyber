import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Learn() {
  const navigate = useNavigate();

  const attackLabs = [
    {
      id: 'sql-injection',
      title: 'SQL Injection',
      description: 'Learn to exploit SQL injection vulnerabilities in web applications',
      difficulty: 'Beginner',
      icon: '💉',
      path: '/attack/sql-injection'
    },
    {
      id: 'xss',
      title: 'Cross-Site Scripting (XSS)',
      description: 'Master XSS attacks and client-side code injection techniques',
      difficulty: 'Beginner',
      icon: '🔗',
      path: '/attack/xss'
    },
    {
      id: 'command-injection',
      title: 'Command Injection',
      description: 'Exploit command injection vulnerabilities to execute system commands',
      difficulty: 'Intermediate',
      icon: '⚡',
      path: '/attack/command-injection'
    },
    {
      id: 'directory-traversal',
      title: 'Directory Traversal',
      description: 'Access unauthorized files using path traversal techniques',
      difficulty: 'Intermediate',
      icon: '📁',
      path: '/attack/directory-traversal'
    },
    {
      id: 'pentest',
      title: 'Penetration Testing',
      description: 'Complete penetration testing methodology from recon to reporting',
      difficulty: 'Advanced',
      icon: '🎯',
      path: '/attack/pentest'
    }
  ];

  const defenseLabs = [
    {
      id: 'system-hardening',
      title: 'System Hardening',
      description: 'Essential steps to secure and harden your systems against cyber threats',
      difficulty: 'Beginner',
      icon: '🔒',
      path: '/defense/system-hardening'
    },
    {
      id: 'incident-response',
      title: 'Incident Response',
      description: 'Learn to respond to and manage security incidents effectively',
      difficulty: 'Intermediate',
      icon: '🚨',
      path: '/defense/incident-response'
    },
    {
      id: 'network-security',
      title: 'Network Security',
      description: 'Configure firewalls, IDS, and network monitoring for robust security',
      difficulty: 'Intermediate',
      icon: '🌐',
      path: '/defense/network-security'
    },
    {
      id: 'web-app-testing',
      title: 'Web Application Security Testing',
      description: 'Comprehensive guide to testing web applications for security vulnerabilities',
      difficulty: 'Advanced',
      icon: '🔍',
      path: '/defense/web-app-testing'
    },
    {
      id: 'malware-analysis',
      title: 'Malware Analysis & Detection',
      description: 'Learn to analyze, detect, and respond to malware threats',
      difficulty: 'Advanced',
      icon: '🦠',
      path: '/defense/malware-analysis'
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
    <div className="learn-container">
      <div className="learn-header">
        <h1>Cybersecurity Training Labs</h1>
        <p>Choose from our comprehensive collection of hands-on security labs</p>
      </div>

      {/* Attack Labs Section */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: '#ef4444' }}>⚔️ Attack Labs</h2>
          <span style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: '#ef4444', 
            padding: '0.25rem 0.75rem', 
            borderRadius: '1rem', 
            fontSize: '0.875rem',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            {attackLabs.length} Labs Available
          </span>
        </div>
        <div className="labs-grid">
          {attackLabs.map((lab) => (
            <div 
              key={lab.id}
              className="lab-card attack-card" 
              onClick={() => navigate(lab.path)}
              style={{ cursor: 'pointer' }}
            >
              <div className="lab-icon">{lab.icon}</div>
              <div className="lab-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{lab.title}</h3>
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
                <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.4' }}>
                  {lab.description}
                </p>
              </div>
              <button className="btn primary" style={{ marginTop: '1rem', width: '100%' }}>
                Start Lab
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Defense Labs Section */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: '#10b981' }}>🛡️ Defense Labs</h2>
          <span style={{ 
            background: 'rgba(16, 185, 129, 0.1)', 
            color: '#10b981', 
            padding: '0.25rem 0.75rem', 
            borderRadius: '1rem', 
            fontSize: '0.875rem',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            {defenseLabs.length} Labs Available
          </span>
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
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{lab.title}</h3>
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
                <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.4' }}>
                  {lab.description}
                </p>
              </div>
              <button className="btn primary" style={{ marginTop: '1rem', width: '100%' }}>
                Start Lab
              </button>
            </div>
          ))}
        </div>
      </section>
      
      <div className="learn-info">
        <div className="info-card">
          <div className="info-icon">🤖</div>
          <h3>AI-Powered Assistance</h3>
          <p>Get instant help and guidance throughout your learning journey</p>
        </div>
        <div className="info-card">
          <div className="info-icon">⚡</div>
          <h3>Real-Time Feedback</h3>
          <p>See immediate results and learn from your actions</p>
        </div>
        <div className="info-card">
          <div className="info-icon">🎯</div>
          <h3>Progressive Difficulty</h3>
          <p>Start from basics and advance at your own pace</p>
        </div>
      </div>
    </div>
  );
}

export default Learn;
