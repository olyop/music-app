import { uniqueId } from "lodash"

import { Song } from "../types"

interface Queue {
	prev: Song[],
	next: Song[],
	queue: Song[],
	current: Song,
}

export const createQueuesArray = ({ prev, current, next, queue }: Queue) => [
	{
		id: uniqueId(),
		key: "prev",
		name: "Previous",
		songs: prev,
	},
	{
		id: uniqueId(),
		key: "current",
		name: "Playing",
		songs: [current],
	},
	{
		id: uniqueId(),
		key: "next",
		name: "Next",
		songs: next,
	},
	{
		id: uniqueId(),
		key: "queue",
		name: "Later",
		songs: queue,
	},
]