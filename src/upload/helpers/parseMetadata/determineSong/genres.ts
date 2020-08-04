import { ICommonTagsResult } from "music-metadata-browser"

import { splitList } from "./common"

export const determineGenres = ({ genre }: ICommonTagsResult) =>
	(genre ? splitList(genre[0]) : [])