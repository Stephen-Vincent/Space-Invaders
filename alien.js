class Alien {
  constructor(x, y, imgA, imgB, pointValue) {
    this.x = x;
    this.y = y;
    this.width = 38;
    this.height = 26;
    this.alive = true;
    this.imgA = imgA;
    this.imgB = imgB;
    this.currentImg = "A";
    this.pts = pointValue;
    this.radius = 20; // used for collision detection.
    this.xdir = 1;
  }

  show() {
    if (this.alive) {
      // only show if alive.
      if (this.currentImg === "A") {
        image(this.imgA, this.x, this.y, this.width, this.height);
      }
      if (this.currentImg === "B") {
        image(this.imgB, this.x, this.y, this.width, this.height);
      }
    }
  }

  move() {
    this.x = this.x + this.xdir;

    // image animation
    if (this.currentImg === "A") {
      this.currentImg = "B";
    } else if (this.currentImg === "B") {
      this.currentImg = "A";
    }
  }

  shiftDown() {
    this.xdir = -this.xdir;
    this.y = this.y + this.height;
  }
}
