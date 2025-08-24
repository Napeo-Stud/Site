document.addEventListener('DOMContentLoaded', () => {
    // Récupère toutes les balises avec un attribut data-index
    const elements = document.querySelectorAll('.indexed1');
    
    console.log('Elements with data-index:', elements); // Log pour vérifier les éléments récupérés

    // Fonction pour assigner les classes selon l'index
    function assignClasses() {
        elements.forEach(element => {
            const index = parseInt(element.dataset.index);
            element.classList.remove('OnFrame', 'AftrFrame', 'BfrFrame'); // On enlève toutes les classes
            
            if (index > 3) {
                element.classList.add('AftrFrame');
            } else if (index % 3 === 1) {
                element.classList.add('OnFrame');
            } else if (index % 3 === 2) {
                element.classList.add('BfrFrame');
            } else {
                element.classList.add('AftrFrame');
            }
            console.log(`Element with data-index ${index} assigned class`); // Log pour vérifier l'attribution des classes
        });
    }

    
    let currentIndex = 1;
    const ref = document.querySelectorAll('#img1 img');
    const maxIndex = ref.length;

    console.log(maxIndex);

    function cycleClasses() {
        currentIndex++;

        if (currentIndex === maxIndex + 1) {
            currentIndex = 1; // Revenir à l'image initial
        } else {
            
        }
        elements.forEach(e => {
            const eIndex = parseInt(e.dataset.index);

            e.classList.remove('Rv', 'OnFrame', 'BfrFrame', 'AftrFrame');
            if (eIndex === currentIndex) {
                e.classList.add('OnFrame');
            } else if (eIndex === currentIndex - 1 || (currentIndex === 1 && eIndex === maxIndex)) {
                e.classList.add('AftrFrame');
            } else {
                e.classList.add('BfrFrame');
            }
        });
    }

    function reverseCycleClasses() {
        currentIndex--;

        if (currentIndex === 0) {
            currentIndex = maxIndex;
        } else {
            
        }
        elements.forEach(e => {
            const eIndex = parseInt(e.dataset.index);

            e.classList.remove('OnFrame', 'BfrFrame', 'AftrFrame');
            e.classList.add('Rv');
            if (eIndex === currentIndex) {
                e.classList.add('OnFrame');
            } else if (eIndex === currentIndex + 1 || (currentIndex === maxIndex && eIndex === 1)) {
                e.classList.add('BfrFrame');
            } else {
                e.classList.add('AftrFrame');
            }
        });
    }

    assignClasses();

    // Appel de la fonction cycleClasses toutes les X millisecondes pour alterner les classes
    const time = 3000;
    let intervalId = setInterval(cycleClasses, time); 
    let timeoutId = null;
    const NxtEnv = document.getElementById('Nxt-Env');
    const PrvEnv = document.getElementById('Prv-Env');
    const ttl = document.getElementById('ttl');

    function pauseInterval() {
        clearInterval(intervalId);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            intervalId = setInterval(cycleClasses, time);
        }, 5000);
    }

    // Fonction pour ajouter et retirer la classe après un certain temps
    function addTemporaryClass(e, type) {
        e.classList.add(type);
        setTimeout(() => {
        e.classList.remove(type);
        }, 500);
    }

    // Ajout des événements pour les boutons
    let clickCooldownActive = false;
    const clickCooldown = 400; // 1000 ms = 1 seconde

    function handleButtonClick(action, element) {
        if (!clickCooldownActive) {
            clickCooldownActive = true;
            action();
            pauseInterval();
            addTemporaryClass(element, 'ElmtClic');
            setTimeout(() => {
                clickCooldownActive = false;
            }, clickCooldown);
        }
    }

    document.getElementById('nxt').addEventListener('click', () => {
        handleButtonClick(cycleClasses, NxtEnv);
    });
    document.getElementById('prv').addEventListener('click', () => {
        handleButtonClick(reverseCycleClasses, PrvEnv);
    });
    ['click', 'mouseover'].forEach(event => {
        ttl.addEventListener(event, () => addTemporaryClass(ttl, 'shaky'));
    });

});