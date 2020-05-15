import pipe from "../utils/pipe.js"
import isEmpty from "lodash/isEmpty.js"
import sqlGetRowsFromRes from "./sqlGetRowsFromRes.js"

const sqlIsResEmpty = res => pipe(res)(sqlGetRowsFromRes, isEmpty)

export default sqlIsResEmpty
