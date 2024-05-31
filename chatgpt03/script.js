document.addEventListener('DOMContentLoaded', function () {
    const targetColorBox = document.querySelector('.target-color');
    const adjustedColorBox = document.querySelector('.adjusted-color');
    const redSlider = document.getElementById('red-slider');
    const greenSlider = document.getElementById('green-slider');
    const blueSlider = document.getElementById('blue-slider');
    const checkBtn = document.getElementById('check-btn');
    const resultText = document.getElementById('result');

    // Generate a random target color
    const targetRed = Math.floor(Math.random() * 256);
    const targetGreen = Math.floor(Math.random() * 256);
    const targetBlue = Math.floor(Math.random() * 256);
    const targetColor = `rgb(${targetRed}, ${targetGreen}, ${targetBlue})`;

    // Display the target color
    targetColorBox.style.backgroundColor = targetColor;

    // Update adjusted color box when sliders are changed
    function updateAdjustedColorBox() {
        const red = redSlider.value;
        const green = greenSlider.value;
        const blue = blueSlider.value;
        adjustedColorBox.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }

    // Event listeners
    redSlider.addEventListener('input', updateAdjustedColorBox);
    greenSlider.addEventListener('input', updateAdjustedColorBox);
    blueSlider.addEventListener('input', updateAdjustedColorBox);

    // Check if color matches
    function checkColorMatch() {
        const red = parseInt(redSlider.value);
        const green = parseInt(greenSlider.value);
        const blue = parseInt(blueSlider.value);

        const redDiff = Math.abs(red - targetRed);
        const greenDiff = Math.abs(green - targetGreen);
        const blueDiff = Math.abs(blue - targetBlue);
        const totalDiff = redDiff + greenDiff + blueDiff;
        const percentage = ((765 - totalDiff) / 765) * 100; // Total difference is 765 (255 * 3)

        if (totalDiff === 0) {
            resultText.textContent = 'Congratulations! You matched the color!';
        } else {
            resultText.textContent = `You are ${percentage.toFixed(2)}% close to the target color.`;
        }
    }

    // Event listener for check button
    checkBtn.addEventListener('click', checkColorMatch);
});
