import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js";
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(20, 0, 10); // Initial camera position
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

const loader = new THREE.TextureLoader();
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let targetPosition = new THREE.Vector3();
let focusObject = null;

const objects = []; // Array to store clickable objects


// Earth Group
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180; // Earth's axial tilt
scene.add(earthGroup);

const detail = 12;

const earthGeometry = new THREE.IcosahedronGeometry(1, detail);
const earthMaterial = new THREE.MeshPhongMaterial({
  map: loader.load("./textures/00_earthmap1k.jpg"),
  specularMap: loader.load("./textures/02_earthspec1k.jpg"),
  bumpMap: loader.load("./textures/01_earthbump1k.jpg"),
  bumpScale: 0.04,
});
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
earthGroup.add(earthMesh);
objects.push(earthMesh); // Add Earth to the clickable objects

const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("./textures/03_earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
});
const lightsMesh = new THREE.Mesh(earthGeometry, lightsMat);
earthGroup.add(lightsMesh);

const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("./textures/04_earthcloudmap.jpg"),
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load('./textures/05_earthcloudmaptrans.jpg'),
});
const cloudsMesh = new THREE.Mesh(earthGeometry, cloudsMat);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);

const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(earthGeometry, fresnelMat);
glowMesh.scale.setScalar(1.003);
earthGroup.add(glowMesh);

// Stars
const stars = getStarfield({ numStars: 2000 });
scene.add(stars);

// Sunlight
const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(0, 0, 0); // Initialize at the origin
scene.add(sunLight);

// Sun
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunTexture = loader.load("./textures/sun_texture.jpg");
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
sunMesh.position.set(0, 0, 0);
scene.add(sunMesh);
objects.push(sunMesh); // Add Sun to the clickable objects

// Moon Orbiting the Earth
const moonOrbit = new THREE.Group();
earthGroup.add(moonOrbit);

const moonGeometry = new THREE.SphereGeometry(0.27, 32, 32);
const moonMaterial = new THREE.MeshPhongMaterial({
  map: loader.load("./textures/moon_texture.jpg"),
});
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
moonMesh.position.set(1.5, 0, 0); // Positioning Moon relative to Earth
moonOrbit.add(moonMesh);
objects.push(moonMesh); // Add Moon to the clickable objects

// Mars
const marsOrbit = new THREE.Group();
const marsGroup = new THREE.Group();
scene.add(marsGroup);
const marsGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const marsTexture = loader.load("./textures/mars_texture.jpeg");
const marsMaterial = new THREE.MeshPhongMaterial({
  map: marsTexture,
});
const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
marsMesh.position.set(25, 0, 0);
marsGroup.add(marsMesh);
marsGroup.add(marsOrbit);
objects.push(marsMesh); // Add Mars to the clickable objects

// Mars Clouds Layer
const marsCloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("./textures/marsCloudmap.jpeg"),
  transparent: true,
  opacity: 0.6,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load('./textures/marsCloudmaptrans.jpg'),
});
const marsCloudsMesh = new THREE.Mesh(marsGeometry, marsCloudsMat);
marsCloudsMesh.scale.setScalar(1.01);
marsGroup.add(marsCloudsMesh);

// Venus
const venusGroup = new THREE.Group();
scene.add(venusGroup);

const venusGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const venusTexture = loader.load("./textures/venus_texture.jpeg");
const venusMaterial = new THREE.MeshPhongMaterial({
  map: venusTexture,
});
const venusMesh = new THREE.Mesh(venusGeometry, venusMaterial);
venusMesh.position.set(13, 0, 0);
venusGroup.add(venusMesh);
objects.push(venusMesh); // Add Venus to the clickable objects

// Venus Cloud
const venusCloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("./textures/venus_cloudtrans.jpg"),
  transparent: true,
  opacity: 0.6,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load('./textures/venus_cloud.jpg'),
});
const venusCloudsMesh = new THREE.Mesh(venusGeometry, venusCloudsMat);
venusCloudsMesh.scale.setScalar(1.01);
venusGroup.add(venusCloudsMesh);

