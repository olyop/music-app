import { FC } from "react"
import { RouteComponentProps } from "react-router-dom"

import { Song } from "./docs"

export interface Disc {
	songs: Song[],
	number: number,
}

export interface Route {
	id: string,
	path: string,
	icon?: string,
	name?: string,
	ignore?: boolean,
	component: FC<RouteComponentProps>,
}

export interface ClassType {
	ignore: boolean,
	className: string,
}

export interface DataUserPlay {
	prev: Song[],
	next: Song[],
	queue: Song[],
	current: Song,
}

export interface Queue {
	id: string,
	name: string,
	songs: Song[],
	key: "prev" | "next" | "queue" | "current",
}

export interface UserVar {
	userId: string,
}