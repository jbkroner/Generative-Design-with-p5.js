/** help choose themes for our club */


function setup(){
    // creating the canvas and defining some enviroment variables: 
    HEIGHT = 400;
    WIDTH = 400;
    createCanvas(HEIGHT, WIDTH);
    frameRate(30);
    backgroundColor = color('#dec0de');
    counter = 0;
    creativeThemes = ["colorful", "animated", "deep", "full", "light","rewind", "static", "broadcast", "synthesia", "algorithm"];
    technicalThemes = ["arc", "ellipse", "line", "point", "curve"];
}

function draw(){
    if(counter < 300){
        ++counter;
        background(backgroundColor);
        for(let i = 0; i < 500; ++i){
            stroke(255);
            circle(random() * WIDTH, random() * HEIGHT, random() * 15);
            point(random() * WIDTH, random() * HEIGHT);
        }
        stroke(0);
        smooth();
        text('decode@uwm theme generator', 40, 50);
        text('technical theme:', 40,150);
        text(technicalThemes[floor((random() * 5))], 200, 150);
        text('creative theme:', 40,250);
        text(creativeThemes[floor((random() * 5))], 200, 250);
    }
}