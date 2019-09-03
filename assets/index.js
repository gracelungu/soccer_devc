let playerAssets;
function preload() {
  playerAssets = {
    blue: {
      sprites: {
        right: loadImage("assets/player/blue/p1.png"),
        left: loadImage("assets/player/blue/p2.png"),
        up: loadImage("assets/player/blue/p3.png"),
        down: loadImage("assets/player/blue/p4.png")
      },
      idles: {
        right: loadImage("assets/player/blue/s1.png"),
        left: loadImage("assets/player/blue/s2.png"),
        up: loadImage("assets/player/blue/s3.png"),
        down: loadImage("assets/player/blue/s4.png")
      }
    },
    red: {
      sprites: {
        right: loadImage("assets/player/red/p1.png"),
        left: loadImage("assets/player/red/p2.png"),
        up: loadImage("assets/player/red/p3.png"),
        down: loadImage("assets/player/red/p4.png")
      },
      idles: {
        right: loadImage("assets/player/red/s1.png"),
        left: loadImage("assets/player/red/s2.png"),
        up: loadImage("assets/player/red/s3.png"),
        down: loadImage("assets/player/red/s4.png")
      }
    }
  };
}
