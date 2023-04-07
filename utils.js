import * as THREE from "three";

/* ------------------------------ Creating Mesh Function ------------------------------ */
export const creatMesh = ({
  name = "",
  x = 0,
  y = 0,
  z = 0,
  xOffset = 0,
  yOffset = 0,
  zOffset = 0,
  castShadow = false,
  material = {},
  receiveShadow = false,
}) => {
  const geometry = new THREE.BoxGeometry(x, y, z);
  const materials = new THREE.MeshBasicMaterial( material );
  const mesh = new THREE.Mesh(geometry, materials);
  mesh.name = name;
  mesh.position.set(xOffset, yOffset, zOffset);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = receiveShadow;
  return mesh;
};

/* ------------------------------ Add Cross Function ------------------------------ */
export const addCross = (xOffset, yOffset) => {
  const cross = new THREE.Group();
  const crossGeometry = new THREE.BoxGeometry(2.4, 0.5, 0.3);
  const crossMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
  });
  const cross1 = new THREE.Mesh(crossGeometry, crossMaterial);
  const cross2 = new THREE.Mesh(crossGeometry, crossMaterial);
  cross1.rotation.z = Math.PI / 4;
  cross2.rotation.z = -Math.PI / 4;
  cross1.castShadow = true;
  cross2.castShadow = true;
  cross.add(cross1, cross2);
  cross.position.set(xOffset, yOffset, .8)
  // add for animation
  cross.scale.set(0,0,0);
  return cross;
};

/* ------------------------------ Add Circle Function ------------------------------ */
export const addCircle = (xOffset, yOffset) => {
  const r = 0.8;
  const height = 0.3;
  const cylinderGeometry = new THREE.TorusGeometry(0.8, 0.4, 10, 100)
  const cylinderMaterial = new THREE.MeshBasicMaterial({
    color : 0xfad049,
  });
  const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  cylinder.position.set(xOffset, yOffset, .8)
//   cylinder.rotation.x = Math.PI / 2;
  cylinder.castShadow = true;
  // add for animation
  cylinder.scale.set(0,0,0);
  return cylinder;
};

/* ------------------------------ placementAxies Function ------------------------------ */
export const placementAxies = [
  {
    x: -3.8,
    y: 3.8,
    axis : [0,0],
    value: "one",
  },
  {
    x: 0,
    y: 3.8,
    axis : [0,1],
    value: "two",
  },
  {
    x: 3.8,
    y: 3.8,
    axis : [0,2],
    value: "three",
  },
  {
    x: -3.8,
    y: 0,
    axis : [1,0],
    value: "four",
  },
  {
    x: 0,
    y: 0,
    axis : [1,1],
    value: "five",
  },
  {
    x: 3.8,
    y: 0,
    axis : [1,2],
    value: "six",
  },
  {
    x: -3.8,
    y: -3.8,
    axis : [2,0],
    value: "seven",
  },
  {
    x: 0,
    y: -3.8,
    axis : [2,1],
    value: "eight",
  },
  {
    x: 3.8,
    y: -3.8,
    axis : [2,2],
    value: "nine",
  },
];

/* ------------------------------ boxMatric Function ------------------------------ */
export let boxMatrix =  [
    [1,2,3],
    [4,5,6],
    [7,8,9],
]

/* ------------------------------ ScaleUp Function ------------------------------ */
export const scaleUp = (obj) => {
  if (obj.scale.x < 1) {
    obj.scale.x += 0.04;
  }
  if (obj.scale.y < 1) {
    obj.scale.y += 0.04;
  }
  if (obj.scale.z < 1) {
    obj.scale.z += 0.04;
  }
};
