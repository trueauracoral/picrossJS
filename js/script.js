var ImageString = "balloons";
var imageIMG_white;
var imageIMG;
var xmark = loadImage("./img/xmark.png")
var lostScreen = loadImage("./img/LostScreen.png");

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const scalingFactor = 8;
canvas.width = 120 * scalingFactor;
canvas.height = 100 * scalingFactor;
ctx.scale(scalingFactor, scalingFactor);

const halfWidth = canvas.width / 2;
const halfHeight = canvas.height / 2;

var die = false;
var gameStart = false;
var gotItWrong = false;
var mistakes = 0;

var startX = 30;
var startY = 27;

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

const loadFont = () => {
    const font = new FontFace('PixelFont', 'url(./font/3-by-5-pixel-font.ttf)');
    font.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
        ctx.font = "8px 'PixelFont'";
    });
};

loadFont();

function drawPixelText(text, x, y, outline, color="black") {
    ctx.imageSmoothingEnabled = false; 
    ctx.textBaseline = 'top';
    ctx.fillStyle = color; 
    
    charLength = text.toString().length;
    if (charLength == 2) {
        x -= 4
    }

    if (outline) {
        ctx.fillStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.strokeText(text, x, y);
    }

    ctx.fillText(text, x, y);
}

var puzzleData = [
    {
        horizontalMeasurers: [
            [9],
            [1, 2, 1, 1],
            [1, 2, 1, 1],
            [1, 7],
            [4, 2, 1],
            [1, 1, 2, 1],
            [6, 1],
            [10],
            [1, 8],
            [1, 6, 1],
        ],
        verticalMeasurers: [
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
        ],
        cellGrid: [
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
        ],
        ImageString: "balloons",
    },
    {
        horizontalMeasurers: [
            [5],
            [5],
            [5, 1],
            [3, 4],
            [9],
            [6, 2],
            [6, 3],
            [2, 4, 1],
            [6, 3],
            [4, 3],
        ],
        verticalMeasurers: [
            [4],
            [6],
            [5, 2],
            [7, 2],
            [10],
            [3, 5],
            [5, 1],
            [2, 7],
            [5, 2],
            [2, 4],
        ],
        cellGrid: [
            [false, false, false, true, true, true, true, true, false, false], [false, false, false, true, true, true, true, true, false, false], [false, false, true, true, true, true, true, false, true, false], [false, false, true, true, true, false, true, true, true, true], [false, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, false, true, true, false], [true, true, true, true, true, true, false, true, true, true], [true, true, false, false, true, true, true, true, false, true], [true, true, true, true, true, true, false, true, true, true], [false, true, true, true, true, false, false, true, true, true]
        ],
        ImageString: "scorpion",
    },
    {
        horizontalMeasurers: [
            [2, 3],
            [9],
            [1, 1, 1, 2],
            [1, 4, 2],
            [1, 2, 2],
            [10],
            [1, 1, 2, 2],
            [3, 2, 1, 1],
            [8, 1],
            [4, 4],
        ],
        verticalMeasurers: [
            [5],
            [5, 3],
            [1, 5],
            [3, 1, 2],
            [2, 6],
            [2, 6],
            [3, 1, 2],
            [2, 5],
            [7, 1],
            [6, 3],
        ],
        cellGrid: [
            [false, false, false, false, true, true, false, true, true, true], [false, true, true, true, true, true, true, true, true, true], [false, true, false, true, false, false, true, false, true, true], [false, true, false, true, true, true, true, false, true, true], [false, true, false, false, true, true, false, false, true, true], [true, true, true, true, true, true, true, true, true, true], [true, false, true, false, true, true, false, true, true, false], [true, true, true, false, true, true, false, true, false, true], [true, true, true, true, true, true, true, true, false, true], [true, true, true, true, false, false, true, true, true, true]
        ],
        ImageString: "redpanda",
    },
    {
        horizontalMeasurers: [
            [10], [1, 2, 2, 1], [10], [1, 4, 1], [2, 1, 1, 2], [10], [3, 3], [3, 3], [1, 2, 2, 1], [4, 4]
        ],
        verticalMeasurers: [
            [10], [1, 1, 4, 1], [3, 5], [6, 2], [1, 2, 1], [1, 2, 1], [6, 2], [3, 5], [1, 1, 4, 1], [10]
        ],
        cellGrid: [
            [true, true, true, true, true, true, true, true, true, true], [true, false, true, true, false, false, true, true, false, true], [true, true, true, true, true, true, true, true, true, true], [true, false, false, true, true, true, true, false, false, true], [true, true, false, true, false, false, true, false, true, true], [true, true, true, true, true, true, true, true, true, true], [true, true, true, false, false, false, false, true, true, true], [true, true, true, false, false, false, false, true, true, true], [true, false, true, true, false, false, true, true, false, true], [true, true, true, true, false, false, true, true, true, true]
        ],
        ImageString: "baby hippo",
    },
]
var newCellGrid = [];
var horizontalMeasures = []
var verticalMeasurers = [];
var correctCounter = 0;
var cellGrid;
function puzzleLoad(number) {
    die = false;
    mistakes = 0;
    puzzlenumber = number;
    ImageString = puzzleData[puzzlenumber]["ImageString"];
    imageIMG_white = loadImage(`./img/${ImageString}-white.png`);
    imageIMG = loadImage(`./img/${ImageString}.png`);
    horizontalMeasures = puzzleData[puzzlenumber]["horizontalMeasurers"];
    verticalMeasurers = puzzleData[puzzlenumber]["verticalMeasurers"];
    for (var i = 0; i < verticalMeasurers.length; i++) {
        verticalMeasurers[i] = verticalMeasurers[i].reverse();
    }
    for (var i = 0; i < horizontalMeasures.length; i++) {
        horizontalMeasures[i] = horizontalMeasures[i].reverse();
    }
    cellGrid = puzzleData[puzzlenumber]["cellGrid"]
    correctCounter = 0;
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
    maxLen *= 2;
    for (var i = 0; i < horizontalMeasures.length; i++) {
        if (horizontalMeasures[i].length > maxLen) {
            maxLen = horizontalMeasures[i].length;
        }
    }

    minute = 19;
    sec = 59;
    puzzleComplete = 0;
    gameStart = true;
    gameLoop();
}

