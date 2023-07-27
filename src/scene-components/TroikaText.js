import GUI from "lil-gui";
import { Text } from 'troika-three-text'

function TroikaText() {
  this.inputs = {
    visible: true,
    size: { x: 1, y: 1, z: 1 },
    color: { r: 1, g: 1, b: 1 },
    updateInterval: 1000,
    currentTime: 0,
    nextUpdate: 0,
    updateApiUrl: "",
    myUpdatedHexColor: "",
  };

  this.events = {
    "INTERACTION.CLICK": true,
    "INTERACTION.HOVER": true,
  };

  this.onInit = function () {
    var THREE = this.context.three;
    const troikaText = new Text();


    // Set properties to configure:
    troikaText.text = 'Text rendering with Troika!\nGreat for 2D labels';
    troikaText.fontSize = 2;
    troikaText.position.x = -32.678383074276525;
    troikaText.position.y = 1.5582876760621081;
    troikaText.position.z = -24.83219463891109;
    troikaText.color = 0xff00ff;

    // Update the rendering:
    troikaText.sync()
    this.outputs.objectRoot = troikaText;
    this.outputs.collider = troikaText;
    console.log("inInit text");
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

  this.onInputsUpdated = function (previous) { };

  this.onTick = function (tickDelta) {
    // this.inputs.currentTime = this.inputs.currentTime + tickDelta;
    // if (this.inputs.currentTime > this.inputs.nextUpdate) {
    //   //console.log("onTick text" + this.inputs.currentTime);

    //   fetch(this.inputs.updateApiUrl)
    //     .then((response) => {
    //       //console.log(response.json());
    //       return response.json();
    //     })
    //     .then((data) => {
    //       this.outputs.objectRoot.material.color.setHex(data.hexColor);
    //       this.inputs.myUpdatedHexColor = data.hexColor;
    //       this.outputs.objectRoot.scale.set(data.scaleSize, data.scaleSize, data.scaleSize);
    //       //scaleSize
    //       console.log(data);
    //     });

    //   this.inputs.currentTime = 0;
    //   this.inputs.nextUpdate = 0;
    //   this.inputs.nextUpdate =
    //     this.inputs.nextUpdate + this.inputs.updateInterval;
    // }
  };

  this.onDestroy = function () {
    this.material.dispose();
  };
}

/*  export default function BoxFactory() {
    return new Box();
 } */

export const troikaTextType = "mp.troikaText";
export const makeTroikaText = function () {
  return new TroikaText();
};
