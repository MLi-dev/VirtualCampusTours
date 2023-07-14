import setupSdk from "@matterport/sdk";
import { useState, useRef, useEffect } from "react";
import { hotspots } from "./hotspots";

function App() {
	const [sdk, setSdk] = useState();
	const [isLoaded, setIsLoaded] = useState(false);
	const container = useRef();
	let started = false;
	useEffect(() => {
		if (!started && container.current) {
			started = true;
			setupSdk("prigk78dz4crrmb7p98czk0kc", {
				container: container.current,
				space: "eE6srFdgFSR",
				iframeQueryParams: { qs: 1 },
			})
				.then(setSdk)
				.then(setIsLoaded(false));
		}
	}, []);
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
				mediaType: e.type,
				mediaSrc: e.url,
			});
		});
		sdk.Mattertag.add(matterTags).then(function (mattertagIds) {
			console.log(mattertagIds);
		});
	};

	return (
		<>
			<div className='container' ref={container}></div>
		</>
	);
}

export default App;
