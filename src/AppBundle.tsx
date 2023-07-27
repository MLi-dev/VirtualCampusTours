// @ts-nocheck
import { useState, useRef, useEffect } from "react";
import { hotspots } from "./hotspots";
import Iframe from "./UI/Iframe";
import "./App.css";
import sourceDescs from "./sources.json";
import icon2 from './images/tags/big1.jpg';
import { getImage } from './scene-components/CustomizeTags.js';
import Parrots from './assets/Parrot.glb';
import { url } from "inspector";
import Player from "./scene-components/MusicPlayer"
import { boxFactoryType, makeBoxFactory } from "./scene-components/SimpleBox";
import { iotBoxType, makeIotBox } from "./scene-components/IotBox";
import { troikaTextType, makeTroikaText } from "./scene-components/TroikaText";
import { Text } from 'troika-three-text'
import { initializeSceneControls } from './scene-components/scene-controls';
import { intializeRendererControls } from './scene-components/renderer-control';
import { randomColor } from './util/colorUtil';
import { font_text } from './scene-components/text';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import sourceFont from "./fonts/helvetiker_regular.typeface.json";
import { geoTextType, makeGeoText } from './scene-components/GeoText';



function AppBundle() {
	const [sdk, setSdk] = useState();
	const [isLoaded, setIsLoaded] = useState(false);
	const [iframe, setIframe] = useState();
	const container = useRef();
	const isMobile = window.matchMedia("(min-width: 768px)").matches;
	const showCaseLoaded = async () => {
		const showcase = document.getElementById("showcase");
		const key = "prigk78dz4crrmb7p98czk0kc";
		try {
			const rtvSDK = await showcase.contentWindow.MP_SDK.connect(
				showcase,
				key,
				"3.6"
			);
			setSdk(rtvSDK);
		} catch (e) {
			console.error(e);
			return;
		}
		sdk?.App.state.waitUntil((state) => {
			console.log(state);
			if (state.phase === "appphase.playing") {
				return true;
			} else {
				return false;
			}
		});
	};
	// eslint-disable-next-line
	useEffect(() => {
		loaded().then(
			sdk?.App.state.waitUntil((state) =>
				state.phase === "appphase.playing"
					? setIsLoaded(true)
					: console.log(state.phase)
			)
		);
	}, 		// eslint-disable-next-line
		[sdk]);

	useEffect(() => {
		if (isLoaded) {
			startSDKHere();
		}
	},
		// eslint-disable-next-line 
		[isLoaded]);
	const startSDKHere = () => {
		addMattertagNode1();
		initialFunction();
		console.log("Camera rotating!");
	};
	async function loaded() {
		await sdk?.App.state.waitUntil(
			(state) => state.phase === sdk.App.Phase.PLAYING
		);
	}
	function setMessage(element: HTMLDivElement, message: string) {
		element.classList.remove('hidden');
		element.classList.add('visible');
		element.innerText = message;
	}
	function setSound(element: HTMLDivElement) {
		element.classList.remove('hidden');
		element.classList.add('visible');
		element.firstElementChild.url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
		//element.innerHTML = <Player url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
	}
	function clearSound(element: HTMLDivElement, message: string) {
		element.classList.remove('visible');
		element.classList.add('hidden');
	}
	function clearMesssage(element: HTMLDivElement) {
		element.classList.remove('visible');
		element.classList.add('hidden');
	}
	const registerCustomComponent = async () => {

		sdk.Scene.register(iotBoxType, makeIotBox);
		// sdk.Scene.register(cubeType, makeCube);
		// sdk.Scene.register(sphereType, makeSphere);
		//sdk.Scene.register(circleType, makeCircle);
		sdk.Scene.register(geoTextType, makeGeoText);
		//sdk.Scene.register('box', makeBoxFactory);
	};
	// const addText = async () => {
	// 	var [sceneObject] = await sdk.Scene.createObjects(1);
	// 	const troikaText = new Text()
	// 	scene.add(troikaText)

	// 	// Set properties to configure:
	// 	troikaText.text = 'Text rendering with Troika!\nGreat for 2D labels'
	// 	troikaText.fontSize = 2;
	// 	troikaText.position.x = -3;

	// 	troikaText.color = 0xff00ff;


	// }


	const addComponentNode4 = async () => {
		const initObj = {
			geoType: 'torusKnot',
			radius: 0.5,
			tube: 0.1,
			tSeg: 100,
			rSeg: 20,
			p: 3,
			q: 7,
			visible: true,
			size: { x: 1, y: 1, z: 1 },
		};
		const color = randomColor();
		initObj.color = color;
		const [sceneObject] = await sdk.Scene.createObjects(1);
		const node4 = sceneObject.addNode("node-obj-4");
		const gltfrtv = node4.addComponent(iotBoxType, initObj);
		class ClickSpy {
			node = node4;
			component = gltfrtv;
			eventType = "INTERACTION.CLICK";
			onEvent(payload) {
				alert(this.component.outputs.objectRoot.scale);
				customEvent(this.component.inputs.myUpdatedHexColor);
			}
		}
		node4.position.set(-32.678383074276525, 1.9582876760621081, -24.83219463891109);
		gltfrtv?.spyOnEvent(new ClickSpy());
		node4.start();

		// const tick = function () {
		// 	requestAnimationFrame(tick);
		// 	node4.obj3D.rotation.x -= 0.002;
		// 	node4.obj3D.rotation.y += 0.002;
		// 	node4.obj3D.rotation.z -= 0.002;
		// };
		// tick();

	};

	const addCube = async () => {
		const initObj = {
			geoType: 'box',
			depth: 0.5,
			width: 0.5,
			height: 0.5,
			visible: true,
			size: { x: 1, y: 1, z: 1 },
		};
		const color = randomColor();
		initObj.color = color;
		var [sceneObject] = await sdk.Scene.createObjects(1);
		var node4 = sceneObject.addNode("node-obj-4");
		const gltfrtv = node4.addComponent(iotBoxType, initObj);

		class ClickSpy {
			node = node4;
			component = gltfrtv;
			eventType = "INTERACTION.CLICK";
			onEvent(payload) {
				alert(this.component.outputs.objectRoot.position.x + "," + this.component.outputs.objectRoot.position.y + "," + this.component.outputs.objectRoot.position.z);
				customEvent(this.component.inputs.myUpdatedHexColor);
			}
		}
		node4.position.set(-34.678383074276525, 1.8582876760621081, -24.83219463891109);
		gltfrtv?.spyOnEvent(new ClickSpy());

		//setComponentIotBox(gltfrtv);
		node4.start();

		const tick = function () {
			requestAnimationFrame(tick);
			node4.obj3D.rotation.x -= 0.002;
			node4.obj3D.rotation.y += 0.002;
			node4.obj3D.rotation.z -= 0.002;
		};
		tick();

	};

	const addCircle = async (x, y, z) => {
		const initObj = {
			geoType: 'circle',
			radius: 0.3,
			visible: true,
			size: { x: 1, y: 1, z: 1 },
			transparent: true,
			opacity: 0.3,
		};
		const color = randomColor();
		initObj.color = color;
		var [sceneObject] = await sdk.Scene.createObjects(1);
		var node4 = sceneObject.addNode("node-obj-4");
		const gltfrtv = node4.addComponent(iotBoxType, initObj);

		class ClickSpy {
			node = node4;
			component = gltfrtv;
			eventType = "INTERACTION.CLICK";
			onEvent(payload) {
				alert(this.component.outputs.objectRoot.position.x + "," + this.component.outputs.objectRoot.position.y + "," + this.component.outputs.objectRoot.position.z);
				customEvent(this.component.inputs.myUpdatedHexColor);
			}
		}
		node4.position.set(x, y, z);
		gltfrtv?.spyOnEvent(new ClickSpy());

		//setComponentIotBox(gltfrtv);
		node4.start();


	};

	const addIcosahedron = async () => {
		const initObj = {
			geoType: 'icosahedron',
			radius: 0.2,
		};
		const color = randomColor();
		initObj.color = color;
		var [sceneObject] = await sdk.Scene.createObjects(1);
		var node4 = sceneObject.addNode("node-obj-4");
		const gltfrtv = node4.addComponent(iotBoxType, initObj);

		class ClickSpy {
			node = node4;
			component = gltfrtv;
			eventType = "INTERACTION.CLICK";
			onEvent(payload) {
				alert(this.component.outputs.objectRoot.position.x + "," + this.component.outputs.objectRoot.position.y + "," + this.component.outputs.objectRoot.position.z);
				customEvent(this.component.inputs.myUpdatedHexColor);
			}
		}
		node4.position.set(-31.678383074276525, 1.3582876760621081, -24.83219463891109);
		gltfrtv?.spyOnEvent(new ClickSpy());

		//setComponentIotBox(gltfrtv);
		node4.start();

		const tick = function () {
			requestAnimationFrame(tick);
			node4.obj3D.rotation.x -= 0.002;
			node4.obj3D.rotation.y += 0.002;
			node4.obj3D.rotation.z -= 0.002;
		};
		tick();

	};

	const addRing = async (x, y, z) => {
		const initObj = {
			geoType: 'ring',
			innerRadius: 0.25,
			outerRadius: 0.4,
			transparent: true,
			opacity: 0.5
		};
		const color = randomColor(135 / 255, 206 / 255, 235 / 255);
		initObj.color = color;
		var [sceneObject] = await sdk.Scene.createObjects(1);
		var node4 = sceneObject.addNode("node-obj-4");
		const gltfrtv = node4.addComponent(iotBoxType, initObj);

		class ClickSpy {
			node = node4;
			component = gltfrtv;
			eventType = "INTERACTION.CLICK";
			onEvent(payload) {
				alert(this.component.outputs.objectRoot.position.x + "," + this.component.outputs.objectRoot.position.y + "," + this.component.outputs.objectRoot.position.z);
				customEvent(this.component.inputs.myUpdatedHexColor);
			}
		}
		node4.position.set(x, y, z);
		gltfrtv?.spyOnEvent(new ClickSpy());

		//setComponentIotBox(gltfrtv);
		node4.start();

		// const tick = function () {
		// 	requestAnimationFrame(tick);
		// 	node4.obj3D.rotation.x -= 0.002;
		// 	node4.obj3D.rotation.y += 0.002;
		// 	node4.obj3D.rotation.z -= 0.002;
		// };
		// tick();

	};

	const addHeart = async () => {
		const initObj = {
			geoType: 'heart',
		};
		const color = randomColor();
		initObj.color = color;
		var [sceneObject] = await sdk.Scene.createObjects(1);
		var node4 = sceneObject.addNode("node-obj-4");
		const gltfrtv = node4.addComponent(iotBoxType, initObj);

		class ClickSpy {
			node = node4;
			component = gltfrtv;
			eventType = "INTERACTION.CLICK";
			onEvent(payload) {
				alert(this.component.outputs.objectRoot.position.x + "," + this.component.outputs.objectRoot.position.y + "," + this.component.outputs.objectRoot.position.z);
				customEvent(this.component.inputs.myUpdatedHexColor);
			}
		}
		node4.position.set(-34.678383074276525, 0.1582876760621081, -25.83219463891109);
		gltfrtv?.spyOnEvent(new ClickSpy());

		//setComponentIotBox(gltfrtv);
		node4.start();

		const tick = function () {
			requestAnimationFrame(tick);
			//node4.obj3D.rotation.x -= 0.002;
			// node4.obj3D.rotation.y += 0.002;
			// node4.obj3D.rotation.z -= 0.002;
		};
		tick();

	};

	const addSign = async () => {
		const initObj = {
			geoType: 'text',
			image: "",
			width: 1,
			height: 0.3,
			pRotationY: -Math.PI,
			pRotationZ: -Math.PI,
			mRotationX: Math.PI,
			mRotationY: Math.PI / 6,
		};
		const aa = sourceFont;
		const color = randomColor();
		initObj.color = color;
		let [sceneObject] = await sdk.Scene.createObjects(1);
		let node4 = sceneObject.addNode("node-obj-4");
		initObj.image = "MainStory.png";
		initObj.width = 2;
		initObj.height = 1;
		initObj.pRotationY = -Math.PI;
		initObj.pRotationZ = -Math.PI;
		initObj.mRotationX = -Math.PI;
		initObj.mRotationY = Math.PI / 2 + Math.PI / 8;
		node4.addComponent(geoTextType, initObj);
		node4.position.set(-22.19006022089588, 1.5784307565062319, -25.17821221536957);
		node4.start();

		let node5 = sceneObject.addNode("node-obj-5");
		initObj.image = "MorePath.png";
		initObj.width = 2;
		initObj.height = 1;
		initObj.pRotationY = -Math.PI;
		initObj.pRotationZ = -Math.PI;
		initObj.mRotationX = -Math.PI;
		initObj.mRotationY = -Math.PI
		node5.addComponent(geoTextType, initObj);
		node5.position.set(-22.96102305361865, 1.21997231224456693, -9.258993120824082);
		node5.start();
	};

	const addPath = async () => {
		addRing(-30.678383074276525, 0.1582876760621081, -25.83219463891109);

		addRing(-26.678383074276525, 0.1582876760621081, -25.83219463891109);

		addRing(-22.678383074276525, 0.1582876760621081, -25.83219463891109);

		addRing(-22.678383074276525, 0.1582876760621081, -21.83219463891109);

		addRing(-22.678383074276525, 0.1582876760621081, -17.83219463891109);

		addRing(-22.678383074276525, 0.1582876760621081, -13.83219463891109);

		addRing(-22.678383074276525, 0.1582876760621081, -9.83219463891109);

		addRing(-22.678383074276525, 0.1582876760621081, -5.83219463891109);

		addRing(-22.678383074276525, 0.1582876760621081, -1.83219463891109);

	};



	const addText = async () => {
		const initObj = {
			geoType: 'text',
			image: "",
			width: 1,
			height: 0.3,
			pRotationY: -Math.PI,
			pRotationZ: -Math.PI,
			mRotationX: Math.PI,
			mRotationY: Math.PI / 6,
		};
		const aa = sourceFont;
		const color = randomColor();
		initObj.color = color;
		let [sceneObject] = await sdk.Scene.createObjects(1);

		let node1 = sceneObject.addNode("node-obj-1");
		initObj.image = "FollowMain.png";
		initObj.width = 1;
		initObj.height = 0.3;
		node1.addComponent(geoTextType, initObj);
		node1.position.set(-33.178383074276525, 1.8118881797790528, -28.83219463891109);
		node1.start();

		let node2 = sceneObject.addNode("node-obj-2");
		initObj.image = "Past.png";
		initObj.width = 1;
		initObj.height = 0.3;
		node2.addComponent(geoTextType, initObj);
		node2.position.set(-33.178383074276525, 1.3118881797790528, -28.83219463891109);
		node2.start();
		let node3 = sceneObject.addNode("node-obj-3");
		initObj.image = "HowToNavigate.png";
		initObj.width = 1;
		initObj.height = 0.5;
		node3.addComponent(geoTextType, initObj);
		node3.position.set(-33.778383074276525, 2.1518881797790528, -28.83219463891109);
		node3.start();

		let node0 = sceneObject.addNode("node-obj-0");
		initObj.image = "Instructions.png";
		initObj.width = 2;
		initObj.height = 1;
		initObj.pRotationY = -Math.PI;
		initObj.pRotationZ = -Math.PI;
		initObj.mRotationY = -Math.PI;
		initObj.mRotationZ = -Math.PI;
		node0.addComponent(geoTextType, initObj);
		node0.position.set(-35.178383074276525, 2.0582876760621081, -25.83219463891109);
		node0.start();

		let node4 = sceneObject.addNode("node-obj-4");
		initObj.image = "MainStory.png";
		initObj.width = 2;
		initObj.height = 1;
		initObj.pRotationY = -Math.PI;
		initObj.pRotationZ = -Math.PI;
		initObj.mRotationX = -Math.PI;
		initObj.mRotationY = Math.PI / 2 + Math.PI / 8;
		node4.addComponent(geoTextType, initObj);
		node4.position.set(-22.19006022089588, 1.5784307565062319, -25.17821221536957);
		node4.start();

		let node5 = sceneObject.addNode("node-obj-5");
		initObj.image = "MorePath.png";
		initObj.width = 2;
		initObj.height = 1;
		initObj.pRotationY = -Math.PI;
		initObj.pRotationZ = -Math.PI;
		initObj.mRotationX = -Math.PI;
		initObj.mRotationY = -Math.PI
		node5.addComponent(geoTextType, initObj);
		node5.position.set(-22.96102305361865, 1.21997231224456693, -9.258993120824082);
		node5.start();


	};

	const addSphere = async () => {
		const initObj = {
			geoType: 'sphere',
			radius: 0.2,
			wSeg: 32,
			hSeg: 16,
			visible: true,
			size: { x: 1, y: 1, z: 1 },
			updateInterval: 1000,
			currentTime: 0,
			nextUpdate: 0,
			updateApiUrl: "",
			myUpdatedHexColor: "",
		};
		const color = randomColor();
		initObj.color = color;
		var [sceneObject] = await sdk.Scene.createObjects(1);
		var node4 = sceneObject.addNode("node-obj-4");
		const gltfrtv = node4.addComponent(iotBoxType, initObj);

		class ClickSpy {
			node = node4;
			component = gltfrtv;
			eventType = "INTERACTION.CLICK";
			onEvent(payload) {
				alert(this.component.outputs.objectRoot.position.x + "," + this.component.outputs.objectRoot.position.y + "," + this.component.outputs.objectRoot.position.z);
				customEvent(this.component.inputs.myUpdatedHexColor);
			}
		}
		node4.position.set(-36.678383074276525, 1.3582876760621081, -24.83219463891109);
		gltfrtv?.spyOnEvent(new ClickSpy());

		//setComponentIotBox(gltfrtv);
		node4.start();

		const tick = function () {
			requestAnimationFrame(tick);
			node4.obj3D.rotation.x -= 0.002;
			node4.obj3D.rotation.y += 0.002;
			node4.obj3D.rotation.z -= 0.002;
		};
		tick();

	};

	const initialFunction = async () => {
		registerCustomComponent();
		const [sceneObject] = await sdk.Scene.createObjects(1);
		// add light
		const lightsNode = sceneObject.addNode();
		const directionalLightComponet = lightsNode.addComponent(
			sdk?.Scene?.Component?.DIRECTIONAL_LIGHT,
			{
				color: { r: 0.7, g: 0.7, b: 0.7 },
			}
		);

		const ambientLightComponet = lightsNode.addComponent("mp.ambientLight", {
			intensity: 0.5,
			color: { r: 1.0, g: 0, b: 0 },
		});
		const ambientIntensityPath = sceneObject.addInputPath(
			ambientLightComponet,
			"intensity",
			"ambientIntensity"
		);
		lightsNode.position.set(-38.678383074276525, 2, -22.83219463891109);
		// let intensity = 1;
		// const intensityMax = 2;
		// const intensityMin = 0.1;
		// const intensityDelta = 0.02;
		// let intensityDirection = 1;
		// setInterval(() => {
		// 	intensity += (intensityDelta * intensityDirection);

		// 	if (intensity >= intensityMax) {
		// 		intensity = intensityMax;
		// 		intensityDirection = intensityDirection * -1;
		// 	}
		// 	else if (intensity <= intensityMin) {
		// 		intensity = intensityMin;
		// 		intensityDirection = intensityDirection * -1;
		// 	}

		// 	// The path can be used as the public interface to the component behaviors contained within the scene object.
		// 	ambientIntensityPath.set(intensity);
		// }, 15);
		lightsNode.start();
		// addComponentNode4();
		// addCube();
		// addSphere();
		// addIcosahedron();
		// addRing();
		// addHeart();
		addText();
		addSign();
		addPath();


		// add parrot
		// const modelNode = sceneObject.addNode();
		// let initial = {
		// 	//url: "https://static.matterport.com/showcase-sdk/examples/assets-1.0-2-g6b74572/assets/models/sofa/9/scene.gltf",
		// 	visible: true,
		// 	size: { x: 0.6, y: 0.6, z: 0.6 },
		// 	localScale: {
		// 		x: 1,
		// 		y: 1,
		// 		z: 1,
		// 	},
		// 	localPosition: {
		// 		x: -32.678383074276525,
		// 		y: 0.31188817977905303,
		// 		z: -28.83219463891109,
		// 	},
		// 	localRotation: {
		// 		x: 0,
		// 		y: 0,
		// 		z: 0,
		// 	},

		// 	/*  position: { x: -1, y: -7.5, z: 2.25 }, */
		// };
		// const parrotComponent = modelNode.addComponent(
		// 	boxFactoryType,
		// 	initial
		// );
		// const parrotComponent = modelNode.addComponent("mp.gltfLoader", {
		// 	url:
		// 		"https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/Parrot.glb",
		// 	localScale: {
		// 		x: 0.03,
		// 		y: 0.03,
		// 		z: 0.03,
		// 	},
		// 	localPosition: {
		// 		x: -32.678383074276525,
		// 		y: 0.31188817977905303,
		// 		z: -28.83219463891109,
		// 	},
		// 	localRotation: {
		// 		x: 0,
		// 		y: 0,
		// 		z: 0,
		// 	},
		// });
		// class ClickSpy {
		// 	node = modelNode;
		// 	component = parrotComponent;
		// 	eventType = "INTERACTION.CLICK";
		// 	onEvent(payload) {
		// 		console.log("received node4", payload, this);
		// 		console.log(this.component.outputs.objectRoot.scale);
		// 		alert(parrotComponent.inputs.localPosition.x);
		// 	}
		// }
		// parrotComponent?.spyOnEvent(new ClickSpy());
		// modelNode.start();

		// const tick = function () {
		// 	requestAnimationFrame(tick);
		// 	//modelNode.setAttribute('animation-mixer', 'clip: idle ; timeScale:1')
		// 	//modelNode.obj3D.setRotationFromAxisAngle(0);
		// 	modelNode.obj3D.rotation.z += 0.002;
		// 	mesh.rotation.x -= props.torusSpeed;
		// 	mesh.rotation.y += props.torusSpeed;
		// 	mesh.rotation.z -= props.torusSpeed;
		// };
		// tick();

		// add sensor
		const textElement = document.getElementById("text");
		const soundElement = document.getElementById("sound");
		const sensor = await sdk.Sensor.createSensor(sdk.Sensor.SensorType.CAMERA);
		sensor.showDebug(true);
		sensor.readings.subscribe({
			onCollectionUpdated: (sourceCollection) => {
				const inRange = [];
				for (const [source, reading] of sourceCollection) {
					if (reading.inRange) {
						const search = inRange.find((element) => {
							return element === source.userData.id;
						});
						if (!search) {
							inRange.push(source.userData.id);
						}
					}

					console.log(
						`sensor id: ${source.userData.id} inRange:${reading.inRange} inView:${reading.inView}`
					);
				}

				if (inRange.length > 0) {
					setMessage(textElement, inRange.toString());
					setSound(soundElement)
				} else {
					clearMesssage(textElement);
					clearSound(soundElement);
				}
			},
		});

		const sourcePromises = [];
		for (const desc of sourceDescs) {
			sourcePromises.push(sdk.Sensor.createSource(desc.type, desc.options));
		}

		const sources = await Promise.all(sourcePromises);
		sensor.addSource(...sources);
	};
	const addMattertagNode1 = () => {
		let matterTags = [];
		hotspots.map((e) => {
			matterTags.push({
				label: e.title,
				description: e.description,
				anchorPosition: {
					x: e.positionX,
					y: e.positionY,
					z: e.positionZ,
				},
				stemVector: { x: e.stemVectorX, y: e.stemVectorY, z: e.stemVectorZ },
				mediaType: e.type,
				mediaSrc: e.url,
				media: {
					type: "mattertag.media." + e.type,
					src: e.url,
				}
			});
			return 0;
		}
		);
		// @ts-ignore 
		sdk.Mattertag.add(matterTags).then(function (mattertagIds) {
			console.log(mattertagIds);
			sdk.Mattertag.getData()
				.then(function (mattertags) {

					for (let i = 0; i < matterTags.length; i++) {
						isMobile ? sdk.Mattertag.registerIcon(`${mattertags[i].sid}1`, getImage(mattertags[i].label)) : sdk.Mattertag.registerIcon(`${mattertags[i].sid}1`, icon2);
						sdk.Mattertag.editIcon(mattertags[i].sid, `${mattertags[i].sid}1`);
					}

				}).catch(function (error) {
					console.log(error)
				});
		})
	};


	const iframeHandler = () => {
		// @ts-ignore 
		setIframe(null);
	};
	return (
		<>
			<div id="sound" className="hidden"><Player url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" /></div>
			<div id="text" className="hidden"></div>
			<div className='container'>
				{iframe && (
					<Iframe
						// @ts-ignore 
						title={iframe.title}
						// @ts-ignore 
						message={iframe.message}
						onConfirm={iframeHandler}
					/>
				)}
				<iframe
					id='showcase'
					title='showcase_frame'
					src='/bundle/showcase.html?m=eE6srFdgFSR&play=1&qs=1&log=0&applicationKey=prigk78dz4crrmb7p98czk0kc&mdir=2'
					width='1200px'
					height='800px'
					frameBorder='0'
					allow='xr-spatial-tracking'
					allowFullScreen
					// @ts-ignore 
					ref={container}
					onLoad={showCaseLoaded}
				>
					{" "}
				</iframe>
			</div>
		</>
	);
}

export default AppBundle;
