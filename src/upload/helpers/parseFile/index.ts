import { IAudioMetadata } from "music-metadata-browser"

import {
	determineMix,
	determineTitle,
	determineAlbum,
	determineGenres,
	determineArtists,
	determineDuration,
	determineDiscNumber,
	determineTrackNumber,
} from "./determineFields"

import { Song } from "../../types"

export const parseFile = (metadata: IAudioMetadata): Song => ({
	mix: determineMix(metadata),
	album: determineAlbum(metadata),
	title: determineTitle(metadata),
	genres: determineGenres(metadata),
	artists: determineArtists(metadata),
	duration: determineDuration(metadata),
	discNumber: determineDiscNumber(metadata),
	trackNumber: determineTrackNumber(metadata),
})