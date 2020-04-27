import sharp from "sharp"

const resize = ({ image, dim: [width, height] }) =>
  sharp(image)
    .resize(width, height)
    .jpeg()

export default resize
