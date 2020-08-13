import type { ICommonTagsResult } from "music-metadata"

import { splitList, removeFeat } from "./common"

export const determineArtists = ({ artist }: ICommonTagsResult) =>
	(artist ? splitList(removeFeat(artist)) : [])