import { head } from "lodash"
import { map, reduce, orderBy } from "lodash/fp"

import { pipe } from "./pipe"

export const calculateMode = (arr: Record<string, unknown>[]) =>
	pipe(
		reduce(
			(freq, item) => ({
				...freq,
				[item]: freq[item] ? freq[item] += 1 : 1,
			}),
			{},
		),
		Object.entries,
		map(([ key, val ]) => ({ key, val })),
		orderBy("val", "desc"),
		head,
		({ key }) => key,
	)(arr)