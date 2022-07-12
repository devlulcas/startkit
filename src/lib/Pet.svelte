<script lang="ts">
	import WidgetContainer from "./WidgetContainer.svelte";

	import * as THREE from "three";
	import * as SC from "svelte-cubed";

	let x = 0;
	let z = 0;

	const handleMove = (event: KeyboardEvent) => {
		if (event.key === "ArrowUp") {
			z -= 0.1;
		}

		if (event.key === "ArrowDown") {
			z += 0.1;
		}

		if (event.key === "ArrowLeft") {
			x -= 0.1;
		}

		if (event.key === "ArrowRight") {
			x += 0.1;
		}
	};

	let container: HTMLElement;
	function getMouseData(event: MouseEvent) {
		const positionX = event.pageX - container.offsetLeft;
		const positionY = event.pageY - container.offsetTop;
		return { x: positionX / 100, y: positionY / 100 };
	}

	let colorSum = 1;
	let cubes = [{ x: 0, y: 0, material: new THREE.MeshStandardMaterial({ color: 0xff3e60 }) }];

	function add(event: MouseEvent) {
		const pos = getMouseData(event);
		const material = new THREE.MeshStandardMaterial({ color: 0xff3e60 + colorSum });
		cubes = [...cubes, { x: pos.x, y: pos.y, material: material }];
		colorSum += colorSum;
	}
</script>

<svelte:window on:click={add} on:keydown={handleMove} />

<WidgetContainer>
	<div bind:this={container}>
		<SC.Canvas
			fog={new THREE.FogExp2("papayawhip", 0.01)}
			shadows
			antialias
			background={new THREE.Color("papayawhip")}
		>
			<SC.PerspectiveCamera position={[0, 3, 2]} />
			<SC.OrbitControls enableZoom={true} />
			<SC.AmbientLight intensity={0.6} />
			<SC.DirectionalLight
				shadow={{ mapSize: [2048, 2048] }}
				intensity={0.6}
				position={[-1, 3, 2]}
			/>

			<SC.Mesh
				geometry={new THREE.BoxGeometry(1, 1)}
				material={new THREE.MeshStandardMaterial({ color: 0xff3e00 })}
				castShadow
				position={[x, 0, z]}
			/>

			{#each cubes as cube}
				<SC.Mesh
					geometry={new THREE.BoxGeometry(1, 1)}
					material={cube.material}
					castShadow
					position={[x + cube.x, 0, z + cube.y]}
				/>
			{/each}

			<SC.Group position={[0, -1 / 2, 0]}>
				<SC.Mesh
					geometry={new THREE.PlaneGeometry(50, 50)}
					material={new THREE.MeshStandardMaterial({ color: "green" })}
					rotation={[-Math.PI / 2, 0, 0]}
					receiveShadow
				/>

				<SC.Primitive
					object={new THREE.GridHelper(50, 50, 0x444444, 0x555555)}
					position={[0, 0, 0]}
				/>
			</SC.Group>
		</SC.Canvas>
	</div>
</WidgetContainer>
