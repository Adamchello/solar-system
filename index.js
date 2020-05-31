let scene, camera, renderer;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.0001, 1000);
camera.position.set(0,0,75);
renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const colorLight = new THREE.Color("hsl(40, 100%, 95%)");
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
    return new THREE.PointLight(color,i)
}

const createPlanet = (r = .4, color = 0xffffff) => {
    const sphere = createSphere(r, color);
    const pivot = new THREE.Object3D();
    pivot.add(sphere);
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

const mercury = createPlanet(.33, new THREE.Color("#676865"));
const venus = createPlanet(.5, new THREE.Color("#543c28"));
const earth = createPlanet(.65, new THREE.Color("#364a78"));
const mars = createPlanet(.45, new THREE.Color("#734626"));

const jupiter = createPlanet(1.8, new THREE.Color("#63594b"));
const saturn = createPlanet(1.4, new THREE.Color("#6a6255"));
const uran = createPlanet(0.8, new THREE.Color("#485258"));
const neptun = createPlanet(0.9, new THREE.Color("#485d81"));

mercury.sphere.position.set(5, 0, 0);
venus.sphere.position.set(7, 0, 0);
earth.sphere.position.set(10, 0, 0);
mars.sphere.position.set(12, 0, 0);

jupiter.sphere.position.set(25, 0, 0);
saturn.sphere.position.set(31, 10, 0);
uran.sphere.position.set(38, 10, 0);
neptun.sphere.position.set(43, 15, 0);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for(let i = 0;i<30;i++){
    const planet = createPlanet(.17, new THREE.Color("#848484"));
    planet.sphere.position.set(getRandomIntInclusive(14,16),getRandomIntInclusive(1,3),getRandomIntInclusive(1,2));
    planet.pivot.rotation.x = getRandomIntInclusive(1.8,1.9);
    planet.pivot.rotation.z = Math.random()*-200;
    sun.add(planet.pivot);
    const animate = () => {
        planet.pivot.rotation.z -= 0.009;
        
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };
    animate();
}

sun.add(mercury.pivot, venus.pivot, earth.pivot, mars.pivot, jupiter.pivot, saturn.pivot, uran.pivot, neptun.pivot);

mercury.pivot.rotation.x = 1.8;
venus.pivot.rotation.x = 1.8;
earth.pivot.rotation.x = 1.8;
mars.pivot.rotation.x = 1.8;

jupiter.pivot.rotation.x = 1.8;
saturn.pivot.rotation.x = 1.8;
uran.pivot.rotation.x = 1.8;
neptun.pivot.rotation.x = 1.8;

jupiter.pivot.rotation.z = -4;
saturn.pivot.rotation.z = -3;
neptun.pivot.rotation.z = -2;

mercuryButton.addEventListener('click', () => selectPlanet(mercury, 5));
venusButton.addEventListener('click', () => selectPlanet(venus, 7));
earthButton.addEventListener('click', () => selectPlanet(earth, 10));
marsButton.addEventListener('click', () => selectPlanet(mars, 12));
jupiterButton.addEventListener('click', () => selectPlanet(jupiter, 25));
saturnButton.addEventListener('click', () => selectPlanet(saturn, 31,10));
uranButton.addEventListener('click', () => selectPlanet(uran, 38,10));
neptunButton.addEventListener('click', () => selectPlanet(neptun, 43,15));

const geometrye = new THREE.BoxGeometry( .5, .5, 5 );
const materiale = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cubee = new THREE.Mesh( geometrye, materiale );

const selectPlanet = (planet, rangex, rangey = 0) => {
    cubee.position.set(rangex, rangey, -10);
    planet.pivot.add(cubee);
}

const loop = () => {
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