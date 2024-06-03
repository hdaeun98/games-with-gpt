document.addEventListener('DOMContentLoaded', () => {
    const words = ['JAVASCRIPT', 'PYTHON', 'HTML', 'CSS', 'NODEJS', 'REACT'];
    let selectedWord = words[Math.floor(Math.random() * words.length)];
    let correctLetters = [];
    let wrongLetters = [];
    const wordContainer = document.getElementById('word-container');
    const wrongLettersElement = document.getElementById('wrong-letters');
    const hangmanElement = document.getElementById('hangman');
    const messageElement = document.getElementById('message');
    const restartButton = document.getElementById('restart-button');
    const keys = document.querySelectorAll('.key');

    const updateWordDisplay = () => {
        wordContainer.innerHTML = selectedWord
            .split('')
            .map(letter => `
                <div class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </div>
            `)
            .join('');

        if (wordContainer.innerText.replace(/\s/g, '') === selectedWord) {
            messageElement.textContent = 'Congratulations! You won!';
            disableKeys();
        }
    };

    const updateWrongLettersDisplay = () => {
        wrongLettersElement.textContent = `Wrong letters: ${wrongLetters.join(', ')}`;

        if (wrongLetters.length === 6) {
            messageElement.textContent = 'Sorry, you lost. The word was ' + selectedWord;
            disableKeys();
        }
    };

    const disableKeys = () => {
        keys.forEach(key => key.disabled = true);
    };

    const enableKeys = () => {
        keys.forEach(key => key.disabled = false);
    };

    keys.forEach(key => {
        key.addEventListener('click', () => {
            const letter = key.textContent;
            if (selectedWord.includes(letter)) {
                if (!correctLetters.includes(letter)) {
                    correctLetters.push(letter);
                    updateWordDisplay();
                }
            } else {
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);
                    updateWrongLettersDisplay();
                }
            }
            key.disabled = true;
        });
    });

    restartButton.addEventListener('click', () => {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        correctLetters = [];
        wrongLetters = [];
        updateWordDisplay();
        updateWrongLettersDisplay();
        messageElement.textContent = '';
        enableKeys();
    });

    updateWordDisplay();
});
