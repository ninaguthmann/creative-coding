class Enemy {
  constructor(x, y, speedx, speedy){
    this.x = x;
    this.y = y;
    this.speedx = speedx;
    this.speedy = speedy;
    this.r = 40;
    this.multx = 2;
    this.multy = 2;
    this.c = 255;
  }

  build(){
    //noStroke();
    fill(this.c);
    ellipse(this.x, this.y, this.r);
    this.x += this.speedx * this.multx;
    this.y += this.speedy * this.multy;
    this.moveConstraints();
  }

  moveConstraints(){

    //make the balls bounce when touch the borders
    if (this.x < this.r/2){
      this.multx = this.multx * -1;
    } else if (this.x > windowWidth - this.r/2){
      this.multx = this.multx * -1;
    } else if (this.y < this.r/2) {
      this.multy = this.multy * -1;
    } else if (this.y > windowHeight - this.r/2) {
      this.multy = this.multy * -1;
    }
  }

  //code reference here --> https://youtu.be/GY-c2HO2liA
  //created this method so the enemies could collide with each other and with the player
  intersects(other){
    let d = dist(this.x, this.y, other.x, other.y);
    if(d < this.r/2 + other.r/2){
      return true;

    } else {
      return false;
    }
  }
}
