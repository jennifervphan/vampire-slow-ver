var scene;
var camera;
var fieldOfView;
var aspectRatio;
var nearPlane;
var farPlane;
var renderer;
var container;
var height;
var width;
var hemisphereLight;
var shadowLight;
var ambientLight;
var gameStatus;
var world;
var vamp;
var dis = 0.5;
var distance = 0;
var worldRadius = 200;
var worldRotation = 0;
var pi = Math.PI;
var speed = 20;
var delta = 0;
var amp = 4;
var cameraGame = 160;
var cameraGameOver = 220;
var crossPos = .60;
var crossVampDist = .60;
var crossAcceleration = 0.005;
var levelUpdateFreq = 3000;
var collisionObstacle = 20;
var collisionBonus = 30;
var progressWidth = 1;
var bloodBar = 50;
var timeRan = 0;
var element = document.getElementById("myprogressBar");
var audioJump = new sound('Audio/386529__glennm__breathing-jumping.wav');
var audioHit = new sound('Audio/35445__inkington__hit-mic00.wav');
var audioBackground = new sound('Audio/Toccata and Fugue in D Minor.mp3');
var audioGameOver = new sound('Audio/368367__thezero__game-over-sound.wav')
    // var game = new Game();

$(document).ready(function() {
    audioBackground.play();
});
$(window).keypress(function(e) {
    if (e.which === 13) {
        init();
        $("#enter").addClass("hide");
    }
});

$(window).keypress(function(e) {
    if (e.which === 32) {
        if (gameStatus === "play")
            vamp.jump();
        else if (gameStatus === "gameOver") {
            replay();
        }
    }
});

function loop() {
    if (gameStatus === "play") {
        delta = clock.getDelta();
        if (vamp.status == "running") {
            vamp.run();
            cross.run();
        }
        distanceRan();
        updateWorldRotation();
        updateBloodPosition();
        updateGarlicPosition();
        updateCrossPosition();
        checkCollision();
        progressBar();
    }
    if (gameStatus === "gameOver") {
        cross.win();
    }
    render();
    requestAnimationFrame(loop);
}

function init() {
    audioBackground.play();
    gameStatus = "play";
    // set up the scene, the camera and the renderer
    createScene();

    // add the lights
    createLights();

    // add  and characters
    createWorld();
    createForest();
    createVamp();
    createBlood();
    createGarlic();
    createCross();

    // start a loop that will update the objects' positions 
    // and render the scene on each frame
    loop();
}