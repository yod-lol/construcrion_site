document.addEventListener('DOMContentLoaded', () => {
    // Nav links smooth scroll and active state
    const navLinks = document.querySelectorAll('nav a, .cta-nav');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = document.querySelector(link.getAttribute('href'));
            targetId.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Navbar background transition on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(21, 32, 15, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(21, 32, 15, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Slider Logic for Portfolio section
    const track = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    let currentIndex = 0;
    const slideCount = slides.length;

    function updateSliderPosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < slideCount - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to start
        }
        updateSliderPosition();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slideCount - 1; // Go to last slide
        }
        updateSliderPosition();
    });

    // Intersection Observer for scroll animations (fade in / slide up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateElements = document.querySelectorAll('.achievement-card, .process-step, .slide-info, .glass-card, .contact-card, .guarantee-card');

    // Add initial CSS state
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Maintain hover transition state after initial animation ends
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
                }, 600);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });

    // --- Visual Enhancements ---

    // 1. Initial Reveal Animations
    setTimeout(() => {
        document.querySelectorAll('.reveal-text, .subtitle-badge, .hero-subtitle, .hero-actions, .premium-achievements').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);

    // 2. Custom Cursor (Mix Blend Mode Difference)
    const customCursor = document.querySelector('.custom-cursor');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function renderCursor() {
        // Smooth interpolation (lerp) for the premium feel
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;

        if (customCursor) {
            customCursor.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;
        }
        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const interactiveElements = document.querySelectorAll('a, button, .btn-magnetic');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (customCursor) customCursor.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            if (customCursor) customCursor.classList.remove('active');
        });
    });

    // 2.5 Particles on Hover
    function createParticles(element, type, count = 8) {
        // Prevent overlapping animations if triggered rapidly
        if (element.dataset.spawning) return;
        element.dataset.spawning = "true";
        setTimeout(() => element.dataset.spawning = "", 800);

        const rect = element.getBoundingClientRect();
        // В цвет слоновой кости (ivory) или второстепенного (secondary)
        const colors = ['var(--bg-ivory)', 'var(--secondary-color)'];

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Randomize position within the button
            const originX = Math.random() * rect.width;
            const originY = Math.random() * rect.height;

            // Randomize flight direction
            const tx = (Math.random() - 0.5) * 150 + 'px';
            const ty = (Math.random() - 0.5) * 150 - 50 + 'px'; // Tend to fly upwards slightly
            const rot = (Math.random() - 0.5) * 360 + 'deg';

            particle.style.left = `${originX}px`;
            particle.style.top = `${originY}px`;
            particle.style.setProperty('--tx', tx);
            particle.style.setProperty('--ty', ty);
            particle.style.setProperty('--rot', rot);

            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.color = color;

            if (type === 'confetti') {
                particle.style.width = '8px';
                particle.style.height = '8px';
                particle.style.backgroundColor = color;
                // Optional: make some circular
                if (Math.random() > 0.5) particle.style.borderRadius = '50%';
            } else if (type === 'phone') {
                particle.style.width = '16px';
                particle.style.height = '16px';
                particle.innerHTML = `<svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`;
            } else if (type === 'telegram') {
                particle.style.width = '18px';
                particle.style.height = '18px';
                particle.innerHTML = `<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`;
            } else if (type === 'whatsapp') {
                particle.style.width = '18px';
                particle.style.height = '18px';
                particle.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>`;
            }

            // Must be relatively positioned element to contain the absolute particles
            if (getComputedStyle(element).position === 'static') {
                element.style.position = 'relative';
            }

            // Make sure element doesn't hide particles if possible, but keep overflowing if needed
            element.appendChild(particle);

            // Cleanup
            setTimeout(() => {
                if (element.contains(particle)) {
                    particle.remove();
                }
            }, 800);
        }
    }

    // Attach to specific elements
    const referralBtn = document.querySelector('.referral .btn-primary');
    if (referralBtn) {
        // Remove overflow hidden from parent to allow particles to fly out if needed
        referralBtn.style.overflow = 'visible';
        referralBtn.addEventListener('mouseenter', () => createParticles(referralBtn, 'confetti', 15));
    }

    const phoneContact = document.querySelector('.contact-card.phone');
    if (phoneContact) {
        phoneContact.addEventListener('mouseenter', () => createParticles(phoneContact, 'phone', 6));
    }

    const tgContact = document.querySelector('.contact-card.telegram');
    if (tgContact) {
        tgContact.addEventListener('mouseenter', () => createParticles(tgContact, 'telegram', 6));
    }

    const waContact = document.querySelector('.contact-card.whatsapp');
    if (waContact) {
        waContact.addEventListener('mouseenter', () => createParticles(waContact, 'whatsapp', 6));
    }

    // 3. Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            // Calculate distance from center
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;

            const fill = btn.querySelector('.btn-fill');
            if (fill) {
                fill.style.left = `${e.clientX - rect.left}px`;
                fill.style.top = `${e.clientY - rect.top}px`;
            }
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // 4. Parallax Effect for Backgrounds
    const heroImage = document.querySelector('.hero-bg-image');
    const processBg = document.querySelector('#process');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Hero parallax - smoother 
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
        }

        // Process parallax 
        if (processBg) {
            const rect = processBg.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                processBg.style.backgroundPosition = `center calc(50% + ${rect.top * 0.15}px)`;
            }
        }
    });

    // 4.5. 3D interaction for title
    const premiumTitle = document.querySelector('.premium-title');
    if (premiumTitle) {
        window.addEventListener('mousemove', (e) => {
            const rect = premiumTitle.getBoundingClientRect();
            // Check if mouse is in hero section roughly
            if (e.clientY < window.innerHeight) {
                const x = (e.clientX - window.innerWidth / 2) / 40;
                const y = (e.clientY - window.innerHeight / 2) / 40;
                premiumTitle.style.transform = `translate3d(${x}px, ${y}px, 0) rotateX(${-y / 2}deg) rotateY(${x / 2}deg)`;
            }
        });
    }

    // 5. Interactive Canvas (Reactive Constellations)
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let canvasMouseX = -1000;
        let canvasMouseY = -1000;

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = document.querySelector('.hero').offsetHeight || window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Track mouse
        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                canvasMouseX = e.clientX - rect.left;
                canvasMouseY = e.clientY - rect.top;
            } else {
                canvasMouseX = -1000;
                canvasMouseY = -1000;
            }
        });

        // Click to spawn constellation
        window.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                let currentClickX = e.clientX - rect.left;
                let currentClickY = e.clientY - rect.top;

                // Spawn 15 particles radially
                for (let i = 0; i < 15; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 2 + 0.5;
                    particles.push(new Particle(
                        currentClickX + Math.cos(angle) * 10,
                        currentClickY + Math.sin(angle) * 10,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed
                    ));
                }
            }
        });

        class Particle {
            constructor(x, y, vx, vy) {
                this.x = x !== undefined ? x : Math.random() * width;
                this.y = y !== undefined ? y : Math.random() * height;
                this.baseSize = Math.random() * 2 + 1;
                this.size = this.baseSize;
                this.speedX = vx !== undefined ? vx : Math.random() * 0.4 - 0.2;
                this.speedY = vy !== undefined ? vy : Math.random() * 0.4 - 0.2;
                // Friction for particles spawned by click
                this.friction = vx !== undefined ? 0.98 : 1;
            }
            update() {
                this.speedX *= this.friction;
                this.speedY *= this.friction;

                // Reset to slow roaming if they matched friction
                if (this.friction < 1 && Math.abs(this.speedX) < 0.2) {
                    this.friction = 1;
                    this.speedX = Math.random() * 0.4 - 0.2;
                    this.speedY = Math.random() * 0.4 - 0.2;
                }

                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > width) this.x = 0;
                else if (this.x < 0) this.x = width;
                if (this.y > height) this.y = 0;
                else if (this.y < 0) this.y = height;

                // React to mouse (Expansion on hover)
                const dx = canvasMouseX - this.x;
                const dy = canvasMouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    // Expand up to 3x based on proximity
                    let targetSize = this.baseSize + (150 - distance) / 30;
                    this.size += (targetSize - this.size) * 0.1;

                    // Slightly repel
                    this.x -= (dx / distance) * 0.5;
                    this.y -= (dy / distance) * 0.5;
                } else {
                    this.size += (this.baseSize - this.size) * 0.1;
                }
            }
            draw() {
                ctx.fillStyle = 'rgba(207, 158, 54, 0.8)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            let numParticles = Math.min(Math.floor(width / 15), 80); // Base roaming particles
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Connect to mouse (Constellation origin)
                const dx = canvasMouseX - particles[i].x;
                const dy = canvasMouseY - particles[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(207, 158, 54, ${0.25 - distance / 800})`;
                    ctx.lineWidth = 1.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(canvasMouseX, canvasMouseY);
                    ctx.stroke();
                }

                // Connect to other particles
                for (let j = i; j < particles.length; j++) {
                    const dx2 = particles[i].x - particles[j].x;
                    const dy2 = particles[i].y - particles[j].y;
                    const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                    if (distance2 < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(207, 158, 54, ${0.15 - distance2 / 800})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Limit particles to avoid lag
            if (particles.length > 200) {
                particles.splice(0, particles.length - 200);
            }

            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // 6. Interactive Canvas for Contacts
    const contactsCanvas = document.getElementById('contactsCanvas');
    if (contactsCanvas) {
        const ctx2 = contactsCanvas.getContext('2d');
        let width2, height2;
        let particles2 = [];
        let contactsMouseX = -1000;
        let contactsMouseY = -1000;

        const contactsSection = document.getElementById('contacts');

        function resizeContactsCanvas() {
            width2 = contactsCanvas.width = contactsSection.offsetWidth;
            height2 = contactsCanvas.height = contactsSection.offsetHeight;
        }

        window.addEventListener('resize', resizeContactsCanvas);
        resizeContactsCanvas();

        window.addEventListener('mousemove', (e) => {
            const rect = contactsCanvas.getBoundingClientRect();
            if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                contactsMouseX = e.clientX - rect.left;
                contactsMouseY = e.clientY - rect.top;
            } else {
                contactsMouseX = -1000;
                contactsMouseY = -1000;
            }
        });

        contactsSection.addEventListener('click', (e) => {
            const rect = contactsCanvas.getBoundingClientRect();
            if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                let currentClickX = e.clientX - rect.left;
                let currentClickY = e.clientY - rect.top;

                for (let i = 0; i < 15; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 2 + 0.5;
                    particles2.push(new ContactParticle(
                        currentClickX + Math.cos(angle) * 10,
                        currentClickY + Math.sin(angle) * 10,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed
                    ));
                }
            }
        });

        class ContactParticle {
            constructor(x, y, vx, vy) {
                this.x = x !== undefined ? x : Math.random() * width2;
                this.y = y !== undefined ? y : Math.random() * height2;
                this.baseSize = Math.random() * 2 + 1;
                this.size = this.baseSize;
                this.speedX = vx !== undefined ? vx : Math.random() * 0.4 - 0.2;
                this.speedY = vy !== undefined ? vy : Math.random() * 0.4 - 0.2;
                this.friction = vx !== undefined ? 0.98 : 1;
            }
            update() {
                this.speedX *= this.friction;
                this.speedY *= this.friction;

                if (this.friction < 1 && Math.abs(this.speedX) < 0.2) {
                    this.friction = 1;
                    this.speedX = Math.random() * 0.4 - 0.2;
                    this.speedY = Math.random() * 0.4 - 0.2;
                }

                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > width2) this.x = 0;
                else if (this.x < 0) this.x = width2;
                if (this.y > height2) this.y = 0;
                else if (this.y < 0) this.y = height2;

                const dx = contactsMouseX - this.x;
                const dy = contactsMouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    let targetSize = this.baseSize + (150 - distance) / 30;
                    this.size += (targetSize - this.size) * 0.1;
                    this.x -= (dx / distance) * 0.5;
                    this.y -= (dy / distance) * 0.5;
                } else {
                    this.size += (this.baseSize - this.size) * 0.1;
                }
            }
            draw() {
                ctx2.fillStyle = 'rgba(207, 158, 54, 0.8)';
                ctx2.beginPath();
                ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx2.fill();
            }
        }

        function initContactsParticles() {
            particles2 = [];
            let numParticles = Math.min(Math.floor(width2 / 20), 50);
            for (let i = 0; i < numParticles; i++) {
                particles2.push(new ContactParticle());
            }
        }
        initContactsParticles();

        function animateContactsParticles() {
            ctx2.clearRect(0, 0, width2, height2);

            for (let i = 0; i < particles2.length; i++) {
                particles2[i].update();
                particles2[i].draw();

                const dx = contactsMouseX - particles2[i].x;
                const dy = contactsMouseY - particles2[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    ctx2.beginPath();
                    ctx2.strokeStyle = `rgba(207, 158, 54, ${0.25 - distance / 800})`;
                    ctx2.lineWidth = 1.5;
                    ctx2.moveTo(particles2[i].x, particles2[i].y);
                    ctx2.lineTo(contactsMouseX, contactsMouseY);
                    ctx2.stroke();
                }

                for (let j = i; j < particles2.length; j++) {
                    const dx2 = particles2[i].x - particles2[j].x;
                    const dy2 = particles2[i].y - particles2[j].y;
                    const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                    if (distance2 < 120) {
                        ctx2.beginPath();
                        ctx2.strokeStyle = `rgba(207, 158, 54, ${0.15 - distance2 / 800})`;
                        ctx2.lineWidth = 0.8;
                        ctx2.moveTo(particles2[i].x, particles2[i].y);
                        ctx2.lineTo(particles2[j].x, particles2[j].y);
                        ctx2.stroke();
                    }
                }
            }

            if (particles2.length > 150) {
                particles2.splice(0, particles2.length - 150);
            }

            requestAnimationFrame(animateContactsParticles);
        }
        animateContactsParticles();
    }

    // 7. Interactive Guarantees (3D Hover & Glowing Borders)
    const guaranteeCards = document.querySelectorAll('.interactive-card');
    guaranteeCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // 3D Tilt effect (subtle)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5; // Subtle 5deg max
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = ``; // Reset to CSS default hover state
        });
    });

    // 8. Dynamic Background for Guarantees
    const guaranteesCanvas = document.getElementById('guaranteesCanvas');
    if (guaranteesCanvas) {
        const ctx3 = guaranteesCanvas.getContext('2d');
        let width3, height3;
        let particles3 = [];

        const guaranteesSection = document.getElementById('guarantees');

        function resizeGuaranteesCanvas() {
            width3 = guaranteesCanvas.width = guaranteesSection.offsetWidth;
            height3 = guaranteesCanvas.height = guaranteesSection.offsetHeight;
        }

        window.addEventListener('resize', resizeGuaranteesCanvas);
        resizeGuaranteesCanvas();

        class GuaranteeParticle {
            constructor() {
                this.x = Math.random() * width3;
                this.y = Math.random() * height3;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.2 - 0.1; // Slow floating
                this.speedY = Math.random() * 0.2 - 0.1;
                this.opacity = Math.random() * 0.3 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > width3) this.x = 0;
                else if (this.x < 0) this.x = width3;
                if (this.y > height3) this.y = 0;
                else if (this.y < 0) this.y = height3;
            }
            draw() {
                ctx3.fillStyle = `rgba(207, 158, 54, ${this.opacity})`;
                ctx3.beginPath();
                ctx3.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx3.fill();
            }
        }

        function initGuaranteesParticles() {
            particles3 = [];
            let numParticles = Math.min(Math.floor(width3 / 25), 60);
            for (let i = 0; i < numParticles; i++) {
                particles3.push(new GuaranteeParticle());
            }
        }
        initGuaranteesParticles();

        function animateGuaranteesParticles() {
            ctx3.clearRect(0, 0, width3, height3);

            for (let i = 0; i < particles3.length; i++) {
                particles3[i].update();
                particles3[i].draw();

                // Connect for a slow mesh effect
                for (let j = i; j < particles3.length; j++) {
                    const dx = particles3[i].x - particles3[j].x;
                    const dy = particles3[i].y - particles3[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx3.beginPath();
                        ctx3.strokeStyle = `rgba(207, 158, 54, ${0.1 - distance / 1200})`;
                        ctx3.lineWidth = 0.5;
                        ctx3.moveTo(particles3[i].x, particles3[i].y);
                        ctx3.lineTo(particles3[j].x, particles3[j].y);
                        ctx3.stroke();
                    }
                }
            }

            requestAnimationFrame(animateGuaranteesParticles);
        }
        animateGuaranteesParticles();
    }

});
