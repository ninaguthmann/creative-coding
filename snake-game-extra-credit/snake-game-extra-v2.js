// for this project, I used as reference Daniel Shiffman's snake game redux https://youtu.be/OMoVcohRgZA
// I tried to do it without it, but I wasn't able to shift the array on my own :(

let snake;
let res = 20; //as I used 600 as my canvas size, I created this variable to divide the width by 20
let goals;
let w, h;
let speed = 4;
let nGoals = 0;
let button;
let sGameOver, sEating;

function preload(){
  sEating = loadSound("eating-sound.wav");
  sGameOver = loadSound("game-over.wav");
}

function setup() {
  createCanvas(600, 600);

  // I've never user floor before, and I got to learn what it does.
  // https://p5js.org/reference/#/p5/floor --> reference here
  w = floor(width / res);
  h = floor(height / res);

  // I wanted to increase the speed everytime the snake eats, and I decided to do it using the frameRate
  frameRate(speed);

  snake = new Snake();
  goals = new Goal();

  button = createButton('Reset game');
  button.position(width - 100, 10);
  button.mousePressed(startOver);

}

function keyPressed() {
  if (keyCode === LEFT_ARROW && snake.xdir == 0) {
    snake.xdir = -1;
    snake.ydir = 0;
  } else if (keyCode === RIGHT_ARROW && snake.xdir == 0) {
    snake.xdir = 1;
    snake.ydir = 0;
  } else if (keyCode === DOWN_ARROW && snake.ydir == 0) {
    snake.xdir = 0;
    snake.ydir = 1;
  } else if (keyCode === UP_ARROW && snake.ydir == 0) {
    snake.xdir = 0;
    snake.ydir = -1;
  } else if (key == 'a') {
    startOver();
    //snake.grow();
  }

}

function draw() {
  scale(res); // this was to make it "pixel perfect", and I thought it was a nice touch and I wanted to keep it this way
  background(200);

  goals.build();

  if (snake.checkGoal(goals.goal[0][0], goals.goal[0][1])){

    sEating.play();

    // new position to the goal
    goals.update();

    //goal worth 10 points
    nGoals += 10;

    // increasing speed
    speed++;
    frameRate(speed);
  }

  snake.move();
  snake.build();

  textAlign(LEFT, CENTER);
  textSize(1);
  text("Score: " + nGoals, 1, 1);

  if (snake.death()){
    background(200, 100, 150);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(2);
    text("Game over", w/2, h/2 - 2);
    textSize(1);
    text("Your score: " + nGoals, w/2, h/2);
    sGameOver.play();
    noLoop();
  }
}

function startOver() {

  loop();
  background(200);

  snake = new Snake();
  goals = new Goal();

  nGoals = 0;
  speed = 4;

  frameRate(speed);

}
