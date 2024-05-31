const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Snake properties
let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let dx = 10;
let dy = 0;

// Game settings
let score = 0;
let speed = 100;
const cellSize = 10;

// Main function to draw game
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = "green";
    snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, cellSize, cellSize);
    });

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, cellSize, cellSize);

    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }

    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    // Check for collisions
    if (checkCollision(head)) {
        clearInterval(gameInterval);
        alert("Game over! Your final score is: " + score);
        window.location.reload();
    }
}

// Function to generate random food position
function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / cellSize)) * cellSize;
    food.y = Math.floor(Math.random() * (canvas.height / cellSize)) * cellSize;
}

// Function to check for collisions
function checkCollision(head) {
    return (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height ||
        snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
    );
}

// Handle key press events
document.addEventListener("keydown", (event) => {
    const key = event.key;
    switch (key) {
        case "ArrowUp":
            if (dy !== cellSize) {
                dx = 0;
                dy = -cellSize;
            }
            break;
        case "ArrowDown":
            if (dy !== -cellSize) {
                dx = 0;
                dy = cellSize;
            }
            break;
        case "ArrowLeft":
            if (dx !== cellSize) {
                dx = -cellSize;
                dy = 0;
            }
            break;
        case "ArrowRight":
            if (dx !== -cellSize) {
                dx = cellSize;
                dy = 0;
            }
            break;
    }
});

// Initialize game
generateFood();
const gameInterval = setInterval(draw, speed);
