import { ICommonTagsResult } from "music-metadata-browser"
import { bufferToDataUrl } from "@oly_op/music-app-common"

import { splitList } from "./common"
import { AlbumParsed } from "../../../types"

const determineReleased = (year: number | undefined) =>
	new Date(year ? year.toString() : Math.floor(Date.now() / 1000)).valueOf()

export const determineAlbum = ({ album, albumartist, picture, year }: ICommonTagsResult): AlbumParsed => ({
	title: album || "",
	released: determineReleased(year),
	artists: albumartist ? splitList(albumartist) : [],
	cover: picture ? bufferToDataUrl(picture[0].data) : null,
})