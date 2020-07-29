import { ICommonTagsResult } from "music-metadata-browser"

import { splitList, removeFeat } from "./common"

export const determineArtists = ({ artist }: ICommonTagsResult) =>
	(artist ? splitList(removeFeat(artist)) : [])