import { DIRECTION } from "./constants.js";

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
  return snake.pop();
};

export const createNewFoodLocation = (snake) => {
  while (true) {
    let columnX = Math.max(Math.floor(Math.random() * 39), 1);
    let columnY = Math.max(Math.floor(Math.random() * 39), 1);

    let posX = columnX * 15;
    let posY = columnY * 15;

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

export const drawWalls = (context) => {
  context.beginPath();
  context.lineWidth = "2";
  context.rect(15, 15, 570, 570);
  context.stroke();
};

export const hitTheWall = (snake) => {
  let head = snake[0];

  return head.posX < 15 ||
    head.posY < 15 ||
    head.posX >= 585 ||
    head.posY >= 585
    ? true
    : false;
};
