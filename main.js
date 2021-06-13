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

const spaceTexture = new THREE.TextureLoader().load(
  "https://coolwallpapers.me/picsup/3115090-astronomy_astrophotography_black_constellation_dark_exploration_galaxy_infinity_light_milky-way_sky_space_starry_stars_universe.jpg"
);
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
const marsActualTexture = new THREE.TextureLoader().load(
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9b7029c3-9717-4658-9066-11c30aa24029/dcsauye-ba810e63-20e3-4ae9-a73c-9201ed87e67d.png/v1/fill/w_1280,h_640,q_80,strp/mars_texture_map__rare_version__by_oleg_pluton_dcsauye-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjQwIiwicGF0aCI6IlwvZlwvOWI3MDI5YzMtOTcxNy00NjU4LTkwNjYtMTFjMzBhYTI0MDI5XC9kY3NhdXllLWJhODEwZTYzLTIwZTMtNGFlOS1hNzNjLTkyMDFlZDg3ZTY3ZC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.bVzQQe3M_FRJKATXUZN-hTsjTNL7-eucoxqWhgYKkvA"
);

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

const earthTexture = new THREE.TextureLoader().load(
  "https://64.media.tumblr.com/e813d5e612df4113114bf3d6c0cc2c2e/f83034b2e7e68519-f9/s1280x1920/e2d30d1b658e50312463ca8ff5bf4bde6aab3f81.jpg"
);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({ map: earthTexture })
);
scene.add(earth);

earth.position.z = 20;
// earth.position.setX = -20;

//----------------------------------------------------------------- end earth

//----------------------------------------------------------------- Venus

const venusTexture = new THREE.TextureLoader().load(
  "https://supernova.eso.org/static/archives/exhibitionimages/screen/Venus-map-Mariner-artwork-10x5k-CC2.jpg"
);

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(2, 29, 29),
  new THREE.MeshStandardMaterial({ map: venusTexture })
);
scene.add(venus);
venus.position.z = 10;
venus.position.x = 3.5;

//----------------------------------------------------------------- end Venus

//------------------------------------------------------------------- Mercury

const mercuryTexture = new THREE.TextureLoader().load(
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL3OhcqweterQDnTsSgKP36p94BwjD-Wt_PXTNBx8XnSWVVEQmGBrv7rOwVE8wqZyO4bM&usqp=CAU"
);

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(2, 29, 29),
  new THREE.MeshStandardMaterial({ map: mercuryTexture })
);
scene.add(mercury);

mercury.position.z = -1;
mercury.position.x = 5;

//--------------------------------------------------------------------end Mercury

//--------------------------------------------------------------------Jupiter
const jupiterTexture = new THREE.TextureLoader().load(
  "data:image/jpeg;base64,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"
);

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(5, 30, 30),
  new THREE.MeshStandardMaterial({ map: jupiterTexture })
);
scene.add(jupiter);

jupiter.position.z = 46;
jupiter.position.x = -6;
//--------------------------------------------------------------------end Jupiter

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

  controls.update();

  renderer.render(scene, camara);
}

animate();
