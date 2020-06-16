import { last, concat, initial, isEmpty } from "lodash"

import { Queue } from "../../types"

export const determineUserPrev = (input: Queue) => {
	const { prev, current, next, queue } = input
	if (isEmpty(prev)) {
		return input
	} else if (isEmpty(next)) {
		return {
			next,
			prev: initial(prev),
			current: last(prev),
			queue: concat(current, queue),
		}
	} else {
		return {
			queue,
			prev: initial(prev),
			current: last(prev),
			next: concat(current, next),
		}
	}
}