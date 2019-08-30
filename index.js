let player;
const WIDTH = 1400;
const HEIGHT = 800;

function setup() {
  createCanvas(WIDTH, HEIGHT);

  player = new Player(0, 0);

}

function draw() {
  background("#32d978");

  player.update();
}
