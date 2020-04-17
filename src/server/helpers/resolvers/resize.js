import sharp from "sharp"

const resize = (width, height) => image =>
  sharp(image)
    .resize(width, height)
    .jpeg()

export const resizeSmall = resize(640, 360)
export const resizeMedium = resize(1280, 720)
export const resizeLarge = resize(1920, 1080)
