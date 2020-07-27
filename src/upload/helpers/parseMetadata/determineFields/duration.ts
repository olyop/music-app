import { IAudioMetadata } from "music-metadata-browser"

export const determineDuration = ({ format: { duration } }: IAudioMetadata) =>
	(duration ? Math.floor(duration) : 0)