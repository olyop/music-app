import { FileUpload } from "graphql-upload"
import { parseStream } from "music-metadata"

import { MetadataSong } from "./types"
import { parseMetadata } from "./parseMetadata"
import { createStreamFromUpload } from "../../../../helpers"

export const parseFile =
	(file: Promise<FileUpload>) =>
		new Promise<MetadataSong>(
			(resolve, reject) => {
				createStreamFromUpload(file)
					.then(parseStream)
					.then(parseMetadata)
					.then(resolve)
					.catch(reject)
			},
		)