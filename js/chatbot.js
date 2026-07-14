/* ============================================
   AI CHATBOT - Dhan Prem Studio Support
   ============================================ */

(function() {
  // Create chatbot HTML
  const chatbotHTML = `
    <!-- Chatbot Toggle Button -->
    <button class="chatbot-toggle" id="chatbotToggle" aria-label="Chat with us">
      <span class="chatbot-badge" id="chatbotBadge">1</span>
      <svg class="icon-chat" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
        <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
      </svg>
      <svg class="icon-close" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>

    <!-- Chatbot Window -->
    <div class="chatbot-window" id="chatbotWindow">
      <div class="chatbot-header">
        <div class="chatbot-avatar">DP</div>
        <div class="chatbot-header-info">
          <h4>Dhan Prem AI Assistant</h4>
          <p><span class="online-dot"></span> Online now</p>
        </div>
        <button class="chatbot-close" id="chatbotClose" aria-label="Close chat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>

      <div class="chatbot-messages" id="chatbotMessages"></div>

      <div class="chatbot-quick-replies" id="quickReplies">
        <button class="quick-reply-btn" data-query="services">Our Services</button>
        <button class="quick-reply-btn" data-query="pricing">Pricing</button>
        <button class="quick-reply-btn" data-query="contact">Contact Us</button>
        <button class="quick-reply-btn" data-query="portfolio">Portfolio</button>
      </div>

      <div class="chatbot-input">
        <input type="text" id="chatbotInput" placeholder="Type your message..." autocomplete="off">
        <button class="chatbot-send" id="chatbotSend" aria-label="Send message">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  // Insert chatbot HTML before closing body tag
  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  // Chatbot Knowledge Base
  const responses = {
    greeting: [
      "Hello! Welcome to Dhan Prem Studio! 👋 I'm your AI assistant. How can I help you today?",
      "Hi there! 😊 Thanks for visiting Dhan Prem Studio. I'm here to help you with any questions about our services.",
      "Hey! Welcome to Lucknow's #1 Digital Marketing Studio! How can I assist you?"
    ],
    services: "We offer 6 core services:\n\n🎯 **Digital Marketing** - SEO, PPC, Email Marketing\n📹 **Content Creation** - Videos, Reels, YouTube\n📱 **Social Media Marketing** - Instagram, Facebook, LinkedIn\n🌐 **SEO Optimization** - Rank #1 on Google\n🎨 **Brand Identity** - Logo, Guidelines, Visual Design\n💻 **Web Development** - Websites, E-commerce\n\nWant details about any specific service?",
    pricing: "Our pricing is the **best in Lucknow**! 💰\n\n📦 **Starter Pack** - ₹4,999/month\n• 2 Social Media Platforms\n• 8 Posts per Month\n• Basic SEO\n\n📦 **Professional** - ₹14,999/month ⭐ MOST POPULAR\n• 4 Social Media Platforms\n• 20 Posts + 4 Reels\n• Advanced SEO & PPC\n• Video Content\n\n📦 **Enterprise** - ₹29,999/month\n• All Platforms\n• Unlimited Content\n• Full Marketing Suite\n• 24/7 Support\n\nWe offer the cheapest prices in Lucknow! Want a custom quote?",
    contact: "You can reach us through:\n\n📍 **Address:** Hazratganj, Lucknow, UP 226001\n📞 **Phone:** +91 98765 43210\n📧 **Email:** hello@dhanpremstudio.com\n💬 **WhatsApp:** Click the green button!\n\n⏰ **Hours:** Mon-Sat 9AM-8PM\n\nOr fill the form on our Contact page!",
    portfolio: "We've completed **200+ projects** for **50+ clients** including **10+ international** ones! 🌍\n\nSome highlights:\n🚀 TechStart - 300% ROI increase\n🎬 FreshBites - 2M+ video views\n🎨 LuxeLife - Complete brand redesign\n🛒 StyleHub - 5x conversion rate\n\nCheck out our Portfolio page for more!",
    about: "Dhan Prem Studio was founded in 2021 with a mission to provide world-class digital marketing at affordable prices.\n\n🏆 **5+ Years** Experience\n👥 **50+ Happy** Clients\n🌍 **10+ International** Clients\n📈 **200+ Projects** Delivered\n\nWe're Lucknow's most trusted digital agency!",
    experience: "We have **5+ years** of experience in:\n\n✅ Digital Marketing Strategy\n✅ Content Creation & Video Production\n✅ Social Media Management\n✅ SEO & Google Ads\n✅ Brand Identity Design\n✅ Web Development\n\nOur team has worked with 50+ clients across India and 10+ international clients!",
    location: "We're located in the heart of Lucknow! 🏙️\n\n📍 **Address:** Hazratganj, Lucknow, Uttar Pradesh 226001\n\nEasily accessible from anywhere in Lucknow. Visit us for a free consultation!",
    default: "I'm not sure I understand that. Here's what I can help with:\n\n• **Services** - What we offer\n• **Pricing** - Our packages\n• **Contact** - How to reach us\n• **Portfolio** - Our work\n• **About** - Our story\n• **Experience** - Our expertise\n\nOr type your question and I'll do my best to help! 😊"
  };

  // Keywords mapping
  const keywordMap = {
    services: ['service', 'services', 'what do you do', 'offer', 'provide', 'digital marketing', 'seo', 'content', 'social media', 'branding', 'web development', 'video'],
    pricing: ['price', 'pricing', 'cost', 'how much', 'packages', 'plan', 'cheap', 'affordable', 'budget', 'rates', 'fees'],
    contact: ['contact', 'reach', 'phone', 'email', 'address', 'location', 'call', 'whatsapp', 'meet', 'visit'],
    portfolio: ['portfolio', 'work', 'projects', 'clients', 'case study', 'examples', 'previous work'],
    about: ['about', 'who are you', 'tell me about', 'story', 'company', 'team', 'founder'],
    experience: ['experience', 'years', 'expertise', 'how long', 'skill', 'knowledge'],
    location: ['where', 'location', 'address', 'map', 'find you', 'direction', 'lucknow', 'visit'],
    greeting: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon', 'namaste', 'hii', 'sup']
  };

  // Get response based on user input
  function getResponse(input) {
    const lower = input.toLowerCase().trim();

    // Check keywords
    for (const [key, keywords] of Object.entries(keywordMap)) {
      if (keywords.some(word => lower.includes(word))) {
        return responses[key];
      }
    }

    // Check for thanks
    if (lower.includes('thank') || lower.includes('thanks') || lower.includes('dhanyavad')) {
      return "You're welcome! 😊 Glad I could help. Is there anything else you'd like to know about Dhan Prem Studio?";
    }

    // Check for bye
    if (lower.includes('bye') || lower.includes('goodbye') || lower.includes('alvida')) {
      return "Goodbye! 👋 Thank you for visiting Dhan Prem Studio. We hope to work with you soon! Have a great day! 🌟";
    }

    // Check for help
    if (lower.includes('help') || lower.includes('madad')) {
      return "I'm here to help! You can ask me about:\n\n• Our **Services**\n• **Pricing** plans\n• **Contact** details\n• **Portfolio** work\n• Our **Experience**\n• **Location**\n\nJust type your question! 😊";
    }

    return responses.default;
  }

  // Chatbot state
  let isOpen = false;
  let hasGreeted = false;

  // DOM elements
  const toggle = document.getElementById('chatbotToggle');
  const window_ = document.getElementById('chatbotWindow');
  const close = document.getElementById('chatbotClose');
  const messages = document.getElementById('chatbotMessages');
  const input = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSend');
  const quickReplies = document.getElementById('quickReplies');
  const badge = document.getElementById('chatbotBadge');

  // Add message to chat
  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;

    const avatar = document.createElement('div');
    avatar.className = 'chat-message-avatar';
    avatar.textContent = isUser ? '👤' : 'DP';

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
    messages.appendChild(messageDiv);

    // Scroll to bottom
    messages.scrollTop = messages.scrollHeight;
  }

  // Show typing indicator
  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot';
    typingDiv.id = 'typingIndicator';

    const avatar = document.createElement('div');
    avatar.className = 'chat-message-avatar';
    avatar.textContent = 'DP';

    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';

    typingDiv.appendChild(avatar);
    typingDiv.appendChild(typing);
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;
  }

  // Remove typing indicator
  function removeTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }

  // Send message
  function sendMessage(text) {
    if (!text.trim()) return;

    // Add user message
    addMessage(text, true);
    input.value = '';

    // Hide quick replies after first message
    quickReplies.style.display = 'none';

    // Show typing
    showTyping();

    // Simulate AI response delay
    setTimeout(() => {
      removeTyping();
      const response = getResponse(text);
      addMessage(response);
    }, 800 + Math.random() * 800);
  }

  // Toggle chatbot
  function toggleChatbot() {
    isOpen = !isOpen;
    toggle.classList.toggle('active', isOpen);
    window_.classList.toggle('active', isOpen);

    // Hide badge when opened
    if (isOpen) {
      badge.style.display = 'none';
      input.focus();
    }

    // Greet on first open
    if (!hasGreeted && isOpen) {
      hasGreeted = true;
      setTimeout(() => {
        addMessage(responses.greeting[Math.floor(Math.random() * responses.greeting.length)]);
      }, 500);
    }
  }

  // Event listeners
  toggle.addEventListener('click', toggleChatbot);
  close.addEventListener('click', toggleChatbot);

  sendBtn.addEventListener('click', () => {
    sendMessage(input.value);
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage(input.value);
    }
  });

  // Quick reply buttons
  quickReplies.addEventListener('click', (e) => {
    const btn = e.target.closest('.quick-reply-btn');
    if (btn) {
      const query = btn.getAttribute('data-query');
      sendMessage(query);
    }
  });

  // Show badge after 3 seconds
  setTimeout(() => {
    if (!isOpen) {
      badge.style.display = 'flex';
    }
  }, 3000);

})();
