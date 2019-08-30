class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 100;
    this.speed = 5;
  }

  draw() {
    return rect(this.x, this.y, this.w, this.h);
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }
}
