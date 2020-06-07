import { isFile } from "./isFile"

export const isAudio = (audio: Buffer) =>
	isFile(audio) && audio.length <= 5e7