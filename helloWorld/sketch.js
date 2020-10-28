function setup(){
    HEIGHT = 400;
    WIDTH = 400;
    createCanvas(HEIGHT, WIDTH);
    frameRate(30);
    m = new LetterGrid(HEIGHT, WIDTH);
    l = new Letter(200, 0, 'a', 0, true);
    //t = new LetterTrail(l);

    letterArr = new Array();
    for(let i = 0; i < 20; ++i){
        letterArr.push(
            new Letter(
                random() * 400 - 1,
                random() * 400 - 1,
                String.fromCharCode(0x30a0 + Math.random() * (0x30ff - 0x30a0+1)),
                true
            )
        )
    }
}

function draw(){
    background(0);
    stroke(0);
    // m.render()
    // t.render();
    // c.translate(0,1);
    letterArr.forEach(currentLetter => {
        currentLetter.render();
        currentLetter.translate(0,1);
    })
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

class LetterTrail {

    constructor(keyLetter){
        this.keyLetter = keyLetter;
        this.x = keyLetter.x;
        this.y = keyLetter.y;
        this.letterArr = new Array().push(keyLetter);
        this.dt = 0;
    }

    render(){
        this.keyLetter.render();
        this.keyLetter.translate()
    }

    // move the key letter.  When the letter has moved an arbitrary construct a new letter whos Y positions is 10 pixels behind the previous letter. Add this letter to the array.
    translate(){
        this.letterArr.translate(0,1);
        ++this.dt;

    }
    
}

/** manage individual letters **/
class Letter {

    constructor(x, y, letter, isLeader){
        this.x = x;
        this.y = y;
        this.speed = random() * 3;
        this.letter = letter;
        this.alpha;
        this.tick = floor((random() * 10) - 1);
        
        this.duration = 3;
        this.currentDuration = 0;
        this.fill = 255;

        this.isLeader = isLeader;
        this.followersAmount = 15;
        this.followerList = new Array();
        if(isLeader){
            for(let i = 1; i <= this.followersAmount; ++i){
                this.followerList.push(
                    new Letter(
                        this.x, 
                        this.y - (i * 10), 
                        String.fromCharCode(0x30a0 + Math.random() * (0x30ff - 0x30a0+1)), 
                        false
                ));
            }
        }
    }

    render(){
        if(this.isLeader){
            fill(this.fill);
            text(this.letter, this.x, this.y);
            
            // can we push a new letter onto the array? 
            // if(this.followerList.length < 10){
            //     this.followerList.push(new Letter(this.x, 0, 'a'));
            // }
        } 
        

        for(let i = 0; i < this.followersAmount; ++i){
            let currentFollower = this.followerList[i];
            if (currentFollower === undefined) continue;
            fill(this.fill - (i * 15));
            text(currentFollower.letter, this.x, this.y - (i * 12));
            
            if(random() * 100 > 90){
                currentFollower.letter = String.fromCharCode(0x30a0 + Math.random() * (0x30ff - 0x30a0+1));
            }
        }

    }

    // switchLetters
    switchLetter(letter){
        // erase the old letter by rendering to the background color
        this.render(0);

        // render the new letter
        this.letter = letter;
        this.render(LetterGrid.gridFill);
    }


    // updates location 
    translate(dx, dy){
        this.x = (this.x + dx);
        this.y = (this.y + dy + this.speed);
        ++this.tick;
        
        // translate followers
        this.followerList.forEach(currentFollower =>{
            currentFollower.x = (this.x + dx);
            currentFollower.y = (this.y + dy + this.speed);
        })

        // handle the letter going off the bottom edge
        if (this.y > 400){
            this.y = 0;
            this.x = (random() * 400) + 1;
            ++this.currentDuration;
            this.fill = this.fill - (this.fill / this.duration);
            if(this.fill < 100) this.fill = 255;
        }

        if (this.tick == 10){
            this.switchLetter(String.fromCharCode(0x30a0 + Math.random() * (0x30ff - 0x30a0+1)));
            this.tick = 0;
        }

    }

    fall(){
        this.x += 1;
        this.y = 0;
    }

}