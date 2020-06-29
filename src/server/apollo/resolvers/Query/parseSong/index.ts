import { FileUpload } from "graphql-upload"
import { parseStream } from "music-metadata"

import { parseMetadata } from "./parseMetadata"
import { MetadataResponse } from "./metadataResponse"
import { createStreamFromUpload } from "../../../../helpers"

export type { MetadataResponse }

export const parseSong =
	(file: Promise<FileUpload>) =>
		new Promise<MetadataResponse>(
			(resolve, reject) => {
				createStreamFromUpload(file)
					.then(parseStream)
					.then(parseMetadata)
					.then(resolve)
					.catch(reject)
			},
		)