import { isImg } from "./isImg.js"
import { isText } from "./isText.js"

export const isArtist = ({
	name,
	photo,
}: {
	name: string,
	photo: Buffer,
}) => (
	isText(name) &&
	isImg(photo)
)