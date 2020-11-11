const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const again = document.getElementById("play-agian");
again.addEventListener("click", () => {
  location.reload();
  return false;
});

// Creating Unit Box
const box = 32;

const ground = new Image();
ground.src = "assets/img/ground.png";

const foodImg = new Image();
foodImg.src = "assets/img/food.png";

// Load Audio
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "assets/audio/dead.mp3";
eat.src = "assets/audio/eat.mp3";
up.src = "assets/audio/up.mp3";
left.src = "assets/audio/left.mp3";
right.src = "assets/audio/right.mp3";
down.src = "assets/audio/down.mp3";

// Creating Snake
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

// Creating Food
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

// Score Variable
let score = 0;

// Control Snake
let d;

const direction = (event) => {
  if (event.keyCode == 37 && d != "RIGHT") {
    left.play();
    d = "LEFT";
  } else if (event.keyCode == 38 && d != "DOWN") {
    up.play();
    d = "UP";
  } else if (event.keyCode == 39 && d != "LEFT") {
    right.play();
    d = "RIGHT";
  } else if (event.keyCode == 40 && d != "UP") {
    down.play();
    d = "DOWN";
  }
};

document.addEventListener("keydown", direction);

// Checking Collision
const collision = (head, array) => {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
};

// Show Everything On The Canvas
const draw = () => {
  ctx.drawImage(ground, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(foodImg, food.x, food.y);

  //old Head Position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // which direction
  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  // if the snake eats the food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
    // we don't remove the tail
  } else {
    // remove the tail
    snake.pop();
  }

  // New HEad
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  // game over
  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    dead.play();
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Change one";
  ctx.fillText(score, 2 * box, 1.6 * box);
};

// Call Draw Function Every 100ms
let game = setInterval(draw, 100);
