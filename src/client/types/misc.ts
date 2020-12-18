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

export interface UserVar {
	userId: string,
}

export interface ModalButton {
	text: string,
	icon?: string,
	link?: string,
	handler?: () => void,
}

export type QueueKey = "prev" | "current" | "next" | "later"