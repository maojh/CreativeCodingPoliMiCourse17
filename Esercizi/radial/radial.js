
//Momentum wheel

var radius = 300;
var speed = 30;

//Colors
var col1;
var i = 0;

function setup() {
  createCanvas(500,500);
  noFill();
  stroke(255);
  //strokeWeight(2);
  background(30);
  frameRate(speed);
  colorMode(HSB);
  col1 = color('Fuchsia');
}

function draw() {
  //background(30);

  translate(width/2, height/2);
  // console.log(frameCount);

  //frame
//ellipse(0, 0, radius, radius);

  //lines
  push();
    translate( radius/2, 0)
    rotate(frameCount/speed);
    for(var p=0; p>-radius*cos(frameCount/speed); p-=5) {
      stroke(255*(300/p));
      point(p, 0);
    }
    //line(-radius*cos(frameCount/speed), 0, 0, 0);
  pop();

  if(frameCount==94*2+1) {
//    if(frameCount==94) {

     noLoop();
  }
}



function circle1() {
  stroke(sin(frameCount/120)*255, 120, 200);
  ellipse(radius*0.7, 0, radius, radius);
}

function mousePressed() {
   save("radial-###.jpg");
}
