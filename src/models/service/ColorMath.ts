class ColorMath {
	static radToDegree(value: number) {
		return Math.round(value * (180 / Math.PI));
	}

	static turnToDegree(value: number) {
		return Math.round(value * 360);
	}

	static rgbaLimitedAlpha(value: number) {
		return parseFloat((value / 255).toFixed(2));
	}

	static hueToDegree(hue: string) {
		let deg = 0;
		if (hue.endsWith("rad")) {
			const temp = this.removeStrings(hue, /rad/g);
			deg = this.radToDegree(temp);
		}

		if (hue.endsWith("turn")) {
			const temp = this.removeStrings(hue, /turn/g);
			deg = this.turnToDegree(temp);
		}

		if (hue.endsWith("deg")) {
			deg = this.removeStrings(hue, /deg/g);
		}

		if (deg >= 360) return deg % 360;

		return deg;
	}

	static rgbFromHslValues(
		hueInDegrees: number,
		chroma: number,
		secondLargestComponent: number,
		matchLightness: number,
	) {
		let r, g, b;
		// Red to Yellow
		if (0 <= hueInDegrees && hueInDegrees < 60) {
			r = chroma;
			g = secondLargestComponent;
			b = 0;
			return this.rgbaLightness(matchLightness, r, g, b);
		}

		// Yellow to green
		if (60 <= hueInDegrees && hueInDegrees < 120) {
			r = secondLargestComponent;
			g = chroma;
			b = 0;
			return this.rgbaLightness(matchLightness, r, g, b);
		}

		// Green to cyan
		if (120 <= hueInDegrees && hueInDegrees < 180) {
			r = 0;
			g = chroma;
			b = secondLargestComponent;
			return this.rgbaLightness(matchLightness, r, g, b);
		}

		// Cyan to blue
		if (180 <= hueInDegrees && hueInDegrees < 240) {
			r = 0;
			g = secondLargestComponent;
			b = chroma;
			return this.rgbaLightness(matchLightness, r, g, b);
		}

		// Blue to magenta
		if (240 <= hueInDegrees && hueInDegrees < 300) {
			r = secondLargestComponent;
			g = 0;
			b = chroma;
			return this.rgbaLightness(matchLightness, r, g, b);
		}

		// Magenta to red
		if (300 <= hueInDegrees && hueInDegrees < 360) {
			r = chroma;
			g = 0;
			b = secondLargestComponent;
			return this.rgbaLightness(matchLightness, r, g, b);
		}

		return [0, 0, 0];
	}

	static rgbaLightness(matchLightness: number, r: number, g: number, b: number) {
		const red = Math.round((r + matchLightness) * 255);
		const green = Math.round((g + matchLightness) * 255);
		const blue = Math.round((b + matchLightness) * 255);
		return [red, green, blue];
	}

	private static removeStrings(original: string, regex: RegExp) {
		const clean = original.replace(regex, "");
		return Number(clean);
	}
}

export { ColorMath };
