import { Image, createCanvas } from "canvas";

export const getPixelData = (
	image: string | undefined
): Promise<null | number[]> => {
	return new Promise((resolve, reject) => {
		if (!image) return resolve(null);

		const img = new Image();
		img.src = image;

		img.onload = () => {
			const canvas = createCanvas(img.width, img.height);
			const ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0);

			const imageData = ctx.getImageData(
				0,
				0,
				canvas.width,
				canvas.height
			).data;

			const lastPixel = [
				imageData[imageData.length - 4], // Red
				imageData[imageData.length - 3], // Green
				imageData[imageData.length - 2], // Blue
				imageData[imageData.length - 1], // Alpha
			];
			resolve(lastPixel);
		};

		img.onerror = (err) => {
			reject(err);
		};

		setTimeout(() => {
			reject(new Error("Timeout uwu"));
		}, 20000);
	});
};
