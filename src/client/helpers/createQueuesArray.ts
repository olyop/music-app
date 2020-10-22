import isEmpty from "lodash/isEmpty"
import uniqueId from "lodash/uniqueId"

import { User, Queue } from "../types"

export const createQueuesArray =
	({ prev, current, next, later }: User) => ([{
		key: "prev",
		songs: prev,
		id: uniqueId(),
		name: "Previous",
	},{
		key: "next",
		songs: next,
		name: "Next",
		id: uniqueId(),
	},{
		key: "after",
		songs: later,
		name: "After",
		id: uniqueId(),
	},{
		id: uniqueId(),
		key: "current",
		name: "Playing",
		songs: current ? [current] : [],
	}] as Queue[]).filter(({ songs }) => !isEmpty(songs))