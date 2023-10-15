import React, { useEffect, useRef } from "react";

interface ImagePixelExtractorProps {
	imageUrl: string;
	onPixelExtracted?: (pixelData: number[]) => void;
}

const ImagePixelExtractor: React.FC<ImagePixelExtractorProps> = ({
	imageUrl,
	onPixelExtracted,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d", { willReadFrequently: true });
		if (!ctx) return;

		const img = new Image();
		img.crossOrigin = "anonymous";

		// Handle successful image load
		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);

			const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
			const lastPixel = [
				imageData[imageData.length - 4], // Red
				imageData[imageData.length - 3], // Green
				imageData[imageData.length - 2], // Blue
				imageData[imageData.length - 1], // Alpha
			];

			if (onPixelExtracted) {
				onPixelExtracted(lastPixel);
			}
		};

		// Handle image load errors
		img.onerror = () => {
			console.error(`Failed to load image: ${imageUrl}`);
			// Handle the error accordingly, maybe provide a default pixel data or notify the parent.
		};

		img.src = imageUrl;

		// Clean-up logic to prevent memory leaks
		return () => {
			img.onload = null;
			img.onerror = null;
		};
	}, [imageUrl, onPixelExtracted]);

	return <canvas ref={canvasRef} style={{ display: "none" }} />;
};

export default ImagePixelExtractor;
