function setup(){
    HEIGHT = 400;
    WIDTH = 400;
    createCanvas(HEIGHT, WIDTH);
    frameRate(30);

    m = new LetterGrid(HEIGHT, WIDTH);
    m2 = new LetterGrid(HEIGHT, WIDTH);
    
}

function draw(){
    background(0);
    stroke(0);
    m.render()
    // c.translate(0,1);
}

/** manage a grid of letters */
class LetterGrid {
    static gridStroke = '00ff2b';
    static gridFill = 255;
    static gridBackground = 0;
    gridArr = new Array();
    // generate a grid of letters

    constructor(width, height){
        for(let i = 0; i < 100; ++i ){
            this.gridArr.push(new Letter(random(HEIGHT), random(WIDTH), 'a', 0));
        }
    }

    // draw the grid and update each letters position 
    render(){
        this.gridArr.forEach(current => {
            current.render(LetterGrid.gridFill);
            current.translate(0,1);
        });
    }

    // handle mouse over effects
}

/** manage individual letters **/
class Letter {

    constructor(x, y, letter, alpha){
        this.x = x;
        this.y = y;
        this.letter = letter;
        this.alpha;
    }

    render(fillVal){
        fill(fillVal);
        text(this.letter, this.x, this.y);
    }

    // switch letters
    switch(letter){
        // erase the old letter by rendering to the background color
        this.render(0);

        // render the new letter
        this.letter = letter;
        this.render(LetterGrid.gridFill);
    }


    // updates location 
    translate(dx, dy){
        this.x = (this.x + dx) % 400;
        this.y = (this.y + dy + random(1)) % 400;
    }

    fall(){
        this.x += 1;
        this.y = 0;
    }

}