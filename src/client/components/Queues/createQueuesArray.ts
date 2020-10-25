import isEmpty from "lodash/isEmpty"
import uniqueId from "lodash/uniqueId"

import { User, Queue } from "../../types"

const createQueuesArray =
	({ prev, current, next, later }: User) => ([{
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
	}] as Queue[]).filter(({ songs }) => !isEmpty(songs))

export default createQueuesArray