/*
(^._.^)ﾉ
by Marina and cat
*/

let serial;
let latestData = "waiting for data";

let posX, posY;
let prevPosX, prevPosY;
let button, lastButton;
let sensor1;
let sensorWeight, sensorAlpha;
let sensor2;
let mandala, mandala4, mandala6, mandala8, mandala10, mandala12;
let quad4, quad6, quad8, quad10, quad12;
let r = [];
let g = [];
let b = [];
let nColors = [];
let color;
let polySynth;
let backSound;
let xValues, yValues, brush;
let newCanvas1;
let margin = 24, sizing = 80;

function preload (){

  //background music
  bsound = createAudio("Two Moons - Bobby Richards.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // this canvas was created to display the small screen on lines 122 - 133, the small screen is a UI element to help visualize what is happening
  newCanvas1 = createGraphics(2 * margin + windowWidth/12, 6 * margin + windowHeight/12);

  background(0);

  angleMode(DEGREES);

  // creating the mandalas with different quadrants
  mandala4 = new Mandala(4);
  mandala6 = new Mandala(6);
  mandala8 = new Mandala(8);
  mandala10 = new Mandala(10);
  mandala12 = new Mandala(12);

  // this is the UI component that shows the amount of quadrants on screen
  quad4 = new Quadrants(4);
  quad6 = new Quadrants(6);
  quad8 = new Quadrants(8);
  quad10 = new Quadrants(10);
  quad12 = new Quadrants(12);

  // UI component for the colors
  color = new Colors();
  color.build();

  // I used polySynth to create different chords when using the pressure sensor
  polySynth = new p5.PolySynth();

  //p5.serialport code START HERE ------->
  serial = new p5.SerialPort();

  serial.list();
  serial.open('/dev/tty.usbmodem1421');

  serial.on('connected', serverConnected);

  serial.on('list', gotList);

  serial.on('data', gotData);

  serial.on('error', gotError);

  serial.on('open', gotOpen);

  serial.on('close', gotClose);
}

function serverConnected() {
  print("Connected to Server");
}

function gotList(thelist) {
  print("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose(){
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  print(theerror);
}
//p5.serialport code STOPS HERE ------->


function gotData() {
  let currentString = serial.readLine();
  trim(currentString);
  if (!currentString) return;
  //console.log(currentString);
  latestData = currentString.split('/');
  //console.log(latestData);

  //getting the data from the digital switch
  button = latestData[2];
}

function draw() {

  //showing gyroscope values on small screen
  xValues = constrain(map(latestData[0],-300, 300, margin, windowWidth/12), margin, windowWidth/12);
  yValues = constrain(map(latestData[1], -500, 500, margin, windowHeight/12), margin, windowHeight/12);
  brush = map(latestData[3], 0, 900, 10, 2);

  // using createGraphics to create the small screen on the top left corner
  newCanvas1.background(0);
  newCanvas1.stroke(255);
  newCanvas1.noFill();
  newCanvas1.strokeWeight(1);
  newCanvas1.ellipse(xValues, yValues, brush);
  newCanvas1.rect(margin, margin, windowWidth/12, windowHeight/12);
  newCanvas1.noStroke();
  newCanvas1.fill(255);
  newCanvas1.text("x = " + latestData[0], margin, 2 * margin + windowHeight/12);
  newCanvas1.fill(255);
  newCanvas1.text("y = " + latestData[1], margin, 3 * margin + windowHeight/12);
  image(newCanvas1, 0, 0);

  //getting the data from the pressure sensor
  sensor1 = latestData[3];
  //getting the data from the potentiometer
  sensor2 = latestData[4];

  //mapping the data from the pressure sensor to use for drawing the mandala
  sensorWeight = int(map(latestData[3], 0, 900, 10, 1));
  sensorAlpha = int(map(latestData[3], 0, 900, 10, 100));

  //varible to generate diferent color palettes for the color class
  let rVarible = int(random(color.num));
  stroke(color.r[rVarible], color.g[rVarible], color.b[rVarible], sensorAlpha);

  strokeWeight(sensorWeight);

  //drawing and sounds only start when pressure sensor is above 50
  if (sensor1 >= 50){
    startDraw();

    bsound.loop();
    bsound.volume(0.2);
  }

  playNotes();

  numberQuads();

  // if (key === 's') {
  //     save('mandala.png');
  //   }

  // I made this 'if statement' so the color palette generates once when you click
  if (button == 1 && lastButton != 1){
    background(0);
    color.build();
  }
  lastButton = button;
}

function startDraw(){

  //assigning variables of mandala object for different quadrants
  mandala4.prevPosX = mandala4.posX;
  mandala4.posX = map(latestData[0],-300, 300, 0, windowWidth); //x

  mandala4.prevPosY = mandala4.posY;
  mandala4.posY = map(latestData[1], -500, 500, 0, windowHeight); //y

  mandala6.prevPosX = mandala6.posX;
  mandala6.posX = map(latestData[0],-300, 300, 0, windowWidth); //x

  mandala6.prevPosY = mandala6.posY;
  mandala6.posY = map(latestData[1], -500, 500, 0, windowHeight); //y

  mandala8.prevPosX = mandala8.posX;
  mandala8.posX = map(latestData[0],-300, 300, 0, windowWidth); //x

  mandala8.prevPosY = mandala8.posY;
  mandala8.posY = map(latestData[1], -500, 500, 0, windowHeight); //y

  mandala10.prevPosX = mandala10.posX;
  mandala10.posX = map(latestData[0],-300, 300, 0, windowWidth); //x

  mandala10.prevPosY = mandala10.posY;
  mandala10.posY = map(latestData[1], -500, 500, 0, windowHeight); //y

  mandala12.prevPosX = mandala12.posX;
  mandala12.posX = map(latestData[0],-300, 300, 0, windowWidth); //x

  mandala12.prevPosY = mandala12.posY;
  mandala12.posY = map(latestData[1], -500, 500, 0, windowHeight); //y

  //setting up different mandalas according to potentiometer
  if (sensor2 <= 200){
    mandala = 4;
    mandala4.build();
  } else if (sensor2 > 200 && sensor2 <= 400){
    mandala = 6;
    mandala6.build();
  } else if (sensor2 > 400 && sensor2 < 600){
    mandala = 8;
    mandala8.build();
  } else if (sensor2 > 600 & sensor2 <= 800){
    mandala = 10;
    mandala10.build();
  } else if (sensor2 > 800){
    mandala = 12;
    mandala12.build();
  }

  console.log(mandala);
}

function numberQuads(){

  //setting up different UI elements according to potentiometer
  if (sensor2 <= 200){
    quad4.build();
  } else if (sensor2 > 200 && sensor2 <= 400){
    quad6.build();
  } else if (sensor2 > 400 && sensor2 <= 600){
    quad8.build();
  } else if (sensor2 > 600 & sensor2 <= 800){
    quad10.build();
  } else if (sensor2 > 800){
    quad12.build();
  }

}

function playNotes(){

  userStartAudio();

  // note duration (in seconds)
  let dur = 1.5;

  // time from now (in seconds)
  let time = 0;

  // velocity (volume, from 0 to 1)
  let vel = 0.5;

  // setting when the notes will play
  if(sensor1 >= 50 && sensor1 < 300){
    polySynth.play('G2', vel, time, dur + 2);
    polySynth.play('B3', vel, time, dur + 1);
    polySynth.play('D4', vel, time, dur);
    //polySynth.play('A5', vel, time, dur);

    console.log("acorde 1");

  } else if (sensor1 >= 300 && sensor1 < 600) {
    polySynth.play('E3', vel, time, dur + 1);
    polySynth.play('G3', vel, time, dur + 1);
    polySynth.play('B4', vel, time, dur);
    //polySynth.play('D5', vel, time, dur);

    console.log("acorde 2");

  } else if (sensor1 >= 600){
    polySynth.play('D3', vel, time, dur + 1);
    polySynth.play('G3', vel, time, dur + 1);
    polySynth.play('A4', vel, time, dur);
    //polySynth.play('C5', vel, time, dur);

    console.log("acorde 3");
  }
}
