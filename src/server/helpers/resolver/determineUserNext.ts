import { concat, tail, isEmpty } from "lodash"

import { Queue } from "../../types"

export const determineUserNext = (input: Queue): Queue => {
	const { prev, current, next, queue } = input
	if (isEmpty(next) && isEmpty(queue)) {
		return input
	} else if (isEmpty(next)) {
		return {
			prev: concat(prev, current),
			current: queue[0],
			queue: tail(queue),
			next,
		}
	} else {
		return {
			prev: concat(prev, current),
			current: next[0],
			next: tail(next),
			queue,
		}
	}
}