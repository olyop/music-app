import { isImg } from "./isImg"
import { isText } from "./isText"
import { Artist } from "../../types"

interface Input extends Artist {
	photo: Buffer,
}

export const isArtist = ({ name, photo }: Input) => (
	isText(name) &&
	isImg(photo)
)