
// http://fhtr.org/JSARToolKit/demos/tests/test2.html
var capture;
var w = 0,
h = 0;

var pg, sw
var wpg = 0
var hpg = 0

var swarm

function setup() {
  pixelDensity(1); // this makes the internal p5 canvas smaller
  w = windowWidth
  h = windowHeight
  createCanvas(w, h, WEBGL);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
  pg = createGraphics(w/2,h/2,P2D)

  wsg =  w
  hsg = h
  sw = createGraphics(wsg,hsg, P2D)
  sw.translate(wsg/4,hsg/4, 0)
  sw.noStroke()

  swarm = new Swarm()
  swarm.populate()
  frameRate(10)


  raster = new NyARRgbRaster_Canvas2D(canvas);
/**/param = new FLARParam(canvas.width, canvas.height);
  pmat = mat4.identity();
  param.copyCameraMatrix(pmat, 100, 10000);
  resultMat = new NyARTransMatResult();
/**/detector = new FLARMultiIdMarkerDetector(param, 2);
  detector.setContinueMode(true);
}

var angle = 0

function draw() {
  background(0)

  push()
    translate(0,0,-100)
    pg.image(capture)
    texture(pg)
    plane(w,h)
  pop()

  push()
    translate(0,0,10)
    sw.background(120, 0, 0)
    swarm.show()
  pop()

  push()
    rotateX(PI/1.7)
    var l = 200
    texture(sw)
    plane(l,l)
  pop()

  angle += 0.01

  // noLoop()
}

function Swarm() {
  this.nGerms = 5
  this.germs = []
  var dimType = [1, 5, 4, 2]

  this.populate = function() {
    var ntypeA = this.nGerms*0.45
    for (var i = 0; i < ntypeA; i++) {
      this.germs.push({"x":random(-w/2, w/2), "y":random(-h/2, h/2), "types":"a"})
    }
    var ntypeB = this.nGerms*0.15
    for (var i = 0; i < ntypeB; i++) {
      this.germs.push({"x":random(-w/2, w/2), "y":random(-h/2, h/2), "types":"b"})
    }
    var ntypeC = this.nGerms*0.02
    for (var i = 0; i < ntypeC; i++) {
      this.germs.push({"x":random(-w/2, w/2), "y":random(-h/2, h/2), "types":"c"})
    }
    var ntypeD = this.nGerms*0.38
    for (var i = 0; i < ntypeD; i++) {
      this.germs.push({"x":random(-w/2, w/2), "y":random(-h/2, h/2), "types":"d"})
    }
    // console.log(this.germs.type);
  }

  this.show = function() {
    sw.background(100, 210, 100)

    for(var germ of this.germs) {
      var x = germ.x
      var y = germ.y
      var dim
      var rgb = []
      switch (germ.type) {
        case "a":
          dim = this.dimType[0]
          rgb = [220, 230, 200]
        break;
        /****/
        case "b":
          dim = this.dimType[0]
          rgb = [200, 230, 220]
        break;
        /****/
        case "c":
          dim = this.dimType[0]
          rgb = [200, 220, 230]
        break;
        /****/
        case "d":
          dim = this.dimType[0]
          rgb = [230, 220, 200]
        break;
        default:
      }
    }

    // for (var i = 0; i < this.germs.length; i++) {
    //   var x = this.germs[i].x
    //   var y = this.germs[i].y
    //   var dim
    //   var rgb = []
    //   switch (this.germs.type) {
    //     case "a":
    //       dim = this.dimType[0]
    //       rgb = [220, 230, 200]
    //     break;
    //     /****/
    //     case "b":
    //       dim = this.dimType[0]
    //       rgb = [200, 230, 220]
    //     break;
    //     /****/
    //     case "c":
    //       dim = this.dimType[0]
    //       rgb = [200, 220, 230]
    //     break;
    //     /****/
    //     case "d":
    //       dim = this.dimType[0]
    //       rgb = [230, 220, 200]
    //     break;
    //     default:
    //   }
    // }
    sw.fill(rgb[0],rgb[1],rgb[2])
    sw.ellipse(x,y,dim, dim)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)

  //Update layout variable to adapt the size of the elements
  unit = windowWidth / 100
  space = unit * 3
}
