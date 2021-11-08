const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const cactusImg = ['images/cactus00.png', 'images/cactus0.png', 'images/cactus2.png'];
const startButton = document.querySelector('.startbutton');

let position = 0;
let isJumping = false
let isGameOver = false

let leftTimer;

// Função de start 
startButton.addEventListener('click', (event) => {
    playGame();
})

function playGame() {
    startButton.style.display = 'none';
    document.addEventListener('keydown', keyDown);
    createCactus();

}

function keyDown(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;
    let upInterval = setInterval(() => {
        if (position >= 150) {
            // Descendo
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 15);
        } else {
            // Subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}


function createCactus() {
    let newCactus = document.createElement('img');
    let cactusPosition = 1000;
    let cactusSprite = cactusImg[Math.floor(Math.random() * cactusImg.length)];
    newCactus.src = cactusSprite;

    let randomTime = Math.random() * 4000;

    if (isGameOver) return;

    newCactus.classList.add('cactus');
    background.appendChild(newCactus);
    newCactus.style.left = cactusPosition + 'px';

    let leftTimer = setInterval(() => {
        if (cactusPosition < -60) {
            // Saiu da tela
            clearInterval(leftTimer);
            background.removeChild(newCactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            // Game over
            isGameOver = true;
            clearInterval(leftTimer);
            gameOver();
        } else {
            cactusPosition -= 10;
            newCactus.style.left = cactusPosition + 'px';
        }
    }, 15);
    setTimeout(createCactus, randomTime);
}

// game over

function gameOver() {
    document.removeEventListener('keydown', keyDown);
    document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
}