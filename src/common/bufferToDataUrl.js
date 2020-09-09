"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bufferToDataUrl = (buffer) => `data:image/jpeg;base64,${buffer.toString("base64")}`;
exports.default = bufferToDataUrl;
