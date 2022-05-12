import { ColorMath } from "./ColorMath";

type ColorTuple = [number, number, number, number];
type HexaTuple = [string, string, string, string];
export type Colors = {
	rgbaColorString: string;
	hslaColorString: string;
	hexaColorString: string;
};

class Color {
	static transformUnknown(color: string) {
		const acceptedStarts = ["r", "h", "#"];

		const treatedInput = color.trim().toLowerCase();
		const firstLetter = treatedInput.charAt(0);

		if (!acceptedStarts.includes(firstLetter)) return;
		let rgbaValue: ColorTuple;
		let hslaValue: ColorTuple;
		let hexaValue: HexaTuple;

		if (firstLetter === "r") {
			rgbaValue = this.rgbaToRgbaArray(treatedInput);
			hslaValue = this.rgbaToHsla(...rgbaValue);
			hexaValue = this.rgbaToHexa(...rgbaValue);
		} else if (firstLetter === "h") {
			rgbaValue = this.hslaToRgbaArray(treatedInput);
			hslaValue = this.rgbaToHsla(...rgbaValue);
			hexaValue = this.rgbaToHexa(...rgbaValue);
		} else {
			rgbaValue = this.hexaToRgbaArray(treatedInput);
			hslaValue = this.rgbaToHsla(...rgbaValue);
			hexaValue = this.rgbaToHexa(...rgbaValue);
		}

		const rgbaColorString = `rgba(${rgbaValue[0]}, ${rgbaValue[1]}, ${rgbaValue[2]}, ${rgbaValue[3]})`;
		const hslaColorString = `hsla(${hslaValue[0]}, ${hslaValue[1]}%, ${hslaValue[2]}%, ${hslaValue[3]})`;
		const hexaColorString = `#${hexaValue[0]}${hexaValue[1]}${hexaValue[2]}${hexaValue[3]}`;

		return {
			rgbaColorString,
			hslaColorString,
			hexaColorString,
		};
	}

	// Receives a rgba string, returns an array of red, green, blue and alpha
	static rgbaToRgbaArray(rgba: string): ColorTuple {
		const replaceable = /["rgb", "a", "(", ")", ","]/g;

		const cleanRgba = rgba.replace(replaceable, " ");

		const [r, g, b, a] = cleanRgba
			.split(" ")
			.filter((value) => value)
			.map((value) => parseInt(value));

		let alpha = a ?? 1;

		if (a > 1) {
			alpha = ColorMath.rgbaLimitedAlpha(a);
		}

		return [r, g, b, alpha];
	}

	// Receives a hexa string, returns an array of red, green, blue and alpha
	static hexaToRgbaArray(hexa: string): ColorTuple {
		const replaceable = /["#"]/g;

		const cleanHexa = hexa.replace(replaceable, "");

		let filledHexa = cleanHexa;
		const defaultAlpha = "ff";

		switch (cleanHexa.length) {
			case 2:
				filledHexa = cleanHexa.repeat(3) + defaultAlpha;
				break;
			case 3:
				filledHexa = cleanHexa.repeat(2) + defaultAlpha;
				break;
			case 6:
				filledHexa = cleanHexa + defaultAlpha;
				break;
			default:
				filledHexa = cleanHexa.padEnd(8, "f");
				break;
		}

		const transformedData = filledHexa
			.split("")
			.map((value, index) => (index % 2 ? filledHexa[index - 1] + value : ""))
			.filter((value) => value)
			.map((value) => parseInt(value, 16));

		const [r, g, b, a] = transformedData;

		const alpha = ColorMath.rgbaLimitedAlpha(a);

		return [r, g, b, alpha];
	}

	// Receives a hsla string, returns an array of red, green, blue and alpha
	static hslaToRgbaArray(hsla: string): ColorTuple {
		const replaceable = /["hsla", "a", "(", ")", ",", "%"]/g;

		const cleanHsla = hsla.replace(replaceable, " ");

		// 0 0% 100% 1
		const [h, s, l, a] = cleanHsla.split(" ").filter((value) => value);

		const hueInDegrees = ColorMath.hueToDegree(h);
		const saturation = parseInt(s) / 100;
		const light = parseInt(l) / 100;

		const chroma = (1 - Math.abs(2 * light - 1)) * saturation;
		const secondLargestComponent = chroma * (1 - Math.abs(((hueInDegrees / 60) % 2) - 1));
		const matchLightness = light - chroma / 2;

		const rgb = ColorMath.rgbFromHslValues(
			hueInDegrees,
			chroma,
			secondLargestComponent,
			matchLightness,
		);

		const alpha = a ?? 1;

		const [hF, sF, lF] = [...rgb];

		const color: ColorTuple = [hF, sF, lF, parseFloat(alpha)];
		return color;
	}

	static rgbaToHsla(r: number, g: number, b: number, a: number): ColorTuple {
		const [rF, gF, bF] = [r, g, b].map((color) => color / 255);

		const minChannel = Math.min(rF, gF, bF);
		const maxChannel = Math.max(rF, gF, bF);
		const delta = maxChannel - minChannel;

		let h = 0;
		let s = 0;
		let l = 0;
		console.log(h);

		// Gets the biggest channel of color: red, green, blue or all the same;

		if (delta === 0) {
			h = 0;
		} else {
			switch (maxChannel) {
				case rF:
					h = ((gF - bF) / delta) % 6;
					break;

				case gF:
					h = (bF - rF) / delta + 2;
					break;

				case bF:
					h = (rF - gF) / delta + 4;
					break;
			}
		}

		// Get's closer to the degree value
		h = Math.round(h * 60);

		// Corrects the value when it goes negative (-20 == 340)
		if (h < 0) h += 360;

		// Light
		l = (maxChannel + minChannel) / 2;

		// Saturation (when the diference of r, g, b (delta) is zero then the color is a shade of gray)
		s = !delta ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// To percentage
		l = parseFloat((l * 100).toFixed(1));
		s = parseFloat((s * 100).toFixed(1));

		return [h, s, l, a];
	}

	static rgbaToHexa(r: number, g: number, b: number, a: number): HexaTuple {
		let rHexa = r.toString(16);
		let gHexa = g.toString(16);
		let bHexa = b.toString(16);
		let aHexa = Math.round(a * 255).toString(16);

		if (rHexa.length == 1) rHexa = "0" + rHexa;
		if (gHexa.length == 1) gHexa = "0" + gHexa;
		if (bHexa.length == 1) bHexa = "0" + bHexa;
		if (aHexa.length == 1) aHexa = "0" + aHexa;

		return [rHexa, gHexa, bHexa, aHexa];
	}
}

export default Color;
