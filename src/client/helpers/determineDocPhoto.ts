import toString from "lodash/toString"

import { Doc } from "../types"
import { getCatalogImg } from "./getCatalogImg"

export const determineDocPhoto =
	<T extends Doc, K extends keyof T>(doc: T): string => {
		const key = ("artistId" in doc ? "artistId" : "albumId") as K
		return getCatalogImg(toString(doc[key]))
	}