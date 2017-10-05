//Candies texture
//Arcs, transformation and trace

var size = 120;
var posx = 0;
var posy = 0;
var inc;

function setup() {
  createCanvas(800,600);
  background(220);
  noStroke();
  frameRate();
}

function draw() {
  // fill(220);
  // rect(0,0,width, height);
  inc = frameCount/30;
  if(inc>width) inc = 0;
  console.log(inc);
  push();
    translate(inc*50, height/2);
    rotate(inc);

    fill(255, 200);
    arc(posx, posy, 120, 120, 0, PI/1.5, PIE);
    fill(0,220,0, 200); //green
    arc(posx, posy, 120, 120, PI/1.5,-PI*2/3, PIE);
    fill(255, 0, 0, 200);
    arc(posx, posy, 120, 120, -PI*2/3, 0, PIE);
  pop();
  fill(0);
  rect(0, 0, 100, 60);
  fill(220);
  textSize(24);
  textAlign(RIGHT);
  text(frameCount, 75, 40);
}
