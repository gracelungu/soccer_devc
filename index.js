let player;

function setup() {
  createCanvas(500, 500);

  player = new Player(0, 0);
}

function draw() {
  background("#000");

  player.draw();
}

// All keyPressed events
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.moveLeft();
  } else if (keyCode === RIGHT_ARROW) {
    player.moveRight();
  }
}
