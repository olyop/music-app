import { head, concat, tail, isEmpty } from "lodash"

import { Queue } from "../../types"

export const determineUserNext = ({ prev, current, next, queue }: Queue) => {
	if (isEmpty(next) && isEmpty(queue)) {
		return {}
	} else if (isEmpty(next)) {
		return {
			prev: concat(prev, current),
			current: head(queue),
			queue: tail(queue),
		}
	} else {
		return {
			prev: concat(prev, current),
			current: head(next),
			next: tail(next),
		}
	}
}