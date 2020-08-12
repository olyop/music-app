import { isInteger } from "lodash"

import { isUuid } from "./isUuid"
import { isText } from "./isText"
import { isAudio } from "./isAudio"
import { isArrayOfUuids } from "./isArrayOfUuids"

const isPositiveInt = (integer: number) => (
	isInteger(integer) &&
	integer >= 0
)

export const isSong = ({
	mix,
	title,
	audio,
	album,
	genres,
	artists,
	remixers,
	featuring,
	discNumber,
	trackNumber,
}: {
	mix: string,
	title: string,
	audio: Buffer,
	album: string,
	genres: string[],
	artists: string[],
	discNumber: number,
	remixers: string[],
	trackNumber: number,
	featuring: string[],
}) => (
	isText(title) &&
	isAudio(audio) &&
	isUuid(album) &&
	isText(mix, true) &&
	isArrayOfUuids(genres) &&
	isArrayOfUuids(artists) &&
	isPositiveInt(discNumber) &&
	isArrayOfUuids(remixers) &&
	isPositiveInt(trackNumber) &&
	isArrayOfUuids(featuring)
)