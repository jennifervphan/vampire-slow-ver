function updateCrossPosition() {
    cross.run();
    crossVampDist -= delta * crossAcceleration;
    crossPos += (crossVampDist - crossPos) * delta;
    if (crossPos < .48) {
        gameOver();
    }
    var angle = pi * crossPos;
    cross.mesh.position.y = -worldRadius + Math.sin(angle) * (worldRadius + 12);
    cross.mesh.position.x = Math.cos(angle) * (worldRadius + 15);
}

function updateBloodPosition() {
    blood.mesh.position.y = -worldRadius + Math.sin(worldRotation + blood.angle) * (worldRadius + 50);
    blood.mesh.position.x = Math.cos(worldRotation + blood.angle) * (worldRadius + 50);
}

function updateGarlicPosition() {
    if (garlic.status == "hit") return;
    if (worldRotation + garlic.angle > 2.5) {
        garlic.angle = -worldRotation - Math.random() * 0.5;
        // garlic.body.rotation.y = Math.random() * pi * 2;

    }
    // garlic.mesh.rotation.y = worldRotation + garlic.angle - pi / 2;
    // garlic.mesh.rotation.z = worldRotation + garlic.angle - pi / 2;
    // garlic.mesh.position.z = 0;
    // garlic.mesh.position.z = Math.cos(worldRotation + garlic.angle) * (worldRadius + 3);
    garlic.mesh.position.y = -worldRadius + Math.sin(worldRotation + garlic.angle) * (worldRadius + 3);
    garlic.mesh.position.x = Math.cos(worldRotation + garlic.angle) * (worldRadius + 3);
}

function updateWorldRotation() {
    worldRotation += delta * .02 * speed;
    worldRotation = worldRotation % (pi * 2);
    world.rotation.z = worldRotation;
}