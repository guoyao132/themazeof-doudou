import type {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  Clock,
} from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import config from "@/views/config";
import {gsap} from 'gsap'

const {
  containerId,
  ambientLightColor,
  ambientLightIntensity,
  directionalLightColor,
  directionalLightIntensity,
} = config;

class InitThreeScene{
  public scene!: Scene
  public camera!: PerspectiveCamera;
  public container!: HTMLElement;
  public controls!: OrbitControls;
  private renderer!: WebGLRenderer;
  private ambientLight!: AmbientLight;
  private dirLight!: DirectionalLight;
  private isInit: boolean;
  private clock: Clock;
  constructor(){
    this.isInit = false;
    this.clock = new THREE.Clock()
  }

  init(){
    if(this.isInit){
      return;
    }
    this.isInit = true;
    this.container = document.getElementById(containerId)!;
    this.#initCamera();
    this.#initScene();
    this.#initLight();
    this.#initRender();
    this.#initControls();

    window.addEventListener( 'resize', () => {
      this.#onWindowResize(this);
    });
  }

  #initCamera(){
    let camera = new THREE.PerspectiveCamera(60, this.container.clientWidth / this.container.clientHeight, 0.1, 3000000);
    camera.position.set( 10, 5, 20 );
    this.camera = camera;
  }

  changeCamera(position?: number[], target?:number[]){
    if(position){
      gsap.to(this.camera.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 1,
      });
    }
    if(target){
      gsap.to(this.controls.target, {
        x: target[0],
        y: target[1],
        z: target[2],
        duration: 1,
      });
    }

  }

  #initScene(){
    this.scene = new THREE.Scene();
    this.scene.add(this.camera);
  }

  #initLight(){
    this.ambientLight = new THREE.AmbientLight(ambientLightColor, ambientLightIntensity);
    this.scene.add(this.ambientLight);
    const dirLight = new THREE.DirectionalLight( directionalLightColor, directionalLightIntensity );
    dirLight.position.set( -3, 5, 3 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 10;
    dirLight.shadow.camera.right = 9;
    dirLight.shadow.camera.left = - 9;
    dirLight.shadow.camera.top	= 9;
    dirLight.shadow.camera.bottom = - 9;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    this.dirLight = dirLight;
    this.scene.add( this.dirLight );

    const spotLight = new THREE.SpotLight( '#fff', 10 );
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0.2;
    spotLight.position.set( 1, 5, 1 );
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 1000;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    this.scene.add( spotLight );
  }

  changeDirLightShadowSize(size: number){

  }

  changeAmbientLight(color: string, intensity: number){
    this.ambientLight.color = new THREE.Color( color );
    this.ambientLight.intensity = intensity;
  }
  changeDirLight(color: string, intensity: number){
    this.dirLight.color = new THREE.Color( color );
    this.dirLight.intensity = intensity;
  }

  #initRender(){
    let renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.localClippingEnabled = true;
    this.renderer = renderer;
    renderer.setClearAlpha(0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    renderer.shadowMap.enabled = true;
    this.container.appendChild(renderer.domElement);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setAnimationLoop( () => {
      this.#animate({self: this});
    } );
  }

  #animate({self}: { self: InitThreeScene }){
    let delta = this.clock.getDelta()
    self.renderer.render( self.scene, self.camera );
    self.controls?.update(delta);
  }

  addAnimate(){

  }

  #initControls(isDisable = false){
    let controls;
    if(this.controls){
      controls = this.controls;
    }else{
      controls = new OrbitControls(this.camera, this.renderer.domElement);
    }
    controls.minDistance = 1;
    controls.maxDistance = 200000;
    //上下翻转的最小角度
    // controls.minPolarAngle = 0.25;
    // controls.maxPolarAngle = Math.PI / 2;
    //是否允许缩放
    controls.enableZoom = !isDisable;
    controls.enableDamping = !isDisable; // an animation loop is required when either damping or auto-rotation are enabled
    controls.enableRotate = !isDisable;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.enablePan = !isDisable;
    this.controls = controls;
  }

  changeDisableControls(isDisable: boolean){
    this.#initControls(isDisable);
  }

  #onWindowResize(self: InitThreeScene){
    self.camera.aspect = self.container.clientWidth / self.container.clientHeight;

    self.camera.updateProjectionMatrix();

    self.renderer.setSize(self.container.clientWidth, self.container.clientHeight);
  }
}

const initThreeScene = new InitThreeScene();
export default initThreeScene;
