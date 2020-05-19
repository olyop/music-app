import parseSong from "./parseSong.js"
import asyncPool from "tiny-async-pool"
import splitMetadata from "./splitMetadata.js"

const parseSongs = async ({ args }) =>
  splitMetadata(await asyncPool(10, args.files, parseSong))

export default parseSongs
