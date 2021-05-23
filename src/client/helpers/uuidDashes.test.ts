import { cloneDeep, map, reverse } from "lodash"
import { uuidAddDashes, uuidRemoveDashes } from "./uuidDashes"

const cases = [
	["77ca43ef-c9c4-4b7b-ac03-81d8a6168779", "77ca43efc9c44b7bac0381d8a6168779"],
	["e2d4d68f-d7fb-42cd-a63a-57526000f1d4", "e2d4d68fd7fb42cda63a57526000f1d4"],
	["cb674d93-7d66-4d24-b155-8c2a2cab23af", "cb674d937d664d24b1558c2a2cab23af"],
]

describe("uuidDashes", () => {
	test.each(cases)(
		"correctly removes dashes from uuid",
		(value, expected) => {
			expect(uuidRemoveDashes(value)).toBe(expected)
		},
	)
	test.each(map(cloneDeep(cases), reverse))(
		"correctly inserts dashes into uuid",
		(value, expected) => {
			expect(uuidAddDashes(value)).toBe(expected)
		},
	)
})