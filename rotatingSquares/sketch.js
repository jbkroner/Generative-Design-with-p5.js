
function setup(){
    createCanvas(400, 400);
    frameRate(30);
    // s = new Square(0, 0, width / 2, height / 2);
    m = new GridSquare();
}



function draw(){
    // pre-render
    background(255);
    // render stage
    // s.render(true);
    m.render();
    // post render stage
}


// This is our utility class representing one square on the grid!
// We can define some basic charteristics that are true to all squares here.
// - size
// - pattern
// - border / no border
class Square {
    constructor(x, y, dx, dy){
        // Our constructor hard codes the side length to be 1/8 of the width of our canvas.
        // This helps to enforce uniformity between squares. 
        this.sideLength = width / 8; 
        this.x = x;
        this.y = x;
        this.dx = dx;
        this.dy = dy;
        this.rotateMultipler = 0;
    }

    // draw the square
    render(border){
        // pre-render 
        stroke(123);
        angleMode(RADIANS);
        rectMode(RADIUS);
        translate(this.dx, this.dy);
        rotate(this.rotateMultipler);
        this.rotateMultipler += 0.01;


        // render stage
        if(border) rect(this.x, this.y, this.sideLength, this.sideLength);
        // rotate(PI / 4);
        fill(0);
        rect(this.x, this.y, this.sideLength, this.sideLength / 1); // background

        fill(255);
        rect(this.x, this.y, this.sideLength, this.sideLength * .9);

        fill(0);
        rect(this.x, this.y, this.sideLength, this.sideLength * .8);
        
        fill(255);
        rect(this.x, this.y, this.sideLength, this.sideLength * .7);

        fill(0);
        rect(this.x, this.y, this.sideLength, this.sideLength * .6);

        fill(255);
        rect(this.x, this.y, this.sideLength, this.sideLength * .5);

        fill(0);
        rect(this.x, this.y, this.sideLength, this.sideLength * .4); // background

        fill(255);
        rect(this.x, this.y, this.sideLength, this.sideLength * .3);

        fill(0);
        rect(this.x, this.y, this.sideLength, this.sideLength * .2);
        
        fill(255);
        rect(this.x, this.y, this.sideLength, this.sideLength * .1);

    }
}

class GridSquare {
    squareArray = new Array();
    constructor(height, width){
        this.populate();
    }

    populate(){
        for(let i = 0; i < (width * height); i++){
            this.squareArray.push(new Square(0,0,i,50));
        }
    }

    render(){
        this.squareArray.forEach(element => element.render(true));
    }

}



