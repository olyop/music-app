import type { ICommonTagsResult } from "music-metadata"
import bufferToDataUrl from "@oly_op/music-app-common/bufferToDataUrl"

import { splitList } from "./common"
import { AlbumParsed } from "../types"
import { dataUrlToBlob } from "../../dataUrlToBlob"

const determineReleased = (year: number | undefined) =>
	Math.floor(((year ? (new Date(year, 0, 0)).valueOf() : Date.now()) / 1000) / 86400)

export const determineAlbum = ({ album, albumartist, picture, year }: ICommonTagsResult): AlbumParsed => ({
	title: album || "",
	released: determineReleased(year),
	artists: albumartist ? splitList(albumartist) : [],
	cover: picture ? dataUrlToBlob(bufferToDataUrl(picture[0].data)) : null,
})