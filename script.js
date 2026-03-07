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
});
