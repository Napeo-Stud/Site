        //CODE OBSOLÈTE

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
                } else if (height > width) {
                    figure.classList.remove('horizontal-figure');
                    figure.classList.add('vertical-figure');
                } else {
                    figure.classList.remove('horizontal-figure', 'vertical-figure');
                    figure.classList.add('square-figure');
                }
            };

            image.onerror = function () {
                console.error('Erreur lors du chargement de l\'image : ' + img.src);
            };
        } else {
            console.error('Aucune image trouvée dans l\'élément :', element);
            }
        });