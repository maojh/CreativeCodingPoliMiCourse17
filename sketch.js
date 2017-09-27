function setup() {
  createCanvas(800,600);
  console.log(window.width, window.height);
  background(0);
}


function draw() {
  translate(800/2, 600/2);
  noStroke();
  fill(240);
  ellipse(mouseX, mouseY, width/10, height/10);
}
