
/*TODO:
 xanchored animation
 xcustom marker
 *mocking marker scale or apply the right matrix
*/

// http://fhtr.org/JSARToolKit/demos/tests/test2.html
var capture;
var w = 640,
    h = 480;
var raster, param, pmat, resultMat, detector;

var swarm
var nGerms = 200

var pg
var wpg = 800
var hpg = 800


function setup() {
    pixelDensity(1); // this makes the internal p5 canvas smaller
    capture = createCapture(VIDEO);
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();

    raster = new NyARRgbRaster_Canvas2D(canvas);
/**/param = new FLARParam(canvas.width, canvas.height);
    pmat = mat4.identity();
    param.copyCameraMatrix(pmat, 100, 10000);
    resultMat = new NyARTransMatResult();
/**/detector = new FLARMultiIdMarkerDetector(param, 2);
    detector.setContinueMode(true);

    pg = createGraphics(wpg,hpg)
    swarm = new Swarm()
    swarm.generate()
    pg.noStroke()

    frameRate(10)
}

function draw() {
    pg.push()
    pg.fill(0, 30)
    pg.rect(0,0,width,height)
    pg.tint(255,200)
    pg.image(capture, 0, 0, w, h);
    pg.pop()

    canvas.changed = true;
    var thresholdAmount = 128; //select('#thresholdAmount').value() * 255 / 100;
/**/detected = detector.detectMarkerLite(raster, thresholdAmount);
    //select('#markersDetected').elt.innerText = detected;
    for (var i = 0; i < detected; i++) {
      console.log("detected ", i);
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

        push();
          noStroke();
          fill(0,random(150,250),0,150);
          var dim = abs(verts[0][0]-verts[1][0])*abs(verts[1][1]-verts[2][1])/10;
          constrain(dim, 2, 15);
          // console.log(dim);
          ellipse(verts[0][0]+random(-2,2), verts[0][1]+random(-2,2), dim , dim);

          // verts.forEach(function (v) {
          //   ellipse(v[0]+random(-2,2), v[1]+random(-2,2), dim , dim);
          // });


          var oX  = verts[0][0]
          var oY = verts[0][1]
          ellipse(oX,oY, 30, 30)
          swarm.show(oX, oY)

        pop();

    }
    push()
    // translate(frameCount/10,0,0)
    translate(oX, oY)
    //rotate(frameCount/60)
    scale(1)
    tint(255,55)
    image(pg, -oX, -oY)
    pop()
}

function Swarm() {
  this.germs

  this.generate = function() {
    var _germs = new Array()

    for(var i=0; i<nGerms; i++) {
      var x = random(width*.1, width*.9)
      var y = random(height*.1, width*.9)
      var type = int(random(1,4))
      var speed = random(0,20*type)
      var germ = new Germ(x, y, speed, type)
      _germs.push(germ)
      this.germs = _germs
    }
  }

  this.show = function(ox,oy) {
    for(var germ of this.germs) {
      germ.show(ox,oy)
    }
  }
}

function Germ(_x, _y, _speed, _type, start) {
  this.x = _x
  this.y = _y
  this.speed =  _speed
  this.type = _type
  this.start = 0
  this.rocking = {x:0,y:0,r:random(0, PI)}
  this.opacity = 180

  this.move = function() {
    // this.x = (this.x+noise(this.x)*int(random(-1,1)))
    // this.y = (this.y+noise(this.y)*int(random(-1,1)))

    // if(this.x>width*0.9 || this.x<width*0.1 )     this.x = (this.x+noise(this.x)*int(random(-1,1)))
    // if(this.y>height*0.9 || this.y<height*0.1)    this.y = (this.y+noise(this.y)*int(random(-1,1)))

    this.x += random(-1,1)*this.speed
    this.y += random(-1,1)*this.speed*0.75

    //rockin&rolling
    if(this.type==1) {
      this.rocking.x = sin(frameCount*random(0,100))*4
      this.rocking.y = sin(frameCount*random(0,100))*4
    } else {
      this.rocking.r += random(0,0.2)
    }
  }

  this.show = function(ox,oy) {

    if((this.start + frameCount)%5==0) {
      this.move()
    }


    var dim = 4

    if (this.type==1) {
      pg.push()
      pg.translate(ox,oy,0)
      pg.translate(this.x,this.y)
      pg.translate(this.rocking.x, this.rocking.y)
      pg.fill(200,240,0,this.opacity)
      dim *= 4
      pg.ellipse(0,0, dim, dim)
      pg.pop()
    } else {
      pg.push()
      pg.translate(this.x,this.y)
      pg.rotate(this.rocking.r)
      pg.fill(0,100,200,this.opacity)
      dim *= 2
      pg.ellipse(0,0, dim*4, dim)
      pg.pop()
    }
  }
}
