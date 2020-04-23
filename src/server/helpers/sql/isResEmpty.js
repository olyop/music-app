import pipe from "../utils/pipe.js"
import isEmpty from "lodash/isEmpty.js"
import getRowsFromRes from "./getRowsFromRes.js"

const isResEmpty = res => pipe(res)(getRowsFromRes, isEmpty)

export default isResEmpty
