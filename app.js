let canvasGame = document.getElementById("canvasGame");
let ctx = canvasGame.getContext("2d");

for (let x = 15; x < 600; x += 15) {
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.moveTo(x, 0);
  ctx.lineTo(x, 600);
  ctx.stroke();
}

for (let y = 15; y < 600; y += 15) {
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.moveTo(0, y);
  ctx.lineTo(600, y);
  ctx.stroke();
}

ctx.beginPath();
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 15, 15);
ctx.stroke();
