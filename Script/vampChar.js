var Vampire = function() {
    this.status = "running";
    this.runningCycle = 0;

    this.mesh = new THREE.Group();
    this.body = new THREE.Group();
    this.mesh.add(this.body);

    var torsoGeom = new THREE.BoxGeometry(7, 7, 15, 1);

    this.torso = new THREE.Mesh(torsoGeom, whiteMat);
    this.torso.position.z = 4;
    this.torso.position.y = 12;
    this.torso.castShadow = true;
    this.body.add(this.torso);

    var pantsGeom = new THREE.BoxGeometry(9, 8, 9, 1);
    this.pants = new THREE.Mesh(pantsGeom, darkBlackMat);
    this.pants.position.z = -3;
    this.pants.position.y = 0;
    this.pants.castShadow = true;
    this.torso.add(this.pants);

    var shirtGeom = new THREE.BoxGeometry(3, 4, 7, 1);
    this.shirtR = new THREE.Mesh(shirtGeom, darkBlackMat);
    this.shirtR.position.x = 4;
    this.shirtR.position.y = 2;
    this.shirtR.position.z = 4;
    this.torso.add(this.shirtR);

    this.shirtL = this.shirtR.clone();
    this.shirtL.position.x = -this.shirtR.position.x;
    this.torso.add(this.shirtL);

    var capeGeom = new THREE.CubeGeometry(20, 1, 20, 1);
    // make a triangle cape
    capeGeom.vertices[5].x += 9;
    capeGeom.vertices[5].z += .5;

    capeGeom.vertices[7].x += 9;
    capeGeom.vertices[7].z -= .5;

    capeGeom.vertices[2].x -= 9;
    capeGeom.vertices[2].z -= .5;

    capeGeom.vertices[0].x -= 9;
    capeGeom.vertices[0].z += .5;
    capeGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 9, 0));
    this.cape = new THREE.Mesh(capeGeom, darkBlackMat);
    this.cape.position.x = 0;
    this.cape.position.z = -6;
    this.cape.position.y = 2.5;
    this.torso.add(this.cape);

    var headGeom = new THREE.BoxGeometry(10, 10, 13, 1);

    headGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 7.5));
    this.head = new THREE.Mesh(headGeom, whiteMat);
    this.head.position.z = 4;
    this.head.position.y = 26;
    this.head.castShadow = true;
    this.body.add(this.head);

    var cheekGeom = new THREE.BoxGeometry(1, 4, 4, 1);
    this.cheekR = new THREE.Mesh(cheekGeom, skinMat);
    this.cheekR.position.x = -5;
    this.cheekR.position.z = 7;
    this.cheekR.position.y = -2.5;
    this.cheekR.castShadow = true;
    this.head.add(this.cheekR);

    this.cheekL = this.cheekR.clone();
    this.cheekL.position.x = -this.cheekR.position.x;
    this.head.add(this.cheekL);

    var noseGeom = new THREE.BoxGeometry(5, 3, 3, 1);
    this.nose = new THREE.Mesh(noseGeom, whiteMat);
    this.nose.position.z = 14;
    this.nose.position.y = 2;
    this.nose.castShadow = true;
    this.head.add(this.nose);

    var legGeom = new THREE.BoxGeometry(4, 4, 4, 1);
    this.legR = new THREE.Mesh(legGeom, darkBlackMat);
    this.legR.position.x = -2;
    this.legR.position.z = 9;
    this.legR.position.y = 1.5;
    this.legR.castShadow = true;
    this.body.add(this.legR);

    this.legL = this.legR.clone();
    this.legL.position.x = -this.legR.position.x;
    this.legL.position.z = -this.legR.position.z;

    this.legL.castShadow = true;
    this.body.add(this.legL);

    var toothGeom = new THREE.BoxGeometry(2, 3, 1, 1);
    toothGeom.vertices[6].x += 1;
    toothGeom.vertices[6].z += .5;

    toothGeom.vertices[7].x += 1;
    toothGeom.vertices[7].z -= .5;

    toothGeom.vertices[2].x -= 1;
    toothGeom.vertices[2].z -= .5;

    toothGeom.vertices[3].x -= 1;
    toothGeom.vertices[3].z += .5;
    toothGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 9, 0));

    this.toothL = new THREE.Mesh(toothGeom, whiteMat);
    this.toothL.position.x = 1;
    this.toothL.position.z = 13;
    this.toothL.position.y = -15;
    this.toothL.rotation.z = -pi / 12;
    this.toothL.castShadow = true;
    this.head.add(this.toothL);

    this.toothR = this.toothL.clone();
    this.toothR.position.x = -this.toothL.position.x;
    this.toothR.rotation.z = -this.toothL.rotation.z;
    this.toothR.castShadow = true;
    this.head.add(this.toothR);

    var eyeGeom = new THREE.BoxGeometry(2, 2, 3);

    this.eyeL = new THREE.Mesh(eyeGeom, whiteMat);
    this.eyeL.position.x = 5;
    this.eyeL.position.z = 7;
    this.eyeL.position.y = 3;
    this.eyeL.castShadow = true;
    this.head.add(this.eyeL);

    var irisGeom = new THREE.BoxGeometry(.5, 1.5, 1.5);

    this.iris = new THREE.Mesh(irisGeom, darkBlackMat);
    this.iris.position.x = 1.2;
    this.iris.position.y = 0;
    this.iris.position.z = 1;
    this.eyeL.add(this.iris);

    this.eyeR = this.eyeL.clone();
    this.eyeR.children[0].position.x = -this.iris.position.x;
    this.eyeR.position.x = -this.eyeL.position.x;
    this.head.add(this.eyeR);

    var armGeom = new THREE.BoxGeometry(2, 7, 3, 1);
    this.armR = new THREE.Mesh(armGeom, darkBlackMat);
    this.armR.position.x = 6;
    this.armR.position.y = -5;
    this.armR.position.z = 4;
    this.armR.castShadow = true;
    this.torso.add(this.armR);

    this.armL = this.armR.clone();
    this.armL.position.x = -this.armR.position.x;
    this.armL.castShadow = true;
    this.torso.add(this.armL);

    var hairGeom = new THREE.BoxGeometry(11, 7, 5);
    this.hair = new THREE.Mesh(hairGeom, darkBlackMat);
    this.hair.position.y = 3;
    this.hair.position.z = 1;
    this.head.add(this.hair);


    this.armR.rotation.x = pi / 4;
    this.armL.rotation.x = pi / 4;
    this.cape.rotation.x = pi / 4;
    this.torso.rotation.x = -pi / 3;

    this.body.traverse(function(object) {
        if (object instanceof THREE.Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    });
}

function createVamp() {
    vamp = new Vampire();
    // rotate the vampire so that it looks like running
    vamp.mesh.rotation.y = pi / 2;
    scene.add(vamp.mesh);
}