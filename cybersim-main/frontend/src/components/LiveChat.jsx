import React, { useState, useEffect, useRef } from 'react';
import '../styles/LiveChat.css';

export default function LiveChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [agentName] = useState('CyberSim AI');
  const [useAI] = useState(true); // Try AI API first, fallback to smart local responses
  const messagesEndRef = useRef(null);

  // Smart bot responses with detailed help (fallback when API fails)
  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase().trim();

    // Check for specific topics FIRST before generic patterns
    
    // SQL Injection - check for "sql" alone or with "injection"
    if (lowerMessage.includes('sql')) {
      return "🎯 SQL Injection Explained:\n\nSQL Injection is a code injection technique that exploits vulnerabilities in an application's database layer. Attackers insert malicious SQL code into input fields to manipulate database queries.\n\nHow it works:\n• Attackers find input fields that interact with databases\n• They inject SQL commands through these fields\n• The database executes the malicious code\n• Attackers can view, modify, or delete data\n\nLearn more:\n• Read the full article in Intel Base → Attack Techniques\n• Practice in Training Labs → Attack Labs → SQL Injection\n\nWant to try the lab?";
    }

    // XSS
    if (lowerMessage.includes('xss') || lowerMessage.includes('cross-site scripting') || lowerMessage.includes('cross site scripting')) {
      return "🔓 XSS (Cross-Site Scripting) Explained:\n\nXSS is a security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.\n\nHow it works:\n• Attackers inject JavaScript code into web applications\n• When other users view the page, the script executes\n• The script can steal cookies, session tokens, or sensitive data\n• Can redirect users to malicious sites\n\nTypes of XSS:\n• Reflected XSS - Script reflects off web server\n• Stored XSS - Script stored in database\n• DOM-based XSS - Vulnerability in client-side code\n\nLearn more in Training Labs → Attack Labs → XSS";
    }

    // Command Injection
    if (lowerMessage.includes('command')) {
      return "⚡ Command Injection Explained:\n\nCommand Injection allows attackers to execute arbitrary operating system commands on the server hosting an application.\n\nHow it works:\n• Application passes unsafe user input to system shell\n• Attacker injects OS commands\n• Server executes the malicious commands\n• Can lead to full system compromise\n\nLearn more:\n• Read the article in Intel Base → Attack Techniques\n• Practice in Training Labs → Attack Labs → Command Injection";
    }

    // Directory Traversal
    if (lowerMessage.includes('directory') || lowerMessage.includes('path traversal') || lowerMessage.includes('traversal')) {
      return "📁 Directory Traversal Explained:\n\nDirectory traversal allows attackers to access files outside the intended directory.\n\nHow it works:\n• Attackers manipulate file path references\n• Use ../ sequences to navigate directories\n• Access sensitive files like /etc/passwd\n• Can read configuration files and source code\n\nLearn more:\n• Read the article in Intel Base\n• Practice in Training Labs → Attack Labs → Directory Traversal";
    }

    // Penetration Testing
    if (lowerMessage.includes('penetration') || lowerMessage.includes('pentest') || lowerMessage.includes('pen test')) {
      return "🎯 Penetration Testing Explained:\n\nPenetration testing (pen testing) is an authorized simulated cyber attack performed to evaluate system security.\n\nKey phases:\n1. Planning and reconnaissance\n2. Scanning and enumeration\n3. Gaining access (exploitation)\n4. Maintaining access\n5. Analysis and reporting\n\nLearn the full methodology:\n• Read the guide in Intel Base\n• Practice in Training Labs → Attack Labs → Penetration Testing";
    }

    // Defense topics
    if (lowerMessage.includes('hardening')) {
      return "🛡️ System Hardening Explained:\n\nSystem hardening is the process of securing a system by reducing vulnerabilities and attack surfaces.\n\nKey areas:\n• Patch management - Keep systems updated\n• Service configuration - Disable unnecessary services\n• Access controls - Implement least privilege\n• Security policies - Enforce strong policies\n• Monitoring - Track system activities\n\nLearn more:\n• Read the guide in Intel Base → Defense Strategies\n• Practice in Training Labs → Defense Labs → System Hardening";
    }

    if (lowerMessage.includes('network security') || lowerMessage.includes('firewall')) {
      return "🌐 Network Security Explained:\n\nNetwork security protects the integrity, confidentiality, and availability of data as it's transmitted across networks.\n\nKey components:\n• Firewall configuration - Control traffic flow\n• IDS/IPS setup - Detect and prevent intrusions\n• Network segmentation - Isolate critical systems\n• Traffic monitoring - Analyze network activity\n• VPN and encryption - Secure communications\n\nLearn more in Training Labs → Defense Labs → Network Security";
    }

    if (lowerMessage.includes('incident response') || lowerMessage.includes('incident')) {
      return "🚨 Incident Response Explained:\n\nIncident response is the process of handling security breaches and cyber attacks.\n\nKey phases:\n1. Preparation - Plan and prepare\n2. Detection and analysis - Identify incidents\n3. Containment - Limit damage\n4. Eradication - Remove threats\n5. Recovery - Restore systems\n6. Post-incident review - Learn and improve\n\nLearn more:\n• Read the guide in Intel Base\n• Practice in Training Labs → Defense Labs → Incident Response";
    }

    if (lowerMessage.includes('malware')) {
      return "🦠 Malware Analysis Explained:\n\nMalware analysis is the process of understanding malicious software behavior to develop defenses.\n\nTypes of analysis:\n• Static analysis - Examine code without execution\n• Dynamic analysis - Run in controlled environment\n• Behavioral analysis - Observe actions\n• Reverse engineering - Understand functionality\n\nLearn more:\n• Read the guide in Intel Base\n• Practice in Training Labs → Defense Labs → Malware Analysis";
    }

    // How to learn / Getting started
    if (lowerMessage.includes('how to learn') || lowerMessage.includes('how do i learn') || lowerMessage.includes('getting started') || lowerMessage.includes('start learning') || lowerMessage.includes('how to start')) {
      return "🚀 Getting Started with CyberSim:\n\nStep 1: Choose your path\n• Attack Labs - Learn offensive security\n• Defense Labs - Master defensive techniques\n\nStep 2: Read articles in Intel Base\n• Understand concepts before practicing\n\nStep 3: Practice in Training Labs\n• Hands-on simulations\n• Step-by-step guidance\n\nStep 4: Track your progress\n• View stats in Command Center\n• Earn achievements\n\nWhat topic interests you most?";
    }

    // Training Labs
    if (lowerMessage.includes('lab') || lowerMessage.includes('training') || lowerMessage.includes('simulation') || lowerMessage.includes('practice')) {
      return "🧪 Training Labs Help:\n\nWe offer multiple cybersecurity labs:\n\nAttack Labs:\n• SQL Injection\n• Cross-Site Scripting (XSS)\n• Command Injection\n• Directory Traversal\n• Penetration Testing\n\nDefense Labs:\n• System Hardening\n• Network Security\n• Incident Response\n• Web App Testing\n• Malware Analysis\n\nTo start a lab, go to Training Labs in the navigation menu. Which lab interests you?";
    }

    // Account Issues
    if (lowerMessage.includes('account') || lowerMessage.includes('login') || lowerMessage.includes('password') || lowerMessage.includes('sign in')) {
      return "👤 Account Support:\n\n• Forgot Password? Click 'Forgot Password' on the login page\n• Can't Login? Check your email and password, ensure caps lock is off\n• Update Profile: Go to your profile page from the top navigation\n• Delete Account: Contact support@cybersim.com\n\nNeed more specific help with your account?";
    }

    // Progress & Achievements
    if (lowerMessage.includes('progress') || lowerMessage.includes('achievement') || lowerMessage.includes('score') || lowerMessage.includes('stats')) {
      return "📊 Progress Tracking:\n\nYour progress is automatically saved:\n• View your dashboard for overall stats\n• Check individual lab completion rates\n• Track achievements and badges\n• Monitor your learning streak\n\nAll progress syncs in real-time. Visit your Command Center to see detailed analytics!";
    }

    // Technical Issues
    if (lowerMessage.includes('error') || lowerMessage.includes('bug') || lowerMessage.includes('not working') || lowerMessage.includes('broken') || lowerMessage.includes('problem') || lowerMessage.includes('issue')) {
      return "🔧 Technical Support:\n\nLet me help troubleshoot:\n\n1. Clear browser cache and refresh\n2. Try a different browser (Chrome, Firefox, Edge)\n3. Check your internet connection\n4. Disable browser extensions temporarily\n5. Update your browser to the latest version\n\nIf the issue persists, please describe the specific error and I'll provide more targeted help!";
    }

    // Articles & Learning
    if (lowerMessage.includes('article') || lowerMessage.includes('read') || lowerMessage.includes('intel base')) {
      return "📚 Intel Base Articles:\n\nAccess our comprehensive knowledge base:\n\nAttack Techniques:\n• SQL Injection fundamentals\n• XSS attack vectors\n• Command injection methods\n• Path traversal exploits\n• Penetration testing methodology\n\nDefense Strategies:\n• System hardening guides\n• Network security best practices\n• Incident response procedures\n• Malware analysis techniques\n\nVisit the Intel Base section to browse all articles!";
    }

    // Pricing & Plans
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('premium') || lowerMessage.includes('upgrade') || lowerMessage.includes('subscription') || lowerMessage.includes('plan')) {
      return "💎 Subscription Plans:\n\nFree Tier:\n• Basic labs and articles\n• Limited progress tracking\n• Community support\n\nElite Pro:\n• All advanced labs\n• Detailed analytics\n• Priority support\n• Certificates\n• Exclusive content\n\nUpgrade from your profile page!";
    }

    // Greetings
    if (lowerMessage.match(/^(hello|hi|hey|greetings|good morning|good afternoon|good evening)$/i) || lowerMessage.match(/^(hello|hi|hey)\s/i)) {
      return "👋 Hello! I'm here to help you with anything related to CyberSim Elite. Whether you need help with labs, have account questions, or want to learn about cybersecurity, I'm ready to assist!";
    }

    // Thanks - exact match only
    if (lowerMessage === 'thank you' || lowerMessage === 'thanks' || lowerMessage === 'thank' || lowerMessage.startsWith('thank you') || lowerMessage.startsWith('thanks')) {
      return "You're welcome! 😊 Feel free to ask if you need anything else. Happy hacking!";
    }

    // Goodbye
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
      return "Thank you for chatting with us! Feel free to reach out anytime. Happy learning! 🚀";
    }

    // Default response
    return "I'm here to help! I can assist with:\n\n🧪 Training Labs - Lab access and guidance\n👤 Account Issues - Login, password, profile\n📊 Progress Tracking - Stats and achievements\n🔧 Technical Support - Bugs and errors\n📚 Learning Resources - Articles and tutorials\n🎓 Cybersecurity Questions - Concepts and techniques\n\nWhat would you like help with?";
  };

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = {
        id: Date.now(),
        sender: 'agent',
        text: `Hi! I'm ${agentName} from CyberSim Elite support. How can I help you today?`,
        timestamp: new Date(),
        agentName: agentName
      };
      setMessages([greeting]);
    }
  }, [isOpen, messages.length, agentName]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    // Try AI API first if enabled
    if (useAI) {
      try {
        const response = await fetch('http://localhost:5050/api/ai/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: currentInput,
            conversationHistory: messages.slice(-10)
          })
        });

        if (response.ok) {
          const data = await response.json();
          
          const botMessage = {
            id: Date.now() + 1,
            sender: 'agent',
            text: data.response || getBotResponse(currentInput),
            timestamp: new Date(),
            agentName: agentName,
            powered: data.fallback ? 'Smart Mode' : 'Gen AI'
          };
          
          setMessages(prev => [...prev, botMessage]);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log('AI API unavailable, using local responses');
      }
    }

    // Fallback to local responses
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: 'agent',
        text: getBotResponse(currentInput),
        timestamp: new Date(),
        agentName: agentName
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="live-chat-container">
      <div className="chat-window">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="header-content">
            <div className="agent-info">
              <div className="agent-avatar">🤖</div>
              <div className="agent-details">
                <h3>{agentName}</h3>
                <div className="status-indicator">
                  <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}></span>
                  <span>{isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="messages-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              {msg.sender === 'agent' && (
                <div className="message-avatar">🤖</div>
              )}
              <div className={`message-content ${msg.sender}`}>
                {msg.sender === 'agent' && (
                  <div className="message-sender">{msg.agentName}</div>
                )}
                <div className="message-text">
                  {msg.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < msg.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
                <div className="message-time">
                  {msg.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                  {msg.powered && <span className="powered-badge"> • {msg.powered}</span>}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message agent">
              <div className="message-avatar">🤖</div>
              <div className="message-content agent">
                <div className="message-sender">{agentName}</div>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <div className="input-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="message-input"
              disabled={!isOnline || isLoading}
            />
            <button 
              type="submit" 
              className="send-btn"
              disabled={!isOnline || isLoading || !inputValue.trim()}
            >
              ➤
            </button>
          </div>
          <div className="input-footer">
            <p className="disclaimer">💬 AI-powered support chat. For urgent issues, contact us via email.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