// **Jupiter**
const jupiterGroup = new THREE.Group();
scene.add(jupiterGroup);

const jupiterGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const jupiterTexture = loader.load("./textures/jupiter_texture.jpeg");
const jupiterMaterial = new THREE.MeshPhongMaterial({
  map: jupiterTexture,
});
const jupiterMesh = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiterMesh.position.set(35, 0, 0); // Set Jupiter's position in the solar system
jupiterGroup.add(jupiterMesh);
objects.push(jupiterMesh); // Add Jupiter to the clickable objects

// Mercury
const mercuryGroup= new THREE.Group();
scene.add(mercuryGroup);
const mercuryTexture = loader.load("./textures/mercury_tecture.jpg");
const mercuryMaterial = new THREE.MeshPhongMaterial({
  map: mercuryTexture,
});
const mercuryGeometry = new THREE.SphereGeometry(0.4, 32, 32); // Adjust size as necessary
const mercuryMesh = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercuryMesh.position.set(7, 0, 0); // Position Mercury in the solar system
scene.add(mercuryMesh);
mercuryGroup.add(mercuryMesh);
objects.push(mercuryMesh); 

// Saturn
const saturnGroup = new THREE.Group();
scene.add(saturnGroup);
const saturnGeometry = new THREE.SphereGeometry(1, 32, 32);
const saturnTexture = loader.load("./textures/saturnmap.jpg");
const saturnMaterial = new THREE.MeshPhongMaterial({
  map: saturnTexture,
});
const saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturnMesh.position.set(45, 0, 0); // Set Saturn's position
saturnGroup.add(saturnMesh);
objects.push(saturnMesh); // Add Saturn to the clickable objects

// Saturn Rings
const ringGeometry = new THREE.RingGeometry(1.3, 1.6, 32);
const ringTexture = loader.load("./textures/saturnringcolor.jpg"); // Use a texture with transparency
const ringMaterial = new THREE.MeshBasicMaterial({
  map: ringTexture,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.7, // Adjust transparency as needed
});
const saturnRing = new THREE.Mesh(ringGeometry, ringMaterial);
saturnRing.rotation.x = -Math.PI / 2; // Rotate to lay flat
saturnRing.position.set(45, 0, 0); // Position it around Saturn
saturnGroup.add(saturnRing);

// Uranus
const uranusGroup = new THREE.Group();
scene.add(uranusGroup);

const uranusGeometry = new THREE.SphereGeometry(1, 32, 32); // Size and detail of the sphere
const uranusTexture = loader.load("./textures/uranusmap.jpg"); // Load the Uranus texture
const uranusMaterial = new THREE.MeshPhongMaterial({
  map: uranusTexture,
});
const uranusMesh = new THREE.Mesh(uranusGeometry, uranusMaterial);
uranusMesh.position.set(55, 0, 0); // Set Uranus' position further from Saturn
uranusGroup.add(uranusMesh);
objects.push(uranusMesh); // Add Uranus to the clickable objects

// Uranus Rings
const uranusRingGeometry = new THREE.RingGeometry(1.1, 1.2, 32);
const uranusRingTexture = loader.load("./textures/uranusring.jpg"); // Use a ring texture
const uranusRingMaterial = new THREE.MeshBasicMaterial({
  map: uranusRingTexture,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.6, // Set ring transparency
});
const uranusRing = new THREE.Mesh(uranusRingGeometry, uranusRingMaterial);
uranusRing.rotation.x = -Math.PI / 2; // Rotate the ring to be flat
uranusRing.position.set(55, 0, 0); // Position it around Uranus
uranusGroup.add(uranusRing);

// Asteroid Belt
const asteroidBeltGroup = new THREE.Group();
scene.add(asteroidBeltGroup);

