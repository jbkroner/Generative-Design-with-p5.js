

//global

function setup(){
    // creating the canvas and defining some enviroment variables: 
    HEIGHT = 400;
    WIDTH = 400;
    createCanvas(HEIGHT, WIDTH);
    frameRate(30);

    rads = 0;
    radMod = .01;

    dotArr = new Array();
    for(let i = 0; i < 500; ++i){
        dotArr.push(new dot());
    }
}

function draw(){
    angleMode(RADIANS);
    background(255);
    fill(255);
    stroke(255);
    smooth();
    
    dotArr.forEach(d => {
        stroke(0);
        fill(0);
        d.curX = cos(d.r) * d.m;
        
        // d.curY = sin(d.r) * d.m;
        d.curY = 1;
        d.d = sin(d.r) * d.m / 3;
        // d.d = tan(d.r);
        d.render(d.curX, d.curY, d.d);
        d.r += radMod;
    });
}

class dot{
    constructor(){
        this.x = floor(random(WIDTH - 100) + 50);
        this.y = floor(random(HEIGHT - 100) + 50);
        this.curX = this.x;
        this.curY = this.y;
        this.d = random(2); //diameter
        this.m = random(10);// magnitude
        this.r = random(2); // current rads
    }

    render(dx,dy,dd){
        circle(this.x + dx, this.y + dy, this.d + dd);
    }


}