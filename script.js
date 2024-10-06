const planets = [
    {
        name: "Mercury",
        description:"Closet to sun = 46 to 70 million km\n Smallest Planet Shortest year = 88 Earth days\n Fastest planet = 47 km/s\n Long Day = 59 Earth Days\n Temperature = -180\u00B0C to 430\u00B0C." ,
        image: "m.jpeg"
    },
    {
        name: "Venus",
        description: "Diameter = 7,521 miles\nDistance from Sun = 60.7 millioin miles\nYear = 225 Earths days\nDay = 243 Earth days\nHottest Planet = 462\u00B0C\nSun rises from the west",
        image: "venus.jpeg"
    },
    {
        name: "Earth",
        description: "Diameter = 8000 miles\nDistance form Sun = 93 million miles\nYear = 365 days.\nDay = 23.9 hours\n",
        image: "earth.jpeg"
    },
    {
        name: "Mars",
        description: "Known as the Red Planet.\nDiameter = 6794\nYears = 687 Earth Days\nDay = 24 hours 37 min\nTemperature = -120 To 20 Celsius ",
        image: "mars.jpeg"
    },
    {
        name: "Jupiter",
        description: "Diameter = 88,846 miles\nDistance form Sun = 483.5 million miles\nYear = 11.86 Earth years.\nDay = 10 earth hours\nLargest planet in the solar system.",
        image: "jupiter.jpeg"
    },
    {
        name: "Saturn",
        description: "Diameter = 120,540 km\nDistance form Sun = 1 billion 427 million km\nYear = 29.5 Earth years\nDay = 10.5 earth hours\nFamous for its rings.",
        image: "saturn.jpeg"
    },
    {
        name: "Uranus",
        description: "Diameter = 50,724 km\nDistance form Sun = 2.9 billion km\nYear = 84 earth years.\nOrbits on its side.",
        image: "uranus.jpeg"
    },
    {
        name: "Neptune",
        description: "Farthest planet from the Sun.\nDistance from Sun: 4.495 billion km\nDiscovered: 23 September 1846\nLength of day:16 hours 6 minute\nGravity: 11.15 m/s²\nRadius: 24,622 km", 
        image: "neptune.jpeg"
    }
];

const planetImage = document.getElementById('planet-image');
const planetName = document.getElementById('planet-name');
const planetDescription = document.getElementById('planet-description');

let currentPlanetIndex = 0;

function changePlanet() {
    currentPlanetIndex = (currentPlanetIndex + 1) % planets.length;
    planetImage.src = planets[currentPlanetIndex].image;
    planetName.innerText = planets[currentPlanetIndex].name;
    planetDescription.innerText = planets[currentPlanetIndex].description;
}

setInterval(changePlanet, 5000);