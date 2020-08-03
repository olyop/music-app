import uniqueId from "lodash/uniqueId"
import { IAudioMetadata } from "music-metadata-browser"

import {
	determineMix,
	determineTitle,
	determineAlbum,
	determineGenres,
	determineArtists,
	determineDuration,
	determineRemixers,
	determineFeaturing,
	determineDiscNumber,
	determineTrackNumber,
} from "./determineFields"

import { Song } from "../../types"

export const parseMetadata = ({ common, format }: IAudioMetadata): Song => ({
	id: uniqueId(),
	mix: determineMix(common),
	album: determineAlbum(common),
	title: determineTitle(common),
	genres: determineGenres(common),
	artists: determineArtists(common),
	duration: determineDuration(format),
	remixers: determineRemixers(common),
	featuring: determineFeaturing(common),
	discNumber: determineDiscNumber(common),
	trackNumber: determineTrackNumber(common),
})