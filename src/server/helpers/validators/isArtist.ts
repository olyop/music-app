import { isImg } from "./isImg.js"
import { isText } from "./isText.js"

type Input = {
	name: string,
	photo: Buffer,
}

export const isArtist = ({ name, photo }: Input) => (
	isText(name) &&
	isImg(photo)
)