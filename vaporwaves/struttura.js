
//Vaporwaves
//A e s t h e t i c   song visualizer

//Indici scene
var zero;
var prima = 1;
var inter = 2;
var seconda = 3;
var fine

function preload() {
  //nuvole
  // nuvola1 = loadImage("immagini/nuvola1.jpg");
  // nuvola2 = loadImage("immagini/nuvola2.jpg");
  // nuvola3 = loadImage("immagini/nuvola3.jpg");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();

  u = (windowWidth/windowHeight);
}

function draw() {
  background(50);

  translate(width/2, height/2);


  //Scene
  //selezione scene (frameCount)
  //prima - seconda - terza
    if(frameCount < fine) {
      if (frameCount > zero && frameCount < intro) {
        intro();
      }
      if (frameCount > intro && frameCount < prima) {
        prima();
      }
      if (frameCount > prima && frameCount < inter) {
        inter();
      }
      if (frameCount > inter && frameCount < seconda) {
        seconda();
      }
    } else {
      fine();
//      noLoop();
    //restart_necessario? play in loop
    }
    fill(255);
    text( str(frameCount), -width+20, -height+20);
}



function intro() {
  // Sfondo
  push();
    sfondo();
  pop();

  // Sole
  push();
    sole( );
  pop();
}

function prima() {
  // Griglia
  push();
  griglia( );
  pop();

  // Sfondo
  push();
    sfondo();
  pop();

  // Sole
  push();
    sole( );
  pop();

  // Cose volanti
  push();
    nuvole( );
  pop();
}

function inter() {
  // Griglia
  push();
  griglia( );
  pop();

  // Sfondo
  push();
    sfondo();
  pop();

  // Sole
  push();
    sole( );
  pop();

  // Cose volanti
  push();
    nuvinter( );
  pop();
}

function seconda() {
  // Griglia
  push();
  griglia( );
  pop();

  // Sfondo
  push();
    sfondo();
  pop();

  // Sole
  push();
    sole( );
  pop();

  // Cose volanti
  push();
    nuvole( );
  pop();
}

function fine() {
  intro();

  //a e s t h e t i c
}

function sfondo() {

}

function sole() {

}

function griglia() {


}

function nuvole() {

}

function nuvinter() {

}

//Utilità
//
//Screenshot function
function mousePressed() {
    // save();
}

//Responsive Canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  console.log("size changed");
}
