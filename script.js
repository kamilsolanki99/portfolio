// ==================== GLOBAL VARIABLES ====================
let isScrolling = false;

// Update copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ==================== PAGE LOAD ANIMATIONS ====================
window.addEventListener('load', () => {
    // Animate skill bars after load
    setTimeout(() => {
        animateSkillBars();
    }, 500);
    
    // Initialize AOS-like animations
    initScrollAnimations();
    
    // Start counting animation for stats
    initCounterAnimation();
});

// ==================== NAVIGATION ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Hamburger menu toggle
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    
    // Show/hide back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
document.getElementById('backToTop')?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== PARALLAX EFFECTS ====================
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            updateParallax();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-bg, .gradient-orb');
    
    parallaxElements.forEach(element => {
        const speed = element.classList.contains('hero-bg') ? 0.5 : 0.3;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation for stats
                if (entry.target.classList.contains('about-stats')) {
                    startCounters();
                }
                
                // Trigger skill bar animation
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.fade-up, .timeline-item, .project-card, .skill-card').forEach(el => {
        observer.observe(el);
    });
    
    // Special observer for about stats
    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        observer.observe(aboutStats);
    }
    
    // Special observer for skills section
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// ==================== TYPING EFFECT ====================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ==================== COUNTER ANIMATION ====================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let started = false;
    
    window.startCounters = function() {
        if (started) return;
        started = true;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                    // Add "+" for large numbers
                    if (target >= 1000) {
                        counter.textContent = target + '+';
                    }
                }
            };
            
            updateCounter();
        });
    };
}

// ==================== SKILL BARS ANIMATION ====================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        setTimeout(() => {
            bar.style.width = percent + '%';
        }, 200);
    });
}

// ==================== GLITCH EFFECT ON HOVER ====================
const glitchElements = document.querySelectorAll('.glitch');

glitchElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.animation = 'glitch 0.3s infinite';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.animation = 'none';
    });
});

// ==================== PROJECT CARDS 3D EFFECT ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ==================== EMAILJS INTEGRATION ====================
// Initialize EmailJS
(function() {
    emailjs.init('scoq4j10FSdYZp8BB'); // Your public key
})();

// ==================== FORM VALIDATION ====================
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm(formData) {
    const errors = [];
    
    // Check required fields
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.email || !validateEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.subject || formData.subject.trim().length < 3) {
        errors.push('Subject must be at least 3 characters long');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
}

function showValidationErrors(errors) {
    const errorMessage = errors.join('\n• ');
    showNotification('Please fix the following:\n• ' + errorMessage, 'error');
}

function addFieldValidation() {
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Real-time email validation
    emailInput?.addEventListener('blur', function() {
        const email = this.value.trim();
        if (email && !validateEmail(email)) {
            this.style.borderColor = '#ff6b6b';
            this.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.3)';
        } else {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        }
    });
    
    // Clear error styling on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input?.addEventListener('input', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });
}

