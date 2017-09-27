function setup() {
  createCanvas(window.width, window.height);
  background(0);
}

function draw() {
  
  translate(width/2, height/2);
  noStroke();
  fill(240);
  ellipse(mouseX, mouseY, width/10, height/2);
}
