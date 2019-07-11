Blood = function() {
    this.angle = 0;
    this.status = "ready";
    this.mesh = new THREE.Group();
    var bloodGeom = new THREE.SphereGeometry(6, 4, 4);
    bloodGeom.vertices[2].y += 4;

    this.blood = new THREE.Mesh(bloodGeom, redMat);
    this.blood.position.z = 0;
    this.mesh.add(this.blood);
}

function createBlood() {
    blood = new Blood();

    blood.mesh.castShadow = true;
    scene.add(blood.mesh);
}


Garlic = function() {
    this.angle = 0;
    this.status = "ready";

    this.mesh = new THREE.Group();
    this.body = new THREE.Group();
    var garlicGeom1 = new THREE.SphereGeometry(3, 4, 4);
    garlicGeom1.vertices[2].y += 9;

    this.garlic1 = new THREE.Mesh(garlicGeom1, garlicMat);
    this.garlic1.position.z = -3;

    var garlicGeom2 = new THREE.SphereGeometry(6, 4, 4);
    garlicGeom2.vertices[2].y += 6;
    this.garlic2 = new THREE.Mesh(garlicGeom2, darkGarlicMat);

    this.body.add(this.garlic1);
    this.body.add(this.garlic2);

    var garlicGeom3 = new THREE.BoxGeometry(10, 15, 3, 1);
    garlicGeom3.vertices[4].x += 5;
    garlicGeom3.vertices[4].z += .5;

    garlicGeom3.vertices[5].x += 5;
    garlicGeom3.vertices[5].z -= .5;

    garlicGeom3.vertices[0].x -= 5;
    garlicGeom3.vertices[0].z -= .5;

    garlicGeom3.vertices[1].x -= 5;
    garlicGeom3.vertices[1].z += .5;
    garlicGeom3.applyMatrix(new THREE.Matrix4().makeTranslation(0, 9, 0));
    this.garlic3 = new THREE.Mesh(garlicGeom3, darkGarlicMat);
    this.garlic3.position.y = -5;
    this.garlic3.position.x = 5;

    this.garlic4 = this.garlic3.clone();
    this.garlic4.position.x = -this.garlic3.position.x;
    this.garlic4.rotation.z = -Math.PI / 16;
    this.body.add(this.garlic3);
    this.body.add(this.garlic4);

    var leafGeom = new THREE.BoxGeometry(1, 10, 1);
    this.leaf = new THREE.Mesh(leafGeom, greenMat);
    this.leaf.position.y = 10;

    this.leaf2 = this.leaf.clone();
    this.leaf3 = this.leaf.clone();

    this.garlic3.rotation.z = Math.PI / 16;
    this.garlic1.rotation.x = -Math.PI / 16;
    this.garlic2.rotation.x = -Math.PI / 18;
    this.leaf2.rotation.z = Math.PI / 8;
    this.leaf3.rotation.z = -Math.PI / 8;

    this.body.add(this.leaf);
    this.body.add(this.leaf2);
    this.body.add(this.leaf3);
    this.mesh.add(this.body);
}

function createGarlic() {
    garlic = new Garlic();
    garlic.mesh.castShadow = true;
    garlic.mesh.receiveShadow = true;
    garlic.mesh.position.y = worldRadius + 4;
    scene.add(garlic.mesh);
}


Cross = function() {
    // this.status = "running";
    this.runningCycle = 0;
    this.mesh = new THREE.Group();
    this.body = new THREE.Group();

    var horizontalGeom = new THREE.BoxGeometry(25, 8, 8, 1);
    this.horizontal = new THREE.Mesh(horizontalGeom, yellowMat);
    this.body.add(this.horizontal);

    var verticalGeom = new THREE.BoxGeometry(8, 35, 8, 1);
    this.vertical = new THREE.Mesh(verticalGeom, yellowMat);
    this.vertical.position.y = -4;
    this.body.add(this.vertical);

    // this.body.position.y = 30;
    // this.body.position.x = -60;
    this.sparks = new THREE.Group();
    var sparkGeom = new THREE.SphereGeometry(1, 1, 1);
    this.spark = new THREE.Mesh(sparkGeom, yellowMat);
    for (var i = 0; i < 20; i++) {
        this.spark1 = this.spark.clone();
        this.sparks.add(this.spark1);
        for (var j = 0; j < 20; j++) {
            this.spark1.position.x = [Math.random() - 0.5] * 30;
            this.spark1.position.y = [Math.random() - 0.5] * 30;
            this.spark1.position.z = [Math.random() - 0.5] * 10;
        }
    }
    this.sparks.add(this.spark);
    this.body.add(this.sparks);
    this.mesh.add(this.body);
}


function createCross() {
    cross = new Cross();
    cross.body.rotation.y = pi / 4;
    cross.body.rotation.x = -pi / 16;
    cross.body.position.x = -25;
    // cross.mesh.position.z = 20;
    cross.body.castShadow = true;
    scene.add(cross.mesh);
}