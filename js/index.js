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
    
    // Close dropdown when hamburger menu closes
    const dropdownBtn = document.querySelector('.projects-dropdown-btn');
    const dropdown = document.querySelector('.projects-dropdown');
    
    if (dropdownBtn && dropdown) {
        // Fermer le dropdown quand le menu hamburger se ferme
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (!navMenu.classList.contains('mobile-open')) {
                        dropdown.classList.remove('show');
                        dropdownBtn.classList.remove('active');
                    }
                }
            });
        });
        observer.observe(navMenu, { attributes: true });
    }
    
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

    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();

            // aller sur la section contact
            const targetSection = 'contact';
            const section = document.getElementById(targetSection);
            if (section) {
                const targetPosition = section.offsetTop + 250; // Offset plus grand pour cacher complètement le header
                smoothScrollTo(targetPosition, 1500); // 1.5 secondes
            }
        });
    }

    const contactLink = document.querySelector('.contact-link');
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();

            // aller sur la section contact
            const targetSection = 'contact';
            const section = document.getElementById(targetSection);
            if (section) {
                const targetPosition = section.offsetTop + 250; // Offset plus grand pour cacher complètement le header
                smoothScrollTo(targetPosition, 1500); // 1.5 secondes
            }
        });
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
    
    // Ajouter événement click sur le logo ILYAN pour retourner en haut
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            // Retourner en haut comme pour Home
            smoothScrollTo(0, 1200); // 1.2 secondes
        });
        
        // Ajouter cursor pointer pour indiquer que c'est cliquable
        logo.style.cursor = 'pointer';
    }
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
                    const targetPosition = section.offsetTop - 150;
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

// Projects dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdownBtn = document.querySelector('.projects-dropdown-btn');
    const dropdown = document.querySelector('.projects-dropdown');
    const dropdownItems = document.querySelectorAll('.projects-dropdown-item');
    
    // Fonction de scroll personnalisée
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
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Toggle dropdown
    if (dropdownBtn && dropdown) {
        dropdownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            dropdown.classList.toggle('show');
            dropdownBtn.classList.toggle('active');
        });
    }
    
    // Handle dropdown item clicks
    dropdownItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetSection = this.getAttribute('data-section');
        const section = document.getElementById(targetSection);
        
        if (section) {
            let targetPosition;
            
            // Ajustements spécifiques selon la section
            if (targetSection === 'website') {
                targetPosition = section.offsetTop - 100;
            } else if (targetSection === 'modeling') {
                targetPosition = section.offsetTop - 150;
            } else if (targetSection === 'game') {
                targetPosition = section.offsetTop - 150; // Ajustement pour le jeu
            }
            
            smoothScrollTo(targetPosition, 1200);
        }
        
        // Fermer le dropdown
        dropdown.classList.remove('show');
        dropdownBtn.classList.remove('active');
        
        // Fermer AUSSI le menu hamburger principal sur mobile
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('mobile-open');
        }
    });
});
    
    // Fermer le dropdown en cliquant à l'extérieur
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && !dropdownBtn.contains(e.target)) {
            dropdown.classList.remove('show');
            dropdownBtn.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const requirementBtns = document.querySelectorAll('.requirement-btn');
    
    requirementBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('active');
        });
    });
});

// Configuration EmailJS
document.addEventListener('DOMContentLoaded', function() {
    console.log('EmailJS init démarré...');
    
    // Initialize EmailJS with your public key
    emailjs.init("m5Z9uBf-ZPdAITi0y");
    
    console.log('EmailJS initialisé');
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        console.log('Formulaire trouvé !');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Formulaire soumis !');
            
            // Récupérer les données du formulaire
            const formData = new FormData(contactForm);
            
            // Préparer les paramètres pour EmailJS
            const templateParams = {
                from_name: formData.get('firstName') + ' ' + formData.get('lastName'),
                from_email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message'),
                to_email: 'ilyanbendib@gmail.com' // Adresse de destination
            };
            
            console.log('Envoi des données:', templateParams);
            
            // Désactiver le bouton de soumission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Envoyer l'email
            console.log('Tentative d\'envoi...');
            emailjs.send('service_oszxbcp', 'template_8gtbsnz', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Afficher un message de succès
                    showMessage('Message sent successfully! I will get back to you soon.', 'success');
                    
                    // Réinitialiser le formulaire
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    console.log('Détails de l\'erreur:', error.text, error.status);
                    
                    // Afficher un message d'erreur
                    showMessage('Failed to send message. Please try again or contact me directly.', 'error');
                })
                .finally(function() {
                    // Réactiver le bouton
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    } else {
        console.log('ERREUR: Formulaire non trouvé !');
    }
    
    // Fonction pour afficher les messages
    function showMessage(message, type) {
        // Supprimer le message existant s'il y en a un
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Créer le nouvel élément de message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Insérer le message après le formulaire
        const contactForm = document.getElementById('contact-form');
        contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
        
        // Supprimer le message après 5 secondes
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
});

// Game Project Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const projectId = this.getAttribute('data-project');
            const detailsPanel = document.getElementById(`details-${projectId}`);
            const allDetailsPanels = document.querySelectorAll('.project-details-expanded');
            const allButtons = document.querySelectorAll('.learn-more-btn');
            
            const isCurrentlyActive = detailsPanel.classList.contains('active');
            
            // Ajouter une classe temporaire pour éviter les conflits de scroll
            document.body.classList.add('accordion-opening');
            
            // Fermer tous les autres panneaux
            allDetailsPanels.forEach(panel => {
                if (panel !== detailsPanel) {
                    panel.classList.remove('active');
                }
            });
            
            // Désactiver tous les autres boutons
            allButtons.forEach(btn => {
                if (btn !== this) {
                    btn.classList.remove('active');
                }
            });
            
            // Toggle le panneau actuel
            if (isCurrentlyActive) {
                detailsPanel.classList.remove('active');
                this.classList.remove('active');
                
                // Retirer la classe après l'animation
                setTimeout(() => {
                    document.body.classList.remove('accordion-opening');
                }, 600);
            } else {
                detailsPanel.classList.add('active');
                this.classList.add('active');
                
                // Scroll intelligent vers le projet après l'animation
                setTimeout(() => {
                    const gameProject = this.closest('.game-project');
                    const rect = gameProject.getBoundingClientRect();
                    const isVisible = rect.top >= 0 && rect.top <= window.innerHeight * 0.3;
                    
                    // Seulement faire le scroll si le projet n'est pas déjà bien visible
                    if (!isVisible) {
                        gameProject.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                    
                    // Retirer la classe après l'animation
                    document.body.classList.remove('accordion-opening');
                }, 600);
            }
        });
    });
});