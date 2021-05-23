import { BASE_S3_URL } from "@oly_op/music-app-common/globals"

export const getCatalogImg =
	(id: string) =>
		`${BASE_S3_URL}/catalog/${id}/full.jpg`