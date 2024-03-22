import * as THREE from 'three';

function createGlobe() {
  // Select the globe's container and determine its size
  const globeElement = document.getElementById('globe');
  const width = globeElement.offsetWidth;
  const height = globeElement.offsetHeight;

  // Scene setup
  const scene = new THREE.Scene();

  // Camera setup
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

  // Renderer setup
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  globeElement.appendChild(renderer.domElement);

  // Globe geometry
  const geometry = new THREE.SphereGeometry(5, 32, 32);

  // Texture loading
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('img/earth.jpg');

  // Material setup with texture
  const material = new THREE.MeshBasicMaterial({ map: earthTexture });

  // Mesh setup
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Camera position
  camera.position.z = 15;

  // Animation function
  function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();

  // Resize listener to adjust the camera and renderer on window resize
  window.addEventListener('resize', () => {
    const width = globeElement.offsetWidth;
    const height = globeElement.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
}

createGlobe();
