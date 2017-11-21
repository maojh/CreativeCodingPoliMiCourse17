
var unit;

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();

  unit=height/10;
}

function draw() {
  background('darkBlue');

  var rad = unit*0.8;

  for(var r=unit; r<width-unit;r+=unit) {
    for(var c=unit; c<height-unit; c+=unit) {
      fill(220);
      if(keyIsPressed){
        fill(20);
        text(key, r, c);
        fill(255);
      }
      var dista, crad;
      crad = rad;
//        var crad = map(dist(mouseX, mouseY, r, c), 0, width, 5, rad);
  if(mouseX<width&&mouseX>0&&mouseY>0&&mouseY<height){
    dista = dist(touchX, touchY, r, c)/10;
    crad = pow(dista, 3)/pow(unit, 1.8) + rad/4;
  }
        ellipse(r,c, crad, crad);
        var pdista=dista;
        var pcrad=crad;
    }
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("size changed");
}
