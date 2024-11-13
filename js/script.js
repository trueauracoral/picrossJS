class imageDrawingTool { 
    constructor(pos, velocity, imageIMG) {
        this.pos = pos;
        this.velocity = velocity;
        this.imageIMG = imageIMG;
    }
        
    update() {
        //this.pos.y += this.velocity.y;
    };
        
    draw() {
        ctx.drawImage(this.imageIMG, startX, startY)
    };
}

var ImageString = "balloons"
var imageIMG_white = loadImage(`./img/${ImageString}-white.png`);
var imageIMG = loadImage(`./img/${ImageString}.png`)
var xmark = loadImage("./img/xmark.png")

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const scalingFactor = 8;
canvas.width = 160 * scalingFactor;
canvas.height = 144 * scalingFactor;
ctx.scale(scalingFactor, scalingFactor);

const halfWidth = canvas.width / 2;
const halfHeight = canvas.height / 2;

var die = false;
var gotItWrong = false;

var startX = 50;
var startY = 50;

const TestImage = new imageDrawingTool(vec2(halfWidth - 50, halfHeight), vec2(5,5), imageIMG_white)

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

var minute = 20;
var sec = 60;
var counter = 0;
minute--;
function gameUpdate() {
    counter++;
    minute = minute.toString().padStart(2, '0');
    sec = sec.toString().padStart(2, '0');
    drawPixelText(`${minute}: ${sec}`, startX-20, startY-28);
    if (counter % 60 == 0) {
        if (minute <= 0) {
            die = true;
            minute = 0;
            sec = 0;
            counter = 0;
            return;
        } else {
            sec--;
            if (sec == 0) {
                minute--;
                sec = 60;
            }
        }
    }
    //draw.update();

}

function drawPixel(x, y) {
    ctx.fillRect(x, y, 1, 1);
}

squareSize = 60

function drawGrid(startX, startY, width, height, gridSize) {
    // Draw horizontal lines
    counter = 0
    for (let y = startY; y <= startY + height; y += gridSize) {
        ctx.lineWidth = 1
        ctx.beginPath();
        ctx.moveTo(startX+ 1, y);
        ctx.lineTo(startX + width, y);
        counter++;
        if (counter == 1 || counter == 6 || counter == 11) {
            ctx.strokeStyle = "#000"
        } else {
            ctx.strokeStyle = "#c9e9f2"
        }
        ctx.stroke();
    }
    counter = 0;
    
    // Draw vertical lines
    var counter = 0;
    for (let x = startX; x <= startX + width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x+0.5, startY+0.5);
        ctx.lineTo(x+0.5, startY + height-0.5);
        counter++;
        if (counter == 1 || counter == 6|| counter == 11) {
            ctx.strokeStyle = "#000";
        }
        else {
            ctx.strokeStyle = "#c9e9f2"
        }
        ctx.lineWidth = 1
        ctx.stroke();
    }
    counter = 0;
    
    counter = 0
    for (let y = startY; y <= startY + height; y += gridSize) {
        ctx.lineWidth = 1
        ctx.beginPath();
        ctx.moveTo(startX+ 1, y);
        ctx.lineTo(startX + width, y);
        counter++;
        if (counter == 6) {
            ctx.strokeStyle = "#000"
            ctx.stroke();
        }
    }
    counter = 0;
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
    
    charLength = text.toString().length;
    if (charLength == 2) {
        x -= 4
    }

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

verticalMeasurers = [
    [9],
    [1, 1, 2],
    [1, 6],
    [5, 4],
    [4, 4],
    [1, 7],
    [1, 3, 3],
    [4, 3],
    [1, 2, 3],
    [4, 1, 3],
]
for (var i = 0; i < verticalMeasurers.length; i++) {
    verticalMeasurers[i] = verticalMeasurers[i].reverse();
}

for (var i = 0; i < horizontalMeasures.length; i++) {
    horizontalMeasures[i] = horizontalMeasures[i].reverse();
}

cellGrid = [
    [false, true, true, true, true, true, true, true, true, true],
    [true, false, false, true, true, false, false, true, false, true],
    [true, false, false, true, true, false, false, true, false, true],
    [true, false, false, true, true, true, true, true, true, true],
    [true, true, true, true, false, true, true, false, true, false], 
    [true, false, true, false, false, true, true, false, false, true],
    [true, true, true, true, true, true, false, false, true, false],
    [true, true, true, true, true, true, true, true, true, true],
    [true, false, true, true, true, true, true, true, true, true],
    [true, false, true, true, true, true, true, true, false, true]
]

var correctCounter = 0;
for (var row = 0; row < cellGrid.length; row++) {
    for (var col = 0; col < cellGrid[row].length; col++) {
        var value = cellGrid[row][col];
        if (value == true) {
            correctCounter++;
        }
    }
}

