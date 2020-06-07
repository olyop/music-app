import { mapValues } from "lodash"
import { resolver } from "./resolver"

export const mapResolver = (obj: Record<string, unknown>) =>
	mapValues(obj, resolver)