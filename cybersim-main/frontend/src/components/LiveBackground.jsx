import React, { useEffect, useState } from 'react';

const LiveBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          animationDelay: Math.random() * 15,
          size: Math.random() * 4 + 2,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
      {/* Floating Particles */}
      <div className="cyber-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.animationDelay}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      {/* Scanning Lines */}
      <div className="scan-lines">
        <div className="scan-line" />
        <div className="scan-line" />
      </div>

      {/* Data Stream */}
      <div className="data-stream">
        <div className="data-column" />
        <div className="data-column" />
        <div className="data-column" />
        <div className="data-column" />
        <div className="data-column" />
        <div className="data-column" />
      </div>

      {/* Matrix-style Code Rain */}
      <div className="code-rain">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="code-column"
            style={{
              left: `${i * 8}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {['01', '10', '11', '00', '01', '10', '11', '00'].map((code, j) => (
              <span key={j} className="code-char">
                {code}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Cyber Hexagons */}
      <div className="cyber-hexagons">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="hexagon"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Network Connections */}
      <div className="network-lines">
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 212, 255, 0)" />
              <stop offset="50%" stopColor="rgba(0, 212, 255, 0.8)" />
              <stop offset="100%" stopColor="rgba(0, 212, 255, 0)" />
            </linearGradient>
          </defs>
          <line
            x1="10%"
            y1="20%"
            x2="90%"
            y2="80%"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            className="network-line"
          />
          <line
            x1="20%"
            y1="70%"
            x2="80%"
            y2="30%"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            className="network-line"
            style={{ animationDelay: '3s' }}
          />
          <line
            x1="5%"
            y1="50%"
            x2="95%"
            y2="50%"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            className="network-line"
            style={{ animationDelay: '6s' }}
          />
        </svg>
      </div>
    </div>
  );
};

export default LiveBackground;