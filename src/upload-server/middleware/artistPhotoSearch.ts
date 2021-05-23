/* eslint-disable quote-props */
import fetch from "node-fetch"
import { random } from "lodash"
import { RequestHandler } from "express"
import bufferToDataUrl from "@oly_op/music-app-common/bufferToDataUrl"

import { fetchJson } from "../helpers"
import { SearchParams } from "../types"
import { SERP_API_KEY } from "../globals"

const serpApiBaseUrl =
	"https://serpapi.com/search.json"

const serpApiBaseParams =
	new URLSearchParams({
		"hl": "en",
		"gl": "us",
		"engine": "google",
		"api_key": SERP_API_KEY,
		"google_domain": "google.com",
	})

export const artistPhotoSearch: RequestHandler<SearchParams> =
	async (req, res) => {
		const { value } = req.params
		const params = new URLSearchParams(serpApiBaseParams)
		params.set("num", "10")
		params.set("tbm", "isch")
		params.set("q", `${value.replace(" ", "+")}+dj`)
		const url = `${serpApiBaseUrl}?${params.toString()}`
		const json = await fetchJson<PhotoSearchRes>(url)
		const imgUrl = json.images_results[random(0, 9)].original
		const imgRes = await fetch(imgUrl)
		const buffer = await imgRes.buffer()
		res.send(bufferToDataUrl(buffer))
	}

interface PhotoSearchResult {
	original: string,
}

interface PhotoSearchRes {
	images_results: PhotoSearchResult[],
}