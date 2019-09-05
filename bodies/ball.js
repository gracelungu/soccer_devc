class Ball {
  _factor = 15;
  constructor(x, y) {
    this.X = x;
    this.Y = y;
    this.width = 30;
    this.height = 30;
    this.speed = 4;
    this.moveTiming = 30;
    this.playerSide = 'left';
  }

  update() {
    this.draw();
    this.move();
  }

  draw() {
    //rect(this.X, this.Y, this.width, this.height);
    image(ballAsset, this.X, this.Y, this.width, this.height);
  }

  move() {
    if (this.moveTiming > 0) {
      this.moveTiming -= 1;

      // Pass to sides
      if(keyIsDown(RIGHT_ARROW) && keyIsDown(68)){
        this.X += this.speed;
        return
      }

      if(keyIsDown(LEFT_ARROW) && keyIsDown(68)){
        this.X -= this.speed;
        return
      }

      if(keyIsDown(UP_ARROW) && keyIsDown(68)){
        this.Y -= this.speed;
        return
      }

      if(keyIsDown(DOWN_ARROW) && keyIsDown(68)){
        this.Y += this.speed;
        return
      }
      
      //Simple move
      switch(this.playerSide){ 
          case 'right':
            this.X += this.speed;
          break;
          case 'left':
            this.X -= this.speed;
          break;
          case 'up':
            this.Y -= this.speed;
          break;
          case 'down':
            this.Y += this.speed;
          break;
      }

    }
  }

  collideResolve(p) {
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
    if (collide) { console.log('COllide');
    

        // Shoot
        if(keyIsDown(65)){
            this.speed = 10;
            this.moveTiming = 40;
            return;
        }

        this.playerSide = p.side;
        this.speed = 4;
        this.moveTiming = 30;
    }
  }
}
