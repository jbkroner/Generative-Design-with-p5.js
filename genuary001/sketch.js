// genuary 001 draw 10,000 of something

function setup(){
    HEIGHT = 1000;
    WIDTH = 1000;
    createCanvas(HEIGHT, WIDTH);
    frameRate(30);

    let center_x = WIDTH / 2;
    let center_y = HEIGHT / 2;
    let center_radius = Math.random() * 100 + 100;

    let step = 1;
    let r = 0;
    let g = 0;
    let b = 0;

    let r_offset = Math.random() * 255;
    let g_offset = Math.random() * 255;
    let b_offset = Math.random() * 255;

    let r_step = Math.random() * 127 + r_offset;
    let g_step = Math.random() * 127 + g_offset;
    let b_step = Math.random() * 127 + b_offset;

    for (let i = 0; i < WIDTH; i += step) {
        for (let j = 0; j < WIDTH; j += step) {
            
            if (distance(center_x, center_y, i, j) < center_radius) {
                stroke(b, r, g);
                point(i, j)
            } else {
                stroke(r, g, b)
                point(i, j);
            }

            r = (r + r_step) % 255
            g = (g + g_step) % 255
            b = (b + b_step) % 255
        }
    }
}

// very slow and bad
function distance (x, y, x2, y2){
    return (Math.sqrt((x2 - x)^2 + (y2 - y)^2))
}


function draw(){
}


