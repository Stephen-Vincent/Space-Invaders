// Space Invaders by Stephen Vincent

// Global Variables

let ship;
let aliens = []; // array of aliens
let lasers = []; // array of lasers
let points = 0;

function preload() {
  alien1a = loadImage("images/alien1a.png");
  alien1b = loadImage("images/alien1b.png");
  alien2a = loadImage("images/alien2a.png");
  alien2b = loadImage("images/alien2b.png");
}

function setup() {
  createCanvas(600, 800);
  frameRate(10);
  imageMode(CENTER);
  ship = new Ship();

  // create the bottom row of aliens.
  let startX = 80;
  let startY = 80;
  for (let i = 0; i < 6; i++) {
    aliens[i] = new Alien(i * startX + 80, startY, alien1a, alien1b, 5);
  }

  // create the top row of aliens.
  startY = 40;
  let offset = 0;
  for (let j = 6; j < 12; j++) {
    aliens[j] = new Alien(offset * startX + 80, startY, alien2a, alien2b, 10);
    offset++;
  }

  // console.log(aliens);
}

function draw() {
  background(50);
  ship.show();
  ship.move();

  // show and move aliens

  let edge = false;

  for (let i = 0; i < aliens.length; i++) {
    aliens[i].show();
    aliens[i].move();

    if (aliens[i].x > width - 20 || aliens[i].x < 20) {
      edge = true;
    }

    // added 20 to this as the edge detection is from the center of the image.
  }

  if (edge) {
    for (let k = 0; k < aliens.length; k++) {
      aliens[k].shiftDown();
    }
  }
  // display and move laser
  for (let las = 0; las < lasers.length; las++) {
    lasers[las].show();
    lasers[las].move();
    //collision detection
    for (let i = 0; i < aliens.length; i++) {
      if (lasers[las].hits(aliens[i])) {
        lasers[las].remove();
        points = points + aliens[i].pts;
        aliens.splice(i, 1); //remove an alien from the array
      }
    } // end of the alien loop
  } //end of the laser loop #1

  // loop through lasers, remove lasers with flag.
  for (let z = lasers.length - 1; z >= 0; z--) {
    if (lasers[z].toDelete) {
      lasers.splice(z, 1); // remove laser from array
    }
  } // end of laser loop #2.
  updateHUD(); // HUD = Heads up Display;
  // check if game is over.
  if (aliens.length <= 0) {
    gameOver();
  }
} // end of draw function

// Key Event Handlers

function keyPressed() {
  if (key === " ") {
    let laser = new Laser(ship.x + ship.width / 2, ship.y - ship.height * 2);
    lasers.push(laser);
  }
  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}

function keyReleased() {
  ship.setDir(0);
}

function updateHUD() {
  fill(255);
  text("Score: " + points, 10, 20);
  text("Aliens Remaining: " + aliens.length, 70, 20);
}

function gameOver() {
  background(0);
  textSize(72);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2);
  noLoop();
}
