class HomePlayers {
  constructor(ball) {
    this.players = []; console.log(ball);
    
    this.ball = ball;
    this.positions = [
      { x: VW(10), y: VH(45) },
      { x: VW(25), y: VH(15) },
      { x: VW(25), y: VH(75) },
      { x: VW(40), y: VH(35) },
      { x: VW(40), y: VH(55) }
    ];
  }

  update() {
    for (let player of this.players) {
      player.update(key);
    }
    for (let i = 0; i < this.players.length; i++) {
      for (let j = 0; j < this.players.length; j++) {
        this.players[i].collideTopOf(this.players[j]);
        this.players[i].collideBottomOf(this.players[j]);
        this.players[i].collideRightOf(this.players[j]);
        this.players[i].collideLeftOf(this.players[j]);
      }

        this.ball.collideResolve(this.players[i]);
    }
  }

  add(handler, UID) {
    const position = this.players.length;

    const player = new Player(
      this.positions[position].x,
      this.positions[position].y,
      "right",
      "blue",
      handler,
      UID
    );

    if (position < 5) {
      this.players.push(player);
    }
  }
}

class AwayPlayers {
  constructor(ball) {
    this.players = [];
    this.ball = ball;
    this.positions = [
      { x: VW(85), y: VH(45) },
      { x: VW(68), y: VH(15) },
      { x: VW(68), y: VH(75) },
      { x: VW(54), y: VH(35) },
      { x: VW(54), y: VH(55) }
    ];
  }

  update() {
    for (let player of this.players) {
      player.update(key);
    }
    for (let i = 0; i < this.players.length; i++) {
      for (let j = 0; j < this.players.length; j++) {
        this.players[i].collideTopOf(this.players[j]);
        this.players[i].collideBottomOf(this.players[j]);
        this.players[i].collideRightOf(this.players[j]);
        this.players[i].collideLeftOf(this.players[j]);
      }
      this.ball.collideResolve(this.players[i]);
    }
  }

  add(handler, UID) {
    const position = this.players.length;

    const player = new Player(
      this.positions[position].x,
      this.positions[position].y,
      "left",
      "red",
      handler,
      UID
    );

    if (position < 5) {
      this.players.push(player);
    }
  }
}

function setHomeAwayPlayersCollision(homePlayers, awayPlayers){
  for (let i = 0; i < homePlayers.length; i++) {
    for (let j = 0; j < awayPlayers.length; j++) {
      homePlayers[i].collideTopOf(awayPlayers[j]);
      homePlayers[i].collideBottomOf(awayPlayers[j]);
      homePlayers[i].collideRightOf(awayPlayers[j]);
      homePlayers[i].collideLeftOf(awayPlayers[j]);
    }
  }
}

const VW = value => {
  return (value * WIDTH) / 100;
};

const VH = value => {
  return (value * HEIGHT) / 100;
};
