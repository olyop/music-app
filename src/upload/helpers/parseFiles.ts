import { parseBlob } from "music-metadata-browser"

import { TempSong } from "../types"
import { parseMetadata } from "./parseMetadata"

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