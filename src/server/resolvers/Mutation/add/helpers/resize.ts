import sharp from "sharp"
import { ImgDim } from "../../../../types"

interface ResizeInput {
	dim: ImgDim,
	image: Buffer,
}

export const resize = ({ image, dim }: ResizeInput) =>
	sharp(image)
		.resize(...dim)
		.jpeg()
		.toBuffer()