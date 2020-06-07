type TInput<T> = {
	check: Promise<T>,
}

export const determineChecksResults = <T,>(checks: TInput<T>[]) =>
	Promise.all(checks.map(({ check }) => check))