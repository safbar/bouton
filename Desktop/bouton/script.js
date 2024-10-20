const button = document.getElementById('movingButton');
const abandonButton = document.getElementById('abandonButton');
const container = document.querySelector('.container');
const message = document.getElementById('message');
const displayedImage = document.getElementById('displayedImage');

let mouseDetected = false; // Indicateur de détection de souris

// Fonction pour générer une position aléatoire dans les limites de l'écran
function getRandomPosition(max, offset) {
    return Math.random() * (max - offset);
}

// Définir une position aléatoire pour le bouton
let buttonX = getRandomPosition(container.clientWidth, button.offsetWidth);
let buttonY = getRandomPosition(container.clientHeight, button.offsetHeight);

let velocityX = 0; // Vitesse du bouton sur l'axe X
let velocityY = 0; // Vitesse du bouton sur l'axe Y

// Positionner le bouton à une position aléatoire au chargement
button.style.left = `${buttonX}px`;
button.style.top = `${buttonY}px`;

// Ouvrir Instagram et déplacer le bouton au clic
const instagramLink = 'https://www.instagram.com/reel/DAOMPICsBcw/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==';
button.addEventListener('click', () => {
    moveButtonToRandomPosition(); // Déplacer le bouton après le clic
    displayedImage.style.display = 'block'; // Afficher l'image après le clic
    setTimeout(() => {
        window.open(instagramLink, '_blank'); // Ouvrir le lien après 1 seconde
        displayedImage.style.display = 'none'; // Cacher l'image après l'ouverture du lien
    }, 1000);
});

// Ouvrir le même lien lorsque le bouton Abandonner est cliqué
abandonButton.addEventListener('click', () => {
    displayedImage.style.display = 'block'; // Afficher l'image après le clic
    setTimeout(() => {
        window.open(instagramLink, '_blank'); // Ouvrir le lien après 1 seconde
        displayedImage.style.display = 'none'; // Cacher l'image après l'ouverture du lien
    }, 1000);
});

// Vérifier si une souris est branchée
function checkMouse() {
    if (mouseDetected) {
        message.style.display = 'none'; // Cacher le message
        button.style.display = 'block'; // Afficher le bouton
    } else {
        message.style.display = 'block'; // Afficher le message
        button.style.display = 'none'; // Cacher le bouton
    }
}

// Fonction pour déplacer le bouton à une nouvelle position aléatoire
function moveButtonToRandomPosition() {
    buttonX = getRandomPosition(container.clientWidth, button.offsetWidth);
    buttonY = getRandomPosition(container.clientHeight, button.offsetHeight);
    button.style.left = `${buttonX}px`;
    button.style.top = `${buttonY}px`;
}

// Fonction pour mettre à jour la position du bouton
function updateButtonPosition(mouseX, mouseY) {
    const distanceX = mouseX - buttonX;
    const distanceY = mouseY - buttonY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    // Si le doigt ou la souris est proche (500px ou moins), ajuster la vitesse du bouton
    if (distance < 500) {
        const speedFactor = (300 - distance) / 5;

        velocityX = -(distanceX / distance) * speedFactor;
        velocityY = -(distanceY / distance) * speedFactor;
    }

    // Mettre à jour la position du bouton
    buttonX += velocityX;
    buttonY += velocityY;

    // Si le bouton atteint un bord, il réapparaît de l'autre côté
    if (buttonX < 0) {
        buttonX = container.clientWidth - button.offsetWidth;
    } else if (buttonX > container.clientWidth - button.offsetWidth) {
        buttonX = 0;
    }

    if (buttonY < 0) {
        buttonY = container.clientHeight - button.offsetHeight;
    } else if (buttonY > container.clientHeight - button.offsetHeight) {
        buttonY = 0;
    }

    // Appliquer les nouvelles positions au bouton
    button.style.left = `${buttonX}px`;
    button.style.top = `${buttonY}px`;
}

// Gestion du mouvement de la souris
document.addEventListener('mousemove', (event) => {
    mouseDetected = true; // Une souris est détectée
    checkMouse(); // Vérifier l'état de la souris
    updateButtonPosition(event.clientX, event.clientY);
});

// Gestion du mouvement tactile (doigt)
document.addEventListener('touchmove', (event) => {
    const touch = event.touches[0]; // Premier point de contact
    updateButtonPosition(touch.clientX, touch.clientY);
});

// Désactiver le clic droit
document.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // Empêcher le menu contextuel de s'ouvrir
});

// Vérification initiale de la souris
checkMouse();

// Faire apparaître le bouton Abandonner après 1 minute (60000 ms)
setTimeout(() => {
    abandonButton.style.display = 'block'; // Afficher le bouton Abandonner
}, 60000);
