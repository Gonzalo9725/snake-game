import {
  ARROW_UP,
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  DIRECTION,
} from "./constants.js";
import { drawGrid, drawSnake, moveSnake } from "./utils.js";

let canvasElement = document.getElementById("canvasGame");
let ctx = canvasElement.getContext("2d");

let snake = [
  { posX: 45, posY: 15 },
  { posX: 30, posY: 15 },
  { posX: 15, posY: 15 },
];

let currentDirection = DIRECTION.RIGHT;

drawGrid(ctx);
drawSnake(ctx, snake);

document.addEventListener("keydown", (e) => {
  let newDirection;

  if (e.code === ARROW_UP && currentDirection !== DIRECTION.DOWN) {
    newDirection = DIRECTION.UP;
  } else if (e.code === ARROW_DOWN && currentDirection !== DIRECTION.UP) {
    newDirection = DIRECTION.DOWN;
  } else if (e.code === ARROW_LEFT && currentDirection !== DIRECTION.RIGHT) {
    newDirection = DIRECTION.LEFT;
  } else if (e.code === ARROW_RIGHT && currentDirection !== DIRECTION.LEFT) {
    newDirection = DIRECTION.RIGHT;
  } else {
    return;
  }

  currentDirection = newDirection;
  moveSnake(currentDirection, snake);
  ctx.clearRect(0, 0, 600, 600);
  drawGrid(ctx);
  drawSnake(ctx, snake);
});
