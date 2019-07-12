Vampire.prototype.run = function() {
    this.status = "running";
    var s = Math.min(speed, 70);
    this.runningCycle += delta * s * .7;
    this.runningCycle = this.runningCycle % (pi * 2);
    var t = this.runningCycle;

    this.body.position.y = 2 + Math.sin(t - pi / 2) * amp;

    this.torso.position.y = 15 + Math.sin(t - pi / 2) * amp * 0.5;

    this.head.position.y = 30 + Math.cos(t - pi / 2) * amp * .5;

    this.cape.rotation.z = Math.cos(t) * pi / 8;

    this.armL.rotation.x = Math.cos(t) * pi / 16;

    this.armL.rotation.y = Math.cos(t) * pi / 8;

    this.legR.position.z = (5 + Math.cos(t - pi / 2) * amp * .8);
    this.legR.position.y = 3;

    this.legL.position.z = (5 + Math.cos(t - pi / 2) * (-amp * .8));
    this.legL.position.y = 3;
}

Vampire.prototype.jump = function() {
    this.status = "jumping";
    audioJump.play();
    var fixedThis = this;
    TweenMax.to(this.mesh.position, 0.4, { y: 45, ease: Power2.easeOut });
    TweenMax.to(this.legR.position, 0.8, { y: 5, ease: Power2.easeOut });
    TweenMax.to(this.legL.position, 0.8, { y: 5, ease: Power2.easeOut });
    TweenMax.to(this.mesh.position, 0.4, {
        y: 0,
        ease: Power4.easeIn,
        delay: 0.2,
        onComplete: function() {
            fixedThis.status = "running";
        }
    });
}

Vampire.prototype.caught = function() {
    this.mesh.rotation.y = -pi / 2;
    this.head.rotation.y = pi / 2;
    this.head.position.x = 0;
    this.torso.position.y = 0;
    this.head.position.y = 8;
}

Cross.prototype.run = function() {

    var s = Math.min(speed, 70);
    this.runningCycle += delta * s * .7;
    this.runningCycle = this.runningCycle % (pi * 2);
    var t = this.runningCycle;
    this.body.position.y = 25 + Math.sin(t - pi / 2) * amp;
    this.sparks.rotation.y += pi / 8;
}

Cross.prototype.win = function() {
    cross.body.rotation.x = 0;
    cross.body.rotation.y += pi / 30;
    cross.sparks.rotation.y += pi / 30;
    cross.body.position.y = 20;
    cross.body.position.x = vamp.head.position.x;
    // cross.body.position.x = 20;
    cross.body.position.z = -4;
    cross.mesh.scale.set(2.5, 2.5, 2)
        // render();
}

Garlic.prototype.hit = function() {
    audioHit.play();
    var fixedThis = this;
    this.body.rotation.y += delta * 6;
    TweenMax.to(this.body.position, 0.4, {
        z: 300,
        ease: Power4.easeIn,
        delay: 0.06,
        onComplete: function() {
            fixedThis.status = "ready";
            //  creating another angle for the garlic to appear 
            garlic.angle = -worldRotation - Math.random() * .4;
            garlic.angle = garlic.angle % (pi * 5);
            garlic.body.position.z = 0;
        }
    });
}