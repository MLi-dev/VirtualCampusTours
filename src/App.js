import setupSdk from "@matterport/sdk";
import { useState, useRef, useEffect } from "react";
import { hotspots } from "./hotspots";
import Iframe from "./UI/Iframe";
import "./App.css";

function App() {
	const [sdk, setSdk] = useState();
	const [isLoaded, setIsLoaded] = useState(false);
	const container = useRef();
	const [iframe, setIframe] = useState();
	let started = false;
	const showCaseLoaded = async () => {
		const showcase = document.getElementById("showcase");
		const key = "w78qr7ncg7npmnhwu1xi07yza";
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
		console.log("Camera rotating!");
	};
	async function loaded() {
		await sdk?.App.state.waitUntil(
			(state) => state.phase === sdk.App.Phase.PLAYING
		);
	}
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
				// color: "#FFFF00",
			});
		});
		sdk.Mattertag.add(matterTags).then(function (mattertagIds) {
			console.log(mattertagIds);
		});
	};

	return (
		<>
			<div className='container' ref={container}>
				{iframe && <Iframe title={iframe.title} message={iframe.message} />}
				<iframe
					id='showcase'
					src='/bundle/showcase.html?m=V5hx2ktRhvH&play=1&qs=1&log=0&applicationKey=w78qr7ncg7npmnhwu1xi07yza'
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

export default App;