// Thinner Asteroid Belt
const asteroidBeltGeometry = new THREE.RingGeometry(30, 29.8, 64); // Smaller difference between inner and outer radii
const asteroidBeltTexture = loader.load("./textures/asteroid_belt_texture.jpeg"); // Use an asteroid belt texture
const asteroidBeltMaterial = new THREE.MeshBasicMaterial({
  map: asteroidBeltTexture,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.7, // Adjust opacity for a more realistic look
});
const asteroidBelt = new THREE.Mesh(asteroidBeltGeometry, asteroidBeltMaterial);
asteroidBelt.rotation.x = -Math.PI / 2; // Rotate the belt to lie flat
asteroidBelt.position.set(0, 0, 0); // Center position around the sun
asteroidBeltGroup.add(asteroidBelt);

// Rotation control variables
let isRotating = true; // Initially, the rotation is active
let isFocused = false; // Track if an object is focused

let cameraDistance = 5; // Set your desired distance from the object

// Raycast function
function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objects);

  if (intersects.length > 0) {
    focusObject = intersects[0].object; // Get the clicked object
    focusObject.getWorldPosition(targetPosition); // Get the world position of the clicked object
    console.log("Focus on:", focusObject); // Debug

    // Adjust to the desired distance from the focused object
    camera.position.set(targetPosition.x, targetPosition.y, targetPosition.z + cameraDistance);
    
    controls.target.copy(targetPosition); // Set the control target to the focused object
    controls.update(); // Update controls

    // Stop group rotation when focused on an object
    isRotating = false;
    isFocused = true; // Mark as focused
  } else {
    // If clicked outside any objects, resume group rotation
    isRotating = true;
    isFocused = false; // Mark as unfocused
  }
}

// Add the event listener for click
window.addEventListener('click', onMouseClick);

// Function to handle spacebar press
function onSpacebarPress(event) {
  if (event.code === 'Space') {
    isRotating = !isRotating; // Toggle rotation
  }
}

// Add the event listener for spacebar
window.addEventListener('keydown', onSpacebarPress);

// Add a variable to keep track of the Earth's orbital angle
let earthOrbitAngle = 0;
let speedMultiplier = 1; // Default speed multiplier

// Handle speed change
document.getElementById("speedRange").addEventListener("input", (event) => {
  speedMultiplier = event.target.value; // Update speed based on the slider
  document.getElementById("speedValue").textContent = `${speedMultiplier}x`; // Display current speed
});
function animate() {
  requestAnimationFrame(animate);

  if (isRotating) {
    // Update rotation animations using the speedMultiplier
    earthOrbitAngle += 0.001 * speedMultiplier; // Increment orbital angle

    earthGroup.position.x = 20 * Math.cos(earthOrbitAngle);
    earthGroup.position.z = -20 * Math.sin(earthOrbitAngle);

    // Adjust planet rotation speed
    earthGroup.rotation.y += 0.005 * speedMultiplier;
    stars.rotation.y -= 0.0005 * speedMultiplier;

    lightsMesh.rotation.y = earthGroup.rotation.y;
    cloudsMesh.rotation.y += 0.005 * speedMultiplier;
    glowMesh.rotation.y += 0.005 * speedMultiplier;
    moonOrbit.rotation.y += 0.002 * speedMultiplier;
    marsMesh.rotation.y += 0.005 * speedMultiplier;
    marsOrbit.rotation.y += 0.002 * speedMultiplier;
    marsGroup.rotation.y += 0.002 * speedMultiplier;
    venusMesh.rotation.y += 0.009 * speedMultiplier;
    venusGroup.rotation.y += 0.002 * speedMultiplier;
    jupiterMesh.rotation.y += 0.005 * speedMultiplier;
    jupiterGroup.rotation.y += 0.002 * speedMultiplier;
    mercuryMesh.rotation.y += 0.01 * speedMultiplier;
    mercuryGroup.rotation.y += 0.005 * speedMultiplier;
    saturnGroup.rotation.y += 0.00059 * speedMultiplier;
    saturnMesh.rotation.y += 0.005 * speedMultiplier;
    uranusGroup.rotation.y += 0.00059 * speedMultiplier;
    uranusMesh.rotation.y += 0.005 * speedMultiplier;
  }

  // Correct Sunlight position relative to Earth's rotation
  sunLight.position.set(-Math.sin(earthGroup.rotation.y) * 50, 10, -Math.cos(earthGroup.rotation.y) * 50);

  controls.update(); // Update controls to allow orbiting around the target
  renderer.render(scene, camera);
}

