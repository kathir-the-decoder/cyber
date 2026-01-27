import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalLabs: 0,
    completedLabs: 0,
    attackLabs: 0,
    defenseLabs: 0,
    totalScore: 0,
    streak: 0,
    rank: 'Recruit'
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [dailyProgress, setDailyProgress] = useState([]);
  const [activeTraining, setActiveTraining] = useState([]);
  const [systemStatus, setSystemStatus] = useState({});
  const [loading, setLoading] = useState(true);

  // Mock data for enhanced monitoring dashboard
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUser({
        name: 'Agent Phoenix',
        email: 'phoenix@cybersim.elite',
        role: 'Security Analyst',
        joinDate: '2024-01-15',
        avatar: '🕵️‍♂️',
        clearanceLevel: 'Level 3',
        operativeId: 'CSE-2024-001'
      });

      setStats({
        totalLabs: 12,
        completedLabs: 8,
        attackLabs: 5,
        defenseLabs: 3,
        totalScore: 1850,
        streak: 15,
        rank: 'Elite Operative',
        todayScore: 320,
        weeklyGoal: 500,
        efficiency: 87
      });

      // Daily progress tracking
      setDailyProgress([
        { date: '2024-01-26', labs: 2, score: 320, time: 145 },
        { date: '2024-01-25', labs: 1, score: 200, time: 90 },
        { date: '2024-01-24', labs: 3, score: 450, time: 180 },
        { date: '2024-01-23', labs: 1, score: 150, time: 75 },
        { date: '2024-01-22', labs: 2, score: 300, time: 120 },
        { date: '2024-01-21', labs: 1, score: 170, time: 85 },
        { date: '2024-01-20', labs: 4, score: 520, time: 210 }
      ]);

      // Active training sessions
      setActiveTraining([
        {
          id: 1,
          labName: 'Advanced SQL Injection',
          type: 'attack',
          progress: 65,
          timeSpent: 45,
          estimatedTime: 70,
          status: 'in-progress',
          lastActivity: '2024-01-26T10:30:00Z'
        },
        {
          id: 2,
          labName: 'Network Security Hardening',
          type: 'defense',
          progress: 30,
          timeSpent: 25,
          estimatedTime: 85,
          status: 'paused',
          lastActivity: '2024-01-25T16:45:00Z'
        }
      ]);

      // System monitoring status
      setSystemStatus({
        labEnvironments: 'online',
        networkLatency: 12,
        systemLoad: 23,
        activeUsers: 1247,
        completedToday: 89,
        averageScore: 78
      });

      setRecentActivity([
        {
          id: 1,
          type: 'lab_started',
          title: 'Advanced SQL Injection',
          category: 'attack',
          timestamp: '2024-01-26T10:30:00Z',
          status: 'active'
        },
        {
          id: 2,
          type: 'lab_completed',
          title: 'Malware Analysis & Detection',
          category: 'defense',
          score: 200,
          timestamp: '2024-01-26T09:15:00Z',
          status: 'completed'
        },
        {
          id: 3,
          type: 'achievement_earned',
          title: 'Elite Streak Achievement',
          timestamp: '2024-01-25T14:30:00Z',
          status: 'achievement'
        },
        {
          id: 4,
          type: 'lab_completed',
          title: 'Web Application Security Testing',
          category: 'defense',
          score: 170,
          timestamp: '2024-01-24T16:45:00Z',
          status: 'completed'
        },
        {
          id: 5,
          type: 'training_milestone',
          title: 'Completed 50% of Defense Track',
          timestamp: '2024-01-23T11:20:00Z',
          status: 'milestone'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getProgressPercentage = () => {
    return Math.round((stats.completedLabs / stats.totalLabs) * 100);
  };

  const getRankColor = (rank) => {
    const colors = {
      'Recruit': '#10b981',
      'Specialist': '#3b82f6',
      'Elite Operative': '#8b5cf6',
      'Expert': '#f59e0b',
      'Legend': '#ef4444'
    };
    return colors[rank] || '#6b7280';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type) => {
    const icons = {
      'lab_started': '🚀',
      'lab_completed': '✅',
      'lab_paused': '⏸️',
      'achievement_earned': '🏆',
      'training_milestone': '🎯',
      'skill_unlocked': '🔓'
    };
    return icons[type] || '📊';
  };

  const getStatusColor = (status) => {
    const colors = {
      'online': '#10b981',
      'warning': '#f59e0b',
      'error': '#ef4444',
      'maintenance': '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Initializing Command Center...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Enhanced Header with Real-time Status */}
      <div className="dashboard-header">
        <div className="user-welcome">
          <div className="user-avatar">{user.avatar}</div>
          <div className="user-info">
            <h1>Command Center - {user.name}</h1>
            <p>Operative ID: {user.operativeId} • Clearance: {user.clearanceLevel}</p>
            <div className="system-status-indicators">
              <div className="status-indicator online">
                <div className="status-dot online"></div>
                Training Systems Online
              </div>
              <div className="status-indicator online">
                <div className="status-dot online"></div>
                Lab Environments Ready
              </div>
              <div className="status-indicator online">
                <div className="status-dot online"></div>
                Monitoring Active
              </div>
            </div>
          </div>
        </div>
        <div className="quick-actions">
          <Link to="/learn" className="btn primary">
            <span className="btn-icon">⚡</span>
            Deploy to Training
          </Link>
          <Link to="/articles" className="btn ghost">
            <span className="btn-icon">📊</span>
            Intel Reports
          </Link>
        </div>
      </div>

      {/* Real-time System Monitoring */}
      <div className="system-monitoring">
        <div className="monitoring-card">
          <div className="monitoring-icon">🌐</div>
          <div className="monitoring-content">
            <div className="monitoring-value">{systemStatus.activeUsers}</div>
            <div className="monitoring-label">Active Operatives</div>
          </div>
        </div>
        <div className="monitoring-card">
          <div className="monitoring-icon">⚡</div>
          <div className="monitoring-content">
            <div className="monitoring-value">{systemStatus.networkLatency}ms</div>
            <div className="monitoring-label">Network Latency</div>
          </div>
        </div>
        <div className="monitoring-card">
          <div className="monitoring-icon">💻</div>
          <div className="monitoring-content">
            <div className="monitoring-value">{systemStatus.systemLoad}%</div>
            <div className="monitoring-label">System Load</div>
          </div>
        </div>
        <div className="monitoring-card">
          <div className="monitoring-icon">🎯</div>
          <div className="monitoring-content">
            <div className="monitoring-value">{systemStatus.completedToday}</div>
            <div className="monitoring-label">Labs Completed Today</div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-number">{stats.completedLabs}</div>
            <div className="stat-label">Missions Completed</div>
            <div className="stat-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              <span className="progress-text">{getProgressPercentage()}% Complete</span>
            </div>
          </div>
        </div>

        <div className="stat-card score">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-number">{stats.todayScore}</div>
            <div className="stat-label">Today's Score</div>
            <div className="stat-subtitle">Weekly Goal: {stats.weeklyGoal}</div>
          </div>
        </div>

        <div className="stat-card streak">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <div className="stat-number">{stats.streak}</div>
            <div className="stat-label">Day Streak</div>
            <div className="stat-subtitle">Keep it going!</div>
          </div>
        </div>

        <div className="stat-card efficiency">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-number">{stats.efficiency}%</div>
            <div className="stat-label">Efficiency</div>
            <div className="stat-subtitle">Above Average</div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="dashboard-content">
        {/* Active Training Sessions */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>🚀 Active Training Sessions</h2>
            <div className="section-actions">
              <Link to="/learn" className="section-link">Start New Training →</Link>
            </div>
          </div>
          
          <div className="active-training-list">
            {activeTraining.length > 0 ? (
              activeTraining.map((session) => (
                <div key={session.id} className={`training-session ${session.status}`}>
                  <div className="session-info">
                    <div className="session-header">
                      <h3>{session.labName}</h3>
                      <div className={`session-type ${session.type}`}>
                        {session.type === 'attack' ? '⚔️ Red Team' : '🛡️ Blue Team'}
                      </div>
                    </div>
                    <div className="session-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${session.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{session.progress}% Complete</span>
                    </div>
                    <div className="session-time">
                      Time: {session.timeSpent}min / {session.estimatedTime}min
                    </div>
                  </div>
                  <div className="session-actions">
                    {session.status === 'in-progress' ? (
                      <Link to={`/${session.type}/${session.labName.toLowerCase().replace(/\s+/g, '-')}`} className="btn primary small">
                        Continue
                      </Link>
                    ) : (
                      <Link to={`/${session.type}/${session.labName.toLowerCase().replace(/\s+/g, '-')}`} className="btn ghost small">
                        Resume
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-active-training">
                <div className="empty-state-icon">🎯</div>
                <h3>No Active Training Sessions</h3>
                <p>Start a new lab to begin monitoring your progress</p>
                <Link to="/learn" className="btn primary">Browse Training Labs</Link>
              </div>
            )}
          </div>
        </div>

        {/* Daily Progress Chart */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>📊 Daily Progress Monitoring</h2>
            <div className="time-filter">
              <button className="filter-btn active">7 Days</button>
              <button className="filter-btn">30 Days</button>
            </div>
          </div>
          
          <div className="progress-chart">
            <div className="chart-container">
              {dailyProgress.map((day, index) => (
                <div key={index} className="chart-bar">
                  <div 
                    className="bar-fill" 
                    style={{ height: `${(day.score / 600) * 100}%` }}
                    title={`${day.score} points`}
                  ></div>
                  <div className="bar-label">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color score"></div>
                <span>Daily Score</span>
              </div>
              <div className="legend-item">
                <div className="legend-color labs"></div>
                <span>Labs Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>📡 Live Activity Monitor</h2>
            <div className="activity-status">
              <div className="status-dot online"></div>
              <span>Real-time</span>
            </div>
          </div>
          
          <div className="activity-feed">
            {recentActivity.map((activity) => (
              <div key={activity.id} className={`activity-item ${activity.status}`}>
                <div className="activity-icon">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="activity-content">
                  <div className="activity-title">
                    {activity.type === 'lab_started' && `Started: ${activity.title}`}
                    {activity.type === 'lab_completed' && `Completed: ${activity.title}`}
                    {activity.type === 'achievement_earned' && `Achievement: ${activity.title}`}
                    {activity.type === 'training_milestone' && `Milestone: ${activity.title}`}
                  </div>
                  <div className="activity-meta">
                    {activity.score && (
                      <span className="activity-score">+{activity.score} points</span>
                    )}
                    {activity.category && (
                      <span className={`activity-category ${activity.category}`}>
                        {activity.category === 'attack' ? 'Red Team' : 'Blue Team'}
                      </span>
                    )}
                    <span className="activity-time">{formatTime(activity.timestamp)}</span>
                  </div>
                </div>
                <div className="activity-status-indicator">
                  {activity.status === 'active' && <div className="pulse-dot"></div>}
                  {activity.status === 'completed' && <div className="check-mark">✓</div>}
                  {activity.status === 'achievement' && <div className="trophy-icon">🏆</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Recommendations */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>🎯 Recommended Training</h2>
            <Link to="/learn" className="section-link">View All →</Link>
          </div>
          
          <div className="recommended-labs">
            <div className="lab-card">
              <div className="lab-type defense">Blue Team</div>
              <div className="lab-content">
                <h3>System Hardening Fundamentals</h3>
                <p>Essential security hardening techniques for Linux systems</p>
                <div className="lab-meta">
                  <span className="lab-difficulty beginner">Beginner</span>
                  <span className="lab-duration">45 min</span>
                  <span className="lab-score">+150 pts</span>
                </div>
              </div>
              <Link to="/defense/system-hardening" className="btn primary small">Start Lab</Link>
            </div>

            <div className="lab-card">
              <div className="lab-type attack">Red Team</div>
              <div className="lab-content">
                <h3>Advanced XSS Exploitation</h3>
                <p>Master cross-site scripting attack techniques</p>
                <div className="lab-meta">
                  <span className="lab-difficulty intermediate">Intermediate</span>
                  <span className="lab-duration">60 min</span>
                  <span className="lab-score">+200 pts</span>
                </div>
              </div>
              <Link to="/attack/xss" className="btn primary small">Start Lab</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}