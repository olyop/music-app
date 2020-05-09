/* eslint-disable no-bitwise */

import { uniqueId } from "lodash"

const isFileValidType = ({ type }) =>
  type === "audio/mpeg"

const isFileValidSize = ({ size }) =>
  size <= 5e7

const fileToArrayBuffer = file =>
  new Promise(
    (resolve, reject) => {
      file.arrayBuffer()
          .then(arrayBuffer => new DataView(arrayBuffer))
          .then(resolve)
          .catch(reject)
    },
  )

const arrayBufferToAudioBuffer = arrayBuffer =>
  new Promise(
    (resolve, reject) => {
      const audioContext = new AudioContext()
      audioContext
        .decodeAudioData(arrayBuffer.buffer)
        .then(resolve)
        .catch(reject)
    },
  )

const createFile = file =>
  new Promise(
    (resolve, reject) => {
      if (!isFileValidType(file)) {
        reject(new Error("Invalid file type", file))
      } else if (!isFileValidSize(file)) {
        reject(new Error("File to large.", file))
      } else {
        fileToArrayBuffer(file)
          .then(arrayBuffer => arrayBufferToAudioBuffer(arrayBuffer))
          .then(audioBuffer => resolve({
            audio: file,
            audioBuffer,
            arrayBuffer: new DataView(audioBuffer.getChannelData(0).buffer),
          }))
          .catch(reject)
      }
    },
  )

const HEADER_SIZE = 10
const LANG_FRAMES = ["USLT","SYLT","COMM","USER"]
const ID3_ENCODINGS = ["ascii","utf-16","utf-16be","utf-8"]

const synchToInt = synch => {
  const mask = 0b01111111
  const b1 = synch & mask
  const b2 = (synch >> 8) & mask
  const b3 = (synch >> 16) & mask
  const b4 = (synch >> 24) & mask
  return b1 | (b2 << 7) | (b3 << 14) | (b4 << 21);
}

const decode = string =>
  new TextDecoder("utf8").decode(string)

const decodeFrame = (buffer, offset) => {
  const header = new DataView(buffer, offset, HEADER_SIZE + 1)
  if (header.getUint8(0) === 0) {
    return null
  } else {
    const id = decode(new Uint8Array(buffer, offset, 4))
    const size = header.getUint32(4)
    let contentSize = size - 1
    const encoding = header.getUint8(HEADER_SIZE)
    let contentOffset = offset + HEADER_SIZE + 1
    let lang
    if (LANG_FRAMES.includes(id)) {
      lang = decode(new Uint8Array(buffer, contentOffset, 3))
      contentOffset += 3
      contentSize -= 3
    }
    console.log({ id, lang, size: size + HEADER_SIZE })
    const value = decode(
      ID3_ENCODINGS[encoding],
      new Uint8Array(buffer, contentOffset, contentSize),
    )
    return {
      id,
      lang,
      value,
      size: size + HEADER_SIZE,
    }
  }
}

const determineID3Tags = ({ buffer }) => {
  const headerFrame = new DataView(buffer, 0, HEADER_SIZE)
  const size = synchToInt(headerFrame.getUint32(6))
  let offset = HEADER_SIZE
  const id3Size = HEADER_SIZE + size

  while (offset < id3Size) {
    const frame = decodeFrame(buffer, offset)
    if (!frame) { break }
    console.log(`${frame.id}: ${frame.value.length > 200 ? "..." : frame.value}`)
    offset += frame.size
  }

  return {
    id3Header: `ID3v2.${headerFrame.getUint8(3)}.${headerFrame.getUint8(4)}`,
  }
}

const determineDuration = audioBuffer =>
  Math.floor(audioBuffer.duration)

const createSong = file => ({
  id: uniqueId(),
  ...file,
  ...determineID3Tags(file.arrayBuffer),
  duration: determineDuration(file.audioBuffer),
})

const createSongs = fileList =>
  new Promise(
    (resolve, reject) => {
      if (!(fileList instanceof FileList)) {
        reject(new Error("Input not of type FileList", fileList))
      } else {
        Promise
          .all(Array.from(fileList).map(createFile))
          .then(files => Promise.all(files.map(createSong)))
          .then(resolve)
          .catch(reject)
      }
    },
  )

export default createSongs
