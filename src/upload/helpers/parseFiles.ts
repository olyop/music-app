import { parseBlob } from "music-metadata-browser"

import { Album } from "../types"
import { parseMetadata } from "./parseMetadata"

export const parseFiles =
	(fileList: FileList) =>
		new Promise<Album[]>(
			(resolve, reject) => {
				const files = Array.from(fileList)
				const promises = files.map(file => parseBlob(file))
				Promise
					.all(promises)
					.then(parseMetadata(files))
					.then(resolve)
					.catch(reject)
			},
		)