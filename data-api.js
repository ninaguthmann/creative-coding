function setup() {
  httpGet('https://ghibliapi.herokuapp.com/films', myCallback);
    createCanvas(600,600);
}


function myCallback(result){

  console.log(result);
  console.log(typeof result);

  let rParsed = JSON.parse(result);
  let myKeys = Object.keys(rParsed);

  console.log(rParsed);
  console.log(myKeys);
  console.log(rParsed[myKeys[0]]);

}
