class Snake {

  constructor() {
  	this.snake = [];
    this.size = 1; //as I am using scale to decrease the number of pixels, so the size will be 1
    this.snake[0] = [w/2 - this.size, h/2 - this.size]; //the snake will start in the middle of screen ==> this.snake[0][0] = w/2 - this.size | this.snake[0][1] = h/2 - this.size
    this.xdir = 0;
    this.ydir = 0;
  }

  move() {
    // shifting array
  	let head = this.snake[this.snake.length-1];
    head = JSON.parse(JSON.stringify(head));
    this.snake.shift();

    // make array move
    head[0] += this.xdir;
    head[1] += this.ydir;

    // adding element that was shifted in the end
    this.snake.push(head);
  }

  grow() {
  	let head = this.snake[this.snake.length-1];
    head = JSON.parse(JSON.stringify(head));

    // adding element to the array
    this.snake.push(head);
  }

  death() {
  	let x = this.snake[this.snake.length-1][0];
    let y = this.snake[this.snake.length-1][1];

    // make snake die when it touches the end of screen
    if(x > w - this.size || x < 0 || y > h - this.size || y < 0) {
       return true;
    }

    // make snake die when it hits itself
    for(let i = 0; i < this.snake.length-1; i++) {
      if(this.snake[i][0] == x && this.snake[i][1] == y) {
      	return true;
      }
    }
    return false;
  }

  checkGoal(pos1, pos2) {
  	let x = this.snake[this.snake.length-1][0];
    let y = this.snake[this.snake.length-1][1];
    if(x == pos1 && y == pos2){
      this.grow();
      return true;
    }
    return false;
  }

  build() {
  	for(let i = 0; i < this.snake.length; i++) {
      fill(0);
      noStroke();
      rect(this.snake[i][0], this.snake[i][1], this.size);
    }
  }

}
