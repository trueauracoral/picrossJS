class bird { 
    constructor(pos, velocity, radius) {
        this.pos = pos;
        this.velocity = velocity;
        this.radius = radius;
    }

    update() {
        this.pos.y += this.velocity.y;
    };

    draw() {
        ctx.fillStyle = "#ffffff";
        //ctx.fillRect(this.pos.x, this.pos.y, this.radius, this.radius);
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    };
}

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

canvas.width = 480;
canvas.height = 640;

const halfWidth = canvas.width / 2;
const halfHeight = canvas.height / 2;

const Bird = new bird(vec2(halfWidth - 50, halfHeight), vec2(5,5), 15)

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
    Bird.update();
}

function gameDraw() {
    Bird.draw();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    window.requestAnimationFrame(gameLoop);

    gameUpdate();
    gameDraw()

}
gameLoop();