newCellGrid = []
for (var row = 0; row < cellGrid.length; row++) {
    newcelllist = [];
    for (var col = 0; col < cellGrid[row].length; col++) {
        newcelllist.push(false);
    }
    newCellGrid.push(newcelllist);
}

var maxLen = horizontalMeasures[1].length;
for (var i = 0; i < horizontalMeasures.length; i++) {
    if (horizontalMeasures[i].length > maxLen) {
        maxLen = horizontalMeasures[i].length;
    }
}
maxLen *= 2;
var puzzleComplete = 0;
var gotitwrongcounter = 0;
function gameDraw() {
    //TestImage.draw();
    for (var row = 0; row < newCellGrid.length; row++) {
        for (var col = 0; col < newCellGrid[row].length; col++) {
            var isFilledCell = newCellGrid[col][row];
            if (isFilledCell == true) {
                ctx.drawImage(imageIMG_white, 
                    row * 6, col *6, 
                    6, 6,
                    startX + row * 6, startY +col *6,
                    6, 6
                );
            } else if (isFilledCell == 'x') {
                //HI
                ctx.drawImage(xmark, startX + row * 6 + 1, startY + col*6+0.5);
            }
        }
    }
    
    for (let row = 0; row < horizontalMeasures.length; row++) {
        for (let col = horizontalMeasures[row].length -1; col >= 0; col--) {
            const number = horizontalMeasures[row][col];
            const charLength = number.toString().length;
            const offset = charLength === 2 ? -4 : 0;

            xPos = startX-5 - (6 * col);
            yPos = startY-3 + 6 * row

            if (col != 0) {
            xPos += offset;
            }
            drawPixelText(number.toString(), xPos, yPos);
        }
    }

    for (let row = 0; row < verticalMeasurers.length; row++) {
        for (let col = 0; col < verticalMeasurers[row].length; col++) {
            const number = verticalMeasurers[row][col];
            drawPixelText(number, startX+6 * row, startY-10 - (6*col))
        }
    }
    var completeLength = puzzleComplete.toString().length -1
    drawPixelText(puzzleComplete+"%", startX - 10 - completeLength*8, startY-15);
    if (puzzleComplete == 100) {
        ctx.drawImage(imageIMG, startX, startY - 0.5);
    } else {
        drawGrid(startX, startY, 60, 60, 6);
    }

    var maxTimeCounter = 30;
    var textCoordinates = {x:'0', y:'0'}
    if (gotItWrong && gotitwrongcounter < maxTimeCounter) {
        drawPixelText("-2", textCoordinates.x, textCoordinates.y);
        gotitwrongcounter++;
    }
    if (gotitwrongcounter == maxTimeCounter) {
        gotItWrong = false;
        gotitwrongcounter = 0;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    window.requestAnimationFrame(gameLoop);
    gameUpdate();
    gameDraw()
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

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = (event.clientX - rect.left) / 8 ;
    let y = (event.clientY - rect.top) / 8;
    return {x: x, y: y};
}
document.addEventListener('pointerdown', (event) => {
    var mouseCoords = getMousePosition(canvas, event);

    mouseCoords.x -= startX - 1;
    mouseCoords.y -= startY -1;
    
    mouseCoords.x /= 6;
    mouseCoords.y /= 6;
    
    mouseCoords.x = Math.ceil(mouseCoords.x);
    mouseCoords.y = Math.ceil(mouseCoords.y);
    mouseCoords.x -= 1;
    mouseCoords.y -= 1;
    console.log(mouseCoords.x, mouseCoords.y);
    if (mouseCoords.x <= 9 && mouseCoords.x >= 0) {
        if (event.button == 0) {    
            if (cellGrid[mouseCoords.y][mouseCoords.x] == true) {
                newCellGrid[mouseCoords.y][mouseCoords.x] = true;
            } else if (cellGrid[mouseCoords.y][mouseCoords.x] == false && newCellGrid[mouseCoords.y][mouseCoords.x] == "x") {
                console.log("you allready clicked here")
                
            } else {
                gotItWrong = true;
    
                newCellGrid[mouseCoords.y][mouseCoords.x] = "x";
                if (die != true) {
                    minute -= 2;
                }
            }
        } else if (event.button == 2) {
            newCellGrid[mouseCoords.y][mouseCoords.x] = "x";
        } 
        
        var filledCounter = 0;
        for (var row = 0; row < newCellGrid.length; row++) {
            for (var col = 0; col < newCellGrid[row].length; col++) {
                var value = newCellGrid[col][row];
                if (value == true) {
                    filledCounter++;
                }
            }
        }
        puzzleComplete = Math.ceil(((filledCounter/correctCounter) * 100).toFixed(2));
    }

});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

gameLoop();
