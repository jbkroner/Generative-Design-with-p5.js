function setup(){
    createCanvas(400, 400);
    frameRate(30);
}

function draw(){
    background(127);
}


class char {
    constructor(key){
        this.key = key;
    }

    render(c, x, y){
        text(c, x, y);
    }

}