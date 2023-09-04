
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
});


renderer.setPixelRatio(window.devicePixelRatios);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geomtry = new THREE.TorusGeometry( 10, 3 , 16, 100);
const materal = new THREE.MeshNormalMaterial({ color: 0xFF6347, specular: 0xffffff, flatShading: true });

const torusArray = [0,1,2,3].map(() => new THREE.Mesh(geomtry, materal))

torusArray.forEach((torus, index) => {
  torus.position.set(0, 0, index*50+30);
});

torusArray.forEach(torus => scene.add(torus));


function addStar(){
  const geomtry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshNormalMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geomtry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x,y,z)
  scene.add(star)
}

Array(1000).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load("space.jpg")
scene.background = spaceTexture;


function moveCamera(){

  const t = document.body.getBoundingClientRect().top;

  camera.position.z = 30 +  t * -0.05
  camera.position.y = 0
  camera.position.x = 0

}


function animate(){
  requestAnimationFrame(animate);

  torusArray.forEach( torus => torus.rotation.x+=0.01);

  renderer.render(scene, camera);

}

animate();

document.addEventListener('DOMContentLoaded', function() {
  document.body.onscroll = moveCamera;
});