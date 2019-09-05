class Player {
  _bodyX = 15;
  _bodyY = 15;
  _factor = 15;

  constructor(x, y, side, color, handler, UID) {
    this.position = createVector(x, y);
    this.X = this.position.x + this._bodyX;
    this.Y = this.position.y + this._bodyY;
    this.velocity = createVector(0, 0);
    this.friction = 1;
    this.rotation = 0;
    this.speed = 3;
    this.width = 73;
    this.height = 73;
    this.playerBodyWidth = 40;
    this.playerBodyHeight = 40;
    this.frameWidth = 73;
    this.frameHeight = 73;
    this.frameSpeed = 8;
    this.sprites = {};
    this.side = side;
    this.state = "idle";
    this.color = color;
    this.handler = handler;
    this.UID = UID;
    this.remoteData = {};
    this.locks = { left: false, up: false, right: false, down: false };
    this.initSprites();
  }

  async getRemoteData() {
    const { uid } = await getUser();

    await firebase
      .database()
      .ref("games")
      .child(currentGame)
      .child(uid)
      .on("value", snap => (this.remoteData = snap.val()));

    //console.log(this.remoteData);
  }

  isMine() {
    return UID == this.UID;
  }

  async trackPlayer() {
    await firebase
      .database()
      .ref("games")
      .child(currentGame)
      .child(this.UID)
      .on("value", snap => (this.remoteData = snap.val()));

    if (this.remoteData.state == "idle") {
      // Draw the current idle position
      image(
        playerAssets[this.remoteData.color].idles[this.remoteData.side],
        this.remoteData.x,
        this.remoteData.y,
        this.width,
        this.height
      );

      return;
    }

    this.position.x = this.remoteData.x;
    this.position.y = this.remoteData.y;

    this.updateRun(this.remoteData.side);
  }

  async update() {
    UID = await firebase.auth().currentUser.uid;

    if (UID == null) return;

    await this.getRemoteData();

    const { uid } = await getUser();

    await firebase
      .database()
      .ref("games")
      .child(currentGame)
      .child(uid)
      .on("value", snap => (this.handler = snap.val().username));

    if (!this.isMine()) {
      await this.trackPlayer();
    } else {
      this.run();
    }

    this.draw();
  }

  async updateRemote() {
    if (this.isMine()) {
      await firebase
        .database()
        .ref("games")
        .child(currentGame)
        .child(this.UID)
        .update({
          x: this.X,
          y: this.Y,
          side: this.side,
          state: this.state
        });
    }
  }

  draw() {
    //noFill(0);
    strokeWeight(1);
    this.displayHandler();
    //noStroke(250);
    //return rect(this.X, this.Y, this.playerBodyWidth, this.playerBodyHeight);
  }

  displayHandler() {
    textSize(15);
    if (this.isMine()) text(this.handler, this.position.x, this.position.y);
    else text(this.handler, this.remoteData.x, this.remoteData.y);
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
      this.frameWidth,
      this.frameHeight,
      this.frameSpeed,
      4
    );
    this.sprites.down = new PlayerSpriteAnimator(
      playerAssets[this.color].sprites.down,
      this.frameWidth,
      this.frameHeight,
      this.frameSpeed,
      4
    );
  }

  updateRun(side) {
    this.side = side;

    this.X = this.position.x + this._bodyX;
    this.Y = this.position.y + this._bodyY;

    this.sprites[side].draw(this.position.x, this.position.y);
    this.sprites[side].update();

    this.updateRemote();
  }

  collideTopOf(p) {
    const collide = collideRectRect(
      this.X,
      this.Y,
      this.width - this._factor,
      this.height - this._factor,
      p.X,
      p.Y,
      p.width - this._factor,
      p.height - this._factor
    );
    if (collide && this.Y + this.height + 10 >= p.Y && this.Y < p.Y)
      return (this.locks.down = true);
    this.locks.down = false;
  }

  collideBottomOf(p) {
    const collide = collideRectRect(
      this.X,
      this.Y,
      this.width - this._factor,
      this.height - this._factor,
      p.X,
      p.Y,
      p.width - this._factor,
      p.height - this._factor
    );
    if (collide && (this.Y <= p.Y + p.height - 5) & (this.Y > p.Y))
      return (this.locks.up = true);
    this.locks.up = false;
  }

  collideRightOf(p) {
    const collide = collideRectRect(
      this.X,
      this.Y,
      this.width - this._factor,
      this.height - this._factor,
      p.X,
      p.Y,
      p.width - this._factor,
      p.height - this._factor
    );
    if (collide && this.X + this.width >= p.X && this.X < p.X)
      return (this.locks.right = true);
    this.locks.right = false;
  }

  collideLeftOf(p) {
    const collide = collideRectRect(
      this.X,
      this.Y,
      this.width - this._factor,
      this.height - this._factor,
      p.X,
      p.Y,
      p.width - this._factor,
      p.height - this._factor
    );
    if (collide && this.X <= p.X + p.width && this.X > p.X)
      return (this.locks.left = true);
    this.locks.left = false;
  }

  async run() {
    if (keyIsDown(LEFT_ARROW) && !collideLeft(this) && !this.locks.left) {
      this.position.x -= this.speed;

      this.updateRun("left");

      return;
    }

    if (keyIsDown(RIGHT_ARROW) && !collideRight(this) && !this.locks.right) {
      this.position.x += this.speed;

      this.updateRun("right");

      return;
    }

    if (keyIsDown(UP_ARROW) && !collideTop(this) && !this.locks.up) {
      this.position.y -= this.speed;

      this.updateRun("up");

      return;
    }

    if (keyIsDown(DOWN_ARROW) && !collideBottom(this) && !this.locks.down) {
      this.position.y += this.speed;

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