// ==================== FORM HANDLING ====================
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validate form data
    const validationErrors = validateForm(data);
    if (validationErrors.length > 0) {
        showValidationErrors(validationErrors);
        return;
    }
    
    // Create success message
    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Send email using EmailJS
    emailjs.send('service_pfwbh5u', 'template_gv7q564', {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message
    })
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)';
        
        // Reset form
        contactForm.reset();
        
        // Show success notification
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Restore button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
        
    }, function(error) {
        console.log('FAILED...', error);
        
        // Show error message
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send';
        submitBtn.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)';
        
        // Show error notification
        showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        
        // Restore button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
});

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let backgroundColor;
    if (type === 'success') {
        backgroundColor = 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)';
    } else if (type === 'error') {
        backgroundColor = 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)';
    } else {
        backgroundColor = 'linear-gradient(135deg, #00d4ff 0%, #7b2ff7 100%)';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${backgroundColor};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 10000;
        font-weight: 500;
        white-space: pre-line;
        max-width: 350px;
        line-height: 1.4;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ==================== MOUSE CURSOR EFFECT ====================
const cursorDot = document.createElement('div');
const cursorOutline = document.createElement('div');

cursorDot.className = 'cursor-dot';
cursorOutline.className = 'cursor-outline';

// Add custom cursor styles
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
    .cursor-dot {
        width: 5px;
        height: 5px;
        background: var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
    }
    
    .cursor-outline {
        width: 30px;
        height: 30px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
        opacity: 0.5;
    }
    
    .cursor-hover {
        transform: translate(-50%, -50%) scale(1.5);
        background: transparent;
        border-color: var(--accent-color);
    }
`;

document.head.appendChild(cursorStyles);
document.body.appendChild(cursorDot);
document.body.appendChild(cursorOutline);

// Update cursor position
window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: 'forwards' });
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, input, textarea');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('cursor-hover');
    });
});

// ==================== MAGNETIC BUTTONS ====================
const magneticButtons = document.querySelectorAll('.btn, .social-link');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// ==================== ACTIVE NAVIGATION HIGHLIGHT ====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== LAZY LOADING IMAGES ====================
const images = document.querySelectorAll('img');

const imageOptions = {
    threshold: 0,
    rootMargin: '0px 0px 50px 0px'
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            
            observer.unobserve(img);
        }
    });
}, imageOptions);

images.forEach(img => {
    imageObserver.observe(img);
});

// ==================== PREVENT RIGHT CLICK ON IMAGES ====================
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        showNotification('Image downloading is disabled', 'info');
    }
});

// ==================== PAGE VISIBILITY API ====================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = 'Come Back! - Kamil Solanki';
    } else {
        document.title = 'Kamil Solanki | Front-End Developer';
    }
});

// ==================== EASTER EGG ====================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    showNotification('🎉 Konami Code Activated! You found the easter egg!', 'success');
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 5000);
}

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
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

// ==================== NEON LIGHT TRAILS ====================
function createNeonTrail(e) {
    const trail = document.createElement('div');
    trail.className = 'neon-trail';
    trail.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, var(--primary-color), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX - 2}px;
        top: ${e.clientY - 2}px;
        animation: neon-trail-fade 0.8s ease-out forwards;
        box-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color);
    `;
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 800);
}

