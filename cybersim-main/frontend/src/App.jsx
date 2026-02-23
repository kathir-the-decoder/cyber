import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import LiveBackground from './components/LiveBackground';
import ChatButton from './components/ChatButton';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopOnRouteChange from './components/ScrollToTopOnRouteChange';
import SingleAttackSession from './attacks/atk1';
import XSSLab from './attacks/xss';
import CommandInjectionLab from './attacks/command-injection';
import DirectoryTraversalLab from './attacks/directory-traversal';
import PentestLab from './attacks/pentest';
import IncidentResponseLab from './defense/incident-response';
import NetworkSecurityLab from './defense/network-security';
import SystemHardeningLab from './defense/system-hardening';
import WebAppTestingLab from './defense/web-app-testing';
import MalwareAnalysisLab from './defense/malware-analysis';
import Landing from './pages/Landing';
import Learn from './pages/Learn';
import Defense from './pages/Defense';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Articles from './pages/Articles';
import ArticleView from './pages/ArticleView';
import Support from './pages/Support';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/');
  };

  // Close profile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.user-profile-menu')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <nav className="top-nav">
      <div className="brand">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="brand-text"> CyberSim Elite</span>
        </Link>
      </div>
      <div className="nav-actions">
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
        <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>Command Center</Link>
        <Link to="/learn" className={`nav-link ${location.pathname.startsWith('/learn') || 
                                          location.pathname.startsWith('/attack') || 
                                          location.pathname.startsWith('/defense') ? 'active' : ''}`}>
          Training Labs
        </Link>
        <Link to="/articles" className={`nav-link ${isActive('/articles') ? 'active' : ''}`}>Intel Base</Link>
        <Link to="/support" className={`nav-link ${isActive('/support') ? 'active' : ''}`}>Support</Link>
        
        {/* User Profile or Login/Signup */}
        {isAuthenticated && user ? (
          <div className="user-profile-menu">
            <button 
              className="profile-button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="profile-avatar">
                {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="profile-name">{user.username || 'Agent'}</span>
              <span className="profile-arrow">▼</span>
            </button>
            
            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <div className="profile-header">
                    <div className="profile-avatar-large">
                      {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="profile-details">
                      <div className="profile-username">{user.username || 'Agent'}</div>
                      <div className="profile-email">{user.email || 'agent@cybersim.com'}</div>
                      <div className="profile-rank">Elite Operative</div>
                    </div>
                  </div>
                </div>
                
                <div className="profile-menu-items">
                  <Link 
                    to="/profile" 
                    className="profile-menu-item"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <span className="menu-icon">👤</span>
                    View Profile
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="profile-menu-item"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <span className="menu-icon">📊</span>
                    Command Center
                  </Link>
                  <div className="menu-divider"></div>
                  <button 
                    className="profile-menu-item logout-item"
                    onClick={handleLogout}
                  >
                    <span className="menu-icon">🚪</span>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="nav-link">Access</Link>
            <Link to="/signup" className="nav-link login">Join Elite</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  // Ensure page starts at top on load
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="root">
      <LiveBackground />
      <ScrollToTopOnRouteChange />
      <Navigation />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleView />} />
          <Route path="/support" element={<Support />} />
          <Route path="/learn" element={<Learn />} />
            
            {/* Attack Labs */}
            <Route 
              path="/attack" 
              element={
                <main style={{ paddingTop: '1.25rem' }}>
                  <SingleAttackSession onClose={() => window.location.href = '/learn'} />
                </main>
              } 
            />
            <Route 
              path="/attack/sql-injection" 
              element={
                <main style={{ paddingTop: '1.25rem' }}>
                  <SingleAttackSession onClose={() => window.location.href = '/learn'} />
                </main>
              } 
            />
            <Route 
              path="/attack/xss" 
              element={
                <main style={{ paddingTop: '1.25rem' }}>
                  <XSSLab onClose={() => window.location.href = '/learn'} />
                </main>
              } 
            />
            <Route 
              path="/attack/command-injection" 
              element={
                <main style={{ paddingTop: '1.25rem' }}>
                  <CommandInjectionLab onClose={() => window.location.href = '/learn'} />
                </main>
              } 
            />
            <Route 
              path="/attack/directory-traversal" 
              element={
                <main style={{ paddingTop: '1.25rem' }}>
                  <DirectoryTraversalLab onClose={() => window.location.href = '/learn'} />
                </main>
              } 
            />
            <Route 
              path="/attack/pentest" 
              element={
                <main style={{ paddingTop: '1.25rem' }}>
                  <PentestLab onClose={() => window.location.href = '/learn'} />
                </main>
              } 
            />
            
            {/* Defense Labs */}
            <Route path="/defense" element={<Defense />} />
            <Route 
              path="/defense/system-hardening" 
              element={
                <main style={{ paddingTop: '1.25rem' }}>
                  <SystemHardeningLab onClose={() => window.location.href = '/learn'} />
                </main>
              } 
            />
            <Route 
              path="/defense/incident-response" 
              element={
                <main style={{ paddingTop: '1.25rem' }}>
                  <IncidentResponseLab onClose={() => window.location.href = '/learn'} />
                </main>
              } 
            />
            <Route 
              path="/defense/network-security" 
              element={
                <main style={{ paddingTop: '1.25rem' }}>
                  <NetworkSecurityLab onClose={() => window.location.href = '/learn'} />
                </main>
              } 
            />
            <Route 
              path="/defense/web-app-testing" 
              element={
                <main style={{ paddingTop: '1.25rem' }}>
                  <WebAppTestingLab onClose={() => window.location.href = '/learn'} />
                </main>
              } 
            />
            <Route 
              path="/defense/malware-analysis" 
              element={
                <main style={{ paddingTop: '1.25rem' }}>
                  <MalwareAnalysisLab onClose={() => window.location.href = '/learn'} />
                </main>
              } 
            />
          </Routes>
        </div>
        <ChatButton />
        <ScrollToTop />
      </div>
    );
  }

export default App;