var Colors = {
    darkBlack: 0x000000,
    black: 0x1e2022,
    darkGreen: 0x0b1605,
    darkGreen1: 0x000a00,
    green: 0x008000,
    grey: 0x52616b,
    darkGrey: 0x303841,
    lightGrey: 0xc9d6df,
    lighterGrey: 0xf0f5f9,
    superLight: 0xeeeeee,
    white: 0xffffff,
    garlic: 0xf2e9d2,
    darkGarlic: 0xdec78c,
    red: 0xd72323,
    skin: 0xf7e4e5,
    yellow: 0xffc93c,
    orange: 0xff9a3c
}

var darkBlackMat = new THREE.MeshPhongMaterial({
    color: Colors.darkBlack,
    shading: THREE.FlatShading
});
var blackMat = new THREE.MeshPhongMaterial({
    color: Colors.black,
    shading: THREE.FlatShading
});
var darkGreenMat = new THREE.MeshPhongMaterial({
    color: Colors.darkGreen,
    shading: THREE.FlatShading
});
var darkGreen1Mat = new THREE.MeshPhongMaterial({
    color: Colors.darkGreen1,
    shading: THREE.FlatShading
});
var greenMat = new THREE.MeshPhongMaterial({
    color: Colors.green,
    shading: THREE.FlatShading
});
var greyMat = new THREE.MeshPhongMaterial({
    color: Colors.grey,
    shading: THREE.FlatShading
});
var darkGreyMat = new THREE.MeshPhongMaterial({
    color: Colors.darkGrey,
    shading: THREE.FlatShading
});
var lightGreyMat = new THREE.MeshPhongMaterial({
    color: Colors.lightGrey,
    shading: THREE.FlatShading
});
var lighterGreyMat = new THREE.MeshPhongMaterial({
    color: Colors.lighterGrey,
    shading: THREE.FlatShading
});
var superLightMat = new THREE.MeshPhongMaterial({
    color: Colors.superLight,
    shading: THREE.FlatShading
});
var whiteMat = new THREE.MeshPhongMaterial({
    color: Colors.white,
    shading: THREE.FlatShading
});
var garlicMat = new THREE.MeshPhongMaterial({
    color: Colors.garlic,
    shading: THREE.FlatShading
});
var darkGarlicMat = new THREE.MeshPhongMaterial({
    color: Colors.darkGarlic,
    shading: THREE.FlatShading
});
var redMat = new THREE.MeshPhongMaterial({
    color: Colors.red,
    shading: THREE.FlatShading
});
var skinMat = new THREE.MeshPhongMaterial({
    color: Colors.skin,
    shading: THREE.FlatShading
});
var yellowMat = new THREE.MeshPhongMaterial({
    color: Colors.yellow,
    shading: THREE.FlatShading
});
var orangeMat = new THREE.MeshPhongMaterial({
    color: Colors.orange,
    shading: THREE.FlatShading
});

function createScene() {
    height = window.innerHeight;
    width = window.innerWidth;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(Colors.darkBlack, 160, 350);

    aspectRatio = width / height;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 2000;

    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    camera.position.x = 0;
    camera.position.y = 40;
    camera.position.z = cameraGame;
    camera.lookAt(new THREE.Vector3(0, 30, 0));

    renderer = new THREE.WebGLRenderer({
        // transparency to show gradient in background
        alpha: true,
        antialias: true
    });
    // fill the entire screen
    renderer.setSize(width, height);
    // enable shadow rendering
    renderer.shadowMap.enabled = true;
    render();

    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
    // change camera position when resize the page
    window.addEventListener('resize', handleWindowResize, false);

    clock = new THREE.Clock();
}

var render = function() {
    renderer.render(scene, camera);
}

