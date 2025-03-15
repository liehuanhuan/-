const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const GRID_SIZE = 20;
const CELL_SIZE = canvas.width / GRID_SIZE;

let snake = [{x:10,y:10}];
let food = generateFood();
let dx = 1;
let dy = 0;
let score = 0;
let gameSpeed = 200;
let gameLoop;

function generateFood() {
    while(true) {
        const newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
        if(!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
            return newFood;
        }
    }
}

function draw() {
    // 清空画布
    ctx.fillStyle = '#2d2d2d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制食物
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(food.x*CELL_SIZE, food.y*CELL_SIZE, CELL_SIZE-2, CELL_SIZE-2);

    // 绘制蛇
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#4CAF50' : '#45a049';
        ctx.fillRect(segment.x*CELL_SIZE, segment.y*CELL_SIZE, CELL_SIZE-2, CELL_SIZE-2);
    });
}

function update() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    // 边界碰撞检测
    if(head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        gameOver();
        return;
    }

    // 自身碰撞检测
    if(snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    // 吃食物检测
    if(head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        food = generateFood();
        gameSpeed = Math.max(50, gameSpeed - 2);
        clearInterval(gameLoop);
        gameLoop = setInterval(gameStep, 200);
    } else {
        snake.pop();
    }
}

function gameStep() {
    update();
    draw();
}

function gameOver() {
    clearInterval(gameLoop);
    document.getElementById('gameOver').style.display = 'block';
}

function restartGame() {
    snake = [{x:10,y:10}];
    dx = 1;
    dy = 0;
    score = 0;
    gameSpeed = 150;
    document.getElementById('score').textContent = '0';
    document.getElementById('gameOver').style.display = 'none';
    clearInterval(gameLoop);
    gameLoop = setInterval(gameStep, gameSpeed);
}

// 键盘控制
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            if(dy !== 1) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if(dy !== -1) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if(dx !== 1) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if(dx !== -1) { dx = 1; dy = 0; }
            break;
    }
});

// 启动游戏
gameLoop = setInterval(gameStep, gameSpeed);