animate();


function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);

let focusIndex = 0;

// Function to update the information panel
function updateInfoPanel() {
  const planetInfo = planets[focusIndex]; // Assuming 'planets' array is already defined
  const infoPanel = document.getElementById("infoPanel"); // Assuming you have an element with this ID
  
  // Displaying information in the panel
  infoPanel.innerHTML = `
    <h2>${planetInfo.name}</h2>
    <p><strong>Size:</strong> ${planetInfo.originalSize}</p>
    <p><strong>Orbit Size:</strong> ${planetInfo.orbitSize}</p>
    <p><strong>Rotation Speed:</strong> ${planetInfo.rotationSpeed}</p>
    <p><strong>Days in a Year:</strong> ${planetInfo.dayInYears}</p>
    <p><strong>General Info:</strong> ${planetInfo.generalInfo}</p>
    <p><strong>Details:</strong> ${planetInfo.details}</p>
  `;
}

// Function to focus on the current object and update the object name
function focusOnObject() {
  const focusPoints = planets.map((planet, index) => ({
    object: objects[index], // Assuming objects array is in the same order as planets
    name: planet.name
  }));
  
  const { object } = focusPoints[focusIndex];
  object.getWorldPosition(targetPosition); // Get world position
  targetPosition.z += 5; // Adjust to desired distance from the camera

  controls.target.copy(targetPosition); // Set control target
  camera.position.set(targetPosition.x, targetPosition.y, targetPosition.z + 5); // Set camera position
  controls.update(); // Update controls

  // Update the displayed object name
  document.getElementById("objectNameDisplay").innerText = focusPoints[focusIndex].name;
}


// Event listeners for the navigation buttons
document.getElementById("prevButton").addEventListener("click", () => {
  focusIndex = (focusIndex - 1 + focusPoints.length) % focusPoints.length;
  console.log("Previous Focus Index:", focusIndex); // Debugging log
  focusOnObject();
});

document.getElementById("nextButton").addEventListener("click", () => {
  focusIndex = (focusIndex + 1) % focusPoints.length;
  console.log("Next Focus Index:", focusIndex); // Debugging log
  focusOnObject();
});


