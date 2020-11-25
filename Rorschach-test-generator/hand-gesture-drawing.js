/*
(^._.^)ﾉ
by Marina and cat
*/

let serial;
let latestData = "waiting for data";

let pos = [];
let r1, g1, b1;
let r2, g2, b2;
let button;
let sensor1;
let sensor2;
let brightness = 100;
let shape;
let size;

function setup() {
  createCanvas(windowWidth, windowHeight);

  r1 = random(255);
  g1 = random(255);
  b1 = random(255);

  background(r1, g1, b1, 100);

  stroke(r1, g1, b1, brightness);

  serial = new p5.SerialPort();

  serial.list();
  serial.open('/dev/tty.usbmodem1411');

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

function gotData() {
  let currentString = serial.readLine();
  trim(currentString);
  if (!currentString) return;
  //console.log(currentString);
  latestData = currentString.split('/');
  //console.log(latestData);

  pos[0] = map(latestData[0],-500, 500, 0, windowWidth); //x
  pos[1] = map(latestData[1], -500, 500, 0, windowHeight); //y
  pos[2] = map(latestData[2], -500, 500, 0, 100);

  button = latestData[3];

  sensor1 = map(latestData[4], 0, 1023, 10, 100);
  sensor2 = map(latestData[5], 0, 1023, 1, 5);

  //console.log(pos[0], pos[1]);
  //console.log(button);
  //console.log(sensor);
}

function draw() {

  r2 = random(255);
  g2 = random(255);
  b2 = random(255);

  //brightness = 100;

  //fill(0);
  //text(latestData, 10, 10);

  noFill();
  strokeWeight(sensor2);
  ellipse(pos[0], pos[1], sensor1);

  ellipse((pos[0] * -1) + windowWidth, pos[1], sensor1);

  if (strokeWeight >= 2){
    brightness = 10;
  }

  if(button == 1){
    background(r2, g2, b2, 100);
    stroke(r2, g2, b2, brightness);
  }
}
