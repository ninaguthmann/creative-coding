let title = [];
let date = [];
let rate = [];
let description = [];
let filmData;
let y = [];
let x = [];
let r;
let g;
let tWidth;
let lastYear = 0;
//let newData = false;

function setup() {

  httpGet('https://ghibliapi.herokuapp.com/films', myCallback);
  createCanvas(windowWidth,windowHeight);
}

function draw (){
    background(0);
    grid();

    //data visualization
    //I just want to use title, date, movie rate and description
  //if(filmData.length != undefined && newData){
    for (i = 0; i < filmData.length; i++){

      title[i] = filmData[i].title;
      date[i] = filmData[i].release_date;
      rate[i] = filmData[i].rt_score;
      description[i] = filmData[i].description;

      tWidth = textWidth(title[i]);

    //using the map function to distribute the movies in the grid according to their release_date
      y[i] = map(date[i], 1986, 2014, 50, windowHeight-50);

    // this if statement is for the movie titles of the same year, so they don't appear on top each other
      if (date[i] != lastYear){
        lastYear = date[i];
        x[i] = 100;
      } else {
        x[i] = 300;
      }

      push();
      fill(200);
      noStroke();
      text(title[i], x[i], y[i]);
      r = map(rate[i], 41, 100, 250, 100);
      g = map (rate[i], 41, 100, 100, 250);
      fill(r,g,150,150);
      circle(x[i] + (tWidth + 50), y[i], rate[i]/2);
      pop();

      push();
      fill(220);
      noStroke();
      textAlign(CENTER, CENTER);
      text(rate[i], x[i] + (tWidth + 50),y[i]);
      pop();

      //on hover, I want the description of the movie to appear
      showDescription(i);

    }
  //}
  //newData = false;
}

function myCallback(result){

  // console.log(result);
  // console.log(typeof result);

  filmData = JSON.parse(result);
  //newData = true;
  // console.log(filmData);
}

function grid(){
  //create grid for the timeline, 28 lines (from 1986 to 2014)
  stroke(50);
  line(100, 50, 100, windowHeight - 50);
  for(i = 0; i <= 28; i++ ){
    line(100, 50 + ((windowHeight-100)/28) * i, windowWidth - 50, 50 + ((windowHeight-100)/28) * i);

    //add years to the grid
    push();
    noStroke();
    fill(100);
    textStyle(ITALIC);
    text(1986+i, 50, 50 + ((windowHeight-100)/28) * i );
    pop();
  }

  push();
  noStroke();
  fill(50);
  textSize(50);
  h1Width = textWidth('studio ghibli films');
  text('studio ghibli films', (windowWidth - 50) - h1Width, 50);
  pop();
}

function showDescription(j){
    d = dist(mouseX, mouseY, x[j], y[j]);
    // I added absolute to increase the precision of the mouse over
    if(d < tWidth && abs(mouseY-y[i]) <= 10){
    //noStroke();
    fill(10);
    rect(x[j] - 10, y[j] - 10, 310, 120);
    fill(200);
    text(description[j], x[j], y[j], 300);
  }
}
