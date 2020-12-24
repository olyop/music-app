import { parseBlob } from "music-metadata-browser"

import { TempSong } from "../types"
import { parseMetadata } from "./parseMetadata"

const parseFile =
	async (audio: File): Promise<TempSong> => {
		const metadata = await parseBlob(audio)
		return { metadata, audio }
	}

export const parseFiles =
	async (fileList: FileList) => {
		const files = Array.from(fileList)
		const promises = files.map(parseFile)
		return Promise.all(promises).then(parseMetadata)
	}