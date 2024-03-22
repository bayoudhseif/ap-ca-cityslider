import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera, renderer, globeElement;

function createGlobe() {
  globeElement = document.getElementById('globe');
  const width = globeElement.offsetWidth;
  const height = globeElement.offsetHeight;

  const scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparent background
  renderer.setSize(width, height);
  renderer.setClearAlpha(0); // Set clear alpha to 0 for full transparency
  globeElement.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(5, 32, 32);
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('img/earth.jpg');
  const material = new THREE.MeshBasicMaterial({ map: earthTexture });
  const globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  camera.position.z = 15;

  // Cities coordinates
  const cities = {
    Paris: { lat: 48.8566, lng: 2.3522 },
    SaoPaulo: { lat: -23.5505, lng: -46.6333 },
    Sydney: { lat: -33.8688, lng: 151.2093 },
    Tokyo: { lat: 35.6895, lng: 139.6917 },
    Tunis: { lat: 36.8065, lng: 10.1815 },
  };

  // Add markers for each city
  Object.keys(cities).forEach((city) => {
    const marker = createMarker(cities[city].lat, cities[city].lng, 5); // Radius of 5 is the globe's radius
    scene.add(marker);
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 10;
  controls.maxDistance = 50;
  controls.maxPolarAngle = Math.PI / 2;

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}

function createMarker(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  const markerGeometry = new THREE.SphereGeometry(0.1, 32, 32); // Small sphere as a marker
  const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);

  marker.position.set(x, y, z);

  return marker;
}

createGlobe();
