// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');

// Game constants
const SIZE = 40;
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 800;

// Game state
let snake, apple, direction, gameLoop;

// Load images
const blockImage = new Image();
blockImage.src = 'https://media-hosting.imagekit.io/7f8347e0227b446d/block.jpg?Expires=1837728906&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=p6gIdzd~iG0Efy1PrPf3aVSa4Oazn659MTRjhnFRtit4KQQA8RgCmvfcwJUqK46j4ruk3NjRCg-igbUAmNrUvDmNOcdisH1vj8V~6rPIJbjuSK4yFqX2ggVBDiPxppv6Kmc2ohCKP6IH-Xg9IXVFHp9CNEikEW2uZv-HULQsfoFQlUjoszDme8we~uTBsslyWbehtfzOSr~QA~8yVLViHD94CiS8JvTd5OXiZ~WvVOoGcOIyzZlo3PL7Ukhy3UbkgVdXKkiFr-AnmCrX-McRUWb0GFu5~SPpj~fdB0j5rjLtLY4igCYCNRiRWcJr-1G04NlZssqZgliHND56UUAP1Q__'; // Place the image in a 'resources' folder
const appleImage = new Image();
appleImage.src = 'https://media-hosting.imagekit.io/025684e9aa5c474c/apple.jpg?Expires=1837728943&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=CLG-dXcma79EIl95Ot5D926nWPVONqjjzADpbTFILLUjW6nlVv2~XbtDMiJQKKvR6ANOolB2ug3epeVlvsWGZYLt-~D9UiCQAgRmDiHMZ6sQTmt9Wq1WvZINMa4N9XQFfxS0d1RV3cT9j~m1HXv9vLjnixPuoTzMXJwRpPXUyIJ3rwbm8PitqAnkRev3XV7jlcqcaNhvrXHeF0gEu~8CMZSe8USeTHYR1GGZft2h4bPCrmkqFx2QNaN~A7-FxA8x4~jB6J4~giThkmaz35zcg3uBtl2kdthWtg9yCIWBZkwBkfbPI1dvgEo7667S~qwZtJrdyQe84hlVsu580yNi2Q__'; // Same for this image

// Initialize the game state
function initGame() {
    snake = {
        length: 1,
        x: [40],
        y: [40],
        direction: 'down'
    };

    apple = {
        x: 120,
        y: 120
    };

    direction = 'down';
    scoreElement.textContent = `Score: ${snake.length}`;
    gameOverElement.style.display = 'none';
}

// Draw the background
function drawBackground() {
    ctx.fillStyle = 'rgb(110, 110, 5)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

// Draw the snake
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.drawImage(blockImage, snake.x[i], snake.y[i]);
    }
}

// Draw the apple
function drawApple() {
    ctx.drawImage(appleImage, apple.x, apple.y);
}

// Move the snake
function moveSnake() {
    // Update body
    for (let i = snake.length - 1; i > 0; i--) {
        snake.x[i] = snake.x[i-1];
        snake.y[i] = snake.y[i-1];
    }

    // Update head
    switch (snake.direction) {
        case 'left':
            snake.x[0] -= SIZE;
            break;
        case 'right':
            snake.x[0] += SIZE;
            break;
        case 'up':
            snake.y[0] -= SIZE;
            break;
        case 'down':
            snake.y[0] += SIZE;
            break;
    }
}

// Check for collisions
function checkCollision() {
    // Check apple collision
    if (isCollision(snake.x[0], snake.y[0], apple.x, apple.y)) {
        snake.length++;
        snake.x.push(-1);
        snake.y.push(-1);
        moveApple();
        scoreElement.textContent = `Score: ${snake.length}`;
    }

    // Check self collision
    for (let i = 3; i < snake.length; i++) {
        if (isCollision(snake.x[0], snake.y[0], snake.x[i], snake.y[i])) {
            endGame();
        }
    }

    // Check boundary collision
    if (snake.x[0] < 0 || snake.x[0] >= CANVAS_WIDTH || 
        snake.y[0] < 0 || snake.y[0] >= CANVAS_HEIGHT) {
        endGame();
    }
}

// Helper function for checking collision
function isCollision(x1, y1, x2, y2) {
    return x1 < x2 + SIZE && x1 + SIZE > x2 &&
           y1 < y2 + SIZE && y1 + SIZE > y2;
}

// Move the apple to a new location
function moveApple() {
    apple.x = Math.floor(Math.random() * 25) * SIZE;
    apple.y = Math.floor(Math.random() * 20) * SIZE;
}

// Update the game every frame
function gameUpdate() {
    drawBackground();
    moveSnake();
    checkCollision();
    drawSnake();
    drawApple();
}

// End the game and show the final score
function endGame() {
    clearInterval(gameLoop);
    finalScoreElement.textContent = `Score: ${snake.length}`;
    gameOverElement.style.display = 'block';
}

// Restart the game
function restartGame() {
    initGame();
    startGame();
}

// Start the game loop
function startGame() {
    gameLoop = setInterval(gameUpdate, 250);
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            if (snake.direction !== 'right') snake.direction = 'left';
            break;
        case 'ArrowRight':
            if (snake.direction !== 'left') snake.direction = 'right';
            break;
        case 'ArrowUp':
            if (snake.direction !== 'down') snake.direction = 'up';
            break;
        case 'ArrowDown':
            if (snake.direction !== 'up') snake.direction = 'down';
            break;
    }
});

// Initialize and start the game
initGame();
startGame();
