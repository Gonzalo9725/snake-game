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

const fillSquare = (context, posX, posY) => {
  context.beginPath();
  context.fillStyle = "black";
  context.fillRect(posX, posY, 15, 15);
  context.stroke();
};

export const drawSnake = (context, snake) => {
  snake.forEach((obj) => {
    fillSquare(context, obj.posX, obj.posY);
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

  // Add snake head
  snake.unshift({ posX: headPosX, posY: headPosY });
  // Delete snake's tail
  snake.pop();
};

export const createNewFoodLocation = (snake) => {
  while (true) {
    let posX = Math.floor(Math.random() * 39) * 15;
    let posY = Math.floor(Math.random() * 39) * 15;

    let conflictWithSnake = false;

    for (let i = 0; i < snake.length; i++) {
      if (snake[i].posX === posX && snake[i].posY === posY) {
        conflictWithSnake = true;
        break;
      }
    }

    if (conflictWithSnake) {
      continue;
    }

    return { posX, posY };
  }
};

export const drawFood = (context, food) => {
  fillSquare(context, food.posX, food.posY);
};

export const snakeAteFood = (snake, food) => {
  return snake[0].posX === food.posX && snake[0].posY === food.posY;
};