puzzleLoad(0);
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
            ctx.strokeStyle = "#bababa"
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
            ctx.strokeStyle = "#bababa"
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

var puzzleComplete = 0;
var gotitwrongcounter = 0;
var textCoordinates;
function gameDraw() {
    //ctx.fillStyle = "#d14e4e"
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
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

            var editedGridLine = newCellGrid[row].slice();
            for (var i = 0; i < editedGridLine.length; i++) {
                if (editedGridLine[i] == "x") {
                    editedGridLine[i] = false;
                }
            }
            var GridLine = cellGrid[row];
            if (JSON.stringify(editedGridLine) === JSON.stringify(GridLine)) {
                drawPixelText(number.toString(), xPos, yPos, false, "#6b6b6b");
            } else {
                drawPixelText(number.toString(), xPos, yPos)
            }
        }
    }

    for (let col = 0; col < verticalMeasurers.length; col++) {
        for (let row = verticalMeasurers[col].length - 1; row >= 0; row--) {
            const number = verticalMeasurers[col][row];
            const charLength = number.toString().length;
            var offset = 0;
            if (charLength == 2) {
                offset = 2
            }
    
            let xPos = startX + 2 + (6 * col);
            let yPos = startY - 10 - (6 * row);
    
            xPos += offset;
            
            const editedGridLine = [];
            for (let i = 0; i < newCellGrid.length; i++) {
                var numvalue = newCellGrid[i][col];
                if (numvalue == 'x') {
                    editedGridLine.push(false);
                } else {
                    editedGridLine.push(numvalue);
                }
            }
            console.log(editedGridLine);
            const gridLine = [];
            for (let i = 0; i < cellGrid.length; i++) {
                gridLine.push(cellGrid[i][col])
            }
            if (JSON.stringify(editedGridLine) === JSON.stringify(gridLine)) {
                drawPixelText(number.toString(), xPos, yPos, false, "#6b6b6b");
            } else {
                drawPixelText(number.toString(), xPos, yPos);
            }
        }
    }
    var completeLength = puzzleComplete.toString().length -1
    drawPixelText(puzzleComplete+"%", startX - 10 - completeLength*5, startY-20);
    if (puzzleComplete == 100) {
        ctx.drawImage(imageIMG, startX, startY - 0.5);
    } else {
        drawGrid(startX, startY, 60, 60, 6);
    }

    var maxTimeCounter = 30;
    if (gotItWrong && gotitwrongcounter < maxTimeCounter) {
        drawPixelText("-2", textCoordinates.x, textCoordinates.y, true);
        gotitwrongcounter++;
    }
    if (gotitwrongcounter == maxTimeCounter) {
        gotItWrong = false;
        gotitwrongcounter = 0;
    }

    drawPixelText(`Error:${mistakes}`, startX - 30, startY - 13);
    if (die) {
        ctx.drawImage(lostScreen, startX, startY);
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
    if (mouseCoords.x <= 9 && mouseCoords.x >= 0 && mouseCoords.y >= 0 && mouseCoords.y <= 9 && gameStart && die == false) {
        if (event.button == 0) {    
            if (cellGrid[mouseCoords.y][mouseCoords.x] == true) {
                newCellGrid[mouseCoords.y][mouseCoords.x] = true;
            } else if (cellGrid[mouseCoords.y][mouseCoords.x] == false && newCellGrid[mouseCoords.y][mouseCoords.x] == "x") {
                console.log("you allready clicked here")
            } else {
                gotItWrong = true;
                tempCoordinates = getMousePosition(canvas, event);
                textCoordinates = tempCoordinates;
                newCellGrid[mouseCoords.y][mouseCoords.x] = "x";
                if (die != true) {
                    minute -= 2;
                }

                mistakes++;
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

//gameLoop();
