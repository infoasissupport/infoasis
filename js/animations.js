// ===== GSAP ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function initHeroAnimations() {
    const tl = gsap.timeline();
    tl.to('#heroTag', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to('#heroTitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .to('#heroSub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .to('#heroButtons', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .to('#scrollIndicator', { opacity: 1, duration: 1 }, '-=0.2');

    // Set initial positions
    gsap.set(['#heroTag', '#heroTitle', '#heroSub', '#heroButtons'], { y: 40 });
}

// Scroll-triggered section animations
gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
        y: 60, opacity: 0, duration: 0.8, delay: i * 0.1, ease: 'power3.out'
    });
});

// Tech marquee rows fade in
gsap.utils.toArray('.tech-marquee').forEach((row, i) => {
    gsap.from(row, {
        scrollTrigger: { trigger: row, start: 'top 90%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, duration: 0.7, delay: i * 0.15, ease: 'power3.out'
    });
});

// Portfolio cards
gsap.utils.toArray('.pf-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
        y: 50, opacity: 0, duration: 0.7, delay: i * 0.1, ease: 'power3.out'
    });
});

// About intro
gsap.from('.about-intro', {
    scrollTrigger: { trigger: '.about-intro', start: 'top 80%', toggleActions: 'play none none none' },
    y: 50, opacity: 0, duration: 0.8, ease: 'power3.out'
});

// About columns
gsap.utils.toArray('.about-col').forEach((col, i) => {
    gsap.from(col, {
        scrollTrigger: { trigger: col, start: 'top 85%', toggleActions: 'play none none none' },
        y: 50, opacity: 0, duration: 0.7, delay: i * 0.2, ease: 'power3.out'
    });
});

// About why cards
gsap.utils.toArray('.about-why-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out'
    });
});

// Contact CTA animation
gsap.from('.contact-cta', {
    scrollTrigger: { trigger: '.contact-cta', start: 'top 80%', toggleActions: 'play none none none' },
    y: 50, opacity: 0, duration: 0.8, ease: 'power3.out'
});

// Contact cards stagger
gsap.utils.toArray('.contact-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 0.6, delay: i * 0.12, ease: 'power3.out'
    });
});

// Contact socials
gsap.from('.contact-socials', {
    scrollTrigger: { trigger: '.contact-socials', start: 'top 90%', toggleActions: 'play none none none' },
    y: 30, opacity: 0, duration: 0.6, ease: 'power3.out'
});

// Section headers parallax
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
        scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
    });
});

// Parallax on hero 3D canvas while scrolling
gsap.to('#three-canvas', {
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: 200,
    opacity: 0.3
});

// Stats counter animation
const statNums = document.querySelectorAll('.stat-num');
statNums.forEach(stat => {
    const target = parseInt(stat.dataset.target);
    ScrollTrigger.create({
        trigger: stat,
        start: 'top 85%',
        onEnter: () => {
            gsap.to(stat, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: 'power2.out',
                onUpdate: function() {
                    const parent = stat.closest('.stat') || stat.closest('.stat-card');
                    const label = parent.querySelector('.stat-label').textContent;
                    stat.textContent = Math.round(parseFloat(stat.textContent)) + (label.includes('%') ? '%' : '+');
                }
            });
        },
        once: true
    });
});

// Tech marquee - no JS needed, runs on pure CSS animations
