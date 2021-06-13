import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MeshStandardMaterial } from "three";

const scene = new THREE.Scene();

const camara = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camara.position.setZ(0); //------ change to 0 when not using grid view

renderer.render(scene, camara);

const donutTexture = new THREE.TextureLoader().load("donut3.jpg");

const geometry = new THREE.TorusGeometry(9, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  map: donutTexture,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

torus.position.z = -20;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camara, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// function addDimond() {
//   const geometry = new THREE.ConeGeometry(1, 3, 5);
//   const material = new THREE.MeshStandardMaterial({ color: "blue" });
//   const dimond = new THREE.Mesh(geometry, material);

//   const [x, y, z] = Array(3)
//     .fill()
//     .map(() => THREE.MathUtils.randFloatSpread(50));

//   dimond.position.set(x, y, z);
//   scene.add(dimond);
// }

// Array(300).fill().forEach(addDimond);

const spaceTexture = new THREE.TextureLoader().load("space2.jpg");
scene.background = spaceTexture;

//avatar
const abdaelTexture = new THREE.TextureLoader().load("abdael2.jpg");

const abdael = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial({ map: abdaelTexture })
);
scene.add(abdael);

abdael.position.z = -20;

//-------------------------------------------------------------------------------mars

const marsTexture = new THREE.TextureLoader().load("mars2.jpg");
const marsActualTexture = new THREE.TextureLoader().load("marsTexture.jpg");

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: marsActualTexture,
  })
);
scene.add(mars);

mars.position.z = 33;
mars.position.x = -2;

//-------------------------------------------------------------------------------- end mars

//----------------------------------------------------------------- earth

const earthTexture = new THREE.TextureLoader().load("earth.jpg");

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({ map: earthTexture })
);
scene.add(earth);

earth.position.z = 20;
// earth.position.setX = -20;

//----------------------------------------------------------------- end earth

//----------------------------------------------------------------- Venus

const venusTexture = new THREE.TextureLoader().load("venus.jpg");

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(2, 29, 29),
  new THREE.MeshStandardMaterial({ map: venusTexture })
);
scene.add(venus);
venus.position.z = 10;
venus.position.x = 3.5;

//----------------------------------------------------------------- end Venus

//------------------------------------------------------------------- Mercury

const mercuryTexture = new THREE.TextureLoader().load("mercury.jpg");

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(2, 29, 29),
  new THREE.MeshStandardMaterial({ map: mercuryTexture })
);
scene.add(mercury);

mercury.position.z = -1;
mercury.position.x = 5;

//--------------------------------------------------------------------end Mercury

//--------------------------------------------------------------------Jupiter
const jupiterTexture = new THREE.TextureLoader().load("jupiter.jpg");

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(5, 30, 30),
  new THREE.MeshStandardMaterial({ map: jupiterTexture })
);
scene.add(jupiter);

jupiter.position.z = 46;
jupiter.position.x = -6;
//--------------------------------------------------------------------end Jupiter

const happyFace = new THREE.TextureLoader().load("smile.jpg");

const smile = new THREE.Mesh(
  new THREE.SphereGeometry(3, 25, 25),
  new THREE.MeshBasicMaterial({ map: happyFace })
);
scene.add(smile);

smile.position.z = 55;
smile.position.x = -13;
smile.position.y = 5;
function moveCamara() {
  const t = document.body.getBoundingClientRect().top;
  mars.rotation.x += 0.05;
  mars.rotation.y += 0.05;
  mars.rotation.z += 0.05;

  earth.rotation.x += 0.05;
  earth.rotation.y += 0.05;
  earth.rotation.z += 0.05;

  venus.rotation.x += 0.05;
  venus.rotation.y += 0.05;
  venus.rotation.z += 0.05;

  mercury.rotation.x += 0.05;
  mercury.rotation.y += 0.05;
  mercury.rotation.z += 0.05;

  jupiter.rotation.x += 0.05;
  jupiter.rotation.y += 0.05;
  jupiter.rotation.z += 0.05;

  camara.position.z = t * -0.015; //------ actual -0.01:
  camara.position.x = t * -0.003; //---- 3 or 42?
  camara.position.y = t * -0.003; //---- 3 or 42?
}

document.body.onscroll = moveCamara;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  smile.rotation.y += 0.005;
  smile.rotation.z += 0.01;
  smile.rotation.x += 0.01;
  controls.update();

  renderer.render(scene, camara);
}

animate();
