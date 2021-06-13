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

const donutTexture = new THREE.TextureLoader().load(
  "https://thumbs.dreamstime.com/b/pink-sweet-melting-icing-colorful-colorful-sugar-pearls-pink-sweet-melting-icing-colorful-colorful-sugar-155499807.jpg"
);

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
const abdaelTexture = new THREE.TextureLoader().load(
  "data:image/jpeg;base64,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"
);

const abdael = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial({ map: abdaelTexture })
);
scene.add(abdael);

abdael.position.z = -20;

//-------------------------------------------------------------------------------mars

const marsTexture = new THREE.TextureLoader().load(
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9b7029c3-9717-4658-9066-11c30aa24029/dcsauye-ba810e63-20e3-4ae9-a73c-9201ed87e67d.png/v1/fill/w_1280,h_640,q_80,strp/mars_texture_map__rare_version__by_oleg_pluton_dcsauye-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjQwIiwicGF0aCI6IlwvZlwvOWI3MDI5YzMtOTcxNy00NjU4LTkwNjYtMTFjMzBhYTI0MDI5XC9kY3NhdXllLWJhODEwZTYzLTIwZTMtNGFlOS1hNzNjLTkyMDFlZDg3ZTY3ZC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.bVzQQe3M_FRJKATXUZN-hTsjTNL7-eucoxqWhgYKkvA"
);
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
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
