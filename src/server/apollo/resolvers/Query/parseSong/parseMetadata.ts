import { isEmpty } from "lodash"

import {
	IFormat as Format,
	IAudioMetadata as Metadata,
	ICommonTagsResult as Common,
} from "music-metadata"

import { EMPTY_DATA_URL } from "../../../../globals"
import { MetadataResponse } from "./metadataResponse"
import { pipe, toDataUrl } from "../../../../helpers"
import { splitList, strHasBrackets, strFindBrackets } from "./common"

const removeMix = (str: string) =>
	(str.includes("Extended") ?
		str.slice(0, str.indexOf("Extended") - 1) :
		str)

const removeFeat = (artist: string) =>
	(artist.includes(" feat") ?
		artist.slice(0, artist.indexOf(" feat")) :
		artist)

const determineTitle = ({ title }: Common) => {
	if (title) {
		if (strHasBrackets(title)) {
			const brackets = strFindBrackets(title)
			if (brackets.includes("Extended") ||
					brackets.includes("Remix") ||
					brackets.includes("Original")) {
				return title.slice(0, title.indexOf(brackets) - 2)
			} else {
				return title
			}
		} else {
			return title
		}
	} else {
		return ""
	}
}

const determineMix = ({ title }: Common) => {
	if (title) {
		if (title.includes("Extended")) {
			return "Extended"
		} else if (title.includes("Original")) {
			return "Original"
		} else {
			return ""
		}
	} else {
		return ""
	}
}

const determineArtists = ({ artist }: Common) =>
	(artist ? pipe(removeFeat, splitList)(artist) : [])

const determineFeaturing = ({ artist }: Common) => {
	if (artist) {
		if (artist.includes("feat.")) {
			const str = artist.slice(artist.indexOf("feat.") + 6, artist.length)
			return splitList(str)
		} else {
			return []
		}
	} else {
		return []
	}
}

const determineRemixers = ({ title }: Common) => {
	if (title) {
		if (strHasBrackets(title)) {
			const brackets = strFindBrackets(title)
			if (brackets.includes("Remix")) {
				const list = brackets.slice(0, brackets.lastIndexOf("Remix") - 1)
				return pipe(removeMix, splitList)(list)
			} else {
				return []
			}
		} else {
			return []
		}
	} else {
		return []
	}
}

const determineGenres = ({ genre }: Common) =>
	(genre && !isEmpty(genre) ? genre : [])

const determineDiscNumber = ({ disk }: Common) =>
	disk?.no || 1

const determineTrackNumber = ({ track }: Common) =>
	track?.no || 1

const determineDuration = ({ duration }: Format) =>
	Math.floor(duration || 0)

const determineAlbum = ({ album, albumartist, year, picture }: Common) => ({
	title: album || "",
	released: year || (new Date()).getFullYear(),
	artists: albumartist ? splitList(albumartist) : [],
	cover: picture ? toDataUrl(picture[0].data) : EMPTY_DATA_URL,
})

export const parseMetadata = ({ common, format }: Metadata): MetadataResponse => ({
	mix: determineMix(common),
	title: determineTitle(common),
	album: determineAlbum(common),
	genres: determineGenres(common),
	artists: determineArtists(common),
	remixers: determineRemixers(common),
	duration: determineDuration(format),
	featuring: determineFeaturing(common),
	discNumber: determineDiscNumber(common),
	trackNumber: determineTrackNumber(common),
})