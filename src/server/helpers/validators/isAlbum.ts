import { isInteger } from "lodash"

import { isImg } from "./isImg"
import { isText } from "./isText"
import { Album } from "../../types"
import { isArrayOfUuids } from "./isArrayOfUuids"

const isReleased = (released: number) =>
	isInteger(released) && released >= 1

interface Input extends Omit<Album, "released"> {
	cover: Buffer,
	released: number,
	artists: string[],
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