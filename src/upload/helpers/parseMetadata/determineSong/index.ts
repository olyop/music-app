import uniqueId from "lodash/uniqueId"
import { IAudioMetadata } from "music-metadata-browser"

import { determineAlbum } from "./album"
import { determineGenres } from "./genres"
import { determineArtists } from "./artists"
import { determineDuration } from "./duration"
import { determineRemixers } from "./remixers"
import { determineFeaturing } from "./featuring"
import { determineMix, determineTitle } from "./titleAndMix"
import { determineDiscNumber, determineTrackNumber } from "./discAndTrackNumber"

import { SongParsed } from "../../../types"

const determineSong = ({ common, format }: IAudioMetadata): SongParsed => ({
	songId: uniqueId(),
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

export default determineSong