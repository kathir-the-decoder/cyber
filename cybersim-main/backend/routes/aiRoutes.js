import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

// Initialize OpenAI lazily to ensure env vars are loaded
let openai = null;
const getOpenAI = () => {
  if (!openai) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
};

// POST /api/ai/chat - Send message to AI
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    console.log('Received AI chat request:', { message, historyLength: conversationHistory.length });

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build messages array for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are CyberSim AI Assistant, a helpful and knowledgeable cybersecurity training assistant. You help users with:

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

Be helpful, concise, and provide actionable advice. Use emojis occasionally to make responses friendly. Keep responses under 200 words unless explaining complex topics.`
      }
    ];

    // Add conversation history
    if (conversationHistory.length > 0) {
      conversationHistory.slice(-5).forEach(msg => {
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        });
      });
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    console.log('Calling OpenAI API...');

    // Generate response
    const ai = getOpenAI();
    const completion = await ai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7
    });

    const aiResponse = completion.choices[0]?.message?.content || '';

    console.log('OpenAI API response received:', (aiResponse || '').substring(0, 100) + '...');

    res.json({
      success: true,
      response: aiResponse,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('AI Chat Error:', error?.message || error);
    console.error('Error details:', error);
    
    // Fallback response if API fails
    const fallbackResponse = getFallbackResponse(req.body?.message || '');
    
    res.json({
      success: true,
      response: fallbackResponse,
      fallback: true,
      error: error?.message || String(error),
      timestamp: new Date()
    });
  }
});

// Fallback responses if API fails
function getFallbackResponse(message) {
  const lowerMessage = (message || '').toLowerCase();
  
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
    console.log('Health check - API Key exists:', !!process.env.OPENAI_API_KEY);
    console.log('Health check - API Key length:', process.env.OPENAI_API_KEY?.length);
    
    const ai = getOpenAI();
    const completion = await ai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Say hello in one word' }],
      max_tokens: 10
    });
    
    const text = completion.choices[0]?.message?.content || '';
    
    res.json({
      success: true,
      status: 'operational',
      message: 'AI service is running',
      model: 'gpt-3.5-turbo',
      testResponse: text,
      apiKeyConfigured: !!process.env.OPENAI_API_KEY
    });
  } catch (error) {
    console.error('Health check error:', error?.message || error);
    res.status(500).json({
      success: false,
      status: 'error',
      message: error?.message || String(error),
      apiKeyConfigured: !!process.env.OPENAI_API_KEY
    });
  }
});

export default router;
