import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Store chat messages in memory (in production, use database)
const chatSessions = new Map();

// Get chat messages for a session
router.get('/messages/:sessionId', protect, (req, res) => {
  const { sessionId } = req.params;
  
  if (chatSessions.has(sessionId)) {
    res.json({
      success: true,
      messages: chatSessions.get(sessionId)
    });
  } else {
    res.json({
      success: true,
      messages: []
    });
  }
});

// Send a chat message
router.post('/message', protect, (req, res) => {
  const { sessionId, message } = req.body;
  const userId = req.userId;

  if (!sessionId || !message) {
    return res.status(400).json({
      success: false,
      error: 'Session ID and message are required'
    });
  }

  if (!chatSessions.has(sessionId)) {
    chatSessions.set(sessionId, []);
  }

  const userMessage = {
    id: Date.now(),
    sender: 'user',
    text: message,
    userId: userId,
    timestamp: new Date()
  };

  chatSessions.get(sessionId).push(userMessage);

  // Generate bot response
  const botResponse = generateBotResponse(message);
  
  const agentMessage = {
    id: Date.now() + 1,
    sender: 'agent',
    text: botResponse,
    agentName: 'Support Agent',
    timestamp: new Date()
  };

  chatSessions.get(sessionId).push(agentMessage);

  res.json({
    success: true,
    userMessage,
    agentMessage
  });
});

// Clear chat session
router.delete('/session/:sessionId', protect, (req, res) => {
  const { sessionId } = req.params;
  
  if (chatSessions.has(sessionId)) {
    chatSessions.delete(sessionId);
  }

  res.json({
    success: true,
    message: 'Chat session cleared'
  });
});

// Generate bot response based on user input
function generateBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  const responses = {
    default: 'Thank you for reaching out! How can I assist you today?',
    greeting: [
      'Hi there! How can I help you?',
      'Hello! Welcome to CyberSim Elite support. What can I do for you?',
      'Hey! Great to have you here. What do you need help with?'
    ],
    labs: 'For training lab issues, please ensure you have a stable internet connection. You can also check our Knowledge Base for lab-specific guides. Would you like more information?',
    account: 'For account and billing issues, please verify your email and password. If you need to reset your password, use the "Forgot Password" link on the login page. Can I help you with anything specific?',
    technical: 'We\'re sorry you\'re experiencing technical difficulties. Can you provide more details about the issue? This will help us assist you better.',
    premium: 'Premium members get 24/7 support with priority response times. Would you like to learn more about upgrading to our Elite Pro plan?',
    goodbye: [
      'Thank you for chatting with us! Feel free to reach out anytime you need help.',
      'Is there anything else I can help you with?',
      'Great! Let me know if you need assistance with anything else.'
    ]
  };

  if (lowerMessage.match(/hello|hi|hey|greetings|hello there/)) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  } else if (lowerMessage.match(/lab|training|exercise|challenge|simulation/)) {
    return responses.labs;
  } else if (lowerMessage.match(/account|billing|payment|subscription|premium|upgrade|elite pro/)) {
    return responses.account;
  } else if (lowerMessage.match(/error|problem|bug|issue|broken|not working|crash|failing|fail/)) {
    return responses.technical;
  } else if (lowerMessage.match(/thanks|thank you|thanks!|bye|goodbye|see you|thanks for help/)) {
    return responses.goodbye[Math.floor(Math.random() * responses.goodbye.length)];
  } else if (lowerMessage.match(/premium|elite|pro|features|upgrade|pricing/)) {
    return responses.premium;
  }
  
  return responses.default;
}

export default router;
