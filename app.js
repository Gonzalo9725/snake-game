let canvasGame = document.getElementById("canvasGame");
let ctx = canvasGame.getContext("2d");

for (let x = 20; x < 600; x += 20) {
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.moveTo(x, 0);
  ctx.lineTo(x, 600);
  ctx.stroke();
}

for (let y = 20; y < 600; y += 20) {
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.moveTo(0, y);
  ctx.lineTo(600, y);
  ctx.stroke();
}
