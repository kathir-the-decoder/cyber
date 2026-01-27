import React, { useState } from 'react';
import './Support.css';

export default function Support() {
  const [activeTab, setActiveTab] = useState('help');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    category: 'technical',
    subject: '',
    message: '',
    platform: 'website'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setContactForm({
        name: '',
        email: '',
        category: 'technical',
        subject: '',
        message: '',
        platform: 'website'
      });
    }, 2000);
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const faqData = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click the "Join Elite" button in the top navigation, fill out the registration form with your details, and verify your email address.'
        },
        {
          q: 'What are the system requirements?',
          a: 'Website: Modern browser (Chrome, Firefox, Safari, Edge). Mobile: iOS 12+ or Android 8+. Stable internet connection required.'
        },
        {
          q: 'Is CyberSim Elite free to use?',
          a: 'We offer both free and premium tiers. Free accounts have access to basic labs, while premium unlocks advanced scenarios and certifications.'
        }
      ]
    },
    {
      category: 'Training Labs',
      questions: [
        {
          q: 'How do I start a training lab?',
          a: 'Navigate to Training Labs, select your desired lab (Attack or Defense), and click "Start Lab". Follow the on-screen instructions.'
        },
        {
          q: 'Can I save my progress?',
          a: 'Yes! Your progress is automatically saved. You can resume labs from where you left off in your Dashboard.'
        },
        {
          q: 'What if a lab is not working?',
          a: 'Try refreshing the page first. If issues persist, check your internet connection and contact support with the lab name and error details.'
        }
      ]
    },
    {
      category: 'Account & Billing',
      questions: [
        {
          q: 'How do I upgrade to premium?',
          a: 'Go to your Profile page and click "Upgrade to Elite Pro". Choose your plan and complete the secure payment process.'
        },
        {
          q: 'Can I cancel my subscription?',
          a: 'Yes, you can cancel anytime from your Profile settings. You\'ll retain access until the end of your billing period.'
        },
        {
          q: 'How do I reset my password?',
          a: 'Click "Forgot Password" on the login page, enter your email, and follow the reset instructions sent to your inbox.'
        }
      ]
    }
  ];

  const supportChannels = [
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7 for Premium users, 9AM-6PM EST for Free users',
      action: 'Start Chat',
      status: 'online'
    },
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 24 hours',
      action: 'Send Email',
      status: 'available'
    },
    {
      icon: '📚',
      title: 'Knowledge Base',
      description: 'Comprehensive guides and tutorials',
      availability: 'Always available',
      action: 'Browse Docs',
      status: 'available'
    }
  ];

  return (
    <div className="support-container">
      {/* Header */}
      <div className="support-header">
        <div className="header-content">
          <h1>🛡️ Elite Support Center</h1>
          <p>Get help with CyberSim Elite cybersecurity training platform</p>
          <div className="platform-badges">
            <span className="platform-badge web">🌐 Website</span>
            <span className="platform-badge status">🟢 All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* Support Tabs */}
      <div className="support-tabs">
        <button 
          className={`tab-button ${activeTab === 'help' ? 'active' : ''}`}
          onClick={() => setActiveTab('help')}
        >
          <span className="tab-icon">❓</span>
          Help & FAQ
        </button>
        <button 
          className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          <span className="tab-icon">📞</span>
          Contact Support
        </button>
        <button 
          className={`tab-button ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          <span className="tab-icon">📚</span>
          Resources
        </button>
        <button 
          className={`tab-button ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => setActiveTab('status')}
        >
          <span className="tab-icon">⚡</span>
          System Status
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Help & FAQ Tab */}
        {activeTab === 'help' && (
          <div className="help-section">
            <div className="quick-help">
              <h2>Quick Help</h2>
              <div className="help-cards">
                {supportChannels.map((channel, index) => (
                  <div key={index} className="help-card">
                    <div className="help-card-header">
                      <span className="help-icon">{channel.icon}</span>
                      <div className="help-info">
                        <h3>{channel.title}</h3>
                        <p>{channel.description}</p>
                      </div>
                      <div className={`status-indicator ${channel.status}`}></div>
                    </div>
                    <div className="help-card-body">
                      <p className="availability">{channel.availability}</p>
                      <button className="btn primary small">{channel.action}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="faq-section">
              <h2>Frequently Asked Questions</h2>
              {faqData.map((category, categoryIndex) => (
                <div key={categoryIndex} className="faq-category">
                  <h3 className="category-title">{category.category}</h3>
                  <div className="faq-items">
                    {category.questions.map((item, itemIndex) => (
                      <details key={itemIndex} className="faq-item">
                        <summary className="faq-question">{item.q}</summary>
                        <div className="faq-answer">{item.a}</div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Support Tab */}
        {activeTab === 'contact' && (
          <div className="contact-section">
            <div className="contact-header">
              <h2>Contact Our Support Team</h2>
              <p>We're here to help with any questions about CyberSim Elite</p>
            </div>

            {submitStatus === 'success' && (
              <div className="success-message">
                <span className="success-icon">✅</span>
                <div>
                  <h3>Message Sent Successfully!</h3>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="platform">Platform</label>
                  <select
                    id="platform"
                    name="platform"
                    value={contactForm.platform}
                    onChange={handleInputChange}
                  >
                    <option value="website">🌐 Website</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={contactForm.category}
                    onChange={handleInputChange}
                  >
                    <option value="technical">🔧 Technical Issue</option>
                    <option value="account">👤 Account & Billing</option>
                    <option value="labs">🧪 Training Labs</option>
                    <option value="feature">💡 Feature Request</option>
                    <option value="other">❓ Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Brief description of your issue"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Please provide detailed information about your issue or question..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn primary large"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">📤</span>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="resources-section">
            <h2>Support Resources</h2>
            
            <div className="resources-grid">
              <div className="resource-card">
                <div className="resource-icon">📖</div>
                <h3>User Guide</h3>
                <p>Complete guide to using CyberSim Elite on web and mobile</p>
                <button className="btn ghost">View Guide</button>
              </div>

              <div className="resource-card">
                <div className="resource-icon">🎥</div>
                <h3>Video Tutorials</h3>
                <p>Step-by-step video guides for all features</p>
                <button className="btn ghost">Watch Videos</button>
              </div>

              <div className="resource-card">
                <div className="resource-icon">🔧</div>
                <h3>Troubleshooting</h3>
                <p>Common issues and their solutions</p>
                <button className="btn ghost">Fix Issues</button>
              </div>

              <div className="resource-card">
                <div className="resource-icon">🎓</div>
                <h3>Training Materials</h3>
                <p>Additional cybersecurity learning resources</p>
                <button className="btn ghost">Learn More</button>
              </div>

              <div className="resource-card">
                <div className="resource-icon">💬</div>
                <h3>Community Forum</h3>
                <p>Connect with other cybersecurity professionals</p>
                <button className="btn ghost">Join Forum</button>
              </div>
            </div>

          </div>
        )}

        {/* System Status Tab */}
        {activeTab === 'status' && (
          <div className="status-section">
            <h2>System Status</h2>
            
            <div className="status-overview">
              <div className="status-card operational">
                <div className="status-indicator"></div>
                <div className="status-info">
                  <h3>All Systems Operational</h3>
                  <p>All services are running normally</p>
                </div>
              </div>
            </div>

            <div className="services-status">
              <h3>Service Status</h3>
              <div className="service-list">
                <div className="service-item">
                  <div className="service-info">
                    <span className="service-name">🌐 Website Platform</span>
                    <span className="service-description">Main web application</span>
                  </div>
                  <div className="service-status operational">
                    <span className="status-dot"></span>
                    Operational
                  </div>
                </div>

                <div className="service-item">
                  <div className="service-info">
                    <span className="service-name">🧪 Training Labs</span>
                    <span className="service-description">Interactive lab environments</span>
                  </div>
                  <div className="service-status operational">
                    <span className="status-dot"></span>
                    Operational
                  </div>
                </div>

                <div className="service-item">
                  <div className="service-info">
                    <span className="service-name">👤 User Authentication</span>
                    <span className="service-description">Login and account services</span>
                  </div>
                  <div className="service-status operational">
                    <span className="status-dot"></span>
                    Operational
                  </div>
                </div>

                <div className="service-item">
                  <div className="service-info">
                    <span className="service-name">💾 Data Sync</span>
                    <span className="service-description">Cross-platform synchronization</span>
                  </div>
                  <div className="service-status operational">
                    <span className="status-dot"></span>
                    Operational
                  </div>
                </div>
              </div>
            </div>

            <div className="uptime-stats">
              <h3>Uptime Statistics</h3>
              <div className="uptime-grid">
                <div className="uptime-card">
                  <div className="uptime-value">99.9%</div>
                  <div className="uptime-label">Last 30 Days</div>
                </div>
                <div className="uptime-card">
                  <div className="uptime-value">99.8%</div>
                  <div className="uptime-label">Last 90 Days</div>
                </div>
                <div className="uptime-card">
                  <div className="uptime-value">99.7%</div>
                  <div className="uptime-label">Last Year</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}