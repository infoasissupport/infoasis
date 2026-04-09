// ===== LOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        initHeroAnimations();
    }, 2200);
});

// ===== CUSTOM CURSOR =====
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX - 4 + 'px';
    cursorDot.style.top = mouseY - 4 + 'px';
});

function animateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX - 20 + 'px';
    cursorRing.style.top = ringY - 20 + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .service-card, .portfolio-card, .tech-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

// ===== BACKGROUND FLOATING PARTICLES =====
const bgParticles = document.getElementById('bgParticles');
for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('bg-particle');
    const size = Math.random() * 4 + 1;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = Math.random() > 0.5 ? 'var(--primary)' : 'var(--accent)';
    p.style.animationDuration = Math.random() * 20 + 15 + 's';
    p.style.animationDelay = Math.random() * 20 + 's';
    bgParticles.appendChild(p);
}

// ===== NAV SCROLL =====
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== FORM SUBMIT =====
function submitForm(form) {
    const btn = form.querySelector('.form-submit');
    btn.innerHTML = '<i class="fas fa-check" style="margin-right:8px"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #00c853, #00f0ff)';
    setTimeout(() => {
        btn.innerHTML = 'Send Message <i class="fas fa-arrow-right" style="margin-left:8px"></i>';
        btn.style.background = '';
        form.reset();
    }, 3000);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetEl = document.querySelector(this.getAttribute('href'));
        if (targetEl) {
            if (typeof gsap !== 'undefined' && gsap.plugins && gsap.plugins.scrollTo) {
                gsap.to(window, { duration: 1, scrollTo: { y: targetEl, offsetY: 0 }, ease: 'power3.inOut' });
            } else {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
