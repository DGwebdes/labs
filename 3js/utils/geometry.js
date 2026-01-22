import * as THREE from "three";
import { createMesh } from "./helpers";

// Create a Plane
const planeGeo = new THREE.PlaneGeometry();
const planeMat = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
});
export const plane = createMesh({
    geometry: planeGeo,
    material: planeMat,
    scale: { x: 30, y: 100, z: 1 },
    color: 0x141414,
    name: "plane",
});
plane.rotation.x += Math.PI / 2;

// Create a Geometry
const cubeGeo = new THREE.BoxGeometry();
// Create Box Group
export const boxes = new THREE.Group();
boxes.add(
    createMesh({
        geometry: cubeGeo,
        material: new THREE.MeshBasicMaterial(),
        position: { x: 15, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 100 },
        color: 0xff55ff,
        name: "sidewalls",
    })
);
boxes.add(
    createMesh({
        geometry: cubeGeo,
        material: new THREE.MeshBasicMaterial(),
        position: { x: -15, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 100 },
        color: 0xff55ff,
        name: "sidewalls",
    })
);

export const axesHelper = new THREE.AxesHelper(5);
axesHelper.setColors("red", "green", "blue");

// Create a sine-like wave
const curve = new THREE.SplineCurve([
    new THREE.Vector2(-10, 0),
    new THREE.Vector2(-5, 5),
    new THREE.Vector2(0, 0),
    new THREE.Vector2(5, -5),
    new THREE.Vector2(10, 0),
]);
const points = curve.getPoints(50);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
// Create the final object to add to the scene
export const splineObject = new THREE.Line(geometry, material);