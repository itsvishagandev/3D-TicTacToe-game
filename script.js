import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/* ------------------------------ util Functions ------------------------------ */
import {
  creatMesh,
  addCross,
  addCircle,
  placementAxies,
//   boxMatrix,
  scaleUp,
} from "./utils.js";

const canvas = document.querySelector(".webgl");
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  radio: window.innerWidth / window.innerHeight,
};

/* ------------------------------ Group creation ------------------------------ */
/* ----------- start Menu Group ----------- */
const menuGroup =  new THREE.Group();
const playerBtnGroup = new THREE.Group();

/* ----------- game Group ----------- */
const gameGroup = new THREE.Group();
// board meshes
const boardGroup = new THREE.Group();
const board = new THREE.Group();
const hiddenTiles = new THREE.Group();
const playerGroup = new THREE.Group();
let crossMesh;
// Profile Meshes
const profileGroup = new THREE.Group();

/* ------------------------------ Loading textures ------------------------------ */
const loader = new THREE.TextureLoader();
// textures
const backgroup = loader.load('./assets/textures/purple.jpg');
// logo
const logo = loader.load('./assets/textures/logo.jpg');
const spBtn = loader.load('./assets/textures/singlePlayer-btn.jpg');
const mpBtn = loader.load('./assets/textures/multiPlayer-btn.jpg');

// Board Image
const boardImage = loader.load('./assets/textures/boardImage.png');
const backBtn = loader.load('./assets/textures/backBtn.png');
// Profile 
const userProfile = loader.load('./assets/textures/userProfile.png');
const botProfile = loader.load('./assets/textures/botProfile.png');
// Result
const wonstricker = loader.load('./assets/textures/wonStricker.png');
const drawstricker = loader.load('./assets/textures/drawStricker.png');
const retryBtn = loader.load('./assets/textures/retryBtn.png');


/* ------------------------------ Render basic properties ------------------------------ */
// SCENE
const scene = new THREE.Scene();
// LIGHT
const light = new THREE.DirectionalLight(0xffffff, 1);
light.castShadow = true;
light.position.set(0, 20, 20);
scene.add(light);
// ADDING AMBIENTLIGHT
scene.add(new THREE.AmbientLight(0xffffff, 0.2));
// CAMERA
const camera = new THREE.PerspectiveCamera(72, sizes.radio, 0.1, 1000);
camera.position.set(0, 0, 18);
scene.add(camera);
// CONTROL
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.25;   //damping inertia
controls.enableZoom = true;      //Zooming
controls.maxPolarAngle = Math.PI / 2; // Limit angle of visibility
// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;


/* ------------------------------ Background Plain for Game ------------------------------ */
const backgroundPlain = creatMesh(
    {
        x : 12,
        y: 20,
        z : 0.1,
        material : {
            map: backgroup,
            transparent: true,
        }
    }
)
scene.add(backgroundPlain);

/* ------------------------------ start Menu Creation ------------------------------ */

const logoMesh = creatMesh(
    {
        x : 8,
        y: 8,
        z : 0.2,
        yOffset: 4.5,
        material : {
            map: logo,
            transparent: true,
        }
    }
)
menuGroup.add(logoMesh);

const singlePlayerBtn = creatMesh(
    {
        x : 8,
        y: 2,
        z : 0.2,
        material : {
            map: spBtn,
            transparent: true,
        }
    }
)
const multiPlayerBtn = creatMesh(
    {
        x : 8,
        y: 2,
        z : 0.2,
        yOffset: -3,
        material : {
            map: mpBtn,
            transparent: true,
        }
    }
)

playerBtnGroup.add(singlePlayerBtn,multiPlayerBtn)
playerBtnGroup.position.y = -3;
// 3d effect
menuGroup.position.z = .8;
menuGroup.add(playerBtnGroup)

/* ------------------------------ Game Mesh Creation ------------------------------ */
// Back button
const backBtnMesh = creatMesh(
    {
        name : "backbtn",
        x : 1.2,
        y: 1,
        z : 0,
        xOffset: -4,
        yOffset: 8.5,
        zOffset: .8,
        material : {
            map: backBtn,
            transparent: true,
        }
    }
)
gameGroup.add(backBtnMesh);

