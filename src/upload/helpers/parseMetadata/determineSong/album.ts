import { ICommonTagsResult } from "music-metadata-browser"
import bufferToDataUrl from "@oly_op/music-app-common/bufferToDataUrl"

import { splitList } from "./common"
import { AlbumParsed } from "../../../types"

const determineReleased = (year: number | undefined) =>
	Math.floor((new Date(year ? year.toString() : Math.floor(Date.now() / 1000))).valueOf() / 1000)

export const determineAlbum = ({ album, albumartist, picture, year }: ICommonTagsResult): AlbumParsed => ({
	title: album || "",
	released: determineReleased(year),
	artists: albumartist ? splitList(albumartist) : [],
	cover: picture ? bufferToDataUrl(picture[0].data) : null,
})