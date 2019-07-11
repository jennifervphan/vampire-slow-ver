function distanceRan() {
    distance = Math.floor((dis + timeRan * speed) / 8);
    $("#distValue").html(stri(distance));
    dis += 0.5;
    timeRan += 0.2;
}

function progressBarGetBlood() {
    var element = document.getElementById("myprogressBar");
    if (bloodBar <= 75) {
        bloodBar += 25;
        var x = 100 - (bloodBar)
        element.style.width = (100 - x) + '%';
        progressBar();
    } else {
        element.style.width = 100 + '%';
        progressBar();
    }
}

function progressBar() {
    bloodBar -= 0.4;
    element.style.width = (bloodBar) + '%';
    bloodBar = bloodBar;
    noBlood();
}

function noBlood() {
    if (bloodBar <= 0) {
        gameOver();
    }
}

function hitGarlic() {
    garlic.status = "hit";
    crossVampDist -= .05;
    garlic.hit();
    bloodBar -= 8;
}

function getBlood() {
    blood.angle -= pi / 2;
    speed += 3;
    crossVampDist += .01;
    progressBarGetBlood();
}

function checkCollision() {
    var db = vamp.mesh.position.clone().sub(blood.mesh.position.clone());
    var dm = vamp.mesh.position.clone().sub(garlic.mesh.position.clone());
    if (db.length() < collisionBonus) {
        getBlood();
    }
    if (dm.length() < collisionObstacle && garlic.status != "hit") {
        hitGarlic();
    }
}

function gameOver() {
    if (gameStatus === "gameOver") { return; }
    audioGameOver.play();
    $("#gameoverInstructions").addClass("show");
    gameStatus = "gameOver";
    // cross.win();
    vamp.caught();
    blood.mesh.visible = false;
    garlic.mesh.visible = false;
    TweenMax.to(camera.position, 2, { z: cameraGameOver, y: 30, x: 0 });
}

function replay() {
    $("#gameoverInstructions").removeClass("show");
    cross.body.rotation.y = pi / 4;
    cross.body.rotation.x = -pi / 16;
    cross.body.position.x = -25;
    cross.mesh.scale.set(1, 1, 1);
    bloodBar = 50;
    distance = 0;
    dis = 0.5;
    speed = 10;
    timeRan = 0;
    crossPos = .60;
    crossVampDist = .60;
    vamp.mesh.rotation.y = pi / 2;
    vamp.head.rotation.y = 0;
    vamp.mesh.position.x = 0;
    vamp.mesh.position.y = 0;
    vamp.mesh.position.z = 0;
    scene.add(vamp.mesh);
    vamp.status = "running";
    gameStatus = "play"
    blood.mesh.visible = true;
    garlic.mesh.visible = true;
    TweenMax.to(camera.position, 2, { z: cameraGame, y: 30, x: 0 });
}

function stri(number) {
    if (number < 10) {
        return `00${number}`;
    } else if (number >= 10 && number < 100) {
        return `0${number}`;
    } else {
        return `${number}`;

    }
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}

// class Game {
//     checkCollision() {
//         var db = vamp.mesh.position.clone().sub(blood.mesh.position.clone());
//         var dm = vamp.mesh.position.clone().sub(garlic.mesh.position.clone());
//         if (db.length() < collisionBonus) {
//             getBlood();
//         }
//         if (dm.length() < collisionObstacle && garlic.status != "hit") {
//             hitGarlic();
//         }
//     }
//     hitGarlic() {
//         garlic.status = "hit";
//         crossVampDist -= .01;
//         garlic.hit();
//         bloodBar -= 5;
//         // progessBar();
//     }
//     getBlood() {
//         blood.angle -= pi / 2;
//         speed += 3;
//         crossVampDist += .03;
//         progressBarGetBlood();
//     }
// }