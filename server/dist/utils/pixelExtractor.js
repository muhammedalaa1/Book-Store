"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPixelData = void 0;
const canvas_1 = require("canvas");
const getPixelData = (image) => {
    return new Promise((resolve, reject) => {
        if (!image)
            return resolve(null);
        const img = new canvas_1.Image();
        img.src = image;
        img.onload = () => {
            const canvas = (0, canvas_1.createCanvas)(img.width, img.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
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
exports.getPixelData = getPixelData;
