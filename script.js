document.addEventListener('DOMContentLoaded', function() {
    
    // --- SOUND EFFECTS ---
    // Load sound files (Note: you must have these files in the same directory)
    const hoverSound = new Audio('hover-sound.mp3');
    const clickSound = new Audio('click-sound.mp3');
    
    // Set volume levels (0.0 = silent, 1.0 = full volume)
    hoverSound.volume = 0.2; // Quiet hover sound
    clickSound.volume = 0.4; // Louder click sound

    // Add hover sound to all buttons and interactive elements
    const interactiveElements = document.querySelectorAll(
        '.btn, .btn-primary, .btn-secondary, .submit-btn, nav a, .skill-item, .card, .education-card, .cert-card, .language-card, .contact-item, a[href*="strava.com"]'
    );
    
    interactiveElements.forEach(element => {
        // Hover effect
        element.addEventListener('mouseenter', function() {
            hoverSound.currentTime = 0; // Reset to start
            hoverSound.play().catch(e => console.log('Hover sound failed'));
        });
        
        // Click effect (only for buttons and links)
        if (element.classList.contains('btn') || 
            element.classList.contains('btn-primary') || 
            element.classList.contains('btn-secondary') || 
            element.classList.contains('submit-btn') ||
            element.tagName === 'A') {
            element.addEventListener('click', function() {
                clickSound.currentTime = 0;
                clickSound.play().catch(e => console.log('Click sound failed'));
            });
        }
    });
    // --- END SOUND EFFECTS ---
    
    
    // --- Smooth scrolling for navigation links ---
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

    // --- Contact form AJAX submission ---
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const data = new FormData(event.target);
            
            fetch("https://formspree.io/f/xnnojeva", { 
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    form.style.display = 'none';
                    successMessage.style.display = 'block';
                } else {
                    alert('Oops! There was a problem submitting your form. Please try again.');
                }
            })
            .catch(error => {
                alert('Oops! A network error occurred.');
            });
        });
    }

    // --- Add scroll animation effect ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .education-card, .cert-card, .language-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});