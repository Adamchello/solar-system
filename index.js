const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.0001, 1000);
camera.position.set(0,0,75);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const colorSun = new THREE.Color("#fec446");

const mercuryButton = document.querySelector('[mercury]');
const venusButton = document.querySelector('[venus]');
const earthButton = document.querySelector('[earth]');
const marsButton = document.querySelector('[mars]');
const jupiterButton = document.querySelector('[jupiter]');
const saturnButton = document.querySelector('[saturn]');
const uranButton = document.querySelector('[uran]');
const neptunButton = document.querySelector('[neptun]');

const handleResize = () => {
    const {innerWidth,innerHeight} = window;
    renderer.setSize(innerWidth,innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};

const createSphere = (r = 1, color = 0xffffff) => {
    const sphereGeo = new THREE.SphereGeometry(r, 20, 20);
    const sphereMat = new THREE.MeshPhongMaterial({
        color,
        shininess: 30,
    });
    return new THREE.Mesh(sphereGeo, sphereMat);
}

const createPointLight = (i = 1, color = 0xffffff) => {
    return new THREE.PointLight(color,i);
}

const createPlanet = (r = .4, color = 0xffffff, xPos = 0, yPos = 0, zRot = 0) => {
    const sphere = createSphere(r, color);
    const pivot = new THREE.Object3D();
    pivot.add(sphere);
    sphere.position.set(xPos, yPos, 0);
    pivot.rotation.x = 1.8;
    pivot.rotation.z = zRot;
    return {
        sphere,
        pivot
    }
}

const sun = createSphere(3.2, colorSun);
const l1 = createPointLight(.9);
const l2 = createPointLight(.9);
l1.position.set(0, 10, 10);
l2.position.set(0, -2, 10);

scene.add(sun, l2, l1);

const mercury = createPlanet(.33, new THREE.Color("#676865"), 5);
const venus = createPlanet(.5, new THREE.Color("#543c28"), 7);
const earth = createPlanet(.65, new THREE.Color("#364a78"), 10);
const mars = createPlanet(.45, new THREE.Color("#734626"), 12);

const jupiter = createPlanet(1.8, new THREE.Color("#63594b"), 25, 0, -4);
const saturn = createPlanet(1.4, new THREE.Color("#6a6255"), 31, 10, -3);
const uran = createPlanet(0.8, new THREE.Color("#485258"), 38, 10);
const neptun = createPlanet(0.9, new THREE.Color("#485d81"), 43, 15, -2);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const asteroids = [];
const asteroidsAmount = 35;

for(let i = 0;i<asteroidsAmount;i++){
    const planet = createPlanet(.17, new THREE.Color("#848484"));
    planet.sphere.position.set(getRandomIntInclusive(14,16),getRandomIntInclusive(1,3),getRandomIntInclusive(1,2));
    planet.pivot.rotation.x = getRandomIntInclusive(1.8,1.9);
    planet.pivot.rotation.z = Math.random()*-200;
    sun.add(planet.pivot);
    asteroids.push(planet);
}

sun.add(mercury.pivot, venus.pivot, earth.pivot, mars.pivot, jupiter.pivot, saturn.pivot, uran.pivot, neptun.pivot);

const geometryCube = new THREE.BoxGeometry( .5, .5, 5 );
const materialCube = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometryCube, materialCube );

const selectPlanet = (planet, rangex, rangey = 0) => {
    cube.position.set(rangex, rangey, -10);
    planet.pivot.add(cube);
}

mercuryButton.addEventListener('click', () => selectPlanet(mercury, 5));
venusButton.addEventListener('click', () => selectPlanet(venus, 7));
earthButton.addEventListener('click', () => selectPlanet(earth, 10));
marsButton.addEventListener('click', () => selectPlanet(mars, 12));
jupiterButton.addEventListener('click', () => selectPlanet(jupiter, 25));
saturnButton.addEventListener('click', () => selectPlanet(saturn, 31,10));
uranButton.addEventListener('click', () => selectPlanet(uran, 38,10));
neptunButton.addEventListener('click', () => selectPlanet(neptun, 43,15));

const loop = () => {
    for(let i = 0;i < asteroidsAmount;i++) asteroids[i].pivot.rotation.z -= 0.009;
    mercury.pivot.rotation.z -= 0.05;
    venus.pivot.rotation.z -= 0.020;
    earth.pivot.rotation.z -= 0.015;
    mars.pivot.rotation.z -= 0.014;
    jupiter.pivot.rotation.z -= 0.004;
    saturn.pivot.rotation.z -= 0.002;
    uran.pivot.rotation.z -= 0.001;
    neptun.pivot.rotation.z -= 0.0006;
    
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
};

loop();
window.addEventListener('resize', handleResize);