// Menu hamburger functionality

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            // Toggle hamburger animation
            hamburger.classList.toggle('active');

            // Toggle mobile menu
            navMenu.classList.toggle('mobile-open');
        });
    }

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
    if (hamburger && navMenu) {
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('mobile-open');
            }
        });
    }
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

    const projectsDropdownItems = document.querySelectorAll('.projects-dropdown-item');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const category = this.dataset.category;

            // Configuration par catégorie
            const actions = {
                website: {
                    redirect: 'projects/Web.html'
                    
                },
                modeling: {
                    targetId: 'modeling',
                    offset: -150
                },
                game: {
                    redirect: 'projects/Games.html'
                }
            };

            const action = actions[category];
            if (!action) return;

            // 🔁 Redirection vers une autre page
            if (action.redirect) {
                navigateWithCurtain(() => {
                    window.location.href = action.redirect;
                });
                return;
            }

            // ⬇️ Scroll animé
            const section = document.getElementById(action.targetId);
            if (!section) return;

            const targetPosition = section.offsetTop + action.offset;
            smoothScrollTo(targetPosition, 1500);
        });
    });

    projectsDropdownItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            const category = this.dataset.section;
            // Configuration par catégorie
            const actions = {
                website: {
                    redirect: 'projects/Web.html'
                    
                },
                modeling: {
                    targetId: 'modeling',
                    offset: -150
                },
                game: {
                    redirect: 'projects/Games.html'
                }
            };

            const action = actions[category];
            if (!action) return;

            // 🔁 Redirection vers une autre page
            if (action.redirect) {
                navigateWithCurtain(() => {
                    window.location.href = action.redirect;
                });
                return;
            }

            // ⬇️ Scroll animé
            const section = document.getElementById(action.targetId);
            if (!section) return;

            const targetPosition = section.offsetTop + action.offset;
            smoothScrollTo(targetPosition, 1500);
        });
    });



});

// const projectButtons = document.querySelectorAll('.project-button');

// projectButtons.forEach(button => {
//     button.addEventListener('click', function(e) {
//         e.preventDefault();

//         const category = this.dataset.category;

