# 🤖 Gen AI Setup Guide

## Google Gemini API Integration

Your CyberSim platform now has a **real Gen AI assistant** powered by Google Gemini!

### ✅ What's Been Set Up

1. **Backend API Routes** - `/api/ai/chat` endpoint
2. **Gemini API Key** - Already configured in `.env`
3. **Frontend Integration** - AI chat component connected to backend
4. **Fallback System** - Works offline if API fails

### 📦 Installation Steps

**Step 1: Install the Gemini AI package**

```bash
cd cybersim-main/backend
npm install @google/generative-ai
```

**Step 2: Restart the backend server**

```bash
npm start
```

**Step 3: Test the AI Assistant**

1. Open the frontend: `http://localhost:5173`
2. Go to the **Support** page
3. Click the floating **"AI Assistant"** button (bottom right)
4. Start chatting!

### 🎯 Features

The AI Assistant can help with:

- 🧪 **Training Labs** - Guidance on attack and defense simulations
- 👤 **Account Issues** - Login, password, profile help
- 📊 **Progress Tracking** - Understanding learning analytics
- 🔧 **Technical Support** - Troubleshooting bugs and errors
- 📚 **Learning Resources** - Cybersecurity concepts and techniques
- 🎓 **Cybersecurity Questions** - Explanations and best practices

### 🔑 API Key Details

- **Provider**: Google Gemini
- **Model**: gemini-pro
- **Key**: Already configured in `backend/.env`
- **Rate Limits**: Check Google's free tier limits

### 🛠️ Troubleshooting

**If AI doesn't respond:**

1. Check backend is running on port 5050
2. Verify API key in `backend/.env`
3. Check console for errors
4. The system will fallback to offline mode automatically

**Check API Health:**

```bash
curl http://localhost:5050/api/ai/health
```

### 🔒 Security Notes

- API key is stored in `.env` (not committed to git)
- All AI requests go through your backend
- Frontend never exposes the API key
- Add `.env` to `.gitignore` if not already there

### 🚀 Next Steps

Want to enhance the AI further?

1. **Add user context** - Send user profile data for personalized responses
2. **Track conversations** - Save chat history to database
3. **Add voice input** - Integrate speech-to-text
4. **Multi-language** - Support multiple languages
5. **Custom training** - Fine-tune responses for your platform

Enjoy your Gen AI-powered support assistant! 🎉
