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

                // Сверхъяркий взрыв созвездия (больше частиц, выше скорость)
                for (let i = 0; i < 40; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 5 + 1; // Скорость от 1 до 6
                    particles.push(new Particle(
                        currentClickX + Math.cos(angle) * 5,
                        currentClickY + Math.sin(angle) * 5,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        true // Флаг: рожден по клику (для особой яркости)
                    ));
                }
            }
        });

        class Particle {
            constructor(x, y, vx, vy, isClicked = false) {
                this.x = x !== undefined ? x : Math.random() * width;
                this.y = y !== undefined ? y : Math.random() * height;
                this.baseSize = Math.random() * 2 + 1;
                this.size = this.baseSize;
                this.speedX = vx !== undefined ? vx : Math.random() * 0.4 - 0.2;
                this.speedY = vy !== undefined ? vy : Math.random() * 0.4 - 0.2;
                // Friction for particles spawned by click
                this.friction = vx !== undefined ? 0.95 : 1; // Усиленное трение для эффектного замедления
                this.isClicked = isClicked; // Метка для особой отрисовки
                this.life = isClicked ? 1.0 : 0; // Жизненный цикл для затухания яркости
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

                if (this.isClicked && this.life > 0) {
                    this.life -= 0.01; // Постепенное затухание спец-эффекта
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
                // Если частица создана кликом, она вспыхивает ярким белым/золотым цветом и медленно остывает
                if (this.isClicked && this.life > 0) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${this.life})`; // Яркая белая вспышка
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = 'rgba(207, 158, 54, 1)';
                } else {
                    ctx.fillStyle = 'rgba(207, 158, 54, 0.8)';
                    ctx.shadowBlur = 0;
                }

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0; // Сброс тени
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

                // Взрыв созвездия (больше частиц, выше скорость)
                for (let i = 0; i < 40; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 5 + 1; // Скорость от 1 до 6
                    particles2.push(new ContactParticle(
                        currentClickX + Math.cos(angle) * 5,
                        currentClickY + Math.sin(angle) * 5,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed,
                        true // Флаг для яркой отрисовки
                    ));
                }
            }
        });

        class ContactParticle {
            constructor(x, y, vx, vy, isClicked = false) {
                this.x = x !== undefined ? x : Math.random() * width2;
                this.y = y !== undefined ? y : Math.random() * height2;
                this.baseSize = Math.random() * 2 + 1;
                this.size = this.baseSize;
                this.speedX = vx !== undefined ? vx : Math.random() * 0.4 - 0.2;
                this.speedY = vy !== undefined ? vy : Math.random() * 0.4 - 0.2;
                this.friction = vx !== undefined ? 0.95 : 1;
                this.isClicked = isClicked;
                this.life = isClicked ? 1.0 : 0;
            }
            update() {
                this.speedX *= this.friction;
                this.speedY *= this.friction;

                if (this.friction < 1 && Math.abs(this.speedX) < 0.2) {
                    this.friction = 1;
                    this.speedX = Math.random() * 0.4 - 0.2;
                    this.speedY = Math.random() * 0.4 - 0.2;
                }

                if (this.isClicked && this.life > 0) {
                    this.life -= 0.01;
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
                if (this.isClicked && this.life > 0) {
                    ctx2.fillStyle = `rgba(255, 255, 255, ${this.life})`;
                    ctx2.shadowBlur = 15;
                    ctx2.shadowColor = 'rgba(207, 158, 54, 1)';
                } else {
                    ctx2.fillStyle = 'rgba(207, 158, 54, 0.8)';
                    ctx2.shadowBlur = 0;
                }

                ctx2.beginPath();
                ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx2.fill();
                ctx2.shadowBlur = 0;
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

});
