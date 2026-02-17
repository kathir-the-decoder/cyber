import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /api/ai/chat - Send message to AI
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    console.log('Received AI chat request:', { message, historyLength: conversationHistory.length });

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build context for the AI
    const systemContext = `You are CyberSim AI Assistant, a helpful and knowledgeable cybersecurity training assistant. You help users with:

1. Training Labs - Guide users through attack and defense simulations
2. Account Issues - Help with login, password, and profile problems
3. Technical Support - Troubleshoot bugs and errors
4. Learning Resources - Explain cybersecurity concepts and techniques
5. Progress Tracking - Help users understand their learning progress

Available Labs:
ATTACK LABS:
- SQL Injection - Learn database attack techniques
- Cross-Site Scripting (XSS) - Exploit client-side vulnerabilities
- Command Injection - Execute arbitrary system commands
- Directory Traversal - Access unauthorized files
- Penetration Testing - Comprehensive security testing

DEFENSE LABS:
- System Hardening - Secure Linux systems
- Network Security - Configure firewalls and IDS
- Incident Response - Handle security incidents
- Web App Testing - Test application security
- Malware Analysis - Analyze and detect malware

Be helpful, concise, and provide actionable advice. Use emojis occasionally to make responses friendly. Keep responses under 200 words unless explaining complex topics.`;

    // Build conversation history for context
    let conversationText = systemContext + '\n\n';
    
    if (conversationHistory.length > 0) {
      conversationHistory.slice(-5).forEach(msg => {
        conversationText += `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.text}\n`;
      });
    }
    
    conversationText += `User: ${message}\nAssistant:`;

    console.log('Calling Gemini API...');

    // Generate response
    const result = await model.generateContent(conversationText);
    const response = await result.response;
    const aiResponse = response.text();

    console.log('Gemini API response received:', aiResponse.substring(0, 100) + '...');

    res.json({
      success: true,
      response: aiResponse,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('AI Chat Error:', error.message);
    console.error('Error details:', error);
    
    // Fallback response if API fails
    const fallbackResponse = getFallbackResponse(req.body.message);
    
    res.json({
      success: true,
      response: fallbackResponse,
      fallback: true,
      error: error.message,
      timestamp: new Date()
    });
  }
});

// Fallback responses if API fails
function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('lab') || lowerMessage.includes('training')) {
    return "🧪 I can help you with our training labs! We have Attack Labs (SQL Injection, XSS, Command Injection, Directory Traversal, Pentest) and Defense Labs (System Hardening, Network Security, Incident Response, Web App Testing, Malware Analysis). Which one interests you?";
  }
  
  if (lowerMessage.includes('account') || lowerMessage.includes('login')) {
    return "👤 For account issues: Use 'Forgot Password' on the login page, check your email/password, or visit your profile to update settings. Need specific help?";
  }
  
  if (lowerMessage.includes('error') || lowerMessage.includes('bug')) {
    return "🔧 Try these steps: 1) Clear browser cache, 2) Try a different browser, 3) Check internet connection, 4) Disable extensions. Still having issues? Please describe the specific error.";
  }
  
  return "I'm here to help with CyberSim! I can assist with training labs, account issues, technical support, and cybersecurity questions. What do you need help with?";
}

// GET /api/ai/health - Check AI service health
router.get('/health', async (req, res) => {
  try {
    console.log('Health check - API Key exists:', !!process.env.GEMINI_API_KEY);
    console.log('Health check - API Key length:', process.env.GEMINI_API_KEY?.length);
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent('Say hello in one word');
    const response = await result.response;
    const text = response.text();
    
    res.json({
      success: true,
      status: 'operational',
      message: 'AI service is running',
      model: 'gemini-pro',
      testResponse: text,
      apiKeyConfigured: !!process.env.GEMINI_API_KEY
    });
  } catch (error) {
    console.error('Health check error:', error.message);
    res.status(500).json({
      success: false,
      status: 'error',
      message: error.message,
      apiKeyConfigured: !!process.env.GEMINI_API_KEY
    });
  }
});

export default router;
