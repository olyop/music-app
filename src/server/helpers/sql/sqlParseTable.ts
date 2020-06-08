import { map } from "lodash/fp"

import { pipe } from "../utils/pipe"
import { sqlResRows } from "./sqlResRows"
import { convertToCamelCase } from "../resolver/convertToCamelCase"

export const sqlParseTable = (sql: string) =>
	pipe(sqlResRows, map(convertToCamelCase))(sql)