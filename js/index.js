// Menu hamburger functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        // Toggle hamburger animation
        hamburger.classList.toggle('active');
        
        // Toggle mobile menu
        navMenu.classList.toggle('mobile-open');
    });
    
    // Close menu when clicking on a link - CORRIGÉ
    const navLinks = document.querySelectorAll('.nav-button');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('mobile-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('mobile-open');
        }
    });
});

// Navigation par boutons
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button');
    
    // Fonction de scroll personnalisée plus lente
    function smoothScrollTo(target, duration = 1500) {
        const start = window.pageYOffset;
        const distance = target - start;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        // Fonction d'easing pour une animation plus fluide
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtenir la section cible
            const targetSection = this.getAttribute('data-section');
            
            // Faire défiler vers la section avec scroll personnalisé
            if (targetSection !== 'home') {
                const section = document.getElementById(targetSection);
                if (section) {
                    const targetPosition = section.offsetTop - 100; // Offset plus grand pour cacher complètement le header
                    smoothScrollTo(targetPosition, 1500); // 1.5 secondes
                }
            } else {
                // Retourner en haut pour Home
                smoothScrollTo(0, 1200); // 1.2 secondes
            }
        });
    });
});

// Project buttons scroll functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectButtons = document.querySelectorAll('.project-button');
    
    // Fonction de scroll personnalisée (même que pour la nav)
    function smoothScrollTo(target, duration = 1500) {
        const start = window.pageYOffset;
        const distance = target - start;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        // Fonction d'easing pour une animation plus fluide
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const category = this.getAttribute('data-category');
            
            // Défiler vers la section correspondante
            if (category === 'website') {
                const section = document.getElementById('website');
                if (section) {
                    const targetPosition = section.offsetTop + 100;
                    smoothScrollTo(targetPosition, 1500);
                }
            } else if (category === 'modeling') {
                const section = document.getElementById('modeling');
                if (section) {
                    const targetPosition = section.offsetTop;
                    smoothScrollTo(targetPosition, 1500);
                }
            } else if (category === 'game') {
                const section = document.getElementById('game');
                if (section) {
                    const targetPosition = section.offsetTop;
                    smoothScrollTo(targetPosition, 1500);
                }
            }
        });
    });
});