class Houses {
  constructor(x, y, h, w, c, speed){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.speed = speed;
  }

  build (){

    //house main body

    push();
    fill(this.c);
    rect(this.x, this.y - this.h, this.w, this.h);
    pop();

    //windows
    push();
    translate(this.x, this.y - this.h);
    for (this.i = 0; this.i + 6 < this.w; this.i+=18){
      for (this.j = 0; this.j + 12 < this.h; this.j+=24){
        fill(180);
        rect(this.i + 2, this.j + 2, 6, 12);
      }
    }
    pop();

    this.x -= this.speed;

    if (this.x + this.w < 0){
      this.x = windowWidth;
    }
  }


}
