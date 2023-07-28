import GUI from "lil-gui";
import { randomColor } from '../util/colorUtil';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';


function GeoText() {
  this.inputs = {
    geoType: 'torusKnot',
    radius: 0.5,
    tube: 0.1,
    tSeg: 100,
    rSeg: 20,
    p: 30,
    q: 45,
    width: 0.5,
    height: 0.5,
    depth: 0.5,
    wSeg: 32,
    hSeg: 16,
    innerRadius: 0.2,
    outerRadius: 0.4,
    visible: true,
    size: { x: 1, y: 1, z: 1 },
    color: { r: 0, g: 1, b: 0 },
    roughness: 0.1,
    updateInterval: 1000,
    currentTime: 0,
    nextUpdate: 0,
    updateApiUrl: "",
    myUpdatedHexColor: "",
    transparent: false,
    opacity: 1,
    image: "",
    pRotationX: 1,
    pRotationY: 1,
    pRotationZ: 1,
    mRotationX: 1,
    mRotationY: 1,
    mRotationZ: 1,
  };

  this.events = {
    "INTERACTION.CLICK": true,
    "INTERACTION.HOVER": true,
  };

  const createCaughtMarker = function () {
    const renderTargetSize = 64;
    const canvas = document.createElement('canvas');
    const renderContext2D = canvas.getContext('2d');
    canvas.width = renderTargetSize;
    canvas.height = renderTargetSize;


    renderContext2D.textAlign = 'center';
    renderContext2D.textBaseline = 'middle';
    renderContext2D.fillStyle = '#fff';
    renderContext2D.font = renderTargetSize + 'px Roboto';
    renderContext2D.fillText('✓', 0.5 * renderTargetSize, 0.5 * renderTargetSize);

    return renderContext2D;
  }

  this.onInit = function () {
    const { image, width, height, pRotationX, pRotationY, pRotationZ, mRotationX, mRotationY, mRotationZ } = this.inputs;
    let THREE = this.context.three;;
    const planeGeometry = new THREE.PlaneGeometry(width, height);
    const texture = new THREE.TextureLoader().load(`/images/tags/${image}`);
    var mat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 1,
      depthTest: false,
      depthWrite: false,
      map: texture,
      side: THREE.DoubleSide
    });
    planeGeometry.rotateY(pRotationY);
    planeGeometry.rotateZ(pRotationZ);
    const mesh = new THREE.Mesh(planeGeometry, mat);
    mesh.rotation.x = mRotationX;
    mesh.rotation.y = mRotationY;
    this.outputs.objectRoot = mesh;
    this.outputs.collider = mesh;
    console.log("in init of the text");
  }
  this.onEvent = function (type, data) {
    if (type === "INTERACTION.CLICK") {
      this.notify("INTERACTION.CLICK", {
        type: type,
        node: this.context.root,
        component: this,
      });
    }
    console.log(type, data);
  };

  this.onInputsUpdated = function (previous) {
    this.outputs.objectRoot = this.mesh;
    this.outputs.collider = this.mesh;
  };

  this.onTick = function (tickDelta) {
    // this.sphere.rotation.x -= 0.01;
    // this.sphere.rotation.y += 0.01;
    // this.sphere.rotation.z -= 0.01;
  };

  this.onDestroy = function () {
    this.material.dispose();
  };


}



/*  export default function BoxFactory() {
    return new Box();
 } */

export const geoTextType = "mp.text";
export const makeGeoText = function () {
  return new GeoText();
};
