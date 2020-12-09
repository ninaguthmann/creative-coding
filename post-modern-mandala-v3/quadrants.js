class Quadrants {
  constructor(quad){
  this.quad = quad;
  this.margin = 24;
  this.size = 80;
  }

  build(){
    //noStroke();
    strokeWeight(2);
    stroke(0);
    fill(255);
    rect(this.margin, windowHeight - this.margin - this.size, this.size, this.size);

    push();

    translate(this.margin + this.size/2, windowHeight - this.margin - this.size/2);

    for(let i = 0; i < this.quad; i++){
      rotate(360 / this.quad);
      //ellipse(this.size/2, this.size/2, this.size);
      line(-this.size/2 - 20, 0, this.size/2 + 20, 0);
    }
    pop();
  }
}
