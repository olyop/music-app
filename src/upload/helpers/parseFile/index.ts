import { IAudioMetadata } from "music-metadata-browser"

import {
	determineMix,
	determineTitle,
	determineDuration,
	determineDiscNumber,
	determineTrackNumber,
} from "./determineFields"

import { Song } from "../../types"

export const parseFile = (metadata: IAudioMetadata): Song => ({
	mix: determineMix(),
	title: determineTitle(metadata),
	duration: determineDuration(metadata),
	discNumber: determineDiscNumber(metadata),
	trackNumber: determineTrackNumber(metadata),
})