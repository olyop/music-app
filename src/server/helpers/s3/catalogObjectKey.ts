import { ImgSizeEnum } from "../../types"

interface Input {
	id: string,
	size: ImgSizeEnum,
	format: "jpg" | "mp3",
}

export const catalogObjectKey = ({ id, size, format }: Input) =>
	`catalog/${id}/${ImgSizeEnum[size].toLowerCase()}.${format}`