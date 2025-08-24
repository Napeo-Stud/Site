document.addEventListener('DOMContentLoaded', () => {
    var pagDiv = document.querySelector('.pages');
    window.addEventListener('wheel', function(event) {
        // Vérifier si la largeur de la fenêtre est supérieure à 815px et si la hauteur est inférieure à 400px
        if (window.innerWidth > 815 || window.innerHeight < 400) {
            
            // Faire défiler horizontalement en fonction de la direction de la molette de la souris
            pagDiv.scrollBy({
                left: event.deltaY,
                behavior: 'auto'
            });
        }
    }); 
});