
//Radial

var radius = 300;
var speed = 30;

function setup() {
  createCanvas(500,500);
  noFill();
  //strokeWeight(2);
  background(255);
  stroke(0);
  frameRate(speed);
}

function draw() {
  translate(width/2, height/2);
  //dotted lines
  push();
    translate( radius/2, 0)
    rotate(frameCount/speed);
    for(var p=0; p>-radius*cos(frameCount/speed); p-=5) {
      point(p, 0);
    }
  pop();

  if(frameCount==94*2+1) {
     noLoop();
  }
}

function mousePressed() {
   save("radial-###.jpg");
}
