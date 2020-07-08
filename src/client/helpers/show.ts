import includes from "lodash/includes"

export const show = <T>(arr: T[]) => (item: T): boolean =>
	!includes(arr, item)