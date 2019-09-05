class HomePlayers {
  constructor(ball) {
    this.players = [];
    
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
    for (let index in this.players) {
      this.players[index].update(key);
      this.ball.collideResolve(this.players[index]);
    }
    // for (let i = 0; i < this.players.length; i++) {
    //   for (let j = 0; j < this.players.length; j++) {
    //     this.players[i].collideTopOf(this.players[j]);
    //     this.players[i].collideBottomOf(this.players[j]);
    //     this.players[i].collideRightOf(this.players[j]);
    //     this.players[i].collideLeftOf(this.players[j]);
    //   }
    // }
  }

  add(handler, UID) {
    const position = this.players.length;

    let side = 'right';
    let color = 'blue';

    if(this.position > 5){
      side = 'left';
      color = 'red';
    }

    const player = new Player(
      this.positions[position].x,
      this.positions[position].y,
      side,
      color,
      handler,
      UID
    );

    if (position < 5) {
      this.players.push(player);
    }
  }
}


const VW = value => {
  return (value * WIDTH) / 100;
};

const VH = value => {
  return (value * HEIGHT) / 100;
};
