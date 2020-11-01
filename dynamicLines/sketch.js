//******************************************//
// Welcome to Dynamic Lines by James Kroner!
// Press the play button to view this sketch!
//******************************************//
// https://editor.p5js.org/jbkroner/present/z8vdAe2Wd

// Last update (November, 2019):
//  -- more performance enhancements
//      -- changing to native JS math methods
//          -- p5 random -> Math.random()
//          -- distance comparisions are now based on the square of total distance.  We don't need to process the actual distance.  Calculating the sqrt of something is expensive from a performance standpoint. 
//  -- total points is a function of area  
//  -- added gradient calculator.  no cheating with transparency like the reference. 


function setup() {


  width = 400;
  height = 400;
  maxDistance = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  createCanvas(width, height);
  frameRate(60);

  // create a PointManager
  pm = new PointManager();
  pm.populate();

  // create a gradient - see class for constructor details
  g = new Gradient(13, 255, 102, 255, 15, 223);

}

function draw() {
  //set background and stroke.  
  background(0);
  pm.updatePoints();

//   // Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
//   let fps = frameRate();
//   fill(0);
//   stroke(0);
//   text("FPS: " + fps.toFixed(2), 30, height - 100);
//   text("Total Points: " + pm.totalPoints, 30, height - 120);
}

class PointManager {
  // keep track of how many points we've created
  totalPoints = 0;
  maxPoints = (width * height) / 2000;
  pointsArray = new Array();
  // primary method for creating a point 

  populate() {
    // create maxPoints amount of points.  Distribute these a long the top, left, and bottom sides.

    // populate points 2:1 horizontal travel to vertical travel
    //      - angle of travel will be determined randomly within the that instance of the point class
    //      - points will be given (x,y) coordinates to start.  if they go off the edge they will be reset to the other side of the canvas.

    var pointCounter = 0; // point counter will help keep track of what kind of point to make
    var flipDirection = false;
    for (var i = 0; i < this.maxPoints; i++) {
      if (pointCounter != 2) {
        // create a horizontal point
        //Math.floor((Math.random() * width))

        this.pointsArray.push(new Point(Math.floor((Math.random() * width)), Math.floor((Math.random() * height)), false, false)); // push a new point onto pointsArray
        pointCounter++;
      } else if (pointCounter == 2) {
        // create a vertical point and alternate between vertical direction
        this.pointsArray.push(new Point(Math.floor((Math.random() * width)), Math.floor((Math.random() * height)), true, this.flipDirection)); // push a new point onto pointsArray 
        pointCounter = 0; // reset point counter
        if (this.flipDirection == false) {
          this.flipDirection = true
        } else {
          this.flipDirection = false;
        }
      }
      this.totalPoints++; // increment total points
    }


    // old point generation
    // for (var i = 0; i < this.maxPoints; i++){
    //     this.totalPoints++;
    //     if(i % 2 == 0){
    //         // even index makes a point traveling along the horizontal axis
    //         this.pointsArray.push(new Point(random(0,width), random(0,height),false));
    //     }else{
    //         // create a point traveling from the bottom of the canvas
    //         this.pointsArray.push(new Point(random(0,width),height, true));
    //     }
    // }
  }

  getPointsArray() {
    return this.pointsArray;
  }

  // update the position of all points
  updatePoints() {
    // move the points
    for (var i = 0; i < this.pointsArray.length - 1; i++) {
      this.pointsArray[i].move();
      //this.pointsArray[i].display();
    }

    this.updateLines();
  }

