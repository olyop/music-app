import sharp from "sharp"
import { ImgDim } from "../../types"

type TInput = {
	dim: ImgDim,
	image: Buffer,
}

export const resize = ({ image, dim }: TInput) =>
	sharp(image)
		.resize(...dim)
		.jpeg()
		.toBuffer()