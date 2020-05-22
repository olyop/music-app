import fetch from "node-fetch"
import toDataUrl from "../../helpers/resolver/toDataUrl.js"

const parseUrl = async ({ args }) => {
  const res = await fetch(args.url)
  const buffer = await res.buffer()
  return toDataUrl(buffer)
}

export default parseUrl
