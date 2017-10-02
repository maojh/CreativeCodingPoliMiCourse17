
//Variabili
//testa
var eyeSize = 35;

//addome

//arti
var largLeg = 50;
var lenLeg = 170;

//Colors
//Blue
//var blu = color(0,0,150);

function setup() {
  createCanvas(800, 600);
  noStroke();
}

function draw() {
  background(220,220,250);

  //pavimento
  fill(0);
  rect(0,450,width, height-450);

  //testa
  testa(250,250);

  //addome
  addome(400, 180);
  /*arti:   1D || 1S
        2D \_|----|_/ 2S
              |--|
         3D _/    |_ 3S
  */
  //1D - 1S
  art3(250,280);
  //2D - 2S
  art2(350,280);
  //3D - 3S
  art1(190, 250, PI/3);
  //
}

function testa(posx, posy) {
  push();
  translate(posx, posy);
  fill(0, 0, 150, 200);
  //testa
  ellipse(0, 0, 150, 100);
  //occhi
  fill(250, 150);
  ellipse(-60, -20, eyeSize*1.1, eyeSize);
  ellipse(-5, -20, eyeSize*1.3, eyeSize*1.2);
  //antenna
  fill(0, 0, 150, 200);
    push();
      translate(-10, -45);
      rotate(-PI/2);
      rect( 0, 0, 30, 10)
      translate(32, 0);
      rect( 0, 0, 20, 10)
    pop();
  pop();
}

function addome(posx, posy) {
  push();
  translate(posx, posy);

  fill(0, 0, 150, 200);
  ellipse(0, 0, 200, 250);
  pop();
}

function art1(posx, posy, angle) {
  push();
  translate(posx, posy);
  fill(0, 0, 150, 200);
  rotate(angle);
  rect(0, 0, largLeg*0.6, lenLeg/2);
  pop();
}

function art2(posx, posy) {
  push();
  translate(posx, posy);

  fill(0, 0, 150, 200);
  rect(0, 0, largLeg, lenLeg);
  pop();
}

function art3(posx, posy) {
  push();
  translate(posx, posy);

  fill(0, 0, 150, 200);
  rect(0, 0, largLeg, lenLeg);
  pop();
}
