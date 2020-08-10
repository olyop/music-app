import { parseBlob } from "music-metadata-browser"

import { parseMetadata } from "./parseMetadata"

export const parseFiles = (fileList: FileList) => {
	const files = Array.from(fileList)
	const promises = files.map(file => parseBlob(file))
	return Promise.all(promises).then(parseMetadata(files))
}