class Player {
  constructor(x, y, side, color, handler) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.friction = 1;
    this.rotation = 0;
    this.speed = 3;
    this.width = 73;
    this.height = 73;
    this.frameWidth = 73;
    this.frameHeight = 73;
    this.frameSpeed = 8;
    this.sprites = {};
    this.side = side;
    this.color = color;
    this.handler = handler;
    this.initSprites();
  }

  update() {
    this.run();
    this.draw();
  }

  draw() {
    fill(0);
    strokeWeight(1);
    this.displayHandler();
    //noStroke(250);
    //return rect(this.position.x, this.position.y, this.width, this.height);
  }

  displayHandler(){
    textSize(15);
    text(this.handler, this.position.x, this.position.y);
  }

  initSprites() {
    this.sprites.right = new PlayerSpriteAnimator(
     playerAssets[this.color].sprites.right,
      this.frameWidth,
      this.frameHeight,
      this.frameSpeed,
      3
    );
    this.sprites.left = new PlayerSpriteAnimator(
     playerAssets[this.color].sprites.left,
      this.frameWidth,
      this.frameHeight,
      this.frameSpeed,
      3
    );
    this.sprites.up = new PlayerSpriteAnimator(
     playerAssets[this.color].sprites.up,
      this.frameHeight,
      this.frameWidth,
      this.frameSpeed,
      4
    );
    this.sprites.down = new PlayerSpriteAnimator(
     playerAssets[this.color].sprites.down,
      this.frameHeight,
      this.frameWidth,
      this.frameSpeed,
      4
    );
  }

  updateRun(side) {
    this.side = side;
    this.sprites[side].draw(this.position.x, this.position.y);
    this.sprites[side].update();
  }

  run() {
    if (keyIsDown(LEFT_ARROW) && !collideLeft(this)) {
      this.position.x -= this.speed;

      this.width = this.frameWidth;
      this.height = this.frameHeight;

      this.updateRun("left");

      return;
    }

    if (keyIsDown(RIGHT_ARROW) && !collideRight(this)) {
      this.position.x += this.speed;

      this.width = this.frameWidth;
      this.height = this.frameHeight;

      this.updateRun("right");

      return;
    }

    if (keyIsDown(UP_ARROW) && !collideTop(this)) {
      this.position.y -= this.speed;

      this.width = this.frameHeight;
      this.height = this.frameWidth;

      this.updateRun("up");

      return;
    }

    if (keyIsDown(DOWN_ARROW) && !collideBottom(this)) {
      this.position.y += this.speed;

      this.width = this.frameHeight;
      this.height = this.frameWidth;

      this.updateRun("down");

      return;
    }

    // Draw the current idle position
    image(
      playerAssets[this.color].idles[this.side],
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class PlayerSpriteAnimator {
  constructor(image, frameWidth, frameHeight, frameSpeed, endFrame) {
    this.image = image;
    this.framesPerRow = Math.floor(this.image.width / frameWidth);
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameSpeed = frameSpeed;
    this.endFrame = endFrame;
  }

  currentFrame = 0;
  counter = 0;

  update() {
    if (this.counter == this.frameSpeed - 1)
      this.currentFrame = (this.currentFrame + 1) % this.endFrame;

    this.counter = (this.counter + 1) % this.frameSpeed;
  }

  draw(x, y) {
    const row = Math.floor(this.currentFrame / this.framesPerRow);

    const col = Math.floor(this.currentFrame % this.framesPerRow);

    return image(
      this.image,
      x,
      y,
      this.frameWidth,
      this.frameHeight,
      col * this.frameWidth,
      row * this.frameHeight,
      this.frameWidth,
      this.frameHeight
    );
  }
}
