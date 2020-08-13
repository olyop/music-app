import type { ICommonTagsResult } from "music-metadata"

export const determineDiscNumber = ({ disk }: ICommonTagsResult) =>
	disk.no || 1

export const determineTrackNumber = ({ track }: ICommonTagsResult) =>
	track.no || 1