import type { ICommonTagsResult } from "music-metadata"

import { splitList } from "./common"

export const determineGenres = ({ genre }: ICommonTagsResult) =>
	(genre ? splitList(genre[0]) : [])