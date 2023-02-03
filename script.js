function setup() {
  createCanvas(windowWidth - 50, windowHeight - 50);
  background(0);

  frameRate(30);
}

let star = {
  x: 50,
  y: 50,
  diameter: 100,
};

function draw() {
  fill(255);
  ellipse(star.x, star.y, star.diameter, star.diameter);
  star.x += 10;
  star.y += 10;
}
