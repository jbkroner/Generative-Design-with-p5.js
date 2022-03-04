// genuary - Destroy A Square

function setup(){
    HEIGHT = 1000;
    WIDTH = 1000;
    createCanvas(HEIGHT, WIDTH);
    frameRate(30);
    background(170, 153, 255);
    rectMode(RADIUS);
    noStroke();
    

    // static draw
    rect_radius = 250; rect(WIDTH / 2, HEIGHT / 2, rect_radius);

    let number_of_circles_to_draw = 6000;
    let drawn_circles = 0;
    let circle_radius_range = rect_radius / 15;
    let circle_fill_r = 170;
    let circle_fill_g = 153;
    let circle_fill_b = 255;

    let x = 24;
    console.log("print out the number x = ${x}");
    console.log(`print out the number x = ${x}`);
    console.log("print out the value x = " + x);

    while (drawn_circles < number_of_circles_to_draw){
        x = (Math.random() * rect_radius * 2) + (WIDTH / 2) - rect_radius;
        y = (Math.random() * rect_radius * 2) + (HEIGHT / 2) - rect_radius;
        radius = (Math.random() * circle_radius_range) + 1;
        
        let r_factor = 0;
        let g_factor = 0;
        let b_factor = 0;
        r_offset = (Math.random() * r_factor);
        g_offset = (Math.random() * g_factor);
        b_offset = (Math.random() * b_factor);

        console.log(`circle number ${drawn_circles} -> (${x}, ${y})`)

        fill(
            circle_fill_r + r_factor,
            circle_fill_g + g_factor,
            circle_fill_b + b_factor
        );

        circle(x, y, radius)

        ++drawn_circles;
    }
}

function draw(){
    return;
}


