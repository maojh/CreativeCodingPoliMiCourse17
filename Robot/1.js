
//Variabili
//testa
var eyeSize = 35;

//addome

//arti
var largLeg = 50;
var lenLeg = 170*0.7;

var wheel = largLeg;
var coord;
var a = 1;

function setup() {
  createCanvas(800, 600);
  noStroke();
  coord = document.getElementById('coord');
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
  //1D - 1
  art1(190, 260, (PI/6)*sin(a));
  //2D - 2S
  art2(230,280);
  //3D - 3S
  art3(350,280);

  coord.innerHTML = "";
  coord.innerHTML = mouseX + "-" + int(mouseY);
}

function testa(posx, posy) {
  push();
      translate(posx, posy);
      //testa
      fill(0, 0, 150);
      ellipse(0, 20, 150, 100);
      //antenna
      fill(0, 0, 150);
      push();
        translate(-10, -30);
        rotate(-PI/2);
        quad( 35, 8, 35, 2, 0, 0, 0, 10);
        translate(32, 0);
        ellipse( 7, 5, 12, 10);
      pop();
      //occhi
      fill(250);
      stroke('darkGrey');
      strokeWeight(4);
      ellipse(-60, -10, eyeSize*1.1, eyeSize);
      ellipse(-5, -10, eyeSize*1.3, eyeSize*1.2);
      noStroke();
    pop();
}

function addome(posx, posy) {
  push();
    translate(posx, posy);

    noStroke();
    fill(0, 0, 150);

    beginShape();
      bezier(  -30,   -120,
              -100,   -120,
              -130,    120,
               -50,    130);
      bezier(  30,   -120,
              100,   -120,
              130,    120,
               50,    130);
      quad(-50, 130, -30, -120, 30,-120, 50, 130);
    endShape(CLOSE);
  pop();
}

function art1(posx, posy, angle) {
  var lenBra = lenLeg/2;
  var largBra = largLeg*0.6;
  var polso = 25;
  var apert = PI/4;
  stroke('darkGrey');
  strokeWeight(3);
  push();
    translate(posx, posy);
    fill(0, 0, 150);
    push();
      rotate(angle);
      ellipse(20, 40, largBra, lenBra*1.3);
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
      //polso
      fill('darkGrey');
      ellipse(0, 0, polso, polso);
    pop();
  pop();
}

function art2(posx, posy) {
  push();
    translate(posx, posy);

    fill(0, 0, 150);
    //articolazione
    fill('grey');
    stroke('darkGrey');
    ellipse(largLeg/2,largLeg*0.4,largLeg, largLeg);
    //rotella
    noStroke();
    fill('darkGrey');
    ellipse(6, 150, wheel, wheel);
    fill('black');
    ellipse(6, 150, wheel/2, wheel/2);
    //arto
    push();
      //translate();
      rotate(PI/24);
      stroke('grey');
      strokeWeight(3);
      fill(0, 0, 150);
      rect(0, 20, largLeg, lenLeg);
    pop();
  pop();
}

function art3(posx, posy) {
  push();
    translate(posx, posy);

    fill('grey');
    ellipse(largLeg/2,largLeg*0.4,largLeg, largLeg);
    //piedi
    noStroke();
    push();
    translate(0, lenLeg);
    fill('black');
      bezier( -30, 50,
             -30, 20,
             50, -20,
             60, 50);
    pop();
    //arto
    stroke('grey');
    strokeWeight(3);
    fill(0, 0, 150);
    rect(0, 20, largLeg, lenLeg);
  pop();
}
