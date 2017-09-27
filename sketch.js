function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(windowWidth, windowHeight);
  background(0);
}


function draw() {
  translate(windowWidth/2, windowHeight/2);
  noStroke();
  fill(240);
  ellipse(mouseX, mouseY, windowWidth/10, windowWidth/10);
}
