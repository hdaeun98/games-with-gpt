document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('game-grid');
    const cardArray = [
        { name: 'Dog', img: 'dog1.jpg', value: 'dog', id: 1 },
        { name: 'Dog', img: 'dog2.jpg', value: 'dog', id: 2 },
        { name: 'Cat', img: 'cat1.jpg', value: 'cat', id: 3 },
        { name: 'Cat', img: 'cat2.jpg', value: 'cat', id: 4 },
        { name: 'Fish', img: 'fish1.jpg', value: 'fish', id: 5 },
        { name: 'Fish', img: 'fish2.jpg', value: 'fish', id: 6 },
        { name: 'Bird', img: 'bird1.jpg', value: 'bird', id: 7 },
        { name: 'Bird', img: 'bird2.jpg', value: 'bird', id: 8 }
    ];

    cardArray.sort(() => 0.5 - Math.random());

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let gameInProgress = false;
    let startTime;

    function createBoard() {
        cardArray.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.id = index;
            cardElement.addEventListener('click', flipCard);
            const cardImage = document.createElement('img');
            cardImage.src = card.img;
            cardImage.alt = card.name;
            cardElement.appendChild(cardImage);
            grid.appendChild(cardElement);
        });
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const [optionOneId, optionTwoId] = cardsChosenId;

        if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].classList.add('matched');
            cards[optionTwoId].classList.add('matched');
            cardsWon.push(cardsChosen[0]); // Push only one of the matched card values
        } else {
            setTimeout(() => {
                cards[optionOneId].classList.remove('flipped');
                cards[optionTwoId].classList.remove('flipped');
            }, 500);
        }

        cardsChosen = [];
        cardsChosenId = [];
        gameInProgress = false; // Reset game status

        if (cardsWon.length === cardArray.length / 2) {
            const endTime = performance.now();
            const timeTaken = (((endTime - startTime) / 1000) * 10).toFixed(3); 
            setTimeout(() => alert(`Congratulations! You found them all in ${timeTaken} seconds!`), 500);
        }
    }

    function flipCard() {
        if (cardsChosen.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched') && !gameInProgress) {
            const cardId = this.dataset.id;
            cardsChosen.push(cardArray[cardId].value);
            cardsChosenId.push(cardId);
            this.classList.add('flipped');

            if (cardsChosen.length === 1) {
                startTime = performance.now(); // Start counting when the first card is flipped
            }

            if (cardsChosen.length === 2) {
                gameInProgress = true; // Set game in progress
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function restartGame() {
        // Remove all cards from the grid
        grid.innerHTML = '';
        // Reset game variables
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        gameInProgress = false;
        startTime = null;
        // Create a new game board
        createBoard();
    }

    // Create a restart button after the grid
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.addEventListener('click', restartGame);
    document.body.appendChild(restartButton);

    createBoard();
});
