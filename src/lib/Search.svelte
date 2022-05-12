<script lang="ts">
	import { faGoogle, faYoutube } from "@fortawesome/free-brands-svg-icons";

	import { faDuckDuckGo } from "$lib/assets/icons/Icons";

	import InputRadio from "./InputRadio.svelte";

	const searchEngines = {
		google: "https://www.google.com/search",
		duckduckgo: "https://duckduckgo.com/",
		youtube: "https://www.youtube.com/results?search_query=",
	};

	let group = "google";

	$: action = searchEngines[group as keyof object];
</script>

<div class="flex gap-3 py-2 px-5 bg-">
	<InputRadio bind:group name="google" label="google" value="google" checked icon={faGoogle} />
	<InputRadio
		bind:group
		name="duckduckgo"
		label="duckduckgo"
		value="duckduckgo"
		icon={faDuckDuckGo}
	/>
	<InputRadio bind:group name="youtube" label="youtube" value="youtube" icon={faYoutube} />

	<form class="flex w-full gap-3" {action} target="_blank" method="get">
		<input
			class="w-full rounded-xl p-2 f "
			type="text"
			name="q"
			id="q"
			placeholder="What does the fox say?"
		/>

		<button class="rounded-xl py-4 px-6 lc-gradient "> Go! </button>
	</form>
</div>
