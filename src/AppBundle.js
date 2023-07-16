import setupSdk from "@matterport/sdk";
import { useState, useRef, useEffect } from "react";
import { hotspots } from "./hotspots";
import Iframe from "./UI/Iframe";
import "./App.css";
import sourceDescs from "./sources.json";

function AppBundle() {
	const [sdk, setSdk] = useState();
	const [isLoaded, setIsLoaded] = useState(false);
	const [iframe, setIframe] = useState();
	const container = useRef();
	let started = false;
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
			if (state.phase == "appphase.playing") {
				return true;
			} else {
				return false;
			}
		});
	};
	useEffect(() => {
		loaded().then(
			sdk?.App.state.waitUntil((state) =>
				state.phase === "appphase.playing"
					? setIsLoaded(true)
					: console.log(state.phase)
			)
		);
	}, [sdk]);
	useEffect(() => {
		if (isLoaded) {
			startSDKHere();
		}
	}, [isLoaded]);
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
	const initialFunction = async () => {
		// const [sceneObject] = await sdk.Scene.createObjects(1);
		// // add light
		// const lights = sceneObject.addNode();
		// lights.addComponent("mp.lights");
		// lights.start();
		// // add parrot
		// const modelNode = sceneObject.addNode();
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
		// 	modelNode.obj3D.rotation.z += 0.002;
		// };
		// tick();

		// add sensor
		const textElement = document.getElementById("showcase");
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
					alert("I am in");
					console.log("I am in range");
					textElement.append(`<div>hello</div>`); // setMessage(textElement, "hello");
				} else {
					console.log("I am out of range"); //clearMesssage(textElement);
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
		let matterTagDesc = {
			label: "(1/8) Meet your tour guide!",
			description: "",
			anchorPosition: {
				x: -33.32117261846476,
				y: 1.1582876760621081,
				z: -24.18207994942,
			},
			stemVector: { x: 0, y: 0.3, z: 0 },
			mediaType: "video",
			mediaSrc: "https://youtu.be/6DP3aZY1woQ",
		};
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
				media: {
					type: e.type,
					src: e.url,
				},
			});
		});
		sdk.Mattertag.add(matterTags).then(function (mattertagIds) {
			console.log(mattertagIds);
		});
	};
	const iframeHandler = () => {
		setIframe(null);
	};
	return (
		<>
			<div className='container'>
				{iframe && (
					<Iframe
						title={iframe.title}
						message={iframe.message}
						onConfirm={iframeHandler}
					/>
				)}
				<iframe
					id='showcase'
					src='/bundle/showcase.html?m=eE6srFdgFSR&play=1&qs=1&log=0&applicationKey=prigk78dz4crrmb7p98czk0kc'
					width='1200px'
					height='800px'
					frameBorder='0'
					allow='xr-spatial-tracking'
					allowFullScreen
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
