import { IAudioMetadata } from "music-metadata-browser"

export const determineDiscNumber = ({ common: { disk } }: IAudioMetadata) =>
	disk.no || 1

export const determineTrackNumber = ({ common: { track } }: IAudioMetadata) =>
	track.no || 1