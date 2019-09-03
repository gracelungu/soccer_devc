let field;
let homePlayers;
const WIDTH = 1400;
const HEIGHT = 800;
const fieldPath = "assets/field/field.png";

function setup() {
  createCanvas(WIDTH, HEIGHT);

  field = loadImage(fieldPath);

  // Home
  homePlayers = new HomePlayers();
  homePlayers.add('Grace');
}

function initialize() {
  //Draw the field
  image(field, 0, 0, WIDTH, HEIGHT);
}

function draw() {
  //scale(0.5)
  initialize();

  homePlayers.update();
}

function play(){
  document.getElementById('overlay').style.display = 'none';
}
