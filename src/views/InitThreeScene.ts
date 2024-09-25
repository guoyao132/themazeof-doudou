import type {Camera, Scene, WebGLRenderer} from 'three'
import * as THREE from 'three'
import config from "@/views/config";

const {
  containerId,
  ambientLightColor,
  ambientLightIntensity
} = config;

class InitThreeScene{
  scene: Scene
  camera: Camera;
  renderer: WebGLRenderer;
  container: HTMLElement;
  constructor(){
    this.scene = {} as Scene;
    this.camera = {} as Camera;
    this.renderer = {} as WebGLRenderer;
    this.container = document.getElementById(containerId)!;
    this.initCamera();
    this.initScene();
    this.initLight();
    this.initRender();

    window.addEventListener( 'resize', this.onWindowResize);

  }
  initCamera(){
    let camera = new THREE.PerspectiveCamera(60, this.container.clientWidth / this.container.clientHeight, 0.1, 3000000);
    camera.up.set(0, 1, 0);
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, 0);
    this.camera = camera;
  }
  initScene(){
    this.scene = new THREE.Scene();
    this.scene.add(this.camera);
  }

  initLight(){
    let ambientLight = new THREE.AmbientLight(ambientLightColor, ambientLightIntensity);
    this.scene && this.scene.add(ambientLight);
  }

  initRender(){
    let renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.localClippingEnabled = true;
    this.renderer = renderer;
    renderer.setClearAlpha(0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.container.appendChild(renderer.domElement);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setAnimationLoop( () => {
      this.animate(this);
    } );




    const localPlane = new THREE.Plane( new THREE.Vector3( 0, - 1, 0 ), 0.8 );

    // Geometry

    const material = new THREE.MeshPhongMaterial( {
      color: 0x80ee10,
      shininess: 100,
      side: THREE.DoubleSide,

      // ***** Clipping setup (material): *****
      clippingPlanes: [ localPlane ],
      clipShadows: true,

      alphaToCoverage: true,

    } );

    const geometry = new THREE.TorusKnotGeometry( 0.4, 0.08, 95, 20 );

    const object = new THREE.Mesh( geometry, material );
    object.castShadow = true;
    this.scene.add( object );

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry( 9, 9, 1, 1 ),
      new THREE.MeshPhongMaterial( { color: 0xa0adaf, shininess: 150 } )
    );

    ground.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
    ground.receiveShadow = true;
    this.scene.add( ground );
  }
  animate(self){
    requestAnimationFrame( () => {
      self.animate(self)
    } );

    self.renderer.render( self.scene, self.camera );
  }

  onWindowResize(){
    this.camera.aspect = this.container.innerWidth / this.container.innerHeight;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize( this.container.innerWidth, this.container.innerHeight );
  }
}

export default InitThreeScene;
