import sharp, { Sharp } from "sharp"

const resize = ({ image, dim: [width, height] }): Sharp =>
	sharp(image)
		.resize(width, height)
		.jpeg()

export default resize