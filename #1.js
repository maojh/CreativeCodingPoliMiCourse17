
//Variabili
//testa
var eyeSize = 35;

//addome

//arti
var largLeg = 50;
var lenLeg = 170;

var wheel = largLeg;

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
  art1(190, 250, PI/3);
  //2D - 2S
  art2(230,280);
  //3D - 3S
  art3(350,280);
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

    beginShape();
      stroke('black');
      strokeWeight(3);
      curve(50, 50, 0, 0, 80, 20, 150, 80);
    endShape();
    noStroke();
    fill(0, 0, 150, 200);
  //  rect(-100, -125, 200, 250);
  pop();
}

function art1(posx, posy, angle) {
  var lenBra = lenLeg/2;
  var largBra = largLeg*0.6;
  var polso = 25;
  var apert = PI/4;
  push();
    translate(posx, posy);
    fill(0, 0, 150, 200);
    push();
      rotate(angle);
      rect(0, 0, largBra, lenBra);
      //chele
      //translate(-lenBra+25, largBra*1.8);
      translate(lenBra*0.2, largBra*2.8);

      fill('grey');
      //sup
      push();
        rotate(-apert);
        rect(-33,-10,27,10);
      pop();
      //inf
      push();
        rotate(apert);
        rect(5,-5,27,10);
      pop();
      fill('white');
      ellipse(0, 0, polso, polso);
    pop();


  pop();
}

function art2(posx, posy) {
  push();
    translate(posx, posy);

    fill(0, 0, 150, 200);
    //arto
    rect(0, 0, largLeg, lenLeg);
    //rotella
    fill('grey');
    ellipse(20, 150, wheel, wheel);
  pop();
}

function art3(posx, posy) {
  push();
    translate(posx, posy);

    fill(0, 0, 150, 200);
    rect(0, 0, largLeg, lenLeg);
    //piedi
    fill('grey');
    rect(-15, 140, 65, 30);
  pop();
}
