import { IAudioMetadata } from "music-metadata-browser"

import { Album } from "../../../types"
import { bufferToDataUrl } from "../../bufferToDataUrl"

export const determineAlbum = ({ common }: IAudioMetadata): Album => ({
	title: common.album || "",
	released: common.year || Math.floor(Date.now() / 1000),
	artists: common.albumartist ? [common.albumartist] : [],
	cover: common.picture ? bufferToDataUrl(common.picture[0].data) : null,
})