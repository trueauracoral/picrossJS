class imageDrawingTool { 
    constructor(pos, velocity) {
        this.pos = pos;
        this.velocity = velocity;
    }
        
    update() {
        //this.pos.y += this.velocity.y;
    };
        
    draw() {
        ctx.drawImage(testImage, 45, 45)
    };
}

var testImage = loadImage("./img/balloons.png");

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

canvas.width = 160;
canvas.height = 144;

const halfWidth = canvas.width / 2;
const halfHeight = canvas.height / 2;

const TestImage = new imageDrawingTool(vec2(halfWidth - 50, halfHeight), vec2(5,5), 15)

function startGame() {
    gameLoop();
}

// https://jakesgordon.com/writing/javascript-game-foundations-sound/
function createAudio(src) {
    var audio = document.createElement('audio');
    audio.volume = 0.5;
    //audio.loop   = options.loop;
    audio.src = src;
    return audio;
}

//var bounce = createAudio('./sound/bounce.wav');

function vec2(x, y) {
    return {x: x, y: y};
}

function gameUpdate() {
    //draw.update();
}

function drawPixel(x, y) {
    ctx.fillRect(x, y, 1, 1);
}

squareSize = 60

function drawGrid(startX, startY, width, height, gridSize) {

    // Draw vertical lines
    var counter = 0;
    for (let x = startX; x <= startX + width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x+0.5, startY+0.5);
        ctx.lineTo(x+0.5, startY + height+0.5);
        ctx.lineWidth = 1
        ctx.stroke();
        counter++;
        console.log(counter);
    }
    counter = 0;
        
    // Draw horizontal lines
    for (let y = startY; y <= startY + height; y += gridSize) {
        ctx.lineWidth = 1
        ctx.beginPath();
        ctx.moveTo(startX+0.5, y+0.5);
        ctx.lineTo(startX + width+0.5, y+0.5);
        ctx.stroke();
    }
}

function gameDraw() {
    TestImage.draw();
    drawGrid(45, 45, 60, 60, 6);
}

function gameLoop() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    window.requestAnimationFrame(gameLoop);
    setTimeout(() => {
        gameUpdate();
        gameDraw()

    }, 1000/25)


}
function loadImage(src) {
    var img = new Image();
    img.src = src;
    img.id = 
    this.onload = function() {
        return true;
    }
    return img;
}


gameLoop();
