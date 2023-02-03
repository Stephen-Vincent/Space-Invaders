// Space Invaders by Stephen Vincent

// Global Variables

let gameStart; // determins whether the game has started.

let ship;
let aliens = []; // array of aliens
let lasers = []; // array of lasers
let points = 0;

function preload() {
  alien1a = loadImage("images/alien1a.png");
  alien1b = loadImage("images/alien1b.png");
  alien2a = loadImage("images/alien2a.png");
  alien2b = loadImage("images/alien2b.png");
  logo = loadImage("images/spaceInvadersLogo.png");
}

function setup() {
  gameStart = 0; // initially game has not started.
  createCanvas(600, 800);
  frameRate(10);
  textSize(20);
  imageMode(CENTER);

  resetGame();

  // console.log(aliens);
}

function draw() {
  Game();
}

// Key Event Handlers

function keyPressed() {
  if (keyCode === ENTER && gameStart === 0) {
    gameStart = 1;
    resetGame();
    startGame();
  }

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

function updateDisplay() {
  fill(255);
  textAlign(CENTER);
  text("Score: " + points, 100, 20);
  text("Aliens Remaining: " + aliens.length, 450, 20);
}

function gameOver() {
  background(0);
  textSize(72);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2);
  noLoop();
  textSize(20);
  text("Press ENTER to start the game!", width / 2, height / 2 + 50);
  gameStart = 0;
}

//----------- GAME CODE --------------------

function Game() {
  clear();
  loop();
  if (gameStart == 0) {
    fill(255);
    background(50);
    image(logo, width / 2, height / 2 - 100, 300, 150);
    textAlign(CENTER);
    text("Press ENTER to start the game!", width / 2, height / 2);
  }

  if (gameStart == 1) {
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
    updateDisplay(); // HUD = Heads up Display;
    // check if game is over.
    if (aliens.length <= 0) {
      gameOver();
    }
  }
}

// ----------- RESET GAME ---------------

function resetGame() {
  aliens = []; // array of aliens
  lasers = []; // array of lasers
  points = 0;

  ship = new Ship();

  // create the bottom row of aliens.
  startX = 80;
  startY = 80;
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
}

function startGame() {
  Game();
}
