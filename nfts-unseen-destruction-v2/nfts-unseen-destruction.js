//create array of images
let img_seen = [];
let img_unseen = [];

// create variables for each image that will be on the arrays
let seen_01, seen_02, seen_03, seen_04, seen_05;
let unseen_01, unseen_02, unseen_03, unseen_04, unseen_05;

//create variables to randomize images
let randoImage01, randoImage02;

let pix = 10;
let reveal = 5;

let margin_l = 96;
let margin_s = 24;

let size = 15;

let trans = 1;
let mint;
let bid = 0;

function preload() {
  seen_01 = loadImage('seen-destruction/seen-01.jpg');
  seen_02 = loadImage('seen-destruction/seen-02.jpg');
  seen_03 = loadImage('seen-destruction/seen-03.jpg');
  seen_04 = loadImage('seen-destruction/seen-04.jpg');
  seen_05 = loadImage('seen-destruction/seen-05.jpg');


  unseen_01 = loadImage('unseen-destruction/unseen-01.jpg');
  unseen_02 = loadImage('unseen-destruction/unseen-02.jpg');
  unseen_03 = loadImage('unseen-destruction/unseen-03.jpg');
  unseen_04 = loadImage('unseen-destruction/unseen-04.jpg');
  unseen_05 = loadImage('unseen-destruction/unseen-05.jpg');

  img_seen = [seen_01, seen_02, seen_03, seen_04, seen_05];
  img_unseen = [unseen_01, unseen_02, unseen_03, unseen_04, unseen_05];
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  mint = int(random(56, 154));

  randoImage02 = random(img_seen);
  randoImage01 = random(img_unseen);

}

function draw() {

  background(255);
  pixelDensity(1);

  push();

  translate(margin_l, margin_l);

  randoImage02.loadPixels();
  for(let y = 0; y < randoImage02.height; y++ ){
    for(let x = 0; x < randoImage02.width; x++){
      let index = (x + y * randoImage02.width) * 4;
      let r = randoImage02.pixels[index];
      let g = randoImage02.pixels[index + 1];
      let b = randoImage02.pixels[index + 2];
      noStroke();
      fill(r, g, b);
      square(x, y, size);
      x += size - 1;
    }
    y += size - 1;
  }

  randoImage02.resize(500, 500);
  randoImage02.updatePixels();


  randoImage01.loadPixels();
  for(let y = 0; y < randoImage01.height; y++ ){
    for(let x = 0; x < randoImage01.width; x++){
      let index = (x + y * randoImage01.width) * 4;
      let r = randoImage01.pixels[index];
      let g = randoImage01.pixels[index + 1];
      let b = randoImage01.pixels[index + 2];
      let a = randoImage01.pixels[index + 3];
      a = random (255 - reveal);
      noStroke();
      fill(r, g, b, a);
      square(x, y, size);
      x += size - 1;
    }
    y += size - 1;
  }

  randoImage01.resize(500, 500);
  randoImage01.updatePixels();
  pop();

  push();
  stroke(0);
  strokeWeight(4);
  noFill();
  square(margin_l/2, margin_l/2, 500 + margin_l + 6);
  pop();

  textFont("Playfair Display");
  textSize(42);
  text("NFTs &\nThe Unseen\nDestruction", margin_l * 2 + 500, margin_l);

  textFont("Source Code Pro");
  textSize(16);
  text("Current carbon footprint:", margin_l * 2 + 500, margin_l * 2 + margin_s * 3);
  textSize(36);
  text(mint + bid + "kgCO2", margin_l * 2 + 500, margin_l * 2 + margin_s * 5);

  textFont("Source Code Pro");
  textSize(16);
  text(trans + " Transaction(s) was made", margin_l * 2 + 500, margin_l * 2 + margin_s * 8);

  placeBid();

  betButton();

}

function placeBid(){

  if(mouseIsPressed & mouseX > margin_l * 2 + 500 & mouseX < margin_l * 2 + 500 + 156 & mouseY > 500 + margin_l & mouseY < 500 + margin_l + 56 & size > 4){
    size -= 1;
    reveal += 25.5;
    trans += 1;
    bid += 24;


  } else if(mouseIsPressed & mouseX > margin_l * 2 + 500 & mouseX < margin_l * 2 + 500 + 156 & mouseY > 500 + margin_l & mouseY < 500 + margin_l + 56 & size == 4){
      //background(255);
      size = 15;
      reveal = 5;
      trans = 1;
      bid = 0;
      mint = int(random(56, 154));

      randoImage02 = random(img_seen);
      randoImage01 = random(img_unseen);
    }
}

function betButton(){

  push();
  noFill();
  stroke(0);
  strokeWeight(2);
  rect(margin_l * 2 + 500, 500 + margin_l, 156, 56);
  pop();

  push();
  textFont("Source Code Pro");
  textSize(16);
  text("Place a Bid", margin_l * 2 + 500 + margin_s, 500 + margin_l + 32);
  pop();

  if(mouseX > margin_l * 2 + 500 & mouseX < margin_l * 2 + 500 + 156 & mouseY > 500 + margin_l & mouseY < 500 + margin_l + 56){
    push();
    fill(0);
    rect(margin_l * 2 + 500, 500 + margin_l, 156, 56);
    pop();

    push();
    textFont("Source Code Pro");
    fill(255);
    textSize(16);
    text("Place a Bid", margin_l * 2 + 500 + margin_s, 500 + margin_l + 32);
    pop();
  }

}
