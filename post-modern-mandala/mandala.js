// i used this https://p5js.org/examples/interaction-kaleidoscope.html as a code reference
// i learned that i can use scale to "mirror" things

class Mandala {
  constructor(){
  this.simmetry = 6;
  this.angle = 360 / this.simmetry;
  this.prevPosX;
  this.prevPosY;
  this.posX;
  this.posY;
  }

build(){

  push();
  translate(windowWidth/2, windowHeight/2);
  for(let i = 0; i < this.simmetry; i++){
  rotate(this.angle);
  line(this.prevPosX - windowWidth/2, this.prevPosY - windowHeight/2, this.posX - windowWidth/2, this.posY - windowHeight/2);
  push();
  scale(1, -1);
  line(this.prevPosX - windowWidth/2, this.prevPosY - windowHeight/2, this.posX - windowWidth/2, this.posY - windowHeight/2);
  pop();
  }
  pop();
  }

}
