import { parseBuffer } from "music-metadata"

import { SongUpload } from "../types"

export const getSongDuration = async ({ audio }: SongUpload) =>
	Math.floor((await parseBuffer(audio)).format.duration || 0)