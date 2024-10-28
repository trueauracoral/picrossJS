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

function gameDraw() {
    TestImage.draw();
    ctx.beginPath();
    ctx.moveTo(10, 10)
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
        ctx.moveTo(0, i * 6);
        ctx.lineTo(squareSize, i * 6);
    }

    for (let j = 0; j <= 10; j++) {
        ctx.moveTo(j * 6, 0);
        ctx.lineTo(j * 6, squareSize);
    }
    ctx.stroke();
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
