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
  context.beginPath();
  context.fillStyle = "black";
  context.fillRect(snake.posX, snake.posY, 15, 15);
  context.stroke();
};
