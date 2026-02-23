import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon"></span>
            <span>Powered by Elite Cybersecurity Team</span>
          </div>
          <h1 className="hero-title">
            Elite Cybersecurity Training
            <span className="gradient-text"> Platform</span>
          </h1>
          <p className="hero-description">
            Master advanced cybersecurity techniques through hands-on simulations designed by industry experts. 
            Train like a professional, think like a hacker, defend like a guardian.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn primary large">
              <span className="btn-icon">⚡</span>
              Begin Training
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/learn" className="btn ghost large">
              <span className="play-icon">🎯</span>
              Explore Labs
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">7+</div>
              <div className="stat-label">Advanced Labs</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Expert Support</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Hands-On</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          {/* Animated Terminal Windows */}
          <div className="terminal-window terminal-1">
            <div style={{ marginTop: '1rem' }}>
              <div style={{ color: '#00ff00' }}>$ nmap -sS target.local</div>
              <div style={{ color: '#ffbd2e' }}>Scanning... 22/tcp open</div>
              <div style={{ color: '#00ff00' }}>$ exploit/multi/handler</div>
              <div style={{ color: '#ff5f56' }}>Session opened!</div>
            </div>
          </div>
          
          <div className="terminal-window terminal-2">
            <div style={{ marginTop: '1rem' }}>
              <div style={{ color: '#27ca3f' }}>SIEM Alert: Suspicious Activity</div>
              <div style={{ color: '#ffbd2e' }}>Source: 192.168.1.100</div>
              <div style={{ color: '#ff5f56' }}>Threat Level: HIGH</div>
              <div style={{ color: '#00ff00' }}>Initiating response...</div>
            </div>
          </div>
          
          <div className="terminal-window terminal-3">
            <div style={{ marginTop: '1rem' }}>
              <div style={{ color: '#00ff00' }}>$ sqlmap -u "target.com"</div>
              <div style={{ color: '#ffbd2e' }}>Injection found!</div>
              <div style={{ color: '#27ca3f' }}>Database: mysql</div>
              <div style={{ color: '#ff5f56' }}>Extracting data...</div>
            </div>
          </div>

          <div className="floating-card card-1">
            <div className="card-icon">🛡️</div>
            <div className="card-title">Defense Operations</div>
            <div className="card-desc">Incident Response & Network Security</div>
            <div className="card-glow"></div>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">⚔️</div>
            <div className="card-title">Offensive Security</div>
            <div className="card-desc">Penetration Testing & Exploitation</div>
            <div className="card-glow"></div>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">🎯</div>
            <div className="card-title">Threat Hunting</div>
            <div className="card-desc">Advanced Detection Techniques</div>
            <div className="card-glow"></div>
          </div>
          <div className="cyber-grid"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-badge">Training Arsenal</span>
          <h2>Professional-Grade Cybersecurity Labs</h2>
          <p>Comprehensive training modules designed by cybersecurity professionals</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Advanced Penetration Testing</h3>
            <p>Master the complete pentest methodology from reconnaissance to reporting with realistic target environments.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🚨</div>
            <h3>Incident Response Training</h3>
            <p>Practice the 6-phase IR lifecycle with simulated security breaches and real-world scenarios.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Network Security Hardening</h3>
            <p>Configure firewalls, IDS/IPS systems, and implement comprehensive network monitoring solutions.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💉</div>
            <h3>Web Application Exploitation</h3>
            <p>Exploit SQL injection, XSS, command injection, and directory traversal vulnerabilities safely.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-Time Analytics</h3>
            <p>Track your progress with detailed metrics and performance analytics across all training modules.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎖️</div>
            <h3>Professional Certification</h3>
            <p>Earn industry-recognized certifications and build a portfolio of practical cybersecurity skills.</p>
          </div>
        </div>
      </section>

      {/* Training Paths */}
      <section className="training-paths">
        <div className="section-header">
          <span className="section-badge">Specialization Tracks</span>
          <h2>Choose Your Cybersecurity Path</h2>
        </div>
        
        <div className="paths-container">
          <div className="path-card red-team">
            <div className="path-header">
              <div className="path-icon">⚔️</div>
              <h3>Red Team Operations</h3>
              <div className="path-badge">Offensive</div>
            </div>
            <div className="path-content">
              <p>Master offensive cybersecurity techniques and ethical hacking methodologies.</p>
              <ul className="path-skills">
                <li>Penetration Testing</li>
                <li>Web Application Security</li>
                <li>Network Exploitation</li>
                <li>Social Engineering</li>
                <li>Advanced Persistent Threats</li>
              </ul>
              <Link to="/learn" className="path-cta">Start Red Team Training →</Link>
            </div>
          </div>
          
          <div className="path-card blue-team">
            <div className="path-header">
              <div className="path-icon">🛡️</div>
              <h3>Blue Team Defense</h3>
              <div className="path-badge">Defensive</div>
            </div>
            <div className="path-content">
              <p>Develop advanced defensive security and incident response capabilities.</p>
              <ul className="path-skills">
                <li>Incident Response</li>
                <li>Network Security Monitoring</li>
                <li>Threat Hunting</li>
                <li>Digital Forensics</li>
                <li>Security Architecture</li>
              </ul>
              <Link to="/learn" className="path-cta">Start Blue Team Training →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-header">
          <span className="section-badge">Expert Team</span>
          <h2>Built by Cybersecurity Professionals</h2>
          <p>Our platform is designed and maintained by industry experts with decades of combined experience</p>
        </div>
        
        <div className="team-stats">
          <div className="team-stat">
            <div className="stat-icon">🎯</div>
            <div className="stat-number">15+</div>
            <div className="stat-label">Years Combined Experience</div>
          </div>
          <div className="team-stat">
            <div className="stat-icon">🏆</div>
            <div className="stat-number">50+</div>
            <div className="stat-label">Security Certifications</div>
          </div>
          <div className="team-stat">
            <div className="stat-icon">🔒</div>
            <div className="stat-number">1000+</div>
            <div className="stat-label">Security Assessments</div>
          </div>
          <div className="team-stat">
            <div className="stat-icon">🌟</div>
            <div className="stat-number">24/7</div>
            <div className="stat-label">Expert Support</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Join the Elite?</h2>
          <p>Transform your cybersecurity skills with professional-grade training</p>
          <div className="cta-actions">
            <Link to="/signup" className="btn primary large">
              <span className="btn-icon">🚀</span>
              Begin Elite Training
            </Link>
            <Link to="/articles" className="btn ghost large">
              <span className="btn-icon">📚</span>
              Browse Knowledge Base
            </Link>
          </div>
          <div className="cta-note">
            <span>🔒 Secure • Professional • Industry-Recognized</span>
          </div>
        </div>
      </section>
    </div>
  );
}
