// --> how to create a map function with an argument from a class?
// --> how to "restart" the random function when the buildings leave the screen

let boff = 0;
let inc = 0.01;
let brightness;
let mountain1, mountain2;
let house = [];
let house2 = [];
let stars = [];
let rain = [];
let x = [];
//let y = [];
let h = [];
let w = [];
let c = [];
//let speed;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for(i = 0; i < 1000; i++){
    rain[i] = new Rain();
  }

  //build a shit load of stars
  for(i = 0; i < 400; i++){
    stars[i] = new Stars();
  }

  //build mountains
  mountain1 = new Mountains(0.01, 3, 250, 1, 20);
  mountain2 = new Mountains(0.008, 2, 150, 4, 40);

  //build 8 houses in different places and with different sizes
  for (i = 0; i < 8; i++){
    x[i] = random(windowWidth);
    //y[i] = random (windowHeight/2 + 100, windowHeight/2 + 200);
    h[i] = random(25, 200);
    w[i] = random(25, 200);
    c[i] = random(60, 80);
    house[i] = new Houses(x[i], windowHeight/2 + 210, h[i], w[i], c[i], 7);
  }

  //build 4 houses in different places and with different sizes
  for(i = 0; i < 4; i++){
    x[i] = random(windowWidth);
    h[i] = random(50, 225);
    w[i] = random(50, 225);
    c[i] = random(80, 110);
    house2[i] = new Houses(x[i], windowHeight/2 + 250, h[i], w[i], c[i], 10);
    }
  }

function draw() {
  background(0);

  //stars
  for (i = 0; i < stars.length; i++){
    stars[i].build();
  }

  //moon
  push();
  noStroke();
  //brightness = map(noise(boff), 0, 2, 20, 255);
  brightness = map(mouseX, 0, windowWidth, 20, 255);
  fill(brightness);
  ellipse(windowWidth - 120, 80, 80);
  boff += inc;
  pop();
  //console.log(boff);
  mountain1.build();
  mountain2.build();

  //floor
  fill(50);
  rect(0, windowHeight - 200, windowWidth, windowHeight - 200);

  for (i = 0; i < house.length; i++){
    house[i].build();
  }

  for (i = 0; i < house2.length; i++){
    house2[i].build();
  }

//make it rain button
  fill(255);
  rect(40, 40, 100, 40);

  fill (0);
  textAlign(CENTER, CENTER);
  text('Make it snow', 80, 60);

  if (mouseX < 140 && mouseX > 40 && mouseY < 80 && mouseY > 40){
    for(i = 0; i < rain.length; i++){
      rain[i].build();
    }
  }
}