// index.js
let currentPlanet = 0;
const planets = [
  {
      name: "Earth",
      originalSize: "12,742 km (7,918 miles)",
      orbitSize: "149.6 million km (93 million miles)",
      rotationSpeed: "1,670 km/h (1,040 mph)",
      dayInYears: "1 year",
      generalInfo: "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",
      details: "It has a diverse climate and a variety of ecosystems.\nIts atmosphere is composed mainly of nitrogen (78%) and oxygen (21%).\nEarth has one natural satellite: the Moon."
  },
  {
      name: "Mars",
      originalSize: "6,779 km (4,212 miles)",
      orbitSize: "227.9 million km (141.6 million miles)",
      rotationSpeed: "868 km/h (540 mph)",
      dayInYears: "687 Earth days",
      generalInfo: "Mars is the fourth planet from the Sun and is often referred to as the Red Planet.",
      details: "It has the largest volcano in the solar system, Olympus Mons.\nMars has a thin atmosphere, primarily made of carbon dioxide (95.3%).\nEvidence of water in the form of ice exists on Mars."
  },
  {
      name: "Jupiter",
      originalSize: "139,820 km (86,881 miles)",
      orbitSize: "778.5 million km (484 million miles)",
      rotationSpeed: "45,000 km/h (28,000 mph)",
      dayInYears: "11.86 Earth years",
      generalInfo: "Jupiter is the largest planet in our solar system and is known for its Great Red Spot.",
      details: "It has a strong magnetic field and dozens of moons.\nJupiter's atmosphere consists mostly of hydrogen (90%) and helium (10%).\nIt is a gas giant, meaning it does not have a solid surface."
  },
  {
      name: "Venus",
      originalSize: "12,104 km (7,521 miles)",
      orbitSize: "108.2 million km (67.2 million miles)",
      rotationSpeed: "6.5 km/h (4 mph)",
      dayInYears: "225 Earth days",
      generalInfo: "Venus is the second planet from the Sun and is often called Earth's twin.",
      details: "It has a thick atmosphere mainly composed of carbon dioxide (96.5%) and is known for its extreme temperatures.\nThe surface of Venus is covered with volcanoes and vast plains."
  },
  {
      name: "Mercury",
      originalSize: "4,880 km (3,032 miles)",
      orbitSize: "57.9 million km (36 million miles)",
      rotationSpeed: "174 km/h (108 mph)",
      dayInYears: "88 Earth days",
      generalInfo: "Mercury is the closest planet to the Sun and the smallest in the solar system.",
      details: "It has a very thin atmosphere, leading to extreme temperature variations.\nMercury has no moons and very few craters due to its lack of atmosphere."
  },
  {
      name: "Saturn",
      originalSize: "116,460 km (72,366 miles)",
      orbitSize: "1.43 billion km (886 million miles)",
      rotationSpeed: "9,640 km/h (5,970 mph)",
      dayInYears: "29.5 Earth years",
      generalInfo: "Saturn is known for its spectacular ring system and is the second-largest planet in the solar system.",
      details: "It is a gas giant with a composition similar to Jupiter, primarily hydrogen and helium.\nSaturn has more than 80 moons, with Titan being the largest."
  },
  {
      name: "Uranus",
      originalSize: "50,724 km (31,518 miles)",
      orbitSize: "2.87 billion km (1.78 billion miles)",
      rotationSpeed: "9,800 km/h (6,100 mph)",
      dayInYears: "84 Earth years",
      generalInfo: "Uranus is the seventh planet from the Sun and is unique for its tilted rotation axis.",
      details: "It is an ice giant with a bluish color due to methane in its atmosphere.\nUranus has a faint ring system and at least 27 known moons."
  },
  {
      name: "Neptune",
      originalSize: "49,244 km (30,598 miles)",
      orbitSize: "4.5 billion km (2.8 billion miles)",
      rotationSpeed: "2,100 km/h (1,300 mph)",
      dayInYears: "165 Earth years",
      generalInfo: "Neptune is the eighth planet from the Sun and is known for its striking blue color.",
      details: "It has a dynamic atmosphere with strong winds and storms.\nNeptune has 14 known moons, with Triton being the largest."
  }
  // Add more planets as needed
];

// Update the planet info display
function updatePlanetInfo() {
    const planetNameDisplay = document.getElementById('objectNameDisplay');
    const planetDetails = document.getElementById('planetDetails');
    
    planetNameDisplay.textContent = planets[currentPlanet].name;
    planetDetails.textContent = planets[currentPlanet].details;
}

// Next Button Click Event
document.getElementById('nextButton').addEventListener('click', () => {
    currentPlanet = (currentPlanet + 1) % planets.length; // Cycle through planets
    updatePlanetInfo();
});

// Previous Button Click Event
document.getElementById('prevButton').addEventListener('click', () => {
    currentPlanet = (currentPlanet - 1 + planets.length) % planets.length; // Cycle through planets
    updatePlanetInfo();
});
animate();
