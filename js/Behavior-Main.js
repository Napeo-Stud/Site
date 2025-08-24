document.addEventListener("DOMContentLoaded", function() {

    // Détermine la var RGB de text-color pour la couleur de la grille de fond
    function hexToRgb(hex) {
        hex = hex.replace("#", "");
        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        return r + ", " + g + ", " + b;
    }

    // Convert and set the RGB values for the CSS variables
    let root = document.documentElement;

    // Fonction pour obtenir et définir une variable CSS en RGB
    function setRgbVariable(variableName) {
        let hexColor = getComputedStyle(root).getPropertyValue(variableName).trim();
        let rgbColor = hexToRgb(hexColor);
        root.style.setProperty(variableName + '-rgb', rgbColor);
    }

    // Obtenir et définir les valeurs RGB pour --text-color et --background-color
    setRgbVariable('--text-color');
    setRgbVariable('--background-color');


    /* ------------------------------------------------ */

    //Créer 2 couleur éclaici à partir de accent-color
    function hexToHsl(hex) {
        let r = parseInt(hex.slice(1, 3), 16) / 255;
        let g = parseInt(hex.slice(3, 5), 16) / 255;
        let b = parseInt(hex.slice(5, 7), 16) / 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatique
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h: h * 360, s: s * 100, l: l * 100 };
    };

    function hslToRgb(h, s, l) {
        h /= 360; s /= 100; l /= 100;
        let r, g, b;
        if (s == 0) {
            r = g = b = l; // achromatique
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }
            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
    };

    function lightenColor(hex, percent) {
        let { h, s, l } = hexToHsl(hex);
        l = Math.min(100, l + percent);
        return hslToRgb(h, s, l);
    };

    function setProperty() {
        let accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
        document.documentElement.style.setProperty('--light-accent-color-1', lightenColor(accentColor, 10));
        document.documentElement.style.setProperty('--light-accent-color-2', lightenColor(accentColor, -50));
    };

    setProperty();

    /* -------------------------------------- */

    //Détermine le comportement du MenuToggle
    const menuToggle = document.getElementById("toggle");
    const nav = document.getElementById("nav");
    const ClicZone = document.getElementById("ClicZone");

    menuToggle.addEventListener("click", (event) => {
        nav.classList.toggle("show");
        event.stopPropagation(); // Empêche la propagation de l'événement au document
    });

    // Gestionnaire d'événements pour la fermeture au clic en dehors de la navbar
    document.addEventListener("click", (event) => {
        if (nav.classList.contains("show") && !ClicZone.contains(event.target)) {
            nav.classList.remove("show");
        }
    });

    /* -------------------------------------- */
    
    //Détermine le comportement de la LangSwitch
    const SwitchBtns = document.querySelectorAll('.Switch-Btn');
    let currentLang = localStorage.getItem('preferredLang') || 'fr';
    const enElements = document.querySelectorAll('.en');
    const frElements = document.querySelectorAll('.fr');
    const btnCircles = document.querySelectorAll('.BtnCircle');

    function setLanguage(lang) {
        if (lang === 'fr') {
            enElements.forEach(el => el.style.display = 'none');
            frElements.forEach(el => el.style.display = 'flex');
            btnCircles.forEach(btnCircle => btnCircle.classList.remove('translate'));
        } else {
            enElements.forEach(el => el.style.display = 'flex');
            frElements.forEach(el => el.style.display = 'none');
            btnCircles.forEach(btnCircle => btnCircle.classList.add('translate'));
        }
        localStorage.setItem('preferredLang', lang);
    }

    setLanguage(currentLang);

    SwitchBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            currentLang = currentLang === 'en' ? 'fr' : 'en';
            setLanguage(currentLang);
        });
    });

    /* -------------------------------------- */
    //Établie de manière dynamique les images par défault
    
    // Sélectionne tous les articles dflt-win
    var elements = document.querySelectorAll('article.dflt-win');

    // Puis poursuis le traitement pour les autres (sauter le premier déjà modifié)
    elements.forEach(function (element, idx) {
    
        // Ignore le premier déjà transformé en cvr-win
        if (idx === 0) {
        elements[0].classList.remove('dflt-win');
        elements[0].classList.add('cvr-win');
        return;
        }
        // Sélectionne tous les <figure> enfants de cet article
        var figures = element.querySelectorAll('figure');

        figures.forEach(function(figure) {
        var img = figure.querySelector('img');
        if (img) {
            // Crée un nouvel objet Image pour obtenir les dimensions réelles
            var image = new Image();
            image.src = img.src;

            image.onload = function () {
                var width = image.naturalWidth;
                var height = image.naturalHeight;

                // Détermine l'orientation et assigne la classe appropriée à la figure
                if (width > height) {
                    figure.classList.remove('vertical-figure');
                    figure.classList.add('horizontal-figure');
                } else {
                    figure.classList.remove('horizontal-figure');
                    figure.classList.add('vertical-figure');
                }
            };

            image.onerror = function () {
                console.error('Erreur lors du chargement de l\'image : ' + img.src);
            };
        } else {
            console.error('Aucune image trouvée dans l\'élément :', element);
            }
        });
    
    }); // <-- Ajout du crochet fermant manquant ici
    
        /* -------------------------------------- */
        
        //Détermine le comportement des Flèches de Passage
        var elements = document.getElementsByClassName("svg");
    var pageDiv = document.querySelector('.pages');

    var ScrollByArw = function() {
        var parent = this.parentElement.parentElement.parentElement;
        // Vérifier la largeur de l'écran
        if (window.innerWidth > 815) {
            // Faites défiler horizontalement par la largeur de l'écran
            pageDiv.scrollTo({
                    left: pageDiv.scrollLeft + parent.offsetWidth,
                    behavior: 'smooth'
            });
        } else {
            // Faites défiler verticalement par la hauteur de l'écran
            const windowHeight = window.innerHeight;
            window.scrollBy({
                top: window.scrollX + parent.offsetHeight + 16,
                behavior: 'smooth'
            });
        }
    };

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', ScrollByArw, false);
    }
});

// Écoute les changements d'orientation
window.addEventListener("orientationchange", function() {
    // Réinitialise le scroll en définissant scrollTop à 0
    document.documentElement.scrollTop = 0;
});