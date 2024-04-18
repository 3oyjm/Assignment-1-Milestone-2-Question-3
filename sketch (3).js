
//Game Score
let score = 0;

//Cloud Object
let cloud = {
    variations: new Array(2),
    y: [],
    x: [],
    vector: -1,
    speed: 5
}

//Airplane Object
let plane = {
    airplane, //Image of the airplane
    speed: 5,
    x: 400,
    y: 300,
    xVector: 0,
    yVector: 0
}

//Bird object
let bird = {
    variations: new Array(2),
    x: [],
    y: [],
    speed: 5,
    xVector: [-1],
    yVector: [0],
    counter: 0,
    flap: false
}

//preload images
function preload(){
// Preload clouds
for (let i = 0; i < cloud.variations.length; i++){
    cloud.variations[i] = loadImage("images/" + i + ".png");
}
// Preload birds
for (let i = 0; i < bird.variations.length; i++){
    bird.variations[i] = loadImage("images/bird" + i + ".png");
}
// Preload airplane
plane.airplane = loadImage("images/airplane.png");
}

function setup(){
    createCanvas(800,400);

    //Settings
    rectMode(CENTER);
    textAlign(CENTER);
    imageMode(CENTER);

    //Initial cloud placement
    for (let i = 0; i < cloud.variations.length; i++){
        cloud.x[i] = random(850,950);
        cloud.y[i] = random(height);
    }

    //Initial bird placement
    for (let i = 0; i < bird.variations.length; i++){
        bird.x[i] = random(850,950);
        bird.y[i] = random(height);
    }
}

function draw(){
    background(1, 140, 255);
    drawClouds();
    birdIsTheWord();
    banner();
    airplane();
    birdCollision();
    canvasCollision();
}

//Functions that draws the airplance and controls it
    function keyPressed (){
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)){
            plane.yVector = 1;
            plane.xVector = 0;
        }
        else if (keyIsDown(UP_ARROW) || keyIsDown(87)){
            plane.yVector = -1;
            plane.xVector = 0;
        }
        else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)){
            plane.xVector = -1;
            plane.yVector = 0;
        }
        else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
            plane.xVector = +1;
            plane.yVector = 0;
     }
}
function airplane(){
    image(plane.airplane, plane.x, plane.y);
    plane.x += plane.xVector * plane.speed;
    plane.y += plane.yVector * plane.speed;
}

//Function that detects if you hit the edge of the canvas, and takes you to endscreen,
//Allows you to restart the game, resetting the score and birds cordinates.
function canvasCollision(){
    if (plane.x > width || plane.x < 0){
        endscreen();
        plane.speed = 0;
        bird.speed = 0;
        if (keyIsDown(32)){
            plane.x = 400; plane.y = 300;
            plane.speed = 5;
            bird.speed = 5;
            score = 0;
            plane.xVector = 0;
            plane.yVector = 0;
            bird.x[i] = random(850,950);
            bird.y[i] = random(height);
        }
    }
    if (plane.y > 400 || plane.y < 0){
        endscreen();
        plane.speed = 0;
        bird.speed = 0;
        if (keyIsDown(32)){
            plane.x = 400; plane.y = 300;
            plane.speed = 5;
            bird.speed = 5;
            score = 0;
            plane.xVector = 0;
            plane.yVector = 0;
            bird.x[i] = random(850,950);
            bird.y[i] = random(height);
        }
    }
}

//Function that draws out the endscreen text
function endscreen(){
    push();
    textSize(45);
    textWidth(3);
    textFont("Courier New")
    text("Game Over! Score: " + score, width / 2, height / 2);
    textSize(20);
    text("Press Space to try again", width / 2, (height / 2) + 40);
    text("Learn Coding in a fun and interractive way", width / 2, (height / 2) + 65);
    text("Join Creative Coding", width / 2, height / 2 + 85);
    //let link = createA("https://courseprofile.secure.griffith.edu.au/student_section_loader.php?section=1&profileId=138840", "Unlock your coding skills");
    //link.position(linkX, (height / 2) + 110);
    pop();
}

//Function that draws the banner
function banner (){
    push();
    let bannerX = plane.x - 250;
    let bannerY = plane.y + random(0,3);

    line(bannerX, bannerY - 20, plane.x - 40, plane.y -5);

    line(bannerX, bannerY + 20, plane.x - 40, plane.y -5);

    rect(bannerX, bannerY, 200, 40, 5);

    textSize(20);
    text("Join Creative Coding", bannerX, bannerY +5);
    pop();   
}

//Function that draws the clouds passing by
function drawClouds() {
    for (let i = 0; i < cloud.variations.length; i++) {
        image(cloud.variations[i], cloud.x[i], cloud.y[i]);
        cloud.x[i] += cloud.vector * cloud.speed;

        // Check if the cloud has moved off the canvas, teleport it back to the other side.
        if (cloud.x[i] <= -50){
            cloud.x[i] +=  random(800, 950);
            cloud.y[i] = random(height);
        }
    }
}
//Function that draws the birds passing by
function birdIsTheWord() {
    bird.counter++
    for (i = 0; i < bird.variations.length; i++){
        if (bird.counter > 10){
            bird.counter = 0;
            bird.flap = !bird.flap;
        }
        if (bird.flap) {
            image(bird.variations[0], bird.x[i], bird.y[i]);
        } else {
            image(bird.variations[1], bird.x[i], bird.y[i]);
        }
        bird.x[i] += bird.xVector * bird.speed;

        // Check if the bird flies off the canvas, teleport them back to the other side. Increment score by how many birds passes by.
        if (bird.x[i] <= -50){
            bird.x[i] += random(800, 950);
            bird.y[i] = random(height);
            score++
        }
    } 
}
//Function that takes you to endscreen if airplane collides with birds
function birdCollision() {
    for (i = 0; i < bird.variations.length; i++){
        let birdDistance = dist(plane.x, plane.y, bird.x[i], bird.y[i]);
        if (birdDistance < 30){
            endscreen();
            plane.speed = 0;
            bird.speed = 0;
            if (keyIsDown(32)){
                plane.x = 400; plane.y = 300;
                plane.speed = 5;
                bird.speed = 5;
                score = 0;
                plane.xVector = 0;
                plane.yVector = 0;
                bird.x[i] = random(850,950);
                bird.y[i] = random(height);
            }
        }
    }
}




/*
References:

Naomi Parker. (2024, April 18). Angry Bird 1 & Angry Bird 2 [Drawing of two birds].


Djvstock. (n.d.). Free vector flying aircraft icon isolated vector [airplane drawing]. freepik.com.
 https://www.freepik.com/free-vector/flying-aircraft-icon-isolated-vector_88800103.htm#query=plane&position=1&from_view=keyword&track=sph&uuid=8881b391-7ccc-4d97-a791-0a110cd1d7a1

*/