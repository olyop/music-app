import type { ICommonTagsResult } from "music-metadata"

export const determineGenres = ({ genre }: ICommonTagsResult) =>
	genre || []