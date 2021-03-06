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
  SHAKE_HORIZONTAL_CLASS,
  HIDE_CLASS,
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
let NINTENDO_CONTAINER = document.getElementById("nintendoContainer");
let SCORE_TEXT = document.getElementById("score");
let BANNER_PORTRAIT_MODE = document.getElementById("portraitMode");
let CLOSE_BANNER_BUTTON = document.getElementById("closeBannerButton");
let TITLE = document.getElementById("title");
let VICTORY_SOUND = new Audio("punto.wav");

let snake, currentDirection, newDirection, food, cycle, score;

window.addEventListener("orientationchange", () => {
  TITLE.classList.add(HIDE_CLASS);
  BANNER_PORTRAIT_MODE.classList.remove(HIDE_CLASS);
});

CLOSE_BANNER_BUTTON.addEventListener("click", () => {
  TITLE.classList.remove(HIDE_CLASS);
  BANNER_PORTRAIT_MODE.classList.add(HIDE_CLASS);
});

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
    VICTORY_SOUND.play();
  }

  if (hitTheWallorItself(snake)) {
    cycle = gameOver(CTX, cycle);
    NINTENDO_CONTAINER.classList.add(SHAKE_HORIZONTAL_CLASS);
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
  NINTENDO_CONTAINER.classList.remove(SHAKE_HORIZONTAL_CLASS);
  cycle = setInterval(gameCycle, FPS);
};

drawWalls(CTX);
drawText(CTX, "Click to start!", 300, 260, "40px");
drawText(CTX, "Desktop: Move using ↑ ↓ → ← or W A S D", 300, 310, "25px");
drawText(CTX, "Mobile: Tap to turn the snake to the right", 300, 360, "25px");

CANVAS_GAME.addEventListener("click", () => {
  if (cycle === undefined) {
    startGame();
    return;
  }

  if (currentDirection === DIRECTION.DOWN) {
    newDirection = DIRECTION.LEFT;
  } else if (currentDirection === DIRECTION.LEFT) {
    newDirection = DIRECTION.UP;
  } else if (currentDirection === DIRECTION.UP) {
    newDirection = DIRECTION.RIGHT;
  } else if (currentDirection === DIRECTION.RIGHT) {
    newDirection = DIRECTION.DOWN;
  }
});
