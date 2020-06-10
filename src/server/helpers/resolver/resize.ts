import sharp from "sharp"
import { ImgDim } from "../../types"

type TInput = {
	dim: ImgDim,
	image: Buffer,
}

export const resize = ({ image, dim: [width, height] }: TInput) =>
	sharp(image)
		.resize(width, height)
		.jpeg()
		.toBuffer()