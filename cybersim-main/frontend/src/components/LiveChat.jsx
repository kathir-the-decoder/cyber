import React, { useState, useEffect, useRef } from 'react';
import '../styles/LiveChat.css';

export default function LiveChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [agentName, setAgentName] = useState('Support Agent');
  const messagesEndRef = useRef(null);

  // Sample bot responses for demonstration
  const botResponses = {
    default: 'Thank you for reaching out! How can I assist you today?',
    greeting: [
      'Hi there! How can I help you?',
      'Hello! Welcome to CyberSim Elite support. What can I do for you?',
      'Hey! Great to have you here. What do you need help with?'
    ],
    labs: 'For training lab issues, please ensure you have a stable internet connection. You can also check our Knowledge Base for lab-specific guides.',
    account: 'For account and billing issues, please verify your email and password. If you need to reset your password, use the "Forgot Password" link on the login page.',
    technical: 'We\'re sorry you\'re experiencing technical difficulties. Can you provide more details about the issue?',
    premium: 'Premium members get 24/7 support with priority response times. Would you like to learn more about upgrading?',
    goodbye: [
      'Thank you for chatting with us! Feel free to reach out anytime.',
      'Is there anything else I can help you with?',
      'Great! Let me know if you need anything else.'
    ]
  };

  // Detect user intent and return appropriate response
  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.match(/hello|hi|hey|greetings/)) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    } else if (lowerMessage.match(/lab|training|exercise|challenge/)) {
      return botResponses.labs;
    } else if (lowerMessage.match(/account|billing|payment|subscription|premium|upgrade/)) {
      return botResponses.account;
    } else if (lowerMessage.match(/error|problem|bug|issue|broken|not working|crash/)) {
      return botResponses.technical;
    } else if (lowerMessage.match(/thanks|thank you|thanks!|bye|goodbye|thanks for help/)) {
      return botResponses.goodbye[Math.floor(Math.random() * botResponses.goodbye.length)];
    } else if (lowerMessage.match(/premium|elite|pro|features/)) {
      return botResponses.premium;
    }
    
    return botResponses.default;
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
  }, [isOpen]);

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
    setInputValue('');
    setIsLoading(true);

    // Simulate API call and bot response delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: 'agent',
        text: getBotResponse(inputValue),
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
              <div className="agent-avatar">👨‍💼</div>
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
                <div className="message-text">{msg.text}</div>
                <div className="message-time">
                  {msg.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
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
            <p className="disclaimer">💬 This is an AI-powered support chat. For urgent issues, please contact us via email.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
