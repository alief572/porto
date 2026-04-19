// ===================================
// Navigation
// ===================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Mobile Navigation Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background and scroll effects
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// Active Navigation Link Highlighting
// ===================================
const sections = document.querySelectorAll('section');
const navLinksElements = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Intersection Observer for Fade-in Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with fade-in class
document.querySelectorAll('.fade-in, .project-card, .highlight-card, .skill-item, .contact-card').forEach(el => {
    fadeInObserver.observe(el);
});

// ===================================
// Project Filter
// ===================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.textContent.toLowerCase();

        projectCards.forEach(card => {
            const category = card.querySelector('.project-category').textContent.toLowerCase();

            if (filter === 'all' || category.includes(filter)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===================================
// Button Click Effects
// ===================================
document.querySelectorAll('.btn, .overlay-btn, .project-link').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            // Show coming soon toast or alert
            showToast('Coming soon!');
        }
    });
});

// ===================================
// Toast Notification
// ===================================
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--color-text);
        color: white;
        padding: 14px 28px;
        border-radius: 9999px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Remove after delay
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ===================================
// Keyboard Navigation Enhancement
// ===================================
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===================================
// Performance: Passive Event Listeners
// ===================================
const passiveEvents = ['scroll', 'touchstart', 'touchmove'];
passiveEvents.forEach(event => {
    window.addEventListener(event, () => {}, { passive: true });
});

// ===================================
// Page Load Animation
// ===================================
const pageLoader = document.querySelector('.page-loader');
const body = document.body;

// Prevent scrolling during load
body.classList.add('loading');

// Handle page load
window.addEventListener('load', () => {
    // Wait for loader animation to complete (1.8s + small buffer)
    setTimeout(() => {
        // Fade out loader
        if (pageLoader) {
            pageLoader.classList.add('hidden');
        }

        // Remove loading state
        body.classList.remove('loading');
        body.classList.add('loaded');

        // Trigger hero animations with stagger
        const heroElements = document.querySelectorAll('.hero .container > *');
        heroElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            el.style.opacity = '1';
        });

        // Remove loader from DOM after fade
        setTimeout(() => {
            if (pageLoader) {
                pageLoader.remove();
            }
        }, 600);
    }, 2000);
});

// Fallback: hide loader if load event doesn't fire within 5s
setTimeout(() => {
    if (pageLoader && !pageLoader.classList.contains('hidden')) {
        pageLoader.classList.add('hidden');
        body.classList.remove('loading');
        body.classList.add('loaded');
    }
}, 5000);
