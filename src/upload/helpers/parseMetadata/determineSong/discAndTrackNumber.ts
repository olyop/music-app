import { ICommonTagsResult } from "music-metadata-browser"

export const determineDiscNumber = ({ disk }: ICommonTagsResult) =>
	disk.no || 1

export const determineTrackNumber = ({ track }: ICommonTagsResult) =>
	track.no || 1