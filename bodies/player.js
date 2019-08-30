let sprites, idle;
function preload() {
  sprites = {
    right: loadImage("assets/player/p1.png"),
    left: loadImage("assets/player/p2.png"),
    up: loadImage("assets/player/p3.png"),
    down: loadImage("assets/player/p4.png")
  };
  idle = loadImage("assets/player/s1.png");
}

class Player {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.friction = 1;
    this.rotation = 0;
    this.speed = 3;
    this.w = 43;
    this.h = 60;
    this.frameWidth = 73.55;
    this.frameHeight = 87.67;
    this.sprites = {};

    this.initSprites();
  }

  update() {
    this.run();
    this.draw();
  }

  draw() {
    noFill();
    strokeWeight(1);
    stroke(250);
    return rect(this.position.x, this.position.y, this.w, this.h);
  }

  initSprites() {
    this.sprites.right = new PlayerSpriteAnimator(
      sprites.right,
      this.frameWidth,
      this.frameHeight,
      9,
      4
    );
    this.sprites.left = new PlayerSpriteAnimator(
      sprites.left,
      this.frameWidth,
      this.frameHeight,
      9,
      4
    );
    this.sprites.up = new PlayerSpriteAnimator(
      sprites.up,
      this.frameHeight,
      this.frameWidth,
      9,
      4
    );
    this.sprites.down = new PlayerSpriteAnimator(
      sprites.down,
      this.frameHeight,
      this.frameWidth,
      9,
      4
    );
  }

  run() {
    if (keyIsDown(LEFT_ARROW) && !collideLeft(this)) {
      this.position.x -= this.speed;

      this.w = this.frameWidth;
      this.h = this.frameHeight;

      this.sprites.left.draw(this.position.x, this.position.y);
      this.sprites.left.update();
      return;
    }

    if (keyIsDown(RIGHT_ARROW) && !collideRight(this)) {
      this.position.x += this.speed;

      this.w = this.frameWidth;
      this.h = this.frameHeight;

      this.sprites.right.draw(this.position.x, this.position.y);
      this.sprites.right.update();
      return;
    }

    if (keyIsDown(UP_ARROW) && !collideTop(this)) {
      this.position.y -= this.speed;

      this.w = this.frameHeight;
      this.h = this.frameWidth;

      this.sprites.up.draw(this.position.x, this.position.y);
      this.sprites.up.update();
      return;
    }

    if (keyIsDown(DOWN_ARROW) && !collideBottom(this)) {
      this.position.y += this.speed;

      this.w = this.frameHeight;
      this.h = this.frameWidth;

      this.sprites.down.draw(this.position.x, this.position.y);
      this.sprites.down.update();
      return;
    }

    this.w = 43;
    this.h = 60;

    image(idle, this.position.x, this.position.y, this.w, this.h);
  }
}

//sprite sheet anim
class PlayerSpriteAnimator {
  constructor(image, frameWidth, frameHeight, frameSpeed, endFrame) {
    this.image = image;
    this.framesPerRow = Math.floor(this.image.width / frameWidth);
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameSpeed = frameSpeed;
    this.endFrame = endFrame;
  }

  currentFrame = 0; // the current frame to draw
  counter = 0; // keep track of frame rate

  // Update the animation
  update() {
    // update to the next frame if it is time
    if (this.counter == this.frameSpeed - 1)
      this.currentFrame = (this.currentFrame + 1) % this.endFrame;

    // update the counter
    this.counter = (this.counter + 1) % this.frameSpeed;
  }

  // Draw the current frame
  draw(x, y) {
    // get the row and col of the frame
    const row = Math.floor(this.currentFrame / this.framesPerRow);

    const col = Math.floor(this.currentFrame % this.framesPerRow);

    image(
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
