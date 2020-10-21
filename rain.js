class Rain {
  constructor(){
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.size = random(4, 8);
    this.speed = random(5,10);
    this.b = random (50, 200);
  }

  build(){
    //noStroke();
    fill(255, this.b);
    ellipse(this.x, this.y, this.size, this.size);
    this.y+= this.speed;

    if (this.y > windowHeight + this.size/2){
      this.y = 0;
    }
  }
}
