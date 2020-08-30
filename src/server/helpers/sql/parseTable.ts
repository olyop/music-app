import pipe from "@oly_op/pipe"
import { map } from "lodash/fp"
import { resRows } from "./resRows"
import { SQLQueryRes } from "../../types"
import { convertToCamelCase } from "../resolver"

export const parseTable = <T>() => (res: SQLQueryRes): T[] =>
	pipe(resRows, map(convertToCamelCase<T>()))(res)