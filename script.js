// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initSkillBars();
    initContactForm();
    initParticles();
    initTypewriter();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 15, 35, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .skill-card, .project-card').forEach(el => {
        observer.observe(el);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                const levelBar = entry.target.querySelector('.level-bar');
                const level = levelBar.getAttribute('data-level');
                
                setTimeout(() => {
                    levelBar.style.width = level + '%';
                }, 500);
            }
        });
    }, { threshold: 0.5 });

    skillCards.forEach(card => {
        skillObserver.observe(card);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles if not already added
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.innerHTML = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: rgba(26, 26, 46, 0.95);
                backdrop-filter: blur(10px);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                padding: 1rem 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-primary);
                z-index: 10000;
                animation: slideIn 0.3s ease;
                max-width: 400px;
                box-shadow: var(--shadow-card);
            }
            
            .notification-success { border-color: #10b981; }
            .notification-error { border-color: #ef4444; }
            .notification-info { border-color: var(--primary-color); }
            
            .notification-success i { color: #10b981; }
            .notification-error i { color: #ef4444; }
            .notification-info i { color: var(--primary-color); }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                margin-left: auto;
                padding: 0.25rem;
                border-radius: 4px;
                transition: all 0.3s ease;
            }
            
            .notification-close:hover {
                color: var(--text-primary);
                background: rgba(255, 255, 255, 0.1);
            }
            
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Particle system for hero section
function initParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(hero);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position and animation duration
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: 2px;
        height: 2px;
        background: rgba(99, 102, 241, 0.3);
        border-radius: 50%;
        animation: float ${duration}s ${delay}s infinite linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    container.appendChild(particle);
}

// Typewriter effect for hero title
function initTypewriter() {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    const text = 'KIYAZU';
    let index = 0;
    
    if (heroTitle) {
        heroTitle.textContent = '';
        
        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 150);
            } else {
                // Add blinking cursor effect
                heroTitle.style.borderRight = '3px solid var(--primary-color)';
                heroTitle.style.animation = 'blink 1s infinite';
                
                // Add blink animation if not exists
                if (!document.getElementById('blink-animation')) {
                    const style = document.createElement('style');
                    style.id = 'blink-animation';
                    style.innerHTML = `
                        @keyframes blink {
                            0%, 50% { border-color: var(--primary-color); }
                            51%, 100% { border-color: transparent; }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                // Remove cursor after 3 seconds
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                    heroTitle.style.animation = 'none';
                }, 3000);
            }
        }
        
        // Start typewriter effect after page load
        setTimeout(typeWriter, 1000);
    }
}

// Smooth reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.skill-card, .project-card, .about-text, .contact-info');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Add anime-style visual effects
    document.body.style.animation = 'rainbow 2s ease-in-out';
    
    if (!document.getElementById('rainbow-animation')) {
        const style = document.createElement('style');
        style.id = 'rainbow-animation';
        style.innerHTML = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                25% { filter: hue-rotate(90deg); }
                50% { filter: hue-rotate(180deg); }
                75% { filter: hue-rotate(270deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    showNotification('🎌 Anime power activated! Konami code detected!', 'success');
    
    setTimeout(() => {
        document.body.style.animation = 'none';
    }, 2000);
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(revealOnScroll, 100));

// Preload images and optimize performance
function preloadImages() {
    const imageUrls = [
        // Add any image URLs here if you have them
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
preloadImages();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loaded class styles
    if (!document.getElementById('loading-styles')) {
        const style = document.createElement('style');
        style.id = 'loading-styles';
        style.innerHTML = `
            body:not(.loaded) {
                overflow: hidden;
            }
            
            body:not(.loaded)::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--bg-dark);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            body:not(.loaded)::after {
                content: 'KIYAZU';
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 2rem;
                font-weight: 700;
                background: var(--gradient-primary);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                z-index: 10001;
                animation: pulse 1.5s ease-in-out infinite;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }
});
