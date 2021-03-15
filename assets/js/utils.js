import { DIRECTION } from "./constants.js";

export const drawGrid = (context) => {
  for (let x = 15; x < 600; x += 15) {
    context.beginPath();
    context.fillStyle = "black";
    context.moveTo(x, 0);
    context.lineTo(x, 600);
    context.stroke();
  }

  for (let y = 15; y < 600; y += 15) {
    context.beginPath();
    context.fillStyle = "black";
    context.moveTo(0, y);
    context.lineTo(600, y);
    context.stroke();
  }
};

export const drawSnake = (context, snake) => {
  snake.forEach((obj) => {
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(obj.posX, obj.posY, 15, 15);
    context.stroke();
  });
};

export const moveSnake = (direction, snake) => {
  let headPosX = snake[0].posX;
  let headPosY = snake[0].posY;

  if (direction === DIRECTION.RIGHT) {
    headPosX += 15;
  } else if (direction === DIRECTION.LEFT) {
    headPosX -= 15;
  } else if (direction === DIRECTION.DOWN) {
    headPosY += 15;
  } else if (direction === DIRECTION.UP) {
    headPosY -= 15;
  }

  // Add new head of snake at beginning of array
  snake.unshift({ posX: headPosX, posY: headPosY });
  // Delete snake's tail
  snake.pop();
};
