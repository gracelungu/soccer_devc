let field;
let ball;
let players;
let homePlayers, away;
const WIDTH = 1400;
const HEIGHT = 800;
const fieldPath = "assets/field/field.png";

async function setup() {
  createCanvas(WIDTH, HEIGHT);

  field = loadImage(fieldPath);

  ball = new Ball(WIDTH / 2, HEIGHT / 2);

  // Players
  homePlayers = new HomePlayers(ball);
  awayPlayers = new AwayPlayers(ball);

  const user = await getUser();
  UID = user.uid;

  players = await getPlayers(); 

  if(!players) document.location.reload();

  for(let key of Object.keys(players)){
    if(Object.keys(players).length < 5) homePlayers.add(players[key].username, key);
    if(Object.keys(players).length > 5) awayPlayers.add(players[key].username, key);
  }

  
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

  if (UID) {
    homePlayers.update();
    awayPlayers.update();
  }
  //console.log(homePlayers.players.length)
}

async function play() {
  const username = document.getElementById("username").value; console.log(username);
  
  if(username && username.length > 1){
    await setUsername(username);
    document.getElementById("overlay").style.display = "none";
  }
  
}
