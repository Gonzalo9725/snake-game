import {
  W,
  S,
  A,
  D,
  ARROW_UP,
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  DIRECTION,
  FPS,
} from "./constants.js";
import {
  drawWalls,
  drawSnake,
  moveSnake,
  drawFood,
  createNewFoodLocation,
  snakeAteFood,
  hitTheWallorItself,
  showScoreOnScreen,
  drawText,
  gameOver,
} from "./utils.js";

let CANVAS_GAME = document.getElementById("canvasGame");
let CTX = CANVAS_GAME.getContext("2d");

let SCORE_TEXT = document.getElementById("score");

let snake;
let currentDirection;
let newDirection;
let food;
let cycle;
let score;

document.addEventListener("keydown", (e) => {
  if (
    (e.code === ARROW_UP || e.code === W) &&
    currentDirection !== DIRECTION.DOWN
  ) {
    newDirection = DIRECTION.UP;
  } else if (
    (e.code === ARROW_DOWN || e.code === S) &&
    currentDirection !== DIRECTION.UP
  ) {
    newDirection = DIRECTION.DOWN;
  } else if (
    (e.code === ARROW_LEFT || e.code === A) &&
    currentDirection !== DIRECTION.RIGHT
  ) {
    newDirection = DIRECTION.LEFT;
  } else if (
    (e.code === ARROW_RIGHT || e.code === D) &&
    currentDirection !== DIRECTION.LEFT
  ) {
    newDirection = DIRECTION.RIGHT;
  }
});

const gameCycle = () => {
  let tailRemoved = moveSnake(newDirection, snake);
  currentDirection = newDirection;

  if (snakeAteFood(snake, food)) {
    snake.push(tailRemoved);
    food = createNewFoodLocation(snake);

    score++;
    showScoreOnScreen(SCORE_TEXT, score);
  }

  if (hitTheWallorItself(snake)) {
    cycle = gameOver(CTX, cycle);
    return;
  }

  CTX.clearRect(0, 0, 600, 600);
  drawWalls(CTX);
  drawSnake(CTX, snake);
  drawFood(CTX, food);
};

const startGame = () => {
  snake = [
    { posX: 45, posY: 15 },
    { posX: 30, posY: 15 },
    { posX: 15, posY: 15 },
  ];

  currentDirection = DIRECTION.RIGHT;
  newDirection = DIRECTION.RIGHT;

  food = createNewFoodLocation(snake);
  score = 0;
  showScoreOnScreen(SCORE_TEXT, score);
  cycle = setInterval(gameCycle, FPS);
};

drawWalls(CTX);
drawText(CTX, "¡Click para empezar!", 300, 260);
drawText(CTX, "Muévete con ↑ ↓ → ←", 300, 310);

CANVAS_GAME.addEventListener("click", () => {
  if (cycle === undefined) {
    startGame();
  }
});
