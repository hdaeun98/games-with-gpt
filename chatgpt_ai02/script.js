document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const result = document.querySelector('.result p');
    const playerScoreElem = document.querySelector('.player-score');
    const aiScoreElem = document.querySelector('.ai-score');

    let playerScore = 0;
    let aiScore = 0;
    const playerMoves = [];

    const aiChoice = () => {
        const moveCounts = { rock: 0, paper: 0, scissors: 0 };

        // Count the player's previous moves
        playerMoves.forEach(move => {
            moveCounts[move]++;
        });

        // Predict the player's next move (most frequent move)
        let predictedMove;
        if (moveCounts.rock > moveCounts.paper && moveCounts.rock > moveCounts.scissors) {
            predictedMove = 'rock';
        } else if (moveCounts.paper > moveCounts.rock && moveCounts.paper > moveCounts.scissors) {
            predictedMove = 'paper';
        } else {
            predictedMove = 'scissors';
        }

        // AI counters the predicted move
        switch (predictedMove) {
            case 'rock':
                return 'paper';
            case 'paper':
                return 'scissors';
            case 'scissors':
                return 'rock';
            default:
                const randomChoice = ['rock', 'paper', 'scissors'];
                return randomChoice[Math.floor(Math.random() * randomChoice.length)];
        }
    };

    const getResult = (player, ai) => {
        if (player === ai) {
            return 'draw';
        }
        if (
            (player === 'rock' && ai === 'scissors') ||
            (player === 'paper' && ai === 'rock') ||
            (player === 'scissors' && ai === 'paper')
        ) {
            return 'win';
        }
        return 'lose';
    };

    const updateScore = (result) => {
        if (result === 'win') {
            playerScore++;
        } else if (result === 'lose') {
            aiScore++;
        }
        playerScoreElem.textContent = `Player: ${playerScore}`;
        aiScoreElem.textContent = `AI: ${aiScore}`;
    };

    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const playerChoice = choice.getAttribute('data-choice');
            playerMoves.push(playerChoice);
            const aiChoiceResult = aiChoice();
            const resultText = `You chose ${playerChoice}, AI chose ${aiChoiceResult}.`;

            const gameResult = getResult(playerChoice, aiChoiceResult);
            if (gameResult === 'win') {
                result.textContent = `${resultText} You win!`;
            } else if (gameResult === 'lose') {
                result.textContent = `${resultText} You lose!`;
            } else {
                result.textContent = `${resultText} It's a draw!`;
            }

            updateScore(gameResult);
        });
    });
});
