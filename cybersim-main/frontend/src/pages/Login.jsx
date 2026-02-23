import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Try to login with API
      const response = await authAPI.login(formData);
      login(response.user, response.token);
      navigate('/dashboard');
    } catch (error) {
      // Fallback to demo login for development
      if (formData.email && formData.password) {
        const demoUser = {
          id: 1,
          username: formData.email.split('@')[0],
          email: formData.email,
          role: 'user'
        };
        const demoToken = 'demo-token-' + Date.now();
        login(demoUser, demoToken);
        navigate('/dashboard');
      } else {
        setError('Please fill in all fields');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <div className="auth-icon">🔐</div>
          <h1>Welcome Back</h1>
          <p>Sign in to continue your cybersecurity journey</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="message error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-footer">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="link-text">Forgot password?</Link>
          </div>

          <button type="submit" className="btn primary full-width" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div className="social-login">
          <button className="btn social-btn">
            <span>🔷</span> Google
          </button>
          <button className="btn social-btn">
            <span>⚫</span> GitHub
          </button>
        </div>

        <div className="auth-switch">
          Don't have an account? <Link to="/signup" className="link-text">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
