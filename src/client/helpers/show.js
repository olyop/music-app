import { includes } from "lodash"

const show = array => item => !includes(array, item)

export default show
