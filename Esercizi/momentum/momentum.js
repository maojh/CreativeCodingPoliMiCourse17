
//Momentum wheel

var radius = 150;
var speed = 30;

//Colors
var from;
var to;

function setup() {
  createCanvas(500,500);
  noFill();
  stroke(0);
  strokeWeight(2);
  background(30);
  frameRate(speed);
  colorMode(HSB);
  //colors, can-t do this outside of setup()
  // from = color(218, 165, 32);
  // to = color(72, 61, 139);
  from = color('blue');
  to = color('Fuchsia');
}

function draw() {
  translate(width/2, height/2);
  rotate(frameCount/speed);
  // console.log(frameCount);

  //circle1();
  circle1();

  if(frameCount==189) {
    noLoop();
  }
}

function mousePressed() {
      save("momentum.jpg");
}

function circle1() {
  stroke(sin(frameCount/120)*255, 120, 200);
  ellipse(radius*0.7, 0, radius, radius);
}

function circle2() {
  var amt = ((frameCount/(speed*6)));
  console.log(amt);;
  stroke(lerpColor(from, to, amt));
  ellipse(radius*0.5, 0, radius, radius);
}
