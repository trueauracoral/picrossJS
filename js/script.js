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

const scalingFactor = 8;
canvas.width = 160 * scalingFactor;
canvas.height = 144 * scalingFactor;
ctx.scale(scalingFactor, scalingFactor);

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

const loadFont = () => {
    const font = new FontFace('PixelFont', 'url(./font/3-by-5-pixel-font.ttf)');
    font.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
        ctx.font = "8px 'PixelFont'";
    });
};

loadFont();

function drawPixelText(text, x, y) {
    ctx.imageSmoothingEnabled = false; 
    ctx.textBaseline = 'top';
    ctx.fillStyle = "#000"; 
    ctx.fillText(text, x, y);
}

horizontalMeasures = [
    [9],
    [1, 2, 1, 1],
    [1, 2, 1, 1],
    [1, 7],
    [4, 2, 1],
    [1, 1, 2, 1],
    [6, 1],
    [10],
    [1, 8],
    [1, 6, 1]
]

var maxLen = horizontalMeasures[1].length;
for (var i = 0; i < horizontalMeasures.length; i++) {
    if (horizontalMeasures[i].length > maxLen) {
        maxLen = horizontalMeasures[i].length;
    }
}
maxLen *= 2;
function gameDraw() {
    TestImage.draw();
    drawGrid(45, 45, 60, 60, 6);

    const charWidth = 3;      // Width of each character in pixels
    const charSpacing = 3;    // Spacing between characters
    const totalWidth = 60;    // Total width available for numbers in the grid

    // Adjust this value to move the text left or right
    const horizontalOffset = -30; // Negative value moves left, positive moves right

    for (let i = 0; i < horizontalMeasures.length; i++) {
        let startY = 43 + 6 * i; // Calculate the Y position for the current row

        // Calculate the total width of the current row's numbers
        let totalTextWidth = 0;
        for (let j = 0; j < horizontalMeasures[i].length; j++) {
            totalTextWidth += charWidth + charSpacing; // Accumulate width for each number
        }
        
        // Calculate starting X position for right-aligned text, with offset
        let startX = totalWidth - totalTextWidth + 10 + horizontalOffset; // Adjust for a margin and offset

        for (let j = 0; j < horizontalMeasures[i].length; j++) {
            const number = horizontalMeasures[i][j]; // Get the current number
            drawPixelText(number.toString(), startX, startY); // Draw the number
            
            // Move the startX position to the right for the next character
            startX += charWidth + charSpacing;
        }
    }
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
