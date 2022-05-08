<script lang="ts">
	import "../app.css";
	import NavBar from "$lib/NavBar.svelte";
</script>

<NavBar />
<slot />

<style>
	:global(.lc-gradient) {
		background-image: linear-gradient(0deg, #5b21b6, #a855f7);
	}
</style>
