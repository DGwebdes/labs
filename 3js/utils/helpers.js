import * as THREE from "three";

function coordinates(nX, wX, nY, wY) {
    return new THREE.Vector2((nX / wX) * 2 - 1, -((nY / wY) * 2 - 1));
}

function changeColor(r, g, b) {
    return new THREE.Color(r, g, b);
}

function createMesh({
  geometry,
  material,
  position = { x: 0, y: 0, z: 0 },
  scale = { x: 0, y: 0, z: 0 },
  color = 0xfff,
  side,
  name = "new Mesh",
  layer,
}) {
  if (!geometry) throw new Error("Geometry Required!");

  const passMaterial = material
    ? material.clone()
    : new THREE.MeshBasicMaterial();

  if (color !== undefined) passMaterial.color.set(color);

  if (side !== undefined) passMaterial.side.set(side);

  const mesh = new THREE.Mesh(geometry, passMaterial);

  mesh.position.set(position.x, position.y, position.z);
  mesh.scale.set(scale.x, scale.y, scale.z);

  mesh.name = name;
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  if (layer !== undefined) {
    mesh.layers.set(layer);
  }

  return mesh;
}

export { coordinates, changeColor, createMesh };
