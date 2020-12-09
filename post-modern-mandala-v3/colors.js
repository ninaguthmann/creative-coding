class Colors extends Quadrants{
  constructor(){
    super();
    this.r = [];
    this.g = [];
    this.b = [];
    this.colors = [];
    this.nColors = int(random(1, 6));
    this.num = this.nColors * this.nColors;
  }

  build(){
    strokeWeight(2);
    stroke(0);

    this.nColors = int(random(1, 6));
    this.num = this.nColors * this.nColors;

    for(let i = 0; i < this.num; i++){
      this.r[i] = int(random(255));
      this.g[i] = int(random(255));
      this.b[i] = int(random(255));
      }

    for(let i = 0; i < this.nColors; i++){
      for(let j = 0; j < this.nColors; j++){
        fill(this.r[i+j], this.g[i+j], this.b[i+j]);
        rect(this.margin + (i * this.size/this.nColors), (windowHeight - (this.margin * 2) - (this.size * 2)) + (j * this.size/this.nColors), this.size / this.nColors, this.size / this.nColors);
      }
    }

  }
}
