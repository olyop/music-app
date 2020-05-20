import parseSong from "./parseSong.js"
import asyncPool from "tiny-async-pool"
import { songsFromMetadata, albumFromMetadata } from "./fromMetadata.js"

const parseSongs = async ({ args }) => {
  const metadata = await asyncPool(3, args.files, parseSong)
  return {
    songs: songsFromMetadata(metadata),
    album: await albumFromMetadata(metadata),
  }
}

export default parseSongs
