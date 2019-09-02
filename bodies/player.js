let sprites, idles;
function preload() {
  sprites = {
    right: loadImage("assets/player/p1.png"),
    left: loadImage("assets/player/p2.png"),
    up: loadImage("assets/player/p3.png"),
    down: loadImage("assets/player/p4.png")
  };
  idles = {
    right: loadImage("assets/player/s1.png"),
    left: loadImage("assets/player/s2.png"),
    up: loadImage("assets/player/s3.png"),
    down: loadImage("assets/player/s4.png")
  };
}

class Player {
  constructor(x, y, side) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.friction = 1;
    this.rotation = 0;
    this.speed = 3;
    this.width = 73.55;
    this.height = 73.04;
    this.frameWidth = 73.55;
    this.frameHeight = 73.04;
    this.frameSpeed = 8;
    this.sprites = {};
    this.side = side;
    this.initSprites();
  }

  update() {
    this.run();
    this.draw();
  }

  draw() {
    noFill();
    strokeWeight(1);
    noStroke(250);
    return rect(this.position.x, this.position.y, this.width, this.height);
  }

  initSprites() {
    this.sprites.right = new PlayerSpriteAnimator(
      sprites.right,
      this.frameWidth,
      this.frameHeight,
      this.frameSpeed,
      3
    );
    this.sprites.left = new PlayerSpriteAnimator(
      sprites.left,
      this.frameWidth,
      this.frameHeight,
      this.frameSpeed,
      3
    );
    this.sprites.up = new PlayerSpriteAnimator(
      sprites.up,
      this.frameHeight,
      this.frameWidth,
      this.frameSpeed,
      4
    );
    this.sprites.down = new PlayerSpriteAnimator(
      sprites.down,
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
      idles[this.side],
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
