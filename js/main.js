/* ============================================
   DHAN PREM STUDIO - Main JavaScript
   Animations, Interactions & Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Loading Screen ----
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 500);
    }, 1200);
  }

  // ---- Navbar Scroll Effect ----
  const navbar = document.querySelector('.navbar');
  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  // ---- Mobile Menu Toggle ----
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // ---- Scroll Animations (Intersection Observer) ----
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in, .stagger-children').forEach(el => {
    animateOnScroll.observe(el);
  });

  // ---- Animated Counter ----
  const counters = document.querySelectorAll('.stat-number');

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    };

    updateCounter();
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ---- Typing Effect ----
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    const words = ['Digital Marketing', 'Content Creation', 'Brand Building', 'Social Media'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before next word
      }

      setTimeout(type, typeSpeed);
    };

    setTimeout(type, 1500);
  }

  // ---- Portfolio Filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          }, 300);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ---- Testimonials Slider ----
  const testimonialsTrack = document.querySelector('.testimonials-track');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  let currentTestimonial = 0;

  const updateTestimonial = (index) => {
    if (!testimonialsTrack) return;
    testimonialsTrack.style.transform = `translateX(-${index * 100}%)`;
    testimonialDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentTestimonial = index;
  };

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateTestimonial(index));
  });

  // Auto-play testimonials
  if (testimonialsTrack) {
    setInterval(() => {
      const nextIndex = (currentTestimonial + 1) % testimonialDots.length;
      updateTestimonial(nextIndex);
    }, 5000);
  }

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ---- Contact Form Handling ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const service = formData.get('service');
      const message = formData.get('message');

      // Simple validation
      if (!name || !email || !message) {
        showNotification('Please fill in all required fields', 'error');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }

      // Save to admin panel messages
      const adminData = JSON.parse(localStorage.getItem('dpAdminData') || '{}');
      if (!adminData.messages) adminData.messages = [];
      adminData.messages.push({
        id: Date.now(),
        name: name,
        email: email,
        phone: phone || '',
        service: service || '',
        message: message,
        date: new Date().toLocaleDateString('en-IN'),
        read: false
      });
      localStorage.setItem('dpAdminData', JSON.stringify(adminData));

      // Success animation
      const btn = contactForm.querySelector('.btn');
      btn.innerHTML = '<span>Sending...</span>';
      btn.style.pointerEvents = 'none';

      setTimeout(() => {
        btn.innerHTML = '<span>&#10003; Message Sent!</span>';
        btn.style.background = '#10B981';
        showNotification('Message sent successfully! We will contact you soon.', 'success');
        contactForm.reset();

        setTimeout(() => {
          btn.innerHTML = '<span>Send Message</span><span>&#10132;</span>';
          btn.style.background = '';
          btn.style.pointerEvents = '';
        }, 3000);
      }, 1500);
    });
  }

  // ---- Notification System ----
  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${type === 'success' ? '&#10003;' : '&#9888;'}</span>
      <span>${message}</span>
    `;

    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px 25px',
      borderRadius: '12px',
      background: type === 'success' ? '#FACC15' : '#EF4444',
      color: type === 'success' ? '#18181B' : 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '500',
      fontSize: '0.95rem',
      zIndex: '10000',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      transform: 'translateX(120%)',
      transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    });

    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
      notification.style.transform = 'translateX(120%)';
      setTimeout(() => notification.remove(), 400);
    }, 4000);
  };

  // ---- Parallax Effect ----
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    document.querySelectorAll('.hero-shape').forEach((shape, index) => {
      const speed = 0.05 * (index + 1);
      shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // ---- Page Transition Effect ----
  const pageTransition = document.querySelector('.page-transition');
  const links = document.querySelectorAll('a[href$=".html"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        e.preventDefault();
        if (pageTransition) {
          pageTransition.classList.add('active');
          setTimeout(() => {
            window.location.href = href;
          }, 300);
        } else {
          window.location.href = href;
        }
      }
    });
  });

  // ---- Back to Top Button ----
  const backToTop = document.createElement('button');
  backToTop.innerHTML = '&#8593;';
  Object.assign(backToTop.style, {
    position: 'fixed',
    bottom: '100px',
    right: '30px',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #FACC15, #F59E0B)',
    color: '#18181B',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    zIndex: '998',
    opacity: '0',
    transform: 'translateY(20px)',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(250,204,21,0.3)'
  });
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.style.opacity = '1';
      backToTop.style.transform = 'translateY(0)';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.transform = 'translateY(20px)';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Tilt Effect on Cards ----
  document.querySelectorAll('.service-card, .pricing-card, .value-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ---- Magnetic Effect on Buttons ----
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });

  // ---- Particle Effect (Hero Background) ----
  const createParticles = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 6 + 2;
      Object.assign(particle.style, {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: `rgba(250, 204, 21, ${Math.random() * 0.3 + 0.1})`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `particleFloat ${Math.random() * 10 + 10}s linear infinite`,
        animationDelay: `${Math.random() * 5}s`,
        pointerEvents: 'none'
      });
      hero.appendChild(particle);
    }

    // Add particle animation
    if (!document.querySelector('#particleStyle')) {
      const style = document.createElement('style');
      style.id = 'particleStyle';
      style.textContent = `
        @keyframes particleFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}50px); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  };

  createParticles();

  console.log('%c Dhan Prem Studio %c Website Loaded Successfully!',
    'background: linear-gradient(135deg, #FACC15, #F59E0B); color: #18181B; padding: 5px 10px; border-radius: 5px; font-weight: bold;',
    'color: #FACC15; font-weight: bold;'
  );
});
