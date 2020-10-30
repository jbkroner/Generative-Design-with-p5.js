// falling letters - james kroner - fall 2020

/** setup()
 * The setup function is called once by p5.js to setup 
 * our enviroment. In setup I create the canvas and an array of letters.
 */
function setup(){
    // creating the canvas and defining some enviroment variables: 
    HEIGHT = 400;
    WIDTH = 400;
    createCanvas(HEIGHT, WIDTH);
    frameRate(30);

    // creating the array of leader letters.  Each of these letters
    // stores an array of followers!
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

/** draw()
 * p5.js calls the draw function every frame!  If we want to 
 * render something with motion we need to do it here.  I like
 * to divide it into three stages:  Pre-render, render, and post-render.  
 */
function draw(){
    // pre-render stage: get rid of whatever we drew last frame!
    // the p5 way of doing this is to set the background color which erases everything.
    background(0);


    // render stage: iterate through the letter array.  
    // Render each letter and then translate each letter.  We 
    // won't see the new translations until they are rendered 
    // next frame.  Typically I include object translation in my
    // post render stage but this keep the draw function at O(N^2)
    // intead of O(2N^2).  In p5 we want to preserve every ounce of 
    // performance we can!
    letterArr.forEach(currentLetter => {
        currentLetter.render();
        currentLetter.translate(0,1);
    })

    // post-trender: draw the frame rate if we comment this part out!
    renderFPS(false);
}

/** this is a helper funciton that renders the FPS */
function renderFPS(b){
    if(b){
        let fps = frameRate();
        stroke(255,0,0);
        fill(255,000,000);
        text("FPS: " + fps.toFixed(2), 30, height - 100);
        stroke(000);
        fill(000);
    }
}


/** manage individual letters! **/
class Letter {

    // the constructor is used whenever we create a new letter
    constructor(x, y, letter, isLeader){
        this.x = x; // set the x coordinate of this letter
        this.y = y; // set the y coordinate of this letter
        this.speed = random() * 3; // speed is a modifer on this letters translate function
        this.letter = letter; // the letter that we will render
        this.tick = floor((random() * 10) - 1); // tick used to track time in frames
        
        this.duration = 3; // duration dications the fractional amount of fill we remove every lap
        this.currentDuration = 0; // the current duration in laps
        this.fill = 255; // fill is color inside the letter (as opposed to the border)

        this.isLeader = isLeader; // tell the letter whether it's a leader or not
        this.followersAmount = 15; // tell the letter how many followers to create
        this.followerList = new Array(); // create the list of followers

        // if this letter is a leader, add a list of new follower letters to the array.  Note that the new letters are NOT leaders!  Otherwise they would create their own list of followers...who would create their own list of followers...boom stack overflow!
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


    /** render() 
     * render draws the colum to the canvas.
    */
    render(){
        // set the stroke the green because matrix :-)
        stroke(0,255,0);

        // the leader always gets this.fill with no modifiers
        if(this.isLeader){
            fill(this.fill);
            text(this.letter, this.x, this.y);
        } 
        
        // loop through the array
        for(let i = 0; i < this.followersAmount; ++i){
            let currentFollower = this.followerList[i];
            if (currentFollower === undefined) continue;
            fill(this.fill - (i * 15)); // fill modifier
            text(currentFollower.letter, this.x, this.y - (i * 12)); // actually render the text
            
            // 90% chance of changing to a new letter
            if(random() * 100 > 95){
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
        this.render(this.fill);
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

        // handle the letter going off the bottom edge, added 180 pixels so that the full column goes off the bottom
        if (this.y > 580){
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
}