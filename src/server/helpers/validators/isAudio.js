import isFile from "./isFile.js"

const isAudio = audio => (
  isFile(audio) &&
  audio.length <= 5e7
)

export default isAudio
