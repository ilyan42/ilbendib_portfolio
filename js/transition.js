(function () {

    const DURATION = 1400;
    const HOLD = 200; // pause rideau plein écran

    function initTransition() {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition';
        overlay.innerHTML = '<div class="transition-layer"></div>';
        document.body.appendChild(overlay);
    }

    window.navigateWithCurtain = function (callback) {
        // 1️⃣ Fermeture
        document.body.classList.remove('opening');
        document.body.classList.add('closing');

        // 2️⃣ Rideau plein écran
        setTimeout(() => {
            callback();

            // 3️⃣ Pause visuelle (IMPORTANT)
            setTimeout(() => {

                document.body.classList.remove('closing');
                document.body.classList.add('opening');

                // 4️⃣ Nettoyage
                setTimeout(() => {
                    document.body.classList.remove('opening');
                }, DURATION);

            }, HOLD);

        }, DURATION);
    };

    // Fonction globale pour la navigation avec transition
    window.navigateTo = function(url) {
        navigateWithCurtain(() => {
            window.location.href = url;
        });
    };

    document.addEventListener('DOMContentLoaded', initTransition);

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