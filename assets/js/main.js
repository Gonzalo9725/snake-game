import { ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT } from "./constants.js";
import { drawGrid, drawSnake } from "./utils.js";

let canvasElement = document.getElementById("canvasGame");
let ctx = canvasElement.getContext("2d");

let snake = {
  posX: 0,
  posY: 0,
};

drawGrid(ctx);
drawSnake(ctx, snake);

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case ARROW_UP:
      snake.posY -= 15;
      break;
    case ARROW_DOWN:
      snake.posY += 15;
      break;
    case ARROW_LEFT:
      snake.posX -= 15;
      break;
    case ARROW_RIGHT:
      snake.posX += 15;
      break;
    default:
      return;
  }

  ctx.clearRect(0, 0, 600, 600);
  drawGrid(ctx);
  drawSnake(ctx, snake);
});
