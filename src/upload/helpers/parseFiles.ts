import { parseBlob } from "music-metadata-browser"
// import type { IAudioMetadata } from "music-metadata"

import { TempSong } from "../types"
import { parseMetadata } from "./parseMetadata"

// const parseBlob = (file: File) =>
// 	Promise.resolve((({}) as unknown) as IAudioMetadata)

const parseFile = (file: File) =>
	new Promise<TempSong>(
		(resolve, reject) => {
			parseBlob(file)
				.then(metadata => ({
					metadata,
					audio: file,
				}))
				.then(resolve)
				.catch(reject)
		},
	)

export const parseFiles = (fileList: FileList) => {
	const files = Array.from(fileList)
	const promises = files.map(parseFile)
	return Promise.all(promises).then(parseMetadata)
}