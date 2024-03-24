"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("canvas");
exports.getPixelData = (image) => {
    return new Promise((resolve, reject) => {
        if (!image)
            return resolve(null);
        const img = new canvas_1.Image();
        img.src = image;
        img.onload = () => {
            const canvas = canvas_1.createCanvas(img.width, img.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            const lastPixel = [
                imageData[imageData.length - 4],
                imageData[imageData.length - 3],
                imageData[imageData.length - 2],
                imageData[imageData.length - 1],
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
