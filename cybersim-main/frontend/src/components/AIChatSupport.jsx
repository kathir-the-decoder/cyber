import React, { useState, useRef, useEffect } from 'react';
import './AIChatSupport.css';

export default function AIChatSupport({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: "👋 Hi! I'm CyberSim AI Assistant. I can help you with training labs, account issues, technical support, and cybersecurity questions. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI Response Logic (simulated - replace with actual API call)
  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // SQL Injection specific
    if (lowerMessage.includes('sql injection') || lowerMessage.includes('sql inject')) {
      return "🎯 **SQL Injection Learning Path:**\n\n**Step 1: Read the Article**\n• Go to Intel Base → Attack Techniques\n• Read 'Introduction to SQL Injection'\n\n**Step 2: Practice in Lab**\n• Go to Training Labs → Attack Labs\n• Start the SQL Injection simulation\n• Follow the step-by-step guide\n\n**Step 3: Key Concepts**\n• Understanding database queries\n• Finding injection points\n• Bypassing authentication\n• Extracting data\n\n**Quick Start:** Click 'Training Labs' in the menu, then select 'SQL Injection' under Attack Labs!\n\nNeed help with a specific part?";
    }
    
    // Training Labs
    if (lowerMessage.includes('lab') || lowerMessage.includes('training') || lowerMessage.includes('simulation')) {
      return "🧪 **Training Labs Help:**\n\nWe offer multiple cybersecurity labs:\n\n**Attack Labs:**\n• SQL Injection\n• Cross-Site Scripting (XSS)\n• Command Injection\n• Directory Traversal\n• Penetration Testing\n\n**Defense Labs:**\n• System Hardening\n• Network Security\n• Incident Response\n• Web App Testing\n• Malware Analysis\n\nTo start a lab, go to **Training Labs** in the navigation menu. Need help with a specific lab?";
    }
    
    // Account Issues
    if (lowerMessage.includes('account') || lowerMessage.includes('login') || lowerMessage.includes('password')) {
      return "👤 **Account Support:**\n\n• **Forgot Password?** Click 'Forgot Password' on the login page\n• **Can't Login?** Check your email and password, ensure caps lock is off\n• **Update Profile:** Go to your profile page from the top navigation\n• **Delete Account:** Contact support@cybersim.com\n\nNeed more specific help with your account?";
    }
    
    // Progress & Achievements
    if (lowerMessage.includes('progress') || lowerMessage.includes('achievement') || lowerMessage.includes('score')) {
      return "📊 **Progress Tracking:**\n\nYour progress is automatically saved:\n• View your dashboard for overall stats\n• Check individual lab completion rates\n• Track achievements and badges\n• Monitor your learning streak\n\nAll progress syncs in real-time. Visit your **Command Center** to see detailed analytics!";
    }
    
    // Technical Issues
    if (lowerMessage.includes('error') || lowerMessage.includes('bug') || lowerMessage.includes('not working') || lowerMessage.includes('broken')) {
      return "🔧 **Technical Support:**\n\nLet me help troubleshoot:\n\n1. **Clear browser cache** and refresh\n2. **Try a different browser** (Chrome, Firefox, Edge)\n3. **Check your internet connection**\n4. **Disable browser extensions** temporarily\n5. **Update your browser** to the latest version\n\nIf the issue persists, please describe the specific error and I'll provide more targeted help!";
    }
    
    // Articles & Learning (but not "learn" alone to avoid conflicts)
    if ((lowerMessage.includes('article') || lowerMessage.includes('read')) && !lowerMessage.includes('how to learn')) {
      return "📚 **Intel Base Articles:**\n\nAccess our comprehensive knowledge base:\n\n**Attack Techniques:**\n• SQL Injection fundamentals\n• XSS attack vectors\n• Command injection methods\n• Path traversal exploits\n\n**Defense Strategies:**\n• System hardening guides\n• Network security best practices\n• Incident response procedures\n\nVisit the **Intel Base** section to browse all articles!";
    }
    
    // How to learn / Getting started
    if (lowerMessage.includes('how to learn') || lowerMessage.includes('how do i learn') || lowerMessage.includes('getting started') || lowerMessage.includes('start learning')) {
      return "🚀 **Getting Started with CyberSim:**\n\n**Step 1:** Choose your path\n• Attack Labs - Learn offensive security\n• Defense Labs - Master defensive techniques\n\n**Step 2:** Read articles in Intel Base\n• Understand concepts before practicing\n\n**Step 3:** Practice in Training Labs\n• Hands-on simulations\n• Step-by-step guidance\n\n**Step 4:** Track your progress\n• View stats in Command Center\n• Earn achievements\n\nWhat topic interests you most?";
    }
    
    // Cybersecurity Questions
    if (lowerMessage.includes('what is') || lowerMessage.includes('explain') || lowerMessage.includes('how does')) {
      return "🎓 **Cybersecurity Learning:**\n\nI can explain various cybersecurity concepts:\n\n• **Vulnerabilities:** SQL injection, XSS, CSRF, etc.\n• **Defense Techniques:** Firewalls, IDS/IPS, encryption\n• **Tools:** Nmap, Metasploit, Wireshark, Burp Suite\n• **Methodologies:** Penetration testing, incident response\n\nWhat specific topic would you like to learn about?";
    }
    
    // Pricing & Plans
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('premium') || lowerMessage.includes('upgrade')) {
      return "💎 **Subscription Plans:**\n\n**Free Tier:**\n• Basic labs and articles\n• Limited progress tracking\n• Community support\n\n**Elite Pro:**\n• All advanced labs\n• Detailed analytics\n• Priority support\n• Certificates\n• Exclusive content\n\nUpgrade from your profile page!";
    }
    
    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage.includes('hey')) {
      return "👋 Hello! I'm here to help you with anything related to CyberSim Elite. Whether you need help with labs, have account questions, or want to learn about cybersecurity, I'm ready to assist!";
    }
    
    // Thanks - MUST be exact match to avoid false positives
    if (lowerMessage === 'thank you' || lowerMessage === 'thanks' || lowerMessage === 'thank' || lowerMessage.startsWith('thank you') || lowerMessage.startsWith('thanks')) {
      return "You're welcome! 😊 Feel free to ask if you need anything else. Happy hacking!";
    }
    
    // Default response
    return "I'm here to help! I can assist with:\n\n🧪 **Training Labs** - Lab access and guidance\n👤 **Account Issues** - Login, password, profile\n📊 **Progress Tracking** - Stats and achievements\n🔧 **Technical Support** - Bugs and errors\n📚 **Learning Resources** - Articles and tutorials\n🎓 **Cybersecurity Questions** - Concepts and techniques\n\nWhat would you like help with?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call the real Gemini API through backend
      console.log('Sending message to AI:', currentInput);
      
      const response = await fetch('http://localhost:5050/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: messages.slice(-10) // Send last 10 messages for context
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('AI Response:', data);
      
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        text: data.response || 'Sorry, I could not generate a response. Please try again.',
        timestamp: new Date(),
        powered: data.fallback ? 'Fallback Mode' : 'Gemini AI'
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      
      // Fallback to local response if API fails
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        text: getAIResponse(currentInput),
        timestamp: new Date(),
        powered: 'Offline Mode'
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { icon: '🧪', text: 'Lab Help', query: 'How do I start a training lab?' },
    { icon: '🔐', text: 'Account', query: 'I need help with my account' },
    { icon: '📊', text: 'Progress', query: 'How do I track my progress?' },
    { icon: '🐛', text: 'Bug Report', query: 'I found a bug' }
  ];

  const handleQuickAction = (query) => {
    setInputMessage(query);
  };

  if (!isOpen) return null;

  return (
    <div className="ai-chat-overlay">
      <div className="ai-chat-container">
        {/* Header */}
        <div className="ai-chat-header">
          <div className="ai-header-info">
            <div className="ai-avatar">
              <span className="ai-avatar-icon">🤖</span>
              <span className="ai-status-indicator"></span>
            </div>
            <div className="ai-header-text">
              <h3>CyberSim AI Assistant</h3>
              <p className="ai-status">Online • Powered by Gen AI</p>
            </div>
          </div>
          <button className="ai-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Messages */}
        <div className="ai-chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`ai-message ${message.type}`}>
              {message.type === 'ai' && (
                <div className="ai-message-avatar">🤖</div>
              )}
              <div className="ai-message-content">
                <div className="ai-message-text">
                  {message.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < message.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
                <div className="ai-message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {message.type === 'user' && (
                <div className="ai-message-avatar user">👤</div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="ai-message ai">
              <div className="ai-message-avatar">🤖</div>
              <div className="ai-message-content">
                <div className="ai-typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="ai-quick-actions">
            <p className="quick-actions-label">Quick Actions:</p>
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="quick-action-btn"
                  onClick={() => handleQuickAction(action.query)}
                >
                  <span className="quick-action-icon">{action.icon}</span>
                  <span className="quick-action-text">{action.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="ai-chat-input-container">
          <div className="ai-input-wrapper">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about CyberSim..."
              className="ai-chat-input"
              rows="1"
            />
            <button 
              className="ai-send-btn"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
            >
              <span className="send-icon">➤</span>
            </button>
          </div>
          <p className="ai-disclaimer">
            AI responses are generated and may not always be accurate. For critical issues, contact human support.
          </p>
        </div>
      </div>
    </div>
  );
}
