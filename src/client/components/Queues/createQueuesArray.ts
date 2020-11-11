import isEmpty from "lodash/isEmpty"

import { User, Queue } from "../../types"

const createQueuesArray = ({ prev, current, next, later }: User) => {
	const queues: Queue[] = [{
		id: "prev",
		songs: prev,
		name: "Previous",
	},{
		id: "current",
		name: "Playing",
		songs: current ? [current] : [],
	},{
		id: "next",
		songs: next,
		name: "Next",
	},{
		id: "later",
		songs: later,
		name: "After",
	}]

	const filtered = queues.filter(({ name, songs }) => !isEmpty(songs))

	return filtered.length === 1 ? [] : filtered
}

export default createQueuesArray