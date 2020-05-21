import fetch from "node-fetch"
import isNull from "lodash/isNull.js"

import { LAST_FM_API_KEY } from "../../../globals/environment.js"

const googleSearchScrape = album => new Promise(
  (resolve, reject) => {
    const query = `${album.title} ${album.artists.join(" ")} release date`
    const params = new URLSearchParams({ q: query })
    const url = `https://www.google.com/search?${params}`
    fetch(url).then(res => res.text()).then(html => {
      /* eslint-disable-next-line max-len */
      const reg = /(0[1-9]|[12]\d|3[01]) (January|February|March|April|May|June|July|August|September|October|November|December) (?:19[7-9]\d|2\d{3})(?=\D|$)/
      const search = html.match(reg)
      resolve(isNull(search) ? null : search[0])
    }).catch(reject)
  },
)

const lastFmScrape = album => new Promise(
  (resolve, reject) => {
    const params = new URLSearchParams({
      limit: 1,
      format: "json",
      album: album.title,
      method: "album.getInfo",
      api_key: LAST_FM_API_KEY,
      artist: album.artists.join(" "),
    })
    const url = `http://ws.audioscrobbler.com/2.0/?${params}`
    fetch(url).then(res => res.json()).then(res => {
      if (res.error) {
        resolve(null)
      } else if (res.album.wiki) {
        resolve(res.album.wiki.published.slice(0, 11))
      } else {
        resolve(null)
      }
    }).catch(reject)
  },
)

const albumReleased = async album => {
  try {
    const googleSearch = await googleSearchScrape(album)
    if (googleSearch) {
      return googleSearch
    } else {
      const lastFm = await lastFmScrape(album)
      return lastFm || album.released
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default albumReleased

