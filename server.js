const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Simple in-memory storage for demo purposes
let chatHistory = [];

// Educational responses database
const educationalResponses = {
    // Greetings
    'hello': 'Hello! I\'m your AI learning assistant. How can I help you with your studies today?',
    'hi': 'Hi there! Ready to learn something new? What subject interests you?',
    'hey': 'Hey! I\'m here to help with your educational journey. What would you like to explore?',
    
    // Subjects
    'math': 'Mathematics is fascinating! I can help with algebra, geometry, calculus, statistics, or any specific math problems you have.',
    'mathematics': 'Great choice! Math builds logical thinking. What area of mathematics are you working on?',
    'science': 'Science opens up the world! Are you interested in biology, chemistry, physics, or earth science?',
    'biology': 'Biology is the study of life! I can help with cell biology, genetics, ecology, evolution, and more.',
    'chemistry': 'Chemistry is all about matter and reactions! Need help with organic, inorganic, or physical chemistry?',
    'physics': 'Physics explains how the universe works! I can assist with mechanics, thermodynamics, electromagnetism, and quantum physics.',
    'history': 'History helps us understand our past and present. Which historical period or region interests you?',
    'literature': 'Literature enriches our understanding of human experience. Are you studying poetry, novels, or drama?',
    'english': 'English language and literature are powerful tools for communication and expression. How can I help?',
    
    // Programming
    'programming': 'Programming is a valuable skill! Which language are you learning: JavaScript, Python, Java, C++, or another?',
    'javascript': 'JavaScript is perfect for web development! I can help with syntax, DOM manipulation, async programming, and frameworks.',
    'python': 'Python is excellent for beginners and powerful for experts! Need help with syntax, data structures, or specific libraries?',
    'java': 'Java is great for enterprise applications! I can assist with OOP concepts, data structures, and best practices.',
    'html': 'HTML structures web content! I can help you understand tags, semantic markup, and modern HTML5 features.',
    'css': 'CSS makes websites beautiful! Need help with layouts, animations, responsive design, or CSS frameworks?',
    
    // Study techniques
    'study tips': 'Here are proven study techniques: 1) Active recall - test yourself regularly 2) Spaced repetition - review at increasing intervals 3) Pomodoro Technique - 25min study, 5min break 4) Teach others - explaining concepts solidifies understanding 5) Practice problems - apply what you learn',
    'motivation': 'Stay motivated by: Setting clear, achievable goals • Celebrating small wins • Finding study buddies • Connecting learning to your interests • Taking breaks to avoid burnout • Remembering your "why"',
    'time management': 'Effective time management: 1) Use a planner or digital calendar 2) Prioritize tasks (urgent vs important) 3) Break large tasks into smaller ones 4) Eliminate distractions 5) Set specific study times 6) Use the 2-minute rule for quick tasks',
    'memory': 'Boost your memory with: • Mnemonics and acronyms • Visual associations • Mind maps • Regular review • Adequate sleep • Physical exercise • Healthy nutrition',
    
    // Learning strategies
    'note taking': 'Effective note-taking methods: Cornell Notes (divide page into sections), Mind Mapping (visual connections), Outline Method (hierarchical structure), Charting (tables for comparisons), Sentence Method (numbered sentences)',
    'reading': 'Improve reading comprehension: Preview the text first, ask questions while reading, summarize each section, take notes on key points, discuss with others, and review regularly.',
    'writing': 'Better writing tips: Plan before you write, create an outline, write clear topic sentences, use transitions, vary sentence structure, edit ruthlessly, and read your work aloud.',
    
    // Exam preparation
    'exam': 'Exam preparation strategies: Start early, create a study schedule, practice with past papers, form study groups, get enough sleep, eat well, and stay calm during the exam.',
    'test': 'Test-taking tips: Read instructions carefully, manage your time, start with easier questions, show your work, review your answers, and don\'t panic if you don\'t know something.',
    
    // Career guidance
    'career': 'Career planning involves: Identifying your interests and strengths, researching different fields, gaining relevant experience, building a network, developing skills, and staying adaptable to change.',
    'college': 'College success tips: Attend classes regularly, participate in discussions, use office hours, join study groups, manage your time well, and take advantage of campus resources.',
    
    // Default responses
    'help': 'I can help you with: • Subject-specific questions (math, science, history, etc.) • Study techniques and strategies • Programming and technology • Career guidance • Exam preparation • Time management • And much more! What would you like to learn about?',
    'default': 'That\'s an interesting question! While I may not have a specific answer, I encourage you to: 1) Break down the topic into smaller parts 2) Research from reliable sources 3) Practice with examples 4) Ask specific questions 5) Connect new information to what you already know. What specific aspect would you like to explore further?'
};

// Function to get AI response
function getAIResponse(message) {
    const lowercaseMessage = message.toLowerCase();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(educationalResponses)) {
        if (lowercaseMessage.includes(key)) {
            return response;
        }
    }
    
    // If no match found, return default response
    return educationalResponses.default;
}

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'EduPath API is running!' });
});

app.post('/api/chat', (req, res) => {
    try {
        const { message, timestamp } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        
        // Generate AI response
        const aiResponse = getAIResponse(message);
        
        // Store in chat history
        const chatEntry = {
            id: Date.now(),
            userMessage: message,
            aiResponse: aiResponse,
            timestamp: timestamp || new Date().toISOString()
        };
        
        chatHistory.push(chatEntry);
        
        // Keep only last 100 messages to prevent memory issues
        if (chatHistory.length > 100) {
            chatHistory = chatHistory.slice(-100);
        }
        
        res.json({
            response: aiResponse,
            messageId: chatEntry.id,
            timestamp: chatEntry.timestamp
        });
        
    } catch (error) {
        console.error('Chat API error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/chat/history', (req, res) => {
    res.json({ history: chatHistory });
});

app.delete('/api/chat/history', (req, res) => {
    chatHistory = [];
    res.json({ message: 'Chat history cleared' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 EduPath API server running on http://localhost:${PORT}`);
    console.log(`📚 Chat endpoint: http://localhost:${PORT}/api/chat`);
    console.log(`💡 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;