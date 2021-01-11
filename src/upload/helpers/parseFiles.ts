import * as mm from "music-metadata-browser"

import { TempSong } from "../types"
import { parseMetadata } from "./parseMetadata"

const parseFile =
	async (audio: File): Promise<TempSong> => {
		const metadata = await mm.parseBlob(audio)
		return { metadata, audio }
	}

export const parseFiles =
	async (fileList: FileList) => {
		const files = Array.from(fileList)
		return Promise.all(files.map(parseFile)).then(parseMetadata)
	}