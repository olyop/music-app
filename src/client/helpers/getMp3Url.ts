import { BASE_S3_URL } from "@oly_op/music-app-common/globals"

export const getMp3Url =
	(songId: string) =>
		`${BASE_S3_URL}/catalog/${songId}/full.mp3`