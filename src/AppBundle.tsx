// @ts-nocheck
import { useState, useRef, useEffect } from "react";
import { hotspots } from "./hotspots";
import Iframe from "./UI/Iframe";
import "./App.css";
import sourceDescs from "./sources.json";
import sweepDesc from "./sweeps.json";
import icon2 from './images/tags/big1.jpg';
import { getImage } from './scene-components/CustomizeTags.js';
import { iotBoxType, makeIotBox } from "./scene-components/IotBox";
import { randomColor } from './util/colorUtil';
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
	function setSound(element: HTMLDivElement, message: string) {
		if (message === "Film Classroom") {
			const button = document.querySelector("#sound");
			const audio = document.querySelector("audio");
			button.classList.remove('hidden');
			button.classList.add('visible');
			audio.volume = 0.1;
			audio.play();
			button.addEventListener("click", () => {
				if (audio.paused) {
					audio.volume = 0.1;
					audio.play();
					button.innerText = "Pause";

				} else {
					audio.pause();
					button.innerText = "Play";
				}
			});
		}
	}
	function clearSound(element: HTMLDivElement) {
		element.classList.remove('visible');
		element.classList.add('hidden');
		const audio = document.querySelector("audio");
		audio.pause();
	}
	function handleMusic(e) {
		const button = document.querySelector("#button");
		const icon = document.querySelector("#button > i");
		const audio = document.querySelector("audio");

		button.addEventListener("click", () => {
			if (audio.paused) {
				audio.volume = 0.2;
				audio.play();
				icon.classList.remove('fa-volume-up');
				icon.classList.add('fa-volume-mute');

			} else {
				audio.pause();
				icon.classList.remove('fa-volume-mute');
				icon.classList.add('fa-volume-up');
			}
			button.classList.add("fade");
		});
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
			transparent: true,
			opacity: 1,
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
			}
		}
		node4.position.set(x, y, z);
		gltfrtv?.spyOnEvent(new ClickSpy());

		//setComponentIotBox(gltfrtv);
		node4.start();


	};

	const addIcosahedron = async (x, y, z, info) => {

		const initObj = {
			geoType: 'icosahedron',
			radius: 1,
		};
		const color = randomColor(1, 223 / 255, 0);
		initObj.color = color;
		var [sceneObject] = await sdk.Scene.createObjects(1);
		var node4 = sceneObject.addNode("node-obj-4");
		const gltfrtv = node4.addComponent(iotBoxType, initObj);
		//makeLight(sceneObject, {}, { x, y: y + 0.8, z });
		class ClickSpy {
			node = node4;
			component = gltfrtv;
			eventType = "INTERACTION.CLICK";
			onEvent(eventType, payload) {
				window.prompt(info.name);
			}
		}
		node4.position.set(x, y, z);
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
		const color = randomColor(255 / 255, 223 / 255, 235 / 255);
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

	const addSphere = async (x, y, z, info, color) => {
		const initObj = {
			geoType: 'sphere',
			radius: 1,
			wSeg: 32,
			hSeg: 16,
			visible: true,
			updateInterval: 1000,
			currentTime: 0,
			nextUpdate: 0,
			updateApiUrl: "",
			myUpdatedHexColor: "",
		};
		initObj.color = color;
		var [sceneObject] = await sdk.Scene.createObjects(1);
		var node4 = sceneObject.addNode("node-obj-4");
		const gltfrtv = node4.addComponent(iotBoxType, initObj);

		class ClickSpy {
			node = node4;
			component = gltfrtv;
			eventType = "INTERACTION.CLICK";
			onEvent(payload) {
				const textElement = document.getElementById("text");
				setMessage(textElement, info.name)
				setTimeout(function () {
					clearMesssage(textElement)
				}, 5000);

			}
		}
		node4.position.set(x, y, z);
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
	const makeLight = (sceneObject, color, position) => {
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
			// color: { r: 1.0, g: 0, b: 0 },
		});
		const ambientIntensityPath = sceneObject.addInputPath(
			ambientLightComponet,
			"intensity",
			"ambientIntensity"
		);
		lightsNode.position.set(position.x, position.y, position.z);
		let intensity = 1;
		const intensityMax = 2;
		const intensityMin = 0.1;
		const intensityDelta = 0.008;
		let intensityDirection = 1;
		setInterval(() => {
			intensity += (intensityDelta * intensityDirection);

			if (intensity >= intensityMax) {
				intensity = intensityMax;
				intensityDirection = intensityDirection * -1;
			}
			else if (intensity <= intensityMin) {
				intensity = intensityMin;
				intensityDirection = intensityDirection * -1;
			}

			// The path can be used as the public interface to the component behaviors contained within the scene object.
			ambientIntensityPath.set(intensity);
		}, 15);
		lightsNode.start();
	}

	const initialFunction = async () => {
		registerCustomComponent();
		const [sceneObject] = await sdk.Scene.createObjects(1);
		makeLight(sceneObject, {}, { x: -38.678383074276525, y: 2, z: -22.83219463891109 });
		let color = randomColor(1, 223 / 255, 0);
		for (const desc of sweepDesc) {
			addSphere(desc.position.x, desc.position.y + 5, desc.position.z, desc, color);
		}
		// sdk.Sweep.current.subscribe(function (currentSweep) {
		// 	// Change to the current sweep has occurred.
		// 	if (currentSweep.sid === '') {
		// 		console.log('Not currently stationed at a sweep position');
		// 	} else {
		// 		color = randomColor(66 / 255, 165 / 255, 245 / 255);
		// 		addSphere(currentSweep.position.x, currentSweep.position.y + 5, currentSweep.position.z, { id: currentSweep.sid }, color);
		// 	}
		// });
		// const sweepGraph = await sdk.Sweep.createGraph();
		// const startSweep = sweepGraph.vertex("612abc1d8ac449e68ea69f2304e16e56");
		// const endSweep = sweepGraph.vertex("fbafa1d664444e77b09bb5ae194451a8");

		// const aStarRunner = sdk.Graph.createAStarRunner(sweepGraph, startSweep, endSweep);
		// const result = aStarRunner.exec();
		// const path = result.path;
		// path.map((e) => {
		// 	//-31.678383074276525, 1.3582876760621081, -24.83219463891109
		// 	addIcosahedron(e.data.position.x, e.data.position.y + 2.5, e.data.position.z, e.data.id);
		// 	return 0;
		// }
		// );

		// aStarRunner.subscribe({
		// 	onChanged(runner) {
		// 		console.log('sweep graph has changed');
		// 	}
		// });


		// addComponentNode4();
		// addCube();
		// addSphere();
		// addIcosahedron();
		// addRing();
		// addHeart();
		addText();
		addSign();
		addPath();


		//add parrot
		const modelNode = sceneObject.addNode();

		const parrotComponent = modelNode.addComponent("mp.objLoader", {
			url:
				"https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/obj/female02/female02.obj",
		});
		parrotComponent.inputs.localScale = {
			x: 0.01,
			y: 0.01,
			z: 0.01
		};

		class ClickSpy {
			node = modelNode;
			component = parrotComponent;
			eventType = "INTERACTION.CLICK";
			onEvent(payload) {
				console.log("received node4", payload, this);
				console.log(this.component.outputs.objectRoot.scale);
				//alert(parrotComponent.inputs.localPosition.x);
				setTimeout(function () {
					modelNode.obj3D.position.set(-30.878383074276525,
						0.3,
						-25.18207994942);
				}, 0);
				setTimeout(function () {
					modelNode.obj3D.position.set(-30.878383074276525,
						0.18,
						-25.18207994942);
				}, 100);


			}
		}
		modelNode.obj3D.position.set(-30.878383074276525,
			0.18,
			-25.18207994942);
		parrotComponent?.spyOnEvent(new ClickSpy());
		modelNode.obj3D.rotation.y += 10;
		//modelNode.obj3D.rotation.y = -Math.PI;
		modelNode.start();

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
					setSound(soundElement, inRange.toString());
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
						isMobile ? sdk.Asset.registerTexture(`${mattertags[i].sid}1`, getImage(mattertags[i].label)) : sdk.Mattertag.registerIcon(`${mattertags[i].sid}1`, icon2);
						sdk.Tag.editIcon(mattertags[i].sid, `${mattertags[i].sid}1`);
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
			<audio loop src="https://cdn.videvo.net/videvo_files/audio/premium/audio0071/watermarked/CrowdTalking%201010_50_preview.mp3"></audio>
			<button id="sound" className="hidden btn btn-primary">
				<ion-icon name="volume-mute-outline"></ion-icon>
				Pause
			</button>
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
					src='/bundle/showcase.html?m=eE6srFdgFSR&help=1&play=0&qs=1&log=0&tour=3&hr=1&pin=0&hl=1&&title=1&&applicationKey=prigk78dz4crrmb7p98czk0kc&mdir=2'
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
