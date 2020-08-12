import { isString } from "lodash"

import { isImg } from "./isImg"
import { isText } from "./isText"
import { Album } from "../../types"
import { isArrayOfUuids } from "./isArrayOfUuids"

const isReleased = (released: string) => (
	isString(released) &&
	!Number.isNaN(Date.parse(released)) &&
	Date.parse(released) >= 1
)

interface Input extends Omit<Album, "released"> {
	cover: Buffer,
	artists: string[],
	released: string,
}

export const isAlbum = ({
	title,
	cover,
	artists,
	released,
}: Input) => (
	isImg(cover) &&
	isText(title) &&
	isReleased(released) &&
	isArrayOfUuids(artists)
)