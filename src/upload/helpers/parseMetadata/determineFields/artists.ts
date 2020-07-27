import { IAudioMetadata } from "music-metadata-browser"

export const determineArtists = ({ common: { artist } }: IAudioMetadata) =>
	(artist ? [artist] : [])