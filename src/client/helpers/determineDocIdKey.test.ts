import { Doc } from "../types"
import { determineDocIdKey } from "./determineDocIdKey"

const cases: [Doc, string][] = [
	[{ __typename: "Song" }, "songId"],
	[{ __typename: "Album" }, "albumId"],
	[{ __typename: "Artist" }, "artistId"],
]

describe("determineDocIdKey", () => {
	test.each(cases)(
		"correctly determines document id key",
		(value, expected) => {
			expect(determineDocIdKey(value)).toBe(expected)
		},
	)
})