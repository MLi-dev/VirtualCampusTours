import GUI from "lil-gui";
import { randomColor } from '../util/colorUtil';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';


function IotBox() {
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
  };



  this.events = {
    "INTERACTION.CLICK": true,
    "INTERACTION.HOVER": true,
  };

  const getText = async () => {
    let font = await new FontLoader().loadAsync('/fonts/helvetiker_regular.typeface.json');
    return new TextGeometry('Some Text', {
      font: font,
      size: 2
    })
  }

  const getGeo = function (THREE, type, input) {
    if (type === "torusKnot")
      return new THREE.TorusKnotBufferGeometry(input.radius, input.tube, input.tSeg, input.rSeg, input.p, input.q);
    else if (type === "box")
      return new THREE.BoxGeometry(input.width, input.height, input.depth);
    else if (type === "sphere")
      return new THREE.SphereGeometry(input.radius, input.wSeg, input.hSeg);
    else if (type === "circle")
      return new THREE.CircleGeometry(input.radius, 32);
    else if (type === "icosahedron") {
      return new THREE.IcosahedronGeometry(input.radius, 0);
    } else if (type === "ring") {
      return new THREE.RingGeometry(input.innerRadius, input.outerRadius, 32);
    } else if (type === "heart") {
      const x = 0, y = 0;
      const heartShape = new THREE.Shape();
      heartShape.moveTo(x + 5, y + 5);
      heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
      heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
      heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
      heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
      heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
      heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
      return new THREE.ShapeGeometry(heartShape).scale(0.02, 0.02, 0.02);
    } else {
      const textObj = getText().then((obj) => obj);
      //return textObj;
    }
  }

  this.onInit = function () {
    // const text_font = helvetiker;
    const { geoType, radius, tube, tSeg, rSeg, p, q, color, size, roughness, width, height, depth, wSeg, hSeg, innerRadius, outerRadius, transparent, opacity, font } = this.inputs;
    var THREE = this.context.three;
    const torusKnotGeometry = getGeo(THREE, geoType, { radius, tube, tSeg, rSeg, p, q, width, height, depth, wSeg, hSeg, innerRadius, outerRadius, font });
    this.torusKnotGeometry = torusKnotGeometry;
    this.geoType = geoType;
    const texture = new THREE.TextureLoader().load(`/images/tags/path.png`);
    const torusKnotMat = new THREE.MeshStandardMaterial({
      color,
      roughness,
      transparent,
      opacity,
      map: texture
    });
    let mesh;
    if (geoType === "circle") {
      mesh = new THREE.Mesh(torusKnotGeometry, torusKnotMat);
      mesh.rotation.x = - Math.PI / 2;
      mesh.rotation.z = - Math.PI / 2;
    } else if (geoType === "ring") {
      mesh = new THREE.Mesh(torusKnotGeometry, torusKnotMat);
      mesh.rotation.x = - Math.PI / 2;
      mesh.rotation.z = - Math.PI / 2;
    } else if (geoType === "heart") {
      // torusKnotGeometry.rotateX(Math.PI / 2);
      torusKnotGeometry.rotateY(-Math.PI / 4);
      torusKnotGeometry.rotateZ(-Math.PI / 2);
      torusKnotGeometry.translate(0, 0, 1);
      mesh = new THREE.Mesh(torusKnotGeometry, torusKnotMat);
      mesh.rotation.x = -Math.PI / 2
    } else {
      mesh = new THREE.Mesh(torusKnotGeometry, torusKnotMat);
    }
    mesh.castShadow = true;
    this.mesh = mesh;
    this.outputs.objectRoot = mesh;
    this.outputs.collider = mesh;
    console.log("in init of the Geo");
  };

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

  };

  this.onTick = function (tickDelta) {
    if (this.geoType === "heart") {
      this.torusKnotGeometry.rotateX += 1;
      this.torusKnotGeometry.rotateY += 1;
      this.torusKnotGeometry.rotateZ += 1;
    }
    else if (this.geoType !== "ring") {
      // this.torusKnotGeometry.rotateX += 0.01;
      // this.torusKnotGeometry.rotateY += 0.01;
      // this.torusKnotGeometry.rotateZ += 0.01;
      this.mesh.rotation.x -= 0.01;
      this.mesh.rotation.y += 0.01;
      this.mesh.rotation.z -= 0.01;
    }
    // this.outputs.objectRoot = this.mesh;
    // this.outputs.collider = this.mesh;
  };

  this.onDestroy = function () {
    this.material.dispose();
  };
}

/*  export default function BoxFactory() {
    return new Box();
 } */

export const iotBoxType = "mp.iotBox";
export const makeIotBox = function () {
  return new IotBox();
};
