import sharp from "sharp"

type TInput = {
	image: Buffer,
	dim: [number, number],
}

export const resize = ({ image, dim: [width, height] }: TInput) =>
	sharp(image)
		.resize(width, height)
		.jpeg()
		.toBuffer()