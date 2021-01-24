import type { ICommonTagsResult } from "music-metadata"
import bufferToDataUrl from "@oly_op/music-app-common/bufferToDataUrl"

import { splitList } from "./common"
import { AlbumParsed } from "../types"
import { dataUrlToBlob } from "../../dataUrlToBlob"

const getCurrentYear = () =>
	(new Date()).getFullYear()

const determineReleased = (year: number | undefined) =>
	new Date(`${year || getCurrentYear()}-01-01T00:00:00+00:00`)

export const determineAlbum = ({ album, albumartist, picture, year }: ICommonTagsResult): AlbumParsed => ({
	title: album || "",
	released: determineReleased(year),
	artists: albumartist ? splitList(albumartist) : [],
	cover: picture ? dataUrlToBlob(bufferToDataUrl(picture[0].data)) : null,
})