//         if (category === 'game') {
//             navigateWithCurtain('Games.html'); // 🚀 transition + chargement simultané
//         }
//     });
// });


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
    if (dropdown && dropdownBtn) {
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target) && !dropdownBtn.contains(e.target)) {
                dropdown.classList.remove('show');
                dropdownBtn.classList.remove('active');
            }
        });
    }
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
    // Initialize EmailJS with your public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init("m5Z9uBf-ZPdAITi0y");
    }
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
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
            
            // Désactiver le bouton de soumission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Envoyer l'email
            emailjs.send('service_oszxbcp', 'template_8gtbsnz', templateParams)
                .then(function(response) {
                    // Afficher un message de succès
                    showMessage('Message sent successfully! I will get back to you soon.', 'success');
                    
                    // Réinitialiser le formulaire
                    contactForm.reset();
                }, function(error) {
                    // Afficher un message d'erreur
                    showMessage('Failed to send message. Please try again or contact me directly.', 'error');
                })
                .finally(function() {
                    // Réactiver le bouton
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
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





























// Language translations system

const translations = {
    en: {
        // Title
        "title": "Portfolio",
        "header.title": "PORTFOLIO",
        
        // Navigation
        "nav.home": "Home",
        "nav.about": "About Me",
        "nav.experience": "Experience",
        "nav.projects": "Projects",
        "nav.website": "Website Design",
        "nav.game": "Game Development",
        "nav.contact": "Get In Touch",
        "nav.prevproject": "Previous Project",
        "nav.nextproject": "Next Project",
        
        // About section
        "about.title": "About Me",
        "about.greeting": "Hi !",
        "about.description": "Welcome to my portfolio! Here you can find information about my work, projects, and how to contact me. I am a passionate developer with experience in various technologies. I love creating innovative solutions and collaborating with others to bring ideas to life. Feel free to explore my projects and learn more about my skills and experiences. If you have any questions or would like to get in touch, don't hesitate to reach out!",
        
        // Experience section
        "experience.title": "Experience",
        "exp1.role": "Student",
        "exp1.company": "42 School",
        "exp1.duration": "2023 - Present",
        "exp1.description": "Intensive programming curriculum focusing on peer-to-peer learning and project-based education. Developed strong problem-solving skills and mastered multiple programming languages including C, C++, and Python.",
        "exp2.role": "Indie Game Developer",
        "exp2.company": "Personal Projects",
        "exp2.duration": "2022 - Present",
        "exp2.description": "Developed small indie games as personal projects during free time. Focused on learning game mechanics, basic graphics programming, and user interaction design. Passionate about creating engaging gameplay experiences and exploring different game genres.",
        "exp3.role": "3D modeling & Web Developer",
        "exp3.company": "Side Projects",
        "exp3.duration": "2023 - Present",
        "exp3.description": "Learning 3D modeling and web development through hands-on projects. Experimenting with Blender for 3D content creation and building websites to explore modern web technologies and design principles.",
        
        // Skills
        "skills.algorithms": "Algorithms",
        "skills.3dmodeling": "3D Modeling",
        
        // Projects section
        "projects.title": "Projects",
        "projects.website": "WEBSITE DESIGN",
        "projects.game": "GAME DEVELOPMENT",
        
        // Contact section
        "contact.title": "Contact",
        "contact.subtitle": "Get In Touch With Me",
        "contact.firstname": "First name *",
        "contact.firstname_ph": "First name",
        "contact.lastname": "Last name",
        "contact.lastname_ph": "Last name",
        "contact.email": "Email *",
        "contact.phone": "Phone",
        "contact.phone_ph": "Phone",
        "contact.message": "How can I help?",
        "contact.message_ph": "Feel free to outline your ideas or needs...",
        "contact.submit": "Submit",
        
        // Footer
        "footer.copyright": "© 2025 Ilbendib's Portfolio",
        
        // Messages
        "lang.sending": "Sending...",
        "lang.success": "Message sent successfully! I will get back to you soon.",
        "lang.error": "Failed to send message. Please try again or contact me directly.",
        
        // Projects pages - Common
        "back": "Back to Portfolio",
        "back.projects": "Back to Projects",
        "viewproject": "View Project →",
        "project.about": "About This Project",
        "project.features": "Key Features",
        "project.viewproject": "View Project",
        "project.demo": "Demo Video",
        "project.devlog": "DevLog Video",
        "project.gameplay": "Gameplay Video",
        
        // Games page
        "games.title": "Games - Portfolio",
        "games.hero": "Game Development",
        "games.subtitle": "Passion • Creativity • Code",
        "games.proj1.desc": "3D Third-Person Game • Unreal Engine",
        "games.proj2.desc": "3D FPS Multiplayer • C++",
        "games.proj3.desc": "2D Adventure Game • C#",
        "games.proj4.desc": "3D Action-Adventure • Unreal Engine",
        
        // Web page
        "web.title": "Web Development - Portfolio",
        "web.hero": "Web Development",
        "web.subtitle": "Design • Code • Deploy",
        "web.proj1.title": "My Portfolio",
        "web.proj1.desc": "Personal Website • HTML/CSS/JS",
        "web.proj2.desc": "Full-Stack Web App • Django & JS",
        
        // Badges
        "badge.personal": "Personal",
        "badge.42project": "42 Project",
        "badge.indev": "In Development",
        "badge.prototype": "Prototype",
        
        // Tech labels
        "tech.responsive": "Responsive Design",
        "tech.hosting": "Hosting",
        "tech.year": "Year",
        "tech.database": "Database",
        "tech.engine": "Engine",
        "tech.language": "Language",
        "tech.status": "Status",
        "tech.genre": "Genre",
        "tech.openworld": "Open World",
        "tech.multiplayer": "Multiplayer",
        "tech.networking": "Networking",
        "tech.2dplatformer": "2D Platformer",
        "tech.adventure": "Adventure",
        "tech.archery": "Archery Combat",
        
        // Status
        "status.indev": "In Development",
        
        // Types
        "type.multiplayerfps": "Multiplayer FPS",
        "type.2dadventure": "2D Adventure",
        "type.3dactionadv": "3D Action-Adventure",
        
        // Portfolio project
        "portfolio.title": "My Portfolio - Web Development",
        "portfolio.name": "My Portfolio",
        "portfolio.subtitle": "Personal Portfolio Website",
        "portfolio.desc1": "This portfolio website showcases my skills, projects, and experiences as a developer. Built entirely from scratch using vanilla HTML, CSS, and JavaScript, it demonstrates my understanding of modern web development practices.",
        "portfolio.desc2": "The site features smooth page transitions, responsive design for all devices, interactive elements, and a clean, professional aesthetic. It serves as both a showcase of my work and a demonstration of my front-end development capabilities.",
        
        // Transcendence project
        "transcendence.title": "Transcendence - Web Development",
        "transcendence.subtitle": "Full-Stack Web Application",
        "transcendence.desc1": "Transcendence is the final project of the 42 School common core curriculum. It's a full-stack web application featuring a real-time multiplayer Pong game with user authentication, chat functionality, and tournament management.",
        "transcendence.desc2": "This project was developed as a team effort, where I contributed to both frontend and backend development. We implemented real-time WebSocket communication for smooth gameplay, OAuth authentication, and a comprehensive user management system.",
        
        // Action-Adventure project
        "actionadv.title": "Action-Adventure - Portfolio",
        "actionadv.subtitle": "3D Third-Person Open World Game",
        "actionadv.desc1": "A third-person action-adventure game inspired by The Legend of Zelda: Breath of the Wild. The player embodies a skilled adventurer exploring vast open landscapes filled with secrets, puzzles, and dynamic enemies.",
        "actionadv.desc2": "Currently in active development with new features being added regularly. The game focuses on exploration, combat mechanics, and an immersive world that rewards curiosity and creativity.",
        
        // WarFront project
        "warfront.title": "WarFront-Legacy - Portfolio",
        "warfront.subtitle": "3D FPS Multiplayer Game",
        "warfront.desc1": "This is my first real game development project - a competitive multiplayer FPS created using Unreal Engine. The game features fast-paced combat mechanics, real-time player interactions, and immersive 3D environments designed for intense multiplayer battles.",
        "warfront.desc2": "The project was a significant learning experience in networking, game architecture, and creating engaging multiplayer experiences. It taught me the fundamentals of FPS game design and real-time multiplayer synchronization.",
        
        // Aria project
        "aria.title": "Aria and the Lost Souls - Portfolio",
        "aria.subtitle": "2D Adventure Game",
        "aria.desc1": "Aria and the Lost Souls is a 2D adventure game that combines platforming mechanics with puzzle-solving elements. Players embark on a mystical journey through beautifully crafted environments.",
        "aria.desc2": "During development, I originally created a full first level that included AI-driven enemy combat, moving platforms, and trap-based environmental mechanics. The game features an immersive storyline with an interactive dialogue system.",
        
        // Shards project
        "shards.title": "Shards of Ylena - Portfolio",
        "shards.subtitle": "3D Action-Adventure Prototype",
        "shards.desc1": "Shards of Ylena is a solo action-adventure game prototype in which the player takes on the role of an agile archer. The development has focused on building core player gameplay, including fluid movement mechanics and a responsive archery system at the heart of the experience.",
        "shards.desc2": "This prototype explores the possibilities of ranged combat in a third-person perspective, with special attention to the feel of movement and the satisfaction of landing accurate shots. The fantasy setting provides a rich backdrop for future development.",
        
        // Features
        "feature.modernui": "Modern UI/UX",
        "feature.alldevices": "All Devices",
        "feature.animations": "Smooth Animations",
        "feature.optimized": "Optimized Loading",
        "feature.email": "Email Integration",
        "feature.menu": "Intuitive Menu",
        "feature.code": "Clean & Modular",
        "feature.seo": "Optimized",
        "feature.multiplayer": "Multiplayer",
        "feature.realtimepong": "Real-time Pong",
        "feature.livemsg": "Live Messaging",
        "feature.tournament": "Tournament",
        "feature.bracket": "Bracket System",
        "feature.profiles": "Profiles",
        "feature.dashboard": "User Dashboard",
        "feature.friends": "Friends",
        "feature.social": "Social System",
        "feature.deploy": "Deploy",
        "feature.security": "Security",
        "feature.exploration": "Exploration",
        "feature.combat": "Combat",
        "feature.dynamicsys": "Dynamic System",
        "feature.puzzles": "Puzzles",
        "feature.environmental": "Environmental",
        "feature.camera": "Camera",
        "feature.thirdperson": "Third-Person",
        "feature.movement": "Movement",
        "feature.fluidmech": "Fluid Mechanics",
        "feature.progression": "Progression",
        "feature.skillsys": "Skill System",
        "feature.quests": "Quests",
        "feature.dynamicobj": "Dynamic Objectives",
        "feature.visuals": "Visuals",
        "feature.stylizedart": "Stylized Art",
        "feature.realtimemulti": "Real-time Multiplayer",
        "feature.multiweapons": "Multiple Weapons",
        "feature.physics": "Physics",
        "feature.ballistics": "Realistic Ballistics",
        "feature.environment": "Environment",
        "feature.dynamicmaps": "Dynamic Maps",
        "feature.intuitivehud": "Intuitive HUD",
        "feature.playersys": "Player System",
        "feature.resources": "Resources",
        "feature.scoreammo": "Score & Ammo",
        "feature.survival": "Survival",
        "feature.healtharmor": "Health & Armor",
        "feature.story": "Story",
        "feature.narrative": "Immersive Narrative",
        "feature.handcrafted": "Hand-crafted",
        "feature.ost": "Original Soundtrack",
        "feature.difficulty": "Difficulty",
        "feature.multilevels": "Multiple Levels",
        "feature.enemyai": "Enemy AI System",
        "feature.health": "Health",
        "feature.visualfeedback": "Visual Feedback",
        "feature.respawn": "Respawn",
        "feature.checkpoint": "Checkpoint System",
        "feature.dialogue": "Dialogue",
        "feature.interactivenpc": "Interactive NPCs",
        "feature.archerysys": "Archery System",
        "feature.levels": "Levels",
        "feature.testenv": "Test Environment",
        "feature.arrows": "Arrows",
        "feature.elemental": "Elemental Types",
        "feature.blueprintsys": "Blueprint System",
        "feature.world": "World",
        "feature.fantasy": "Fantasy Setting",
        
        // Links
        "link.livesite": "Live Site",
        "link.sourcecode": "Source Code"
    },
    
    fr: {
        // Title
        "title": "Portfolio",
        "header.title": "PORTFOLIO",
        
        // Navigation
        "nav.home": "Accueil",
        "nav.about": "À propos",
        "nav.experience": "Expérience",
        "nav.projects": "Projets",
        "nav.website": "Conception Web",
        "nav.game": "Développement de Jeux",
        "nav.contact": "Me Contacter",
        "nav.prevproject": "Projet Précédent",
        "nav.nextproject": "Projet Suivant",
        
        // About section
        "about.title": "À propos de moi",
        "about.greeting": "Salut !",
        "about.description": "Bienvenue sur mon portfolio ! Ici, vous trouverez des informations sur mon travail, mes projets et comment me contacter. Je suis un développeur passionné avec de l'expérience dans diverses technologies. J'aime créer des solutions innovantes et collaborer avec d'autres pour donner vie aux idées. N'hésitez pas à explorer mes projets et à en apprendre davantage sur mes compétences et expériences. Si vous avez des questions ou souhaitez me contacter, n'hésitez pas !",
        
        // Experience section
        "experience.title": "Expérience",
        "exp1.role": "Étudiant",
        "exp1.company": "École 42",
        "exp1.duration": "2023 - Présent",
        "exp1.description": "Programme de programmation intensif axé sur l'apprentissage entre pairs et l'éducation par projets. Développement de solides compétences en résolution de problèmes et maîtrise de plusieurs langages de programmation dont C, C++ et Python.",
        "exp2.role": "Développeur de Jeux Indie",
        "exp2.company": "Projets Personnels",
        "exp2.duration": "2022 - Présent",
        "exp2.description": "Développement de petits jeux indépendants comme projets personnels pendant mon temps libre. Focus sur l'apprentissage des mécaniques de jeu, la programmation graphique de base et la conception d'interaction utilisateur. Passionné par la création d'expériences de jeu engageantes et l'exploration de différents genres.",
        "exp3.role": "Modélisation 3D & Développeur Web",
        "exp3.company": "Projets Annexes",
        "exp3.duration": "2023 - Présent",
        "exp3.description": "Apprentissage de la modélisation 3D et du développement web à travers des projets pratiques. Expérimentation avec Blender pour la création de contenu 3D et construction de sites web pour explorer les technologies web modernes et les principes de design.",
        
        // Skills
        "skills.algorithms": "Algorithmes",
        "skills.3dmodeling": "Modélisation 3D",
        
        // Projects section
        "projects.title": "Projets",
        "projects.website": "CONCEPTION WEB",
        "projects.game": "DÉVELOPPEMENT DE JEUX",
        
        // Contact section
        "contact.title": "Contact",
        "contact.subtitle": "Me Contacter",
        "contact.firstname": "Prénom *",
        "contact.firstname_ph": "Prénom",
        "contact.lastname": "Nom",
        "contact.lastname_ph": "Nom",
        "contact.email": "Email *",
        "contact.phone": "Téléphone",
        "contact.phone_ph": "Téléphone",
        "contact.message": "Comment puis-je vous aider ?",
        "contact.message_ph": "N'hésitez pas à décrire vos idées ou besoins...",
        "contact.submit": "Envoyer",
        
        // Footer
        "footer.copyright": "© 2025 Portfolio d'Ilbendib",
        
        // Messages
        "lang.sending": "Envoi en cours...",
        "lang.success": "Message envoyé avec succès ! Je vous répondrai bientôt.",
        "lang.error": "Échec de l'envoi. Veuillez réessayer ou me contacter directement.",
        
        // Projects pages - Common
        "back": "Retour au Portfolio",
        "back.projects": "Retour aux Projets",
        "viewproject": "Voir le Projet →",
        "project.about": "À propos de ce Projet",
        "project.features": "Fonctionnalités Clés",
        "project.viewproject": "Voir le Projet",
        "project.demo": "Vidéo Démo",
        "project.devlog": "Vidéo DevLog",
        "project.gameplay": "Vidéo Gameplay",
        
        // Games page
        "games.title": "Jeux - Portfolio",
        "games.hero": "Développement de Jeux",
        "games.subtitle": "Passion • Créativité • Code",
        "games.proj1.desc": "Jeu 3D Troisième Personne • Unreal Engine",
        "games.proj2.desc": "FPS 3D Multijoueur • C++",
        "games.proj3.desc": "Jeu d'Aventure 2D • C#",
        "games.proj4.desc": "Action-Aventure 3D • Unreal Engine",
        
        // Web page
        "web.title": "Développement Web - Portfolio",
        "web.hero": "Développement Web",
        "web.subtitle": "Design • Code • Déploiement",
        "web.proj1.title": "Mon Portfolio",
        "web.proj1.desc": "Site Personnel • HTML/CSS/JS",
        "web.proj2.desc": "Application Web Full-Stack • Django & JS",
        
        // Badges
        "badge.personal": "Personnel",
        "badge.42project": "Projet 42",
        "badge.indev": "En Développement",
        "badge.prototype": "Prototype",
        
        // Tech labels
        "tech.responsive": "Design Responsive",
        "tech.hosting": "Hébergement",
        "tech.year": "Année",
        "tech.database": "Base de données",
        "tech.engine": "Moteur",
        "tech.language": "Langage",
        "tech.status": "Statut",
        "tech.genre": "Genre",
        "tech.openworld": "Monde Ouvert",
        "tech.multiplayer": "Multijoueur",
        "tech.networking": "Réseau",
        "tech.2dplatformer": "Platformer 2D",
        "tech.adventure": "Aventure",
        "tech.archery": "Combat à l'Arc",
        
        // Status
        "status.indev": "En Développement",
        
        // Types
        "type.multiplayerfps": "FPS Multijoueur",
        "type.2dadventure": "Aventure 2D",
        "type.3dactionadv": "Action-Aventure 3D",
        
        // Portfolio project
        "portfolio.title": "Mon Portfolio - Développement Web",
        "portfolio.name": "Mon Portfolio",
        "portfolio.subtitle": "Site Portfolio Personnel",
        "portfolio.desc1": "Ce site portfolio présente mes compétences, projets et expériences en tant que développeur. Entièrement construit from scratch avec HTML, CSS et JavaScript vanilla, il démontre ma compréhension des pratiques modernes de développement web.",
        "portfolio.desc2": "Le site présente des transitions fluides, un design responsive pour tous les appareils, des éléments interactifs et une esthétique propre et professionnelle. Il sert à la fois de vitrine de mon travail et de démonstration de mes capacités en développement front-end.",
        
        // Transcendence project
        "transcendence.title": "Transcendence - Développement Web",
        "transcendence.subtitle": "Application Web Full-Stack",
        "transcendence.desc1": "Transcendence est le projet final du tronc commun de l'École 42. C'est une application web full-stack proposant un jeu de Pong multijoueur en temps réel avec authentification, fonctionnalité de chat et gestion de tournois.",
        "transcendence.desc2": "Ce projet a été développé en équipe, où j'ai contribué au développement frontend et backend. Nous avons implémenté la communication WebSocket en temps réel pour un gameplay fluide, l'authentification OAuth et un système complet de gestion des utilisateurs.",
        
        // Action-Adventure project
        "actionadv.title": "Action-Adventure - Portfolio",
        "actionadv.subtitle": "Jeu 3D Monde Ouvert Troisième Personne",
        "actionadv.desc1": "Un jeu d'action-aventure en troisième personne inspiré de The Legend of Zelda: Breath of the Wild. Le joueur incarne un aventurier agile explorant de vastes paysages ouverts remplis de secrets, énigmes et ennemis dynamiques.",
        "actionadv.desc2": "Actuellement en développement actif avec de nouvelles fonctionnalités ajoutées régulièrement. Le jeu se concentre sur l'exploration, les mécaniques de combat et un monde immersif qui récompense la curiosité et la créativité.",
        
        // WarFront project
        "warfront.title": "WarFront-Legacy - Portfolio",
        "warfront.subtitle": "Jeu FPS 3D Multijoueur",
        "warfront.desc1": "C'est mon premier vrai projet de développement de jeu - un FPS multijoueur compétitif créé avec Unreal Engine. Le jeu propose des mécaniques de combat rapides, des interactions joueur en temps réel et des environnements 3D immersifs conçus pour des batailles multijoueur intenses.",
        "warfront.desc2": "Le projet a été une expérience d'apprentissage significative en réseau, architecture de jeu et création d'expériences multijoueur engageantes. Il m'a appris les fondamentaux du game design FPS et de la synchronisation multijoueur en temps réel.",
        
        // Aria project
        "aria.title": "Aria and the Lost Souls - Portfolio",
        "aria.subtitle": "Jeu d'Aventure 2D",
        "aria.desc1": "Aria and the Lost Souls est un jeu d'aventure 2D qui combine des mécaniques de plateforme avec des éléments de résolution d'énigmes. Les joueurs embarquent pour un voyage mystique à travers des environnements magnifiquement conçus.",
        "aria.desc2": "Pendant le développement, j'ai créé un premier niveau complet incluant du combat ennemi basé sur l'IA, des plateformes mobiles et des mécaniques environnementales basées sur les pièges. Le jeu présente une histoire immersive avec un système de dialogue interactif.",
        
        // Shards project
        "shards.title": "Shards of Ylena - Portfolio",
        "shards.subtitle": "Prototype Action-Aventure 3D",
        "shards.desc1": "Shards of Ylena est un prototype de jeu d'action-aventure solo dans lequel le joueur incarne un archer agile. Le développement s'est concentré sur la construction du gameplay de base, incluant des mécaniques de mouvement fluides et un système de tir à l'arc réactif au cœur de l'expérience.",
        "shards.desc2": "Ce prototype explore les possibilités du combat à distance en vue à la troisième personne, avec une attention particulière au ressenti du mouvement et à la satisfaction de tirs précis. L'univers fantasy offre un riche décor pour le développement futur.",
        
        // Features
        "feature.modernui": "UI/UX Moderne",
        "feature.alldevices": "Tous Appareils",
        "feature.animations": "Animations Fluides",
        "feature.optimized": "Chargement Optimisé",
        "feature.email": "Intégration Email",
        "feature.menu": "Menu Intuitif",
        "feature.code": "Code Propre & Modulaire",
        "feature.seo": "Optimisé",
        "feature.multiplayer": "Multijoueur",
        "feature.realtimepong": "Pong Temps Réel",
        "feature.livemsg": "Messagerie Live",
        "feature.tournament": "Tournoi",
        "feature.bracket": "Système de Brackets",
        "feature.profiles": "Profils",
        "feature.dashboard": "Tableau de Bord",
        "feature.friends": "Amis",
        "feature.social": "Système Social",
        "feature.deploy": "Déploiement",
        "feature.security": "Sécurité",
        "feature.exploration": "Exploration",
        "feature.combat": "Combat",
        "feature.dynamicsys": "Système Dynamique",
        "feature.puzzles": "Énigmes",
        "feature.environmental": "Environnemental",
        "feature.camera": "Caméra",
        "feature.thirdperson": "Troisième Personne",
        "feature.movement": "Mouvement",
        "feature.fluidmech": "Mécaniques Fluides",
        "feature.progression": "Progression",
        "feature.skillsys": "Système de Compétences",
        "feature.quests": "Quêtes",
        "feature.dynamicobj": "Objectifs Dynamiques",
        "feature.visuals": "Visuels",
        "feature.stylizedart": "Art Stylisé",
        "feature.realtimemulti": "Multijoueur Temps Réel",
        "feature.multiweapons": "Armes Multiples",
        "feature.physics": "Physique",
        "feature.ballistics": "Balistique Réaliste",
        "feature.environment": "Environnement",
        "feature.dynamicmaps": "Cartes Dynamiques",
        "feature.intuitivehud": "HUD Intuitif",
        "feature.playersys": "Système Joueur",
        "feature.resources": "Ressources",
        "feature.scoreammo": "Score & Munitions",
        "feature.survival": "Survie",
        "feature.healtharmor": "Vie & Armure",
        "feature.story": "Histoire",
        "feature.narrative": "Narration Immersive",
        "feature.handcrafted": "Fait Main",
        "feature.ost": "Bande Son Originale",
        "feature.difficulty": "Difficulté",
        "feature.multilevels": "Niveaux Multiples",
        "feature.enemyai": "IA Ennemie",
        "feature.health": "Vie",
        "feature.visualfeedback": "Retour Visuel",
        "feature.respawn": "Réapparition",
        "feature.checkpoint": "Système de Checkpoints",
        "feature.dialogue": "Dialogue",
        "feature.interactivenpc": "PNJ Interactifs",
        "feature.archerysys": "Système de Tir à l'Arc",
        "feature.levels": "Niveaux",
        "feature.testenv": "Environnement de Test",
        "feature.arrows": "Flèches",
        "feature.elemental": "Types Élémentaires",
        "feature.blueprintsys": "Système Blueprint",
        "feature.world": "Monde",
        "feature.fantasy": "Univers Fantasy",
        
        // Links
        "link.livesite": "Site Live",
        "link.sourcecode": "Code Source"
    }
};

// Current language
let currentLang = localStorage.getItem('portfolio_lang') || 'en';

// Function to translate the page
function translatePage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Update title if element exists
    const titleElement = document.querySelector('title[data-i18n]');
    if (titleElement) {
        const key = titleElement.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            document.title = translations[lang][key];
        }
    }
    
    // Update flag icon
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        const flag = langToggle.querySelector('.flag');
        if (flag) {
            flag.textContent = lang === 'en' ? '🇬🇧' : '🇫🇷';
        }
        langToggle.title = lang === 'en' ? 'Switch to French' : 'Passer en anglais';
    }
}

