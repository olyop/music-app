import { isEmpty } from "lodash"

import { pipe } from "../utils/pipe"
import { sqlResRows } from "./sqlResRows"

export const sqlIsResEmpty = res =>
	pipe(sqlResRows, isEmpty)(res)