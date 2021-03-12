import {
  ARROW_UP,
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  DIRECTION,
} from "./constants.js";
import { snake, drawGrid, drawSnake, moveSnake } from "./utils.js";

let canvasElement = document.getElementById("canvasGame");
let ctx = canvasElement.getContext("2d");

drawGrid(ctx);
drawSnake(ctx, snake);

document.addEventListener("keydown", (e) => {
  let newDirection;

  switch (e.code) {
    case ARROW_UP:
      newDirection = DIRECTION.UP;
      break;
    case ARROW_DOWN:
      newDirection = DIRECTION.DOWN;
      break;
    case ARROW_LEFT:
      newDirection = DIRECTION.LEFT;
      break;
    case ARROW_RIGHT:
      newDirection = DIRECTION.RIGHT;
      break;
    default:
      return;
  }

  moveSnake(newDirection, snake);
  ctx.clearRect(0, 0, 600, 600);
  drawGrid(ctx);
  drawSnake(ctx, snake);
});
