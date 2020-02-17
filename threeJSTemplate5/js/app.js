// these needs to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;
let mesh;

function init(){

   container = document.querySelector( '#scene-container' );

// Everything shifted to Functions.
   createScene();
   createCamera();
   createControls();
   createLights();
   createMeshes();
   createRenderer();
//
   renderer.setAnimationLoop(() => {
      update();
      render();
   });
   // /
}

function createScene(){
   scene = new THREE.Scene();
   // scene.background = new THREE.Color( 0x000000 );
   const loader = new THREE.TextureLoader();
   var bgTexture = loader.load( 'universe3.jpg' );
   scene.background = bgTexture;
   bgTexture.wrapS = bgTexture.wrapT = THREE.RepeatWrapping;
}
function createCamera(){
   camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 0.1, 1000);
   camera.position.set( 0, 0, 10);
}
// OrbitControls
function createControls(){
   controls = new THREE.OrbitControls( camera, container);
}
function createLights(){
   const ambientLight = new THREE.AmbientLight( 0xFFFFFF, 30.0 );
   scene.add( ambientLight );
   const mainLight = new THREE.DirectionalLight( 0xFFFFFF, 0.3 );
   mainLight.position.set( 10, 10, 10);
   scene.add(mainLight);
   /*
   const hemisphereLight = new THREE.HemisphereLight( 0xddeeff, 0x202020, 5 );
   const mainLight = new THREE.DirectionalLight( 0xFFFFFF, 5);
   mainLight.position.set( 10, 10, 10);
   scene.add( hemisphereLight, mainLight );
   */
}
function createMeshes(){
   var texture = new THREE.TextureLoader().load( 'earthmirror.jpg' );
   /*
   texture.wrapS = THREE.RepeatWrapping;
   texture.repeat.x = -1;
   */
   texture.encoding = THREE.sRGBEncoding;
   texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
   texture.anisotropy = 16;

   const geometry = new THREE.SphereBufferGeometry( 2, 300, 300);
   const material = new THREE.MeshStandardMaterial( {map: texture, } );

   mesh = new THREE.Mesh( geometry, material);
   scene.add(mesh);
}
function createRenderer(){
   renderer = new THREE.WebGLRenderer( {antialias:true, container, alpha: true} );
   renderer.setSize( container.clientWidth, container.clientHeight);
   renderer.setPixelRatio( window.devicePixelRatio);

   renderer.gammaFactor = 2.2;
   renderer.gammaOutput = false;

   // allow us to use real world lighting units in our lighting setup
   renderer.physicallyCorrectLights = false;

   container.appendChild( renderer.domElement);
}
//

function update(){
   mesh.rotation.z += 0.001;
   // mesh.rotation.x += 0.001;
   mesh.rotation.y -= 0.001;
}

function render(){
   renderer.render( scene, camera);
}

function onWindowResize(){
   // set the aspect ratio to match the new browser window aspect ratio
   camera.aspect = container.clientWidth / container.clientHeight;
   // update the camera's frustrum
   camera.updateProjectionMatrix(); // don't found any need
   // update the size of the renderer and the canvas
   renderer.setSize( container.clientWidth, container.clientHeight);
}
window.addEventListener( 'resize', onWindowResize);

init();
