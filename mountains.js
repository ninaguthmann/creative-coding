class Mountains {
  constructor(inc, noiz, offset, speed, c){
    this.noiz = noiz;
    this.inc = inc;
    this.offset = offset;
    this.speed = speed;
    this.c = c;
    this.start = 0;
  }

  build (){
    beginShape();
    //let speedMap = map(mouseX, 0, windowWidth, 0, this.speed);
    let xoff = this.start;
    vertex(0, windowHeight);
    for (this.x = 0; this.x < windowWidth; this.x += this.speed){
      let y = map(noise(xoff), 0, this.noiz, windowHeight/2 - this.offset, windowHeight - this.offset);
      noStroke();
      fill(this.c);
      vertex(this.x, y);
      xoff += this.inc;
    }
    vertex(windowWidth, windowHeight);
    //keep drawing
    endShape();
    this.start += this.inc;
  }
}
