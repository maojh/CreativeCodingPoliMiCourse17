/*TODO
- fix translate oX,oy
- tweak scale
*/

// http://fhtr.org/JSARToolKit/demos/tests/test2.html
var capture;
var w = 0,
h = 0;
var raster, param, pmat, resultMat, detector;

var pg, sw, swimage
var wpg = 0
var hpg = 0

var oX,oY
var swarm
var tool = "soap"

function setup() {
  pixelDensity(1); // this makes the internal p5 canvas smaller
  w = windowWidth
  h = windowHeight
  createCanvas(w, h);

  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();

  raster = new NyARRgbRaster_Canvas2D(canvas);
  param = new FLARParam(canvas.width, canvas.height);
  pmat = mat4.identity();
  param.copyCameraMatrix(pmat, 100, 10000);
  resultMat = new NyARTransMatResult();
  detector = new FLARMultiIdMarkerDetector(param, 2);
  detector.setContinueMode(true);


  sw = createGraphics(w, h, P2D)
  // sw.translate(wsg/4,hsg/4, 0)
  sw.noStroke()

  swarm = new Swarm()
  swarm.populate()
  frameRate(10)

}

function draw() {
  image(capture)

  myDetector()

  /**webgl snippet at the bottom**/

  push()
  swarm.show(0,0, 0.5, 1, true)
  // image(sw)
  pop()

  // noLoop()
}

function Swarm() {
  this.nGerms = 1000
  this.germs = []
  this.dimType = [10, 15, 24, 20]
  this.respTime = 100
  this.boundW = w*0.45
  this.boundH = h*0.45

  this.populate = function() {
    //Actino
    var ntypeA = this.nGerms*0.45
    for (var i = 0; i < ntypeA; i++) {
      this.germs.push({"x":random(-this.boundW, this.boundW), "y":random(-this.boundH, this.boundH), "types":"a", "speed":5, "dead":false, "respawn":this.respTime})
    }
    //Firmic
    var ntypeB = this.nGerms*0.15
    for (var i = 0; i < ntypeB; i++) {
      this.germs.push({"x":random(-this.boundW, this.boundW), "y":random(-this.boundH, this.boundH), "types":"b", "speed":5, "dead":false, "respawn":this.respTime})
    }
    //Bacter
    var ntypeC = this.nGerms*0.02
    for (var i = 0; i < ntypeC; i++) {
      this.germs.push({"x":random(-this.boundW, this.boundW), "y":random(-this.boundH, this.boundH), "types":"c", "speed":5, "dead":false, "respawn":this.respTime})
    }
    //Proteo
    var ntypeD = this.nGerms*0.38
    for (var i = 0; i < ntypeD; i++) {
      this.germs.push({"x":random(-this.boundW, this.boundW), "y":random(-this.boundH, this.boundH), "types":"d", "speed":5, "dead":false, "respawn":this.respTime})
    }
  }

  this.germsMove = function(germ, k) {
    //Moving germs by adding their speed
    //K is for shifting them while cleaning with soap
    germ.x += random(-germ.speed, germ.speed)*k
    constrain(germ.x, -w/2, w/2)
    germ.y += random(-germ.speed, germ.speed)*k
    constrain(germ.y, -h/2, h/2)
  }

  this.germKilled = function(germ,dim) {
    var target //type of germs that could be killed
    var prob //probability to kill the germ touched
    switch (tool) {
      case "alcohol":
        target = "all"
        prob = 1
      break;
      case "soap":
        target = "none"
        prob = 1
      break;
      case "ammo":
        target = "d"
        prob = 1
      break;
      case "soda":
        target = "all"
        prob = .5
      break;
      default:
      target = "none"
      prob = 0
    }
    if(germ.respawn==0){
      germ.dead = false
      germ.respawn = this.respTime
    }
    var killing = dist(mouseX, mouseY, oX+germ.x, oY+germ.y)
    if (killing<dim) {
      if (tool=="soap") {
        this.germsMove(germ, 150)
      }
      if(germ.type == target || target == "all") {
        if (random(0,1)>prob) {
          germ.dead = true
        }
      }
    }
    // germ.dead = true
  }

  this.show = function(oX, oy, tilt, siz, move) {
    sw.image(capture)
    for(var germ of this.germs) {

      if(move&&(!germ.dead)){
        this.germsMove(germ, 1)
      }

      var dim = 5
      var col = ''
      switch (germ.types) {
        case "a":
        dim = this.dimType[0]
        col = 'black'
        break;
        /****/
        case "b":
        dim = this.dimType[1]
        col = 'blue'
        break;
        /****/
        case "c":
        dim = this.dimType[2]
        col = 'green'
        break;
        /****/
        case "d":
        dim = this.dimType[3]
        col = 'yellowGreen'
        break;
        default:
      }
      this.germKilled(germ, dim)
      // sw.scale(1, 1)
      dim *= siz
      if (!germ.dead) {
        push()
          sw.fill(col)
          sw.ellipse(oX + germ.x, oy+germ.y,dim, dim*tilt)
        pop()
      } else {
        push()
          sw.fill(150, 150)
          sw.ellipse(oX + germ.x, oy+germ.y,dim, dim*tilt)
        pop()
        germ.respawn--
      }


    }
    move = false
  }
}


