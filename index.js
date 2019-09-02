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
  homePlayers.add('Karl');
  homePlayers.add('Hadad');
  homePlayers.add('Vincent');
  homePlayers.add('Goal');
}

function initialize() {
  //Draw the field
  image(field, 0, 0, WIDTH, HEIGHT);
}

function draw() {
  initialize();
  textSize(32);

  homePlayers.update();
}
