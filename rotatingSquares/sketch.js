
function setup(){
    HEIGHT = 400;
    WIDTH = 400;
    SIDE_LENGTH = floor(WIDTH / 8);
    C_SIDE_LENGTH = sqrt(pow(SIDE_LENGTH, 2) * 2);
    SIDE_LENGTH_DIV_2 = floor(SIDE_LENGTH/2);
    createCanvas(HEIGHT, WIDTH);
    frameRate(30);
    angleMode(DEGREES);
    // s = new Square(0, 0, width / 2, height / 2);
    m = new GridSquare();
}



function draw(){
    // pre-render
    if(m.squareArray[0].drawStatus == false) {
        fill(0);
        rect(0,0,WIDTH, HEIGHT);
    } else {
        fill(255);
        rect(0,0,WIDTH, HEIGHT);
    }
    // render stage
    m.render();
    // post render stage
}


// This is our utility class representing one square on the grid!
// We can define some basic charteristics that are true to all squares here.
// - size
// - pattern
// - border / no border
class Square {
    constructor(x, y, fill, tick, wait, drawStatus){
        // Our constructor hard codes the side length to be 1/8 of the width of our canvas.
        // This helps to enforce uniformity between squares. 
        this.x = x;
        this.y = y;
        this.middleX = SIDE_LENGTH / 2;
        this.middleY = SIDE_LENGTH / 2;
        // this.cSideLength = sqrt(pow(SIDE_LENGTH, 2) * 2);
        this.rotateMultipler = 45;
        this.tick = tick;
        this.wait = wait;
        this.fill = fill;
        this.drawStatus = drawStatus;
    }

    // draw the square
    render(border){
        // pre-render

        // render
        stroke(0);
        fill(this.fill);
        if(border) {
            push();
            translate(this.x + SIDE_LENGTH / 2, this.y + SIDE_LENGTH / 2);
            rotate(this.rotateMultipler);
            
            // only rotate every 90 frames
            if(!this.wait && this.tick != 90){
                this.rotateMultipler += 1;
            } else if(!this.wait && this.tick == 90){
                this.wait = true; 
                this.drawStatus = false;
                this.tick = 0;
            } else if(this.wait && this.tick == 90){
                this.wait = false;
                this.drawStatus = true;
                this.tick = 0;
            }

            translate(-this.x - SIDE_LENGTH_DIV_2, -this.y - SIDE_LENGTH_DIV_2);
            //if(!this.wait){
            if(this.drawStatus) rect(this.x, this.y, SIDE_LENGTH);
            // } else {
            // }
            ++this.tick;
            pop();
        }
    }
}

class GridSquare {
    constructor(height, width){
        this.squareArray = new Array();
        this.tick = 0;
        this.populate();
    }

    populate(){
        for(let i = 0; i < WIDTH; i = i + C_SIDE_LENGTH){
            for(let j = 0; j < HEIGHT; j = j + C_SIDE_LENGTH){
                this.squareArray.push(new Square(floor(i),floor(j),255,0,false,true));
                console.log(`(${floor(i)}, ${floor(j)})`);
            }
        }
        
        for(let i = -C_SIDE_LENGTH / 2; i < WIDTH; i = i + C_SIDE_LENGTH){
            for(let j = -C_SIDE_LENGTH / 2; j < HEIGHT; j = j + C_SIDE_LENGTH){
                this.squareArray.push(new Square(floor(i),floor(j),0,0,true, false));
                console.log(`generated new square @ (${floor(i)}, ${floor(j)})`);
            }
        }
        this.squareArray.reverse();
    }

    render(){
        this.squareArray.forEach(element => element.render(true));
    }

}



