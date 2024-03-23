import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera, renderer, globeElement;

function calculateCameraPosition(lat, lng, distance = 20) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180); // Adjusted longitude for correct orientation

  return {
    x: -(distance * Math.sin(phi) * Math.cos(theta)),
    y: distance * Math.cos(phi),
    z: distance * Math.sin(phi) * Math.sin(theta),
  };
}

export function createGlobe() {
  globeElement = document.getElementById('globe');
  const width = globeElement.offsetWidth;
  const height = globeElement.offsetHeight;

  camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
  camera.up.set(0, 1, 0); // Ensure the camera's 'up' is correctly oriented

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(width, height);
  globeElement.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const geometry = new THREE.SphereGeometry(5, 64, 64); // Increased detail
  const textureLoader = new THREE.TextureLoader();
  const globeTexture = textureLoader.load('img/earth6.jpg');
  const material = new THREE.MeshBasicMaterial({ map: globeTexture });
  const globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  // Add markers for each city
  const cities = {
    Paris: { lat: 48.8566, lng: 2.3522 },
    SaoPaulo: { lat: -23.5505, lng: -46.6333 },
    Sydney: { lat: -33.8688, lng: 151.2093 },
    Tokyo: { lat: 35.6895, lng: 139.6917 },
    Tunis: { lat: 36.8065, lng: 10.1815 },
  };

  const markerGeometry = new THREE.SphereGeometry(0.15, 32, 32); // Marker size
  const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  Object.values(cities).forEach(({ lat, lng }) => {
    const position = calculateCameraPosition(lat, lng, 5);
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    marker.position.set(position.x, position.y, position.z);
    scene.add(marker);
  });

  camera.position.z = 20; // Set an initial position for the camera

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Enable damping (inertia), which can make controls feel more natural
  controls.dampingFactor = 0.05;
  controls.minDistance = 10; // Set minimum distance for zooming in
  controls.maxDistance = 50; // Set maximum distance for zooming out

  function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Only required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.render(scene, camera);
  }

  animate();
}

export function updateGlobeView(cityName) {
  const cities = {
    Paris: { lat: 48.8566, lng: 2.3522 },
    SaoPaulo: { lat: -23.5505, lng: -46.6333 },
    Sydney: { lat: -33.8688, lng: 151.2093 },
    Tokyo: { lat: 35.6895, lng: 139.6917 },
    Tunis: { lat: 36.8065, lng: 10.1815 },
  };

  const city = cities[cityName.replace(/\s+/g, '')];
  if (city) {
    const position = calculateCameraPosition(city.lat, city.lng);
    camera.position.set(position.x, position.y, position.z);
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // Ensure camera is always looking at the center of the globe
  }
}
