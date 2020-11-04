let player;
let enemy1 = [];
let safePlace;
let add = 0;
let enemyCount = 6;
let number = 1;
let sneeze, corona;

function preload(){
  sneeze = loadSound('sounds/sneeze.mp3');
  corona = loadSound('sounds/coronavirus.mp3');
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  player = new Player();
  safePlace = new SafePlace();

  //starts with 6 enemies
  for(i = 0; i < enemyCount; i++){
    enemy1[i] = new Enemy(random(200, windowWidth - 100), random(40, windowHeight - 40), random(int(-2,2)), random(int(-2,2)));
  }
}

function draw(){
  background(150);

  player.build();
  player.move();

  safePlace.build();

  //build enemies but they need to collide with each other
  for(i = 0; i < enemy1.length; i++){
    enemy1[i].build();
    for(j = 0; j < enemy1.length; j++){
      if(enemy1[i].intersects(enemy1[j])){
        enemy1[i].multx = enemy1[i].multx * -1;
        enemy1[j].multx = enemy1[j].multx * -1;
        enemy1[i].multy = enemy1[i].multy * -1;
        enemy1[j].multy = enemy1[j].multy * -1;
        //console.log('collision!');
      }
    }
    if(enemy1[i].intersects(player)){
      player.changeColor();
      //sneeze.play();
      console.log('collision 2!');
    }
  }
  if(player.blue <= 0 && player.green <= 0){
    death();
  }

  if(player.intersects(safePlace)){
    newRound();
  }

  push();
  fill(255);
  textSize(24);
  text('Pandemic week ' + number, 20, 40);
  pop();

}

function death(){
  background(255,0,0);

  //play Cardi B amazing "Corona Virus!" :P
  corona.play();
  
  noLoop();
  //console.log('game over');
  push();
  fill(255);
  textSize(windowHeight/6);
  textAlign(CENTER, CENTER);
  text('shit is real', windowWidth/2, windowHeight/2);
  pop();
}

function newRound(){

  //reset player and safePlace
  player.reset();
  safePlace.reset();

  //increase pandemic week
  number++;

  //increase number of enemies
  let b = new Enemy(random(200, windowWidth - 100), random(40, windowHeight - 40), random(int(-2,2)), random(int(-2,2)));
  enemy1.push(b);
  console.log(enemy1.length);
}