function handleWindowResize() {
    height = window.innerHeight;
    width = window.innerWidth;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

function createLights() {
    hemisphereLight = new THREE.HemisphereLight(Colors.black, Colors.darkGrey, .9);
    shadowLight = new THREE.DirectionalLight(0xffffff, .9);
    ambientLight = new THREE.AmbientLight(0xdc8874, .5);
    // direction of light
    shadowLight.position.set(150, 350, 350);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -600;
    shadowLight.shadow.camera.right = 600;
    shadowLight.shadow.camera.top = 600;
    shadowLight.shadow.camera.bottom = -600;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 2000;
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;
    scene.add(hemisphereLight);
    scene.add(shadowLight);
    scene.add(ambientLight);
}

function createWorld() {
    worldShadow = new THREE.Mesh(new THREE.SphereGeometry(worldRadius, 50, 50), new THREE.MeshPhongMaterial({
        color: Colors.black,
        specular: 0x000000,
        shininess: 1,
        transparent: true,
        opacity: .4,
        shading: THREE.FlatShading,

    }));
    //floorShadow.rotation.x = -Math.PI / 2;
    worldShadow.receiveShadow = true;

    worldGrass = new THREE.Mesh(new THREE.SphereGeometry(worldRadius - .5, 50, 50), new THREE.MeshBasicMaterial({
        color: Colors.black
    }));

    //floor.rotation.x = -Math.PI / 2;
    worldGrass.receiveShadow = false;

    world = new THREE.Group();
    world.position.y = -worldRadius;

    world.add(worldShadow);
    world.add(worldGrass);
    scene.add(world);
}


Tree = function() {
    this.mesh = new THREE.Object3D();

    var treeHeight = 50 + Math.random() * 300;
    var topRadius = 10 + Math.random() * 10;
    // var bottomRadius = 8 + Math.random() * 10;
    var mats = [darkGreenMat, darkGreen1Mat];
    var matTree = mats[Math.floor(Math.random() * mats.length)];
    // var treeGeom = new THREE.SphereGeometry(topRadius, 2, 2);
    // treeGeom.vertices[4].y += 50;


    var treeGeom = new THREE.CubeGeometry(topRadius, treeHeight, 10, 1, 5);
    treeGeom.vertices[4].x += (topRadius / 2);
    treeGeom.vertices[4].z += .5;

    treeGeom.vertices[5].x += (topRadius / 2);
    treeGeom.vertices[5].z -= .5;

    treeGeom.vertices[0].x -= (topRadius / 2);
    treeGeom.vertices[0].z -= .5;

    treeGeom.vertices[1].x -= (topRadius / 2);
    treeGeom.vertices[1].z += .5;

    this.tree = new THREE.Mesh(treeGeom, matTree);
    this.tree.castShadow = true;
    this.mesh.add(this.tree);

    if (Math.random() > 0.1) {
        var size = Math.random() * 2;
        var fireflyGeometry = new THREE.BoxGeometry(size, size, size, 1);
        var firefly = new THREE.Mesh(fireflyGeometry, yellowMat);
        firefly.position.x = Math.random() * 40;
        firefly.position.y = Math.random() * 100;
        firefly.position.z = -Math.random() * 1.2;
        this.mesh.add(firefly);
    }
}

function createForest() {
    var numTrees = 70;
    for (var i = 0; i < numTrees; i++) {
        var x = i * pi * 2 / numTrees;
        var y = pi / 2;
        y += (Math.random() > .05) ? .25 + Math.random() * .3 : -.35 - Math.random() * .1;

        var tree = new Tree();
        tree.mesh.position.x = Math.sin(y) * Math.cos(x) * worldRadius;
        tree.mesh.position.y = Math.sin(y) * Math.sin(x) * (worldRadius - 10);
        tree.mesh.position.z = Math.cos(y) * worldRadius;

        var vec = tree.mesh.position.clone();
        var axis = new THREE.Vector3(0, 1, 0);
        tree.mesh.quaternion.setFromUnitVectors(axis, vec.clone().normalize());
        world.add(tree.mesh);
    }
}