// retry Button
const retryBtnMesh = new THREE.Mesh(
    new THREE.CircleGeometry(1, 50),
    new THREE.MeshStandardMaterial({ map: retryBtn })
)
retryBtnMesh.position.set(0, -8, .9); 
retryBtnMesh.scale.set(0,0,0);
gameGroup.add(retryBtnMesh);

//Project group
const userProfileMesh = creatMesh(
    {
        x : 3,
        y: 4,
        xOffset: -2.6,
        material : {
            map: userProfile,
            transparent: true,
        }
    }
)
const botProfileMesh = creatMesh(
    {
        x : 3,
        y: 4,
        xOffset: 2.6,
        material : {
            map: botProfile,
            transparent: true,
        }
    }
)
profileGroup.add(userProfileMesh,botProfileMesh);
profileGroup.position.set(0,5.5,.8); 

// boardPlain
const boardPlain = creatMesh(
    {
        x : 10.5,
        y: 10.5,
        zOffset: .8,
        material : {
            map: boardImage,
            transparent: true,
        }
    }
)
boardGroup.add(boardPlain);
boardGroup.position.y = -3; // boardGroup

/* ------------------------------ Adding HiddenTile Function ------------------------------ */
const addingHiddenTile = () => {
placementAxies.forEach((ele, index) => {
  const tile = creatMesh({
    name: index,
    x: 3,
    y: 3,
    z: 0,
    xOffset: ele.x / 1.1,
    yOffset: ele.y / 1.1,
    zOffset: 0.3,
    material: {
      color: "#0x0000ff",
      transparent: true,
      opacity: 0,
    },
  });
  hiddenTiles.add(tile);
});
board.add(hiddenTiles);
}
addingHiddenTile();

/* ------------------------------ Adding CrossOrCircle Function ------------------------------ */
let player = "0";
export let boxMatrix =  [
    [1,2,3],
    [4,5,6],
    [7,8,9],
]
const addCrossOrCircle = (xOffset, yOffset, id) => {
  player = player == "x" ? "o" : "x";
  if (player == "x") {
    playerGroup.add(addCross(xOffset, yOffset));
  } else if (player == "o") {
    playerGroup.add(addCircle(xOffset, yOffset));
  }
  board.add(playerGroup);
  // modify the boxMatrix Value
  boxMatrix[placementAxies[id].axis[0]][placementAxies[id].axis[1]] = player;
};

/* ------------------------------ checkWinConditions Function ------------------------------ */
const checkWinConditions = () => {
  // check row
  const row1 =
    boxMatrix[0][0] + boxMatrix[0][1] + boxMatrix[0][2] == "xxx" ||
    boxMatrix[0][0] + boxMatrix[0][1] + boxMatrix[0][2] == "ooo";
  const row2 =
    boxMatrix[1][0] + boxMatrix[1][1] + boxMatrix[1][2] == "xxx" ||
    boxMatrix[1][0] + boxMatrix[1][1] + boxMatrix[1][2] == "ooo";
  const row3 =
    boxMatrix[2][0] + boxMatrix[2][1] + boxMatrix[2][2] == "xxx" ||
    boxMatrix[2][0] + boxMatrix[2][1] + boxMatrix[2][2] == "ooo";
  // check Column
  const col1 =
    boxMatrix[0][0] + boxMatrix[1][0] + boxMatrix[2][0] == "xxx" ||
    boxMatrix[0][0] + boxMatrix[1][0] + boxMatrix[2][0] == "ooo";
  const col2 =
    boxMatrix[0][1] + boxMatrix[1][1] + boxMatrix[2][1] == "xxx" ||
    boxMatrix[0][1] + boxMatrix[1][1] + boxMatrix[2][1] == "ooo";
  const col3 =
    boxMatrix[0][2] + boxMatrix[1][2] + boxMatrix[2][2] == "xxx" ||
    boxMatrix[0][2] + boxMatrix[1][2] + boxMatrix[2][2] == "ooo";
  // check diagonal
  const diagonalRight =
    boxMatrix[0][0] + boxMatrix[1][1] + boxMatrix[2][2] == "xxx" ||
    boxMatrix[0][0] + boxMatrix[1][1] + boxMatrix[2][2] == "ooo";
  const diagonalLeft =
    boxMatrix[0][2] + boxMatrix[1][1] + boxMatrix[2][0] == "xxx" ||
    boxMatrix[0][2] + boxMatrix[1][1] + boxMatrix[2][0] == "ooo";

  const row = row1 || row2 || row3;
  const col = col1 || col2 || col3;
  const diagonal = diagonalRight || diagonalLeft;


  if (row || col || diagonal) {
    // validate position of cross
    if (row) {
      // create mesh
      crossMesh = creatMesh({
        x: 8.5,
        y: 0.1,
        z: 0,
        castShadow: true,
      });
      // positioning
      row1 ? crossMesh.position.y = 3.4 : row2 ? crossMesh.position.y = 0.3 : crossMesh.position.y = -3;
    }
    else if(col) {
      // create mesh
      crossMesh = creatMesh({
        x: 0.1,
        y: 8.5,
        z: 0,
        castShadow: true,
      });
      // positioning
      col1 ? crossMesh.position.x = -3.2 : col2 ? crossMesh.position.x = 0 : crossMesh.position.x = 3.2;
    }
    else {
      // create mesh
      crossMesh = creatMesh({
        x: 8.5,
        y: 0.1,
        z: 0,
        castShadow: true,
      });
      // positioning
      diagonalRight ? crossMesh.rotation.z = -Math.PI / 4 : crossMesh.rotation.z = Math.PI / 4;
    }
    // Add cross to the scene
    crossMesh.scale.set(0,0,0);
    crossMesh.position.z = 2;
    crossMesh.material.color = new THREE.Color(0xeb3a51)
    board.add(crossMesh);
    hiddenTiles.children = [];
    setTimeout(() => {
        board.children = [];
        boardPlain.material.map = wonstricker;
        retryBtnMesh.scale.set(1,1,1)
    },1000)
  }
  else if(hiddenTiles.children.length == 1) {
    setTimeout(() => {
        board.children = [];
        boardPlain.material.map = drawstricker;
        retryBtnMesh.scale.set(1,1,1)
    },1000)
  } 
  return false;
};