  updateLines() {
    // draw a line to the four closest points.  if a point already has four connections do not draw a point
    let thresh = 5000; //10000; // threshold for drawing lines.  Should be the square of the minimum distance required.
    // for each point in the array...
    for (var i = 0; i < this.pointsArray.length - 1; i++) {
      // test against every other point in the array..
      for (var j = 0; j < this.pointsArray.length - 1; j++) {
        // don't allow a point to draw a line to itself
        if (i != j) {
          // stroke based on distance:  shorter lines == shorts stroke value
          // calculate distance:
          // old distance calcuation:    
          //var d = int(dist(this.pointsArray[i].x,this.pointsArray[i].y,this.pointsArray[j].x,this.pointsArray[j].y));
          // calculating the square of the distance between two points.  
          var d = this.distSquared(this.pointsArray[i].x, this.pointsArray[i].y, this.pointsArray[j].x, this.pointsArray[j].y);

          // only draw lines below a certain length to increase performance
          if (d <= thresh) {
            // only draw lines below below a certain color value
            // map value d in range [0,maxDistance / val] to [0,255] 
            // the map function is very slow so we want to minimize the amount of times
            // we calculate s. 
            var s = map(d, 0, thresh, 255, 0);

            // calculate the proper color and intensity 
            // calculate the gradient at the current Y position:                                        
            g.updateReturnValues(map(this.pointsArray[i].y, 0, height, 0, 1));
            // set the stroke
            stroke(g.returnRed, g.returnGreen, g.returnBlue, s - 70);
            //stroke(s);  // old
            // draw the line
            line(this.pointsArray[i].x, this.pointsArray[i].y, this.pointsArray[j].x, this.pointsArray[j].y);
            // draw the point; 
            //point(this.pointsArray[i].x,this.pointsArray[i].y);    
          }

        } else {
          break;
        }
      }
    }
  }


  // This distance formula method was directly referenced from: 
  // https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance#use-native-js-in-bottlenecks
  distSquared(x1, y1, x2, y2) {
    // returns the square of the distance between two points
    let dx = x2 - x1;
    let dy = y2 - y1;
    return dx * dx + dy * dy;
  }
  // end referenced code

}

class Point {
  // class variables
  x = 0;
  y = 0;
  originX = 0;
  originY = 0;
  connections = 0;
  angle = false;
  reverseVert = false;
  //speed = random(1,3);
  horizontalSpeed = Math.floor((Math.random() * 1.1)) + 1;
  veriticalSpeed = Math.floor((Math.random() * 1.1)) + .5;



  // specifying constructor
  constructor(x, y, angle, reverseVert) {
    this.x = x;
    this.y = y;
    this.originX = this.x;
    this.originY = this.y;
    this.angle = angle;
    this.reverseVert = reverseVert;
  }

  move() {
    // every point shifts one pixel to the right
    this.x += this.horizontalSpeed;

    // if the point goes out of bounds return it to its origin point
    if (this.x >= width) {
      this.x = 0;
      this.y = this.originY;
    }
    if (this.y >= height) {
      this.x = this.originX;
      this.y = 0;
    }

    // if the point is supposed to be travling at an angle update its y value as well.
    if (this.angle == true) {
      if (this.reverseVert == true) {
        this.y = this.y + this.veriticalSpeed;
      } else {
        this.y = this.y - this.veriticalSpeed;
      }
    }
  }

  display() {
    // using small squares for debug use
    //rect(this.x, this.y, 10,10);


    point(this.x, this.y);
  }
}

class Gradient {
  // this class contains some helper methods for calculating an rgb value at any point on a two-color gradient.

  // I converted a linear gradient interpolation algorithm from this stackoverflow post into JS:
  // https://stackoverflow.com/questions/22218140/calculate-the-color-at-a-given-point-on-a-gradient-between-two-colors
  // Original in Objective-C:
  // double resultRed = color1.red + percent * (color2.red - color1.red);
  // double resultGreen = color1.green + percent * (color2.green - color1.green);
  // double resultBlue = color1.blue + percent * (color2.blue - color1.blue);    


  // guppie green (13,255,102)
  // hot magenta (255,15,223)


  // class variables
  c1red = 0;
  c1blue = 0;
  c1green = 0;
  c2red = 0;
  c2blue = 0;
  c2green = 0;
  returnRed = 0;
  returnBlue = 0;
  returnGreen = 0;

  constructor(c1red, c1blue, c1green, c2red, c2green, c2blue) {
    // set our class variables to the proper colors.
    this.c1red = c1red;
    this.c1blue = c2blue;
    this.c1green = c1green;
    this.c2red = c2red;
    this.c2blue = c2blue;
    this.c2green = c2green;

  }

  updateReturnValues(n) {
    // set the return RGB value at any point on a two color RGB gradient
    // input value should be scaled to between 0f and 1f

    this.returnRed = Math.floor(this.c1red + n * (this.c2red - this.c1red));
    this.returnGreen = Math.floor(this.c1green + n * (this.c2green - this.c1green));
    this.returnBlue = Math.floor(this.c1blue + n * (this.c2blue - this.c1blue));
  }
}