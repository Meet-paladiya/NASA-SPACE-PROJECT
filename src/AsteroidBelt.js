// AsteroidBelt.js
import * as THREE from "three";

class AsteroidBelt {
    constructor(numAsteroids, radius, speed) {
        this.numAsteroids = numAsteroids; // Number of asteroids
        this.radius = radius; // Orbit radius
        this.speed = speed; // Speed of the asteroid belt
        this.asteroids = []; // Array to hold the asteroid meshes
        this.beltGroup = new THREE.Group(); // Group to hold all asteroids
        this.createAsteroids(); // Create the asteroids
    }

    createAsteroids() {
        const loader = new THREE.TextureLoader(); // Texture loader for asteroids
        const asteroidTexture = loader.load("./textures/asteroid_texture.jpg"); // Load asteroid texture

        for (let i = 0; i < this.numAsteroids; i++) {
            const asteroidGeometry = new THREE.SphereGeometry(0.2 + Math.random() * 0.5, 8, 8); // Random size for each asteroid
            const asteroidMaterial = new THREE.MeshPhongMaterial({
                map: asteroidTexture,
            });
            const asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

            // Random position within the belt radius
            const angle = Math.random() * Math.PI * 2; // Random angle
            const distance = this.radius + Math.random() * 2; // Random distance from the center
            asteroidMesh.position.set(
                Math.cos(angle) * distance,
                Math.random() * 2 - 1, // Random height
                Math.sin(angle) * distance
            );

            this.beltGroup.add(asteroidMesh); // Add asteroid to the group
            this.asteroids.push(asteroidMesh); // Store the asteroid in the array
        }
    }

    update() {
        this.beltGroup.rotation.y += this.speed; // Rotate the belt
    }

    getBeltGroup() {
        return this.beltGroup; // Return the group of asteroids
    }

    setPosition(x, y, z) {
        this.beltGroup.position.set(x, y, z); // Set the position of the asteroid belt
    }

    setSpeed(speed) {
        this.speed = speed; // Update the speed of the asteroid belt
    }
}

export default AsteroidBelt;
