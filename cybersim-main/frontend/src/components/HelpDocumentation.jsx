import React, { useState } from 'react';

const HelpDocumentation = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const documentationSections = {
    'getting-started': {
      title: '🚀 Getting Started',
      content: [
        {
          title: 'Creating Your Account',
          steps: [
            'Click "Join Elite" in the top navigation',
            'Fill out the registration form with your details',
            'Verify your email address',
            'Complete your profile setup',
            'Start your first training lab!'
          ]
        },
        {
          title: 'Navigating the Platform',
          steps: [
            'Dashboard: Your mission control center',
            'Training Labs: Interactive cybersecurity scenarios',
            'Intel Base: Articles and learning resources',
            'Profile: Track your progress and achievements'
          ]
        }
      ]
    },
    'training-labs': {
      title: '🧪 Training Labs',
      content: [
        {
          title: 'Starting a Lab',
          steps: [
            'Go to Training Labs from the main navigation',
            'Choose between Attack Labs (Red Team) or Defense Labs (Blue Team)',
            'Select a lab based on your skill level',
            'Click "Start Lab" to begin the interactive session',
            'Follow the on-screen instructions and objectives'
          ]
        },
        {
          title: 'Lab Interface',
          steps: [
            'Terminal: Interactive command-line interface',
            'Objectives: Your mission goals and checkpoints',
            'Hints: Available if you get stuck',
            'Progress: Track your completion status',
            'Submit: Complete the lab and earn points'
          ]
        },
        {
          title: 'Available Lab Types',
          steps: [
            'SQL Injection: Learn database attack techniques',
            'XSS (Cross-Site Scripting): Master web application attacks',
            'Command Injection: Execute system commands',
            'Directory Traversal: Access unauthorized files',
            'Penetration Testing: Complete security assessments',
            'Incident Response: Handle security breaches',
            'Network Security: Configure defensive systems'
          ]
        }
      ]
    },
    'account-management': {
      title: '👤 Account Management',
      content: [
        {
          title: 'Profile Settings',
          steps: [
            'Access your profile from the top navigation',
            'Update personal information and preferences',
            'Change your password or email address',
            'Set notification preferences',
            'View your learning statistics and achievements'
          ]
        },
        {
          title: 'Subscription Management',
          steps: [
            'Free tier includes basic labs and articles',
            'Premium tier unlocks advanced labs and certifications',
            'Upgrade from your profile page',
            'Cancel subscription anytime (access continues until period ends)',
            'Billing history available in account settings'
          ]
        }
      ]
    },
    'troubleshooting': {
      title: '🔧 Troubleshooting',
      content: [
        {
          title: 'Common Issues',
          steps: [
            'Labs not loading: Check internet connection and refresh page',
            'Login problems: Verify credentials and clear browser cache',
            'Progress not saving: Ensure you\'re logged in and complete objectives',
            'Mobile sync issues: Check internet connection and pull to refresh',
            'Performance issues: Close other browser tabs and restart browser'
          ]
        },
        {
          title: 'Browser Requirements',
          steps: [
            'Chrome 90+ (recommended)',
            'Firefox 88+',
            'Safari 14+',
            'Edge 90+',
            'JavaScript must be enabled',
            'Cookies must be allowed for login functionality'
          ]
        }
      ]
    }
  };

  return (
    <div className="help-documentation">
      <div className="help-sidebar">
        <h3>📚 Help Topics</h3>
        <nav className="help-nav">
          {Object.entries(documentationSections).map(([key, section]) => (
            <button
              key={key}
              className={`help-nav-item ${activeSection === key ? 'active' : ''}`}
              onClick={() => setActiveSection(key)}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>

      <div className="help-content">
        <div className="help-section">
          <h2>{documentationSections[activeSection].title}</h2>
          
          {documentationSections[activeSection].content.map((topic, index) => (
            <div key={index} className="help-topic">
              <h3>{topic.title}</h3>
              <ol className="help-steps">
                {topic.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="help-step">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <div className="help-footer">
          <div className="help-contact">
            <h4>Still need help?</h4>
            <p>Contact our support team for personalized assistance</p>
            <div className="help-actions">
              <button className="btn primary">Contact Support</button>
              <button className="btn ghost">Live Chat</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpDocumentation;