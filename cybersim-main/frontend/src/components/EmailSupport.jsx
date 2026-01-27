import React, { useState } from 'react';
import '../styles/EmailSupport.css';

export default function EmailSupport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'technical',
    message: '',
    priority: 'normal',
    attachmentInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const categories = [
    { value: 'technical', label: '🔧 Technical Issue', icon: '⚙️' },
    { value: 'account', label: '👤 Account & Billing', icon: '💳' },
    { value: 'labs', label: '🧪 Training Labs', icon: '📊' },
    { value: 'feature', label: '💡 Feature Request', icon: '⭐' },
    { value: 'feedback', label: '📢 General Feedback', icon: '💬' },
    { value: 'other', label: '❓ Other', icon: '🤔' }
  ];

  const priorities = [
    { value: 'low', label: '🟢 Low - General question', icon: '⬇️' },
    { value: 'normal', label: '🔵 Normal - Standard support', icon: '→' },
    { value: 'high', label: '🟠 High - Important issue', icon: '⬆️' },
    { value: 'urgent', label: '🔴 Urgent - Blocking issue', icon: '⚠️' }
  ];

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    } else if (formData.subject.length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length < 20) {
      errors.message = 'Message must be at least 20 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: `✅ Email sent successfully! We'll respond within ${
            formData.priority === 'urgent' ? '2-4 hours' :
            formData.priority === 'high' ? '4-8 hours' :
            '24 hours'
          }.`
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: 'technical',
          message: '',
          priority: 'normal',
          attachmentInfo: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: `❌ ${data.message || 'Failed to send email. Please try again.'}`
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({
        type: 'error',
        message: '❌ Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="email-support-container">
      {/* Header */}
      <div className="email-header">
        <div className="header-icon">✉️</div>
        <h2>Send us an Email</h2>
        <p>Detailed support for issues that need more attention</p>
      </div>

      {/* Info Banner */}
      <div className="email-info-banner">
        <div className="info-item">
          <span className="info-icon">⏱️</span>
          <div>
            <strong>Response Time</strong>
            <p>Typically within 24 hours</p>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">🎯</span>
          <div>
            <strong>Priority Handling</strong>
            <p>Set priority for faster response</p>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">📧</span>
          <div>
            <strong>Confirmation</strong>
            <p>Get email with ticket number</p>
          </div>
        </div>
      </div>

      {/* Success/Error Message */}
      {submitStatus && (
        <div className={`status-message ${submitStatus.type}`}>
          <span className="status-icon">
            {submitStatus.type === 'success' ? '✅' : '❌'}
          </span>
          <div className="status-content">
            <p>{submitStatus.message}</p>
            {submitStatus.type === 'success' && (
              <small>📧 Check your email for a ticket confirmation</small>
            )}
          </div>
          <button
            className="close-status"
            onClick={() => setSubmitStatus(null)}
          >
            ✕
          </button>
        </div>
      )}

      {/* Form */}
      <form className="email-form" onSubmit={handleSubmit}>
        {/* Name and Email Row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
              className={formErrors.name ? 'error' : ''}
            />
            {formErrors.name && (
              <span className="error-message">{formErrors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className={formErrors.email ? 'error' : ''}
            />
            {formErrors.email && (
              <span className="error-message">{formErrors.email}</span>
            )}
          </div>
        </div>

        {/* Category and Priority Row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="category-select"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority *</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="priority-select"
            >
              {priorities.map(pri => (
                <option key={pri.value} value={pri.value}>
                  {pri.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subject */}
        <div className="form-group">
          <label htmlFor="subject">Subject *</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Brief subject line"
            className={formErrors.subject ? 'error' : ''}
          />
          {formErrors.subject && (
            <span className="error-message">{formErrors.subject}</span>
          )}
          <small className="char-count">
            {formData.subject.length}/100 characters
          </small>
        </div>

        {/* Message */}
        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Describe your issue or question in detail. Include any error messages, steps to reproduce, or relevant information."
            rows="7"
            className={formErrors.message ? 'error' : ''}
          />
          {formErrors.message && (
            <span className="error-message">{formErrors.message}</span>
          )}
          <small className="char-count">
            {formData.message.length}/5000 characters
          </small>
        </div>

        {/* Additional Info */}
        <div className="form-group">
          <label htmlFor="attachmentInfo">Additional Information (Optional)</label>
          <textarea
            id="attachmentInfo"
            name="attachmentInfo"
            value={formData.attachmentInfo}
            onChange={handleInputChange}
            placeholder="Screenshots descriptions, system info, etc. (Note: For files, please attach them separately or describe the issue in the main message)"
            rows="3"
          />
          <small>
            💡 Tip: Describe any error messages or unusual behavior you encountered
          </small>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner"></span>
                Sending Email...
              </>
            ) : (
              <>
                <span className="btn-icon">📨</span>
                Send Email
              </>
            )}
          </button>

          <button
            type="reset"
            className="btn btn-secondary"
            onClick={() => {
              setFormData({
                name: '',
                email: '',
                subject: '',
                category: 'technical',
                message: '',
                priority: 'normal',
                attachmentInfo: ''
              });
              setFormErrors({});
            }}
          >
            Clear Form
          </button>
        </div>

        {/* Form Tips */}
        <div className="form-tips">
          <h4>💡 Tips for Better Support</h4>
          <ul>
            <li>Be specific and detailed in your description</li>
            <li>Include error messages if applicable</li>
            <li>Mention what you were trying to do</li>
            <li>Set appropriate priority level</li>
            <li>Check your email for responses</li>
          </ul>
        </div>
      </form>

      {/* FAQ Section */}
      <div className="email-faq">
        <h3>Email Support FAQs</h3>
        <div className="faq-items">
          <details className="faq-item">
            <summary>How long does it take to get a response?</summary>
            <p>Response times depend on priority: Urgent (2-4 hours), High (4-8 hours), Normal (24 hours), Low (2-3 days). Premium users get priority handling.</p>
          </details>

          <details className="faq-item">
            <summary>Can I attach files to my email?</summary>
            <p>Currently, please describe any files or errors in detail in your message. For sensitive information, we recommend using the Live Chat for immediate assistance or contacting support@cybersim.com directly.</p>
          </details>

          <details className="faq-item">
            <summary>Will I get a ticket number?</summary>
            <p>Yes! You'll receive a confirmation email with your ticket number. Use this to reference your issue in future communications.</p>
          </details>

          <details className="faq-item">
            <summary>How can I track my email status?</summary>
            <p>Check your email for updates. Your ticket number allows us to track your issue. You can also reference it in follow-up emails.</p>
          </details>

          <details className="faq-item">
            <summary>What if I need urgent help?</summary>
            <p>For urgent issues, set priority to "Urgent" and consider using Live Chat for immediate assistance. Premium members get 24/7 priority support.</p>
          </details>

          <details className="faq-item">
            <summary>Can I email directly?</summary>
            <p>Yes! You can also contact support@cybersim.com directly. Using this form helps us track and organize your request more efficiently.</p>
          </details>
        </div>
      </div>
    </div>
  );
}
