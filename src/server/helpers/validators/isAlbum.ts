import { isString } from "lodash"

import { isImg } from "./isImg"
import { isText } from "./isText"
import { isArrayOfUuids } from "./isArrayOfUuids"

const isReleased = (released: string) => (
	isString(released) &&
	!Number.isNaN(Date.parse(released)) &&
	Date.parse(released) >= 1
)

export const isAlbum = ({
	title,
	cover,
	released,
	artistIds,
}: {
	title: string,
	cover: Buffer,
	released: string,
	artistIds: string[],
}) => (
	isImg(cover) &&
	isText(title) &&
	isReleased(released) &&
	isArrayOfUuids(artistIds)
)