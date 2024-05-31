document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.querySelector('.restart-button');
    const title = document.querySelector('.title');

    let currentPlayer = 'X';
    let isGameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6] // Diagonal
    ];

    const checkWin = () => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
                isGameActive = false;
                title.innerText = `${cells[a].innerText} wins!`;
                highlightWinningCells(combination);
            }
        }
    };

    const highlightWinningCells = (combination) => {
        for (const index of combination) {
            cells[index].classList.add('win');
        }
    };

    const checkDraw = () => {
        if (Array.from(cells).every(cell => cell.innerText)) {
            isGameActive = false;
            title.innerText = 'It\'s a draw!';
        }
    };

    const handleCellClick = (event) => {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-cell'));

        if (cell.innerText || !isGameActive) return;

        cell.innerText = currentPlayer;
        checkWin();
        checkDraw();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O' && isGameActive) {
            aiMove();
        }
    };

    const handleRestartClick = () => {
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('win');
        });
        title.innerText = 'Tic-Tac-Toe';
        currentPlayer = 'X';
        isGameActive = true;
    };

    const aiMove = () => {
        setTimeout(() => {
            const emptyCells = Array.from(cells).filter(cell => !cell.innerText);
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const cellIndex = parseInt(emptyCells[randomIndex].getAttribute('data-cell'));
            cells[cellIndex].innerText = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            checkWin();
            checkDraw();
        }, 1000); // One second delay
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartClick);
});
