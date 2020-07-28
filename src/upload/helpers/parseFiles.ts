import map from "lodash/fp/map"
import { parseBlob } from "music-metadata-browser"

import { Song } from "../types"
import { parseMetadata } from "./parseMetadata"

export const parseFiles = (fileList: FileList | null) =>
	new Promise<Song[]>(
		(resolve, reject) => {
			const files = Array.from(fileList!)
			const promises = files.map(file => parseBlob(file))
			Promise.all(promises)
				.then(map(parseMetadata))
				.then(resolve)
				.catch(reject)
		},
	)