import * as THREE from 'three';

function createGlobe() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('globe').appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(5, 32, 32);

  // Use TextureLoader to load the earth texture
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('img/earth.jpg');

  // Create a material and apply the texture
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

createGlobe();
