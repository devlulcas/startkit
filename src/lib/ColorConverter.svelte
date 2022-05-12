<script lang="ts">
	import Color, { type Colors } from "../models/service/Color";

	import WidgetContainer from "./WidgetContainer.svelte";

	let color = "";

	const defaultColors: Colors = {
		hexaColorString: "#ffffffff",
		hslaColorString: "hsla(0, 100%, 100%, 1)",
		rgbaColorString: "rgba(255, 255, 255, 1)",
	};

	$: colors = Color.transformUnknown(color) ?? defaultColors;
</script>

<WidgetContainer>
	<div class="flex rounded-xl bg-violet-50">
		<label for="converter" class="py-2 px-4 rounded-xl bg-violet-600 text-xl text-white">
			Color
		</label>
		<input
			bind:value={color}
			type="text"
			name="converter"
			id="converter"
			class="px-2 bg-transparent w-full rounded-xl"
		/>
	</div>

	<div class="flex flex-col gap-2">
		<code class="flex p-2 rounded-md bg-violet-50 gap-2">
			<div
				class="w-6 h-6 border-2 border border-violet-500 rounded-full"
				style="background-color:{colors.rgbaColorString};"
			/>
			<p>
				{colors.rgbaColorString}
			</p>
		</code>

		<code class="flex p-2 rounded-md bg-violet-50 gap-2">
			<div
				class="w-6 h-6 border-2 border border-violet-500 rounded-full"
				style="background-color:{colors.hslaColorString};"
			/>
			{colors.hslaColorString}
		</code>

		<code class="flex p-2 rounded-md bg-violet-50 gap-2">
			<div
				class="w-6 h-6 border-2 border border-violet-500 rounded-full"
				style="background-color:{colors.hexaColorString};"
			/>
			{colors.hexaColorString}
		</code>
	</div>
</WidgetContainer>
