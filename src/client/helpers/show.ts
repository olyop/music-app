import { includes } from "lodash"

const show = <T>(arr: T[]) => (item: T): boolean =>
	!includes(arr, item)

export default show