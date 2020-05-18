import parseSong from "./parseSong.js"
import asyncPool from "tiny-async-pool"

const parseSongs = async ({ args }) =>
  asyncPool(10, args.files, parseSong)

export default parseSongs