// Add neon trail animation styles
const neonTrailStyles = document.createElement('style');
neonTrailStyles.textContent = `
    @keyframes neon-trail-fade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
    
    .neon-lightning {
        position: fixed;
        width: 2px;
        height: 100vh;
        background: linear-gradient(to bottom, transparent, var(--primary-color), transparent);
        box-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color);
        animation: neon-lightning-flash 0.1s ease-in-out;
        pointer-events: none;
        z-index: 9998;
    }
    
    @keyframes neon-lightning-flash {
        0%, 100% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
    
    .neon-pulse-ring {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--accent-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        animation: neon-pulse-expand 0.6s ease-out forwards;
    }
    
    @keyframes neon-pulse-expand {
        0% {
            width: 20px;
            height: 20px;
            opacity: 1;
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(neonTrailStyles);

// Enable neon trails on mouse movement
let trailActive = true;
document.addEventListener('mousemove', (e) => {
    if (trailActive && Math.random() > 0.7) {
        createNeonTrail(e);
    }
});

// ==================== ENHANCED NEON PARTICLES ====================
function createNeonParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    
    // Add more colorful particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'neon-particle';
        
        const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)', 'var(--neon-pink)', 'var(--neon-green)'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: ${randomColor};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: neon-particle-float ${15 + Math.random() * 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            box-shadow: 0 0 10px ${randomColor}, 0 0 20px ${randomColor};
            opacity: 0.7;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Add neon particle animation
const neonParticleStyles = document.createElement('style');
neonParticleStyles.textContent = `
    @keyframes neon-particle-float {
        0% {
            transform: translateY(100vh) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(neonParticleStyles);

// ==================== NEON LIGHTNING EFFECTS ====================
function createLightning() {
    const lightning = document.createElement('div');
    lightning.className = 'neon-lightning';
    lightning.style.left = Math.random() * window.innerWidth + 'px';
    
    document.body.appendChild(lightning);
    
    setTimeout(() => {
        lightning.remove();
    }, 100);
}

// Random lightning effects
setInterval(() => {
    if (Math.random() > 0.95) {
        createLightning();
    }
}, 2000);

// ==================== NEON CLICK EFFECTS ====================
document.addEventListener('click', (e) => {
    // Create pulse ring effect
    const pulseRing = document.createElement('div');
    pulseRing.className = 'neon-pulse-ring';
    pulseRing.style.left = e.clientX - 10 + 'px';
    pulseRing.style.top = e.clientY - 10 + 'px';
    
    document.body.appendChild(pulseRing);
    
    setTimeout(() => {
        pulseRing.remove();
    }, 600);
    
    // Create multiple small particles
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 3px;
                height: 3px;
                background: var(--accent-color);
                border-radius: 50%;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                pointer-events: none;
                z-index: 9996;
                animation: neon-click-particle 0.8s ease-out forwards;
                box-shadow: 0 0 5px var(--accent-color);
            `;
            
            const angle = (i / 8) * 2 * Math.PI;
            const distance = 50;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${endX}px, ${endY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'ease-out'
            });
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 800);
        }, i * 50);
    }
});

// ==================== NEON SCROLL EFFECTS ====================
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollDiff = Math.abs(currentScrollY - lastScrollY);
    
    // Create scroll particles
    if (scrollDiff > 5) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 2px;
                    height: 10px;
                    background: linear-gradient(to bottom, var(--primary-color), transparent);
                    right: 20px;
                    top: ${Math.random() * window.innerHeight}px;
                    pointer-events: none;
                    z-index: 9995;
                    animation: neon-scroll-particle 1s ease-out forwards;
                    box-shadow: 0 0 5px var(--primary-color);
                `;
                
                particle.animate([
                    { transform: 'translateX(0)', opacity: 1 },
                    { transform: 'translateX(-100px)', opacity: 0 }
                ], {
                    duration: 1000,
                    easing: 'ease-out'
                });
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 1000);
            }, i * 100);
        }
    }
    
    lastScrollY = currentScrollY;
});

// ==================== NEON TYPING INDICATOR ====================
function addTypingIndicator() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            // Create typing spark
            const spark = document.createElement('div');
            const rect = input.getBoundingClientRect();
            
            spark.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--neon-green);
                border-radius: 50%;
                left: ${rect.right - 10}px;
                top: ${rect.top + rect.height / 2}px;
                pointer-events: none;
                z-index: 9994;
                animation: neon-typing-spark 0.3s ease-out forwards;
                box-shadow: 0 0 10px var(--neon-green);
            `;
            
            spark.animate([
                { transform: 'scale(1)', opacity: 1 },
                { transform: 'scale(0)', opacity: 0 }
            ], {
                duration: 300,
                easing: 'ease-out'
            });
            
            document.body.appendChild(spark);
            
            setTimeout(() => {
                spark.remove();
            }, 300);
        });
    });
}

// ==================== INITIALIZE ON DOM READY ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully! 🚀');
    console.log('Built with ❤️ by Kamil Solanki');
    
    // Add loading animation
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize neon effects
    createNeonParticles();
    addTypingIndicator();
    
    // Initialize form validation
    addFieldValidation();
    
    // Add keyboard shortcut to toggle trail effects
    document.addEventListener('keydown', (e) => {
        if (e.key === 't' || e.key === 'T') {
            trailActive = !trailActive;
            showNotification(`Neon trails ${trailActive ? 'enabled' : 'disabled'}!`, 'info');
        }
    });
});
