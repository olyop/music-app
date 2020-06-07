export type Song = {
	title: string,
}

export type Queue = {
	prev: Song[],
	current: Song[],
	next: Song[],
	queue: Song[],
}