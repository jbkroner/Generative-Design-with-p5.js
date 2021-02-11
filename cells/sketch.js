function setup(){
    HEIGHT = 400;
    WIDTH = 400;
    createCanvas(HEIGHT, WIDTH);
    frameRate(30);

    b = new Bug(HEIGHT / 2, WIDTH / 2);

    foodArray = new Array();
    for(let i = 0; i < 20; ++i){
        foodArray.push(new Food());
    }
}

function draw(){
    background(0);
    stroke(255);
    foodArray.forEach(food => {
       food.render();
    });

    b.findFood();
    b.walkToTarget();
}

class Bug{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.targetX = floor(random(400));
        this.targetY = floor(random(400));
        this.consumedFood = 0;

    }

    // look for the closest food and set that as a target.  otherwise return false
    findFood(){
        let closestDist = 1000;
        foodArray.forEach(food => {
            let currentDist = dist(this.x, this.y, food.x, food.y);
            if (currentDist < closestDist & currentDist > 4){
                closestDist = currentDist;
                this.targetX = food.x;
                this.targetY = food.y;
            } else if (currentDist <= 4){
                foodArray.splice(food, 1);
                console.log('this happened');
            }
        }); 
    }



    walkToTarget(){
        if(this.x == this.targetX){
            // find a new target
        } else if(this.x > this.targetX){
            this.x -= floor(random(2));
        } else{
            this.x += floor(random(2));
        }
        
        if(this.y == this.targetY){
            // find a new target?
        } if(this.y > this.targetY){
            this.y -= floor(random(2));
        } else{
            this.y += floor(random(2));
        }
        stroke(255);
        circle(this.x, this.y, 20);
    }

}

class Food{
   constructor()  {
       this.x = floor(random(WIDTH));
       this.y = floor(random(HEIGHT));
   }

   render(){
       stroke(0,255,0);
       circle(this.x, this.y, 10);
   }
}