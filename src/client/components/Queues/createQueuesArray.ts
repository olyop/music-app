import isEmpty from "lodash/isEmpty"
import uniqueId from "lodash/uniqueId"

import { User, Queue } from "../../types"

const createQueuesArray = ({ prev, current, next, later }: User) => {
	const queues: Queue[] = [{
		songs: prev,
		id: uniqueId(),
		name: "Previous",
	},{
		id: uniqueId(),
		name: "Playing",
		songs: current ? [current] : [],
	},{
		songs: next,
		name: "Next",
		id: uniqueId(),
	},{
		songs: later,
		name: "After",
		id: uniqueId(),
	}]

	const filtered = queues.filter(({ name, songs }) => (
		name === "Previous" || !isEmpty(songs)
	))

	return filtered.length === 1 ? [] : filtered
}

export default createQueuesArray