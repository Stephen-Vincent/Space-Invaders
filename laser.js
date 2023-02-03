class Laser {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.diameter = this.radius * 2;
    this.toDelete = false; // flag
  }

  show() {
    noStroke();
    fill(255, 0, 255);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }

  move() {
    this.y = this.y - 20; // UP of the y axis
  }

  hits(alien) {
    // dist() function measures the distance between two points
    let d = dist(this.x, this.y, alien.x, alien.y);
    if (d < this.radius + alien.radius) {
      return true;
    } else {
      return false;
    }
  }

  remove() {
    this.toDelete = true;
  }
}
