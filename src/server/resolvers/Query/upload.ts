/* eslint-disable quote-props */
import fetch from "node-fetch"
import { random } from "lodash"
import bufferToDataUrl from "@oly_op/music-app-common/bufferToDataUrl"

import { SERP_API_KEY } from "../../globals"
import { createResolver } from "../../helpers"

const serpApiBaseUrl = "https://serpapi.com/search.json"

const serpApiBaseParams = new URLSearchParams({
	"hl": "en",
	"gl": "us",
	"engine": "google",
	"api_key": SERP_API_KEY,
	"google_domain": "google.com",
})

const resolver =
	createResolver()

interface AlbumReleasedSearchArgs {
	title: string,
	artists: string[],
}

interface KnowledgeGraph {
	release_date: string,
}

interface AlbumReleasedSearchRes {
	knowledge_graph: KnowledgeGraph,
}

export const albumReleasedSearch =
	resolver<string | null, AlbumReleasedSearchArgs>(
		async ({ args }) => {
			const params = new URLSearchParams(serpApiBaseParams)
			const tilte = args.title.toLowerCase()
			const artists = args.artists.join(" ").toLowerCase()
			params.set("q", (`${tilte} ${artists}+release+date`).replace(" ", "+"))
			const res = await fetch(`${serpApiBaseUrl}?${params.toString()}`)
			const json = await res.json() as AlbumReleasedSearchRes
			if (json.knowledge_graph) {
				const date = json.knowledge_graph.release_date
				if (isNaN(Date.parse(date))) {
					return null
				} else {
					const temp = new Date(date).toISOString()
					const temp1 = temp.slice(0, 7)
					const temp2 = parseInt(temp.slice(8, 10), 10) + 1
					return Promise.resolve(`${temp1}-${temp2}`)
				}
			} else {
				return null
			}
		},
	)

interface PhotoSearchArgs {
	name: string,
}

interface PhotoSearchResult {
	original: string,
}

interface PhotoSearchRes {
	images_results: PhotoSearchResult[],
}

export const photoSearch =
	resolver<string, PhotoSearchArgs>(
		async ({ args }) => {
			const params = new URLSearchParams(serpApiBaseParams)
			params.set("num", "10")
			params.set("tbm", "isch")
			params.set("q", `${args.name.toLowerCase().replace(" ", "+")}+singer`)
			const apiRes = await fetch(`${serpApiBaseUrl}?${params.toString()}`)
			const apiJson = await apiRes.json() as PhotoSearchRes
			const url = apiJson.images_results[random(0, 9)].original
			const imgRes = await fetch(url)
			const buffer = await imgRes.buffer()
			return bufferToDataUrl(buffer)
		},
	)