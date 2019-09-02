class HomePlayers {
  constructor() {
    this.players = [];
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
      player.update();
    }
  }

  add(handler) {
      const position = this.players.length;

    const player = new Player(
      this.positions[position].x,
      this.positions[position].y,
      "right",
      "blue",
      handler
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
