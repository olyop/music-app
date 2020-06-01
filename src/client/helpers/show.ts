import { includes } from "lodash"

export const show = <T>(arr: T[]) => (item: T): boolean =>
	!includes(arr, item)