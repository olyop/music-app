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
	albumId,
	genreIds,
	artistIds,
	remixerIds,
	discNumber,
	trackNumber,
	featuringIds,
}: {
	mix: string,
	title: string,
	audio: Buffer,
	albumId: string,
	genreIds: string[],
	discNumber: number,
	artistIds: string[],
	trackNumber: number,
	remixerIds: string[],
	featuringIds: string[],
}) => (
	isText(title) &&
	isAudio(audio) &&
	isUuid(albumId) &&
	isText(mix, true) &&
	isArrayOfUuids(genreIds) &&
	isArrayOfUuids(artistIds) &&
	isPositiveInt(discNumber) &&
	isArrayOfUuids(remixerIds) &&
	isPositiveInt(trackNumber) &&
	isArrayOfUuids(featuringIds)
)