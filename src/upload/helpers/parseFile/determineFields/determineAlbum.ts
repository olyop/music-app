import { IAudioMetadata } from "music-metadata-browser"

import { Album } from "../../../types"

export const determineAlbum = ({ common }: IAudioMetadata): Album => ({
	title: common.album || "",
	released: common.year || Math.floor(Date.now() / 1000),
})