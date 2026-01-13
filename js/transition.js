(function () {

    const DURATION = 1400;
    const HOLD = 200; // pause rideau plein écran

    function initTransition() {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition';
        overlay.innerHTML = `
            <div class="transition-layer">
                <div class="transition-text">ILBENDIB</div>
                <div class="transition-loader">
                    <div class="loader-spinner"></div>
                    <div class="loader-text">Loading...</div>
                    <div class="loader-progress">
                        <div class="loader-progress-bar"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    // Fonction pour attendre que tout soit chargé (images, CSS, JS)
    function waitForPageLoad() {
        return new Promise((resolve) => {
            // Si la page est déjà chargée
            if (document.readyState === 'complete') {
                // Attendre encore un peu pour les images lazy
                setTimeout(resolve, 100);
                return;
            }

            // Sinon, attendre l'événement load
            window.addEventListener('load', () => {
                // Attendre un peu plus pour être sûr que tout est rendu
                setTimeout(resolve, 100);
            });
        });
    }

    // Fonction pour attendre que toutes les images soient chargées
    function waitForImages() {
        const images = Array.from(document.querySelectorAll('img'));
        const promises = images.map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
                img.addEventListener('load', resolve);
                img.addEventListener('error', resolve); // Résoudre même en cas d'erreur
                // Timeout de sécurité
                setTimeout(resolve, 3000);
            });
        });
        return Promise.all(promises);
    }

    window.navigateWithCurtain = function (callback) {
        // 1️⃣ Fermeture
        document.body.classList.remove('opening');
        document.body.classList.add('closing');

        // 2️⃣ Rideau plein écran
        setTimeout(() => {
            callback();

            // 3️⃣ Afficher le loader et attendre le chargement complet
            setTimeout(() => {
                // Ajouter la classe loading pour afficher le spinner
                document.body.classList.add('loading');

                // Attendre que tout soit chargé
                Promise.all([
                    waitForPageLoad(),
                    waitForImages()
                ]).then(() => {
                    // Tout est chargé, on peut enlever le rideau
                    document.body.classList.remove('loading');
                    document.body.classList.remove('closing');
                    document.body.classList.add('opening');

                    // 4️⃣ Nettoyage
                    setTimeout(() => {
                        document.body.classList.remove('opening');
                    }, DURATION);
                }).catch(() => {
                    // En cas d'erreur, on enlève quand même le rideau
                    document.body.classList.remove('loading');
                    document.body.classList.remove('closing');
                    document.body.classList.add('opening');
                    
                    setTimeout(() => {
                        document.body.classList.remove('opening');
                    }, DURATION);
                });

            }, HOLD);

        }, DURATION);
    };

    // Fonction globale pour la navigation avec transition
    window.navigateTo = function(url) {
        navigateWithCurtain(() => {
            window.location.href = url;
        });
    };

    // Au chargement initial de la page
    document.addEventListener('DOMContentLoaded', () => {
        initTransition();
        
        // Attendre le chargement complet avant d'enlever l'overlay d'ouverture
        waitForPageLoad().then(() => {
            waitForImages().then(() => {
                // Petite pause pour que tout soit bien rendu
                setTimeout(() => {
                    document.body.classList.remove('loading');
                }, 100);
            });
        });
    });

})();


// (function() {
//     // Ajouter l’overlay automatiquement si absent
//     function initTransition() {
//         if (!document.querySelector('.page-transition')) {
//             const overlay = document.createElement('div');
//             overlay.className = 'page-transition';
//             overlay.innerHTML = '<div class="transition-layer"></div>';
//             document.body.appendChild(overlay);
//         }

//         // Ouverture automatique sur cette page
//         document.body.classList.add('opening');
//         setTimeout(() => {
//             document.body.classList.remove('opening');
//         }, 800);
//     }

//     window.navigateWithCurtain = function(url) {
//         // 1️⃣ Rideau monte
//         document.body.classList.remove('opening');
//         document.body.classList.add('closing');

//         // 2️⃣ Redirection immédiate pour que la page charge en même temps
//         setTimeout(() => {
//             window.location.href = url;
//         }, 50); // 50ms pour s’assurer que la classe closing soit appliquée
//     }

//     document.addEventListener('DOMContentLoaded', initTransition);
// })();