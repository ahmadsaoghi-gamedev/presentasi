// Configuration file for environment variables
// This file is safe to commit to GitHub

window.APP_CONFIG = {
    // API Configuration - Set your API key here for Vercel
    // For Vercel: Go to Project Settings > Environment Variables > Add GEMINI_API_KEY
    GEMINI_API_KEY: null, // Will be set by Vercel environment variables
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',

    // Feature flags
    ENABLE_AI_FEEDBACK: true,
    ENABLE_AUDIO: true,
    ENABLE_ANIMATIONS: true,

    // Fallback settings
    USE_FALLBACK_MESSAGES: true,
    FALLBACK_MESSAGE_COUNT: 8,

    // Debug settings (set to false in production)
    DEBUG_MODE: false,
    LOG_API_CALLS: false
};

// Try to get API key from Vercel environment variables
if (typeof window !== 'undefined') {
    // This will be injected by Vercel at build time
    if (window.__GEMINI_API_KEY__) {
        window.APP_CONFIG.GEMINI_API_KEY = window.__GEMINI_API_KEY__;
    }
}

// Helper function to get API key safely
window.getApiKey = function (service) {
    switch (service) {
        case 'gemini':
            return window.APP_CONFIG.GEMINI_API_KEY;
        default:
            return null;
    }
};

// Helper function to check if API is available
window.isApiAvailable = function (service) {
    const key = window.getApiKey(service);
    return key && key !== 'null' && key !== 'undefined' && key.length > 0;
};
