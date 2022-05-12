<script lang="ts">
	import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";

	import Fa from "svelte-fa/src/fa.svelte";

	export let label: string;
	export let name: string;
	export let checked = false;
	export let value: any;
	export let group: string;
	export let icon: IconDefinition;
</script>

<label class="lc-gradient">
	<input
		aria-label={label}
		class="hidden"
		bind:group
		type="radio"
		id={name}
		{name}
		{value}
		{checked}
	/>

	<div class="lc-icon">
		<Fa class="text-4xl hover:text-green-200" {icon} />
	</div>
</label>

<style lang="postcss">
	label {
		@apply transition-transform p-2 rounded-full aspect-square min-w-max w-16 flex justify-center items-center cursor-pointer active:scale-125;
	}

	input[type="radio"] {
		&:checked {
			& + .lc-icon {
				@apply text-green-300;
			}
		}
	}
</style>