/* ------------------------------ Adding to scene ------------------------------ */
// boardGroup
boardGroup.add(board); // Board
// gameGroup 
gameGroup.add(profileGroup)
gameGroup.add(boardGroup)

// initially Adding menu mesh group to the scene
scene.add(menuGroup);

/* ------------------------------ handleNavigation ------------------------------ */
const handleNavigation = (status) => {
    switch(status) {
        case "startGame":
            scene.remove(menuGroup)
            scene.add(gameGroup);
            break;
        case "BackToMenu":
            handleNavigation("gameReset");
            scene.remove(gameGroup);
            scene.add(menuGroup);
            break;
        case "gameReset" :
            boardPlain.material.map = boardImage;
            retryBtnMesh.scale.set(0,0,0);
            player = "0";
            playerGroup.children = [];
            boxMatrix = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ]
            addingHiddenTile();
            break;
    }
}

/* ------------------------------ Handle Mouse Events ------------------------------ */
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
function onMouseDown(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  // clcik event form Hiddentiles  
  const titleObject = raycaster.intersectObjects(hiddenTiles.children);
  if (titleObject.length > 0) {
    const xOffset = titleObject[0].object.position.x;
    const yOffset = titleObject[0].object.position.y;
    const id = titleObject[0].object.name;
    // add x & o
    addCrossOrCircle(xOffset, yOffset, id);
    checkWinConditions();
    const index = hiddenTiles.children.findIndex(
      (c) => c.uuid === titleObject[0].object.uuid
    );
    hiddenTiles.children.splice(index, 1);
  }

  // click for startGame
  const startBtnObject = raycaster.intersectObjects([singlePlayerBtn,multiPlayerBtn]);
  if(startBtnObject.length > 0) {
    handleNavigation("startGame");
  }

  // back to menu
  const backBtnObject = raycaster.intersectObjects([backBtnMesh]);
  if(backBtnObject.length > 0) {
    handleNavigation("BackToMenu");
  }

  // click for retry button
  const retryBtnObject = raycaster.intersectObjects([retryBtnMesh]);
  if(retryBtnObject.length > 0) {
    handleNavigation("gameReset");
  }
}
window.addEventListener("mousedown", onMouseDown, false);

/* ------------------------------ Animate per Frame ------------------------------ */
function animate() {
  playerGroup.children.forEach(scaleUp);
  crossMesh && scaleUp(crossMesh)
  renderer.render(scene, camera);
  const animateId = requestAnimationFrame(animate);
}
animate();
