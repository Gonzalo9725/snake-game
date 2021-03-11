let canvasElement = document.getElementById("canvasGame");
let ctx = canvasElement.getContext("2d");

let snakePosX = 0;
let snakePosY = 0;

const drawGrid = (context) => {
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

const drawSnake = (context, posX, posY) => {
  context.beginPath();
  context.fillStyle = "black";
  context.fillRect(posX, posY, 15, 15);
  context.stroke();
};

drawGrid(ctx);
drawSnake(ctx, snakePosX, snakePosY);

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      snakePosY -= 15;
      break;
    case "ArrowDown":
      snakePosY += 15;
      break;
    case "ArrowLeft":
      snakePosX -= 15;
      break;
    case "ArrowRight":
      snakePosX += 15;
      break;
    default:
      return;
  }

  ctx.clearRect(0, 0, 600, 600);
  drawGrid(ctx);
  drawSnake(ctx, snakePosX, snakePosY);
});
