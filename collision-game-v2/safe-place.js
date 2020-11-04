class SafePlace {
  constructor(){
  this.rectW = 60;
  this.rectH = 120;
  this.x = windowWidth - this.rectW/2;
  this.y = random(this.rectH/2, windowHeight - this.rectH/2);
  }

  //created this so I can call this method inside newRound
  reset(){
    this.rectW = 60;
    this.rectH = 120;
    this.x = windowWidth - this.rectW/2;
    this.y = random(this.rectH/2, windowHeight - this.rectH/2);
  }

  build(){
    rectMode(CENTER);
    fill(0, 150, 150);
    rect(this.x, this.y, this.rectW, this.rectH);
    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text('Home', this.x, this.y);
    pop();
  }
}
