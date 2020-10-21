// -> use this https://editor.p5js.org/wvnl/sketches/5wnuHAXKd as code reference!
// -> I learnt that TAU means TWO_PI :P

class Stars {
  constructor(){
    this.x = random(windowWidth);
    this.y = random(0, windowHeight/2);
    this.size = random(0.15, 2);
    this.speed;
    this.a = random(TWO_PI);
  }

  build(){
    //noStroke();
    fill(255, 200);
    this.speed = map(mouseX, 0, windowWidth, 0.01, 0.1);
    this.a += this.speed;
    let scale = this.size + sin(this.a);
    ellipse(this.x, this.y, scale, scale);
  }
}
