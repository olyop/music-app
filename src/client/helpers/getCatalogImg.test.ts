import { BASE_S3_URL } from "@oly_op/music-app-common/globals"
import { getCatalogImg } from "./getCatalogImg"

const cases = [
	["1", `${BASE_S3_URL}/catalog/1/full.jpg`],
	["2", `${BASE_S3_URL}/catalog/2/full.jpg`],
	["3", `${BASE_S3_URL}/catalog/3/full.jpg`],
]

test.each(cases)(
	"correctly returns the catalog url",
	(value, expected) => {
		expect(getCatalogImg(value)).toBe(expected)
	},
)