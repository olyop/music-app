import map from "lodash/fp/map"
import { ApolloClient } from "@apollo/client"
import { parseBlob } from "music-metadata-browser"

import { Song } from "../types"
import { parseMetadata } from "./parseMetadata"
import { populateSongs } from "./populateSongs"

export const parseFiles =
	(apollo: ApolloClient<unknown>, fileList: FileList) =>
		new Promise<Song[]>(
			(resolve, reject) => {
				const files = Array.from(fileList)
				const promises = files.map(file => parseBlob(file))
				Promise
					.all(promises)
					.then(map(parseMetadata))
					.then(populateSongs(apollo))
					.then(resolve)
					.catch(reject)
			},
		)