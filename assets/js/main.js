import {
  ARROW_UP,
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  DIRECTION,
  FPS,
} from "./constants.js";
import {
  drawGrid,
  drawSnake,
  moveSnake,
  drawFood,
  createNewFoodLocation,
  snakeAteFood,
} from "./utils.js";

let CANVAS_GAME = document.getElementById("canvasGame");
let CTX = CANVAS_GAME.getContext("2d");

let snake = [
  { posX: 45, posY: 15 },
  { posX: 30, posY: 15 },
  { posX: 15, posY: 15 },
];

let currentDirection = DIRECTION.RIGHT;
let newDirection = DIRECTION.RIGHT;

let food = createNewFoodLocation(snake);

let cycle;

document.addEventListener("keydown", (e) => {
  if (e.code === ARROW_UP && currentDirection !== DIRECTION.DOWN) {
    newDirection = DIRECTION.UP;
  } else if (e.code === ARROW_DOWN && currentDirection !== DIRECTION.UP) {
    newDirection = DIRECTION.DOWN;
  } else if (e.code === ARROW_LEFT && currentDirection !== DIRECTION.RIGHT) {
    newDirection = DIRECTION.LEFT;
  } else if (e.code === ARROW_RIGHT && currentDirection !== DIRECTION.LEFT) {
    newDirection = DIRECTION.RIGHT;
  }
});

const gameCycle = () => {
  moveSnake(newDirection, snake);
  currentDirection = newDirection;

  if (snakeAteFood(snake, food)) {
    food = createNewFoodLocation(snake);
  }

  CTX.clearRect(0, 0, 600, 600);
  drawGrid(CTX);
  drawSnake(CTX, snake);
  drawFood(CTX, food);
};

drawGrid(CTX);
drawSnake(CTX, snake);
drawFood(CTX, food);

CANVAS_GAME.addEventListener("click", () => {
  if (cycle === undefined) {
    cycle = setInterval(gameCycle, FPS);
  }
});
