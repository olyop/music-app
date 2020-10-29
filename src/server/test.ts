import fetch from "node-fetch"
import { Song } from "./types"
import { SONIC_API_KEY } from "./globals"
import { sqlPoolQuery, parseSqlTable } from "./helpers"

const URL = "https://api.sonicAPI.com/analyze/key"

const params = new URLSearchParams()
params.set("access_id", SONIC_API_KEY)
params.set("blocking", "true")
params.set("format", "json")
const baseParams = params.toString()

const getS3Url = (id: string) =>
	`https://music-app.s3-ap-southeast-2.amazonaws.com/catalog/${id}/full.mp3`

interface Res {
	key: string,
}

interface Body {
	tonart_result: Res,
}

export default async () => {
	const songs = await sqlPoolQuery<Song[]>({
		sql: "SELECT * FROM songs;",
		parse: parseSqlTable(),
	})
	for (const { songId } of songs) {
		const res = await fetch(`${URL}?${baseParams}&input_file=${getS3Url(songId)}`)
		const body = (await res.json()) as Body
		const { key } = body.tonart_result
		await sqlPoolQuery({
			sql: ``,
			variables: 
		})
	}
}