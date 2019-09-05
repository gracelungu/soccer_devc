let field;
let ball;
let homePlayers, away;
const WIDTH = 1400;
const HEIGHT = 800;
const fieldPath = "assets/field/field.png";
const UID = '1234';

function setup() {
  createCanvas(WIDTH, HEIGHT);

  field = loadImage(fieldPath);

  ball = new Ball(WIDTH/2, HEIGHT/2);

  // Home
  homePlayers = new HomePlayers(ball);
  awayPlayers = new AwayPlayers(ball);
  homePlayers.add('Grace', UID);
  awayPlayers.add('Karl', '9876');
}

function initialize() {
  //Draw the field
  image(field, 0, 0, WIDTH, HEIGHT);
}

function draw() {
  //scale(0.5)
  initialize();
  
  ball.update();

  setHomeAwayPlayersCollision(homePlayers.players, awayPlayers.players);
  homePlayers.update();
  awayPlayers.update();
}

function play(){
  document.getElementById('overlay').style.display = 'none';
}
