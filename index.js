let player;
const WIDTH = 1400;
const HEIGHT = 800;

let field;
function initialize(){
  //Draw the field
  image(field, 0, 0, WIDTH, HEIGHT);
}

function setup() {
  createCanvas(WIDTH, HEIGHT);

  field = loadImage("assets/field/field.png");
  player = new Player(0, 0, 'right');
}

function draw() {
  initialize();

  player.update();
}
