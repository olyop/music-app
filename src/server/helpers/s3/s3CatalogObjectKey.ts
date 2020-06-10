import { ImgFormat, ImgSizeEnum } from "../../types"

type TInput = {
	id: string,
	size: ImgSizeEnum,
	format: ImgFormat,
}

export const s3CatalogObjectKey = ({ id, size, format }: TInput) =>
	`catalog/${id}/${size.toLowerCase()}.${format.toLowerCase()}`