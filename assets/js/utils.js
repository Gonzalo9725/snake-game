import { DIRECTION, impossibleToCrash } from "./constants.js";

const fillSquare = (context, posX, posY) => {
  context.beginPath();
  context.fillStyle = "#2e490b";
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

export const hitTheWallorItself = (snake) => {
  let head = snake[0];

  if (
    head.posX < 15 ||
    head.posY < 15 ||
    head.posX >= 585 ||
    head.posY >= 585
  ) {
    return true;
  }

  if (impossibleToCrash.includes(snake.length)) {
    return false;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.posX === snake[i].posX && head.posY === snake[i].posY) {
      return true;
    }
  }

  return false;
};

export const showScoreOnScreen = (score_text, score) => {
  score_text.innerText = "Puntos: " + score;
};

export const drawText = (context, text, x, y) => {
  context.font = "40px Arial";
  context.textAlign = "center";
  context.fillStyle = "black";
  context.fillText(text, x, y);
};

export const gameOver = (CTX, cycle) => {
  drawText(CTX, "¡Fin del Juego!", 300, 260);
  drawText(CTX, "Click para volver a jugar", 300, 310);
  return clearInterval(cycle);
};
