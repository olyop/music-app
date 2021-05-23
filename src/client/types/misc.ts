import { FC } from "react"
import { RouteComponentProps } from "react-router-dom"

import { Song } from "./docs"

export interface Disc {
	songs: Song[],
	number: number,
	hideLabel: boolean,
}

export interface Route {
	id: string,
	path: string,
	icon?: string,
	name?: string,
	exact?: boolean,
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
	after: Song[],
	current: Song,
}

export interface Queue {
	id: QueueKey,
	name: string,
	songs: Song[],
}

export type QueueKey = "prev" | "current" | "next" | "later"

export type Handler = () => void | Promise<void>