function myDetector() {
  canvas.changed = true;
  var thresholdAmount = 128; //select('#thresholdAmount').value() * 255 / 100;
  detected = detector.detectMarkerLite(raster, thresholdAmount);
  for (var i = 0; i < detected; i++) {
    // console.log("detected ", i);

    // read data from the marker
    // var id = detector.getIdMarkerData(i);

    // get the transformation for this marker
    detector.getTransformMatrix(i, resultMat);
    // detector.getTransformMatrix(0, resultMat);

    // convert the transformation to account for our camera
    var mat = resultMat;
    var cm = mat4.create();
    cm[0] = mat.m00, cm[1] = -mat.m10, cm[2] = mat.m20, cm[3] = 0;
    cm[4] = mat.m01, cm[5] = -mat.m11, cm[6] = mat.m21, cm[7] = 0;
    cm[8] = -mat.m02, cm[9] = mat.m12, cm[10] = -mat.m22, cm[11] = 0;
    cm[12] = mat.m03, cm[13] = -mat.m13, cm[14] = mat.m23, cm[15] = 1;
    mat4.multiply(pmat, cm, cm);

    // define a set of 3d vertices
    var q = 1;
    var verts = [
      vec4.create(-q, -q, 0, 1),
      vec4.create(q, -q, 0, 1),
      vec4.create(q, q, 0, 1),
      vec4.create(-q, q, 0, 1),
      //vec4.create(0, 0, -2*q, 1) // poke up
    ];

    // convert that set of vertices from object space to screen space
    var w2 = width / 2,
    h2 = height / 2;
    verts.forEach(function (v) {
      mat4.multiplyVec4(cm, v);
      v[0] = v[0] * w2 / v[3] + w2;
      v[1] = -v[1] * h2 / v[3] + h2;
    });

    noStroke();
    fill(0, millis() % 255);
    beginShape();
    verts.forEach(function (v) {
      vertex(v[0], v[1]);
    });
    endShape();


    oX  = verts[0][0]
    oY = verts[0][1]
    // console.log(verts[0][0]-verts[1][0]);
    var siz = map(abs(verts[0][0]-verts[1][0]), 20, 100, 0.1, 2)
    var tilt = map(abs(verts[1][1]-verts[2][1]), 20, 100, 0.3,1)
    swarm.show(oX, oY, tilt, siz, true)
    swimage = image(sw)

    push()
    // fill('orange')
    // rect(oX,oY, siz,siz)
    pop()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)

  //Update layout variable to adapt the size of the elements
  unit = windowWidth / 100
  w = windowWidth
  h = windowHeight
  space = unit * 3
}

//to paste in draw
// push()
//   translate(0,0,-100)
//   pg.image(capture)
//   texture(pg)
//   plane(w,h)
// pop()

// push()
// rotateX(PI/1.2)  //1.7
// swarm.show()
// var l = 200
// texture(sw)
// plane(l,l)
// pop()
