import { IAudioMetadata } from "music-metadata-browser"

export const determineGenres = ({ common: { genre } }: IAudioMetadata) =>
	genre || []