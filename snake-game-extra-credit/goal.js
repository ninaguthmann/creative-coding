class Goal {

  constructor(){
    this.goal = [];
    this.size = 1;
    this.goal[0] = [floor(random(w)), floor(random(h))]; //the food will appear randonly ==> this.goal[0][0] = floor(random(w)) | this.goal[0][1] = floor(random(h))
  }

  build(){
    fill(200, 100, 150);
    rect(this.goal[0][0], this.goal[0][1], this.size);
  }

  update(){
    this.goal[0] = [floor(random(w)), floor(random(h))];
    rect(this.goal[0][0], this.goal[0][1], this.size);
  }
}
