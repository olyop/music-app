import { isFile } from "./isFile"

export const isImg = (img: Buffer) =>
	isFile(img) && img.length <= 1e7