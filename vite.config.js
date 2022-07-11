import { sveltekit } from "@sveltejs/kit/vite";

const config = {
	plugins: [sveltekit()],
	ssr: {
		noExternal: ["@fortawesome/*"],
	},
};

export default config;
