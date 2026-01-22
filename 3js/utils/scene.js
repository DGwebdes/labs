import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export const scene = new THREE.Scene();

// Camera Configurations
const FOV = 75;
const width = window.innerWidth;
const height = window.innerHeight;
const near = 0.1;
const far = 1000;
// Set Camera
export const camera = new THREE.PerspectiveCamera(
    FOV,
    width / height,
    near,
    far,
);
camera.position.z = 5;
camera.position.y = 5;

// Set Lighting
const color = 0xfff;
const intensity = 1;
export const light = new THREE.AmbientLight(color, intensity);
export const dirLight = new THREE.DirectionalLight(color, intensity);

// Initialize Renderer
export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);

// Initialize Orbit Controls and Configure it
export const controls = new OrbitControls(camera, renderer.domElement);
controls.minPolarAngle = 0.8;
controls.maxPolarAngle = 1.5;
controls.minAzimuthAngle = -Math.PI / 2;
controls.maxAzimuthAngle = Math.PI / 2;
controls.enablePan = false;
controls.maxDistance = 100; // Magic numbers it is
controls.minDistance = 3;
controls.autoRotate = false;
controls.enableDamping = true;
// controls.enableZoom = false;

// Initializing RayCaster and Intersections Listeners
export const raycast = new THREE.Raycaster();
