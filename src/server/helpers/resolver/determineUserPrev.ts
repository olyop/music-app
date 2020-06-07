import { last, concat, initial, isEmpty } from "lodash"

import { Queue } from "../../types"

export const determineUserPrev = ({ prev, current, next, queue }: Queue) => {
	if (isEmpty(prev)) {
		return {}
	} else if (isEmpty(next)) {
		return {
			prev: initial(prev),
			current: last(prev),
			queue: concat(current, queue),
		}
	} else {
		return {
			prev: initial(prev),
			current: last(prev),
			next: concat(current, next),
		}
	}
}