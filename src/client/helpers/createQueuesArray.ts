import uniqueId from "lodash/uniqueId"

import { User, Queue } from "../types"

export const createQueuesArray =
	({ prev, current, next, queue }: User): Queue[] => [{
		id: uniqueId(),
		key: "prev",
		name: "Previous",
		songs: prev,
	},{
		id: uniqueId(),
		key: "current",
		name: "Playing",
		songs: current ? [current] : [],
	},{
		id: uniqueId(),
		key: "next",
		name: "Next",
		songs: next,
	},{
		id: uniqueId(),
		key: "queue",
		name: "Later",
		songs: queue,
	}]