// Get translation helper function (for use in other scripts)
function getTranslation(key) {
    if (translations[currentLang] && translations[currentLang][key]) {
        return translations[currentLang][key];
    }
    return translations['en'][key] || key;
}

// Initialize language on page load
(function() {
    // Apply saved language or default to English
    translatePage(currentLang);
    
    // Setup language toggle
    setupLanguageToggle();
})();

function setupLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    
    if (!langToggle) {
        return;
    }
    
    if (!langDropdown) {
        return;
    }
    
    // Update active option indicator
    function updateActiveOption() {
        document.querySelectorAll('.lang-option').forEach(option => {
            const lang = option.getAttribute('data-lang');
            option.classList.toggle('active', lang === currentLang);
        });
    }
    
    // Toggle dropdown on button click
    langToggle.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isShown = langDropdown.classList.contains('show');
        langDropdown.classList.toggle('show', !isShown);
        langToggle.classList.toggle('active', !isShown);
        
        if (!isShown) {
            updateActiveOption();
        }
    };
    
    // Handle language option clicks
    langDropdown.onclick = function(e) {
        const option = e.target.closest('.lang-option');
        if (!option) {
            return;
        }
        
        e.preventDefault();
        e.stopPropagation();
        
        const newLang = option.getAttribute('data-lang');
        
        if (newLang && newLang !== currentLang) {
            translatePage(newLang);
        }
        
        langDropdown.classList.remove('show');
        langToggle.classList.remove('active');
    };
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('show');
            langToggle.classList.remove('active');
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            langDropdown.classList.remove('show');
            langToggle.classList.remove('active');
        }
    });
    
    // Initial update
    updateActiveOption();
}
