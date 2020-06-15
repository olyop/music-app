import { ImgFormat, ImgSizeEnum } from "../../types"

type TInput = {
	id: string,
	size: ImgSizeEnum,
	format: ImgFormat,
}

export const catalogObjectKey = ({ id, size, format }: TInput) =>
	`catalog/${id}/${ImgSizeEnum[size].toLowerCase()}.${ImgFormat[format].toLowerCase()}`