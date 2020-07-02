import { ImgFormat, ImgSizeEnum } from "../../types"

interface Input {
	id: string,
	size: ImgSizeEnum,
	format: ImgFormat,
}

export const catalogObjectKey = ({ id, size, format }: Input) =>
	`catalog/${id}/${ImgSizeEnum[size].toLowerCase()}.${ImgFormat[format].toLowerCase()}`