let title = [];
let date = [];
let rate = [];
let filmData;

function setup() {
  httpGet('https://ghibliapi.herokuapp.com/films', myCallback);
    createCanvas(windowWidth,windowHeight);
    background(0);

}

function draw (){

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
}


function myCallback(result){

  //console.log(result);
  //console.log(typeof result);

  let filmData = JSON.parse(result);
  //console.log(filmData);
  let y = [];
  let x = [];
  let r;
  let g;

  //I just want to use title, date and movie rate
  for (i = 0; i < filmData.length; i++){
    title[i] = filmData[i].title;
    date[i] = filmData[i].release_date;
    rate[i] = filmData[i].rt_score;

    //using the map function to distribute the movies in the grid according to their release_date
    y[i] = map(date[i], 1986, 2014, 50, windowHeight-50);
    x[i] = 100;
    fill(255);
    noStroke();
    text(title[i], x[i], y[i]);
    r = map(rate[i], 41, 100, 255, 100);
    g = map (rate[i], 41, 100, 100, 255);
    fill(r,g,150,100);
    circle(x[i] + 220, y[i], rate[i]/2);

    console.log(title[i]);
    console.log('Rate ' + rate[i]);
    console.log(y[i]);
    console.log(x[i]);
  }

  // if the y of one title is the same as other y of other title, x of other title need to be x+=100
}
