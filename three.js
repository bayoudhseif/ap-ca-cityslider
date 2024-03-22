import * as THREE from 'three';

// Define these variables in a scope accessible throughout the script
let camera, renderer, globeElement;

function createGlobe() {
  globeElement = document.getElementById('globe');
  const width = globeElement.offsetWidth;
  const height = globeElement.offsetHeight;

  const scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  globeElement.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(5, 32, 32);
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('img/earth.jpg');
  const material = new THREE.MeshBasicMaterial({ map: earthTexture });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  camera.position.z = 15;

  function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
}

// Adjust globe size on window resize
window.addEventListener('resize', function () {
  if (!renderer || !camera || !globeElement) return;
  const width = globeElement.offsetWidth;
  const height = globeElement.offsetHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

createGlobe();
