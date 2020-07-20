import fetch from "node-fetch"
import { isNull } from "lodash"

import { Album } from "../../../../types"

interface Input extends Album {
	artists: string[],
}

const googleSearchScrape =
	(album: Input) =>
		new Promise<string | null>(
			(resolve, reject) => {
				const query = `${album.title} ${album.artists.join(" ")} release date`
				const params = new URLSearchParams({ q: query })
				const url = `https://www.google.com/search?${params.toString()}`
				fetch(url).then(res => res.text()).then(html => {
					// eslint-disable-next-line max-len
					const reg = /(0[1-9]|[12]\d|3[01]) (January|February|March|April|May|June|July|August|September|October|November|December) (?:19[7-9]\d|2\d{3})(?=\D|$)/
					const search = html.match(reg)
					return resolve(isNull(search) ? null : search[0])
				}).catch(reject)
			},
		)

export const albumReleased =
	async (album: Input) => {
		try {
			const googleSearch = await googleSearchScrape(album)
			if (isNull(googleSearch)) {
				return album.released
			} else {
				const date = new Date(googleSearch)
				const day = date.getDate()
				const month = date.getMonth()
				const year = date.getFullYear()
				return `${day}-${month < 10 ? 0 : ""}${month}-${year}`
			}
		} catch (error) {
			return album.released
		}
	}