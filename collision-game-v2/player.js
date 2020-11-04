class Player {
  constructor(){
    this.y = windowHeight/2;
    this.r2 = 40;
    this.r = 120;
    this.x = this.r/2;
    this.xspeed = 0;
    this.yspeed = 0;
    this.dir = 0;
    this.red = 255;
    this.green = 255;
    this.blue = 255;
  }

  //created this so I can call this method inside newRound
  reset(){
    this.y = windowHeight/2;
    this.r2 = 40;
    this.r = 120;
    this.x = this.r/2;
    this.xspeed = 0;
    this.yspeed = 0;
    this.dir = 0;
    this.red = 255;
    this.green = 255;
    this.blue = 255;
  }

  build(){
    //player cannot leave the canvas
    this.limx = constrain(this.x, this.r/2, windowWidth - this.r/2);
    this.limy = constrain(this.y, this.r/2, windowHeight - this.r/2);
    stroke(255);
    fill(this.red, this.green, this.blue, 100);
    ellipse(this.limx, this.limy, this.r);
    noStroke();
    fill(255);
    ellipse(this.limx, this.limy, this.r2);
  }

  move(){
    //the player will move up, down, left and right on key pressed
    if(this.dir == 1){
    //move left
    this.x += this.xspeed * 2;
    this.xspeed = -1;
  } else if (this.dir == 2) {
    //move right
    this.x += this.xspeed * 2;
    this.xspeed = 1;
  } else if (this.dir == 3) {
    //move up
    this.y += this.yspeed * 2;
    this.yspeed = -1;
  } else if (this.dir == 4) {
    //move down
    this.y += this.yspeed * 2;
    this.yspeed = 1;
  }
  this.keyPressed();
  }

  keyPressed(){
    if (keyCode == LEFT_ARROW){
      this.dir = 1;
    } else if (keyCode == RIGHT_ARROW){
      this.dir = 2;
    } else if (keyCode == UP_ARROW){
      this.dir = 3;
    } else if (keyCode == DOWN_ARROW) {
      this.dir = 4;
    }
  //console.log(key);
  }

  changeColor(){
    //the color changes from white to red, the "redder" the color, nearer to death you are
    this.blue -= 10;
    this.green -= 5;
  }

  //code reference here --> https://youtu.be/GY-c2HO2liA
  //created this method so the player collides with safePlace
  intersects(other){
    let d = dist(this.x, this.y, other.x, other.y);
    if(d < this.r/2 + other.rectW/2){
      return true;
    } else {
      return false;
    }
  }
}
