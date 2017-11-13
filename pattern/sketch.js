//Creative coding '17 at PoliMI
//#3 assignement: pattern
//Matteo Testa

var dista = 35;
var ray;
var c;

function setup() {
  createCanvas(800, 800);
  background(0);

  ray = dista/3;
  noStroke();
  smooth();
  c = 1;
  frameRate(2);
}

var px;
var m = 0;
var restart = 100;
var randy;

function draw() {
   background(0);
  // fill(0,10);
  // rect(0,0,width, height);
//  var c = int(random(2, 10));
  var noisy = 150;
  console.log(m);

  m++;

  if (frameCount%3) {
    c+=1;
  }

  if (m > restart) {
    m = 1;
  }

  if(c > restart) {
    c = 1;
  }

  var i = 1;

  for (var w = 0; w < width+ray*2; w += ray*2) {
    for (var h = ray*2; h < height+ray; h += ray*2) {
      px = w;
      if(i%c) {
        noisy = noise(h*w)*235+35;
        px += ray;
        fill(noisy/8, noisy, noisy/8);
        ellipse(px, h, ray, ray);
      } else {
        noisy = noise(h*w)*235+35;
        px -= ray;
        fill(0, noisy, noisy);
        push();
          translate(px, h);
          rotate(PI/4);
          rect(ray*.8, -ray/2, ray, ray);
        pop();
      }
          i++;
    }
  }

  //frame
  fill(0);
  rect(0,0, ray*2, height);
  rect(0,0, width, ray);
  rect(0, height-ray, width, ray*2);
  rect(width-ray, 0, ray*2, height);

  //noLoop();
}
