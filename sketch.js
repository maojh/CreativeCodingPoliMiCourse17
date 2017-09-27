function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(windowWidth, windowHeight);
  background(0);
}


function draw() {
  fill(2, 35);
  rect(0,0, windowWidth, windowHeight);
  noStroke();
  fill(240);
  ellipse(mouseX, mouseY, windowWidth/10, windowWidth/10);
}
