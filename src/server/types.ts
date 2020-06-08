export type Song = {
	title: string,
}

export type Queue = {
	prev: Song[],
	current: Song[],
	next: Song[],
	queue: Song[],
}

export type SqlVariable = {
	key: string,
	value: string,
	string: boolean,
	parameterized: boolean,
}